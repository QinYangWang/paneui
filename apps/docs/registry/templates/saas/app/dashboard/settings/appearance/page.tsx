import type { Metadata } from "next"

import { AppearanceSettings } from "@/registry/templates/saas/components/settings/settings-pages"

export const metadata: Metadata = { title: "Appearance" }

export default function AppearanceSettingsRoute() {
  return <AppearanceSettings />
}
