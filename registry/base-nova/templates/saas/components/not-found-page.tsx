"use client"

import * as React from "react"
import { usePathname } from "next/navigation"

import { SearchIcon } from "@/components/icons"
import { buttonVariants } from "@/registry/base-nova/ui/button"
import {
  EmptyState,
  EmptyStateActions,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateTitle,
} from "@/registry/base-nova/ui/empty-state"

import { routes, useHref } from "../lib/routes"
import { BrandMark, SaasProviders } from "./providers"

/** 404: the missing path, with links home and to the dashboard. */
export function NotFoundPage() {
  const href = useHref()
  const pathname = usePathname()
  const path = pathname && !pathname.endsWith("/404") ? pathname : "/settings/legacy-billing"
  return (
    <SaasProviders>
      <div className="flex min-h-svh flex-col bg-background px-5 py-6 text-foreground sm:px-10">
        <BrandMark />
        <div className="flex flex-1 items-center justify-center py-12">
          <EmptyState size="lg" className="max-w-md">
            <EmptyStateIcon>
              <SearchIcon />
            </EmptyStateIcon>
            <EmptyStateTitle className="text-xl font-semibold tracking-tight text-balance">Page not found</EmptyStateTitle>
            <EmptyStateDescription className="text-pretty">
              Nothing lives at <code className="font-mono text-foreground break-all">{path}</code>. It may have moved or been renamed.
            </EmptyStateDescription>
            <EmptyStateActions className="mt-3">
              <a href={href(routes.home)} className={buttonVariants({ size: "lg" })}>
                Back home
              </a>
              <a href={href(routes.dashboard)} className={buttonVariants({ variant: "secondary", size: "lg" })}>
                Open dashboard
              </a>
            </EmptyStateActions>
          </EmptyState>
        </div>
      </div>
    </SaasProviders>
  )
}
