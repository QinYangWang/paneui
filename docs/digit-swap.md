# Digit Swap

> Rolls only the digits that change.

Page: https://paneui.dev/docs/digit-swap/

## Installation

```bash
npx shadcn@latest add @paneui/digit-swap
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/digit-swap.json
```

Packages: `motion`.

Registry items it builds on: `@paneui/theme`.

## Usage

```tsx
import { DigitSwap } from "@/components/ui/digit-swap"
```

```tsx
<DigitSwap value={count} />
```

## Examples

### Auto Direction

```tsx
"use client"

import * as React from "react"

import { ArrowDownIcon, ArrowUpIcon } from "@/components/icons"
import { Button } from "@/registry/base-nova/ui/button"
import { DigitSwap } from "@/registry/base-nova/ui/digit-swap"

export default function DigitSwapAutoDirection() {
  const [price, setPrice] = React.useState(184.32)
  const [last, setLast] = React.useState(0)

  function move(delta: number) {
    setLast(delta)
    setPrice((p) => Math.max(1, Math.round((p + delta) * 100) / 100))
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-baseline gap-2">
        <span className="text-sm font-medium text-muted-foreground">ACME</span>
        <DigitSwap value={`$${price.toFixed(2)}`} className="text-3xl font-semibold tracking-tight" />
        <span className={last >= 0 ? "text-sm font-medium text-success tabular-nums" : "text-sm font-medium text-destructive tabular-nums"}>
          {last >= 0 ? "+" : "−"}
          {Math.abs(last).toFixed(2)}
        </span>
      </div>
      <div className="flex gap-2">
        <Button variant="secondary" size="sm" onClick={() => move(-2.47)}>
          <ArrowDownIcon data-icon="inline-start" />
          Drop
        </Button>
        <Button variant="secondary" size="sm" onClick={() => move(3.18)}>
          <ArrowUpIcon data-icon="inline-start" />
          Rise
        </Button>
      </div>
    </div>
  )
}
```

### Odometer

```tsx
"use client"

import * as React from "react"

import { Button } from "@/registry/base-nova/ui/button"
import { DigitSwap } from "@/registry/base-nova/ui/digit-swap"

export default function DigitSwapOdometer() {
  const [views, setViews] = React.useState(9_996)

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-col items-center gap-1">
        <DigitSwap value={views.toLocaleString("en-US")} staggerFrom="end" stagger={0.04} className="font-mono text-3xl font-semibold" />
        <span className="text-xs text-muted-foreground">page views</span>
      </div>
      <Button variant="secondary" size="sm" onClick={() => setViews((v) => v + 1)}>
        Add a view
      </Button>
    </div>
  )
}
```

### Fixed Direction

```tsx
"use client"

import * as React from "react"

import { DigitSwap } from "@/registry/base-nova/ui/digit-swap"

function format(seconds: number) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
}

export default function DigitSwapFixedDirection() {
  const [left, setLeft] = React.useState(5 * 60)

  React.useEffect(() => {
    const id = window.setInterval(() => setLeft((s) => (s <= 0 ? 5 * 60 : s - 1)), 1000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div className="flex flex-col items-center gap-1">
      <DigitSwap value={format(left)} direction="down" className="font-mono text-3xl font-semibold" />
      <span className="text-xs text-muted-foreground">until your code expires</span>
    </div>
  )
}
```

### Replay

```tsx
"use client"

import * as React from "react"

import { RefreshIcon } from "@/components/icons"
import { Button } from "@/registry/base-nova/ui/button"
import { DigitSwap } from "@/registry/base-nova/ui/digit-swap"

export default function DigitSwapReplay() {
  const [key, setKey] = React.useState(0)

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-col items-center gap-1">
        <DigitSwap
          value="$48,210"
          animationKey={key}
          duration={0.5}
          stagger={0.05}
          className="text-3xl font-semibold tracking-tight"
        />
        <span className="text-xs text-muted-foreground">revenue this month</span>
      </div>
      <Button variant="ghost" size="sm" onClick={() => setKey((k) => k + 1)}>
        <RefreshIcon data-icon="inline-start" />
        Replay
      </Button>
    </div>
  )
}
```

## Motion

Glyphs slide 60% and blur 2px while fading, with an ease-out curve. With reduced motion they only cross-fade, capped at 150ms and with no stagger.

## Accessibility

The full value is rendered once as screen-reader text; the animated glyphs are `aria-hidden`.

## API Reference

### DigitSwap

Fixed-slot characters that roll when they change. Digits sit in `1ch` slots keyed from the right, so nothing jitters. Also accepts every prop of `span`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` (required) | `string \| number` | — | Number or pre-formatted string (`"$1,204"`, `"•••• 4242"`). Each character gets its own slot. |
| `direction` | `"up" \| "down" \| "auto"` | `"auto"` | Where new glyphs enter from. `auto` picks `up` when the numeric value grows and `down` when it shrinks. |
| `duration` | `number` | `0.32` | Seconds per glyph roll. |
| `stagger` | `number` | `0.02` | Seconds between neighbouring glyphs. |
| `staggerFrom` | `"start" \| "end"` | `"start"` | Which end the stagger starts from. `end` ripples right to left. |
| `animationKey` | `string \| number` | — | Change it to replay every glyph even when the characters are the same. |
| `suffixLength` | `number` | `0` | Number of trailing characters that get `suffixClassName` (units, cents, `/mo`). |
| `glyphClassName` | `string` | — | Class for each animated glyph. |
| `suffixClassName` | `string` | — | Class for the trailing `suffixLength` slots. |

| Data attribute | Description |
| --- | --- |
| `data-direction` | `up` or `down`: the direction of the latest roll. |
