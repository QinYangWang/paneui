# Animated Number

> Counts up to a number when it scrolls into view.

Page: https://paneui.dev/docs/animated-number/

## Installation

```bash
npx shadcn@latest add @paneui/animated-number
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/animated-number.json
```

Packages: `motion`.

Registry items it builds on: `@paneui/theme`.

## Usage

```tsx
import { AnimatedNumber } from "@/components/ui/animated-number"
```

```tsx
<AnimatedNumber value={1842} locale="en-US" />
```

## Examples

### Live Updates

```tsx
"use client"

import * as React from "react"

import { Button } from "@/registry/base-nova/ui/button"
import { AnimatedNumber } from "@/registry/base-nova/ui/animated-number"

const ITEMS = [
  { name: "Noise-cancelling headphones", price: 249 },
  { name: "Travel adapter", price: 29.5 },
  { name: "Carry-on suitcase", price: 189 },
]

export default function AnimatedNumberLive() {
  const [count, setCount] = React.useState(1)
  const total = ITEMS.slice(0, count).reduce((sum, item) => sum + item.price, 0)
  return (
    <div className="flex w-full max-w-xs flex-col gap-3 rounded-2xl bg-card p-4 shadow-raised">
      <ul className="flex flex-col gap-1 text-sm">
        {ITEMS.slice(0, count).map((item) => (
          <li key={item.name} className="flex justify-between gap-4">
            <span>{item.name}</span>
            <span className="text-muted-foreground tabular-nums">${item.price.toFixed(2)}</span>
          </li>
        ))}
      </ul>
      <div className="flex items-baseline justify-between border-t border-border pt-3">
        <span className="text-sm text-muted-foreground">Total</span>
        <AnimatedNumber
          value={total}
          locale="en-US"
          format={{ style: "currency", currency: "USD" }}
          startOnView={false}
          className="text-xl font-semibold tracking-tight"
        />
      </div>
      <Button
        size="sm"
        variant="secondary"
        onClick={() => setCount((c) => (c % ITEMS.length) + 1)}
      >
        {count < ITEMS.length ? "Add item" : "Reset cart"}
      </Button>
    </div>
  )
}
```

### Start Value

```tsx
import { AnimatedNumber } from "@/registry/base-nova/ui/animated-number"

export default function AnimatedNumberFrom() {
  return (
    <div className="flex gap-8">
      <div className="flex flex-col gap-1">
        <AnimatedNumber value={0} from={86} className="text-3xl font-semibold tracking-tight" />
        <span className="text-xs text-muted-foreground">Unread emails</span>
      </div>
      <div className="flex flex-col gap-1">
        <AnimatedNumber value={2026} from={1999} className="text-3xl font-semibold tracking-tight" />
        <span className="text-xs text-muted-foreground">Years of history</span>
      </div>
    </div>
  )
}
```

### Spring

```tsx
"use client"

import * as React from "react"

import { Button } from "@/registry/base-nova/ui/button"
import { AnimatedNumber } from "@/registry/base-nova/ui/animated-number"

const SPRINGS = [
  { label: "Default (380 / 42 / 0.7)", stiffness: 380, damping: 42, mass: 0.7 },
  { label: "Snappy (500 / 30 / 0.5)", stiffness: 500, damping: 30, mass: 0.5 },
  { label: "Lazy (60 / 20 / 1)", stiffness: 60, damping: 20, mass: 1 },
]

export default function AnimatedNumberSpring() {
  const [value, setValue] = React.useState(320)
  return (
    <div className="flex flex-col items-start gap-4">
      <div className="flex flex-col gap-2">
        {SPRINGS.map((s) => (
          <div key={s.label} className="flex items-baseline gap-3">
            <span className="w-44 text-xs text-muted-foreground">{s.label}</span>
            <AnimatedNumber
              value={value}
              stiffness={s.stiffness}
              damping={s.damping}
              mass={s.mass}
              startOnView={false}
              locale="en-US"
              className="text-xl font-semibold"
            />
          </div>
        ))}
      </div>
      <Button size="sm" variant="secondary" onClick={() => setValue((v) => (v === 320 ? 9480 : 320))}>
        Toggle value
      </Button>
    </div>
  )
}
```

## Motion

With reduced motion the number jumps to its value without counting. Screen readers get the final formatted value from a visually hidden copy.

## Related

[Number Ticker](https://paneui.dev/docs/number-ticker) rolls each digit like an odometer instead.

## API Reference

### AnimatedNumber

A formatted number that counts to `value` on a spring. Also accepts every prop of `span`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` (required) | `number` | — | The number to count to. |
| `from` | `number` | `0` | Where the count starts on first reveal. |
| `locale` | `string` | `runtime locale` | Locale for `Intl.NumberFormat`. |
| `format` | `Intl.NumberFormatOptions` | — | Currency, percent, compact, fraction digits and so on. |
| `startOnView` | `boolean` | `true` | Wait until half the number scrolls into view before counting. |
| `stiffness` | `number` | `380` | Spring stiffness; higher settles faster. |
| `damping` | `number` | `42` | Spring damping; the default is slightly overdamped so the count never overshoots, and lower values overshoot the target. |
| `mass` | `number` | `0.7` | Spring mass. |

| Data attribute | Description |
| --- | --- |
| `data-slot` | "animated-number" |
