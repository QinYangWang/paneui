"use client"

import * as React from "react"

import { ApertureIcon, AsteriskIcon, FolderIcon, GitBranchIcon, HistoryIcon, HomeIcon, InboxIcon, SettingsIcon } from "@/components/icons"
import { IconRail, IconRailAvatar, IconRailGroup, IconRailItem, IconRailSpacer } from "@/registry/base-nova/ui/icon-rail"
import { TooltipProvider } from "@/registry/base-nova/ui/tooltip"

const ITEMS = [
  { id: "home", label: "Home", icon: <HomeIcon />, shortcut: "⌘1" },
  { id: "inbox", label: "Inbox", icon: <InboxIcon />, shortcut: "⌘2" },
  { id: "branches", label: "Branches", icon: <GitBranchIcon />, shortcut: "⌘3" },
  { id: "history", label: "History", icon: <HistoryIcon />, shortcut: "⌘4" },
  { id: "projects", label: "Projects", icon: <FolderIcon />, shortcut: "⌘5" },
]

export default function IconRailDemo() {
  const [active, setActive] = React.useState("projects")
  return (
    <TooltipProvider>
      <div className="h-96 overflow-hidden rounded-2xl bg-shell shadow-raised">
        <IconRail aria-label="App">
          <IconRailGroup>
            {ITEMS.map((i) => (
              <IconRailItem key={i.id} label={i.label} icon={i.icon} shortcut={i.shortcut} active={active === i.id} onClick={() => setActive(i.id)} />
            ))}
          </IconRailGroup>
          <IconRailSpacer />
          <IconRailGroup>
            <IconRailAvatar label="Codex" hint="connected" status="online">
              <ApertureIcon />
            </IconRailAvatar>
            <IconRailAvatar label="Claude Code" hint="not connected">
              <AsteriskIcon />
            </IconRailAvatar>
            <IconRailItem label="Settings" icon={<SettingsIcon />} shortcut="⌘," />
          </IconRailGroup>
        </IconRail>
      </div>
    </TooltipProvider>
  )
}
