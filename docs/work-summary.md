# Work Summary

> Summarises the steps an agent took during one turn.

Page: https://paneui.dev/docs/work-summary/

## Installation

```bash
npx shadcn@latest add @paneui/work-summary
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/work-summary.json
```

Packages: `motion`.

Registry items it builds on: `@paneui/theme`, `@paneui/icons`, `@paneui/loader`, `@paneui/text-shimmer`, `@paneui/locale-provider`.

## Usage

```tsx
import { WorkSummary, WorkSummaryStep, WorkSummaryThought } from "@/components/ui/work-summary"
```

```tsx
<WorkSummary duration={25}>
  <WorkSummaryStep kind="read" title="Read SidebarThreadRow.tsx" />
  <WorkSummaryStep kind="execute" title="Run tests" detail="bun run test" />
</WorkSummary>
```

## Composition

```text
WorkSummary
├── WorkSummaryThought
└── WorkSummaryStep
```

## Examples

### Running

```tsx
"use client"

import * as React from "react"

import { WorkSummary, WorkSummaryStep } from "@/registry/base-nova/ui/work-summary"

export default function WorkSummaryRunning() {
  const [startedAt] = React.useState(() => Date.now() - 4000)
  return (
    <div className="w-full max-w-md">
      <WorkSummary running startedAt={startedAt} defaultOpen>
        <WorkSummaryStep kind="read" title="Read package.json" />
        <WorkSummaryStep kind="execute" title="Run pnpm build" status="in_progress" />
        <WorkSummaryStep kind="edit" title="Edit next.config.ts" status="pending" />
      </WorkSummary>
    </div>
  )
}
```

### With Output

Use step children for command output, a diff or an error.

```tsx
import { WorkSummary, WorkSummaryStep } from "@/registry/base-nova/ui/work-summary"

export default function WorkSummaryWithOutput() {
  return (
    <div className="w-full max-w-md">
      <WorkSummary duration={394} defaultOpen>
        <WorkSummaryStep kind="think" title="Make both panes follow the pointer and persist once" />
        <WorkSummaryStep kind="execute" title="Run bun lint" status="failed">
          <pre className="rounded-lg bg-code px-2.5 py-1.5 font-mono text-ui-xs text-muted-foreground shadow-well">src/a.ts:12 unused import</pre>
        </WorkSummaryStep>
        <WorkSummaryStep kind="fetch" title="Fetch the API reference" detail="docs.example.com" />
      </WorkSummary>
    </div>
  )
}
```

### Collapsible Steps

Use when a turn has many steps with long output.

```tsx
"use client"

import { WorkSummary, WorkSummaryStep, WorkSummaryThought } from "@/registry/base-nova/ui/work-summary"

export default function WorkSummaryCollapsibleSteps() {
  return (
    <WorkSummary duration={48} defaultOpen className="w-full max-w-lg">
      <WorkSummaryThought>{"The failing test points at the date parser, so I'll read it before changing anything."}</WorkSummaryThought>
      <WorkSummaryStep kind="read" title="Read" detail="lib/parse-date.ts" />
      <WorkSummaryStep kind="execute" title="Run tests" detail="pnpm test parse-date" collapsible>
        <pre className="font-mono text-ui-sm text-muted-foreground">{"✓ parses ISO dates\n✓ parses relative dates\n✗ keeps the time zone"}</pre>
      </WorkSummaryStep>
      <WorkSummaryThought title="Thought for 4s">The offset is dropped when the string has no seconds. A stricter pattern fixes it.</WorkSummaryThought>
      <WorkSummaryStep kind="edit" title="Edit" detail="lib/parse-date.ts" collapsible defaultOpen>
        <pre className="font-mono text-ui-sm text-success">{"+ const ISO = /^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}(:\\d{2})?([+-]\\d{2}:\\d{2}|Z)$/"}</pre>
      </WorkSummaryStep>
    </WorkSummary>
  )
}
```

## ACP

`kind` and `status` use the Agent Client Protocol's `ToolKind` and `ToolCallStatus` values, so `tool_call` updates map straight onto steps.

## Motion

The list opens with a 250ms height and opacity ease, a collapsible step with 200ms; the chevron turns 90°. With reduced motion only the opacity changes.

## Collapsible steps

With `collapsible` the step row is a button with `aria-expanded`; its children mount only while open. Without children it stays a plain row.

## API Reference

### WorkSummary

Also accepts every prop of `div`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `duration` | `number` | — | Seconds the work took (finished turns). |
| `startedAt` | `number` | — | Epoch ms the work started; the label counts up from it while `running`. |
| `running` | `boolean` | `false` | Show “Working for …” with a shimmer. |
| `label` | `ReactNode` | — | Replace the label. |
| `open` | `boolean` | — | Controlled open state. |
| `defaultOpen` | `boolean` | `false` | Initial open state. |
| `onOpenChange` | `(open: boolean) => void` | — | Called when toggled. |

| Data attribute | Description |
| --- | --- |
| `data-open / data-running` | Present when open / running. |

### WorkSummaryStep

Also accepts every prop of `li`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `kind` | `"read" \| "edit" \| "delete" \| "move" \| "search" \| "execute" \| "think" \| "fetch" \| "switch_mode" \| "other"` | `"other"` | Picks the icon. |
| `title` (required) | `ReactNode` | — | What happened. |
| `detail` | `ReactNode` | — | Muted monospace detail, such as a path or command. |
| `status` | `"pending" \| "in_progress" \| "completed" \| "failed"` | `"completed"` | Spinner, dimmed, icon or ✕. |
| `icon` | `ReactNode` | — | Override the kind's icon. |
| `collapsible` | `boolean` | `false` | The step row shows and hides its children. |
| `open` | `boolean` | — | Controlled open state of a collapsible step. |
| `defaultOpen` | `boolean` | `false` | Initial open state. |
| `onOpenChange` | `(open: boolean) => void` | — | Called when toggled. |

| Data attribute | Description |
| --- | --- |
| `data-status / data-open` | Step status; present while a collapsible step is open. |

### WorkSummaryThought

The model's thinking text. Also accepts every prop of `li`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `ReactNode` | — | Heading such as “Thought for 4s”; with it the text folds under the heading. |
| `open / defaultOpen / onOpenChange` | `boolean / boolean / (open: boolean) => void` | — | Open state when `title` is set. |
