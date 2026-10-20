"use client"

import * as React from "react"

import { SidebarNav, SidebarNavContent, SidebarNavLink, SidebarNavList, SidebarNavSection } from "@paneui/ui/components/sidebar-nav"

const KEY = "sidebar-nav-example-collapsed"
const groups = [
  { label: "Guides", pages: ["Quickstart", "Deploy", "Domains"] },
  { label: "Reference", pages: ["CLI", "Config file", "API"] },
]

/** Sections stay folded across visits: the open state lives in localStorage. */
export default function SidebarNavPersisted() {
  const [collapsed, setCollapsed] = React.useState<string[]>([])
  React.useEffect(() => {
    try {
      setCollapsed(JSON.parse(localStorage.getItem(KEY) ?? "[]") as string[])
    } catch {
      // storage can be unavailable
    }
  }, [])
  const setOpen = (label: string, open: boolean) => {
    const next = open ? collapsed.filter((l) => l !== label) : [...collapsed, label]
    setCollapsed(next)
    try {
      localStorage.setItem(KEY, JSON.stringify(next))
    } catch {
      // storage can be unavailable
    }
  }
  return (
    <div className="flex h-72 w-60 flex-col overflow-hidden rounded-xl bg-background shadow-raised">
      <SidebarNav>
        <SidebarNavContent aria-label="Docs" className="pt-3">
          {groups.map((g) => (
            <SidebarNavSection key={g.label} label={g.label} open={!collapsed.includes(g.label)} onOpenChange={(o) => setOpen(g.label, o)}>
              <SidebarNavList>
                {g.pages.map((p) => (
                  <SidebarNavLink key={p} href="#" active={p === "Deploy"}>
                    {p}
                  </SidebarNavLink>
                ))}
              </SidebarNavList>
            </SidebarNavSection>
          ))}
        </SidebarNavContent>
      </SidebarNav>
    </div>
  )
}
