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

import { cn } from "@/lib/utils"

import { categoryIcons, ComponentsIcon, guideIcons } from "./category-icons"
import { DocsNav, normalizePath, type NavGroup } from "./docs-nav"
import { COMPONENTS_HREF, GUIDE_PAGES } from "./docs-pages"
import { ThemeControls } from "./theme-controls"

const GITHUB_URL = "https://github.com/QinYangWang/ui"

const isTemplate = (pathname: string, groups: NavGroup[]) =>
  groups.some((g) => g.category === "Templates" && g.items.some((i) => pathname === `/docs/${i.name}`))

/** Header sections, mirroring the sidebar: Getting started pages, components (overview + item pages), templates. */
const headerLinks: { label: string; href: string; isActive: (pathname: string, groups: NavGroup[]) => boolean }[] = [
  { label: "Docs", href: "/docs", isActive: (p) => GUIDE_PAGES.some((g) => g.href === p) },
  {
    label: "Components",
    href: COMPONENTS_HREF,
    isActive: (p, groups) => p === COMPONENTS_HREF || (p.startsWith("/docs/") && !GUIDE_PAGES.some((g) => g.href === p) && !isTemplate(p, groups)),
  },
  { label: "Templates", href: "/#templates", isActive: isTemplate },
]

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
      ...GUIDE_PAGES.map((p) => ({
        id: p.href,
        label: p.title,
        group: "Getting started",
        icon: guideIcons[p.href],
        keywords: [...p.keywords, p.description],
        onSelect: go(p.href),
      })),
      {
        id: COMPONENTS_HREF,
        label: "Components overview",
        group: "Getting started",
        icon: ComponentsIcon,
        keywords: ["components", "all", "gallery", "previews", "home"],
        onSelect: go(COMPONENTS_HREF),
      },
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
    <SidebarProvider shortcut={null} className="min-h-svh flex-col bg-shell">
      <header className="sticky top-0 z-40 h-12 shrink-0 bg-shell">
        <div className="flex h-full items-center gap-1.5 px-2.5 sm:px-3">
          <Tooltip>
            <TooltipTrigger render={<SidebarTrigger className="max-lg:hidden" />} />
            <TooltipContent side="bottom">Toggle sidebar</TooltipContent>
          </Tooltip>
          <Button variant="ghost" size="icon-sm" className="lg:hidden" aria-label="Open navigation" onClick={() => setNavOpen(true)}>
            <MenuIcon />
          </Button>
          <Link
            href="/"
            className="flex items-center gap-2 rounded-md py-1 pr-2 pl-1 text-ui font-semibold outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
          >
            <QinyangLogoIcon size={20} className="text-foreground" />
            qinyang/ui
          </Link>
          <nav aria-label="Main" className="ml-2 flex items-center gap-0.5 max-md:hidden">
            {headerLinks.map((l) => {
              const active = l.isActive(pathname, groups)
              return (
                <Link
                  key={l.label}
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "inline-flex h-7 items-center rounded-lg px-2.5 text-ui font-medium text-muted-foreground transition-colors duration-150 outline-none hover:bg-secondary hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50",
                    active && "text-foreground",
                  )}
                >
                  {l.label}
                </Link>
              )
            })}
          </nav>

          <div className="ml-auto flex items-center gap-1.5">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setSearchOpen(true)}
              aria-label="Search docs"
              aria-keyshortcuts={mac ? "Meta+K" : "Control+K"}
              // eslint-disable-next-line shadcn/no-restyle -- header search morphs from an icon button (mobile) to a 240px field (sm+)
              className="w-8 justify-center px-0 text-muted-foreground sm:w-56 sm:justify-start sm:px-2.5"
            >
              <SearchIcon />
              <span className="hidden sm:inline">Search docs…</span>
              <kbd className="ml-auto hidden rounded-sm bg-card px-1.5 py-px font-sans text-ui-xs text-muted-foreground shadow-chip sm:inline">
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
        {/* eslint-disable-next-line shadcn/no-arbitrary-values, shadcn/no-restyle -- viewport height minus the h-12 band; the rail sidebar sits on the shell band with no seam (the inset panel draws the edge) */}
        <Sidebar variant="sidebar" aria-label="Docs" panelClassName="border-r-0" className="sticky top-12 h-[calc(100svh-3rem)] self-start max-lg:hidden">
          <DocsNav groups={groups} pathname={pathname} />
        </Sidebar>
        {/* Codex rail: the content is an inset panel on the shell band (see the shell-inset utility). */}
        <main className="shell-inset min-w-0 flex-1 px-5 py-8 max-lg:ml-0.75 sm:px-8 lg:px-10 lg:py-10">
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

      <CommandPalette items={items} open={searchOpen} onOpenChange={setSearchOpen} placeholder="Search docs and components…" />
    </SidebarProvider>
  )
}
