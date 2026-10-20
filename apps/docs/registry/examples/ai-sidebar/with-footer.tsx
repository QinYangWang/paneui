"use client"

import { PlusIcon, SettingsIcon } from "@paneui/ui/icons"
import { AISidebar, type SidebarResource } from "@paneui/ui/components/ai-sidebar"
import { Button } from "@paneui/ui/components/button"

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

export default function AISidebarWithFooter() {
  return (
    <div className="h-96 w-full max-w-md overflow-hidden rounded-3xl bg-background shadow-surface">
      <AISidebar
        defaultItems={ITEMS}
        defaultExpandedIds={["travel"]}
        title="Hark"
        searchHotkey={null}
        actions={(open) =>
          open ? (
            <Button variant="secondary" size="sm" className="w-full justify-start">
              <PlusIcon data-icon="inline-start" />
              New chat
            </Button>
          ) : (
            <Button variant="secondary" size="icon-sm" aria-label="New chat">
              <PlusIcon />
            </Button>
          )
        }
        footer={(open) =>
          open ? (
            <div className="flex items-center gap-2 px-1">
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">QW</span>
              <span className="min-w-0 flex-1 truncate text-sm font-medium">Qinyang Wang</span>
              <Button variant="ghost" size="icon-sm" aria-label="Settings">
                <SettingsIcon />
              </Button>
            </div>
          ) : (
            <span className="grid size-7 place-items-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">QW</span>
          )
        }
      />
    </div>
  )
}
