"use client"

import * as React from "react"

import {
  CheckIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  EditIcon,
  SearchIcon,
  SettingsIcon,
  SortIcon,
} from "@/components/icons"
import { Button } from "@/registry/base-nova/ui/button"
import { Input } from "@/registry/base-nova/ui/input"
import { Menu, MenuContent, MenuItem, MenuLabel, MenuSeparator, MenuTrigger } from "@/registry/base-nova/ui/menu"
import { ThreadList, ThreadListGroup, ThreadListItem, type PullRequestStatus } from "@/registry/base-nova/ui/thread-list-item"
import { Tooltip, TooltipContent, TooltipKbd, TooltipTrigger } from "@/registry/base-nova/ui/tooltip"

import type { AgentConfig } from "./agents"
import { ProviderIcon } from "./provider-icon"

export type ThreadSummary = {
  sessionId: string
  title: string
  provider?: string
  repo?: string
  pr?: { number: number; status: PullRequestStatus }
  branch?: string
  group: string
  running?: boolean
  unread?: boolean
}

type Filter = "all" | "running" | "pr"
const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All activity" },
  { id: "running", label: "Running" },
  { id: "pr", label: "With pull request" },
]
const GROUP_ORDER = ["Recent", "Today", "Yesterday", "Earlier"]

export function ThreadsSidebar({
  threads,
  activeId,
  onSelect,
  onNewThread,
  agents,
  agentId,
  onSelectAgent,
  onOpenSettings,
}: {
  threads: ThreadSummary[]
  activeId: string | null
  onSelect: (sessionId: string) => void
  onNewThread: () => void
  agents: AgentConfig[]
  agentId: string
  onSelectAgent: (id: string) => void
  onOpenSettings: () => void
}) {
  const [query, setQuery] = React.useState("")
  const [searching, setSearching] = React.useState(false)
  const [filter, setFilter] = React.useState<Filter>("all")
  const [newestFirst, setNewestFirst] = React.useState(true)
  const searchRef = React.useRef<HTMLInputElement>(null)
  const agent = agents.find((a) => a.id === agentId)

  const visible = threads.filter((t) => {
    if (filter === "running" && !t.running) return false
    if (filter === "pr" && !t.pr) return false
    if (!query) return true
    const q = query.toLowerCase()
    return [t.title, t.repo, t.branch, t.pr ? `#${t.pr.number}` : ""].some((s) => s?.toLowerCase().includes(q))
  })
  const groups = GROUP_ORDER.map((g) => ({ g, items: visible.filter((t) => t.group === g) }))
    .concat([{ g: "Other", items: visible.filter((t) => !GROUP_ORDER.includes(t.group)) }])
    .filter((x) => x.items.length)
  if (!newestFirst) groups.reverse()

  return (
    <div className="flex h-full min-w-0 flex-col">
      <div className="flex h-10 shrink-0 items-center gap-1 pr-2 pl-2">
        <Menu>
          <MenuTrigger
            render={
              <Button variant="ghost" size="sm" className="min-w-0" aria-label={`Workspace Synara, agent ${agent?.name ?? "none"}`} />
            }
          >
            <span className="truncate text-ui-lg font-semibold">Synara</span>
            <ChevronDownIcon data-icon="inline-end" className="size-3 opacity-64" />
          </MenuTrigger>
          <MenuContent className="w-60">
            <MenuLabel>Agent</MenuLabel>
            {agents.map((a) => (
              <MenuItem key={a.id} onClick={() => onSelectAgent(a.id)}>
                <ProviderIcon provider={a.provider} />
                <span className="min-w-0 flex-1 truncate">{a.name}</span>
                {a.id === agentId && <CheckIcon className="!text-foreground" />}
              </MenuItem>
            ))}
            <MenuSeparator />
            <MenuItem onClick={onOpenSettings}>
              <SettingsIcon />
              Manage agents…
            </MenuItem>
          </MenuContent>
        </Menu>
        <div className="flex-1" />
        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label="Search threads"
                aria-pressed={searching}
                className="text-muted-foreground"
                onClick={() => {
                  setSearching((s) => !s)
                  setQuery("")
                  requestAnimationFrame(() => searchRef.current?.focus())
                }}
              >
                <SearchIcon />
              </Button>
            }
          />
          <TooltipContent side="bottom">Search threads</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger
            render={
              <Button variant="secondary" size="icon-sm" aria-label="New thread" onClick={onNewThread}>
                <EditIcon />
              </Button>
            }
          />
          <TooltipContent side="bottom">
            New thread <TooltipKbd>⌘N</TooltipKbd>
          </TooltipContent>
        </Tooltip>
      </div>

      <div className="flex shrink-0 flex-col gap-0.5 px-2">
        {searching && (
          <div className="relative mb-1">
            <Input
              ref={searchRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  setSearching(false)
                  setQuery("")
                }
              }}
              placeholder="Search threads"
              aria-label="Search threads"
              className="h-7"
            />
          </div>
        )}
        <Button variant="ghost" className="w-full justify-start" onClick={onNewThread}>
          <EditIcon data-icon="inline-start" className="text-muted-foreground" />
          <span className="font-normal">New thread</span>
        </Button>
        <div className="flex items-center justify-between">
          <Menu>
            <MenuTrigger render={<Button variant="ghost" size="sm" className="text-muted-foreground" />}>
              <span className="font-normal">{FILTERS.find((f) => f.id === filter)?.label}</span>
              <ChevronRightIcon data-icon="inline-end" className="size-3" />
            </MenuTrigger>
            <MenuContent className="w-48">
              {FILTERS.map((f) => (
                <MenuItem key={f.id} onClick={() => setFilter(f.id)}>
                  <span className="flex-1">{f.label}</span>
                  {f.id === filter && <CheckIcon className="!text-foreground" />}
                </MenuItem>
              ))}
            </MenuContent>
          </Menu>
          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon-xs"
                  aria-label={newestFirst ? "Show oldest first" : "Show newest first"}
                  className="text-muted-foreground"
                  onClick={() => setNewestFirst((v) => !v)}
                >
                  <SortIcon />
                </Button>
              }
            />
            <TooltipContent side="bottom">{newestFirst ? "Newest first" : "Oldest first"}</TooltipContent>
          </Tooltip>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-2 pt-1 pb-3 scrollbar-thin">
        {groups.length === 0 ? (
          <p className="px-2 py-6 text-center text-ui text-pretty text-muted-foreground">No threads match.</p>
        ) : (
          <ThreadList>
            {groups.map(({ g, items }) => (
              <ThreadListGroup key={g} label={g}>
                {items.map((t) => (
                  <ThreadListItem
                    key={t.sessionId}
                    title={t.title}
                    icon={<ProviderIcon provider={t.provider} />}
                    repo={t.repo}
                    pr={t.pr}
                    branch={t.branch}
                    running={t.running}
                    unread={t.unread}
                    active={t.sessionId === activeId}
                    onClick={() => onSelect(t.sessionId)}
                  />
                ))}
              </ThreadListGroup>
            ))}
          </ThreadList>
        )}
      </div>
    </div>
  )
}
