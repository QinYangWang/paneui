"use client"

import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon } from "@paneui/ui/icons"
import { Toolbar, ToolbarToggle } from "@paneui/ui/components/toolbar"

export default function ToolbarInset() {
  return (
    <Toolbar variant="inset" aria-label="Alignment">
      <ToolbarToggle aria-label="Align left" defaultPressed>
        <AlignLeftIcon />
      </ToolbarToggle>
      <ToolbarToggle aria-label="Align centre">
        <AlignCenterIcon />
      </ToolbarToggle>
      <ToolbarToggle aria-label="Align right">
        <AlignRightIcon />
      </ToolbarToggle>
    </Toolbar>
  )
}
