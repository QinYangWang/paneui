import type { Metadata } from "next"

import { OverviewPage } from "@/registry/base-nova/templates/saas/components/app/overview-page"

export const metadata: Metadata = { title: "Overview" }

export default function OverviewRoute() {
  return <OverviewPage />
}
