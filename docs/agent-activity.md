# Agent Activity

> Summarises an agent’s work.

Page: https://paneui.dev/docs/agent-activity/

## Installation

```bash
npx shadcn@latest add @paneui/agent-activity
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/agent-activity.json
```

Packages: `@base-ui/react`, `motion`.

Registry items it builds on: `@paneui/theme`, `@paneui/icons`, `@paneui/text-shimmer`, `@paneui/citations`, `@paneui/tool-result`.

## Usage

```tsx
import { AgentActivity } from "@/components/ui/agent-activity"
```

```tsx
<AgentActivity
  status="working"
  items={[{ id: "1", type: "search", query: "flights HKG to KIX", status: "active" }]}
/>
```

## Examples

### Item Types

Use to show every kind of work in one run; consecutive items of one type fold into a group.

```tsx
import { AgentActivity, type AgentActivityItem } from "@/registry/base-nova/ui/agent-activity"

const ITEMS: AgentActivityItem[] = [
  { id: "r1", type: "reasoning", duration: 2.4, text: "You asked for a quiet dinner near the office. I’ll check reviews first, then availability." },
  {
    id: "s1",
    type: "search",
    query: "quiet japanese restaurant central hong kong",
    results: [
      { id: "a", title: "Best kaiseki in Central", domain: "timeout.com" },
      { id: "b", title: "Kaiseki Mori", domain: "openrice.com" },
    ],
  },
  { id: "t1", type: "tool", action: "run", target: "tables.availability", detail: "Found 3 slots tonight", status: "complete" },
  { id: "t2", type: "tool", action: "edit", target: "notes/dinner-plans.md", additions: 6, deletions: 1, status: "complete" },
  { id: "p1", type: "step", label: "Pick the 8:15 pm table", status: "complete" },
  { id: "p2", type: "step", label: "Send the booking for approval" },
]

export default function AgentActivityItemTypes() {
  return <AgentActivity items={ITEMS} status="complete" duration={14} defaultOpen collapseOnComplete={false} className="max-w-md" />
}
```

### Completed

```tsx
import { AgentActivity, type AgentActivityItem } from "@/registry/base-nova/ui/agent-activity"

const ITEMS: AgentActivityItem[] = [
  { id: "s1", type: "search", query: "typhoon signal hong kong today", status: "complete" },
  { id: "s2", type: "search", query: "cathay pacific flight status CX 520", status: "complete" },
  { id: "t1", type: "tool", action: "calendar.update", target: "Flight CX 520", status: "complete" },
]

export default function AgentActivityCompleted() {
  return <AgentActivity items={ITEMS} status="complete" duration={38} className="max-w-md" />
}
```

### Custom Labels

```tsx
import { AgentActivity, type AgentActivityItem } from "@/registry/base-nova/ui/agent-activity"

const ITEMS: AgentActivityItem[] = [
  { id: "t1", type: "tool", action: "read", target: "statements/2026-09.pdf", status: "complete" },
  { id: "t2", type: "tool", action: "read", target: "statements/2026-10.pdf", status: "active" },
]

export default function AgentActivityCustomLabels() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <AgentActivity items={ITEMS} activeLabel="Reading your bank statements…" />
      <AgentActivity items={ITEMS.map((i) => ({ ...i, status: "complete" as const }))} status="complete" duration={21} summary="Checked two months of spending" />
    </div>
  )
}
```

### Errors

```tsx
import { AgentActivity, type AgentActivityItem } from "@/registry/base-nova/ui/agent-activity"

const ITEMS: AgentActivityItem[] = [
  { id: "t1", type: "tool", action: "run", target: "pnpm test", detail: "2 failing tests in invoice.test.ts", status: "error" },
  { id: "t2", type: "tool", action: "edit", target: "src/invoice.ts", additions: 3, deletions: 2, status: "complete" },
  { id: "t3", type: "tool", action: "run", target: "pnpm test", detail: "All 69 tests passed", status: "complete" },
]

export default function AgentActivityErrors() {
  return <AgentActivity items={ITEMS} status="complete" duration={47} defaultOpen collapseOnComplete={false} className="max-w-md" />
}
```

### Keep Open

```tsx
"use client"

import * as React from "react"

import { AgentActivity, type AgentActivityItem } from "@/registry/base-nova/ui/agent-activity"
import { Button } from "@/registry/base-nova/ui/button"

const STEPS = ["Find three hotels near Namba", "Compare prices for Nov 20–23", "Check cancellation terms"]

export default function AgentActivityKeepOpen() {
  const [done, setDone] = React.useState(0)
  const [open, setOpen] = React.useState(true)
  const working = done < STEPS.length

  const items: AgentActivityItem[] = STEPS.map((label, i) => ({
    id: String(i),
    type: "step",
    label,
    status: i < done ? "complete" : i === done ? "active" : undefined,
  }))

  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <AgentActivity
        items={items}
        status={working ? "working" : "complete"}
        collapseOnComplete={false}
        open={open}
        onOpenChange={setOpen}
      />
      <Button size="sm" variant="secondary" className="self-start" onClick={() => setDone((d) => (d >= STEPS.length ? 0 : d + 1))}>
        {working ? "Finish step" : "Restart"}
      </Button>
    </div>
  )
}
```

## Behaviour

While `working` the stream is always open, the header can't be toggled and the live group stays open. Groups the reader opens or closes keep that choice.

## Motion

Under reduced motion the spinners stop, the live group loses its pulse ring, search chips fade in without scaling, and panels open without a height transition.

## API Reference

Built on [the Collapsible primitive](https://base-ui.com/react/components/collapsible#api-reference). Only the props this library adds or changes are listed; everything else passes through.

### AgentActivity

One adaptive activity stream for an agent run. Also accepts every prop of [Collapsible.Root](https://base-ui.com/react/components/collapsible#root).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `items` (required) | `AgentActivityItem[]` | — | Chronological activity. Append or update items as events stream in. |
| `status` | `"working" \| "complete"` | `"working"` | Run state. |
| `duration` | `number` | — | Total seconds; while working and unset, the header ticks on its own. |
| `open` | `boolean` | — | Controlled open state once complete. |
| `defaultOpen` | `boolean` | `false` | Initial open state when mounting complete. |
| `onOpenChange` | `(open: boolean) => void` | — | Called when the stream opens or closes. |
| `collapseOnComplete` | `boolean` | `true` | Fold into the summary line when the run completes. |
| `activeLabel` | `ReactNode` | — | Override the live header label. |
| `summary` | `ReactNode` | — | Override the completed summary, which defaults to "Worked for …" plus a count of searches, tool calls and steps. |

| Data attribute | Description |
| --- | --- |
| `data-status` | `working` or `complete`. |

### AgentActivityItem

Union of the four item shapes. Every item has `id: string` and optional `status: "active" | "complete" | "error"`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `type: "reasoning"` | `{ text: ReactNode; duration?: number }` | — | Thinking text; `duration` feeds "Thought for …". |
| `type: "search"` | `{ query: string; results?: CitationSource[] }` | — | A web search and its result chips. |
| `type: "tool"` | `{ action: string; target: ReactNode; detail?: ReactNode; additions?: number; deletions?: number }` | — | A tool call; `read`, `edit`, `write` and `run` get their own verb and icon. |
| `type: "step"` | `{ label: ReactNode; detail?: ReactNode }` | — | A plan step with a checkable dot. |
