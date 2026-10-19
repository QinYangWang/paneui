"use client"

import * as React from "react"

import { CalendarDaysIcon, ChartIcon, FolderIcon, HomeIcon, InboxIcon, SearchIcon, SettingsIcon } from "@/components/icons"
import { AppShell, AppShellHeader, AppShellMain, AppShellSidebar } from "@/registry/base-nova/ui/app-shell"
import {
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarItem,
  SidebarMenu,
} from "@/registry/base-nova/ui/animated-sidebar"
import { Button } from "@/registry/base-nova/ui/button"
import { IconChip } from "@/registry/base-nova/ui/icon-chip"

type NavItem = { id: string; label: string; icon: React.ComponentType; badge?: number }

const MAIN: NavItem[] = [
  { id: "home", label: "Home", icon: HomeIcon },
  { id: "inbox", label: "Inbox", icon: InboxIcon, badge: 8 },
  { id: "calendar", label: "Calendar", icon: CalendarDaysIcon },
]
const WORKSPACE: NavItem[] = [
  { id: "projects", label: "Projects", icon: FolderIcon },
  { id: "reports", label: "Reports", icon: ChartIcon },
]
const ALL: NavItem[] = [...MAIN, ...WORKSPACE, { id: "settings", label: "Settings", icon: SettingsIcon }]

export default function AppShellHeaderFirst() {
  const [active, setActive] = React.useState("inbox")
  const item = (i: NavItem) => (
    <SidebarItem
      key={i.id}
      icon={<i.icon />}
      label={i.label}
      badge={i.badge}
      isActive={active === i.id}
      onClick={() => setActive(i.id)}
    />
  )

  return (
    <AppShell variant="window" shortcut={null} className="h-104 w-full max-w-3xl">
      <AppShellHeader>
        <IconChip tone="solid" size="sm">
          <span className="text-ui-2xs font-semibold">N</span>
        </IconChip>
        <span className="text-ui font-semibold">Northwind</span>
        <Button variant="ghost" size="icon-sm" aria-label="Search" className="ml-auto">
          <SearchIcon />
        </Button>
      </AppShellHeader>
      <AppShellSidebar aria-label="Workspace" mobileTitle="Northwind">
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>{MAIN.map(item)}</SidebarMenu>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Workspace</SidebarGroupLabel>
            <SidebarMenu>{WORKSPACE.map(item)}</SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>{item(ALL[ALL.length - 1])}</SidebarMenu>
        </SidebarFooter>
      </AppShellSidebar>
      <AppShellMain>
        <div className="flex flex-col gap-4 p-6">
          <h2 className="text-balance text-lg font-semibold">{ALL.find((i) => i.id === active)?.label}</h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="h-24 rounded-xl bg-secondary" />
            <div className="h-24 rounded-xl bg-secondary" />
            <div className="col-span-2 h-40 rounded-xl bg-secondary" />
          </div>
        </div>
      </AppShellMain>
    </AppShell>
  )
}
