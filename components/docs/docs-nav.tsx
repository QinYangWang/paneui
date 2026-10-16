"use client"

import * as React from "react"
import Link from "next/link"

import { ChevronRightIcon } from "@/components/icons"
import { Badge } from "@/registry/base-nova/ui/badge"
import {
  SidebarNav,
  SidebarNavContent,
  SidebarNavFooter,
  SidebarNavLink,
  SidebarNavList,
  SidebarNavSearch,
  SidebarNavSection,
} from "@/registry/base-nova/ui/sidebar-nav"

import { COMPONENTS_HREF, COMPONENTS_TITLE, GUIDE_PAGES } from "./docs-pages"
import { isNew, WHATS_NEW } from "./whats-new"

export type NavGroup = { category: string; items: { name: string; title: string; description: string }[] }

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
        New
      </Badge>
    ) : undefined
  const link = (href: string, title: string, badge?: React.ReactNode) => (
    <SidebarNavLink key={href} active={pathname === href} badge={badge} render={<Link href={href} />}>
      {title}
    </SidebarNavLink>
  )

  return (
    <SidebarNav className={className}>
      <SidebarNavSearch shortcut={searchShortcut} onClick={onSearch} aria-label="Search docs" />
      <SidebarNavContent aria-label="Docs">
        <SidebarNavSection label="Docs" {...sectionProps("docs")}>
          <SidebarNavList>{GUIDE_PAGES.map((p) => link(p.href, p.title))}</SidebarNavList>
        </SidebarNavSection>

        <SidebarNavSection label="Components" count={componentCount} {...sectionProps("components")}>
          <SidebarNavList>{link(COMPONENTS_HREF, COMPONENTS_TITLE)}</SidebarNavList>
          {components.map((g) => (
            // A group holding the current page always shows it.
            <SidebarNavSection
              key={g.category}
              level="group"
              label={g.category}
              count={g.items.length}
              {...sectionProps(`group:${g.category}`, g.items.some((i) => pathname === `/docs/${i.name}`))}
            >
              <SidebarNavList>{g.items.map((i) => link(`/docs/${i.name}`, i.title, newBadge(i.name)))}</SidebarNavList>
            </SidebarNavSection>
          ))}
        </SidebarNavSection>

        {templates.length > 0 && (
          <SidebarNavSection label="Templates" count={templates.length} {...sectionProps("templates")}>
            <SidebarNavList>{templates.map((i) => link(`/docs/${i.name}`, i.title, newBadge(i.name)))}</SidebarNavList>
          </SidebarNavSection>
        )}
      </SidebarNavContent>

      <SidebarNavFooter>
        <Link
          href={WHATS_NEW.href}
          className="flex h-8 items-center gap-2 rounded-lg px-2.5 text-ui font-medium outline-none transition-colors duration-150 hover:bg-secondary focus-visible:ring-2 focus-visible:ring-ring/50"
        >
          <span aria-hidden className="size-1.5 rounded-full bg-success" />
          What&apos;s new
          <span className="ms-auto text-ui-xs font-normal text-muted-foreground tabular-nums">{WHATS_NEW.items.length} new</span>
          <ChevronRightIcon aria-hidden className="size-3.5 text-muted-foreground rtl:-scale-x-100" />
        </Link>
      </SidebarNavFooter>
    </SidebarNav>
  )
}
