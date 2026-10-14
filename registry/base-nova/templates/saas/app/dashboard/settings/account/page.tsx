import type { Metadata } from "next"

import { AccountSettings } from "@/registry/base-nova/templates/saas/components/settings/settings-pages"

export const metadata: Metadata = { title: "Account settings" }

export default function AccountSettingsRoute() {
  return <AccountSettings />
}
