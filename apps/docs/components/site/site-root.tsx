"use client"

import type * as React from "react"

import { PathnameProvider } from "next/navigation"
import type { NavGroup } from "@/components/docs/docs-nav"
import { RouteShell } from "@/components/site/route-shell"
import { ToastProvider } from "@paneui/ui/components/toast"
import { TooltipProvider } from "@paneui/ui/components/tooltip"

export type SiteProps = { pathname: string; groups: NavGroup[] }

/**
 * Root of every page island: the providers the Next root layout used to give, plus the route
 * chrome (docs shell, or bare for the landing page, templates and /preview).
 * Each Astro page renders exactly one island: `<XxxPage client:load site={site} data={data} />`,
 * and XxxPage wraps its content in <SiteRoot {...site}>.
 */
export function SiteRoot({ pathname, groups, children }: SiteProps & { children: React.ReactNode }) {
  return (
    <PathnameProvider pathname={pathname}>
      <ToastProvider>
        <TooltipProvider>
          <RouteShell groups={groups}>{children}</RouteShell>
        </TooltipProvider>
      </ToastProvider>
    </PathnameProvider>
  )
}
