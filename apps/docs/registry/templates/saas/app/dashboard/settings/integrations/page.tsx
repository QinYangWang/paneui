import type { Metadata } from "next"

import { IntegrationsSettings } from "@/registry/templates/saas/components/settings/integrations-page"

export const metadata: Metadata = { title: "Integrations" }

export default function IntegrationsSettingsRoute() {
  return <IntegrationsSettings />
}
