# Thread List Item

> Lists agent or chat threads in a sidebar.

Page: https://paneui.dev/docs/thread-list-item/

## Installation

```bash
npx shadcn@latest add @paneui/thread-list-item
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/thread-list-item.json
```

Registry items it builds on: `@paneui/theme`, `@paneui/icons`, `@paneui/loader`, `@paneui/locale-provider`.

## Usage

```tsx
import { ThreadList, ThreadListGroup, ThreadListItem } from "@/components/ui/thread-list-item"
```

```tsx
<ThreadList>
  <ThreadListGroup label="Recent">
    <ThreadListItem
      title="Fix broken chat dragging"
      icon={<ApertureIcon />}
      repo="workspace"
      pr={{ number: 1526, status: "open" }}
      branch="feat/fix-chat-dragging"
      active
    />
  </ThreadListGroup>
</ThreadList>
```

## Composition

```text
ThreadList
└── ThreadListGroup
    └── ThreadListItem
```

## Examples

### Pull Request States

Use in coding-agent sidebars where threads map to pull requests.

```tsx
import { markOpenai } from "@/lib/brand-marks"
import { BrandIcon } from "@/registry/base-nova/ui/brand-icon"
import { ThreadList, ThreadListItem } from "@/registry/base-nova/ui/thread-list-item"

const STATES = ["open", "draft", "merged", "closed"] as const

export default function ThreadListItemPrStates() {
  return (
    <div className="w-72 frame-3xl frame-p-2 bg-shell">
      <ThreadList className="gap-px">
        {STATES.map((status, i) => (
          <ThreadListItem key={status} title={`Pull request ${status}`} icon={<BrandIcon icon={markOpenai} />} repo="acme" pr={{ number: 400 + i, status }} branch={`feat/${status}`} />
        ))}
      </ThreadList>
    </div>
  )
}
```

### Description and Actions

Use for chat lists with a subtitle, a time and a row menu.

```tsx
"use client"

import * as React from "react"

import { ChatIcon, FolderIcon, MoreHorizontalIcon } from "@/components/icons"
import { Button } from "@/registry/base-nova/ui/button"
import { Menu, MenuContent, MenuItem, MenuTrigger } from "@/registry/base-nova/ui/menu"
import { ThreadList, ThreadListGroup, ThreadListItem } from "@/registry/base-nova/ui/thread-list-item"

const THREADS = [
  { id: "1", title: "Direct messages", description: "Every platform's private chats", meta: "2m", icon: <ChatIcon /> },
  { id: "2", title: "Launch plan", description: "Ship the beta to the first hundred users", meta: "3h", icon: <FolderIcon /> },
  { id: "3", title: "Weekly review", description: "Notes from Friday", meta: "Mon", icon: <FolderIcon /> },
]

export default function ThreadListItemActions() {
  const [active, setActive] = React.useState("1")
  return (
    <div className="w-72 frame-3xl frame-p-2 bg-shell">
      <ThreadList>
        <ThreadListGroup label="Chats">
          {THREADS.map((t) => (
            <ThreadListItem
              key={t.id}
              data-thread={t.id}
              title={t.title}
              description={t.description}
              meta={t.meta}
              icon={t.icon}
              active={active === t.id}
              onClick={() => setActive(t.id)}
              actions={
                <Menu>
                  <MenuTrigger render={<Button variant="ghost" size="icon-xs" aria-label={`More for ${t.title}`} />}>
                    <MoreHorizontalIcon />
                  </MenuTrigger>
                  <MenuContent align="end">
                    <MenuItem>Rename</MenuItem>
                    <MenuItem>Pin</MenuItem>
                    <MenuItem variant="destructive">Delete</MenuItem>
                  </MenuContent>
                </Menu>
              }
            />
          ))}
        </ThreadListGroup>
      </ThreadList>
    </div>
  )
}
```

### Minimal

```tsx
import { ChatIcon } from "@/components/icons"
import { ThreadList, ThreadListGroup, ThreadListItem } from "@/registry/base-nova/ui/thread-list-item"

export default function ThreadListItemMinimal() {
  return (
    <div className="w-64 frame-3xl frame-p-2 bg-card shadow-raised">
      <ThreadList>
        <ThreadListGroup label="Chats">
          <ThreadListItem title="Plan the offsite agenda" icon={<ChatIcon />} />
          <ThreadListItem title="Summarise last week's tickets" icon={<ChatIcon />} active />
          <ThreadListItem title="Draft the launch email" icon={<ChatIcon />} unread />
        </ThreadListGroup>
      </ThreadList>
    </div>
  )
}
```

## Truncation

Title, repo and branch truncate independently; the branch gives way first so the PR number stays readable in a narrow sidebar.

## Actions

With `actions` the item is a list item holding the row button and the actions side by side, so a menu button never nests inside the row and its clicks don't reach the row. The actions show on hover, keyboard focus, while the row is active and while a menu they opened is open; on touch screens they always show and `meta` moves left of them. Then `className`, `id`, `style` and `data-*` go to the list item, and everything else (`onClick`, `aria-*`, `disabled`) to the row button; `buttonProps` reaches the button directly. Without `actions` the button is the item and takes everything.

## API Reference

### ThreadList

Also accepts every prop of `div`.

### ThreadListGroup

Also accepts every prop of `div`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` (required) | `ReactNode` | — | Section heading. |
| `action` | `ReactNode` | — | Control on the heading row. |

### ThreadListItem

Also accepts every prop of `button`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` (required) | `ReactNode` | — | Thread title. |
| `icon` | `ReactNode` | — | Provider or agent glyph. |
| `repo` | `string` | — | Repository or project. |
| `pr` | `{ number: number; status: "open" \| "draft" \| "merged" \| "closed" }` | — | Linked pull request. The number takes the status colour (open success, draft muted, merged purple, closed destructive). |
| `branch` | `string` | — | Git branch. |
| `active` | `boolean` | `false` | Selected row. |
| `running` | `boolean` | `false` | Replace the icon with a spinner. |
| `unread` | `boolean` | `false` | Primary dot after the title. |
| `description` | `ReactNode` | — | Free second line; truncates. Shown above `repo` / `pr` / `branch`. |
| `meta` | `ReactNode` | — | Quiet text at the end of the title line, such as a relative time. `actions` replace it on hover. |
| `actions` | `ReactNode` | — | Row controls, placed over the end of the row outside its button. |
| `buttonProps` | `React.ComponentProps<"button">` | — | Props for the row button, including its `className`. Merged last, so they win over the rest. |
| `trailing` | `ReactNode` | — | Non-interactive content at the end of the title line, inside the row button. |

| Data attribute | Description |
| --- | --- |
| `data-active` | Present when active. |
| `data-running` | Present while running. |
