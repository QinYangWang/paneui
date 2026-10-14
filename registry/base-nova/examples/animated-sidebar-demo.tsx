"use client"

import * as React from "react"

import {
  BellIcon,
  ChartIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  NavigationIcon,
  SettingsIcon,
  UsersIcon,
} from "@/components/icons"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarHideCollapsed,
  SidebarInset,
  SidebarItem,
  SidebarMenu,
  SidebarProvider,
  SidebarSub,
  SidebarSubItem,
  SidebarTrigger,
} from "@/registry/base-nova/ui/animated-sidebar"

const projects = ["Atlas", "Beacon", "Comet"]
const titles: Record<string, string> = { home: "Home", inbox: "Inbox", explore: "Explore", insights: "Insights", team: "Team", settings: "Settings" }

export default function AnimatedSidebarDemo() {
  const [active, setActive] = React.useState("project:Beacon")
  const title = active.startsWith("project:") ? active.slice(8) : titles[active]

  return (
    <SidebarProvider className="h-104 w-full max-w-2xl gap-3">
      <Sidebar>
        <SidebarHeader>
          <div className="flex h-9 items-center gap-2.5 px-2">
            {/* Workspace avatar: 28px initials tile, centred on the 60px rail like the item icons. */}
            <span
              aria-hidden
              className="grid size-7 shrink-0 place-items-center rounded-lg bg-primary text-ui-sm font-semibold text-primary-foreground shadow-primary select-none"
            >
              N
            </span>
            <SidebarHideCollapsed className="flex min-w-0 flex-col leading-tight">
              <span className="truncate text-sm font-semibold">Northwind</span>
              <span className="truncate text-xs text-muted-foreground">Pro workspace</span>
            </SidebarHideCollapsed>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              <SidebarItem icon={<HomeIcon />} label="Home" isActive={active === "home"} onClick={() => setActive("home")} />
              <SidebarItem icon={<InboxIcon />} label="Inbox" badge={8} isActive={active === "inbox"} onClick={() => setActive("inbox")} />
              <SidebarItem icon={<NavigationIcon />} label="Explore" isActive={active === "explore"} onClick={() => setActive("explore")} />
            </SidebarMenu>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Workspace</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarItem icon={<FolderIcon />} label="Projects" defaultOpen>
                <SidebarSub>
                  {projects.map((p) => (
                    <SidebarSubItem key={p} isActive={active === `project:${p}`} onClick={() => setActive(`project:${p}`)}>
                      {p}
                    </SidebarSubItem>
                  ))}
                </SidebarSub>
              </SidebarItem>
              <SidebarItem icon={<ChartIcon />} label="Insights" isActive={active === "insights"} onClick={() => setActive("insights")} />
              <SidebarItem icon={<UsersIcon />} label="Team" isActive={active === "team"} onClick={() => setActive("team")} />
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarItem icon={<SettingsIcon />} label="Settings" isActive={active === "settings"} onClick={() => setActive("settings")} />
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="gap-3 rounded-2xl bg-muted/50 p-3 shadow-well">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <span className="text-sm font-medium">{title}</span>
          <span className="ml-auto text-xs text-muted-foreground">⌘/Ctrl+B to toggle</span>
          <BellIcon className="size-4 text-muted-foreground" />
        </div>
        <div className="grid flex-1 grid-cols-2 gap-3">
          <div className="rounded-xl bg-card shadow-raised" />
          <div className="rounded-xl bg-card shadow-raised" />
          <div className="col-span-2 rounded-xl bg-card shadow-raised" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
