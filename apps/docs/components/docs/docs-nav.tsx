"use client"

import { useT, type Localized } from "@/lib/site-locale"
import { siteCopy } from "@/lib/site-copy"

import * as React from "react"
import Link from "next/link"

import { Badge } from "@paneui/ui/components/badge"
import {
  SidebarNav,
  SidebarNavContent,
  SidebarNavFooter,
  SidebarNavLink,
  SidebarNavList,
  SidebarNavSearch,
  SidebarNavSection,
} from "@paneui/ui/components/sidebar-nav"

import { COMPONENTS_HREF, COMPONENTS_TITLE, GUIDE_PAGES } from "./docs-pages"
import { isNew, WHATS_NEW } from "./whats-new"

export type NavGroup = { category: string; items: { name: string; title: string; description: Localized }[] }

/** Strip basePath-independent trailing slash so "/docs/button/" and "/docs/button" match. */
export function normalizePath(pathname: string | null) {
  if (!pathname || pathname === "/") return "/"
  return pathname.replace(/\/+$/, "")
}

const COLLAPSED_KEY = "docs-nav-collapsed"

/** Collapsed sections and groups, remembered across pages and visits. */
function useCollapsed() {
  const [collapsed, setCollapsed] = React.useState<Set<string>>(() => new Set())
  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(COLLAPSED_KEY)
      if (raw) setCollapsed(new Set(JSON.parse(raw) as string[]))
    } catch {
      // storage can be unavailable (private mode)
    }
  }, [])
  const toggle = React.useCallback((id: string) => {
    setCollapsed((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      try {
        localStorage.setItem(COLLAPSED_KEY, JSON.stringify([...next]))
      } catch {
        // storage can be unavailable (private mode)
      }
      return next
    })
  }, [])
  return [collapsed, toggle] as const
}

/**
 * Docs navigation: a search field, then collapsible Docs / Components / Templates sections with
 * nested category groups, and a pinned "What's new" link to the changelog.
 */
export function DocsNav({
  groups,
  pathname,
  onSearch,
  searchShortcut,
  className,
}: {
  groups: NavGroup[]
  pathname: string
  onSearch: () => void
  searchShortcut: string
  className?: string
}) {
  const t = useT()
  const label = (text: string) => t(siteCopy(text))
  const [collapsed, toggle] = useCollapsed()
  const sectionProps = (id: string, forceOpen = false) => ({
    open: forceOpen || !collapsed.has(id),
    onOpenChange: (next: boolean) => {
      if (next === collapsed.has(id)) toggle(id)
    },
  })

  const templates = groups.filter((g) => g.category === "Templates").flatMap((g) => g.items)
  const components = groups.filter((g) => g.category !== "Templates")
  const componentCount = components.reduce((n, g) => n + g.items.length, 0)
  const newBadge = (name: string) =>
    isNew(name) ? (
      <Badge variant="success" size="sm">
        {label("New")}
      </Badge>
    ) : undefined
  const link = (href: string, title: string, badge?: React.ReactNode) => (
    <SidebarNavLink key={href} active={pathname === href} badge={badge} render={<Link href={href} />}>
      {label(title)}
    </SidebarNavLink>
  )

  return (
    <SidebarNav className={className}>
      <SidebarNavSearch shortcut={searchShortcut} onClick={onSearch} aria-label={label("Search docs")}>{label("Search docs…")}</SidebarNavSearch>
      <SidebarNavContent aria-label={label("Docs")}>
        <SidebarNavSection label={label("Platforms")} {...sectionProps("platforms")}>
          <SidebarNavList>
            {link(COMPONENTS_HREF, "Web")}
            <SidebarNavLink render={<a href="/native/" />}>Native</SidebarNavLink>
          </SidebarNavList>
        </SidebarNavSection>
        <SidebarNavSection label={label("Docs")} {...sectionProps("docs")}>
          <SidebarNavList>{GUIDE_PAGES.map((p) => link(p.href, p.title))}</SidebarNavList>
        </SidebarNavSection>

        <SidebarNavSection label={label("Components")} count={componentCount} {...sectionProps("components")}>
          <SidebarNavList>{link(COMPONENTS_HREF, COMPONENTS_TITLE)}</SidebarNavList>
          {components.map((g) => (
            // A group holding the current page always shows it.
            <SidebarNavSection
              key={g.category}
              level="group"
              label={label(g.category)}
              count={g.items.length}
              {...sectionProps(`group:${g.category}`, g.items.some((i) => pathname === `/docs/${i.name}`))}
            >
              <SidebarNavList>{g.items.map((i) => link(`/docs/${i.name}`, i.title, newBadge(i.name)))}</SidebarNavList>
            </SidebarNavSection>
          ))}
        </SidebarNavSection>

        {templates.length > 0 && (
          <SidebarNavSection label={label("Templates")} count={templates.length} {...sectionProps("templates")}>
            <SidebarNavList>{templates.map((i) => link(`/docs/${i.name}`, i.title, newBadge(i.name)))}</SidebarNavList>
          </SidebarNavSection>
        )}
      </SidebarNavContent>

      <SidebarNavFooter>
        <SidebarNavList>
          <SidebarNavLink
            render={<Link href={WHATS_NEW.href} />}
            badge={<span className="text-ui-xs text-muted-foreground tabular-nums">{WHATS_NEW.items.length} {label("New")}</span>}
          >
            <span className="flex items-center gap-2 font-medium text-foreground">
              <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-success" />
              {label("What's new")}
            </span>
          </SidebarNavLink>
        </SidebarNavList>
      </SidebarNavFooter>
    </SidebarNav>
  )
}
