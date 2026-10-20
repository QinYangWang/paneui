# Chart Utils

> Shared helpers for building and styling your own charts.

Page: https://paneui.dev/docs/chart-utils/

## Installation

```bash
npx shadcn@latest add @paneui/chart-utils
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/chart-utils.json
```

Packages: `motion`.

Registry items it builds on: `@paneui/theme`.

## Usage

```tsx
import { chartColor, ChartLegend, ChartLegendItem } from "@/components/ui/chart-utils"
```

```tsx
<ChartLegend>
  <ChartLegendItem color={chartColor(0)} value="42%">Rent</ChartLegendItem>
</ChartLegend>
```

## Examples

### Chart Number

```tsx
"use client"

import * as React from "react"

import { Button } from "@/registry/base-nova/ui/button"
import { ChartNumber, formatCompact, formatPercent } from "@/registry/base-nova/ui/chart-utils"

const RANGES = [
  { label: "7 days", revenue: 48200, growth: 0.031 },
  { label: "30 days", revenue: 212900, growth: 0.084 },
  { label: "12 months", revenue: 2480000, growth: 0.226 },
]

export default function ChartUtilsNumber() {
  const [range, setRange] = React.useState(1)
  const r = RANGES[range]
  return (
    <div className="flex w-full max-w-xs flex-col gap-4 rounded-xl bg-card p-5 shadow-raised">
      <div className="flex gap-1">
        {RANGES.map((x, i) => (
          <Button key={x.label} size="xs" variant={i === range ? "secondary" : "ghost"} onClick={() => setRange(i)}>
            {x.label}
          </Button>
        ))}
      </div>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs text-muted-foreground">Revenue</p>
          <p className="text-2xl font-semibold tracking-tight">
            <ChartNumber value={r.revenue} format={(v) => `$${formatCompact(v)}`} />
          </p>
        </div>
        <p className="text-sm font-medium text-success">
          <ChartNumber value={r.growth} format={(v) => `+${formatPercent(v)}`} />
        </p>
      </div>
    </div>
  )
}
```

### Tooltip

```tsx
"use client"

import * as React from "react"

import {
  ChartTooltip,
  ChartTooltipRow,
  ChartTooltipTitle,
  chartColor,
  formatNumber,
  niceDomain,
  scaleBand,
  scaleLinear,
  useChartSize,
} from "@/registry/base-nova/ui/chart-utils"

const WEEK = [
  { day: "Mon", steps: 8420 },
  { day: "Tue", steps: 10230 },
  { day: "Wed", steps: 6120 },
  { day: "Thu", steps: 12890 },
  { day: "Fri", steps: 9310 },
  { day: "Sat", steps: 15400 },
  { day: "Sun", steps: 4870 },
]

export default function ChartUtilsTooltip() {
  const [ref, size] = useChartSize()
  const [active, setActive] = React.useState<number | null>(null)
  const x = scaleBand(WEEK.length, [0, size.width], 0.3)
  const [, top] = niceDomain([0, Math.max(...WEEK.map((d) => d.steps))])
  const y = scaleLinear([0, top], [size.height, 0])
  const color = chartColor(0)
  const point = active === null ? null : WEEK[active]

  return (
    <div className="w-full max-w-md rounded-xl bg-card p-4 shadow-raised">
      <p className="mb-3 text-sm font-medium">Steps this week</p>
      <div
        ref={ref}
        className="relative h-40"
        onPointerMove={(e) => setActive(x.indexAt(e.clientX - e.currentTarget.getBoundingClientRect().left))}
        onPointerLeave={() => setActive(null)}
      >
        <svg
          width={size.width}
          height={size.height}
          style={{ "--bar": color } as React.CSSProperties}
          className="absolute inset-0 fill-(--bar)"
          aria-hidden
        >
          {WEEK.map((d, i) => (
            <rect
              key={d.day}
              x={x(i)}
              y={y(d.steps)}
              width={x.bandwidth}
              height={Math.max(0, size.height - y(d.steps))}
              rx={4}
              opacity={active === null || active === i ? 1 : 0.4}
            />
          ))}
        </svg>
        <ChartTooltip
          open={point !== null}
          bounds={size}
          x={active === null ? 0 : x(active) + x.bandwidth / 2}
          y={point ? y(point.steps) : 0}
        >
          {point && (
            <>
              <ChartTooltipTitle>{point.day}</ChartTooltipTitle>
              <ChartTooltipRow color={color} label="Steps" value={formatNumber(point.steps)} />
            </>
          )}
        </ChartTooltip>
      </div>
    </div>
  )
}
```

### Legend

```tsx
"use client"

import * as React from "react"

import { ChartLegend, ChartLegendItem, chartColor, formatPercent } from "@/registry/base-nova/ui/chart-utils"

const SPEND = [
  { name: "Rent", share: 0.42 },
  { name: "Groceries", share: 0.18 },
  { name: "Transport", share: 0.11 },
  { name: "Dining out", share: 0.09 },
  { name: "Subscriptions", share: 0.06 },
  { name: "Travel", share: 0.08 },
  { name: "Other", share: 0.06 },
]

export default function ChartUtilsLegend() {
  const [hidden, setHidden] = React.useState<string[]>(["Other"])
  const [hovered, setHovered] = React.useState<string | null>(null)
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <div className="flex h-3 overflow-hidden rounded-full bg-muted">
        {SPEND.map((s, i) =>
          hidden.includes(s.name) ? null : (
            <span
              key={s.name}
              style={{ "--share": `${s.share * 100}%`, "--color": chartColor(i) } as React.CSSProperties}
              className={hovered && hovered !== s.name ? "w-(--share) bg-(--color) opacity-40" : "w-(--share) bg-(--color)"}
            />
          )
        )}
      </div>
      <ChartLegend>
        {SPEND.map((s, i) => (
          <ChartLegendItem
            key={s.name}
            color={chartColor(i)}
            value={formatPercent(s.share, 0)}
            inactive={hidden.includes(s.name)}
            highlighted={hovered === s.name}
            aria-pressed={!hidden.includes(s.name)}
            onPointerEnter={() => setHovered(s.name)}
            onPointerLeave={() => setHovered(null)}
            onClick={() => setHidden((h) => (h.includes(s.name) ? h.filter((n) => n !== s.name) : [...h, s.name]))}
          >
            {s.name}
          </ChartLegendItem>
        ))}
      </ChartLegend>
    </div>
  )
}
```

### Scales and Ticks

```tsx
import type * as React from "react"

import { formatCompact, niceDomain, scaleLinear } from "@/registry/base-nova/ui/chart-utils"

const RAW: [number, number] = [1830, 47260]

export default function ChartUtilsScales() {
  const domain = niceDomain(RAW)
  const scale = scaleLinear(domain, [0, 100])
  const ticks = scale.ticks(5)
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <p className="text-xs text-muted-foreground tabular-nums">
        Data {formatCompact(RAW[0])}–{formatCompact(RAW[1])} → nice domain {formatCompact(domain[0])}–{formatCompact(domain[1])}
      </p>
      <div className="relative h-8 border-t border-border">
        {ticks.map((t) => (
          <span
            key={t}
            className="absolute top-0 left-(--x) flex -translate-x-1/2 flex-col items-center gap-1 text-xs text-muted-foreground tabular-nums"
            style={{ "--x": `${scale(t)}%` } as React.CSSProperties}
          >
            <span className="h-1.5 w-px bg-border" />
            {formatCompact(t)}
          </span>
        ))}
      </div>
    </div>
  )
}
```

## Motion

`useChartTransition`, `ChartNumber` and `ChartTooltip` all become instant under reduced motion.

## Accessibility

`ChartNumber` keeps the final value in a screen-reader-only span, `ChartTooltip` is a polite live region, and `ChartDataTable` renders an `sr-only` table mirror of a chart's data.

## API Reference

### ChartNumber

Number that springs between values. Also accepts every prop of `span`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` (required) | `number` | — | Value to show. |
| `format` | `(value: number) => string` | `formatNumber` | Formatter applied to every frame. |

### ChartTooltip

In-chart floating surface that follows a data point. Place it inside a positioned chart container; no portal. Also accepts every prop of [motion.div](https://motion.dev/docs/react-motion-component).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `x` (required) | `number` | — | Anchor x in px, relative to the chart container. |
| `y` (required) | `number` | — | Anchor y in px. |
| `open` (required) | `boolean` | — | Show or hide the tooltip. |
| `bounds` (required) | `{ width: number; height: number }` | — | Container size, used to keep the tooltip inside it. |
| `side` | `"top" \| "bottom" \| "left" \| "right"` | `"top"` | Preferred side. |
| `offset` | `number` | `12` | Gap from the anchor in px. |
| `avoidCollisions` | `boolean` | `true` | Flip to the opposite side when the preferred side leaves the bounds. |

| Data attribute | Description |
| --- | --- |
| `data-side` | The side actually used after flipping. |

### ChartTooltipTitle

Also accepts every prop of `div`.

### ChartTooltipRow

Also accepts every prop of `div`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` (required) | `ReactNode` | — | Series name. |
| `value` (required) | `ReactNode` | — | Formatted value, right-aligned. |
| `color` | `string` | — | Swatch colour before the label. |

### ChartSwatch

Also accepts every prop of `span`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `color` (required) | `string` | — | CSS colour of the swatch. |

### ChartLegend

Wrapping row of legend items. Also accepts every prop of `div`.

### ChartLegendItem

Legend entry, rendered as a button. Also accepts every prop of `button`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `color` (required) | `string` | — | Series colour. |
| `inactive` | `boolean` | — | Dimmed with a hollow swatch (series toggled off). |
| `highlighted` | `boolean` | — | Emphasised because the matching mark is hovered. |
| `value` | `ReactNode` | — | Optional trailing value (share, count…). |

| Data attribute | Description |
| --- | --- |
| `data-inactive` | Present when `inactive`. |
| `data-highlighted` | Present when `highlighted`. |

### ChartDataTable

Screen-reader-only table mirror of a chart. Takes no other props.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `caption` (required) | `string` | — | Table caption. |
| `columns` (required) | `readonly string[]` | — | Column headers. |
| `rows` (required) | `readonly (readonly ReactNode[])[]` | — | Rows; the first cell is the row header. |

### chartColor

`chartColor(index)` returns the series colour, `--chart-1…8` first (each falls back to a semantic token), then blends for indexes past eight. `CHART_COLORS` holds the base eight.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `index` (required) | `number` | — | Series index. |

### chartAlpha

`chartAlpha(color, percent)` mixes a colour toward transparent for fills.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `color` (required) | `string` | — | Any CSS colour. |
| `percent` (required) | `number` | — | Opacity, 0–100. |

### onFill

`onFill(fill)` returns a readable label colour for text drawn on that fill, white on dark fills, near-black on light ones (CSS relative colour). Set it as the inline `fill` and keep a `fill-white` class as the fallback for browsers without relative colour. Used by treemap, candlestick and funnel labels.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `fill` (required) | `string` | — | The fill colour behind the label (any CSS colour or `var(--token)`). |

### scaleLinear

`scaleLinear(domain, range)` maps values to pixels; the result also has `domain`, `range`, `invert(px)` and `ticks(count = 5)`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `domain` (required) | `readonly [number, number]` | — | Input extent. |
| `range` (required) | `readonly [number, number]` | — | Output extent in px. |

### scaleBand

`scaleBand(count, range, padding)` returns the x of band `i`, plus `bandwidth`, `step` and `indexAt(px)`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `count` (required) | `number` | — | Number of bands. |
| `range` (required) | `readonly [number, number]` | — | Output extent in px. |
| `padding` | `number` | `0.2` | Share (0–1) of each step left empty. |

### niceDomain

`niceDomain([lo, hi], count = 5)` rounds a domain outward to tidy tick boundaries.

### formatCompact / formatNumber / formatPercent

`formatCompact(1284000)` → `1.3M`; `formatNumber` keeps up to 2 decimals; `formatPercent(share, digits = 1)` turns 0.42 into `42.0%`. `clamp(value, min, max)` and `seededRandom(seed)`, for deterministic demo data, are also exported.

### useChartSize

`const [ref, size] = useChartSize()` observes an element's content box with ResizeObserver.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `initial` | `{ width: number; height: number }` | `{ width: 0, height: 0 }` | Size before the first measure. |

### useChartTransition

Returns the house chart spring (`CHART_SPRING`), or `{ duration: 0 }` under reduced motion.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `delay` | `number` | `0` | Delay in seconds. |

### useActiveId

`const [active, setActive] = useActiveId(value, defaultValue, onChange)` holds the controlled or uncontrolled active id shared by the charts.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `controlled` | `T \| null \| undefined` | — | Controlled value; `undefined` means uncontrolled. |
| `defaultValue` | `T \| null \| undefined` | — | Initial value when uncontrolled. |
| `onChange` | `(id: T \| null) => void` | — | Called on every change. |

### useChartId

`useChartId(prefix)` returns a DOM-safe id for SVG defs.

### useHoverCapable

`true` when the device matches `(hover: hover)`, for hover-vs-tap tooltips.
