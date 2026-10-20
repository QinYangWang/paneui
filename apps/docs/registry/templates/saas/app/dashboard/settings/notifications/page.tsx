import type { Metadata } from "next"

import { NotificationSettings } from "@/registry/templates/saas/components/settings/settings-pages"

export const metadata: Metadata = { title: "Notifications" }

export default function NotificationSettingsRoute() {
  return <NotificationSettings />
}
