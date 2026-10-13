"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

import { MenuIcon, SearchIcon } from "@/components/icons"
import { CommandPalette, type CommandPaletteItem } from "@/registry/base-nova/blocks/command-palette/command-palette"
import { Sidebar, SidebarProvider, SidebarTrigger } from "@/registry/base-nova/ui/animated-sidebar"
import { Button } from "@/registry/base-nova/ui/button"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/registry/base-nova/ui/drawer"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/base-nova/ui/tooltip"

import { categoryIcons, GalleryIcon, InstallIcon } from "./category-icons"
import { DocsNav, normalizePath, type NavGroup } from "./docs-nav"
import { ThemeControls } from "./theme-controls"

const GITHUB_URL = "https://github.com/QinYangWang/ui"

function GitHubMark(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden {...props}>
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  )
}

function useIsMac() {
  const [mac, setMac] = React.useState(true)
  React.useEffect(() => setMac(/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent)), [])
  return mac
}

export function SiteShell({ groups, children }: { groups: NavGroup[]; children: React.ReactNode }) {
  const pathname = normalizePath(usePathname())
  const router = useRouter()
  const mac = useIsMac()
  const [navOpen, setNavOpen] = React.useState(false)
  const [searchOpen, setSearchOpen] = React.useState(false)

  // Close the mobile drawer once a link in it navigated.
  React.useEffect(() => setNavOpen(false), [pathname])

  const items = React.useMemo<CommandPaletteItem[]>(() => {
    const go = (href: string) => () => router.push(href)
    return [
      { id: "/", label: "Gallery", group: "Getting started", icon: GalleryIcon, keywords: ["home", "all"], onSelect: go("/") },
      { id: "/docs", label: "Installation", group: "Getting started", icon: InstallIcon, keywords: ["setup", "registry", "cli"], onSelect: go("/docs") },
      ...groups.flatMap((g) =>
        g.items.map((i) => ({
          id: i.name,
          label: i.title,
          group: g.category,
          icon: categoryIcons[g.category],
          keywords: [i.name, i.description],
          onSelect: go(`/docs/${i.name}`),
        }))
      ),
    ]
  }, [groups, router])

  const shortcut = mac ? "⌘K" : "Ctrl K"

  return (
    <SidebarProvider shortcut={null} className="min-h-svh flex-col">
      <header className="sticky top-0 z-40 h-14 shrink-0 border-b border-border bg-background/80 backdrop-blur">
        <div className="flex h-full items-center gap-2 px-3 sm:px-4">
          <Tooltip>
            <TooltipTrigger render={<SidebarTrigger className="max-lg:hidden" />} />
            <TooltipContent side="bottom">Toggle sidebar</TooltipContent>
          </Tooltip>
          <Button variant="ghost" size="icon-sm" className="lg:hidden" aria-label="Open navigation" onClick={() => setNavOpen(true)}>
            <MenuIcon />
          </Button>
          <Link href="/" className="rounded-full px-1.5 py-1 font-semibold tracking-tight outline-none focus-visible:ring-3 focus-visible:ring-ring">
            qinyang/ui
          </Link>

          <div className="ml-auto flex items-center gap-1.5">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setSearchOpen(true)}
              aria-label="Search components"
              aria-keyshortcuts={mac ? "Meta+K" : "Control+K"}
              className="w-9 justify-center px-0 text-muted-foreground sm:w-60 sm:justify-start sm:px-3"
            >
              <SearchIcon />
              <span className="hidden sm:inline">Search components…</span>
              <kbd className="ml-auto hidden rounded-md bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground shadow-chip sm:inline">
                {shortcut}
              </kbd>
            </Button>
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    nativeButton={false}
                    render={<a href={GITHUB_URL} target="_blank" rel="noreferrer" />}
                    aria-label="GitHub repository"
                  />
                }
              >
                <GitHubMark className="size-4" />
              </TooltipTrigger>
              <TooltipContent side="bottom">GitHub</TooltipContent>
            </Tooltip>
            <ThemeControls />
          </div>
        </div>
      </header>

      <div className="flex min-w-0 flex-1">
        <Sidebar variant="sidebar" aria-label="Docs" className="sticky top-14 h-[calc(100svh-3.5rem)] self-start max-lg:hidden">
          <DocsNav groups={groups} pathname={pathname} />
        </Sidebar>
        <main className="min-w-0 flex-1 px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </main>
      </div>

      <Drawer side="left" open={navOpen} onOpenChange={setNavOpen}>
        <DrawerContent className="w-[min(20rem,calc(100vw-1rem))]">
          <DrawerHeader className="pb-2">
            <DrawerTitle>qinyang/ui</DrawerTitle>
          </DrawerHeader>
          <SidebarProvider shortcut={null} className="min-h-0 flex-1" style={{ "--sidebar-width": "100%" } as React.CSSProperties}>
            <Sidebar variant="sidebar" collapsible="none" aria-label="Docs" panelClassName="border-r-0 bg-transparent">
              <DocsNav groups={groups} pathname={pathname} className="px-3 pb-4" />
            </Sidebar>
          </SidebarProvider>
        </DrawerContent>
      </Drawer>

      <CommandPalette items={items} open={searchOpen} onOpenChange={setSearchOpen} placeholder="Search components…" />
    </SidebarProvider>
  )
}
