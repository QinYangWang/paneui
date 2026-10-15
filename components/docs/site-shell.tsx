"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

import { GithubIcon, QinyangLogoIcon, SearchIcon } from "@/components/icons"
import { CommandPalette, type CommandPaletteItem } from "@/registry/base-nova/blocks/command-palette/command-palette"
import { AppShell, AppShellHeader, AppShellMain, AppShellSidebar, AppShellTrigger } from "@/registry/base-nova/ui/app-shell"
import { Button } from "@/registry/base-nova/ui/button"
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
  const [searchOpen, setSearchOpen] = React.useState(false)

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
    <AppShell shortcut={null}>
      <AppShellHeader
        leading={
          <Tooltip>
            <TooltipTrigger render={<AppShellTrigger />} />
            <TooltipContent side="bottom">Toggle sidebar</TooltipContent>
          </Tooltip>
        }
      >
        {/* Starts on the sidebar's label column: the mark lines up with the nav labels below it. */}
        <Link
          href="/"
          className="-ms-1 flex items-center gap-2 rounded-md py-1 ps-1 pe-2 text-ui font-semibold outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
        >
          <QinyangLogoIcon size={18} className="text-foreground" />
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
      </AppShellHeader>

      <AppShellSidebar
        aria-label="Docs"
        mobileTitle={
          <>
            <QinyangLogoIcon size={18} />
            qinyang/ui
          </>
        }
      >
        <DocsNav groups={groups} pathname={pathname} />
      </AppShellSidebar>

      <AppShellMain>
        <div className="px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </div>
      </AppShellMain>

      <CommandPalette items={items} open={searchOpen} onOpenChange={setSearchOpen} placeholder="Search docs and components…" />
    </AppShell>
  )
}
