"use client"

import * as React from "react"

import { Label } from "@paneui/ui/components/label"
import { Switch } from "@paneui/ui/components/switch"
import {
  SortableStack,
  SortableStackContent,
  SortableStackHandle,
  SortableStackItem,
} from "@paneui/ui/components/sortable-stack"

const columns = [
  { id: "name", label: "Name" },
  { id: "status", label: "Status" },
  { id: "owner", label: "Owner" },
  { id: "updated", label: "Last updated" },
]

export default function SortableStackDisabled() {
  const [locked, setLocked] = React.useState(true)

  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <Label className="justify-between">
        Lock column order
        <Switch checked={locked} onCheckedChange={setLocked} />
      </Label>
      <SortableStack label="Table columns" defaultItems={columns} getItemLabel={(c) => c.label} disabled={locked}>
        {(items) =>
          items.map((c) => (
            <SortableStackItem key={c.id} id={c.id}>
              <SortableStackHandle />
              <SortableStackContent>
                <span className="font-medium">{c.label}</span>
              </SortableStackContent>
            </SortableStackItem>
          ))
        }
      </SortableStack>
    </div>
  )
}
