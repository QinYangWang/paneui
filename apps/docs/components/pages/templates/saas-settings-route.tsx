"use client"

import SaasDashboardLayout from "@/registry/templates/saas/app/dashboard/layout"
import SaasSettingsLayout from "@/registry/templates/saas/app/dashboard/settings/layout"
import SaasSettingsProfile from "@/registry/templates/saas/app/dashboard/settings/page"
import SaasSettingsAccount from "@/registry/templates/saas/app/dashboard/settings/account/page"
import SaasSettingsBilling from "@/registry/templates/saas/app/dashboard/settings/billing/page"
import SaasSettingsTeam from "@/registry/templates/saas/app/dashboard/settings/team/page"
import SaasSettingsIntegrations from "@/registry/templates/saas/app/dashboard/settings/integrations/page"
import SaasSettingsNotifications from "@/registry/templates/saas/app/dashboard/settings/notifications/page"
import SaasSettingsAppearance from "@/registry/templates/saas/app/dashboard/settings/appearance/page"
import { SaasPreview } from "@/components/pages/templates/saas-route"
import type { SiteProps } from "@/components/site/site-root"

/* Each settings page sits inside the dashboard layout, then the settings layout, as the app nests them. */

export function SaasSettingsProfileRoute({ site }: { site: SiteProps }) {
  return (
    <SaasPreview site={site}>
      <SaasDashboardLayout>
        <SaasSettingsLayout>
          <SaasSettingsProfile />
        </SaasSettingsLayout>
      </SaasDashboardLayout>
    </SaasPreview>
  )
}

export function SaasSettingsAccountRoute({ site }: { site: SiteProps }) {
  return (
    <SaasPreview site={site}>
      <SaasDashboardLayout>
        <SaasSettingsLayout>
          <SaasSettingsAccount />
        </SaasSettingsLayout>
      </SaasDashboardLayout>
    </SaasPreview>
  )
}

export function SaasSettingsBillingRoute({ site }: { site: SiteProps }) {
  return (
    <SaasPreview site={site}>
      <SaasDashboardLayout>
        <SaasSettingsLayout>
          <SaasSettingsBilling />
        </SaasSettingsLayout>
      </SaasDashboardLayout>
    </SaasPreview>
  )
}

export function SaasSettingsTeamRoute({ site }: { site: SiteProps }) {
  return (
    <SaasPreview site={site}>
      <SaasDashboardLayout>
        <SaasSettingsLayout>
          <SaasSettingsTeam />
        </SaasSettingsLayout>
      </SaasDashboardLayout>
    </SaasPreview>
  )
}

export function SaasSettingsIntegrationsRoute({ site }: { site: SiteProps }) {
  return (
    <SaasPreview site={site}>
      <SaasDashboardLayout>
        <SaasSettingsLayout>
          <SaasSettingsIntegrations />
        </SaasSettingsLayout>
      </SaasDashboardLayout>
    </SaasPreview>
  )
}

export function SaasSettingsNotificationsRoute({ site }: { site: SiteProps }) {
  return (
    <SaasPreview site={site}>
      <SaasDashboardLayout>
        <SaasSettingsLayout>
          <SaasSettingsNotifications />
        </SaasSettingsLayout>
      </SaasDashboardLayout>
    </SaasPreview>
  )
}

export function SaasSettingsAppearanceRoute({ site }: { site: SiteProps }) {
  return (
    <SaasPreview site={site}>
      <SaasDashboardLayout>
        <SaasSettingsLayout>
          <SaasSettingsAppearance />
        </SaasSettingsLayout>
      </SaasDashboardLayout>
    </SaasPreview>
  )
}
