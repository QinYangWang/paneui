"use client"

import * as React from "react"

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ClipboardListIcon,
  Columns2Icon,
  EditIcon,
  FolderIcon,
  GitBranchIcon,
  GridIcon,
  HelpCircleIcon,
  HistoryIcon,
  HomeIcon,
  InboxIcon,
  MoonIcon,
  PanelRightIcon,
  PlusIcon,
  SettingsIcon,
  SidebarIcon,
  TerminalSquareIcon,
} from "@/components/icons"
import { cn } from "@/lib/utils"
import { CommandPalette, type CommandPaletteItem } from "@/registry/base-nova/blocks/command-palette/command-palette"
import { Button } from "@/registry/base-nova/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/registry/base-nova/ui/dialog"
import { FileDiff } from "@/registry/base-nova/ui/file-diff"
import { IconRail, IconRailAvatar, IconRailGroup, IconRailItem, IconRailSpacer } from "@/registry/base-nova/ui/icon-rail"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  type ResizablePanelGroupHandle,
} from "@/registry/base-nova/ui/resizable"
import { TabStrip, TabStripItem } from "@/registry/base-nova/ui/tab-strip"
import { useThemeToggle } from "@/registry/base-nova/ui/theme-toggle"
import { Tooltip, TooltipContent, TooltipKbd, TooltipProvider, TooltipTrigger } from "@/registry/base-nova/ui/tooltip"

import { AcpClient, useAcpClient, type EditedFileState } from "./acp/client"
import { DEMO_CWD, DEMO_STATUS, DEMO_TERMINAL } from "./acp/demo-data"
import { createMockTransport } from "./acp/mock-agent"
import { createWebSocketTransport } from "./acp/transport"
import { DEMO_AGENT, loadAgents, loadBridge, saveAgents, saveBridge, type AgentConfig, type BridgeConfig } from "./parts/agents"
import { ChatPane } from "./parts/chat-pane"
import { Dock, type DockTab } from "./parts/dock"
import { ProviderIcon } from "./parts/provider-icon"
import { SettingsDialog } from "./parts/settings-dialog"
import { ThreadsSidebar, type ThreadSummary } from "./parts/threads-sidebar"

const DEMO_TABS = ["sess_scrollbar", "sess_hide_empty", "sess_split_close", "sess_fix_drag"]

function ToolbarButton({ label, shortcut, onClick, pressed, children }: { label: string; shortcut?: string; onClick?: () => void; pressed?: boolean; children: React.ReactNode }) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button variant="ghost" size="icon-sm" aria-label={label} aria-pressed={pressed} onClick={onClick} className={cn("text-muted-foreground", pressed && "text-foreground")}>
            {children}
          </Button>
        }
      />
      <TooltipContent side="bottom">
        {label}
        {shortcut && <TooltipKbd>{shortcut}</TooltipKbd>}
      </TooltipContent>
    </Tooltip>
  )
}

/**
 * Synara-style multi-provider coding-agent workspace, wired to the Agent
 * Client Protocol: an icon rail, a threads sidebar, tabs of open threads,
 * one or two chat panes and a dock with terminal, explorer and browser.
 * Starts on the offline demo agent; Settings → Agents connects real ACP
 * agents through server/acp-bridge.mjs.
 */
export function AgentWorkspace() {
  const client = React.useMemo(() => new AcpClient(), [])
  const state = useAcpClient(client)
  const { toggle: toggleTheme } = useThemeToggle()

  const [agents, setAgents] = React.useState<AgentConfig[]>([DEMO_AGENT])
  const [bridge, setBridge] = React.useState<BridgeConfig>({ url: "ws://127.0.0.1:8787", token: "" })
  const [agentId, setAgentId] = React.useState("demo")
  const [settingsOpen, setSettingsOpen] = React.useState(false)
  const [paletteOpen, setPaletteOpen] = React.useState(false)

  const [tabs, setTabs] = React.useState<string[]>([])
  const [left, setLeft] = React.useState<string | null>(null)
  const [right, setRight] = React.useState<string | null>(null)
  const [focus, setFocus] = React.useState<"left" | "right">("left")
  const history = React.useRef<{ stack: string[]; index: number }>({ stack: [], index: -1 })
  const [autofixDismissed, setAutofixDismissed] = React.useState<Record<string, boolean>>({})
  const [review, setReview] = React.useState<EditedFileState[] | null>(null)

  const [sidebarOpen, setSidebarOpen] = React.useState(true)
  const [dockOpen, setDockOpen] = React.useState(true)
  const [dockTab, setDockTab] = React.useState<DockTab>("terminal")
  const [dockTabs, setDockTabs] = React.useState<DockTab[]>(["terminal", "explorer", "browser"])
  const [explorerPath, setExplorerPath] = React.useState<string | null>(null)
  const outer = React.useRef<ResizablePanelGroupHandle>(null)
  const inner = React.useRef<ResizablePanelGroupHandle>(null)

  const active = focus === "right" && right ? right : left
  const agent = agents.find((a) => a.id === agentId) ?? DEMO_AGENT

  /* ------------------------------ threads ------------------------------- */

  const threads = React.useMemo<ThreadSummary[]>(() => {
    const listed = state.sessionList.map((info) => {
      const meta = (info._meta ?? {}) as Partial<ThreadSummary>
      const s = state.sessions[info.sessionId]
      return {
        sessionId: info.sessionId,
        title: s?.title ?? info.title ?? "Thread",
        provider: meta.provider,
        repo: meta.repo,
        pr: meta.pr,
        branch: meta.branch,
        group: meta.group ?? "Recent",
        running: s?.status === "working",
      }
    })
    const local = Object.values(state.sessions)
      .filter((s) => !state.sessionList.some((i) => i.sessionId === s.id))
      .map((s) => ({
        sessionId: s.id,
        title: s.title,
        provider: agent.provider,
        repo: s.cwd.split("/").filter(Boolean).pop(),
        group: "Recent",
        running: s.status === "working",
      }))
    return [...local.reverse(), ...listed]
  }, [state.sessionList, state.sessions, agent.provider])

  const threadOf = (id: string | null) => threads.find((t) => t.sessionId === id)

  const ensureLoaded = React.useCallback(
    (id: string) => {
      if (client.getState().sessions[id]) return
      const info = client.getState().sessionList.find((i) => i.sessionId === id)
      if (info) void client.loadSession(id, info.cwd, info.title ?? undefined).catch(() => undefined)
    },
    [client]
  )

  const show = React.useCallback(
    (id: string, pane: "left" | "right" = focus, record = true) => {
      ensureLoaded(id)
      setTabs((t) => (t.includes(id) ? t : [...t, id]))
      if (pane === "right" && right) setRight(id)
      else setLeft(id)
      if (record) {
        const h = history.current
        h.stack = [...h.stack.slice(0, h.index + 1), id]
        h.index = h.stack.length - 1
      }
    },
    [ensureLoaded, focus, right]
  )

  const go = (d: -1 | 1) => {
    const h = history.current
    const next = h.index + d
    if (next < 0 || next >= h.stack.length) return
    h.index = next
    show(h.stack[next], focus, false)
  }

  const closeTab = (id: string) => {
    const i = tabs.indexOf(id)
    const rest = tabs.filter((t) => t !== id)
    setTabs(rest)
    if (right === id) {
      setRight(null)
      setFocus("left")
    }
    if (left === id) setLeft(rest[Math.min(i, rest.length - 1)] ?? null)
  }

  const newThread = React.useCallback(async () => {
    if (client.getState().connection !== "ready") return
    const cwd = client.getState().workspaceRoot ?? DEMO_CWD
    const id = await client.newSession(cwd)
    show(id)
  }, [client, show])

  const fork = async (text: string) => {
    const id = await client.newSession(client.getState().workspaceRoot ?? DEMO_CWD)
    show(id)
    if (text) void client.prompt(id, `Continue from this answer:\n\n${text.slice(0, 600)}`)
  }

  const toggleSplit = () => {
    if (right) {
      setRight(null)
      setFocus("left")
      return
    }
    const other = tabs.find((t) => t !== left)
    if (other) {
      ensureLoaded(other)
      setRight(other)
      setFocus("right")
    }
  }

  /* ----------------------------- connection ----------------------------- */

  const connect = React.useCallback(
    async (target: AgentConfig, bridgeConfig: BridgeConfig) => {
      setAgentId(target.id)
      setTabs([])
      setLeft(null)
      setRight(null)
      history.current = { stack: [], index: -1 }
      if (target.builtin) {
        await client.connect(createMockTransport(), { clientCapabilities: { fs: { readTextFile: false, writeTextFile: false }, terminal: false } })
        await client.refreshFiles()
        client.setTerminal("user-1", DEMO_TERMINAL)
        await client.listSessions(DEMO_CWD)
        setTabs(DEMO_TABS)
        DEMO_TABS.forEach((id) => client.getState().sessions[id] || void client.loadSession(id, DEMO_CWD).catch(() => undefined))
        setLeft("sess_fix_drag")
        history.current = { stack: ["sess_fix_drag"], index: 0 }
        return
      }
      const url = `${bridgeConfig.url.replace(/\/$/, "")}/?token=${encodeURIComponent(bridgeConfig.token)}`
      try {
        const transport = await createWebSocketTransport(url)
        await client.connect(transport, {
          beforeInitialize: (c) => c.request("_bridge/spawn", { command: target.command, args: target.args, env: target.env }),
        })
        const files = await client.refreshFiles().catch(() => [])
        void files
        client.setTerminal("user-1", "", "Terminal")
        const root = client.getState().workspaceRoot ?? "/"
        await client.listSessions(root).catch(() => [])
        const id = await client.newSession(root)
        setTabs([id])
        setLeft(id)
      } catch (err) {
        // The client already records the error on its state; keep the settings open so it shows.
        setSettingsOpen(true)
        void err
      }
    },
    [client]
  )

  // Restore saved agents and bridge address, then start on the demo agent.
  React.useEffect(() => {
    setAgents(loadAgents())
    setBridge(loadBridge())
    void connect(DEMO_AGENT, loadBridge())
    return () => client.disconnect()
  }, [client, connect])

  /* ----------------------------- shortcuts ------------------------------ */

  const toggleSidebar = () => outer.current?.toggle("threads")
  const toggleDock = () => inner.current?.toggle("dock")

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!(e.metaKey || e.ctrlKey) || e.altKey) return
      const k = e.key.toLowerCase()
      if (k === "b") toggleSidebar()
      else if (k === "j") toggleDock()
      else if (k === "n") void newThread()
      else if (k === "\\") toggleSplit()
      else if (k === ",") setSettingsOpen(true)
      else if (/^[1-9]$/.test(k) && tabs[Number(k) - 1]) show(tabs[Number(k) - 1])
      else return
      e.preventDefault()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  })

  const paletteItems: CommandPaletteItem[] = [
    { id: "new", label: "New thread", group: "Threads", shortcut: ["⌘", "N"], icon: EditIcon, onSelect: () => void newThread() },
    { id: "split", label: right ? "Close split view" : "Split chats side by side", group: "View", shortcut: ["⌘", "\\"], icon: Columns2Icon, onSelect: toggleSplit },
    { id: "sidebar", label: "Toggle threads sidebar", group: "View", shortcut: ["⌘", "B"], icon: SidebarIcon, onSelect: toggleSidebar },
    { id: "dock", label: "Toggle terminal panel", group: "View", shortcut: ["⌘", "J"], icon: TerminalSquareIcon, onSelect: toggleDock },
    { id: "theme", label: "Toggle dark mode", group: "View", icon: MoonIcon, onSelect: toggleTheme },
    { id: "agents", label: "Manage agents…", group: "Settings", shortcut: ["⌘", ","], icon: SettingsIcon, onSelect: () => setSettingsOpen(true) },
    ...threads.map((t) => ({ id: `t-${t.sessionId}`, label: t.title, group: "Open thread", description: t.branch, icon: HistoryIcon, onSelect: () => show(t.sessionId) })),
  ]

  /* ------------------------------- render ------------------------------- */

  const statusLine = agent.builtin
    ? DEMO_STATUS
    : `\u001b[34m${state.agentInfo?.title ?? state.agentInfo?.name ?? agent.name}\u001b[0m  \u001b[2m${state.workspaceRoot ?? ""}\u001b[0m  ${state.connection === "ready" ? "\u001b[32m● connected\u001b[0m" : `\u001b[31m● ${state.connection}\u001b[0m`}`

  const pane = (id: string | null, side: "left" | "right") => (
    <ChatPane
      client={client}
      state={state}
      session={id ? state.sessions[id] : undefined}
      thread={threadOf(id)}
      focused={focus === side}
      onFocus={() => setFocus(side)}
      showAutofix={!!id && !autofixDismissed[id]}
      onDismissAutofix={() => id && setAutofixDismissed((d) => ({ ...d, [id]: true }))}
      onReview={setReview}
      onFork={(text) => void fork(text)}
      onReveal={(path) => {
        setExplorerPath(path)
        setDockTabs((t) => (t.includes("explorer") ? t : [...t, "explorer"]))
        setDockTab("explorer")
        inner.current?.expand("dock")
      }}
    />
  )

  return (
    <TooltipProvider>
      <div className="flex h-dvh w-full overflow-hidden bg-shell text-foreground">
        <IconRail aria-label="App">
          <IconRailGroup>
            <IconRailItem label="Home" icon={<HomeIcon />} onClick={() => left && show(left)} />
            <IconRailItem label="Inbox" icon={<InboxIcon />} />
            <IconRailItem label="Tasks" icon={<ClipboardListIcon />} />
            <IconRailItem label="Branches" icon={<GitBranchIcon />} onClick={() => setDockTab("explorer")} />
            <IconRailItem label="History" shortcut="⌘K" icon={<HistoryIcon />} onClick={() => setPaletteOpen(true)} />
            <IconRailItem label="Agents" icon={<GridIcon />} onClick={() => setSettingsOpen(true)} />
            <IconRailItem label="Threads" shortcut="⌘B" icon={<FolderIcon />} active={sidebarOpen} onClick={toggleSidebar} />
          </IconRailGroup>
          <IconRailSpacer />
          <IconRailGroup>
            {agents.slice(0, 3).map((a) => (
              <IconRailAvatar
                key={a.id}
                label={a.name}
                hint={a.id === agentId ? state.connection : "not connected"}
                status={a.id !== agentId ? "offline" : state.connection === "ready" ? "online" : state.connection === "connecting" ? "busy" : "error"}
                onClick={() => (a.builtin ? void connect(a, bridge) : setSettingsOpen(true))}
              >
                <ProviderIcon provider={a.provider} />
              </IconRailAvatar>
            ))}
            <IconRailItem label="Command palette" shortcut="⌘K" icon={<HelpCircleIcon />} onClick={() => setPaletteOpen(true)} />
            <IconRailItem label="Settings" shortcut="⌘," icon={<SettingsIcon />} onClick={() => setSettingsOpen(true)} />
          </IconRailGroup>
        </IconRail>

        <ResizablePanelGroup direction="horizontal" autoSaveId="agent-workspace-shell" handleRef={outer} className="min-w-0 flex-1">
          <ResizablePanel id="threads" defaultSize="248px" minSize="220px" maxSize="420px" collapsible onCollapsedChange={(c) => setSidebarOpen(!c)}>
            <div className="flex h-full flex-col">
              <div className="flex h-10 shrink-0 items-center gap-0.5 px-2">
                <ToolbarButton label="Hide sidebar" shortcut="⌘B" onClick={toggleSidebar}>
                  <SidebarIcon />
                </ToolbarButton>
                <ToolbarButton label="Back" onClick={() => go(-1)}>
                  <ArrowLeftIcon />
                </ToolbarButton>
                <ToolbarButton label="Forward" onClick={() => go(1)}>
                  <ArrowRightIcon />
                </ToolbarButton>
              </div>
              <div className="min-h-0 flex-1">
                <ThreadsSidebar
                  threads={threads}
                  activeId={active}
                  onSelect={(id) => show(id)}
                  onNewThread={() => void newThread()}
                  agents={agents}
                  agentId={agentId}
                  onSelectAgent={(id) => {
                    const a = agents.find((x) => x.id === id)
                    if (a?.builtin) void connect(a, bridge)
                    else setSettingsOpen(true)
                  }}
                  onOpenSettings={() => setSettingsOpen(true)}
                />
              </div>
            </div>
          </ResizablePanel>
          <ResizableHandle variant="hidden" />
          <ResizablePanel id="main" minSize={40}>
            <div className="shell-inset mt-0.75 flex h-full min-h-0 flex-col overflow-hidden">
              <ResizablePanelGroup direction="horizontal" autoSaveId="agent-workspace-content" handleRef={inner}>
                <ResizablePanel id="chat" minSize="360px">
                  <div className="flex h-full min-w-0 flex-col">
                    <div className="flex h-10 shrink-0 items-center gap-1 border-b border-border px-2">
                      {!sidebarOpen && (
                        <ToolbarButton label="Show sidebar" shortcut="⌘B" onClick={toggleSidebar}>
                          <SidebarIcon />
                        </ToolbarButton>
                      )}
                      <TabStrip
                        value={active}
                        onValueChange={(id) => show(id)}
                        order={tabs}
                        onReorder={setTabs}
                        onClose={closeTab}
                        aria-label="Open threads"
                        className="min-w-0 flex-1"
                      >
                        {tabs.map((id) => {
                          const t = threadOf(id)
                          return (
                            <TabStripItem key={id} value={id} icon={<ProviderIcon provider={t?.provider} />} indicator={t?.running} className="w-36">
                              {t?.title ?? state.sessions[id]?.title ?? "Thread"}
                            </TabStripItem>
                          )
                        })}
                      </TabStrip>
                      <ToolbarButton label={right ? "Close split" : "Split chats"} shortcut="⌘\" pressed={!!right} onClick={toggleSplit}>
                        <Columns2Icon />
                      </ToolbarButton>
                      <ToolbarButton label="New thread" shortcut="⌘N" onClick={() => void newThread()}>
                        <PlusIcon />
                      </ToolbarButton>
                      <ToolbarButton label={dockOpen ? "Hide panel" : "Show panel"} shortcut="⌘J" pressed={dockOpen} onClick={toggleDock}>
                        <PanelRightIcon />
                      </ToolbarButton>
                    </div>
                    <div className="min-h-0 flex-1">
                      {state.connection === "error" && (
                        <div role="alert" className="flex items-center gap-2 border-b border-border bg-destructive/8 px-4 py-2 text-ui text-destructive">
                          <span className="min-w-0 flex-1 truncate">{state.error ?? "Disconnected"}</span>
                          <Button variant="outline" size="xs" onClick={() => setSettingsOpen(true)}>
                            Agent settings
                          </Button>
                        </div>
                      )}
                      {right ? (
                        <ResizablePanelGroup direction="horizontal" autoSaveId="agent-workspace-split">
                          <ResizablePanel id="left" minSize="320px">
                            {pane(left, "left")}
                          </ResizablePanel>
                          <ResizableHandle />
                          <ResizablePanel id="right" minSize="320px">
                            {pane(right, "right")}
                          </ResizablePanel>
                        </ResizablePanelGroup>
                      ) : left ? (
                        pane(left, "left")
                      ) : (
                        <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
                          <p className="text-ui text-muted-foreground">{state.connection === "connecting" ? "Connecting…" : "No thread open."}</p>
                          <Button variant="secondary" onClick={() => void newThread()} disabled={state.connection !== "ready"}>
                            <EditIcon data-icon="inline-start" />
                            New thread
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel id="dock" defaultSize={44} minSize="300px" collapsible onCollapsedChange={(c) => setDockOpen(!c)}>
                  <Dock
                    client={client}
                    state={state}
                    tab={dockTab}
                    onTabChange={setDockTab}
                    tabs={dockTabs}
                    onTabsChange={setDockTabs}
                    onCollapse={() => inner.current?.collapse("dock")}
                    explorerPath={explorerPath}
                    onExplorerPath={setExplorerPath}
                    status={statusLine}
                  />
                </ResizablePanel>
              </ResizablePanelGroup>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      <CommandPalette items={paletteItems} open={paletteOpen} onOpenChange={setPaletteOpen} placeholder="Search threads and commands…" />

      <SettingsDialog
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
        agents={agents}
        onAgentsChange={(next) => {
          setAgents(next)
          saveAgents(next)
        }}
        bridge={bridge}
        onBridgeChange={(next) => {
          setBridge(next)
          saveBridge(next)
        }}
        activeAgentId={agentId}
        connection={state.connection}
        error={state.error}
        onConnect={(id) => {
          const target = agents.find((a) => a.id === id)
          if (target) void connect(target, bridge)
        }}
      />

      <Dialog open={review !== null} onOpenChange={(o) => !o && setReview(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Review changes</DialogTitle>
            <DialogDescription>
              {review?.length ?? 0} {review?.length === 1 ? "file" : "files"} changed in this turn.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3">
            {review?.map((f) => (
              <FileDiff
                key={f.path}
                filename={f.path.replace(`${state.sessions[active ?? ""]?.cwd ?? ""}/`, "")}
                oldFile={f.oldText}
                newFile={f.newText}
                diffStyleToggle
                defaultOpen={review.length < 4}
                maxHeight={420}
              />
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  )
}
