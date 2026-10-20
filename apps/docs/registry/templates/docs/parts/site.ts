import type * as React from "react"

import { BoltIcon, LightbulbIcon, HomeIcon, KeyIcon, ServerIcon, ShieldIcon, TerminalSquareIcon } from "@paneui/ui/icons"
import type { CommandPaletteItem } from "@paneui/ui/blocks/command-palette/command-palette"

/** Site content shared by every layout: sections (header tabs), their nav groups, search and the pager. */

export type NavPage = { title: string; href: string; badge?: string }
export type NavGroupData = { label: string; pages: NavPage[] }
export type SectionData = {
  id: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  groups: NavGroupData[]
}

const page = (title: string, badge?: string): NavPage => ({ title, href: "#", badge })

export const SECTIONS: SectionData[] = [
  {
    id: "guides",
    title: "Guides",
    description: "Set up Tessel and decide what it may do on its own.",
    icon: LightbulbIcon,
    groups: [
      { label: "Getting started", pages: [page("Introduction"), page("Quickstart"), page("Install the GitHub app")] },
      { label: "Safety", pages: [page("Approval policies"), page("Secrets"), page("Audit log", "New")] },
      { label: "Sandboxes", pages: [page("Images"), page("Network rules"), page("Caching")] },
    ],
  },
  {
    id: "reference",
    title: "Reference",
    description: "Every command, flag and setting in one place.",
    icon: TerminalSquareIcon,
    groups: [
      { label: "CLI", pages: [page("tessel run"), page("tessel approve"), page("tessel logs")] },
      { label: "Configuration", pages: [page("tessel.toml"), page("Environment")] },
    ],
  },
  {
    id: "api",
    title: "API",
    description: "Start sessions and read their results from your own tools.",
    icon: KeyIcon,
    groups: [{ label: "REST API", pages: [page("Authentication"), page("Sessions"), page("Webhooks")] }],
  },
  {
    id: "integrations",
    title: "Integrations",
    description: "Run Tessel from CI and the tools your team already uses.",
    icon: BoltIcon,
    groups: [{ label: "CI", pages: [page("GitHub Actions"), page("Buildkite")] }],
  },
]

export const CURRENT_SECTION = "guides"
export const CURRENT_PAGE = "Approval policies"

export const PAGER = {
  prev: { title: "Install the GitHub app", section: "Getting started" },
  next: { title: "Secrets", section: "Safety" },
}

export const SEARCH_ITEMS: CommandPaletteItem[] = [
  { id: "quickstart", label: "Quickstart", group: "Getting started", icon: HomeIcon },
  { id: "github", label: "Install the GitHub app", group: "Getting started", icon: HomeIcon },
  { id: "approvals", label: "Approval policies", group: "Guides", icon: ShieldIcon, keywords: ["allow", "deny", "risk"] },
  { id: "sandboxes", label: "Sandbox images", group: "Guides", icon: ServerIcon },
  { id: "ci", label: "Auto-fix GitHub Actions", group: "Integrations", icon: BoltIcon },
  { id: "run", label: "tessel run", group: "Reference", icon: TerminalSquareIcon, keywords: ["cli"] },
  { id: "auth", label: "API authentication", group: "API", icon: KeyIcon, keywords: ["token"] },
]
