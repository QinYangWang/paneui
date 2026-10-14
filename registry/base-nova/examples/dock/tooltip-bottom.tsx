"use client"

import * as React from "react"

import { CalendarDaysIcon, HomeIcon, InboxIcon, NavigationIcon } from "@/components/icons"
import { Dock, DockItem } from "@/registry/base-nova/ui/dock"

const apps = [
  { id: "home", label: "Home", icon: HomeIcon },
  { id: "maps", label: "Maps", icon: NavigationIcon },
  { id: "inbox", label: "Inbox", icon: InboxIcon },
  { id: "calendar", label: "Calendar", icon: CalendarDaysIcon },
]

export default function DockTooltipBottom() {
  const [active, setActive] = React.useState("maps")

  return (
    <div className="flex h-40 items-start justify-center">
      <Dock tooltipSide="bottom" aria-label="Top dock">
        {apps.map(({ id, label, icon: Icon }) => (
          <DockItem key={id} label={label} active={active === id} onClick={() => setActive(id)}>
            <Icon />
          </DockItem>
        ))}
      </Dock>
    </div>
  )
}
