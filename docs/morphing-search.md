# Morphing Search

> Search field that opens into a list of results.

Page: https://paneui.dev/docs/morphing-search/

## Installation

```bash
npx shadcn@latest add @paneui/morphing-search
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/morphing-search.json
```

Packages: `motion`.

Registry items it builds on: `@paneui/theme`, `@paneui/icons`.

## Usage

```tsx
"use client"

import * as React from "react"

import { CalendarIcon, FileIcon, FolderIcon, SettingsIcon, UserIcon, UsersIcon } from "@/components/icons"
import { MorphingSearch, type MorphingSearchItem } from "@/registry/base-nova/blocks/morphing-search/morphing-search"

const items: MorphingSearchItem[] = [
  { id: "q3", title: "Q3 roadmap", description: "Updated 2h ago", group: "Documents", icon: <FileIcon /> },
  { id: "pricing", title: "Pricing page copy", description: "Draft", group: "Documents", icon: <FileIcon /> },
  { id: "brand", title: "Brand assets", description: "48 files", group: "Folders", icon: <FolderIcon /> },
  { id: "invoices", title: "Invoices 2026", description: "12 files", group: "Folders", icon: <FolderIcon /> },
  { id: "mei", title: "Mei Lin", description: "Design lead", group: "People", keywords: ["design"], icon: <UserIcon /> },
  { id: "growth", title: "Growth team", description: "6 members", group: "People", icon: <UsersIcon /> },
  { id: "review", title: "Design review", description: "Today 14:00", group: "Events", keywords: ["meeting"], icon: <CalendarIcon /> },
  { id: "settings", title: "Workspace settings", group: "Actions", keywords: ["preferences"], icon: <SettingsIcon /> },
]

export default function MorphingSearchDemo() {
  const [picked, setPicked] = React.useState<string | null>(null)
  return (
    <div className="flex min-h-96 w-full flex-col items-center gap-6 pt-2">
      <div className="flex items-center gap-3">
        <MorphingSearch items={items} placeholder="Search workspace…" onSelect={(item) => setPicked(item.title)} />
        <MorphingSearch items={items} iconOnly placeholder="Search…" align="end" onSelect={(item) => setPicked(item.title)} />
      </div>
      <p className="text-sm text-muted-foreground">{picked ? `Opened “${picked}”` : "Pick something with ↑ ↓ and Enter."}</p>
    </div>
  )
}
```
