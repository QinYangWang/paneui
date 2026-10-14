"use client"

import * as React from "react"

import {
  BotIcon,
  ChartIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  KeyIcon,
  ServerIcon,
  SettingsIcon,
  ShieldIcon,
  TagIcon,
  UsersIcon,
} from "@/components/icons"
import {
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarHideCollapsed,
  SidebarItem,
  SidebarMenu,
  SidebarSub,
  SidebarSubItem,
} from "@/registry/base-nova/ui/animated-sidebar"
import { IconChip } from "@/registry/base-nova/ui/icon-chip"

export const NAV_TITLES: Record<string, string> = {
  overview: "Overview",
  inbox: "Inbox",
  usage: "Usage",
  "agents:runs": "Runs",
  "agents:schedules": "Schedules",
  "agents:sandboxes": "Sandboxes",
  customers: "Customers",
  billing: "Billing",
  projects: "Projects",
  keys: "API keys",
  security: "Security",
  settings: "Settings",
}

/** Brand row + navigation, shared by the desktop sidebar and the mobile drawer. */
export function AppNav({ active, onNavigate }: { active: string; onNavigate: (id: string) => void }) {
  const item = (id: string, icon: React.ReactNode, extra?: { badge?: React.ReactNode }) => (
    <SidebarItem icon={icon} label={NAV_TITLES[id]} isActive={active === id} onClick={() => onNavigate(id)} {...extra} />
  )
  return (
    <>
      <SidebarHeader>
        <div className="flex h-9 items-center gap-2.5 px-2.5">
          <IconChip size="sm" tone="solid">
            <BotIcon />
          </IconChip>
          <SidebarHideCollapsed className="flex min-w-0 flex-col leading-tight">
            <span className="truncate text-sm font-semibold">Tessel Console</span>
            <span className="truncate text-xs text-muted-foreground">acme-prod</span>
          </SidebarHideCollapsed>
        </div>
      </SidebarHeader>
      <SidebarContent className="scrollbar-hover">
        <SidebarGroup>
          <SidebarMenu>
            {item("overview", <HomeIcon />)}
            {item("inbox", <InboxIcon />, { badge: 4 })}
            {item("usage", <ChartIcon />)}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarItem icon={<ServerIcon />} label="Agents" defaultOpen>
              <SidebarSub>
                {(["agents:runs", "agents:schedules", "agents:sandboxes"] as const).map((id) => (
                  <SidebarSubItem key={id} isActive={active === id} onClick={() => onNavigate(id)}>
                    {NAV_TITLES[id]}
                  </SidebarSubItem>
                ))}
              </SidebarSub>
            </SidebarItem>
            {item("projects", <FolderIcon />)}
            {item("customers", <UsersIcon />)}
            {item("billing", <TagIcon />)}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Admin</SidebarGroupLabel>
          <SidebarMenu>
            {item("keys", <KeyIcon />)}
            {item("security", <ShieldIcon />)}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>{item("settings", <SettingsIcon />)}</SidebarMenu>
      </SidebarFooter>
    </>
  )
}
