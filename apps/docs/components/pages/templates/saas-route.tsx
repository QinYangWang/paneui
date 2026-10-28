"use client"

import type * as React from "react"

import { SaasBase } from "@/registry/templates/saas/lib/routes"
import { SiteRoot, type SiteProps } from "@/components/site/site-root"

/**
 * What every SaaS preview route shares: the site providers plus the base the template's links
 * resolve against (an installed app has no base; the preview lives under /templates/saas). This is what
 * the preview layout that mounted the template there rendered.
 */
export function SaasPreview({ site, children }: { site: SiteProps; children: React.ReactNode }) {
  return (
    <SiteRoot {...site}>
      <SaasBase base="/templates/saas">{children}</SaasBase>
    </SiteRoot>
  )
}
