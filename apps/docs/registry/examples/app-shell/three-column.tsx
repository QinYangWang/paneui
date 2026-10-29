"use client"

import * as React from "react"

import { CalendarDaysIcon, ChatIcon, InboxIcon, SettingsIcon } from "@paneui/ui/icons"
import { AppShell, AppShellHeader, AppShellMain, AppShellSidebar } from "@paneui/ui/components/app-shell"
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarItem,
  SidebarMenu,
  SidebarRail,
  SidebarRailGroup,
  SidebarRailItem,
  SidebarRailSpacer,
} from "@paneui/ui/components/animated-sidebar"

const SECTIONS = {
  mail: { label: "Mail", icon: <InboxIcon />, rows: ["Inbox", "Sent", "Archive"] },
  chat: { label: "Chat", icon: <ChatIcon />, rows: ["Design", "Engineering", "Random"] },
  calendar: { label: "Calendar", icon: <CalendarDaysIcon />, rows: ["Today", "This week", "Shared"] },
} as const
type Section = keyof typeof SECTIONS

export default function AppShellThreeColumn() {
  const [section, setSection] = React.useState<Section>("mail")
  const current = SECTIONS[section]
  return (
    <AppShell variant="window" shortcut={null} className="h-80 w-full max-w-2xl">
      <AppShellHeader>
        <span className="text-ui font-semibold">{current.label}</span>
      </AppShellHeader>
      <AppShellSidebar
        aria-label={current.label}
        rail={
          <SidebarRail aria-label="Apps">
            <SidebarRailGroup>
              {(Object.keys(SECTIONS) as Section[]).map((id) => (
                <SidebarRailItem key={id} label={SECTIONS[id].label} icon={SECTIONS[id].icon} active={section === id} onClick={() => setSection(id)} />
              ))}
            </SidebarRailGroup>
            <SidebarRailSpacer />
            <SidebarRailItem label="Settings" icon={<SettingsIcon />} />
          </SidebarRail>
        }
      >
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>{current.label}</SidebarGroupLabel>
            <SidebarMenu>
              {current.rows.map((row, i) => (
                <SidebarItem key={row} label={row} isActive={i === 0} />
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </AppShellSidebar>
      <AppShellMain>
        <div className="flex flex-col gap-2 p-6">
          {["Quarterly review", "Design sync notes", "Invoice 0142"].map((t) => (
            <div key={t} className="flex h-10 items-center rounded-lg px-3 text-ui hover:bg-secondary">
              {t}
            </div>
          ))}
        </div>
      </AppShellMain>
    </AppShell>
  )
}
