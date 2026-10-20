# Expandable Action Bar

> Icon toolbar that reveals labels when the user reaches for it.

Page: https://paneui.dev/docs/expandable-action-bar/

## Installation

```bash
npx shadcn@latest add @paneui/expandable-action-bar
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/expandable-action-bar.json
```

Packages: `@base-ui/react`, `motion`.

Registry items it builds on: `@paneui/theme`.

## Usage

```tsx
"use client"

import * as React from "react"

import { BookmarkIcon, ChatIcon, HeartIcon, LinkIcon, SendIcon } from "@/components/icons"
import {
  ExpandableActionBar,
  type ExpandableActionBarItem,
} from "@/registry/base-nova/blocks/expandable-action-bar/expandable-action-bar"

const items: ExpandableActionBarItem[] = [
  { id: "like", label: "Like", icon: <HeartIcon />, shortcut: "L" },
  { id: "reply", label: "Reply", icon: <ChatIcon />, badge: 3, shortcut: "R" },
  { id: "save", label: "Save", icon: <BookmarkIcon /> },
  { id: "share", label: "Share", icon: <SendIcon className="rtl:-scale-x-100" /> },
  { id: "copy", label: "Copy link", icon: <LinkIcon /> },
]

export default function ExpandableActionBarDemo() {
  const [active, setActive] = React.useState("reply")
  return (
    <div className="flex flex-col items-center gap-4">
      <ExpandableActionBar
        aria-label="Post actions"
        items={items}
        activeId={active}
        onAction={(item) => setActive(item.id)}
      />
      <p className="text-xs text-muted-foreground">Hover or tab into the bar to reveal labels.</p>
    </div>
  )
}
```
