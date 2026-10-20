# Stat Card

> Card for a key metric and how it changed.

Page: https://paneui.dev/docs/stat-card/

## Installation

```bash
npx shadcn@latest add @paneui/stat-card
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/stat-card.json
```

Registry items it builds on: `@paneui/theme`, `@paneui/icons`, `@paneui/badge`, `@paneui/sparkline`.

## Usage

```tsx
import {
  StatCard,
  StatCardDelta,
  StatCardFooter,
  StatCardHeader,
  StatCardHint,
  StatCardLabel,
  StatCardSparkline,
  StatCardValue,
} from "@/components/ui/stat-card"
```

```tsx
<StatCard>
  <StatCardHeader>
    <StatCardLabel>Recurring revenue</StatCardLabel>
    <StatCardDelta value={12.4} />
  </StatCardHeader>
  <StatCardValue>$48,210</StatCardValue>
  <StatCardFooter>
    <StatCardHint>vs. last month</StatCardHint>
    <StatCardSparkline values={trend} />
  </StatCardFooter>
</StatCard>
```

## Composition

```text
StatCard
├── StatCardHeader
│   ├── StatCardLabel
│   └── StatCardDelta
├── StatCardValue
└── StatCardFooter
    ├── StatCardHint
    └── StatCardSparkline
```

## Examples

### With Number Ticker

Use for live numbers that change while the page is open.

```tsx
"use client"

import * as React from "react"

import { Button } from "@/registry/base-nova/ui/button"
import { NumberTicker } from "@/registry/base-nova/ui/number-ticker"
import { StatCard, StatCardDelta, StatCardHeader, StatCardHint, StatCardLabel, StatCardValue } from "@/registry/base-nova/ui/stat-card"

export default function StatCardWithTicker() {
  const [runs, setRuns] = React.useState(92318)
  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      <StatCard>
        <StatCardHeader>
          <StatCardLabel>Agent runs</StatCardLabel>
          <StatCardDelta value={18.9} />
        </StatCardHeader>
        <StatCardValue>
          <NumberTicker value={runs} locale="en-US" />
        </StatCardValue>
        <StatCardHint>This month</StatCardHint>
      </StatCard>
      <Button variant="secondary" size="sm" onClick={() => setRuns((r) => r + 1280)}>
        Add a batch
      </Button>
    </div>
  )
}
```

## Tone

`StatCardDelta` takes its tone from the sign, success for a rise, destructive for a fall and neutral at zero. Pass `invert` for metrics where up is bad (churn, latency, errors). `StatCardSparkline` follows the same tone unless you give it a text colour.

## API Reference

### StatCard

Raised card (`rounded-xl`, `shadow-raised`, 16px padding) that shares the delta's tone with the sparkline. Also accepts every prop of `div`.

| Data attribute | Description |
| --- | --- |
| `data-tone` | `positive`, `negative` or `neutral`, from the delta. |

### StatCardDelta

Also accepts every prop of `Badge`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` (required) | `number` | — | The change; its sign sets the arrow. |
| `unit` | `string` | `"%"` | Suffix after the number. |
| `invert` | `boolean` | `false` | A rise is bad. |
| `precision` | `number` | `1` | Decimal places. |

### StatCardSparkline

A 96 × 36 sparkline tinted by the card's tone. Also accepts every prop of `Sparkline`.

### StatCardLabel, StatCardValue, StatCardHint, StatCardHeader, StatCardFooter

Layout parts. The value is `text-2xl` semibold with tabular numbers. Also accepts every prop of `div`.
