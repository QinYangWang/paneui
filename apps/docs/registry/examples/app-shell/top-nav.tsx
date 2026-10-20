"use client"

import * as React from "react"

import { AppShell, AppShellHeader, AppShellMain } from "@paneui/ui/components/app-shell"
import { IconChip } from "@paneui/ui/components/icon-chip"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@paneui/ui/components/navigation-menu"

const TABS = ["Overview", "Projects", "Reports"]

export default function AppShellTopNav() {
  const [active, setActive] = React.useState("Overview")
  return (
    <AppShell variant="window" shortcut={null} className="h-80 w-full max-w-xl">
      <AppShellHeader
        leading={
          <IconChip tone="solid" size="sm">
            <span className="text-ui-2xs font-semibold">N</span>
          </IconChip>
        }
      >
        <span className="text-ui font-semibold">Northwind</span>
        <NavigationMenu className="ms-4">
          <NavigationMenuList>
            {TABS.map((t) => (
              <NavigationMenuItem key={t}>
                <NavigationMenuLink
                  variant="tab"
                  active={active === t}
                  aria-current={active === t ? "page" : undefined}
                  href={`#${t.toLowerCase()}`}
                  onClick={(e) => {
                    e.preventDefault()
                    setActive(t)
                  }}
                >
                  {t}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </AppShellHeader>
      <AppShellMain>
        <div className="grid grid-cols-3 gap-3 p-6">
          <div className="h-20 rounded-xl bg-secondary" />
          <div className="h-20 rounded-xl bg-secondary" />
          <div className="h-20 rounded-xl bg-secondary" />
          <div className="col-span-3 h-32 rounded-xl bg-secondary" />
        </div>
      </AppShellMain>
    </AppShell>
  )
}
