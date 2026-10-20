import type { Metadata } from "next"

import { PricingPage } from "@/registry/templates/saas/components/marketing/pages"

export const metadata: Metadata = { title: "Pricing" }

export default function PricingRoute() {
  return <PricingPage />
}
