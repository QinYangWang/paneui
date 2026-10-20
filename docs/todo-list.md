# Todo List

> Shows an agent's step-by-step plan and its progress.

Page: https://paneui.dev/docs/todo-list/

## Installation

```bash
npx shadcn@latest add @paneui/todo-list
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/todo-list.json
```

Packages: `@base-ui/react`, `motion`.

Registry items it builds on: `@paneui/theme`, `@paneui/icons`, `@paneui/digit-swap`, `@paneui/locale-provider`.

## Usage

```tsx
import { TodoList } from "@/components/ui/todo-list"
```

```tsx
<TodoList
  title="Plan"
  items={[
    { id: "1", title: "Find flights", status: "done" },
    { id: "2", title: "Book hotel", status: "in-progress" },
  ]}
/>
```

## Examples

### Statuses

```tsx
import { TodoList, type TodoItem } from "@/registry/base-nova/ui/todo-list"

const ITEMS: TodoItem[] = [
  { id: "1", title: "Export last month’s receipts", status: "done", meta: "42 files" },
  { id: "2", title: "Match receipts to card charges", status: "failed", meta: "3 unmatched", detail: "Two Grab rides and one Apple charge" },
  { id: "3", title: "Fill in the expense report", status: "in-progress", detail: "Page 2 of 3" },
  { id: "4", title: "Send to finance for approval", status: "pending" },
]

export default function TodoListStatuses() {
  return <TodoList items={ITEMS} title="October expenses" className="max-w-sm" />
}
```

### Collapsed

```tsx
import { TodoList, type TodoItem } from "@/registry/base-nova/ui/todo-list"

const ITEMS: TodoItem[] = [
  { id: "1", title: "Pull the failing CI log", status: "done" },
  { id: "2", title: "Reproduce the timezone bug locally", status: "in-progress" },
  { id: "3", title: "Write a regression test", status: "pending" },
  { id: "4", title: "Open a pull request", status: "pending" },
]

export default function TodoListCollapsed() {
  return <TodoList items={ITEMS} title="Fix formatDate" defaultOpen={false} className="max-w-sm" />
}
```

### Collapse on Complete

Use when a finished plan should get out of the way of the reply.

```tsx
"use client"

import * as React from "react"

import { Button } from "@/registry/base-nova/ui/button"
import { TodoList, type TodoItem } from "@/registry/base-nova/ui/todo-list"

const STEPS = ["Check passport expiry", "Book airport transfer", "Download boarding passes"]

export default function TodoListCollapseOnComplete() {
  const [done, setDone] = React.useState(1)
  const [open, setOpen] = React.useState(true)
  const items: TodoItem[] = STEPS.map((title, i) => ({
    id: String(i),
    title,
    status: i < done ? "done" : i === done ? "in-progress" : "pending",
  }))
  const complete = done >= STEPS.length

  return (
    <div className="flex w-full max-w-sm flex-col items-start gap-3">
      <TodoList items={items} title="Before you fly" collapseOnComplete open={open} onOpenChange={setOpen} />
      <Button
        size="sm"
        variant="secondary"
        onClick={() => {
          if (complete) {
            setDone(0)
            setOpen(true)
          } else setDone((d) => d + 1)
        }}
      >
        {complete ? "Restart" : "Complete step"}
      </Button>
    </div>
  )
}
```

### Max Height

Use for long plans inside a fixed-height panel.

```tsx
import { TodoList, type TodoItem } from "@/registry/base-nova/ui/todo-list"

const TITLES = [
  "Measure the living room",
  "Shortlist three sofas",
  "Book the movers",
  "Cancel the old internet plan",
  "Set up the new internet plan",
  "Forward mail to the new address",
  "Update the address with the bank",
  "Return the old keys",
]

const ITEMS: TodoItem[] = TITLES.map((title, i) => ({
  id: String(i),
  title,
  status: i < 3 ? "done" : i === 3 ? "in-progress" : "pending",
}))

export default function TodoListMaxHeight() {
  return <TodoList items={ITEMS} title="Moving checklist" maxHeight={176} className="max-w-sm" />
}
```

### Status Mark

Use the mark alone in your own step lists.

```tsx
import { TodoStatusMark, type TodoStatus } from "@/registry/base-nova/ui/todo-list"

const STATUSES: { status: TodoStatus; label: string }[] = [
  { status: "pending", label: "Pending" },
  { status: "in-progress", label: "In progress" },
  { status: "done", label: "Done" },
  { status: "failed", label: "Failed" },
]

export default function TodoListStatusMark() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      {STATUSES.map((s) => (
        <span key={s.status} className="inline-flex items-center gap-2 text-sm text-muted-foreground">
          <TodoStatusMark status={s.status} />
          {s.label}
        </span>
      ))}
    </div>
  )
}
```

## Accessibility

The in-progress item has `aria-current="step"`, every title ends with a screen-reader-only status, and the header reads "N of M done".

## Motion

Under reduced motion the in-progress arc pulses instead of spinning, checks and crosses appear without drawing, and rows don't animate their position.

## API Reference

Built on [the Collapsible primitive](https://base-ui.com/react/components/collapsible#api-reference). Only the props this library adds or changes are listed; everything else passes through.

### TodoList

Collapsible agent task plan with a live completion count; failures are counted in the header. Also accepts every prop of [Collapsible.Root](https://base-ui.com/react/components/collapsible#root).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `items` (required) | `TodoItem[]` | — | Plan items in order. |
| `title` | `ReactNode` | `"Plan"` | Header label. |
| `open` | `boolean` | — | Controlled open state. |
| `defaultOpen` | `boolean` | `true` | Initial open state when uncontrolled. |
| `onOpenChange` | `(open: boolean) => void` | — | Called when the plan opens or closes. |
| `collapseOnComplete` | `boolean` | `false` | Fold the plan away 700ms after every item is done. |
| `maxHeight` | `number` | — | Cap the list height in px; it scrolls past this. |

| Data attribute | Description |
| --- | --- |
| `data-complete` | On the root once every item is done. |
| `data-status` | On each item: its status. |

### TodoItem

Shape of one plan item.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `id` (required) | `string` | — | Stable key. |
| `title` (required) | `ReactNode` | — | What the step does. |
| `status` | `"pending" \| "in-progress" \| "done" \| "failed"` | `"pending"` | Step state. |
| `meta` | `ReactNode` | — | Trailing note, such as a duration, count or failure reason. |
| `detail` | `ReactNode` | — | Second line under the title. |

### TodoStatusMark

The morphing 20px status glyph.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `status` (required) | `"pending" \| "in-progress" \| "done" \| "failed"` | — | State to draw. |
| `className` | `string` | — | Merged onto the SVG. |
