"use client"

import { useT, useSiteLocale } from "@/lib/site-locale"
import { siteCopy } from "@/lib/site-copy"
import { LocaleProvider } from "@paneui/ui/components/locale-provider"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

import { GithubIcon, MenuIcon, PaneuiLogoIcon, SearchIcon } from "@paneui/ui/icons"
import { CommandPalette, type CommandPaletteItem } from "@paneui/ui/blocks/command-palette/command-palette"
import { Button } from "@paneui/ui/components/button"
import { Drawer, DrawerContent, DrawerTitle } from "@paneui/ui/components/drawer"
import { Kbd } from "@paneui/ui/components/kbd"
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@paneui/ui/components/navigation-menu"
import { Tooltip, TooltipContent, TooltipTrigger } from "@paneui/ui/components/tooltip"


import { categoryIcons, ComponentsIcon, guideIcons } from "./category-icons"
import { DocsNav, normalizePath, type NavGroup } from "./docs-nav"
import { COMPONENTS_HREF, GUIDE_PAGES } from "./docs-pages"
import { LanguageToggle } from "./language-toggle"
import { ThemeControls } from "./theme-controls"
import { ThemeSync } from "./theme-sync"

const GITHUB_URL = "https://github.com/QinYangWang/paneui"

const isTemplate = (pathname: string, groups: NavGroup[]) =>
  groups.some((g) => g.category === "Templates" && g.items.some((i) => pathname === `/docs/${i.name}`))

/** Header sections, mirroring the sidebar sections: Docs, Components, Templates. */
const headerLinks: { label: string; href: string; externalApp?: boolean; isActive: (pathname: string, groups: NavGroup[]) => boolean }[] = [
  { label: "Docs", href: "/docs", isActive: (p) => GUIDE_PAGES.some((g) => g.href === p) },
  {
    label: "Components",
    href: COMPONENTS_HREF,
    isActive: (p, groups) => p === COMPONENTS_HREF || (p.startsWith("/docs/") && !GUIDE_PAGES.some((g) => g.href === p) && !isTemplate(p, groups)),
  },
  { label: "Native", href: "/native/", externalApp: true, isActive: () => false },
  { label: "Templates", href: "/docs/components#templates", isActive: isTemplate },
]

function useIsMac() {
  const [mac, setMac] = React.useState(true)
  React.useEffect(() => setMac(/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent)), [])
  return mac
}

/** Mark plus wordmark; the mark is the favicon and the registry logo. */
function Brand() {
  return (
    <Link
      href="/"
      className="-ms-1 flex h-8 items-center gap-2 rounded-lg ps-1 pe-2 text-ui-lg font-semibold outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
    >
      <PaneuiLogoIcon size={20} className="text-foreground" />
      PaneUI
    </Link>
  )
}

/*
 * Docs chrome: one white surface split by hairlines. The header's brand column is exactly the
 * sidebar's width and starts on the sidebar's content edge; the header tabs share the sidebar's
 * active treatment (a 2px indicator line, on the bottom edge here and the guide line there).
 * Notes: notes/docs-shell.md.
 */
export function SiteShell({ groups, children }: { groups: NavGroup[]; children: React.ReactNode }) {
  const t = useT()
  const locale = useSiteLocale()
  React.useEffect(() => {
    document.documentElement.lang = locale === "zh" ? "zh-CN" : "en"
  }, [locale])
  const label = React.useCallback((text: string) => t(siteCopy(text)), [t])
  const pathname = normalizePath(usePathname())
  const router = useRouter()
  const mac = useIsMac()
  const [searchOpen, setSearchOpen] = React.useState(false)
  const [drawerOpen, setDrawerOpen] = React.useState(false)

  const items = React.useMemo<CommandPaletteItem[]>(() => {
    const go = (href: string) => () => router.push(href)
    return [
      ...GUIDE_PAGES.map((p) => ({
        id: p.href,
        label: label(p.title),
        group: label("Getting started"),
        icon: guideIcons[p.href],
        keywords: [...p.keywords, t(p.description)],
        onSelect: go(p.href),
      })),
      {
        id: COMPONENTS_HREF,
        label: label("Components overview"),
        group: label("Getting started"),
        icon: ComponentsIcon,
        keywords: ["components", "all", "gallery", "previews", "home"],
        onSelect: go(COMPONENTS_HREF),
      },
      ...groups.flatMap((g) =>
        g.items.map((i) => ({
          id: i.name,
          label: i.title,
          group: label(g.category),
          icon: categoryIcons[g.category],
          keywords: [i.name, t(i.description)],
          onSelect: go(`/docs/${i.name}`),
        }))
      ),
    ]
  }, [groups, router, t, label])

  const shortcut = mac ? "⌘K" : "Ctrl K"
  const openSearch = React.useCallback(() => {
    setDrawerOpen(false)
    setSearchOpen(true)
  }, [])

  return (
    <LocaleProvider locale={locale}>
      <div data-slot="docs-shell" className="min-h-svh bg-background text-foreground">
        {/* A theme, accent or radius picked in another tab applies here too (the header only follows theme and accent). */}
        <ThemeSync />
        <header className="sticky top-0 z-40 flex h-12 items-center border-b border-border bg-background">
          <div className="flex h-full shrink-0 items-center gap-1 ps-3 pe-2 lg:w-64 lg:ps-4">
            <Button variant="ghost" size="icon-sm" aria-label={label("Open navigation")} onClick={() => setDrawerOpen(true)} className="lg:hidden">
              <MenuIcon />
            </Button>
            <Brand />
          </div>

          <NavigationMenu aria-label={label("Main")} className="h-full max-md:hidden lg:ms-6">
            <NavigationMenuList className="h-full items-stretch gap-1">
              {headerLinks.map((l) => {
                const active = l.isActive(pathname, groups)
                return (
                  <NavigationMenuItem key={l.label}>
                    <NavigationMenuLink variant="tab" active={active} aria-current={active ? "page" : undefined} render={l.externalApp ? <a href={l.href} /> : <Link href={l.href} />}>
                      {label(l.label)}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                )
              })}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="ms-auto flex items-center gap-1.5 pe-3 lg:pe-4">
            <Button
              variant="secondary"
              size="sm"
              onClick={openSearch}
              aria-label={label("Search docs")}
              aria-keyshortcuts={mac ? "Meta+K" : "Control+K"}
              // eslint-disable-next-line shadcn/no-restyle -- header search morphs from an icon button (mobile) to a field (sm+)
              className="w-7 justify-center px-0 text-muted-foreground sm:w-52 sm:justify-start sm:ps-2 sm:pe-2.5"
            >
              <SearchIcon />
              <span className="hidden sm:inline">{label("Search docs…")}</span>
              <Kbd size="sm" className="ms-auto hidden sm:inline-flex">
                {shortcut}
              </Kbd>
            </Button>
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    nativeButton={false}
                    render={<a href={GITHUB_URL} target="_blank" rel="noreferrer" />}
                    aria-label={label("GitHub repository")}
                  />
                }
              >
                <GithubIcon className="size-4.5" />
              </TooltipTrigger>
              <TooltipContent side="bottom">GitHub</TooltipContent>
            </Tooltip>
            <LanguageToggle />
            <ThemeControls />
          </div>
        </header>

        <div className="flex">
          <aside
            // Fills the viewport under the header and sticks while the page scrolls.
            style={{ "--docs-aside-h": "calc(100svh - 3rem)" } as React.CSSProperties}
            className="sticky top-12 hidden h-(--docs-aside-h) w-64 shrink-0 flex-col border-e border-border lg:flex"
          >
            <DocsNav groups={groups} pathname={pathname} onSearch={openSearch} searchShortcut={shortcut} />
          </aside>

          <main className="min-w-0 flex-1">
            <div className="px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
              <div className="mx-auto w-full max-w-6xl">{children}</div>
            </div>
          </main>
        </div>

        <Drawer side="left" open={drawerOpen} onOpenChange={setDrawerOpen}>
          <DrawerContent
            className="w-80"
            // a link inside the drawer navigates, so the drawer has done its job
            onClickCapture={(e) => {
              if ((e.target as HTMLElement).closest("a[href]")) setDrawerOpen(false)
            }}
          >
            <div className="flex h-14 shrink-0 items-center px-4">
              <DrawerTitle className="flex items-center gap-2 text-ui-lg font-semibold">
                <PaneuiLogoIcon size={20} />
                PaneUI
              </DrawerTitle>
            </div>
            <DocsNav groups={groups} pathname={pathname} onSearch={openSearch} searchShortcut={shortcut} />
          </DrawerContent>
        </Drawer>

        <CommandPalette items={items} open={searchOpen} onOpenChange={setSearchOpen} placeholder={label("Search docs and components…")} />
      </div>
    </LocaleProvider>
  )
}
