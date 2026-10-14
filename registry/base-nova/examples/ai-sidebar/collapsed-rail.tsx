import { AISidebar, type SidebarResource } from "@/registry/base-nova/ui/ai-sidebar"

const ITEMS: SidebarResource[] = [
  {
    id: "travel",
    label: "Travel",
    kind: "project",
    children: [
      { id: "kyoto", label: "Kyoto long weekend", kind: "file" },
      { id: "visa", label: "Japan visa checklist", kind: "file" },
    ],
  },
  {
    id: "home",
    label: "Home",
    kind: "folder",
    children: [
      { id: "lease", label: "Lease renewal", kind: "file" },
      { id: "movers", label: "Movers quotes", kind: "file" },
    ],
  },
]

export default function AISidebarCollapsedRail() {
  return (
    <div className="h-96 w-full max-w-md overflow-hidden rounded-3xl bg-background shadow-surface">
      <AISidebar defaultItems={ITEMS} defaultOpen={false} defaultActiveId="kyoto" searchHotkey={null} />
    </div>
  )
}
