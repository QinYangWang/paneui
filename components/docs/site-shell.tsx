"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

import { GithubIcon, MenuIcon, QinyangLogoIcon, SearchIcon } from "@/components/icons"
import { CommandPalette, type CommandPaletteItem } from "@/registry/base-nova/blocks/command-palette/command-palette"
import { Sidebar, SidebarProvider, SidebarTrigger } from "@/registry/base-nova/ui/animated-sidebar"
import { Button } from "@/registry/base-nova/ui/button"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/registry/base-nova/ui/drawer"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/base-nova/ui/tooltip"

import { categoryIcons, GalleryIcon, InstallIcon } from "./category-icons"
import { DocsNav, normalizePath, type NavGroup } from "./docs-nav"
import { ThemeControls } from "./theme-controls"

const GITHUB_URL = "https://github.com/QinYangWang/ui"

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
          <Link
            href="/"
            className="flex items-center gap-2 rounded-full py-1 pr-2 pl-1 font-semibold tracking-tight outline-none focus-visible:ring-3 focus-visible:ring-ring"
          >
            <QinyangLogoIcon size={22} className="text-foreground" />
            qinyang/ui
          </Link>

          <div className="ml-auto flex items-center gap-1.5">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setSearchOpen(true)}
              aria-label="Search components"
              aria-keyshortcuts={mac ? "Meta+K" : "Control+K"}
              // eslint-disable-next-line shadcn/no-restyle -- header search morphs from an icon button (mobile) to a 240px field (sm+)
              className="w-9 justify-center px-0 text-muted-foreground sm:w-60 sm:justify-start sm:px-3"
            >
              <SearchIcon />
              <span className="hidden sm:inline">Search components…</span>
              {/* eslint-disable-next-line shadcn/no-arbitrary-values -- 10px keycap label; no text token below text-xs yet */}
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
                <GithubIcon className="size-4.5" />
              </TooltipTrigger>
              <TooltipContent side="bottom">GitHub</TooltipContent>
            </Tooltip>
            <ThemeControls />
          </div>
        </div>
      </header>

      <div className="flex min-w-0 flex-1">
        {/* eslint-disable-next-line shadcn/no-arbitrary-values -- viewport height minus the h-14 sticky header */}
        <Sidebar variant="sidebar" aria-label="Docs" className="sticky top-14 h-[calc(100svh-3.5rem)] self-start max-lg:hidden">
          <DocsNav groups={groups} pathname={pathname} />
        </Sidebar>
        <main className="min-w-0 flex-1 px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </main>
      </div>

      <Drawer side="left" open={navOpen} onOpenChange={setNavOpen}>
        {/* eslint-disable-next-line shadcn/no-arbitrary-values -- 20rem drawer that never exceeds the viewport minus a 1rem gutter */}
        <DrawerContent className="w-[min(20rem,calc(100vw-1rem))]">
          <DrawerHeader className="pb-2">
            <DrawerTitle className="flex items-center gap-2">
              <QinyangLogoIcon size={22} />
              qinyang/ui
            </DrawerTitle>
          </DrawerHeader>
          <SidebarProvider shortcut={null} className="min-h-0 flex-1" style={{ "--sidebar-width": "100%" } as React.CSSProperties}>
            {/* eslint-disable-next-line shadcn/no-restyle -- sidebar embedded in the mobile drawer: the drawer is the surface */}
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
