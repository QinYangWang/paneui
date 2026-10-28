"use client"

import * as React from "react"

import { FolderIcon, GitBranchIcon, HistoryIcon, InboxIcon, SettingsIcon } from "@paneui/ui/icons"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarInset,
  SidebarItem,
  SidebarMenu,
  SidebarProvider,
  SidebarRail,
  SidebarRailGroup,
  SidebarRailItem,
  SidebarRailSpacer,
  SidebarTrigger,
} from "@paneui/ui/components/animated-sidebar"
import { TooltipProvider } from "@paneui/ui/components/tooltip"

const SECTIONS = {
  inbox: { label: "Inbox", icon: <InboxIcon />, rows: ["Unread", "Mentions", "Archive"] },
  projects: { label: "Projects", icon: <FolderIcon />, rows: ["Website", "Mobile app", "Design system"] },
  branches: { label: "Branches", icon: <GitBranchIcon />, rows: ["main", "dev", "feat/rail"] },
  history: { label: "History", icon: <HistoryIcon />, rows: ["Today", "Yesterday", "Last week"] },
} as const
type Section = keyof typeof SECTIONS

export default function AnimatedSidebarThreeColumn() {
  const [section, setSection] = React.useState<Section>("projects")
  const [row, setRow] = React.useState(0)
  const current = SECTIONS[section]
  return (
    <TooltipProvider>
      <div className="h-96 w-full max-w-2xl overflow-hidden frame-3xl bg-background shadow-raised">
      <SidebarProvider shortcut={null} className="h-full">
        <Sidebar
          aria-label="App"
          variant="sidebar"
          rail={
            <SidebarRail aria-label="Sections">
              <SidebarRailGroup>
                {(Object.keys(SECTIONS) as Section[]).map((id, i) => (
                  <SidebarRailItem
                    key={id}
                    label={SECTIONS[id].label}
                    icon={SECTIONS[id].icon}
                    shortcut={`⌘${i + 1}`}
                    badge={id === "inbox" ? 3 : undefined}
                    active={section === id}
                    onClick={() => {
                      setSection(id)
                      setRow(0)
                    }}
                  />
                ))}
              </SidebarRailGroup>
              <SidebarRailSpacer />
              <SidebarRailGroup>
                <SidebarRailItem label="Settings" icon={<SettingsIcon />} shortcut="⌘," />
              </SidebarRailGroup>
            </SidebarRail>
          }
        >
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>{current.label}</SidebarGroupLabel>
              <SidebarMenu>
                {current.rows.map((label, i) => (
                  <SidebarItem key={label} label={label} isActive={row === i} onClick={() => setRow(i)} />
                ))}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <SidebarInset className="items-start gap-2 p-3">
          <SidebarTrigger />
          <p className="text-sm text-muted-foreground">{current.rows[row]}</p>
        </SidebarInset>
      </SidebarProvider>
    </div>
    </TooltipProvider>
  )
}
