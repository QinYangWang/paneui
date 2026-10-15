"use client"

import * as React from "react"

import { BracesIcon, CodeIcon, GitBranchIcon, PaletteIcon, TerminalSquareIcon, TypeIcon } from "@/components/icons"
import { Input } from "@/registry/base-nova/ui/input"
import { ScrollArea } from "@/registry/base-nova/ui/scroll-area"
import { Switch } from "@/registry/base-nova/ui/switch"

import { SidebarHeader } from "./sidebar-header"

type Extension = { id: string; name: string; summary: string; icon: React.ReactNode }

const BUILT_IN: Extension[] = [
  { id: "ts", name: "TypeScript and JavaScript", summary: "Types, completions and errors as you type", icon: <CodeIcon /> },
  { id: "json", name: "JSON", summary: "Validation and formatting for config files", icon: <BracesIcon /> },
  { id: "css", name: "CSS", summary: "Completions and color previews", icon: <PaletteIcon /> },
  { id: "md", name: "Markdown", summary: "Headings, lists and code fences", icon: <TypeIcon /> },
  { id: "git", name: "Source control", summary: "Changes, discard and commit", icon: <GitBranchIcon /> },
  { id: "shell", name: "Terminal", summary: "A shell on the workspace files", icon: <TerminalSquareIcon /> },
]

/** Extensions view: the built-in language features, searchable, each with an on/off switch. */
export function ExtensionsView() {
  const [query, setQuery] = React.useState("")
  const [disabled, setDisabled] = React.useState<Set<string>>(new Set())
  const q = query.trim().toLowerCase()
  const list = BUILT_IN.filter((e) => !q || e.name.toLowerCase().includes(q) || e.summary.toLowerCase().includes(q))

  return (
    <div className="flex h-full min-w-0 flex-col">
      <SidebarHeader title="Extensions" />
      <div className="shrink-0 px-3 pb-2">
        <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search extensions" aria-label="Search extensions" className="h-7" />
      </div>
      <div className="flex h-6 shrink-0 items-center gap-1.5 px-3 text-ui-xs font-semibold tracking-wide text-muted-foreground uppercase">
        <span className="flex-1">Built-in</span>
        <span className="rounded-full bg-secondary px-1.5 font-normal tabular-nums">{list.length}</span>
      </div>
      <ScrollArea className="min-h-0 flex-1" viewportClassName="px-2 pb-3">
        <ul aria-label="Built-in extensions" className="flex flex-col gap-0.5">
          {list.map((e) => {
            const on = !disabled.has(e.id)
            return (
              <li key={e.id} className="flex items-center gap-2 rounded-lg px-1.5 py-1.5 hover:bg-secondary">
                <span aria-hidden className="flex size-6 shrink-0 items-center justify-center text-muted-foreground [&_svg]:size-4">
                  {e.icon}
                </span>
                <div className="flex min-w-0 flex-1 flex-col">
                  <span className="truncate text-ui font-medium">{e.name}</span>
                  <span className="truncate text-ui-xs text-muted-foreground">{e.summary}</span>
                </div>
                <Switch
                  aria-label={`${on ? "Disable" : "Enable"} ${e.name}`}
                  checked={on}
                  onCheckedChange={(v) =>
                    setDisabled((d) => {
                      const next = new Set(d)
                      if (v) next.delete(e.id)
                      else next.add(e.id)
                      return next
                    })
                  }
                />
              </li>
            )
          })}
        </ul>
        {list.length === 0 && <p className="px-2 py-6 text-center text-ui text-muted-foreground">No extensions match.</p>}
      </ScrollArea>
    </div>
  )
}
