"use client"

import * as React from "react"

import {
  CalendarDaysFilledIcon,
  CalendarDaysIcon,
  ChatFilledIcon,
  ChatIcon,
  HomeFilledIcon,
  HomeIcon,
  SettingsFilledIcon,
  SettingsIcon,
} from "@paneui/ui/icons"
import { TabBar, TabBarItem } from "@paneui/ui/components/tab-bar"

const TABS = [
  { id: "home", label: "Home", icon: <HomeIcon />, activeIcon: <HomeFilledIcon /> },
  { id: "chats", label: "Chats", icon: <ChatIcon />, activeIcon: <ChatFilledIcon />, badge: 3 },
  { id: "schedule", label: "Schedule", icon: <CalendarDaysIcon />, activeIcon: <CalendarDaysFilledIcon /> },
  { id: "settings", label: "Settings", icon: <SettingsIcon />, activeIcon: <SettingsFilledIcon /> },
]

export default function TabBarDemo() {
  const [tab, setTab] = React.useState("home")
  return (
    <div className="flex h-96 w-80 flex-col overflow-hidden rounded-3xl bg-shell shadow-raised">
      <div className="flex flex-1 items-center justify-center text-ui text-muted-foreground">{TABS.find((t) => t.id === tab)?.label}</div>
      <TabBar>
        {TABS.map((t) => (
          <TabBarItem key={t.id} icon={t.icon} activeIcon={t.activeIcon} label={t.label} badge={t.badge} active={tab === t.id} onClick={() => setTab(t.id)} />
        ))}
      </TabBar>
    </div>
  )
}
