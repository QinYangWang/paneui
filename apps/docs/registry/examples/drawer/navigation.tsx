"use client"

import * as React from "react"

import { CalendarDaysIcon, FolderIcon, HomeIcon, InboxIcon, MenuIcon, SettingsIcon } from "@paneui/ui/icons"
import { Button } from "@paneui/ui/components/button"
import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@paneui/ui/components/drawer"

const links = [
  { label: "Home", icon: HomeIcon },
  { label: "Inbox", icon: InboxIcon },
  { label: "Calendar", icon: CalendarDaysIcon },
  { label: "Projects", icon: FolderIcon },
  { label: "Settings", icon: SettingsIcon },
]

export default function DrawerNavigation() {
  const [current, setCurrent] = React.useState("Home")

  return (
    <Drawer side="left">
      <DrawerTrigger render={<Button variant="secondary" size="icon" aria-label="Open menu" />}>
        <MenuIcon />
      </DrawerTrigger>
      <DrawerContent className="w-72">
        <DrawerHeader>
          <DrawerTitle>Workspace</DrawerTitle>
        </DrawerHeader>
        <DrawerBody>
          <nav className="flex flex-col gap-0.5">
            {links.map(({ label, icon: Icon }) => (
              <DrawerClose
                key={label}
                onClick={() => setCurrent(label)}
                aria-current={current === label ? "page" : undefined}
                render={<Button variant={current === label ? "secondary" : "ghost"} className="w-full justify-start" />}
              >
                <Icon data-icon="inline-start" />
                {label}
              </DrawerClose>
            ))}
          </nav>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}
