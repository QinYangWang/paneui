"use client"

import * as React from "react"

import { CopyIcon, EditIcon, FolderIcon, LinkIcon, PinIcon, TrashIcon } from "@/components/icons"
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuGroup,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/registry/base-nova/ui/context-menu"

export default function ContextMenuDemo() {
  const [pinned, setPinned] = React.useState(false)
  const [sort, setSort] = React.useState("recent")
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-40 w-full max-w-sm flex-col items-center justify-center gap-1 rounded-2xl bg-muted/50 text-sm text-muted-foreground shadow-well">
        <FolderIcon className="size-5" />
        Right-click (or long-press) the trip folder
      </ContextMenuTrigger>
      <ContextMenuContent className="w-56">
        <ContextMenuGroup>
          <ContextMenuLabel>Lisbon, May 2027</ContextMenuLabel>
          <ContextMenuItem>
            <EditIcon />
            Rename
            <ContextMenuShortcut>F2</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            <CopyIcon />
            Duplicate
            <ContextMenuShortcut>⌘D</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            <LinkIcon />
            Copy share link
          </ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuCheckboxItem checked={pinned} onCheckedChange={setPinned}>
          Pin to Home
        </ContextMenuCheckboxItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger>
            <PinIcon />
            Sort files by
          </ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuRadioGroup value={sort} onValueChange={setSort}>
              <ContextMenuRadioItem value="recent">Recently edited</ContextMenuRadioItem>
              <ContextMenuRadioItem value="name">Name</ContextMenuRadioItem>
              <ContextMenuRadioItem value="date">Trip date</ContextMenuRadioItem>
            </ContextMenuRadioGroup>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuItem variant="destructive">
          <TrashIcon />
          Move to trash
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}
