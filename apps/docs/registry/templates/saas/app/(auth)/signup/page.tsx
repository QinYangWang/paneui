import type { Metadata } from "next"

import { SignupPage } from "@/registry/templates/saas/components/auth/auth-pages"

export const metadata: Metadata = { title: "Create account" }

export default function SignupRoute() {
  return <SignupPage />
}
