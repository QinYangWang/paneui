import type { Metadata } from "next"

import { ChangelogPage } from "@/registry/base-nova/templates/saas/components/marketing/pages"

export const metadata: Metadata = { title: "Changelog" }

export default function ChangelogRoute() {
  return <ChangelogPage />
}
