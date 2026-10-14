import type { Metadata } from "next"

import { TeamSettings } from "@/registry/base-nova/templates/saas/components/settings/settings-pages"

export const metadata: Metadata = { title: "Team" }

export default function TeamSettingsRoute() {
  return <TeamSettings />
}
