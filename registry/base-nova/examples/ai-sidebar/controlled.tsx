"use client"

import * as React from "react"

import { AISidebar, type SidebarResource } from "@/registry/base-nova/ui/ai-sidebar"
import { Button } from "@/registry/base-nova/ui/button"

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

export default function AISidebarControlled() {
  const [open, setOpen] = React.useState(true)
  const [active, setActive] = React.useState<string | null>("lease")
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs text-muted-foreground">Open: {active ?? "nothing"}</span>
        <Button size="sm" variant="secondary" onClick={() => setOpen((o) => !o)}>
          {open ? "Collapse" : "Expand"}
        </Button>
      </div>
      <div className="h-96 overflow-hidden rounded-3xl bg-background shadow-surface">
        <AISidebar
          defaultItems={ITEMS}
          defaultExpandedIds={["home"]}
          open={open}
          onOpenChange={setOpen}
          activeId={active}
          onActiveChange={(id) => setActive(id)}
          searchHotkey={null}
        />
      </div>
    </div>
  )
}
