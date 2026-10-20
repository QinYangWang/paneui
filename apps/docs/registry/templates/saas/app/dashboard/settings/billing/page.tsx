import type { Metadata } from "next"

import { BillingSettings } from "@/registry/templates/saas/components/settings/settings-pages"

export const metadata: Metadata = { title: "Billing" }

export default function BillingSettingsRoute() {
  return <BillingSettings />
}
