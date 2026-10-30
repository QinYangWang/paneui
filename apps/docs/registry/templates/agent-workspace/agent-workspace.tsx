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
  SearchIcon,
  SettingsIcon,
  SidebarIcon,
  TerminalSquareIcon,
} from "@paneui/ui/icons"
import { cn } from "@paneui/ui/lib/utils"
import { CommandPalette, type CommandPaletteItem } from "@paneui/ui/blocks/command-palette/command-palette"
import { BottomSheet, BottomSheetContent, BottomSheetTitle } from "@paneui/ui/components/bottom-sheet"
import { Button } from "@paneui/ui/components/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@paneui/ui/components/dialog"
import { Drawer, DrawerContent, DrawerTitle } from "@paneui/ui/components/drawer"
import { FileDiff } from "@paneui/ui/components/file-diff"
import { Kbd } from "@paneui/ui/components/kbd"
import { SidebarRail, SidebarRailAvatar, SidebarRailGroup, SidebarRailItem, SidebarRailSpacer } from "@paneui/ui/components/animated-sidebar"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  type ResizablePanelGroupHandle,
} from "@paneui/ui/components/resizable"
import { TabStrip, TabStripItem } from "@paneui/ui/components/tab-strip"
import { useThemeToggle } from "@paneui/ui/components/theme-toggle"
import { Tooltip, TooltipContent, TooltipKbd, TooltipProvider, TooltipTrigger } from "@paneui/ui/components/tooltip"

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

/** Below `md` the workspace switches to its phone layout. */
const MOBILE_QUERY = "(max-width: 767.98px)"

function useIsMobile() {
  return React.useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(MOBILE_QUERY)
      mq.addEventListener("change", onChange)
      return () => mq.removeEventListener("change", onChange)
    },
    () => window.matchMedia(MOBILE_QUERY).matches,
    () => false
  )
}

function ToolbarButton({
  label,
  shortcut,
  onClick,
  pressed,
  size = "icon-sm",
  children,
}: {
  label: string
  shortcut?: string
  onClick?: () => void
  pressed?: boolean
  size?: "icon-sm" | "icon"
  children: React.ReactNode
}) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button variant="ghost" size={size} aria-label={label} aria-pressed={pressed} onClick={onClick} className={cn("text-muted-foreground", pressed && "text-foreground")}>
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
 * Multi-provider coding-agent workspace, wired to the Agent Client Protocol:
 * an icon rail, a threads sidebar, tabs of open threads, one or two chat
 * panes and a dock with terminal, explorer and browser. Below `md` it becomes
 * a phone layout: a header with the tabs, the rail and threads in a drawer,
 * the dock in a bottom sheet and one full-width chat (no split).
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

  const mobile = useIsMobile()
  const [navOpen, setNavOpen] = React.useState(false)
  const [dockSheetOpen, setDockSheetOpen] = React.useState(false)

  const active = focus === "right" && right && !mobile ? right : left
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
    if (mobile) return
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

  // Tablets (md to lg): open with the dock collapsed so the chat keeps its 360px minimum.
  React.useEffect(() => {
    if (!mobile && window.matchMedia("(max-width: 1023.98px)").matches) inner.current?.collapse("dock")
  }, [mobile])

  /* ----------------------------- shortcuts ------------------------------ */

  const toggleSidebar = () => (mobile ? setNavOpen((o) => !o) : outer.current?.toggle("threads"))
  const toggleDock = () => (mobile ? setDockSheetOpen((o) => !o) : inner.current?.toggle("dock"))

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
    ...(mobile ? [] : [{ id: "split", label: right ? "Close split view" : "Split chats side by side", group: "View", shortcut: ["⌘", "\\"], icon: Columns2Icon, onSelect: toggleSplit }]),
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
        if (mobile) setDockSheetOpen(true)
        else inner.current?.expand("dock")
      }}
    />
  )

  const closeNav = () => setNavOpen(false)

  const rail = (orientation: "vertical" | "horizontal") => {
    const horizontal = orientation === "horizontal"
    // In the phone drawer, items that open something else close the drawer first.
    const then = (fn: () => void) => () => {
      if (horizontal) closeNav()
      fn()
    }
    return (
      <SidebarRail aria-label="App" orientation={orientation}>
        <SidebarRailGroup>
          <SidebarRailItem label="Home" icon={<HomeIcon />} onClick={then(() => left && show(left))} />
          <SidebarRailItem label="Inbox" icon={<InboxIcon />} />
          <SidebarRailItem label="Tasks" icon={<ClipboardListIcon />} />
          <SidebarRailItem
            label="Branches"
            icon={<GitBranchIcon />}
            onClick={then(() => {
              setDockTab("explorer")
              if (horizontal) setDockSheetOpen(true)
            })}
          />
          <SidebarRailItem label="History" shortcut="⌘K" icon={<HistoryIcon />} onClick={then(() => setPaletteOpen(true))} />
          <SidebarRailItem label="Agents" icon={<GridIcon />} onClick={then(() => setSettingsOpen(true))} />
          {!horizontal && <SidebarRailItem label="Threads" shortcut="⌘B" icon={<FolderIcon />} active={sidebarOpen} onClick={toggleSidebar} />}
        </SidebarRailGroup>
        <SidebarRailSpacer />
        <SidebarRailGroup>
          {/* The phone row has room for the connected agent only; the rest are in the threads header menu. */}
          {(horizontal ? agents.filter((a) => a.id === agentId) : agents.slice(0, 3)).map((a) => (
            <SidebarRailAvatar
              key={a.id}
              label={a.name}
              hint={a.id === agentId ? state.connection : "not connected"}
              status={a.id !== agentId ? "offline" : state.connection === "ready" ? "online" : state.connection === "connecting" ? "busy" : "error"}
              onClick={then(() => (a.builtin ? void connect(a, bridge) : setSettingsOpen(true)))}
            >
              <ProviderIcon provider={a.provider} />
            </SidebarRailAvatar>
          ))}
          <SidebarRailItem label="Command palette" shortcut="⌘K" icon={<HelpCircleIcon />} onClick={then(() => setPaletteOpen(true))} />
          <SidebarRailItem label="Settings" shortcut="⌘," icon={<SettingsIcon />} onClick={then(() => setSettingsOpen(true))} />
        </SidebarRailGroup>
      </SidebarRail>
    )
  }

  const sidebar = (
    <ThreadsSidebar
      threads={threads}
      activeId={active}
      onSelect={(id) => {
        show(id)
        closeNav()
      }}
      onNewThread={() => {
        closeNav()
        void newThread()
      }}
      agents={agents}
      agentId={agentId}
      onSelectAgent={(id) => {
        const a = agents.find((x) => x.id === id)
        if (a?.builtin) void connect(a, bridge)
        else setSettingsOpen(true)
      }}
      onOpenSettings={() => {
        closeNav()
        setSettingsOpen(true)
      }}
    />
  )

  const tabStrip = (
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
          <TabStripItem key={id} value={id} icon={<ProviderIcon provider={t?.provider} />} indicator={t?.running} className={mobile ? "w-32" : "w-36"}>
            {t?.title ?? state.sessions[id]?.title ?? "Thread"}
          </TabStripItem>
        )
      })}
    </TabStrip>
  )

  const errorBanner =
    state.connection === "error" ? (
      <div role="alert" className="flex items-center gap-2 border-b border-destructive-border bg-destructive-subtle px-4 py-2 text-ui text-destructive-text">
        <span className="min-w-0 flex-1 truncate">{state.error ?? "Disconnected"}</span>
        <Button variant="outline" size="xs" onClick={() => setSettingsOpen(true)}>
          Agent settings
        </Button>
      </div>
    ) : null

  // No thread open: start one, or pick up one of the latest; both one click away.
  const recent = threads.slice(0, 4)
  const emptyState = (
    <div className="flex h-full items-center justify-center overflow-y-auto p-6">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-ui-lg font-semibold text-balance">{state.connection === "connecting" ? "Connecting to the agent…" : "No thread open"}</h2>
          <p className="text-ui text-pretty text-muted-foreground">
            {state.connection === "ready" ? "Start a thread, or pick up where you left off." : `Threads open once ${agent.name} is connected.`}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => void newThread()} disabled={state.connection !== "ready"}>
            <EditIcon data-icon="inline-start" />
            New thread
            <Kbd className="ms-1">⌘N</Kbd>
          </Button>
          <Button variant="outline" onClick={() => setPaletteOpen(true)}>
            <SearchIcon data-icon="inline-start" />
            Search
          </Button>
        </div>
        {recent.length > 0 && (
          <div className="flex flex-col gap-1">
            <h3 className="text-ui-sm font-medium text-muted-foreground">Recent</h3>
            <ul aria-label="Recent threads" className="-mx-2 flex flex-col">
              {recent.map((t) => (
                <li key={t.sessionId}>
                  <button
                    type="button"
                    onClick={() => show(t.sessionId)}
                    className="flex h-8 w-full items-center gap-2 rounded-md px-2 text-start text-ui transition-colors duration-150 outline-none hover:bg-secondary focus-visible:ring-2 focus-visible:ring-ring active:bg-secondary"
                  >
                    <ProviderIcon provider={t.provider} />
                    <span className="min-w-0 flex-1 truncate">{t.title}</span>
                    {t.pr && <span className="shrink-0 text-ui-sm text-muted-foreground tabular-nums">#{t.pr.number}</span>}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )

  const dock = (onCollapse: () => void, compact = false) => (
    <Dock
      client={client}
      state={state}
      tab={dockTab}
      onTabChange={setDockTab}
      tabs={dockTabs}
      onTabsChange={setDockTabs}
      onCollapse={onCollapse}
      explorerPath={explorerPath}
      onExplorerPath={setExplorerPath}
      status={statusLine}
      compact={compact}
    />
  )

  return (
    <TooltipProvider>
      <h1 className="sr-only">{threadOf(active)?.title ?? "Agent workspace"}</h1>
      {mobile ? (
        /* Phone layout: header (threads, tabs, new, panel), one full-width chat. */
        <div className="flex h-dvh w-full flex-col overflow-hidden bg-shell text-foreground">
          <header className="flex h-12 shrink-0 items-center gap-1 px-1.5">
            <ToolbarButton label="Threads and navigation" shortcut="⌘B" size="icon" pressed={navOpen} onClick={() => setNavOpen(true)}>
              <SidebarIcon />
            </ToolbarButton>
            {tabStrip}
            <ToolbarButton label="New thread" shortcut="⌘N" size="icon" onClick={() => void newThread()}>
              <PlusIcon />
            </ToolbarButton>
            <ToolbarButton label="Terminal, files and browser" shortcut="⌘J" size="icon" pressed={dockSheetOpen} onClick={() => setDockSheetOpen(true)}>
              <TerminalSquareIcon />
            </ToolbarButton>
          </header>
          <main className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-t-shell border-t border-shell-border bg-background">
            {errorBanner}
            <div className="min-h-0 flex-1">{left ? pane(left, "left") : emptyState}</div>
          </main>
        </div>
      ) : (
        <div className="flex h-dvh w-full overflow-hidden bg-shell text-foreground">
          {rail("vertical")}

          <ResizablePanelGroup direction="horizontal" autoSaveId="agent-workspace-shell" handleRef={outer} className="min-w-0 flex-1">
            <ResizablePanel id="threads" defaultSize="248px" minSize="220px" maxSize="420px" collapsible onCollapsedChange={(c) => setSidebarOpen(!c)}>
              <div className="flex h-full flex-col">
                {/* eslint-disable-next-line shadcn/no-arbitrary-values -- 3px inset gap + 0.5px panel border, so this row centres with the chat toolbar */}
                <div className="mt-[3.5px] flex h-10 shrink-0 items-center gap-1 px-2">
                  <ToolbarButton label="Hide sidebar" shortcut="⌘B" onClick={toggleSidebar}>
                    <SidebarIcon />
                  </ToolbarButton>
                  <ToolbarButton label="Back" onClick={() => go(-1)}>
                    <ArrowLeftIcon className="rtl:-scale-x-100" />
                  </ToolbarButton>
                  <ToolbarButton label="Forward" onClick={() => go(1)}>
                    <ArrowRightIcon className="rtl:-scale-x-100" />
                  </ToolbarButton>
                </div>
                <div className="min-h-0 flex-1">{sidebar}</div>
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
                        {tabStrip}
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
                        {errorBanner}
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
                          emptyState
                        )}
                      </div>
                    </div>
                  </ResizablePanel>
                  <ResizableHandle />
                  <ResizablePanel id="dock" defaultSize={44} minSize="300px" collapsible onCollapsedChange={(c) => setDockOpen(!c)}>
                    {dock(() => inner.current?.collapse("dock"))}
                  </ResizablePanel>
                </ResizablePanelGroup>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      )}

      {mobile && (
        <>
          <Drawer side="left" open={navOpen} onOpenChange={setNavOpen}>
            <DrawerContent showClose={false} className="p-0">
              <DrawerTitle className="sr-only">Threads</DrawerTitle>
              <div className="min-h-0 flex-1 pt-2">{sidebar}</div>
              <div className="shrink-0 border-t border-border">{rail("horizontal")}</div>
            </DrawerContent>
          </Drawer>
          <BottomSheet open={dockSheetOpen} onOpenChange={setDockSheetOpen} snapPoints={[0.6, 0.92]}>
            <BottomSheetContent className="max-w-none">
              <BottomSheetTitle className="sr-only">Terminal, files and browser</BottomSheetTitle>
              <div className="min-h-0 flex-1">{dock(() => setDockSheetOpen(false), true)}</div>
            </BottomSheetContent>
          </BottomSheet>
        </>
      )}

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
