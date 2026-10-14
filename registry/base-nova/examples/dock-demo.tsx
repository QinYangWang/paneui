"use client"

import * as React from "react"

import { CalendarDaysIcon, ChatIcon, FolderIcon, HomeIcon, InboxIcon, NavigationIcon, SettingsIcon, TrashIcon } from "@/components/icons"
import { Dock, DockGroup, DockItem, DockSeparator } from "@/registry/base-nova/ui/dock"

const apps = [
  { id: "home", label: "Home", icon: HomeIcon },
  { id: "maps", label: "Maps", icon: NavigationIcon },
  { id: "mail", label: "Mail", icon: InboxIcon },
  { id: "calendar", label: "Calendar", icon: CalendarDaysIcon },
  { id: "messages", label: "Messages", icon: ChatIcon },
]

export default function DockDemo() {
  const [active, setActive] = React.useState("home")

  return (
    <div className="flex h-40 items-end justify-center">
      <Dock>
        <DockGroup>
          {apps.map(({ id, label, icon: Icon }) => (
            <DockItem key={id} label={label} active={active === id} onClick={() => setActive(id)}>
              <Icon />
            </DockItem>
          ))}
        </DockGroup>
        <DockSeparator />
        <DockGroup>
          <DockItem label="Files" active={active === "files"} onClick={() => setActive("files")}>
            <FolderIcon />
          </DockItem>
          <DockItem label="Settings" active={active === "settings"} onClick={() => setActive("settings")}>
            <SettingsIcon />
          </DockItem>
          <DockItem label="Trash">
            <TrashIcon />
          </DockItem>
        </DockGroup>
      </Dock>
    </div>
  )
}
