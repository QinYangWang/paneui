"use client"

import * as React from "react"

import { ChatIcon, PanelRightIcon, TableIcon, TypeIcon } from "@paneui/ui/icons"
import { ToggleGroup, ToggleGroupItem, ToggleGroupItemIcon } from "@paneui/ui/components/toggle-group"

const KINDS = [
  { value: "forms", label: "Forms", icon: <TypeIcon /> },
  { value: "data", label: "Data", icon: <TableIcon /> },
  { value: "agent", label: "Agent", icon: <ChatIcon /> },
  { value: "overlays", label: "Overlays", icon: <PanelRightIcon /> },
]

export default function ToggleGroupTile() {
  const [value, setValue] = React.useState(["agent"])
  return (
    <div className="flex flex-col items-center gap-4">
      <ToggleGroup variant="tile" value={value} onValueChange={(next) => next.length && setValue(next)} aria-label="Kind of UI" className="gap-2">
        {KINDS.map((k) => (
          <ToggleGroupItem key={k.value} value={k.value} className="w-20">
            <ToggleGroupItemIcon>{k.icon}</ToggleGroupItemIcon>
            {k.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      <p className="text-ui text-muted-foreground">Showing {KINDS.find((k) => k.value === value[0])?.label}</p>
    </div>
  )
}
