import { AISidebar, type SidebarResource } from "@paneui/ui/components/ai-sidebar"

const ITEMS: SidebarResource[] = [
  { id: "inbox", label: "Inbox summary", kind: "file", meta: "12" },
  { id: "q3", label: "Q3 report draft", kind: "file", meta: "2d" },
  { id: "archive", label: "Archived chats", kind: "folder", disabled: true, children: [] },
]

export default function AISidebarMinimal() {
  return (
    <div className="h-72 w-full max-w-sm overflow-hidden rounded-3xl bg-background shadow-surface">
      <AISidebar defaultItems={ITEMS} defaultActiveId="inbox" title="Recent" searchable={false} width="14rem" />
    </div>
  )
}
