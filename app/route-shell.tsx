"use client"

import type * as React from "react"
import { usePathname } from "next/navigation"

import type { NavGroup } from "@/components/docs/docs-nav"
import { SiteShell } from "@/components/docs/site-shell"
import { ThemeSync } from "@/components/docs/theme-sync"

/**
 * Docs pages get the docs chrome (header, sidebar, ⌘K). Full-page templates
 * under /templates/* render bare, full-bleed, but keep the root providers and
 * follow theme/accent changes made in the docs (they are also embedded as
 * iframe previews there).
 */
export function RouteShell({ groups, children }: { groups: NavGroup[]; children: React.ReactNode }) {
  const pathname = usePathname() ?? "/"
  if (pathname === "/templates" || pathname.startsWith("/templates/")) return (
      <>
        <ThemeSync />
        {children}
      </>
    )
  return <SiteShell groups={groups}>{children}</SiteShell>
}
