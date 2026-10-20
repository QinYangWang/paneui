# Agent Progress

> Shows how long an agent has been working.

Page: https://paneui.dev/docs/agent-progress/

## Installation

```bash
npx shadcn@latest add @paneui/agent-progress
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/agent-progress.json
```

Packages: `motion`.

Registry items it builds on: `@paneui/theme`, `@paneui/locale-provider`.

## Usage

```tsx
import { AgentProgress } from "@/components/ui/agent-progress"
```

```tsx
<AgentProgress label="Searching" />
```

## Examples

### With Meta

```tsx
import { AgentProgress } from "@/registry/base-nova/ui/agent-progress"

export default function AgentProgressWithMeta() {
  return (
    <div className="flex flex-col items-start gap-3">
      <AgentProgress label="Reading" meta="12 files" />
      <AgentProgress label="Writing" initialElapsed={14} meta="1.8k tokens" />
    </div>
  )
}
```

### Controlled Elapsed

```tsx
"use client"

import * as React from "react"

import { AgentProgress } from "@/registry/base-nova/ui/agent-progress"
import { Button } from "@/registry/base-nova/ui/button"

export default function AgentProgressControlled() {
  const [elapsed, setElapsed] = React.useState(42)
  return (
    <div className="flex flex-col items-start gap-4">
      <AgentProgress label="Deploying" elapsed={elapsed} />
      <div className="flex gap-2">
        <Button variant="secondary" size="sm" onClick={() => setElapsed((s) => s + 10)}>
          Add 10s
        </Button>
        <Button variant="ghost" size="sm" onClick={() => setElapsed(0)}>
          Reset
        </Button>
      </div>
    </div>
  )
}
```

### Stopped

```tsx
import { AgentProgress } from "@/registry/base-nova/ui/agent-progress"

export default function AgentProgressStopped() {
  return (
    <div className="flex flex-col items-start gap-3">
      <AgentProgress label="Indexing" />
      <AgentProgress label="Indexed" running={false} initialElapsed={27.3} meta="318 files" />
    </div>
  )
}
```

### Timer Formats

```tsx
import { AgentProgress } from "@/registry/base-nova/ui/agent-progress"

export default function AgentProgressFormats() {
  return (
    <div className="flex flex-col items-start gap-3">
      <AgentProgress label="Searching" running={false} initialElapsed={8.4} />
      <AgentProgress label="Researching" running={false} initialElapsed={83} />
      <AgentProgress label="Training" running={false} initialElapsed={3900} />
    </div>
  )
}
```

## Motion

Under reduced motion the 3×3 glyph stops scaling and only fades its opacity while running.

## Accessibility

The readout is `role="status"` with an `aria-label` of the `label` plus ", in progress" while running; the ticking timer is hidden from screen readers.

## API Reference

### AgentProgress

Working readout with an activity glyph, an action verb and a live timer. Also accepts every prop of `span`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `string` | `"Working"` | Verb for what the agent is doing. |
| `elapsed` | `number` | — | Controlled elapsed time in seconds. When set, the internal clock is ignored. |
| `initialElapsed` | `number` | `0` | Where the internal clock starts, in seconds. |
| `running` | `boolean` | `true` | Whether the internal clock runs. When `false` the glyph rests and the timer freezes. |
| `meta` | `ReactNode` | — | Optional trailing detail, e.g. a token count. |

| Data attribute | Description |
| --- | --- |
| `data-running` | Present while `running` is `true`. |

### formatElapsed

The formatter behind the timer, `(seconds: number) => string`. It shows tenths under a minute, minutes and seconds under an hour, then hours and minutes, e.g. `8.4s`, `1m 23s`, `1h 05m`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `total` (required) | `number` | — | Elapsed seconds; negatives clamp to 0. |
