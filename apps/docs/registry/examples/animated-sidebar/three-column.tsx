"use client"

import * as React from "react"

import { siClaude } from "simple-icons"

import { FolderIcon, GitBranchIcon, HistoryIcon, InboxIcon, SettingsIcon } from "@paneui/ui/icons"
import { markOpenai } from "@paneui/ui/lib/brand-marks"
import { BrandIcon } from "@paneui/ui/components/brand-icon"
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
  SidebarRailAvatar,
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
      <SidebarProvider shortcut={null} className="h-96 w-full max-w-2xl gap-3">
        <Sidebar
          aria-label="App"
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
                <SidebarRailAvatar label="Codex" hint="connected" status="online">
                  <BrandIcon icon={markOpenai} />
                </SidebarRailAvatar>
                <SidebarRailAvatar label="Claude Code" hint="not connected">
                  <BrandIcon icon={siClaude} />
                </SidebarRailAvatar>
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
        <SidebarInset className="items-start gap-2 rounded-2xl bg-muted/50 p-3 shadow-well">
          <SidebarTrigger />
          <p className="text-sm text-muted-foreground">{current.rows[row]}</p>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  )
}
