# Sortable Stack

> List the user can reorder by dragging or keyboard.

Page: https://paneui.dev/docs/sortable-stack/

## Installation

```bash
npx shadcn@latest add @paneui/sortable-stack
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/sortable-stack.json
```

Packages: `motion`.

Registry items it builds on: `@paneui/theme`, `@paneui/icons`.

## Usage

```tsx
import { SortableStack, SortableStackContent, SortableStackHandle, SortableStackItem } from "@/components/ui/sortable-stack"
```

```tsx
<SortableStack defaultItems={tasks} getItemLabel={(t) => t.title}>
  {(items) =>
    items.map((t) => (
      <SortableStackItem key={t.id} id={t.id}>
        <SortableStackHandle />
        <SortableStackContent>{t.title}</SortableStackContent>
      </SortableStackItem>
    ))
  }
</SortableStack>
```

## Composition

```text
SortableStack
├── SortableStackItem
│   ├── SortableStackHandle
│   └── SortableStackContent
└── SortableStackUndo (automatic, or in footer)
```

## Examples

### Controlled

Use when you save the order or show it elsewhere.

```tsx
"use client"

import * as React from "react"

import {
  SortableStack,
  SortableStackContent,
  SortableStackHandle,
  SortableStackItem,
} from "@/registry/base-nova/ui/sortable-stack"

const initial = [
  { id: "email", label: "Email" },
  { id: "push", label: "Push notification" },
  { id: "sms", label: "SMS" },
  { id: "slack", label: "Slack" },
]

export default function SortableStackControlled() {
  const [channels, setChannels] = React.useState(initial)

  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <SortableStack
        label="Notification fallback order"
        items={channels}
        onItemsChange={setChannels}
        getItemLabel={(c) => c.label}
      >
        {(items) =>
          items.map((c) => (
            <SortableStackItem key={c.id} id={c.id}>
              <SortableStackHandle />
              <SortableStackContent>
                <span className="font-medium">{c.label}</span>
              </SortableStackContent>
            </SortableStackItem>
          ))
        }
      </SortableStack>
      <p className="text-xs text-pretty text-muted-foreground">Tries {channels.map((c) => c.label).join(" → ")}</p>
    </div>
  )
}
```

### Move to Top

```tsx
"use client"

import { ArrowUpIcon } from "@/components/icons"
import { Button } from "@/registry/base-nova/ui/button"
import {
  SortableStack,
  SortableStackContent,
  SortableStackHandle,
  SortableStackItem,
  useSortableStack,
} from "@/registry/base-nova/ui/sortable-stack"

const tracks = [
  { id: "t1", title: "Midnight Drive", artist: "Neon Coast" },
  { id: "t2", title: "Paper Planes", artist: "Lumen" },
  { id: "t3", title: "Slow Tide", artist: "Harbor Lights" },
  { id: "t4", title: "Afterglow", artist: "Vela" },
]

function MoveToTop({ id, label }: { id: string; label: string }) {
  const { ids, moveItem } = useSortableStack()
  return (
    <Button
      variant="ghost"
      size="icon-sm"
      aria-label={`Play ${label} next`}
      disabled={ids[0] === id}
      onClick={() => moveItem(id, "first")}
    >
      <ArrowUpIcon />
    </Button>
  )
}

export default function SortableStackMoveToTop() {
  return (
    <SortableStack label="Up next" defaultItems={tracks} getItemLabel={(t) => t.title} className="max-w-sm">
      {(items) =>
        items.map((t) => (
          <SortableStackItem key={t.id} id={t.id}>
            <SortableStackHandle />
            <SortableStackContent>
              <span className="flex min-w-0 flex-col">
                <span className="truncate font-medium">{t.title}</span>
                <span className="truncate text-xs text-muted-foreground">{t.artist}</span>
              </span>
            </SortableStackContent>
            <MoveToTop id={t.id} label={t.title} />
          </SortableStackItem>
        ))
      }
    </SortableStack>
  )
}
```

### Custom Undo

Use when undo belongs in your own control instead of the built-in pill.

```tsx
"use client"

import { UndoIcon } from "@/components/icons"
import { Button } from "@/registry/base-nova/ui/button"
import {
  SortableStack,
  SortableStackContent,
  SortableStackHandle,
  SortableStackItem,
  useSortableStack,
} from "@/registry/base-nova/ui/sortable-stack"

const steps = [
  { id: "lint", label: "Lint" },
  { id: "test", label: "Unit tests" },
  { id: "build", label: "Build" },
  { id: "deploy", label: "Deploy preview" },
]

function Footer() {
  const { canUndo, undo, ids } = useSortableStack()
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-xs text-muted-foreground tabular-nums">{ids.length} steps</span>
      <Button variant="ghost" size="sm" disabled={!canUndo} onClick={undo}>
        <UndoIcon className="rtl:-scale-x-100" data-icon="inline-start" />
        Revert order
      </Button>
    </div>
  )
}

export default function SortableStackCustomUndo() {
  return (
    <SortableStack
      label="Pipeline steps"
      defaultItems={steps}
      getItemLabel={(s) => s.label}
      showUndo={false}
      footer={<Footer />}
      className="max-w-sm"
    >
      {(items) =>
        items.map((s, i) => (
          <SortableStackItem key={s.id} id={s.id}>
            <SortableStackHandle />
            <SortableStackContent>
              <span className="font-mono text-xs text-muted-foreground tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-medium">{s.label}</span>
            </SortableStackContent>
          </SortableStackItem>
        ))
      }
    </SortableStack>
  )
}
```

### Disabled

```tsx
"use client"

import * as React from "react"

import { Label } from "@/registry/base-nova/ui/label"
import { Switch } from "@/registry/base-nova/ui/switch"
import {
  SortableStack,
  SortableStackContent,
  SortableStackHandle,
  SortableStackItem,
} from "@/registry/base-nova/ui/sortable-stack"

const columns = [
  { id: "name", label: "Name" },
  { id: "status", label: "Status" },
  { id: "owner", label: "Owner" },
  { id: "updated", label: "Last updated" },
]

export default function SortableStackDisabled() {
  const [locked, setLocked] = React.useState(true)

  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <Label className="justify-between">
        Lock column order
        <Switch checked={locked} onCheckedChange={setLocked} />
      </Label>
      <SortableStack label="Table columns" defaultItems={columns} getItemLabel={(c) => c.label} disabled={locked}>
        {(items) =>
          items.map((c) => (
            <SortableStackItem key={c.id} id={c.id}>
              <SortableStackHandle />
              <SortableStackContent>
                <span className="font-medium">{c.label}</span>
              </SortableStackContent>
            </SortableStackItem>
          ))
        }
      </SortableStack>
    </div>
  )
}
```

## Keyboard

Rows move only from their handle. With a handle focused, Up/Down move the row one step and Home/End send it to the top or bottom; focus stays on the handle and the new position is announced.

## Motion

The dragged row scales to 1.025. With reduced motion rows jump into place without scaling.

## API Reference

### SortableStack

Drag-to-reorder list. Items need a string `id`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `items` | `T[]` | — | Controlled rows in order. |
| `defaultItems` | `T[]` | `[]` | Initial rows when uncontrolled. |
| `onItemsChange` | `(items: T[]) => void` | — | Called with the new order after a drag, key move or undo. |
| `getItemLabel` (required) | `(item: T) => string` | — | Readable name per row, used in handle labels and announcements. |
| `children` (required) | `(items: T[]) => ReactNode` | — | Render the rows in their current order. |
| `label` | `string` | `"Sortable list"` | Accessible name of the list. |
| `disabled` | `boolean` | `false` | Lock the order; handles are disabled and rows can't be dragged. |
| `showUndo` | `boolean` | `true` | Render the Undo pill under the list. |
| `footer` | `ReactNode` | — | Extra content under the list, inside the stack's context. |
| `className` | `string` | — | Merged onto the wrapper. |

### SortableStackItem

One row.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `id` (required) | `string` | — | The item's id. |
| `className` | `string` | — | Merged onto the row. |
| `style` | `CSSProperties` | — | Inline style for the row. |
| `children` | `ReactNode` | — | Handle and content. |

| Data attribute | Description |
| --- | --- |
| `data-dragging` | Present while the row is dragged. |

### SortableStackHandle

Grip button that starts the drag and owns keyboard reordering. Labelled with the row's name and position. Also accepts every prop of `button`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` | `grip icon` | Replace the grip icon. |

### SortableStackContent

Content area of a row. Also accepts every prop of `div`.

### SortableStackUndo

Restores the order from before the last move. Hidden until there is something to undo. Also accepts every prop of `button`.

| Data attribute | Description |
| --- | --- |
| `data-visible` | Present while an undo is available. |

### useSortableStack

Order and actions for custom controls. Use inside `SortableStack`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `ids` | `string[]` | — | Current order of ids. |
| `moveItem` | `(id: string, by: -1 \| 1 \| "first" \| "last") => void` | — | Move a row; undoable. |
| `undo` | `() => void` | — | Restore the previous order. |
| `canUndo` | `boolean` | — | Whether an undo is available. |
| `disabled` | `boolean` | — | Whether the stack is disabled. |
