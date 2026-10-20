# Number Ticker

> Number whose digits roll to each new value.

Page: https://paneui.dev/docs/number-ticker/

## Installation

```bash
npx shadcn@latest add @paneui/number-ticker
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/number-ticker.json
```

Packages: `motion`.

Registry items it builds on: `@paneui/theme`.

## Usage

```tsx
import { NumberTicker } from "@/components/ui/number-ticker"
```

```tsx
<NumberTicker value={1284.5} locale="en-US" format={{ style: "currency", currency: "USD" }} />
```

## Examples

### Formats

Use for currency, percentages or compact counts.

```tsx
import { NumberTicker } from "@/registry/base-nova/ui/number-ticker"

export default function NumberTickerFormats() {
  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="flex flex-col gap-1">
        <NumberTicker
          value={4280}
          locale="en-US"
          format={{ style: "currency", currency: "EUR", maximumFractionDigits: 0 }}
          className="text-2xl font-semibold tracking-tight"
        />
        <span className="text-xs text-muted-foreground">Trip budget</span>
      </div>
      <div className="flex flex-col gap-1">
        <NumberTicker
          value={0.72}
          locale="en-US"
          format={{ style: "percent" }}
          className="text-2xl font-semibold tracking-tight"
        />
        <span className="text-xs text-muted-foreground">Inbox cleared</span>
      </div>
      <div className="flex flex-col gap-1">
        <NumberTicker
          value={128400}
          locale="en-US"
          format={{ notation: "compact", maximumFractionDigits: 1 }}
          className="text-2xl font-semibold tracking-tight"
        />
        <span className="text-xs text-muted-foreground">Monthly visitors</span>
      </div>
    </div>
  )
}
```

### Stagger and Transition

Use when the default roll feels too fast or too even.

```tsx
"use client"

import * as React from "react"

import { Button } from "@/registry/base-nova/ui/button"
import { NumberTicker } from "@/registry/base-nova/ui/number-ticker"

export default function NumberTickerStagger() {
  const [value, setValue] = React.useState(48213)
  return (
    <div className="flex flex-col items-start gap-4">
      <div className="flex flex-col gap-2">
        <div className="flex items-baseline gap-3">
          <span className="w-24 text-xs text-muted-foreground">stagger 0</span>
          <NumberTicker value={value} locale="en-US" stagger={0} className="text-2xl font-semibold" />
        </div>
        <div className="flex items-baseline gap-3">
          <span className="w-24 text-xs text-muted-foreground">stagger 0.12</span>
          <NumberTicker
            value={value}
            locale="en-US"
            stagger={0.12}
            transition={{ type: "spring", stiffness: 420, damping: 38, mass: 0.6 }}
            className="text-2xl font-semibold"
          />
        </div>
      </div>
      <Button size="sm" variant="secondary" onClick={() => setValue((v) => (v * 7 + 1931) % 99999)}>
        Shuffle
      </Button>
    </div>
  )
}
```

### Live Counter

```tsx
"use client"

import * as React from "react"

import { NumberTicker } from "@/registry/base-nova/ui/number-ticker"

export default function NumberTickerLive() {
  const [count, setCount] = React.useState(1207)
  React.useEffect(() => {
    const id = setInterval(() => setCount((c) => c + 1 + Math.floor(Math.random() * 3)), 1600)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="flex items-center gap-3 rounded-xl bg-card px-4 py-3 shadow-raised">
      <span className="size-2 rounded-full bg-success" />
      <NumberTicker
        value={count}
        locale="en-US"
        startOnView={false}
        className="text-xl font-semibold"
        digitClassName="text-primary"
      />
      <span className="text-sm text-muted-foreground">people online</span>
    </div>
  )
}
```

## Motion

Only digits roll; separators and symbols stay still. With reduced motion digits jump straight to their value. The formatted number is read from a visually hidden copy for screen readers.

## Related

[Animated Number](https://paneui.dev/docs/animated-number) counts smoothly instead of rolling digits; [Digit Swap](https://paneui.dev/docs/digit-swap).

## API Reference

### NumberTicker

A number whose digits roll like an odometer when `value` changes. Also accepts every prop of `span`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` (required) | `number` | — | The number to show. |
| `locale` | `string` | `runtime locale` | Locale for `Intl.NumberFormat`. |
| `format` | `Intl.NumberFormatOptions` | — | Currency, percent, compact, fraction digits and so on. |
| `startOnView` | `boolean` | `true` | Hold every digit at 0 until half the number scrolls into view, then roll. |
| `stagger` | `number` | `0.045` | Seconds between neighbouring digits, rippling from the right. |
| `transition` | `Transition` | `{ type: "spring", stiffness: 380, damping: 30, mass: 0.7 }` | motion transition merged over the default spring. |
| `digitClassName` | `string` | — | Classes for each rolling digit column. |

| Data attribute | Description |
| --- | --- |
| `data-slot` | "number-ticker" on the root, "number-ticker-digit" on each digit column. |
