import { BounceSidebar } from "@/registry/base-nova/ui/bounce-sidebar"

const items = [
  { id: "profile", label: "Profile" },
  { id: "account", label: "Account" },
  { id: "notifications", label: "Notifications" },
  { id: "billing", label: "Billing" },
  { id: "security", label: "Security" },
  { id: "integrations", label: "Integrations" },
  { id: "danger", label: "Delete account" },
]

export default function BounceSidebarWithoutTrack() {
  return <BounceSidebar items={items} track={false} defaultValue="billing" label="Settings" className="w-48" />
}
