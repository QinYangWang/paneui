import type { Metadata } from "next"

import { VerifyPage } from "@/registry/base-nova/templates/saas/components/auth/auth-pages"

export const metadata: Metadata = { title: "Verify your email" }

export default function VerifyRoute() {
  return <VerifyPage />
}
