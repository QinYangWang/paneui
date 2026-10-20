"use client"

import * as React from "react"

import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuLabel,
  ContextMenuTrigger,
} from "@paneui/ui/components/context-menu"

export default function ContextMenuCheckboxes() {
  const [columns, setColumns] = React.useState({ owner: true, size: true, modified: false })

  const toggle = (key: keyof typeof columns) => (checked: boolean) =>
    setColumns((prev) => ({ ...prev, [key]: checked }))

  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-32 w-full max-w-xs items-center justify-center rounded-2xl bg-muted/50 text-sm text-muted-foreground shadow-well">
        Right-click the table header
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuGroup>
          <ContextMenuLabel inset>Columns</ContextMenuLabel>
          <ContextMenuCheckboxItem checked={columns.owner} onCheckedChange={toggle("owner")}>
            Owner
          </ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem checked={columns.size} onCheckedChange={toggle("size")}>
            Size
          </ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem checked={columns.modified} onCheckedChange={toggle("modified")}>
            Last modified
          </ContextMenuCheckboxItem>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  )
}
