"use client"

import * as React from "react"

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  Columns2Icon,
  ExternalLinkIcon,
  FolderIcon,
  GlobeIcon,
  PanelRightIcon,
  PlusIcon,
  RefreshIcon,
  Rows2Icon,
  TerminalSquareIcon,
  TrashIcon,
} from "@/components/icons"
import { AgentCodeBlock } from "@/registry/base-nova/ui/agent-code-block"
import { Button } from "@/registry/base-nova/ui/button"
import { FileTree, type FileTreeNode } from "@/registry/base-nova/ui/file-tree"
import { Input } from "@/registry/base-nova/ui/input"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/registry/base-nova/ui/resizable"
import { TabStrip, TabStripItem } from "@/registry/base-nova/ui/tab-strip"
import { Terminal, TerminalInput, TerminalOutput, TerminalStatusLine } from "@/registry/base-nova/ui/terminal-view"
import { Tooltip, TooltipContent, TooltipKbd, TooltipTrigger } from "@/registry/base-nova/ui/tooltip"

import type { AcpClient, ClientState } from "../acp/client"

export type DockTab = "terminal" | "explorer" | "browser"

const TAB_META: Record<DockTab, { label: string; icon: React.ReactNode }> = {
  terminal: { label: "Terminal", icon: <TerminalSquareIcon /> },
  explorer: { label: "Explorer", icon: <FolderIcon /> },
  browser: { label: "Browser", icon: <GlobeIcon /> },
}

function IconAction({ label, shortcut, onClick, children, pressed }: { label: string; shortcut?: string; onClick?: () => void; children: React.ReactNode; pressed?: boolean }) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button variant="ghost" size="icon-sm" aria-label={label} aria-pressed={pressed} onClick={onClick} className="text-muted-foreground">
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

/* -------------------------------- terminal -------------------------------- */

function TerminalPane({ client, state, id, status }: { client: AcpClient; state: ClientState; id: string; status?: string }) {
  const t = state.terminals[id]
  const running = t !== undefined && t.exitStatus === undefined && !id.startsWith("user-")
  return (
    <Terminal className="h-full">
      <TerminalOutput text={t?.output ?? ""} />
      {id.startsWith("user-") ? (
        <TerminalInput
          onSubmit={(cmd) => {
            if (cmd.trim() === "clear") client.setTerminal(id, "", t?.title)
            else if (cmd.trim()) void client.runShell(cmd, id).catch(() => undefined)
          }}
        />
      ) : (
        <div className="border-t border-border px-3 py-1.5 text-ui-xs text-muted-foreground">
          {running ? "Running…" : `Exited with code ${t?.exitStatus?.exitCode ?? 0}`}
        </div>
      )}
      {status && <TerminalStatusLine text={status} />}
    </Terminal>
  )
}

function TerminalDock({ client, state, status }: { client: AcpClient; state: ClientState; status?: string }) {
  const [userTerms, setUserTerms] = React.useState(["user-1"])
  const [active, setActive] = React.useState("user-1")
  const [split, setSplit] = React.useState<"none" | "horizontal" | "vertical">("none")
  const agentTerms = Object.values(state.terminals).filter((t) => !t.id.startsWith("user-"))
  const all = [...userTerms, ...agentTerms.map((t) => t.id)]
  const current = all.includes(active) ? active : userTerms[0]
  const other = all.find((x) => x !== current)

  const add = () => {
    const id = `user-${Date.now().toString(36)}`
    setUserTerms((u) => [...u, id])
    setActive(id)
  }
  const close = (id: string) => {
    if (id.startsWith("user-")) setUserTerms((u) => (u.length > 1 ? u.filter((x) => x !== id) : u))
  }

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex h-9 shrink-0 items-center gap-1 px-2">
        <TabStrip
          variant="pill"
          value={current}
          onValueChange={setActive}
          onClose={close}
          order={userTerms}
          onReorder={setUserTerms}
          aria-label="Terminals"
          className="min-w-0 flex-1"
          actions={<IconAction label="New terminal" onClick={add}><PlusIcon /></IconAction>}
        >
          {userTerms.map((id, i) => (
            <TabStripItem key={id} value={id} icon={<TerminalSquareIcon />} closable={userTerms.length > 1}>
              {state.terminals[id]?.title && state.terminals[id].title !== "Terminal" ? state.terminals[id].title : `Terminal ${i + 1}`}
            </TabStripItem>
          ))}
        </TabStrip>
        {agentTerms.length > 0 && (
          <TabStrip variant="pill" value={current} onValueChange={setActive} aria-label="Agent terminals" className="max-w-48 shrink">
            {agentTerms.map((t) => (
              <TabStripItem key={t.id} value={t.id} icon={<TerminalSquareIcon />} indicator={t.exitStatus === undefined}>
                {t.title}
              </TabStripItem>
            ))}
          </TabStrip>
        )}
        <IconAction label="Split right" pressed={split === "horizontal"} onClick={() => setSplit((s) => (s === "horizontal" ? "none" : "horizontal"))}>
          <Columns2Icon />
        </IconAction>
        <IconAction label="Split down" pressed={split === "vertical"} onClick={() => setSplit((s) => (s === "vertical" ? "none" : "vertical"))}>
          <Rows2Icon />
        </IconAction>
        <IconAction label="Clear terminal" onClick={() => client.setTerminal(current, "", state.terminals[current]?.title)}>
          <TrashIcon />
        </IconAction>
      </div>
      <div className="min-h-0 flex-1">
        {split !== "none" && other ? (
          <ResizablePanelGroup direction={split} autoSaveId={`agent-workspace-terminal-${split}`}>
            <ResizablePanel id="a" minSize={20}>
              <TerminalPane client={client} state={state} id={current} status={status} />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel id="b" minSize={20}>
              <TerminalPane client={client} state={state} id={other} />
            </ResizablePanel>
          </ResizablePanelGroup>
        ) : (
          <TerminalPane client={client} state={state} id={current} status={status} />
        )}
      </div>
    </div>
  )
}

/* -------------------------------- explorer -------------------------------- */

function buildTree(paths: string[]): FileTreeNode[] {
  const root: FileTreeNode[] = []
  for (const p of [...paths].sort()) {
    const parts = p.split("/")
    let level = root
    parts.forEach((name, i) => {
      const value = parts.slice(0, i + 1).join("/")
      const isFile = i === parts.length - 1
      let node = level.find((n) => n.value === value)
      if (!node) {
        node = { value, name, type: isFile ? "file" : "folder", children: isFile ? undefined : [] }
        level.push(node)
      }
      level = node.children ?? []
    })
  }
  const sort = (nodes: FileTreeNode[]): FileTreeNode[] =>
    nodes
      .sort((a, b) => (a.type === b.type ? a.name.localeCompare(b.name) : a.type === "folder" ? -1 : 1))
      .map((n) => (n.children ? { ...n, children: sort(n.children) } : n))
  return sort(root)
}

function ExplorerDock({ client, state, selected, onSelect }: { client: AcpClient; state: ClientState; selected: string | null; onSelect: (path: string | null) => void }) {
  const tree = React.useMemo(() => buildTree(state.files), [state.files])
  const [content, setContent] = React.useState<string | null>(null)
  const expanded = React.useMemo(() => {
    if (!selected) return ["apps", "apps/web", "apps/web/src", "apps/web/src/components"]
    const parts = selected.split("/")
    return parts.slice(0, -1).map((_, i) => parts.slice(0, i + 1).join("/"))
  }, [selected])
  const [open, setOpen] = React.useState<string[]>(expanded)
  React.useEffect(() => setOpen((o) => [...new Set([...o, ...expanded])]), [expanded])

  React.useEffect(() => {
    if (!selected) return
    let live = true
    setContent(null)
    client
      .readFile(selected)
      .then((r) => live && setContent(r.content))
      .catch((e: unknown) => live && setContent(`// ${e instanceof Error ? e.message : String(e)}`))
    return () => {
      live = false
    }
  }, [client, selected])

  return (
    <ResizablePanelGroup direction="vertical" autoSaveId="agent-workspace-explorer">
      <ResizablePanel id="tree" defaultSize={selected ? 45 : 100} minSize={15}>
        <div className="flex h-full flex-col">
          <div className="flex h-8 shrink-0 items-center justify-between px-3 text-ui-sm text-muted-foreground">
            <span className="truncate">{state.workspaceRoot ?? "Workspace"}</span>
            <Button variant="ghost" size="icon-xs" aria-label="Refresh files" onClick={() => void client.refreshFiles().catch(() => undefined)}>
              <RefreshIcon />
            </Button>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto px-2 pb-2 scrollbar-thin">
            {tree.length ? (
              <FileTree items={tree} value={selected} onValueChange={(v, n) => n.type === "file" && onSelect(v)} expanded={open} onExpandedChange={setOpen} label="Workspace files" />
            ) : (
              <p className="px-2 py-6 text-center text-ui text-muted-foreground">No files yet.</p>
            )}
          </div>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel id="preview" minSize={15} collapsible>
        {selected ? (
          <div className="h-full overflow-auto p-2">
            <AgentCodeBlock code={content ?? ""} filename={selected} maxHeight={2000} streaming={content === null} />
          </div>
        ) : (
          <p className="p-6 text-center text-ui text-muted-foreground">Select a file to preview it.</p>
        )}
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

/* -------------------------------- browser --------------------------------- */

function BrowserDock() {
  const [url, setUrl] = React.useState("")
  const [draft, setDraft] = React.useState("http://localhost:3000")
  const frameRef = React.useRef<HTMLIFrameElement>(null)
  return (
    <div className="flex h-full flex-col">
      <form
        className="flex h-10 shrink-0 items-center gap-1 px-2"
        onSubmit={(e) => {
          e.preventDefault()
          setUrl(/^https?:\/\//.test(draft) ? draft : `http://${draft}`)
        }}
      >
        <Button type="button" variant="ghost" size="icon-sm" aria-label="Back" onClick={() => frameRef.current?.contentWindow?.history.back()} className="text-muted-foreground">
          <ArrowLeftIcon />
        </Button>
        <Button type="button" variant="ghost" size="icon-sm" aria-label="Forward" onClick={() => frameRef.current?.contentWindow?.history.forward()} className="text-muted-foreground">
          <ArrowRightIcon />
        </Button>
        <Button type="button" variant="ghost" size="icon-sm" aria-label="Reload" onClick={() => setUrl((u) => (u ? `${u.split("#")[0]}#${Date.now()}` : u))} className="text-muted-foreground">
          <RefreshIcon />
        </Button>
        <Input value={draft} onChange={(e) => setDraft(e.target.value)} aria-label="Address" className="h-7 flex-1" />
        {url && (
          <Button type="button" variant="ghost" size="icon-sm" aria-label="Open in a new window" onClick={() => window.open(url, "_blank", "noopener")} className="text-muted-foreground">
            <ExternalLinkIcon />
          </Button>
        )}
      </form>
      <div className="min-h-0 flex-1 border-t border-border">
        {url ? (
          <iframe ref={frameRef} title="Preview" src={url} sandbox="allow-scripts allow-same-origin allow-forms allow-popups" className="size-full bg-background" />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 p-6 text-center">
            <GlobeIcon className="size-6 text-muted-foreground" />
            <p className="text-ui text-pretty text-muted-foreground">Preview your dev server. Enter its address and press Enter.</p>
          </div>
        )}
      </div>
    </div>
  )
}

/* ---------------------------------- dock ---------------------------------- */

export function Dock({
  client,
  state,
  tab,
  onTabChange,
  tabs,
  onTabsChange,
  onCollapse,
  explorerPath,
  onExplorerPath,
  status,
}: {
  client: AcpClient
  state: ClientState
  tab: DockTab
  onTabChange: (tab: DockTab) => void
  tabs: DockTab[]
  onTabsChange: (tabs: DockTab[]) => void
  onCollapse: () => void
  explorerPath: string | null
  onExplorerPath: (path: string | null) => void
  status?: string
}) {
  const missing = (Object.keys(TAB_META) as DockTab[]).filter((t) => !tabs.includes(t))
  return (
    <div className="flex h-full min-w-0 flex-col">
      <div className="flex h-10 shrink-0 items-center gap-1 border-b border-border px-2">
        <TabStrip
          variant="pill"
          value={tab}
          onValueChange={(v) => onTabChange(v as DockTab)}
          order={tabs}
          onReorder={(o) => onTabsChange(o as DockTab[])}
          onClose={(v) => {
            const next = tabs.filter((t) => t !== v)
            onTabsChange(next)
            if (!next.length) onCollapse()
            else if (v === tab) onTabChange(next[0])
          }}
          aria-label="Panels"
          className="min-w-0 flex-1"
        >
          {tabs.map((t) => (
            <TabStripItem key={t} value={t} icon={TAB_META[t].icon}>
              {TAB_META[t].label}
            </TabStripItem>
          ))}
        </TabStrip>
        <IconAction
          label={missing.length ? `Open ${TAB_META[missing[0]].label}` : "New terminal"}
          onClick={() => {
            if (missing.length) {
              onTabsChange([...tabs, missing[0]])
              onTabChange(missing[0])
            } else onTabChange("terminal")
          }}
        >
          <PlusIcon />
        </IconAction>
        <IconAction label="Hide panel" shortcut="⌘J" onClick={onCollapse}>
          <PanelRightIcon />
        </IconAction>
      </div>
      <div className="min-h-0 flex-1">
        {tab === "terminal" && <TerminalDock client={client} state={state} status={status} />}
        {tab === "explorer" && <ExplorerDock client={client} state={state} selected={explorerPath} onSelect={onExplorerPath} />}
        {tab === "browser" && <BrowserDock />}
      </div>
    </div>
  )
}
