import type { Metadata } from "next"

import { AnalyticsPage } from "@/registry/templates/saas/components/app/analytics-page"

export const metadata: Metadata = { title: "Analytics" }

export default function AnalyticsRoute() {
  return <AnalyticsPage />
}
