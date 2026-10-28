"use client"

import { useT, type Localized } from "@/lib/site-locale"
import { siteCopy } from "@/lib/site-copy"

import * as React from "react"
import Link from "next/link"

import { Badge } from "@paneui/ui/components/badge"
import {
  SidebarNav,
  SidebarNavContent,
  SidebarNavLink,
  SidebarNavList,
  SidebarNavSearch,
  SidebarNavSection,
} from "@paneui/ui/components/sidebar-nav"

import { COMPONENTS_HREF, COMPONENTS_TITLE, GUIDE_PAGES } from "./docs-pages"
import { isNew } from "./whats-new"

export type NavGroup = { category: string; items: { name: string; title: string; description: Localized }[] }

/** Strip basePath-independent trailing slash so "/docs/button/" and "/docs/button" match. */
export function normalizePath(pathname: string | null) {
  if (!pathname || pathname === "/") return "/"
  return pathname.replace(/\/+$/, "")
}

/**
 * Docs navigation on the grey band: flat rows under small captions (Sections, then each
 * component category, then Templates); the current row is a fill.
 */
export function DocsNav({
  groups,
  pathname,
  onSearch,
  searchShortcut,
  showSearch = false,
  className,
}: {
  groups: NavGroup[]
  pathname: string
  onSearch: () => void
  searchShortcut: string
  /** The drawer has no header search, so it shows the field. */
  showSearch?: boolean
  className?: string
}) {
  const t = useT()
  const label = (text: string) => t(siteCopy(text))

  const templates = groups.filter((g) => g.category === "Templates").flatMap((g) => g.items)
  const components = groups.filter((g) => g.category !== "Templates")
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
    <SidebarNav variant="fill" indicator="fill" className={className}>
      {showSearch && (
        <SidebarNavSearch shortcut={searchShortcut} onClick={onSearch} aria-label={label("Search docs")}>
          {label("Search docs…")}
        </SidebarNavSearch>
      )}
      <SidebarNavContent aria-label={label("Docs")} className="pt-3">
        <SidebarNavSection level="label" label={label("Sections")}>
          <SidebarNavList>
            {link(GUIDE_PAGES[0].href, GUIDE_PAGES[0].title)}
            {link(COMPONENTS_HREF, COMPONENTS_TITLE)}
            {GUIDE_PAGES.slice(1).map((p) => link(p.href, p.title))}
          </SidebarNavList>
        </SidebarNavSection>

        {components.map((g) => (
          <SidebarNavSection key={g.category} level="label" label={label(g.category)}>
            <SidebarNavList>{g.items.map((i) => link(`/docs/${i.name}`, i.title, newBadge(i.name)))}</SidebarNavList>
          </SidebarNavSection>
        ))}

        {templates.length > 0 && (
          <SidebarNavSection level="label" label={label("Templates")}>
            <SidebarNavList>{templates.map((i) => link(`/docs/${i.name}`, i.title, newBadge(i.name)))}</SidebarNavList>
          </SidebarNavSection>
        )}
      </SidebarNavContent>
    </SidebarNav>
  )
}
