import type { Metadata } from "next"

import { NotificationSettings } from "@/registry/base-nova/templates/saas/components/settings/settings-pages"

export const metadata: Metadata = { title: "Notifications" }

export default function NotificationSettingsRoute() {
  return <NotificationSettings />
}
