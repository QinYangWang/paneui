"use client"

import * as React from "react"
import type * as acp from "@agentclientprotocol/sdk"

import type { AcpTransport, JsonRpcId, JsonRpcMessage } from "./transport"

/**
 * A typed Agent Client Protocol (ACP) client for the browser.
 *
 * It speaks JSON-RPC 2.0 over any `AcpTransport`, keeps one store per session
 * (streamed `session/update` notifications folded into a chat timeline, tool
 * calls, plan, modes, config options, slash commands) and exposes it to React
 * through `useAcpClient`. Wire types come from the official
 * `@agentclientprotocol/sdk` package (type-only, so nothing ships to the
 * browser); the runtime is a few hundred lines so the template stays light.
 *
 * Methods: initialize, session/new, session/load, session/list,
 * session/prompt, session/cancel, session/set_mode, session/set_config_option,
 * session/set_model (unstable, used by claude-code-acp). Agent → client:
 * session/update, session/request_permission. fs/* and terminal/* are served
 * by the bridge (server/acp-bridge.mjs) next to the agent, which also sends
 * `_bridge/*` extension notifications (terminal output, file writes).
 */

export const PROTOCOL_VERSION = 1

/* -------------------------------------------------------------------------- */
/*  State model                                                               */
/* -------------------------------------------------------------------------- */

export type ToolCallState = acp.ToolCall & { startedAt: number; endedAt?: number }

export type EditedFileState = { path: string; oldText: string | null; newText: string | null }

export type PermissionItem = {
  kind: "permission"
  id: string
  at: number
  requestId: JsonRpcId
  toolCall: acp.ToolCallUpdate
  options: acp.PermissionOption[]
  /** Chosen option id, `"cancelled"`, or undefined while pending. */
  outcome?: string
}

export type TimelineItem =
  | { kind: "user"; id: string; at: number; text: string; steering?: boolean }
  | { kind: "assistant"; id: string; at: number; text: string; streaming: boolean; messageId?: string | null }
  | { kind: "work"; id: string; startedAt: number; endedAt?: number; toolCallIds: string[]; thoughts: string }
  | { kind: "edits"; id: string; at: number; files: EditedFileState[]; undone?: boolean }
  | { kind: "notice"; id: string; at: number; text: string; tone: "info" | "error" }
  | PermissionItem

/** Unstable `models` block some agents (claude-code-acp) return from session/new. */
export type AgentModelState = {
  currentModelId: string
  availableModels: { modelId: string; name: string; description?: string | null }[]
}

export type SessionState = {
  id: string
  cwd: string
  title: string
  status: "idle" | "working" | "loading"
  timeline: TimelineItem[]
  toolCalls: Record<string, ToolCallState>
  plan: acp.PlanEntry[]
  modes: acp.SessionModeState | null
  configOptions: acp.SessionConfigOption[]
  models: AgentModelState | null
  commands: acp.AvailableCommand[]
  usage: { used: number; size: number } | null
  turnStartedAt?: number
  lastStopReason?: acp.StopReason
  /** Extension data an agent attached to the session (`_meta`), e.g. repo / branch / PR for the sidebar. */
  meta?: Record<string, unknown>
}

export type TerminalState = {
  id: string
  title: string
  output: string
  exitStatus?: acp.TerminalExitStatus | null
  sessionId?: string
}

export type ClientState = {
  connection: "disconnected" | "connecting" | "ready" | "error"
  transportLabel: string
  error?: string
  agentInfo?: acp.Implementation | null
  agentCapabilities?: acp.AgentCapabilities
  authMethods: acp.AuthMethod[]
  /** Sessions the agent reported through session/list (not loaded yet). */
  sessionList: (acp.SessionInfo & { _meta?: Record<string, unknown> | null })[]
  sessions: Record<string, SessionState>
  terminals: Record<string, TerminalState>
  /** Workspace files, for @mentions and the explorer (from the bridge or the demo agent). */
  files: string[]
  workspaceRoot?: string
  /** Agent stderr and bridge messages. */
  log: string[]
}

const INITIAL: ClientState = {
  connection: "disconnected",
  transportLabel: "",
  authMethods: [],
  sessionList: [],
  sessions: {},
  terminals: {},
  files: [],
  log: [],
}

class RpcError extends Error {
  code: number
  data?: unknown
  constructor(code: number, message: string, data?: unknown) {
    super(message)
    this.code = code
    this.data = data
  }
}

let uid = 0
const nextId = (p: string) => `${p}-${Date.now().toString(36)}-${(uid++).toString(36)}`

function textOf(block: acp.ContentBlock): string {
  switch (block.type) {
    case "text":
      return block.text
    case "resource_link":
      return `[${block.name}](${block.uri})`
    case "resource":
      return "text" in block.resource ? block.resource.text : ""
    case "image":
      return "[image]"
    case "audio":
      return "[audio]"
    default:
      return ""
  }
}

/** Timestamp an agent attached to an update (`_meta.timestamp`, epoch ms or ISO), else now. */
function stampOf(update: { _meta?: { [key: string]: unknown } | null }) {
  const t = update._meta?.timestamp
  if (typeof t === "number") return t
  if (typeof t === "string") {
    const n = Date.parse(t)
    if (!Number.isNaN(n)) return n
  }
  return Date.now()
}

function emptySession(id: string, cwd: string, title = "New thread"): SessionState {
  return {
    id,
    cwd,
    title,
    status: "idle",
    timeline: [],
    toolCalls: {},
    plan: [],
    modes: null,
    configOptions: [],
    models: null,
    commands: [],
    usage: null,
  }
}

/* -------------------------------------------------------------------------- */
/*  Client                                                                    */
/* -------------------------------------------------------------------------- */

type Pending = { resolve: (v: unknown) => void; reject: (e: unknown) => void }

export type ConnectOptions = {
  clientInfo?: acp.Implementation
  clientCapabilities?: acp.ClientCapabilities
  /** Runs after the transport is attached and before `initialize` (the bridge's `_bridge/spawn`). */
  beforeInitialize?: (client: AcpClient) => Promise<unknown>
}

export class AcpClient {
  private state: ClientState = INITIAL
  private listeners = new Set<() => void>()
  private transport: AcpTransport | null = null
  private unsubs: (() => void)[] = []
  private pending = new Map<JsonRpcId, Pending>()
  private permissionWaiters = new Map<string, (r: acp.RequestPermissionResponse) => void>()
  private promptRuns = new Map<string, Promise<acp.PromptResponse | null>>()
  /** Files written through fs/write_text_file during the current turn, per session. */
  private turnWrites = new Map<string, Map<string, EditedFileState>>()
  private rid = 1
  private frame: number | null = null

  /* ---------------------------- store plumbing ---------------------------- */

  getState = () => this.state

  subscribe = (listener: () => void) => {
    this.listeners.add(listener)
    return () => {
      this.listeners.delete(listener)
    }
  }

  private set(fn: (s: ClientState) => ClientState) {
    this.state = fn(this.state)
    // Coalesce bursts of streamed chunks into one render per frame.
    if (this.frame !== null) return
    const flush = () => {
      this.frame = null
      for (const l of [...this.listeners]) l()
    }
    this.frame = typeof requestAnimationFrame === "function" ? requestAnimationFrame(flush) : (setTimeout(flush, 16) as unknown as number)
  }

  private patchSession(id: string, fn: (s: SessionState) => SessionState) {
    this.set((st) => {
      const cur = st.sessions[id]
      if (!cur) return st
      return { ...st, sessions: { ...st.sessions, [id]: fn(cur) } }
    })
  }

  private log(line: string) {
    this.set((s) => ({ ...s, log: [...s.log.slice(-199), line] }))
  }

  /* ------------------------------ JSON-RPC -------------------------------- */

  private send(message: Omit<JsonRpcMessage, "jsonrpc">) {
    this.transport?.send({ jsonrpc: "2.0", ...message })
  }

  /** Send a request and await its result. */
  request<T = unknown>(method: string, params?: unknown): Promise<T> {
    if (!this.transport) return Promise.reject(new Error("Not connected"))
    const id = this.rid++
    return new Promise<T>((resolve, reject) => {
      this.pending.set(id, { resolve: resolve as (v: unknown) => void, reject })
      this.send({ id, method, params })
    })
  }

  notify(method: string, params?: unknown) {
    this.send({ method, params })
  }

  private onMessage = (msg: JsonRpcMessage) => {
    if (msg.method && msg.id !== undefined && msg.id !== null) {
      void this.handleRequest(msg.id, msg.method, msg.params)
    } else if (msg.method) {
      this.handleNotification(msg.method, msg.params)
    } else if (msg.id !== undefined && msg.id !== null) {
      const p = this.pending.get(msg.id)
      if (!p) return
      this.pending.delete(msg.id)
      if (msg.error) p.reject(new RpcError(msg.error.code, msg.error.message, msg.error.data))
      else p.resolve(msg.result)
    }
  }

  private async handleRequest(id: JsonRpcId, method: string, params: unknown) {
    try {
      let result: unknown
      if (method === "session/request_permission") result = await this.onPermission(id, params as acp.RequestPermissionRequest)
      else throw new RpcError(-32601, `Method not found: ${method} (the browser client serves fs and terminal through the bridge)`)
      this.send({ id, result })
    } catch (err) {
      const e = err instanceof RpcError ? err : new RpcError(-32603, err instanceof Error ? err.message : String(err))
      this.send({ id, error: { code: e.code, message: e.message, data: e.data } })
    }
  }

  private handleNotification(method: string, params: unknown) {
    switch (method) {
      case "session/update": {
        const { sessionId, update } = params as acp.SessionNotification
        this.applyUpdate(sessionId, update)
        return
      }
      case "_bridge/terminal_output": {
        const p = params as { terminalId: string; data: string; title?: string; sessionId?: string }
        this.set((s) => {
          const t = s.terminals[p.terminalId] ?? { id: p.terminalId, title: p.title ?? "Terminal", output: "", sessionId: p.sessionId }
          return { ...s, terminals: { ...s.terminals, [p.terminalId]: { ...t, output: t.output + p.data } } }
        })
        return
      }
      case "_bridge/terminal_exit": {
        const p = params as { terminalId: string; exitStatus: acp.TerminalExitStatus }
        this.set((s) => {
          const t = s.terminals[p.terminalId]
          return t ? { ...s, terminals: { ...s.terminals, [p.terminalId]: { ...t, exitStatus: p.exitStatus } } } : s
        })
        return
      }
      case "_bridge/fs_write": {
        const p = params as { sessionId: string; path: string; oldText: string | null; newText: string }
        const writes = this.turnWrites.get(p.sessionId) ?? new Map<string, EditedFileState>()
        const prev = writes.get(p.path)
        writes.set(p.path, { path: p.path, oldText: prev ? prev.oldText : p.oldText, newText: p.newText })
        this.turnWrites.set(p.sessionId, writes)
        return
      }
      case "_bridge/files": {
        const p = params as { files: string[]; root?: string }
        this.set((s) => ({ ...s, files: p.files, workspaceRoot: p.root ?? s.workspaceRoot }))
        return
      }
      case "_bridge/agent_stderr":
        this.log(String((params as { data: string }).data).trimEnd())
        return
      case "_bridge/agent_exit": {
        const p = params as { code: number | null; signal: string | null }
        this.set((s) => ({ ...s, connection: "error", error: `Agent exited (${p.signal ?? `code ${p.code}`})` }))
        return
      }
      default:
        // Unknown extension notifications are ignored, as ACP asks.
        return
    }
  }

  /* ----------------------------- connection ------------------------------- */

  async connect(transport: AcpTransport, options: ConnectOptions = {}) {
    this.disconnect()
    this.transport = transport
    this.set((s) => ({ ...INITIAL, connection: "connecting", transportLabel: transport.label, files: s.files }))
    this.unsubs.push(transport.onMessage(this.onMessage))
    this.unsubs.push(
      transport.onClose((reason) => {
        this.failPending(new Error(reason))
        this.set((s) => ({ ...s, connection: "error", error: reason }))
      })
    )
    try {
      await options.beforeInitialize?.(this)
      const res = await this.request<acp.InitializeResponse>("initialize", {
        protocolVersion: PROTOCOL_VERSION,
        clientCapabilities: options.clientCapabilities ?? { fs: { readTextFile: true, writeTextFile: true }, terminal: true },
        clientInfo: options.clientInfo ?? { name: "qinyang-agent-workspace", title: "Agent Workspace", version: "1.0.0" },
      } satisfies acp.InitializeRequest)
      this.set((s) => ({
        ...s,
        connection: "ready",
        agentInfo: res.agentInfo,
        agentCapabilities: res.agentCapabilities,
        authMethods: res.authMethods ?? [],
      }))
      return res
    } catch (err) {
      this.set((s) => ({ ...s, connection: "error", error: err instanceof Error ? err.message : String(err) }))
      throw err
    }
  }

  disconnect() {
    for (const u of this.unsubs) u()
    this.unsubs = []
    this.failPending(new Error("Disconnected"))
    for (const resolve of this.permissionWaiters.values()) resolve({ outcome: { outcome: "cancelled" } })
    this.permissionWaiters.clear()
    this.transport?.close()
    this.transport = null
  }

  private failPending(err: Error) {
    for (const p of this.pending.values()) p.reject(err)
    this.pending.clear()
  }

  /** Run an `authenticate` method the agent advertised. */
  authenticate(methodId: string) {
    return this.request<acp.AuthenticateResponse>("authenticate", { methodId } satisfies acp.AuthenticateRequest)
  }

  /* ------------------------------- sessions ------------------------------- */

  async newSession(cwd: string, mcpServers: acp.McpServer[] = []) {
    const res = await this.request<acp.NewSessionResponse & { models?: AgentModelState | null }>("session/new", {
      cwd,
      mcpServers,
    } satisfies acp.NewSessionRequest)
    this.set((s) => ({
      ...s,
      sessions: {
        ...s.sessions,
        [res.sessionId]: {
          ...emptySession(res.sessionId, cwd),
          modes: res.modes ?? null,
          configOptions: res.configOptions ?? [],
          models: res.models ?? null,
        },
      },
    }))
    return res.sessionId
  }

  /** List the agent's past sessions (when it supports `session/list`). */
  async listSessions(cwd?: string) {
    if (!this.state.agentCapabilities?.sessionCapabilities?.list) return []
    const res = await this.request<acp.ListSessionsResponse>("session/list", cwd ? { cwd } : {})
    this.set((s) => ({ ...s, sessionList: res.sessions }))
    return res.sessions
  }

  /** Re-open a past session; the agent replays it as session/update notifications. */
  async loadSession(sessionId: string, cwd: string, title?: string) {
    if (this.state.sessions[sessionId]) return sessionId
    const info = this.state.sessionList.find((x) => x.sessionId === sessionId)
    this.set((s) => ({
      ...s,
      sessions: {
        ...s.sessions,
        [sessionId]: { ...emptySession(sessionId, cwd, title ?? info?.title ?? "Thread"), status: "loading", meta: info?._meta ?? undefined },
      },
    }))
    const res = await this.request<acp.LoadSessionResponse & { models?: AgentModelState | null }>("session/load", {
      sessionId,
      cwd,
      mcpServers: [],
    } satisfies acp.LoadSessionRequest)
    this.finishTurn(sessionId)
    this.patchSession(sessionId, (s) => ({
      ...s,
      status: "idle",
      modes: res?.modes ?? s.modes,
      configOptions: res?.configOptions ?? s.configOptions,
      models: res?.models ?? s.models,
    }))
    return sessionId
  }

  /** Forget a session locally (closing its tab keeps it in the list; this removes it). */
  dropSession(sessionId: string) {
    this.set((s) => {
      const sessions = { ...s.sessions }
      delete sessions[sessionId]
      return { ...s, sessions }
    })
  }

  /**
   * Send a prompt. `@path` mentions become `resource_link` blocks. If the
   * agent is still working the current turn is cancelled first and the
   * message is marked as steering the conversation.
   */
  async prompt(sessionId: string, text: string) {
    const session = this.state.sessions[sessionId]
    if (!session) throw new Error(`Unknown session ${sessionId}`)
    const steering = session.status === "working"
    if (steering) {
      await this.cancel(sessionId)
      await this.promptRuns.get(sessionId)?.catch(() => null)
    }
    const now = Date.now()
    this.patchSession(sessionId, (s) => ({
      ...s,
      status: "working",
      turnStartedAt: now,
      title: s.timeline.some((i) => i.kind === "user") || s.title !== "New thread" ? s.title : text.slice(0, 60),
      timeline: [...s.timeline, { kind: "user", id: nextId("u"), at: now, text, steering }],
    }))
    const blocks: acp.ContentBlock[] = [{ type: "text", text }]
    const root = session.cwd.replace(/\/$/, "")
    for (const m of text.matchAll(/(?:^|\s)@([^\s]+)/g)) {
      const path = m[1]
      blocks.push({ type: "resource_link", name: path, uri: `file://${path.startsWith("/") ? path : `${root}/${path}`}` })
    }
    const run = this.request<acp.PromptResponse>("session/prompt", { sessionId, prompt: blocks } satisfies acp.PromptRequest)
      .then((res) => {
        this.finishTurn(sessionId, res.stopReason)
        return res
      })
      .catch((err: unknown) => {
        this.finishTurn(sessionId)
        let text = err instanceof Error ? err.message : String(err)
        // Point at the agent's own sign-in route when it asks for authentication.
        const auth = this.state.authMethods[0]
        if (/auth/i.test(text) && auth) text += `. ${auth.description ?? auth.name}`
        this.patchSession(sessionId, (s) => ({
          ...s,
          timeline: [...s.timeline, { kind: "notice", id: nextId("n"), at: Date.now(), tone: "error", text }],
        }))
        return null
      })
    this.promptRuns.set(sessionId, run)
    return run
  }

  /** `session/cancel`; pending permission requests resolve as cancelled, as the spec requires. */
  async cancel(sessionId: string) {
    this.notify("session/cancel", { sessionId } satisfies acp.CancelNotification)
    for (const item of this.state.sessions[sessionId]?.timeline ?? []) {
      if (item.kind === "permission" && item.outcome === undefined) this.resolvePermission(sessionId, item.id, null)
    }
  }

  async setMode(sessionId: string, modeId: string) {
    const prev = this.state.sessions[sessionId]?.modes?.currentModeId
    this.patchSession(sessionId, (s) => (s.modes ? { ...s, modes: { ...s.modes, currentModeId: modeId } } : s))
    try {
      await this.request<acp.SetSessionModeResponse>("session/set_mode", { sessionId, modeId } satisfies acp.SetSessionModeRequest)
    } catch (err) {
      if (prev) this.patchSession(sessionId, (s) => (s.modes ? { ...s, modes: { ...s.modes, currentModeId: prev } } : s))
      throw err
    }
  }

  async setConfigOption(sessionId: string, configId: string, value: string) {
    this.patchSession(sessionId, (s) => ({
      ...s,
      configOptions: s.configOptions.map((o) => (o.id === configId && o.type === "select" ? { ...o, currentValue: value } : o)),
    }))
    const res = await this.request<acp.SetSessionConfigOptionResponse>("session/set_config_option", {
      sessionId,
      configId,
      value,
    } satisfies acp.SetSessionConfigOptionRequest)
    if (res?.configOptions) this.patchSession(sessionId, (s) => ({ ...s, configOptions: res.configOptions }))
  }

  /** Unstable `session/set_model` (agents that return `models` instead of a model config option). */
  async setModel(sessionId: string, modelId: string) {
    this.patchSession(sessionId, (s) => (s.models ? { ...s, models: { ...s.models, currentModelId: modelId } } : s))
    await this.request("session/set_model", { sessionId, modelId })
  }

  /* ----------------------------- permissions ------------------------------ */

  private onPermission(requestId: JsonRpcId, params: acp.RequestPermissionRequest) {
    const id = nextId("perm")
    this.patchSession(params.sessionId, (s) => ({
      ...s,
      timeline: [...s.timeline, { kind: "permission", id, at: Date.now(), requestId, toolCall: params.toolCall, options: params.options }],
    }))
    return new Promise<acp.RequestPermissionResponse>((resolve) => {
      this.permissionWaiters.set(id, resolve)
    })
  }

  /** Answer a permission request with one of its option ids, or `null` to cancel. */
  resolvePermission(sessionId: string, itemId: string, optionId: string | null) {
    const resolve = this.permissionWaiters.get(itemId)
    this.permissionWaiters.delete(itemId)
    this.patchSession(sessionId, (s) => ({
      ...s,
      timeline: s.timeline.map((i) => (i.id === itemId && i.kind === "permission" ? { ...i, outcome: optionId ?? "cancelled" } : i)),
    }))
    resolve?.(optionId ? { outcome: { outcome: "selected", optionId } } : { outcome: { outcome: "cancelled" } })
  }

  /* ------------------------------- bridge --------------------------------- */

  /** Run a shell command in the workspace through the bridge; output streams into `terminals[terminalId]`. */
  async runShell(command: string, terminalId: string) {
    this.set((s) => {
      const t = s.terminals[terminalId] ?? { id: terminalId, title: "Terminal", output: "" }
      return { ...s, terminals: { ...s.terminals, [terminalId]: { ...t, output: `${t.output}\u001b[2m❯\u001b[22m ${command}\n`, exitStatus: undefined } } }
    })
    return this.request<{ exitCode: number | null }>("_bridge/exec", { command, terminalId })
  }

  /** Seed or clear a terminal locally (demo content, the clear button). */
  setTerminal(terminalId: string, output: string, title = "Terminal") {
    this.set((s) => ({ ...s, terminals: { ...s.terminals, [terminalId]: { id: terminalId, title, output } } }))
  }

  async refreshFiles() {
    const res = await this.request<{ files: string[]; root: string }>("_bridge/list_files", {})
    this.set((s) => ({ ...s, files: res.files, workspaceRoot: res.root }))
    return res.files
  }

  readFile(path: string) {
    return this.request<{ content: string }>("_bridge/read_file", { path })
  }

  /** Revert an "Edited files" card: restore every file's old text (delete files the turn created). */
  async undoEdits(sessionId: string, itemId: string) {
    const item = this.state.sessions[sessionId]?.timeline.find((i) => i.id === itemId)
    if (!item || item.kind !== "edits") return
    for (const f of item.files) {
      await this.request("_bridge/write_file", { path: f.path, content: f.oldText }).catch((err: unknown) =>
        this.log(`Undo failed for ${f.path}: ${err instanceof Error ? err.message : String(err)}`)
      )
    }
    this.patchSession(sessionId, (s) => ({
      ...s,
      timeline: s.timeline.map((i) => (i.id === itemId && i.kind === "edits" ? { ...i, undone: true } : i)),
    }))
  }

  /* ------------------------------- updates -------------------------------- */

  private applyUpdate(sessionId: string, update: acp.SessionUpdate) {
    if (!this.state.sessions[sessionId]) {
      // An agent may stream into a session before session/new resolves.
      this.set((s) => ({ ...s, sessions: { ...s.sessions, [sessionId]: emptySession(sessionId, s.workspaceRoot ?? "") } }))
    }
    const at = stampOf(update)
    this.patchSession(sessionId, (s) => reduceUpdate(s, update, at, () => this.finishTurnState(s, sessionId)))
  }

  /** Close a turn: settle open work groups and summarise the files it changed. */
  private finishTurn(sessionId: string, stopReason?: acp.StopReason) {
    this.patchSession(sessionId, (s) => ({ ...this.finishTurnState(s, sessionId), status: "idle", lastStopReason: stopReason }))
  }

  private finishTurnState(s: SessionState, sessionId: string): SessionState {
    const now = Date.now()
    // Turn boundary: the last user message.
    let start = s.timeline.length
    for (let i = s.timeline.length - 1; i >= 0; i--) {
      if (s.timeline[i].kind === "user") break
      start = i
    }
    const turn = s.timeline.slice(start)
    if (turn.some((i) => i.kind === "edits")) return { ...s, timeline: s.timeline.map((i) => settle(i, now)) }
    const files = new Map<string, EditedFileState>()
    for (const item of turn) {
      if (item.kind !== "work") continue
      for (const id of item.toolCallIds) {
        for (const c of s.toolCalls[id]?.content ?? []) {
          if (c.type !== "diff") continue
          const prev = files.get(c.path)
          files.set(c.path, { path: c.path, oldText: prev ? prev.oldText : (c.oldText ?? null), newText: c.newText })
        }
      }
    }
    for (const w of this.turnWrites.get(sessionId)?.values() ?? []) {
      const prev = files.get(w.path)
      files.set(w.path, { path: w.path, oldText: prev ? prev.oldText : w.oldText, newText: w.newText })
    }
    this.turnWrites.delete(sessionId)
    const lastAt = turn.reduce((t, i) => Math.max(t, "at" in i ? i.at : (i.endedAt ?? i.startedAt)), 0)
    const timeline = s.timeline.map((i) => settle(i, lastAt || now))
    if (files.size) timeline.push({ kind: "edits", id: nextId("e"), at: lastAt || now, files: [...files.values()] })
    return { ...s, timeline }
  }
}

function settle(item: TimelineItem, at: number): TimelineItem {
  if (item.kind === "work" && item.endedAt === undefined) return { ...item, endedAt: at }
  if (item.kind === "assistant" && item.streaming) return { ...item, streaming: false }
  return item
}

/** Fold one `session/update` into a session (pure, apart from the turn-close callback). */
function reduceUpdate(s: SessionState, update: acp.SessionUpdate, at: number, closeTurn: () => SessionState): SessionState {
  const timeline = s.timeline
  const last = timeline[timeline.length - 1]

  /** The open work group at the end of the timeline, or a new one. */
  const withWork = (fn: (w: Extract<TimelineItem, { kind: "work" }>) => Extract<TimelineItem, { kind: "work" }>) => {
    if (last?.kind === "work" && last.endedAt === undefined) return [...timeline.slice(0, -1), fn(last)]
    return [...timeline.map((i) => settle(i, at)), fn({ kind: "work", id: nextId("w"), startedAt: at, toolCallIds: [], thoughts: "" })]
  }

  switch (update.sessionUpdate) {
    case "user_message_chunk": {
      // Replayed history (session/load): a user message closes the previous turn.
      const text = textOf(update.content)
      if (last?.kind === "user" && (update.messageId == null || last.id === update.messageId)) {
        return { ...s, timeline: [...timeline.slice(0, -1), { ...last, text: last.text + text }] }
      }
      const closed = closeTurn()
      const steering = update._meta?.steering === true
      return {
        ...closed,
        title: closed.title === "Thread" || closed.title === "New thread" ? text.slice(0, 60) : closed.title,
        timeline: [...closed.timeline, { kind: "user", id: update.messageId ?? nextId("u"), at, text, steering }],
      }
    }
    case "agent_message_chunk": {
      const text = textOf(update.content)
      if (last?.kind === "assistant" && last.streaming && (update.messageId == null || last.messageId == null || last.messageId === update.messageId)) {
        return { ...s, timeline: [...timeline.slice(0, -1), { ...last, text: last.text + text }] }
      }
      return {
        ...s,
        timeline: [
          ...timeline.map((i) => settle(i, at)),
          { kind: "assistant", id: nextId("a"), at, text, streaming: true, messageId: update.messageId },
        ],
      }
    }
    case "agent_thought_chunk": {
      const text = textOf(update.content)
      return { ...s, timeline: withWork((w) => ({ ...w, thoughts: w.thoughts + text })) }
    }
    case "tool_call": {
      const { sessionUpdate, ...call } = update
      void sessionUpdate
      const known = s.toolCalls[call.toolCallId]
      const tc: ToolCallState = {
        ...known,
        ...call,
        startedAt: known?.startedAt ?? at,
        endedAt: call.status === "completed" || call.status === "failed" ? at : undefined,
      }
      const inTimeline = timeline.some((i) => i.kind === "work" && i.toolCallIds.includes(call.toolCallId))
      return {
        ...s,
        toolCalls: { ...s.toolCalls, [call.toolCallId]: tc },
        timeline: inTimeline ? timeline : withWork((w) => ({ ...w, toolCallIds: [...w.toolCallIds, call.toolCallId] })),
      }
    }
    case "tool_call_update": {
      const { sessionUpdate, ...patch } = update
      void sessionUpdate
      const prev = s.toolCalls[patch.toolCallId] ?? { toolCallId: patch.toolCallId, title: patch.title ?? "Tool call", startedAt: at }
      const next: ToolCallState = { ...prev }
      if (patch.title != null) next.title = patch.title
      if (patch.kind != null) next.kind = patch.kind
      if (patch.status != null) next.status = patch.status
      if (patch.content != null) next.content = patch.content
      if (patch.locations != null) next.locations = patch.locations
      if (patch.rawInput !== undefined) next.rawInput = patch.rawInput
      if (patch.rawOutput !== undefined) next.rawOutput = patch.rawOutput
      if (patch.status === "completed" || patch.status === "failed") next.endedAt = at
      const inTimeline = timeline.some((i) => i.kind === "work" && i.toolCallIds.includes(patch.toolCallId))
      return {
        ...s,
        toolCalls: { ...s.toolCalls, [patch.toolCallId]: next },
        timeline: inTimeline ? timeline : withWork((w) => ({ ...w, toolCallIds: [...w.toolCallIds, patch.toolCallId] })),
      }
    }
    case "plan":
      return { ...s, plan: update.entries }
    case "available_commands_update":
      return { ...s, commands: update.availableCommands }
    case "current_mode_update":
      return s.modes ? { ...s, modes: { ...s.modes, currentModeId: update.currentModeId } } : s
    case "config_option_update":
      return { ...s, configOptions: update.configOptions }
    case "session_info_update":
      return update.title ? { ...s, title: update.title } : s
    case "usage_update":
      return { ...s, usage: { used: update.used, size: update.size } }
    default:
      return s
  }
}

/* -------------------------------------------------------------------------- */
/*  React                                                                     */
/* -------------------------------------------------------------------------- */

/** Subscribe a component to the client store. */
export function useAcpClient(client: AcpClient) {
  return React.useSyncExternalStore(client.subscribe, client.getState, client.getState)
}

/** The selector helpers below read the session's config options the way ACP categorises them. */
export function configByCategory(session: SessionState | undefined, category: string) {
  return session?.configOptions.find((o) => o.category === category && o.type === "select") as
    | (acp.SessionConfigOption & { type: "select"; currentValue: string; options: acp.SessionConfigSelectOptions })
    | undefined
}

/** Flatten grouped select options. */
export function flatOptions(options: acp.SessionConfigSelectOptions): (acp.SessionConfigSelectOption & { group?: string })[] {
  return options.flatMap((o) => ("options" in o ? o.options.map((x) => ({ ...x, group: o.name })) : [o]))
}
