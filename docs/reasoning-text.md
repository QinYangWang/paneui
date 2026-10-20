# Reasoning Text

> Status line that shows an agent is still working.

Page: https://paneui.dev/docs/reasoning-text/

## Installation

```bash
npx shadcn@latest add @paneui/reasoning-text
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/reasoning-text.json
```

Packages: `motion`.

Registry items it builds on: `@paneui/theme`, `@paneui/text-shimmer`, `@paneui/text-cascade`, `@paneui/text-scramble`.

## Usage

```tsx
import { ReasoningText } from "@/components/ui/reasoning-text"
```

```tsx
<ReasoningText phrases={["Thinking", "Reading the docs", "Drafting a reply"]} />
```

## Examples

### Spinners

Use to match the spinner to the tone of your interface.

```tsx
import { ReasoningText } from "@/registry/base-nova/ui/reasoning-text"

export default function ReasoningTextSpinners() {
  return (
    <div className="flex flex-col gap-3">
      <ReasoningText spinner="braille" phrases={["Planning the trip"]} />
      <ReasoningText spinner="dots" phrases={["Checking train times"]} />
      <ReasoningText spinner="line" phrases={["Building the project"]} />
      <ReasoningText spinner="star" phrases={["Composing an answer"]} />
    </div>
  )
}
```

### Controlled Index

Use when you know the agent's real current step; it then stops cycling on its own.

```tsx
"use client"

import * as React from "react"

import { Button } from "@/registry/base-nova/ui/button"
import { ReasoningText } from "@/registry/base-nova/ui/reasoning-text"

const STEPS = ["Opening the spreadsheet", "Summing Q3 revenue", "Comparing with Q2", "Writing the summary"]

export default function ReasoningTextControlled() {
  const [step, setStep] = React.useState(0)
  return (
    <div className="flex flex-col items-start gap-4">
      <ReasoningText phrases={STEPS} index={step} />
      <Button variant="secondary" size="sm" onClick={() => setStep((s) => (s + 1) % STEPS.length)}>
        Next step
      </Button>
    </div>
  )
}
```

### Custom Indicator

Use when your product already has its own loading mark.

```tsx
import { SparklesIcon } from "@/components/icons"
import { ReasoningText } from "@/registry/base-nova/ui/reasoning-text"

export default function ReasoningTextCustomIndicator() {
  return (
    <div className="flex flex-col gap-3">
      <ReasoningText indicator={<SparklesIcon className="size-4 text-primary" />} phrases={["Brainstorming names", "Checking domains"]} />
      <ReasoningText indicator={null} phrases={["Summarising the thread", "Pulling out action items"]} />
    </div>
  )
}
```

### Without Ellipsis

Use when your phrases carry their own punctuation.

```tsx
import { ReasoningText } from "@/registry/base-nova/ui/reasoning-text"

export default function ReasoningTextNoEllipsis() {
  return (
    <ReasoningText
      ellipsis={false}
      interval={1600}
      shimmerDuration={1.2}
      phrases={["Step 1 of 3: fetch issues", "Step 2 of 3: group by label", "Step 3 of 3: draft the changelog"]}
    />
  )
}
```

### ASCII Spinner

```tsx
import { AsciiSpinner } from "@/registry/base-nova/ui/reasoning-text"

export default function ReasoningTextAsciiSpinner() {
  return (
    <div className="flex flex-col gap-2 font-mono text-sm text-muted-foreground">
      <span className="inline-flex items-center gap-2">
        <AsciiSpinner kind="dots" /> pnpm install
      </span>
      <span className="inline-flex items-center gap-2">
        <AsciiSpinner kind="line" interval={120} /> next build
      </span>
      <span className="inline-flex items-center gap-2">
        <AsciiSpinner kind="star" interval={160} /> vitest run
      </span>
    </div>
  )
}
```

## Motion

Under reduced motion the swap mode cross-fades instead of blurring and rolling, the cascade mask stops sweeping, and `AsciiSpinner` holds its first frame with a soft pulse.

## Accessibility

The line is a polite `role="status"` region. The current phrase is read from a screen-reader-only copy; the animated text and the spinner are `aria-hidden`.

## API Reference

### ReasoningText

A spinner plus a shimmering phrase that cycles while the agent works. Also accepts every prop of `span`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `phrases` | `string[]` | `["Thinking", "Reading the context", "Weighing the options", "Drafting a reply"]` | Phrases cycled while the agent works. A single phrase never changes. |
| `mode` | `"swap" \| "cascade" \| "scramble"` | `"swap"` | Transition between phrases. `swap` blurs and rolls, `cascade` rolls letter by letter, `scramble` scrambles the letters. |
| `interval` | `number` | `2400` | Milliseconds each phrase stays up. |
| `index` | `number` | — | Controlled phrase index; when set, the component stops cycling on its own. |
| `shimmerDuration` | `number` | `1.8` | Seconds per shimmer sweep. |
| `indicator` | `ReactNode` | — | Leading glyph. Defaults to an `AsciiSpinner`; pass `null` to hide. |
| `spinner` | `"braille" \| "dots" \| "line" \| "star"` | `"braille"` | Frame set used by the default indicator. |
| `ellipsis` | `boolean` | `true` | Append an ellipsis to every phrase. |

| Data attribute | Description |
| --- | --- |
| `data-mode` | The current `mode`. |

### AsciiSpinner

A decorative monospace glyph that ticks through terminal spinner frames. Also accepts every prop of `span`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `kind` | `"braille" \| "dots" \| "line" \| "star"` | `"braille"` | Which frame set to cycle. |
| `interval` | `number` | `80` | Milliseconds per frame. |
