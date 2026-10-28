"use client"

import SaasDashboardLayout from "@/registry/templates/saas/app/dashboard/layout"
import SaasOverview from "@/registry/templates/saas/app/dashboard/page"
import SaasAnalytics from "@/registry/templates/saas/app/dashboard/analytics/page"
import SaasCustomers from "@/registry/templates/saas/app/dashboard/customers/page"
import { SaasPreview } from "@/components/pages/templates/saas-route"
import type { SiteProps } from "@/components/site/site-root"

/* Each dashboard page sits inside the template's dashboard layout (header, sidebar, inset panel). */

export function SaasOverviewRoute({ site }: { site: SiteProps }) {
  return (
    <SaasPreview site={site}>
      <SaasDashboardLayout>
        <SaasOverview />
      </SaasDashboardLayout>
    </SaasPreview>
  )
}

export function SaasAnalyticsRoute({ site }: { site: SiteProps }) {
  return (
    <SaasPreview site={site}>
      <SaasDashboardLayout>
        <SaasAnalytics />
      </SaasDashboardLayout>
    </SaasPreview>
  )
}

export function SaasCustomersRoute({ site }: { site: SiteProps }) {
  return (
    <SaasPreview site={site}>
      <SaasDashboardLayout>
        <SaasCustomers />
      </SaasDashboardLayout>
    </SaasPreview>
  )
}
