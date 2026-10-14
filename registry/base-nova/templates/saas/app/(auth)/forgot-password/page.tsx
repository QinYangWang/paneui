import type { Metadata } from "next"

import { ForgotPasswordPage } from "@/registry/base-nova/templates/saas/components/auth/auth-pages"

export const metadata: Metadata = { title: "Reset password" }

export default function ForgotPasswordRoute() {
  return <ForgotPasswordPage />
}
