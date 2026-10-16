import { DashboardShell } from "@/registry/base-nova/templates/saas/components/app/dashboard-shell"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell>{children}</DashboardShell>
}
