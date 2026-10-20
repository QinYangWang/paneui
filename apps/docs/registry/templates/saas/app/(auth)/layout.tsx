import { AuthShell } from "@/registry/templates/saas/components/auth/auth-pages"

export default function AuthShellLayout({ children }: { children: React.ReactNode }) {
  return <AuthShell>{children}</AuthShell>
}
