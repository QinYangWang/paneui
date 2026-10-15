"use client"

import * as React from "react"

import { BellIcon, FolderIcon, HomeIcon, SearchIcon } from "@/components/icons"
import { AppShell, AppShellHeader, AppShellMain, AppShellSidebar } from "@/registry/base-nova/ui/app-shell"
import { SidebarContent, SidebarGroup, SidebarItem, SidebarMenu } from "@/registry/base-nova/ui/animated-sidebar"
import { Button } from "@/registry/base-nova/ui/button"

const TABS = ["Overview", "Activity", "Settings"]

export default function AppShellHeaderActions() {
  const [open, setOpen] = React.useState(true)
  const [tab, setTab] = React.useState("Overview")

  return (
    <AppShell variant="window" open={open} onOpenChange={setOpen} shortcut={null} className="h-80 w-full max-w-2xl">
      <AppShellHeader>
        <span className="text-ui font-semibold">Atlas</span>
        <nav aria-label="Project" className="ml-2 flex items-center gap-0.5 max-sm:hidden">
          {TABS.map((t) => (
            <Button key={t} variant={tab === t ? "secondary" : "ghost"} size="sm" aria-current={tab === t ? "page" : undefined} onClick={() => setTab(t)}>
              {t}
            </Button>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-1.5">
          <Button variant="ghost" size="icon-sm" aria-label="Search">
            <SearchIcon />
          </Button>
          <Button variant="ghost" size="icon-sm" aria-label="Notifications">
            <BellIcon />
          </Button>
        </div>
      </AppShellHeader>
      <AppShellSidebar aria-label="Projects">
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              <SidebarItem icon={<HomeIcon />} label="Home" />
              <SidebarItem icon={<FolderIcon />} label="Atlas" isActive />
              <SidebarItem icon={<FolderIcon />} label="Beacon" />
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </AppShellSidebar>
      <AppShellMain>
        <div className="flex flex-col items-start gap-3 p-6">
          <h2 className="text-lg font-semibold">{tab}</h2>
          <Button variant="secondary" size="sm" onClick={() => setOpen(!open)}>
            {open ? "Collapse to rail" : "Expand sidebar"}
          </Button>
        </div>
      </AppShellMain>
    </AppShell>
  )
}
