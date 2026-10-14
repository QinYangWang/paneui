"use client"

import * as React from "react"
import Link from "next/link"

import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarItem,
  SidebarMenu,
  SidebarSub,
  SidebarSubItem,
} from "@/registry/base-nova/ui/animated-sidebar"
import { cn } from "@/lib/utils"

import { categoryIcons, ComponentsIcon, guideIcons } from "./category-icons"
import { COMPONENTS_HREF, COMPONENTS_TITLE, GUIDE_PAGES } from "./docs-pages"

export type NavGroup = { category: string; items: { name: string; title: string; description: string }[] }

/** Strip basePath-independent trailing slash so "/docs/button/" and "/docs/button" match. */
export function normalizePath(pathname: string | null) {
  if (!pathname || pathname === "/") return "/"
  return pathname.replace(/\/+$/, "")
}

/** Docs navigation rendered with the library's animated sidebar parts. */
export function DocsNav({ groups, pathname, className }: { groups: NavGroup[]; pathname: string; className?: string }) {
  const ref = React.useRef<HTMLDivElement>(null)

  // Bring the current page into view once, so deep links don't land on a scrolled-away item.
  React.useEffect(() => {
    // Scroll only the nav itself (scrollIntoView would also scroll the page).
    const box = ref.current
    const el = box?.querySelector<HTMLElement>('[aria-current="page"]')
    if (!box || !el) return
    const top = el.getBoundingClientRect().top - box.getBoundingClientRect().top + box.scrollTop
    box.scrollTop = Math.max(0, top - box.clientHeight / 2 + el.offsetHeight / 2)
  }, [])

  const templates = groups.filter((g) => g.category === "Templates")
  const components = groups.filter((g) => g.category !== "Templates")
  const renderGroup = (g: NavGroup) => {
    const Icon = categoryIcons[g.category]
    return (
      <SidebarItem key={g.category} icon={Icon ? <Icon /> : undefined} label={g.category} badge={g.items.length} defaultOpen>
        <SidebarSub>
          {g.items.map((i) => {
            const href = `/docs/${i.name}`
            return (
              <SidebarSubItem key={i.name} isActive={pathname === href} render={<Link href={href} />}>
                {i.title}
              </SidebarSubItem>
            )
          })}
        </SidebarSub>
      </SidebarItem>
    )
  }

  return (
    <SidebarContent ref={ref} className={cn("scrollbar-hover py-2", className)}>
      <SidebarGroup>
        <SidebarGroupLabel>Getting started</SidebarGroupLabel>
        <SidebarMenu>
          {GUIDE_PAGES.map((p) => {
            const Icon = guideIcons[p.href]
            return (
              <SidebarItem
                key={p.href}
                icon={Icon ? <Icon /> : undefined}
                label={p.title}
                isActive={pathname === p.href}
                render={<Link href={p.href} />}
              />
            )
          })}
        </SidebarMenu>
      </SidebarGroup>
      <SidebarGroup>
        <SidebarGroupLabel>Components</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarItem
            icon={<ComponentsIcon />}
            label={COMPONENTS_TITLE}
            isActive={pathname === COMPONENTS_HREF}
            render={<Link href={COMPONENTS_HREF} />}
          />
          {components.map(renderGroup)}
        </SidebarMenu>
      </SidebarGroup>
      {templates.length > 0 && (
        <SidebarGroup>
          <SidebarGroupLabel>Templates</SidebarGroupLabel>
          <SidebarMenu>
            {templates.flatMap((g) =>
              g.items.map((i) => {
                const href = `/docs/${i.name}`
                const Icon = categoryIcons[g.category]
                return (
                  <SidebarItem
                    key={i.name}
                    icon={Icon ? <Icon /> : undefined}
                    label={i.title}
                    isActive={pathname === href}
                    render={<Link href={href} />}
                  />
                )
              }),
            )}
          </SidebarMenu>
        </SidebarGroup>
      )}
    </SidebarContent>
  )
}
