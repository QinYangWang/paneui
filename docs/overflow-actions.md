# Overflow Actions

> Keeps secondary actions in a menu.

Page: https://paneui.dev/docs/overflow-actions/

## Installation

```bash
npx shadcn@latest add @paneui/overflow-actions
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/overflow-actions.json
```

Packages: `@base-ui/react`, `motion`.

Registry items it builds on: `@paneui/theme`, `@paneui/icons`.

## Usage

```tsx
"use client"

import * as React from "react"

import { CopyIcon, DownloadIcon, EditIcon, FlagIcon, PinIcon, SendIcon, TrashIcon } from "@/components/icons"
import { OverflowActions } from "@/registry/base-nova/blocks/overflow-actions/overflow-actions"

export default function OverflowActionsDemo() {
  const [last, setLast] = React.useState<string | null>(null)
  return (
    <div className="flex flex-col items-center gap-4">
      <OverflowActions
        aria-label="Document actions"
        primaryActions={[
          { id: "edit", label: "Edit", icon: <EditIcon /> },
          { id: "share", label: "Share", icon: <SendIcon className="rtl:-scale-x-100" /> },
        ]}
        overflowActions={[
          { id: "copy", label: "Duplicate", icon: <CopyIcon />, iconOnly: true, ariaLabel: "Duplicate" },
          { id: "pin", label: "Pin", icon: <PinIcon />, iconOnly: true, ariaLabel: "Pin" },
          { id: "export", label: "Export", icon: <DownloadIcon />, iconOnly: true, ariaLabel: "Export" },
          { id: "report", label: "Report", icon: <FlagIcon />, iconOnly: true, ariaLabel: "Report" },
          { id: "delete", label: "Delete", icon: <TrashIcon />, iconOnly: true, ariaLabel: "Delete", destructive: true },
        ]}
        onAction={(item) => setLast(item.ariaLabel ?? String(item.label))}
      />
      <p className="h-4 text-xs text-muted-foreground" aria-live="polite">
        {last ? `${last} clicked` : "Open the rail for more"}
      </p>
    </div>
  )
}
```
