# Sparkline

> Small inline chart that shows a trend.

Page: https://paneui.dev/docs/sparkline/

## Installation

```bash
npx shadcn@latest add @paneui/sparkline
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/sparkline.json
```

Packages: `motion`.

Registry items it builds on: `@paneui/theme`.

## Usage

```tsx
import { Sparkline } from "@/components/ui/sparkline"
```

```tsx
<Sparkline values={[12, 14, 13, 17, 19, 22]} label="Revenue, up 83%" className="h-8 w-24 text-success" />
```

## Examples

### Variants

```tsx
import { Sparkline } from "@/registry/base-nova/ui/sparkline"

const values = [4, 6, 5, 8, 7, 9, 12, 10, 13, 15]

export default function SparklineVariants() {
  return (
    <div className="grid w-full max-w-sm grid-cols-3 gap-4">
      {(["area", "line", "bar"] as const).map((v) => (
        <div key={v} className="flex flex-col gap-2">
          <div className="text-chart-1"><Sparkline values={values} variant={v} className="h-10" /></div>
          <span className="text-center text-xs text-muted-foreground">{v}</span>
        </div>
      ))}
    </div>
  )
}
```

### Gaps

```tsx
import { Sparkline } from "@/registry/base-nova/ui/sparkline"

// A sensor that dropped two readings, and a new metric with no data yet.
const latency = [42, 40, 44, null, null, 47, 45, 49, null, 52, 50, 54]

export default function SparklineGaps() {
  return (
    <div className="grid w-full max-w-md grid-cols-[auto_minmax(0,1fr)] items-center gap-x-4 gap-y-3 text-sm">
      {(["bridge", "break", "zero"] as const).map((gap) => (
        <div key={gap} className="contents">
          <span className="font-mono text-ui-sm text-muted-foreground">{gap}</span>
          <div className="text-chart-1">
            <Sparkline values={latency} gap={gap} variant="line" label={`Latency, gap ${gap}`} className="h-8" />
          </div>
        </div>
      ))}
      <span className="font-mono text-ui-sm text-muted-foreground">bars</span>
      <div className="text-chart-3">
        <Sparkline values={latency} variant="bar" label="Latency per hour" className="h-8" />
      </div>
      <span className="font-mono text-ui-sm text-muted-foreground">empty</span>
      <div className="text-muted-foreground">
        <Sparkline values={[]} label="No data yet" className="h-8" />
      </div>
    </div>
  )
}
```

## Colour and size

The chart draws in `currentColor`, so tint it with a text token (`text-success`, `text-chart-1`). It stretches to its box, so size it with `h-*` and `w-*` (default 36px tall, full width).

## Missing data

`null`, `undefined` and `NaN` are gaps. `bridge` joins the known points either side with a faint dashed line (bars get a faint stub), `break` leaves the space empty and `zero` plots 0. A series with no points, or one point, draws a flat dashed baseline, plus a dot for the point.

## Accessibility

With `label` it is an `img` with that name; without one it is decorative (`aria-hidden`). Put the number it summarises in text next to it.

## API Reference

### Sparkline

Also accepts every prop of `svg`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `values` (required) | `readonly (number \| null \| undefined)[]` | — | The series, oldest first. `null`, `undefined` and `NaN` are missing points. |
| `gap` | `"bridge" \| "break" \| "zero"` | `"bridge"` | How missing points draw. |
| `variant` | `"area" \| "line" \| "bar"` | `"area"` | Shape. |
| `label` | `string` | — | Accessible summary. Omit to make the chart decorative. |
| `animate` | `boolean` | `true` | Draw in on mount (always off under reduced motion). |
