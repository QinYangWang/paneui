"use client"

import * as React from "react"
import { usePathname } from "next/navigation"

import { NotFoundTerminal } from "@/registry/base-nova/blocks/not-found-terminal/not-found-terminal"

import { routes, useHref } from "../lib/routes"
import { BrandMark, SaasProviders } from "./providers"

/** 404: the terminal session block, with links home and to the dashboard. */
export function NotFoundPage() {
  const href = useHref()
  const pathname = usePathname()
  return (
    <SaasProviders>
      <div className="flex min-h-svh flex-col bg-background px-5 py-6 text-foreground sm:px-10">
        <BrandMark />
        <div className="flex flex-1 items-center justify-center py-12">
          <NotFoundTerminal
            path={pathname && !pathname.endsWith("/404") ? pathname : "/settings/legacy-billing"}
            homeHref={href(routes.home)}
            homeLabel="Back home"
            secondaryHref={href(routes.dashboard)}
            secondaryLabel="Open dashboard"
          />
        </div>
      </div>
    </SaasProviders>
  )
}
