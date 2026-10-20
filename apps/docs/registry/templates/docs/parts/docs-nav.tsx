"use client"

import {
  SidebarNav,
  SidebarNavContent,
  SidebarNavLink,
  SidebarNavList,
  SidebarNavSection,
} from "@paneui/ui/components/sidebar-nav"
import { Badge } from "@paneui/ui/components/badge"

import { CURRENT_PAGE, SECTIONS } from "./site"

/**
 * The page tree. `section` limits it to one section's groups (the Notebook layout shows the
 * other sections as header tabs); without it every section is a collapsible heading.
 */
export function DocsNav({ section, className }: { section?: string; className?: string }) {
  const sections = section ? SECTIONS.filter((s) => s.id === section) : SECTIONS
  return (
    <SidebarNav className={className}>
      <SidebarNavContent aria-label="Docs" className="pt-3">
        {sections.map((s) =>
          section ? (
            s.groups.map((g) => <Group key={g.label} label={g.label} pages={g.pages} level="section" />)
          ) : (
            <SidebarNavSection key={s.id} label={s.title}>
              {s.groups.map((g) => (
                <Group key={g.label} label={g.label} pages={g.pages} level="group" />
              ))}
            </SidebarNavSection>
          ),
        )}
      </SidebarNavContent>
    </SidebarNav>
  )
}

function Group({ label, pages, level }: { label: string; pages: { title: string; href: string; badge?: string }[]; level: "section" | "group" }) {
  return (
    <SidebarNavSection label={label} level={level} collapsible={level === "group"}>
      <SidebarNavList>
        {pages.map((p) => (
          <SidebarNavLink
            key={p.title}
            href={p.href}
            active={p.title === CURRENT_PAGE}
            badge={
              p.badge ? (
                <Badge variant="success" size="sm">
                  {p.badge}
                </Badge>
              ) : undefined
            }
          >
            {p.title}
          </SidebarNavLink>
        ))}
      </SidebarNavList>
    </SidebarNavSection>
  )
}
