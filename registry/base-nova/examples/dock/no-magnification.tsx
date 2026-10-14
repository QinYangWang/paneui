"use client"

import * as React from "react"

import { ChatIcon, FolderIcon, HomeIcon, InboxIcon } from "@/components/icons"
import { Dock, DockItem } from "@/registry/base-nova/ui/dock"

const apps = [
  { id: "home", label: "Home", icon: HomeIcon },
  { id: "inbox", label: "Inbox", icon: InboxIcon },
  { id: "messages", label: "Messages", icon: ChatIcon },
  { id: "files", label: "Files", icon: FolderIcon },
]

export default function DockNoMagnification() {
  const [active, setActive] = React.useState("inbox")

  return (
    <div className="flex h-24 items-end justify-center">
      <Dock size={44} magnification={44}>
        {apps.map(({ id, label, icon: Icon }) => (
          <DockItem key={id} label={label} active={active === id} onClick={() => setActive(id)}>
            <Icon />
          </DockItem>
        ))}
      </Dock>
    </div>
  )
}
