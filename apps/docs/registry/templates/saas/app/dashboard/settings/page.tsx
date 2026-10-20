import type { Metadata } from "next"

import { ProfileSettings } from "@/registry/templates/saas/components/settings/settings-pages"

export const metadata: Metadata = { title: "Profile settings" }

export default function ProfileSettingsRoute() {
  return <ProfileSettings />
}
