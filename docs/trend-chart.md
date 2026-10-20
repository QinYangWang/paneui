# Trend Chart

> Plots how values change over time.

Page: https://paneui.dev/docs/trend-chart/

## Installation

```bash
npx shadcn@latest add @paneui/trend-chart
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/trend-chart.json
```

Packages: `motion`.

Registry items it builds on: `@paneui/theme`, `@paneui/chart-utils`.

## Usage

```tsx
import { TrendChart } from "@/components/ui/trend-chart"
```

```tsx
<TrendChart
  series={[{ id: "pro", label: "Pro" }, { id: "team", label: "Team" }]}
  data={[{ label: "Jan", values: { pro: 120, team: 80 } }, { label: "Feb", values: { pro: 140, team: 95 } }]}
  variant="area"
  stacked
/>
```

## Examples

### Single Series

```tsx
"use client"

import { TrendChart } from "@/registry/base-nova/ui/trend-chart"

const data = Array.from({ length: 30 }, (_, i) => ({ label: `Oct ${i + 1}`, values: { signups: 30 + ((i * 17) % 23) + Math.round(i / 2) } }))

export default function TrendChartSingle() {
  return (
    <div className="w-full max-w-2xl">
      <TrendChart series={[{ id: "signups", label: "Sign-ups" }]} data={data} variant="bar" height={200} label="Daily sign-ups" />
    </div>
  )
}
```

## Which chart

TrendChart plots absolute values over time. For shares of a whole over time use [Composition Chart](https://paneui.dev/docs/composition-chart); for parts of one total, [Donut Chart](https://paneui.dev/docs/donut-chart).

## Interaction

Hovering (or tapping) shows a crosshair and a tooltip with every series and the stack total. Legend items toggle series. A hidden data table mirrors the values for screen readers.

## Motion

The plot wipes in left to right when the variant or the number of points changes; under reduced motion it appears at once.

## API Reference

### TrendChart

Also accepts every prop of `figure`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `series` (required) | `{ id: string; label: string; color?: string }[]` | — | Series, drawn in chart-1… unless `color` is set. |
| `data` (required) | `{ label: string; values: Record<string, number> }[]` | — | Points, in order. |
| `variant` | `"area" \| "line" \| "bar"` | `"area"` | Mark. |
| `stacked` | `boolean` | `false` | Stack areas and bars. |
| `height` | `number` | `240` | Plot height in px. |
| `formatValue` | `(v: number) => string` | — | Tooltip values. |
| `formatAxis` | `(v: number) => string` | — | Axis ticks (default compact). |
| `maxXLabels` | `number` | `6` | Most x labels shown. |
| `showLegend` | `boolean` | `true` | Legend toggles (only with 2+ series). |
| `showYAxis` | `boolean` | `true` | Value axis labels. |
| `label` | `string` | — | Accessible name. |
