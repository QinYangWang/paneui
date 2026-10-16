"use client"

import * as React from "react"

import { SidebarNav, SidebarNavContent, SidebarNavLink, SidebarNavList, SidebarNavSection } from "@/registry/base-nova/ui/sidebar-nav"

const groups = [
  { label: "Forms", href: "#forms", pages: ["Button", "Input", "Select"] },
  { label: "Overlays", href: "#overlays", pages: ["Dialog", "Menu", "Popover"] },
]

/** Group labels open their own overview page; the chevron beside them still folds the rows. */
export default function SidebarNavLinkedGroups() {
  const [current, setCurrent] = React.useState("#forms")
  const go = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    setCurrent(href)
  }
  return (
    <div className="flex h-80 w-60 flex-col overflow-hidden rounded-xl bg-background shadow-raised">
      <SidebarNav>
        <SidebarNavContent aria-label="Components" className="pt-3">
          <SidebarNavSection label="Components" labelRender={<a href="#components" onClick={go("#components")} />} active={current === "#components"}>
            {groups.map((g) => (
              <SidebarNavSection
                key={g.href}
                level="group"
                label={g.label}
                labelRender={<a href={g.href} onClick={go(g.href)} />}
                active={current === g.href}
              >
                <SidebarNavList>
                  {g.pages.map((p) => {
                    const href = `${g.href}-${p.toLowerCase()}`
                    return (
                      <SidebarNavLink key={p} href={href} onClick={go(href)} active={current === href}>
                        {p}
                      </SidebarNavLink>
                    )
                  })}
                </SidebarNavList>
              </SidebarNavSection>
            ))}
          </SidebarNavSection>
        </SidebarNavContent>
      </SidebarNav>
    </div>
  )
}
