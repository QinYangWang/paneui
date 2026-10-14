"use client"

import * as React from "react"

import { CalendarDaysIcon, HomeIcon, InboxIcon, SettingsIcon } from "@/components/icons"
import { Dock, DockItem } from "@/registry/base-nova/ui/dock"

const apps = [
  { id: "home", label: "Home", icon: HomeIcon },
  { id: "inbox", label: "Inbox", icon: InboxIcon },
  { id: "calendar", label: "Calendar", icon: CalendarDaysIcon },
  { id: "settings", label: "Settings", icon: SettingsIcon },
]

export default function DockSizes() {
  const [active, setActive] = React.useState("home")

  return (
    <div className="flex h-32 items-end justify-center">
      <Dock size={36} magnification={52} distance={100}>
        {apps.map(({ id, label, icon: Icon }) => (
          <DockItem key={id} label={label} active={active === id} onClick={() => setActive(id)}>
            <Icon />
          </DockItem>
        ))}
      </Dock>
    </div>
  )
}
