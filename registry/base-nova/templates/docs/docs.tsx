"use client"

import * as React from "react"

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  BoltIcon,
  BotIcon,
  EditIcon,
  GithubIcon,
  HomeIcon,
  KeyIcon,
  MenuIcon,
  SearchIcon,
  ServerIcon,
  ShieldIcon,
  TerminalSquareIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
} from "@/components/icons"
import { CommandPalette, type CommandPaletteItem } from "@/registry/base-nova/blocks/command-palette/command-palette"
import { Sidebar, SidebarProvider } from "@/registry/base-nova/ui/animated-sidebar"
import { Badge } from "@/registry/base-nova/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/registry/base-nova/ui/breadcrumb"
import { Button } from "@/registry/base-nova/ui/button"
import { Drawer, DrawerContent, DrawerTitle } from "@/registry/base-nova/ui/drawer"
import { IconChip } from "@/registry/base-nova/ui/icon-chip"
import { ThemeToggle } from "@/registry/base-nova/ui/theme-toggle"

import { Article, toc } from "./parts/article"
import { DocsNav } from "./parts/docs-nav"
import { TableOfContents } from "./parts/toc"

const searchItems: CommandPaletteItem[] = [
  { id: "quickstart", label: "Quickstart", group: "Getting started", icon: HomeIcon },
  { id: "github", label: "Install the GitHub app", group: "Getting started", icon: HomeIcon },
  { id: "approvals", label: "Approval policies", group: "Guides", icon: ShieldIcon, keywords: ["allow", "deny", "risk"] },
  { id: "sandboxes", label: "Sandbox images", group: "Guides", icon: ServerIcon },
  { id: "ci", label: "Auto-fix GitHub Actions", group: "Guides", icon: BoltIcon },
  { id: "run", label: "tessel run", group: "Reference", icon: TerminalSquareIcon, keywords: ["cli"] },
  { id: "auth", label: "API authentication", group: "Reference", icon: KeyIcon, keywords: ["token"] },
]

/** Documentation page: header with search, section nav, prose article with components, scroll-spy TOC and pagination. */
export function DocsTemplate() {
  const [navOpen, setNavOpen] = React.useState(false)
  const [searchOpen, setSearchOpen] = React.useState(false)
  const [helpful, setHelpful] = React.useState<boolean | null>(null)

  return (
    <SidebarProvider shortcut={null} className="min-h-svh flex-col bg-background">
      <header className="sticky top-0 z-40 h-14 shrink-0 border-b border-border bg-background/80 backdrop-blur">
        <div className="flex h-full items-center gap-3 px-3 sm:px-4">
          <Button variant="ghost" size="icon-sm" className="lg:hidden" aria-label="Open navigation" onClick={() => setNavOpen(true)}>
            <MenuIcon />
          </Button>
          <a href="#" className="flex items-center gap-2.5 rounded-full font-semibold outline-none focus-visible:ring-3 focus-visible:ring-ring">
            <IconChip size="sm" tone="solid">
              <BotIcon />
            </IconChip>
            <span>
              Tessel <span className="font-normal text-muted-foreground">Docs</span>
            </span>
          </a>
          <Badge size="sm" variant="outline" className="max-sm:hidden">
            v2.4
          </Badge>
          <div className="ml-auto flex items-center gap-1.5">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setSearchOpen(true)}
              aria-label="Search docs"
              aria-keyshortcuts="Meta+K"
              // eslint-disable-next-line shadcn/no-restyle -- header search morphs from an icon button (mobile) to a 256px field (sm+)
              className="w-8 px-0 text-muted-foreground sm:w-64 sm:justify-start sm:px-3"
            >
              <SearchIcon />
              <span className="hidden sm:inline">Search docs…</span>
              <kbd className="ml-auto hidden rounded-md bg-muted px-1.5 py-0.5 font-mono text-xs text-muted-foreground shadow-chip sm:inline">⌘K</kbd>
            </Button>
            <Button variant="ghost" size="icon-sm" nativeButton={false} render={<a href="#" />} aria-label="GitHub">
              <GithubIcon />
            </Button>
            <ThemeToggle className="size-8" />
          </div>
        </div>
      </header>

      <div className="flex min-w-0 flex-1">
        {/* eslint-disable-next-line shadcn/no-arbitrary-values -- viewport height minus the h-14 sticky header */}
        <Sidebar variant="sidebar" collapsible="none" aria-label="Docs" className="sticky top-14 h-[calc(100svh-3.5rem)] self-start max-lg:hidden">
          <DocsNav />
        </Sidebar>

        <div className="flex min-w-0 flex-1 justify-center gap-12 px-5 py-10 sm:px-8 lg:px-12">
          <article className="flex w-full max-w-reading min-w-0 flex-col gap-10">
            <header className="flex flex-col gap-4">
              <Breadcrumb className="-ms-2">
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#">Guides</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#">Safety</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Approval policies</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
              <h1 className="text-4xl leading-tight font-semibold tracking-tight text-balance">Approval policies</h1>
              <p className="text-lg leading-relaxed text-pretty text-muted-foreground">
                Decide which actions Tessel takes on its own, which wait for a person, and which it never takes.
              </p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                <span>Updated Oct 9, 2026</span>
                <span>6 min read</span>
                <a href="#" className="inline-flex items-center gap-1.5 hover:text-foreground">
                  <EditIcon size={14} />
                  Edit on GitHub
                </a>
              </div>
            </header>

            <Article />

            <footer className="flex flex-col gap-8 border-t border-border pt-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm text-muted-foreground" aria-live="polite">
                  {helpful === null ? "Was this page helpful?" : "Thanks for the feedback."}
                </p>
                <div className="flex gap-2">
                  <Button variant="secondary" size="sm" aria-pressed={helpful === true} onClick={() => setHelpful(true)}>
                    <ThumbsUpIcon data-icon="inline-start" />
                    Yes
                  </Button>
                  <Button variant="secondary" size="sm" aria-pressed={helpful === false} onClick={() => setHelpful(false)}>
                    <ThumbsDownIcon data-icon="inline-start" />
                    No
                  </Button>
                </div>
              </div>
              <nav aria-label="Pagination" className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <PagerLink dir="prev" label="Install the GitHub app" section="Getting started" />
                <PagerLink dir="next" label="Secrets" section="Safety" />
              </nav>
            </footer>
          </article>

          <aside className="sticky top-24 w-56 shrink-0 self-start max-xl:hidden">
            <TableOfContents items={toc} />
          </aside>
        </div>
      </div>

      <Drawer side="left" open={navOpen} onOpenChange={setNavOpen}>
        <DrawerContent className="w-72">
          <DrawerTitle className="sr-only">Docs navigation</DrawerTitle>
          <SidebarProvider shortcut={null} className="min-h-0 flex-1 pt-10 [--sidebar-width:100%]">
            {/* eslint-disable-next-line shadcn/no-restyle -- sidebar embedded in the mobile drawer: the drawer is the surface */}
            <Sidebar variant="sidebar" collapsible="none" aria-label="Docs" panelClassName="border-r-0 bg-transparent">
              <DocsNav />
            </Sidebar>
          </SidebarProvider>
        </DrawerContent>
      </Drawer>

      <CommandPalette items={searchItems} open={searchOpen} onOpenChange={setSearchOpen} placeholder="Search docs…" />
    </SidebarProvider>
  )
}

function PagerLink({ dir, label, section }: { dir: "prev" | "next"; label: string; section: string }) {
  const next = dir === "next"
  return (
    <a
      href="#"
      className={
        "group flex flex-col gap-1 rounded-2xl bg-card px-4 py-3.5 shadow-raised transition-shadow duration-150 outline-none hover:shadow-raised-hover focus-visible:ring-3 focus-visible:ring-ring " +
        (next ? "items-end text-end sm:col-start-2" : "items-start")
      }
    >
      <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
        {!next && <ArrowLeftIcon size={14} />}
        {next ? "Next" : "Previous"} · {section}
        {next && <ArrowRightIcon size={14} />}
      </span>
      <span className="font-medium">{label}</span>
    </a>
  )
}
