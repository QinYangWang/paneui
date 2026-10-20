"use client"

import * as React from "react"

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuTrigger,
} from "@paneui/ui/components/context-menu"

export default function ContextMenuRadioGroupExample() {
  const [density, setDensity] = React.useState("comfortable")

  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-32 w-full max-w-xs flex-col items-center justify-center gap-1 rounded-2xl bg-muted/50 text-sm text-muted-foreground shadow-well">
        Right-click the inbox
        <span className="text-xs capitalize">{density}</span>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuGroup>
          <ContextMenuLabel inset>Density</ContextMenuLabel>
          <ContextMenuRadioGroup value={density} onValueChange={setDensity}>
            <ContextMenuRadioItem value="compact">Compact</ContextMenuRadioItem>
            <ContextMenuRadioItem value="comfortable">Comfortable</ContextMenuRadioItem>
            <ContextMenuRadioItem value="spacious">Spacious</ContextMenuRadioItem>
          </ContextMenuRadioGroup>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  )
}
