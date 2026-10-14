"use client"

import * as React from "react"

import { BotIcon, ChevronsUpDownIcon, FolderIcon, MenuIcon } from "@/components/icons"
import { PromptBar } from "@/registry/base-nova/blocks/prompt-bar/prompt-bar"
import { Sidebar, SidebarProvider, SidebarTrigger } from "@/registry/base-nova/ui/animated-sidebar"
import { Badge } from "@/registry/base-nova/ui/badge"
import { Button } from "@/registry/base-nova/ui/button"
import { Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerTitle } from "@/registry/base-nova/ui/drawer"
import { IconChip } from "@/registry/base-nova/ui/icon-chip"
import { ThemeToggle } from "@/registry/base-nova/ui/theme-toggle"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/base-nova/ui/tooltip"

import { Conversation, type Turn } from "./parts/conversation"
import { FilesPanel } from "./parts/files-panel"
import { SessionNav } from "./parts/session-nav"

const REPLY =
  "Sure. I'll keep the change scoped to `packages/billing` and note the rounding rule in the PR description so finance can sign off on it."

/**
 * Coding-agent workspace: sessions sidebar, a conversation of agent blocks
 * (plan, tool output, diffs, code, approval, streamed summary), a prompt bar
 * and a files panel with a diff preview.
 */
export function AgentWorkspace() {
  const [session, setSession] = React.useState("s1")
  const [turns, setTurns] = React.useState<Turn[]>([])
  const [working, setWorking] = React.useState(false)
  const [navOpen, setNavOpen] = React.useState(false)
  const [filesOpen, setFilesOpen] = React.useState(false)
  const timer = React.useRef<number | undefined>(undefined)
  const end = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => () => window.clearTimeout(timer.current), [])

  const send = (text: string) => {
    const id = `t${Date.now()}`
    setTurns((t) => [...t, { id, text }])
    setWorking(true)
    requestAnimationFrame(() => end.current?.scrollIntoView({ block: "end", behavior: "smooth" }))
    timer.current = window.setTimeout(() => {
      setWorking(false)
      setTurns((t) => t.map((x) => (x.id === id ? { ...x, reply: REPLY } : x)))
    }, 2200)
  }

  const pick = (id: string) => {
    setSession(id)
    setNavOpen(false)
  }

  return (
    <SidebarProvider className="h-dvh flex-col overflow-hidden bg-background">
      <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border bg-background/80 px-3 backdrop-blur sm:px-4">
        <Tooltip>
          <TooltipTrigger render={<SidebarTrigger className="max-lg:hidden" />} />
          <TooltipContent side="bottom">Toggle sessions · ⌘B</TooltipContent>
        </Tooltip>
        <Button variant="ghost" size="icon-sm" className="lg:hidden" aria-label="Open sessions" onClick={() => setNavOpen(true)}>
          <MenuIcon />
        </Button>
        <div className="flex min-w-0 items-center gap-2.5">
          <IconChip size="sm" tone="solid">
            <BotIcon />
          </IconChip>
          <span className="text-sm font-semibold max-sm:hidden">Tessel</span>
        </div>
        <Button variant="ghost" size="sm" className="min-w-0 text-muted-foreground">
          <span className="truncate">
            <span className="text-foreground">acme/billing</span>
            <span className="max-sm:hidden"> · fix/invoice-rounding</span>
          </span>
          <ChevronsUpDownIcon data-icon="inline-end" />
        </Button>
        <div className="ml-auto flex items-center gap-1.5">
          <Badge size="sm" variant="outline" className="max-md:hidden">
            tessel-coder · high
          </Badge>
          <Badge size="sm" variant="success" className="max-md:hidden">
            69/69 tests
          </Badge>
          <Button variant="ghost" size="icon-sm" className="xl:hidden" aria-label="Open files" onClick={() => setFilesOpen(true)}>
            <FolderIcon />
          </Button>
          <ThemeToggle className="size-8" />
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        <Sidebar variant="sidebar" aria-label="Sessions" className="max-lg:hidden">
          <SessionNav active={session} onSelect={pick} />
        </Sidebar>

        <main className="flex min-w-0 flex-1 flex-col">
          <div className="relative min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pt-8 pb-6 sm:px-6">
            <Conversation turns={turns} working={working} />
            <div ref={end} />
          </div>
          <div className="shrink-0 px-4 pb-4 sm:px-6">
            <div className="mx-auto flex max-w-3xl flex-col gap-2">
              <PromptBar placeholder="Reply to Tessel, or describe the next change…" busy={working} onSubmit={send} onStop={() => setWorking(false)} />
              <p className="text-center text-xs text-pretty text-muted-foreground">
                Tessel asks before pushing, deleting or running anything outside the sandbox.
              </p>
            </div>
          </div>
        </main>

        <aside aria-label="Files" className="relative flex w-96 shrink-0 flex-col overflow-y-auto border-l border-border p-4 max-xl:hidden">
          <FilesPanel />
        </aside>
      </div>

      <Drawer side="left" open={navOpen} onOpenChange={setNavOpen}>
        <DrawerContent className="w-72">
          <DrawerTitle className="sr-only">Sessions</DrawerTitle>
          <SidebarProvider shortcut={null} className="min-h-0 flex-1 pt-12 [--sidebar-width:100%]">
            {/* eslint-disable-next-line shadcn/no-restyle -- sidebar embedded in the mobile drawer: the drawer is the surface */}
            <Sidebar variant="sidebar" collapsible="none" aria-label="Sessions" panelClassName="border-r-0 bg-transparent">
              <SessionNav active={session} onSelect={pick} />
            </Sidebar>
          </SidebarProvider>
        </DrawerContent>
      </Drawer>

      <Drawer side="right" open={filesOpen} onOpenChange={setFilesOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Changed files</DrawerTitle>
          </DrawerHeader>
          <DrawerBody className="flex flex-col">
            <FilesPanel />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </SidebarProvider>
  )
}
