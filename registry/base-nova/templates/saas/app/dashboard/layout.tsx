import { AppShell } from "@/registry/base-nova/templates/saas/components/app/app-shell"

export default function AppShellLayout({ children }: { children: React.ReactNode }) {
  return <AppShell>{children}</AppShell>
}
