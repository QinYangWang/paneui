import type { Metadata } from "next"

import { PricingPage } from "@/registry/base-nova/templates/saas/components/marketing/pages"

export const metadata: Metadata = { title: "Pricing" }

export default function PricingRoute() {
  return <PricingPage />
}
