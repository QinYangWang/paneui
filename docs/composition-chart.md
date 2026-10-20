# Composition Chart

> Charts how each part's share of a whole changes over time.

Page: https://paneui.dev/docs/composition-chart/

## Installation

```bash
npx shadcn@latest add @paneui/composition-chart
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/composition-chart.json
```

Packages: `motion`.

Registry items it builds on: `@paneui/theme`, `@paneui/chart-utils`.

## Usage

```tsx
import { CompositionChart } from "@/components/ui/composition-chart"
```

```tsx
<CompositionChart
  label="Traffic mix"
  series={[
    { id: "organic", label: "Organic" },
    { id: "paid", label: "Paid" },
  ]}
  data={[
    { label: "Jan", values: { organic: 4200, paid: 3100 } },
    { label: "Feb", values: { organic: 4500, paid: 2900 } },
  ]}
/>
```

## Examples

### Area

```tsx
"use client"

import { CompositionChart } from "@/registry/base-nova/ui/composition-chart"

const series = [
  { id: "mobile", label: "Mobile" },
  { id: "desktop", label: "Desktop" },
  { id: "tablet", label: "Tablet" },
]

const weeks = ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8"]
const mobile = [52, 54, 55, 58, 57, 60, 62, 63]
const tablet = [9, 9, 8, 8, 7, 7, 7, 6]

const data = weeks.map((label, i) => ({
  label,
  values: { mobile: mobile[i] * 120, desktop: (100 - mobile[i] - tablet[i]) * 120, tablet: tablet[i] * 120 },
}))

export default function CompositionChartArea() {
  return (
    <div className="w-full max-w-2xl">
      <CompositionChart series={series} data={data} mode="area" height={220} label="Orders by device, last 8 weeks" />
    </div>
  )
}
```

### Default Hidden

```tsx
"use client"

import { CompositionChart } from "@/registry/base-nova/ui/composition-chart"

const series = [
  { id: "compute", label: "Compute" },
  { id: "storage", label: "Storage" },
  { id: "network", label: "Network" },
  { id: "support", label: "Support" },
]

const data = [
  { label: "Q1", values: { compute: 18400, storage: 6200, network: 3100, support: 2400 } },
  { label: "Q2", values: { compute: 21900, storage: 6900, network: 3800, support: 2400 } },
  { label: "Q3", values: { compute: 24800, storage: 7600, network: 4400, support: 2600 } },
  { label: "Q4", values: { compute: 23100, storage: 8300, network: 4100, support: 2600 } },
]

const usd = (v: number) => v.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })

export default function CompositionChartDefaultHidden() {
  return (
    <div className="w-full max-w-2xl">
      <CompositionChart
        series={series}
        data={data}
        defaultHidden={["support"]}
        formatValue={usd}
        label="Cloud spend by category, 2026"
      />
    </div>
  )
}
```

### Controlled

```tsx
"use client"

import * as React from "react"

import { Button } from "@/registry/base-nova/ui/button"
import { CompositionChart } from "@/registry/base-nova/ui/composition-chart"

const series = [
  { id: "new", label: "New", color: "var(--chart-1)" },
  { id: "returning", label: "Returning", color: "var(--chart-4)" },
  { id: "reactivated", label: "Reactivated", color: "var(--chart-2)" },
]

const months = ["May", "Jun", "Jul", "Aug", "Sep", "Oct"]
const data = months.map((label, i) => ({
  label,
  values: { new: 820 + i * 60, returning: 2400 + i * 140, reactivated: 310 - i * 20 },
}))

export default function CompositionChartControlled() {
  const [hidden, setHidden] = React.useState<string[]>(["reactivated"])
  return (
    <div className="flex w-full max-w-2xl flex-col gap-3">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm text-muted-foreground">
          {hidden.length ? `Hiding ${hidden.length} of ${series.length} series` : "Showing all customers"}
        </span>
        <Button variant="ghost" size="sm" disabled={!hidden.length} onClick={() => setHidden([])}>
          Show all
        </Button>
      </div>
      <CompositionChart
        series={series}
        data={data}
        hidden={hidden}
        onHiddenChange={setHidden}
        label="Active customers by type"
      />
    </div>
  )
}
```

## Keyboard

Focus the plot, then `ArrowLeft` / `ArrowRight` step through periods, `Home` / `End` jump to the ends and `Esc` clears. Legend pills are buttons with `aria-pressed`.

## API Reference

### CompositionChart

100% stacked chart of each visible series' share per period. The last visible series can't be hidden. Also accepts every prop of `section`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `series` (required) | `{ id: string; label: string; color?: string }[]` | — | Series in stacking order (bottom first). Colours default to the chart palette. |
| `data` (required) | `{ label: string; values: Record<string, number> }[]` | — | Raw values per period keyed by series id; missing values count as 0. |
| `mode` | `"bar" \| "area"` | `"bar"` | Stacked bars or stacked areas. |
| `label` | `string` | `"Composition chart"` | Accessible name. |
| `height` | `number` | `260` | Plot height in px, including the x axis. |
| `formatValue` | `(value: number) => string` | `formatNumber` | Raw values in the tooltip. |
| `showLegend` | `boolean` | `true` | Show the toggleable legend. |
| `defaultHidden` | `string[]` | — | Series hidden on first render. |
| `hidden` | `string[]` | — | Controlled hidden series ids. Replaces the HTML `hidden` attribute, which the chart does not forward. |
| `onHiddenChange` | `(hidden: string[]) => void` | — | Called when a series is toggled. |
