"use client"

import * as React from "react"

import { BellIcon, CalendarIcon, FileIcon, FolderIcon, GridIcon, LinkIcon } from "@/components/icons"
import { BloomMenu, type BloomMenuItem } from "@/registry/base-nova/blocks/bloom-menu/bloom-menu"

const items: BloomMenuItem[] = [
  { id: "doc", label: "Doc", icon: <FileIcon /> },
  { id: "board", label: "Board", icon: <GridIcon /> },
  { id: "event", label: "Event", icon: <CalendarIcon /> },
  { id: "folder", label: "Folder", icon: <FolderIcon /> },
  { id: "reminder", label: "Reminder", icon: <BellIcon /> },
  { id: "link", label: "Link", icon: <LinkIcon /> },
]

export default function BloomMenuDemo() {
  const [last, setLast] = React.useState<string | null>(null)
  return (
    <div className="flex h-72 w-full max-w-sm flex-col items-center justify-center gap-4">
      <BloomMenu items={items} onSelect={(item) => setLast(item.label)} />
      <p className="h-5 text-xs text-muted-foreground" aria-live="polite">
        {last ? `Created a new ${last.toLowerCase()}` : "Pick something to create"}
      </p>
    </div>
  )
}
