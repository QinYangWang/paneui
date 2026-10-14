"use client"

import * as React from "react"

import { BellIcon, CalendarDaysIcon, ChartIcon, HomeIcon, InboxIcon, SettingsIcon, UsersIcon } from "@/components/icons"
import { BounceSidebar } from "@/registry/base-nova/ui/bounce-sidebar"

const items = [
  { id: "overview", label: "Overview", icon: <HomeIcon /> },
  { id: "inbox", label: "Inbox", icon: <InboxIcon />, meta: 12 },
  { id: "calendar", label: "Calendar", icon: <CalendarDaysIcon /> },
  { id: "team", label: "Team", icon: <UsersIcon /> },
  { id: "reports", label: "Reports", icon: <ChartIcon /> },
  { id: "alerts", label: "Alerts", icon: <BellIcon />, meta: 3 },
  { id: "settings", label: "Settings", icon: <SettingsIcon /> },
]

export default function BounceSidebarDemo() {
  const [value, setValue] = React.useState("inbox")
  return (
    <div className="rounded-2xl bg-card bg-linear-to-b from-white/4 to-transparent p-2 shadow-surface">
      <BounceSidebar items={items} value={value} onValueChange={setValue} label="Workspace" />
    </div>
  )
}
