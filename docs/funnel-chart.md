# Funnel Chart

> Shows how much drops off at each step of a process.

Page: https://paneui.dev/docs/funnel-chart/

## Installation

```bash
npx shadcn@latest add @paneui/funnel-chart
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/funnel-chart.json
```

Packages: `motion`.

Registry items it builds on: `@paneui/theme`, `@paneui/chart-utils`.

## Usage

```tsx
import { FunnelChart } from "@/components/ui/funnel-chart"
```

```tsx
<FunnelChart
  label="Signup funnel"
  unit="users"
  stages={[
    { id: "visit", label: "Visited", value: 18420 },
    { id: "signup", label: "Signed up", value: 6210 },
    { id: "paid", label: "Upgraded", value: 612 },
  ]}
/>
```

## Examples

### Single Color

```tsx
"use client"

import { FunnelChart } from "@/registry/base-nova/ui/funnel-chart"

const stages = [
  { id: "applied", label: "Applied", value: 1240 },
  { id: "screened", label: "Phone screen", value: 310 },
  { id: "onsite", label: "Onsite", value: 84 },
  { id: "offer", label: "Offer", value: 19 },
  { id: "hired", label: "Hired", value: 14 },
]

export default function FunnelChartSingleColor() {
  return (
    <div className="w-full max-w-xl">
      <FunnelChart stages={stages} color="var(--chart-1)" unit="candidates" label="Hiring funnel, Q3" />
    </div>
  )
}
```

### Horizontal

```tsx
"use client"

import { FunnelChart } from "@/registry/base-nova/ui/funnel-chart"

const stages = [
  { id: "cart", label: "Added to cart", value: 9820 },
  { id: "checkout", label: "Checkout", value: 5140 },
  { id: "shipping", label: "Shipping", value: 4320 },
  { id: "payment", label: "Payment", value: 3610 },
  { id: "complete", label: "Order placed", value: 3290 },
]

export default function FunnelChartHorizontal() {
  return (
    <div className="w-full max-w-2xl">
      <FunnelChart stages={stages} direction="horizontal" size={160} gap={6} unit="sessions" label="Checkout funnel" />
    </div>
  )
}
```

### Descriptions

```tsx
"use client"

import { FunnelChart } from "@/registry/base-nova/ui/funnel-chart"

const stages = [
  { id: "sent", label: "Emails sent", value: 48000, description: "October newsletter, one send." },
  { id: "opened", label: "Opened", value: 19700, description: "Apple Mail privacy opens excluded." },
  { id: "clicked", label: "Clicked", value: 3150, description: "Most clicks went to the pricing link." },
  { id: "converted", label: "Bought", value: 212, description: "Within 7 days of the click." },
]

export default function FunnelChartDescriptions() {
  return (
    <div className="w-full max-w-xl">
      <FunnelChart
        stages={stages}
        defaultActiveId="clicked"
        minRatio={0.12}
        size={64}
        label="Newsletter funnel"
        formatValue={(v) => Math.round(v).toLocaleString("en-US")}
      />
    </div>
  )
}
```

## Keyboard

Each stage is a tab stop; the arrow keys along the funnel's direction move to the next or previous stage. The tooltip shows share of the first stage, conversion from the previous one and the drop-off.

## API Reference

### FunnelChart

Also accepts every prop of `section`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `stages` (required) | `{ id: string; label: string; value: number; color?: string; description?: string }[]` | — | Stages from top to bottom. Duplicate ids and negative values are skipped. |
| `direction` | `"vertical" \| "horizontal"` | `"vertical"` | Vertical stacks rows with a values column; horizontal flows left to right with a label row. |
| `label` | `string` | `"Funnel"` | Accessible name. |
| `unit` | `string` | — | Noun after values in the tooltip. |
| `formatValue` | `(value: number) => string` | `formatNumber` | Formats stage values. |
| `size` | `number` | `56 vertical / 220 horizontal` | Vertical: height of each stage row. Horizontal: plot height. |
| `gap` | `number` | `4` | Gap between stages in px. |
| `color` | `string` | — | One colour for every stage, fading toward the background by depth (readable in light and dark). |
| `minRatio` | `number` | `0.08` | Smallest drawn thickness as a fraction of the largest stage. |
| `activeId` | `string \| null` | — | Controlled highlighted stage. |
| `defaultActiveId` | `string \| null` | — | Initially highlighted stage. |
| `onActiveChange` | `(id: string \| null) => void` | — | Called when the highlighted stage changes. |
