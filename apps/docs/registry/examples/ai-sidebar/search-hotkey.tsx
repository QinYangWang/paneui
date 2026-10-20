import { AISidebar, type SidebarResource } from "@paneui/ui/components/ai-sidebar"

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

export default function AISidebarSearchHotkey() {
  return (
    <div className="h-96 w-full max-w-md overflow-hidden rounded-3xl bg-background shadow-surface">
      <AISidebar defaultItems={ITEMS} defaultOpen={false} searchHotkey="j" />
    </div>
  )
}
