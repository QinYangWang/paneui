#!/usr/bin/env node
/**
 * ACP bridge for the Agent Workspace template.
 *
 * Browsers cannot spawn processes or touch your files, so this small Node
 * server sits between the web UI and any Agent Client Protocol agent:
 *
 *   browser ── WebSocket (JSON-RPC) ──► acp-bridge ── stdio (ndjson) ──► agent
 *
 * - The browser sends `_bridge/spawn` with the agent's command, then speaks
 *   plain ACP (initialize, session/new, session/prompt, …); the bridge pipes it
 *   to the agent's stdin and pipes the agent's stdout back.
 * - Client-side methods the agent calls (fs/read_text_file,
 *   fs/write_text_file, terminal/*) are answered here, inside --root only.
 *   Terminal output and file writes are mirrored to the browser as `_bridge/*`
 *   notifications so the UI can show live output and offer Undo.
 * - `_bridge/list_files`, `_bridge/read_file`, `_bridge/write_file` and
 *   `_bridge/exec` power the explorer, the edited-files Undo and the terminal.
 *
 * Usage:
 *   node server/acp-bridge.mjs --root . [--port 8787] [--host 127.0.0.1] [--token <secret>]
 *
 * Every connection must present the token (printed at start, or
 * ACP_BRIDGE_TOKEN). Anyone holding it can run commands as you, so keep the
 * default 127.0.0.1 binding unless you know what you are doing.
 *
 * Requires Node 18+ and the `ws` package.
 */
import { spawn, execFile } from "node:child_process"
import { randomBytes, timingSafeEqual } from "node:crypto"
import { existsSync, statSync } from "node:fs"
import { mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises"
import { createServer } from "node:http"
import path from "node:path"
import { WebSocketServer } from "ws"

/* --------------------------------- options -------------------------------- */

function arg(name, fallback) {
  const i = process.argv.indexOf(`--${name}`)
  return i > 0 && process.argv[i + 1] ? process.argv[i + 1] : fallback
}

const ROOT = path.resolve(arg("root", process.env.ACP_BRIDGE_ROOT ?? process.cwd()))
const PORT = Number(arg("port", process.env.ACP_BRIDGE_PORT ?? 8787))
const HOST = arg("host", process.env.ACP_BRIDGE_HOST ?? "127.0.0.1")
const TOKEN = arg("token", process.env.ACP_BRIDGE_TOKEN ?? randomBytes(12).toString("hex"))
const VERBOSE = process.argv.includes("--verbose") || process.env.ACP_BRIDGE_VERBOSE === "1"
const MAX_FILE = 2 * 1024 * 1024
const MAX_FILES = 5000

if (!existsSync(ROOT) || !statSync(ROOT).isDirectory()) {
  console.error(`acp-bridge: --root ${ROOT} is not a directory`)
  process.exit(1)
}

const log = (...a) => VERBOSE && console.error("[acp-bridge]", ...a)

/* --------------------------------- helpers -------------------------------- */

/** Resolve a path from the agent or the UI and refuse anything outside ROOT. */
function inside(p) {
  if (typeof p !== "string" || !p) throw rpcError(-32602, "path is required")
  const abs = path.resolve(ROOT, p)
  const rel = path.relative(ROOT, abs)
  if (rel.startsWith("..") || path.isAbsolute(rel)) throw rpcError(-32602, `Path is outside the workspace root: ${p}`)
  return abs
}

function rpcError(code, message, data) {
  const e = new Error(message)
  e.code = code
  e.data = data
  return e
}

/** Keep at most `limit` bytes from the end of `text`, cutting at a character boundary. */
function tail(text, limit) {
  if (!limit || Buffer.byteLength(text) <= limit) return { text, truncated: false }
  const buf = Buffer.from(text)
  let start = buf.length - limit
  while (start < buf.length && (buf[start] & 0xc0) === 0x80) start++
  return { text: buf.subarray(start).toString("utf8"), truncated: true }
}

async function listFiles() {
  const viaGit = await new Promise((resolve) => {
    execFile("git", ["-C", ROOT, "ls-files", "--cached", "--others", "--exclude-standard"], { maxBuffer: 32 * 1024 * 1024 }, (err, stdout) =>
      resolve(err ? null : stdout.split("\n").filter(Boolean))
    )
  })
  if (viaGit) return viaGit.slice(0, MAX_FILES)
  const out = []
  const skip = new Set(["node_modules", ".git", ".next", "dist", "build", ".turbo", ".cache"])
  async function walk(dir) {
    if (out.length >= MAX_FILES) return
    for (const entry of await readdir(dir, { withFileTypes: true }).catch(() => [])) {
      if (out.length >= MAX_FILES) return
      if (skip.has(entry.name)) continue
      const abs = path.join(dir, entry.name)
      if (entry.isDirectory()) await walk(abs)
      else out.push(path.relative(ROOT, abs).split(path.sep).join("/"))
    }
  }
  await walk(ROOT)
  return out
}

/* ------------------------------- connections ------------------------------ */

function handleConnection(ws) {
  /** @type {import("node:child_process").ChildProcess | null} */
  let agent = null
  let buffer = ""
  const terminals = new Map()
  let nextTerminal = 1

  const toBrowser = (msg) => ws.readyState === ws.OPEN && ws.send(JSON.stringify(msg))
  const notify = (method, params) => toBrowser({ jsonrpc: "2.0", method, params })
  const toAgent = (msg) => {
    if (!agent?.stdin?.writable) return false
    agent.stdin.write(`${JSON.stringify(msg)}\n`)
    return true
  }

  /* ----------------------------- terminals ------------------------------ */

  function startTerminal({ command, args = [], env = [], cwd, outputByteLimit, sessionId, terminalId, title }) {
    const id = terminalId ?? `term_${nextTerminal++}`
    const workdir = cwd ? inside(cwd) : ROOT
    const envObj = { ...process.env, FORCE_COLOR: "1" }
    for (const v of env) envObj[v.name] = v.value
    // A bare command line (no args) goes through the shell, so pipes and && work.
    const child = args.length ? spawn(command, args, { cwd: workdir, env: envObj }) : spawn(command, { cwd: workdir, env: envObj, shell: true })
    const term = { id, child, output: "", truncated: false, exitStatus: null, limit: outputByteLimit ?? 1024 * 1024, waiters: [] }
    terminals.set(id, term)
    const onData = (chunk) => {
      const data = chunk.toString("utf8")
      const next = tail(term.output + data, term.limit)
      term.output = next.text
      term.truncated ||= next.truncated
      notify("_bridge/terminal_output", { terminalId: id, data, sessionId, title: title ?? [command, ...args].join(" ").slice(0, 40) })
    }
    child.stdout.on("data", onData)
    child.stderr.on("data", onData)
    const finish = (exitCode, signal) => {
      if (term.exitStatus) return
      term.exitStatus = { exitCode, signal }
      notify("_bridge/terminal_exit", { terminalId: id, exitStatus: term.exitStatus })
      for (const w of term.waiters) w(term.exitStatus)
      term.waiters = []
    }
    child.on("exit", (code, signal) => finish(code, signal))
    child.on("error", (err) => {
      onData(Buffer.from(`${err.message}\n`))
      finish(127, null)
    })
    return term
  }

  function terminal(id) {
    const t = terminals.get(id)
    if (!t) throw rpcError(-32602, `Unknown terminal ${id}`)
    return t
  }

  /* ------------------- client methods the agent calls ------------------- */

  const clientMethods = {
    async "fs/read_text_file"({ path: p, line, limit }) {
      const text = await readFile(inside(p), "utf8")
      if (line == null && limit == null) return { content: text }
      const lines = text.split("\n")
      const start = Math.max(0, (line ?? 1) - 1)
      return { content: lines.slice(start, limit == null ? undefined : start + limit).join("\n") }
    },
    async "fs/write_text_file"({ path: p, content, sessionId }) {
      const abs = inside(p)
      const oldText = await readFile(abs, "utf8").catch(() => null)
      await mkdir(path.dirname(abs), { recursive: true })
      await writeFile(abs, content, "utf8")
      notify("_bridge/fs_write", { sessionId, path: abs, oldText, newText: content })
      return {}
    },
    async "terminal/create"(params) {
      return { terminalId: startTerminal(params).id }
    },
    async "terminal/output"({ terminalId }) {
      const t = terminal(terminalId)
      return { output: t.output, truncated: t.truncated, ...(t.exitStatus ? { exitStatus: t.exitStatus } : {}) }
    },
    async "terminal/wait_for_exit"({ terminalId }) {
      const t = terminal(terminalId)
      return t.exitStatus ?? new Promise((resolve) => t.waiters.push(resolve))
    },
    async "terminal/kill"({ terminalId }) {
      const t = terminal(terminalId)
      if (!t.exitStatus) t.child.kill("SIGTERM")
      return {}
    },
    async "terminal/release"({ terminalId }) {
      const t = terminals.get(terminalId)
      if (t && !t.exitStatus) t.child.kill("SIGTERM")
      terminals.delete(terminalId)
      return {}
    },
  }

  /* -------------------- bridge methods the UI calls --------------------- */

  const bridgeMethods = {
    async "_bridge/spawn"({ command, args = [], env = {} }) {
      if (!command) throw rpcError(-32602, "command is required")
      if (agent) agent.kill()
      log("spawn", command, args.join(" "))
      const child = spawn(command, args, {
        cwd: ROOT,
        env: { ...process.env, ...env },
        stdio: ["pipe", "pipe", "pipe"],
        shell: process.platform === "win32",
      })
      agent = child
      buffer = ""
      child.stdout.on("data", (chunk) => {
        buffer += chunk.toString("utf8")
        let nl
        while ((nl = buffer.indexOf("\n")) >= 0) {
          const line = buffer.slice(0, nl).trim()
          buffer = buffer.slice(nl + 1)
          if (line) void fromAgent(line)
        }
      })
      child.stderr.on("data", (chunk) => notify("_bridge/agent_stderr", { data: chunk.toString("utf8") }))
      child.on("exit", (code, signal) => {
        log("agent exited", code, signal)
        if (agent === child) agent = null
        notify("_bridge/agent_exit", { code, signal })
      })
      await new Promise((resolve, reject) => {
        child.once("spawn", resolve)
        child.once("error", (err) => reject(rpcError(-32000, `Could not start ${command}: ${err.message}`)))
      })
      return { root: ROOT, pid: child.pid }
    },
    async "_bridge/list_files"() {
      return { files: await listFiles(), root: ROOT }
    },
    async "_bridge/read_file"({ path: p }) {
      const abs = inside(p)
      if (statSync(abs).size > MAX_FILE) throw rpcError(-32000, "File is too large to preview")
      return { content: await readFile(abs, "utf8") }
    },
    async "_bridge/write_file"({ path: p, content }) {
      const abs = inside(p)
      if (content === null || content === undefined) await rm(abs, { force: true })
      else {
        await mkdir(path.dirname(abs), { recursive: true })
        await writeFile(abs, content, "utf8")
      }
      return null
    },
    async "_bridge/exec"({ command, terminalId }) {
      const t = startTerminal({ command, terminalId, title: "Terminal" })
      const status = t.exitStatus ?? (await new Promise((resolve) => t.waiters.push(resolve)))
      terminals.delete(t.id)
      return status
    },
  }

  /* -------------------------------- routing ------------------------------- */

  async function answer(send, msg, table) {
    try {
      const result = await table[msg.method](msg.params ?? {})
      send({ jsonrpc: "2.0", id: msg.id, result: result ?? null })
    } catch (err) {
      send({ jsonrpc: "2.0", id: msg.id, error: { code: err.code ?? -32603, message: err.message, data: err.data } })
    }
  }

  async function fromAgent(line) {
    let msg
    try {
      msg = JSON.parse(line)
    } catch {
      notify("_bridge/agent_stderr", { data: `non-JSON output: ${line}\n` })
      return
    }
    log("agent →", msg.method ?? `response ${msg.id}`)
    if (msg.method && msg.id != null && clientMethods[msg.method]) return answer(toAgent, msg, clientMethods)
    toBrowser(msg)
  }

  ws.on("message", (data) => {
    for (const line of data.toString("utf8").split("\n")) {
      if (!line.trim()) continue
      let msg
      try {
        msg = JSON.parse(line)
      } catch {
        continue
      }
      log("ui →", msg.method ?? `response ${msg.id}`)
      if (msg.method?.startsWith("_bridge/")) {
        if (bridgeMethods[msg.method]) void answer(toBrowser, msg, bridgeMethods)
        else if (msg.id != null) toBrowser({ jsonrpc: "2.0", id: msg.id, error: { code: -32601, message: `Unknown bridge method ${msg.method}` } })
        continue
      }
      if (!toAgent(msg) && msg.id != null && msg.method)
        toBrowser({ jsonrpc: "2.0", id: msg.id, error: { code: -32000, message: "No agent running: send _bridge/spawn first" } })
    }
  })

  ws.on("close", () => {
    agent?.kill()
    for (const t of terminals.values()) if (!t.exitStatus) t.child.kill("SIGTERM")
  })
}

/* --------------------------------- server --------------------------------- */

function tokenOk(given) {
  const a = Buffer.from(String(given ?? ""))
  const b = Buffer.from(TOKEN)
  return a.length === b.length && timingSafeEqual(a, b)
}

const server = createServer((req, res) => {
  res.writeHead(200, { "content-type": "application/json", "access-control-allow-origin": "*" })
  res.end(JSON.stringify({ name: "acp-bridge", root: ROOT, websocket: `ws://${HOST}:${PORT}/?token=…` }))
})

const wss = new WebSocketServer({ noServer: true })
server.on("upgrade", (req, socket, head) => {
  const url = new URL(req.url ?? "/", "http://localhost")
  if (!tokenOk(url.searchParams.get("token"))) {
    socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n")
    socket.destroy()
    return
  }
  wss.handleUpgrade(req, socket, head, (ws) => handleConnection(ws))
})

server.listen(PORT, HOST, () => {
  console.log(`ACP bridge ready
  workspace  ${ROOT}
  address    ws://${HOST}:${PORT}
  token      ${TOKEN}
Paste the address and token into Settings → Agents in the Agent Workspace.`)
})
