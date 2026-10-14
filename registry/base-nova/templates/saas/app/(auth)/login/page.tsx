import type { Metadata } from "next"

import { LoginPage } from "@/registry/base-nova/templates/saas/components/auth/auth-pages"

export const metadata: Metadata = { title: "Sign in" }

export default function LoginRoute() {
  return <LoginPage />
}
