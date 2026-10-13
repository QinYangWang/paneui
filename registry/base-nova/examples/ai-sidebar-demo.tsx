"use client"

import { AISidebar, type SidebarResource } from "@/registry/base-nova/ui/ai-sidebar"
import { Button } from "@/registry/base-nova/ui/button"
import { PlusIcon } from "@/components/icons"

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
    id: "dashboard",
    label: "Dashboard app",
    kind: "project",
    children: [
      { id: "hydration", label: "Fix hydration bug in the date picker component", kind: "file" },
      {
        id: "specs",
        label: "Specs",
        kind: "folder",
        children: [
          { id: "onboarding", label: "Onboarding flow review", kind: "file" },
          { id: "pricing", label: "Pricing page copy", kind: "file" },
        ],
      },
    ],
  },
  {
    id: "personal",
    label: "Personal",
    kind: "folder",
    children: [
      { id: "gift", label: "Birthday gift ideas", kind: "file" },
      { id: "budget", label: "October budget", kind: "file", meta: "2d" },
    ],
  },
]

const BOOKMARKS: SidebarResource[] = [
  { id: "weekly", label: "Weekly review prompt", kind: "bookmark" },
  { id: "style", label: "Writing style guide", kind: "bookmark" },
]

export default function AISidebarDemo() {
  return (
    <div className="h-[30rem] w-full max-w-md overflow-hidden rounded-[1.75rem] bg-background shadow-surface">
      <AISidebar
        defaultItems={ITEMS}
        bookmarks={BOOKMARKS}
        defaultActiveId="kyoto"
        defaultExpandedIds={["travel", "dashboard"]}
        title="Agent"
        renamable
        actions={(open) =>
          open ? (
            <Button variant="secondary" size="sm" className="w-full justify-start">
              <PlusIcon />
              New chat
            </Button>
          ) : (
            <Button variant="secondary" size="icon-sm" aria-label="New chat">
              <PlusIcon />
            </Button>
          )
        }
      />
    </div>
  )
}
