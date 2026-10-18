"use client"

import * as React from "react"

import { CalendarDaysIcon, HomeIcon, InboxIcon, SettingsIcon } from "@/components/icons"
import { AppShell, AppShellHeader, AppShellMain, AppShellSidebar } from "@/registry/base-nova/ui/app-shell"
import { SidebarContent, SidebarFooter, SidebarGroup, SidebarItem, SidebarMenu } from "@/registry/base-nova/ui/animated-sidebar"
import { IconChip } from "@/registry/base-nova/ui/icon-chip"

const NAV = [
  { id: "home", label: "Home", icon: HomeIcon },
  { id: "inbox", label: "Inbox", icon: InboxIcon },
  { id: "calendar", label: "Calendar", icon: CalendarDaysIcon },
]

export default function AppShellSidebarLayout() {
  const [active, setActive] = React.useState("inbox")
  return (
    <AppShell variant="window" layout="sidebar" shortcut={null} className="h-80 w-full max-w-xl">
      <AppShellHeader>
        <IconChip tone="solid" size="sm">
          <span className="text-ui-2xs font-semibold">N</span>
        </IconChip>
        <span className="text-ui font-semibold">Northwind</span>
      </AppShellHeader>
      <AppShellSidebar aria-label="Workspace">
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              {NAV.map((n) => (
                <SidebarItem key={n.id} icon={<n.icon />} label={n.label} isActive={active === n.id} onClick={() => setActive(n.id)} />
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarItem icon={<SettingsIcon />} label="Settings" isActive={active === "settings"} onClick={() => setActive("settings")} />
          </SidebarMenu>
        </SidebarFooter>
      </AppShellSidebar>
      <AppShellMain>
        <div className="grid grid-cols-2 gap-3 p-6">
          <div className="h-20 rounded-xl bg-secondary" />
          <div className="h-20 rounded-xl bg-secondary" />
          <div className="col-span-2 h-32 rounded-xl bg-secondary" />
        </div>
      </AppShellMain>
    </AppShell>
  )
}
