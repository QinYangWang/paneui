# Donut Chart

> Shows how parts make up a whole as a ring.

Page: https://paneui.dev/docs/donut-chart/

## Installation

```bash
npx shadcn@latest add @paneui/donut-chart
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/donut-chart.json
```

Packages: `motion`.

Registry items it builds on: `@paneui/theme`, `@paneui/chart-utils`.

## Usage

```tsx
import { DonutChart } from "@/components/ui/donut-chart"
```

```tsx
<DonutChart
  label="Revenue by plan"
  totalLabel="Revenue"
  segments={[
    { id: "pro", label: "Pro", value: 48200 },
    { id: "team", label: "Team", value: 26400 },
    { id: "free", label: "Free", value: 3100 },
  ]}
/>
```

## Examples

### Legend Below

```tsx
"use client"

import { DonutChart } from "@/registry/base-nova/ui/donut-chart"

const segments = [
  { id: "ios", label: "iOS", value: 5820 },
  { id: "android", label: "Android", value: 4310 },
  { id: "web", label: "Web", value: 2140 },
]

export default function DonutChartLegendBottom() {
  return (
    <div className="w-full max-w-xs">
      <DonutChart
        segments={segments}
        legendPosition="bottom"
        totalLabel="Sessions"
        label="Sessions by platform"
        maxSize={200}
      />
    </div>
  )
}
```

### Custom Colors

```tsx
"use client"

import { DonutChart } from "@/registry/base-nova/ui/donut-chart"

const segments = [
  { id: "passed", label: "Passed", value: 412, color: "var(--success)" },
  { id: "flaky", label: "Flaky", value: 23, color: "var(--warning)" },
  { id: "failed", label: "Failed", value: 9, color: "var(--destructive)" },
  { id: "skipped", label: "Skipped", value: 31, color: "var(--muted-foreground)" },
]

export default function DonutChartCustomColors() {
  return (
    <div className="w-full max-w-xl">
      <DonutChart segments={segments} totalLabel="Tests" label="Test results for the last run" />
    </div>
  )
}
```

### Thin Ring

```tsx
"use client"

import { DonutChart } from "@/registry/base-nova/ui/donut-chart"

const segments = [
  { id: "used", label: "Used", value: 68, color: "var(--chart-1)" },
  { id: "free", label: "Free", value: 32, color: "var(--muted-foreground)" },
]

export default function DonutChartThinRing() {
  return (
    <div className="w-full max-w-48">
      <DonutChart
        segments={segments}
        thickness={10}
        gap={8}
        maxSize={180}
        showLegend={false}
        formatValue={(v) => `${v} GB`}
        totalLabel="Storage"
        label="Storage used"
      />
    </div>
  )
}
```

### Descriptions

```tsx
"use client"

import { DonutChart } from "@/registry/base-nova/ui/donut-chart"

const usd = (v: number) => v.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })

const segments = [
  { id: "housing", label: "Housing", value: 1850, description: "Rent and renters insurance" },
  { id: "food", label: "Food", value: 640, description: "Groceries and eating out" },
  { id: "transport", label: "Transport", value: 210, description: "Transit pass and rideshare" },
  { id: "savings", label: "Savings", value: 900, description: "Auto-transfer on the 1st" },
]

export default function DonutChartDescriptions() {
  return (
    <div className="w-full max-w-xl">
      <DonutChart segments={segments} formatValue={usd} totalLabel="Spent" label="Monthly budget, October" />
    </div>
  )
}
```

### Controlled

```tsx
"use client"

import * as React from "react"

import { DonutChart } from "@/registry/base-nova/ui/donut-chart"

const usd = (v: number) => v.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })

const segments = [
  { id: "rent", label: "Rent", value: 1850 },
  { id: "groceries", label: "Groceries", value: 640 },
  { id: "transport", label: "Transport", value: 210 },
  { id: "dining", label: "Dining out", value: 380 },
  { id: "subscriptions", label: "Subscriptions", value: 95 },
]

export default function DonutChartControlled() {
  const [active, setActive] = React.useState<string | null>("groceries")
  const current = segments.find((s) => s.id === active)
  return (
    <div className="flex w-full max-w-xl flex-col gap-4">
      <DonutChart
        segments={segments}
        formatValue={usd}
        totalLabel="Spending"
        label="October spending"
        activeId={active}
        onActiveChange={(id) => setActive(id ?? "groceries")}
      />
      <p className="text-center text-sm text-muted-foreground">
        Highlighted: <span className="font-medium text-foreground">{current?.label}</span>
      </p>
    </div>
  )
}
```

## Keyboard

Each segment is a tab stop. Arrow keys cycle between segments, `Esc` blurs. The centre readout and legend follow the focused segment, and a hidden table mirrors the data for screen readers.

## Motion

With reduced motion, segments appear at once instead of drawing in.

## API Reference

### DonutChart

Also accepts every prop of `div`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `segments` (required) | `{ id: string; label: string; value: number; color?: string; description?: string }[]` | — | Slices in order. Non-positive values are skipped. `description` shows under the label in the legend and is read with the segment. |
| `label` | `string` | `"Donut chart"` | Accessible name of the chart. |
| `thickness` | `number` | `22` | Ring thickness in viewBox units (the box is 200×200). |
| `gap` | `number` | `4` | Gap between segments in viewBox units. Ends are rounded when every segment is long enough for round caps; otherwise all ends are square, so small segments never overlap their neighbours. |
| `formatValue` | `(value: number) => string` | `formatNumber` | Formats values in the centre, legend and tooltip. |
| `totalLabel` | `string` | `the locale's` | Centre caption when nothing is hovered. |
| `maxSize` | `number` | `240` | Max ring diameter in px; it shrinks with its container. |
| `showLegend` | `boolean` | `true` | Show the value / share legend. |
| `legendPosition` | `"side" \| "bottom"` | `"side"` | `side` sits beside the ring from the `sm` breakpoint. |
| `activeId` | `string \| null` | — | Controlled highlighted segment. |
| `defaultActiveId` | `string \| null` | — | Initially highlighted segment. |
| `onActiveChange` | `(id: string \| null) => void` | — | Called on hover, focus and leave. |
