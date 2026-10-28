"use client"

import SaasHome from "@/registry/templates/saas/app/page"
import SaasPricing from "@/registry/templates/saas/app/pricing/page"
import SaasChangelog from "@/registry/templates/saas/app/changelog/page"
import SaasNotFound from "@/registry/templates/saas/app/not-found"
import { SaasPreview } from "@/components/pages/templates/saas-route"
import type { SiteProps } from "@/components/site/site-root"

/*
 * The marketing pages and the 404 bring their own shell (nav, footer, providers), so no layout from
 * the template's app tree wraps them.
 */

export function SaasHomeRoute({ site }: { site: SiteProps }) {
  return (
    <SaasPreview site={site}>
      <SaasHome />
    </SaasPreview>
  )
}

export function SaasPricingRoute({ site }: { site: SiteProps }) {
  return (
    <SaasPreview site={site}>
      <SaasPricing />
    </SaasPreview>
  )
}

export function SaasChangelogRoute({ site }: { site: SiteProps }) {
  return (
    <SaasPreview site={site}>
      <SaasChangelog />
    </SaasPreview>
  )
}

export function SaasNotFoundRoute({ site }: { site: SiteProps }) {
  return (
    <SaasPreview site={site}>
      <SaasNotFound />
    </SaasPreview>
  )
}
