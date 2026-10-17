"use client"

import { DownloadIcon, UndoIcon, UploadIcon } from "@/components/icons"
import { Toolbar, ToolbarButton, ToolbarGroup, ToolbarSeparator } from "@/registry/base-nova/ui/toolbar"

export default function ToolbarDocumentBar() {
  return (
    <div className="frame-xl frame-inset-2 w-full max-w-lg bg-card px-2 shadow-raised">
      <Toolbar aria-label="Document" className="h-11">
        <ToolbarGroup>
          <ToolbarButton aria-label="Undo">
            <UndoIcon className="rtl:-scale-x-100" />
          </ToolbarButton>
          <ToolbarButton aria-label="Redo" disabled>
            <UndoIcon className="-scale-x-100 rtl:scale-x-100" />
          </ToolbarButton>
        </ToolbarGroup>
        <span className="ml-auto px-2 text-xs text-muted-foreground tabular-nums">128 words</span>
        <ToolbarSeparator />
        <ToolbarButton size="label">
          <UploadIcon />
          Import
        </ToolbarButton>
        <ToolbarButton size="label">
          <DownloadIcon />
          Export
        </ToolbarButton>
      </Toolbar>
    </div>
  )
}
