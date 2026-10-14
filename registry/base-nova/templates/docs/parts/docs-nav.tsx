"use client"

import { BoltIcon, HomeIcon, KeyIcon, ServerIcon, SettingsIcon, ShieldIcon, TerminalSquareIcon } from "@/components/icons"
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarItem,
  SidebarMenu,
  SidebarSub,
  SidebarSubItem,
} from "@/registry/base-nova/ui/animated-sidebar"

const sections = [
  {
    label: "Start here",
    items: [{ title: "Getting started", icon: <HomeIcon />, pages: ["Introduction", "Quickstart", "Install the GitHub app"] }],
  },
  {
    label: "Guides",
    items: [
      { title: "Safety", icon: <ShieldIcon />, pages: ["Approval policies", "Secrets", "Audit log"] },
      { title: "Sandboxes", icon: <ServerIcon />, pages: ["Images", "Network rules", "Caching"] },
      { title: "CI auto-fix", icon: <BoltIcon />, pages: ["GitHub Actions", "Buildkite"] },
    ],
  },
  {
    label: "Reference",
    items: [
      { title: "CLI", icon: <TerminalSquareIcon />, pages: ["tessel run", "tessel approve"] },
      { title: "Configuration", icon: <SettingsIcon />, pages: ["tessel.toml", "Environment"] },
      { title: "API", icon: <KeyIcon />, pages: ["Authentication", "Sessions", "Webhooks"] },
    ],
  },
]

export const CURRENT_PAGE = "Approval policies"

export function DocsNav() {
  return (
    <SidebarContent className="scrollbar-hover py-3">
      {sections.map((s) => (
        <SidebarGroup key={s.label}>
          <SidebarGroupLabel>{s.label}</SidebarGroupLabel>
          <SidebarMenu>
            {s.items.map((item) => (
              <SidebarItem key={item.title} icon={item.icon} label={item.title} defaultOpen={item.pages.includes(CURRENT_PAGE) || item.title === "Getting started"}>
                <SidebarSub>
                  {item.pages.map((p) => (
                    <SidebarSubItem key={p} href="#" isActive={p === CURRENT_PAGE}>
                      {p}
                    </SidebarSubItem>
                  ))}
                </SidebarSub>
              </SidebarItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </SidebarContent>
  )
}
