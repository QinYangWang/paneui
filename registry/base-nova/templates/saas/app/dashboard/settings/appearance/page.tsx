import type { Metadata } from "next"

import { AppearanceSettings } from "@/registry/base-nova/templates/saas/components/settings/settings-pages"

export const metadata: Metadata = { title: "Appearance" }

export default function AppearanceSettingsRoute() {
  return <AppearanceSettings />
}
