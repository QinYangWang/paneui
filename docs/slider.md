# Slider

> Picks a value or range by dragging.

Page: https://paneui.dev/docs/slider/

## Installation

```bash
npx shadcn@latest add @paneui/slider
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/slider.json
```

Packages: `@base-ui/react`.

Registry items it builds on: `@paneui/theme`, `@paneui/control-size`.

## Usage

```tsx
import { Slider } from "@/components/ui/slider"
```

```tsx
<Slider defaultValue={40} aria-label="Creativity" />
```

## Examples

### Controlled

Use when the value is shown or used elsewhere.

```tsx
"use client"

import * as React from "react"

import { Slider } from "@/registry/base-nova/ui/slider"

export default function SliderControlled() {
  const [volume, setVolume] = React.useState(60)

  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">Volume</span>
        <span className="text-muted-foreground tabular-nums">{volume}%</span>
      </div>
      <Slider value={volume} onValueChange={(value) => setVolume(value as number)} aria-label="Volume" />
    </div>
  )
}
```

### Vertical

Use in tall, narrow spaces such as a mixer column.

```tsx
import { Slider } from "@/registry/base-nova/ui/slider"

const bands = [
  { label: "Bass", value: 70 },
  { label: "Mid", value: 45 },
  { label: "Treble", value: 60 },
]

export default function SliderVertical() {
  return (
    <div className="flex h-48 items-stretch justify-center gap-8">
      {bands.map((band) => (
        <div key={band.label} className="flex flex-col items-center gap-2">
          <div className="min-h-0 flex-1">
            <Slider orientation="vertical" defaultValue={band.value} aria-label={band.label} />
          </div>
          <span className="text-xs text-muted-foreground">{band.label}</span>
        </div>
      ))}
    </div>
  )
}
```

### Tick Count

Use when the steps matter, such as a rating.

```tsx
import { Slider } from "@/registry/base-nova/ui/slider"

export default function SliderTickCount() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      <span className="text-sm font-medium">Tip</span>
      <Slider
        defaultValue={15}
        min={0}
        max={25}
        step={5}
        ticks={6}
        showValue
        format={{ style: "unit", unit: "percent" }}
        aria-label="Tip"
      />
      <div className="flex justify-between text-xs text-muted-foreground tabular-nums">
        <span>0%</span>
        <span>25%</span>
      </div>
    </div>
  )
}
```

### Disabled

```tsx
import { Slider } from "@/registry/base-nova/ui/slider"

export default function SliderDisabled() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      <span className="text-sm font-medium">Storage limit (set by admin)</span>
      <Slider defaultValue={30} disabled aria-label="Storage limit" />
    </div>
  )
}
```

### Sizes

```tsx
import { Slider } from "@/registry/base-nova/ui/slider"

export default function SliderSizes() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-6">
      <Slider size="sm" defaultValue={30} aria-label="Small" />
      <Slider defaultValue={50} aria-label="Default" />
      <Slider size="lg" defaultValue={70} aria-label="Large" />
    </div>
  )
}
```

### RTL

```tsx
"use client"

import { DirectionProvider } from "@base-ui/react/direction-provider"
import { Slider } from "@/registry/base-nova/ui/slider"

export default function SliderRtl() {
  return (
    <DirectionProvider direction="rtl">
      <div dir="rtl" className="flex w-full max-w-xs flex-col gap-8">
        <div className="flex flex-col gap-3">
          <span className="text-sm font-medium">الإبداع</span>
          <Slider defaultValue={30} showValue aria-label="الإبداع" />
        </div>
        <div className="flex flex-col gap-3">
          <span className="text-sm font-medium">مستوى التفكير</span>
          <Slider defaultValue={1} min={0} max={4} step={1} ticks aria-label="مستوى التفكير" />
        </div>
      </div>
    </DirectionProvider>
  )
}
```

## Motion

With reduced motion the thumb and value bubble don't animate.

## Keyboard

Arrow keys move the focused thumb by `step`; Page Up / Page Down and Home / End jump further.

## Related

For a single value with the label on the track, see [Range Slider Inline](https://paneui.dev/docs/range-slider-inline).

## API Reference

Built on [the Slider primitive](https://base-ui.com/react/components/slider#api-reference). Only the props this library adds or changes are listed; everything else passes through.

### Slider

Inset track, primary fill and a raised thumb. Pass an array value for a range. Also accepts every prop of [Slider.Root](https://base-ui.com/react/components/slider#root).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | `"sm" \| "default" \| "lg"` | `"default"` | Thumb 16 / 20 / 24px on a 6 / 8 / 10px track. Inside a sized `Field` it takes the field's size (`xs` maps to `sm`). |
| `ticks` | `boolean \| number` | — | Dots along the track. `true` draws one per step; a number (2–101) draws that many, evenly spaced. |
| `showValue` | `boolean \| "always"` | — | `true` shows a value bubble over each thumb on hover, focus and drag; `"always"` keeps it up. |
| `getThumbLabel` | `(index: number) => string` | — | Accessible label per thumb, e.g. `(i) => (i ? "Max" : "Min")` for a range. |
| `min` | `number` | `0` | Lowest value. |
| `max` | `number` | `100` | Highest value. |
| `step` | `number` | `1` | Step between values. |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Layout direction. Vertical fills the parent's height, at least 160px. |
| `thumbAlignment` | `"edge" \| "center"` | `"edge"` | `edge` keeps the thumb inside the track at both ends (the primitive defaults to `center`). |
| `format` | `Intl.NumberFormatOptions` | — | Formats the value bubble, e.g. currency. |

| Data attribute | Description |
| --- | --- |
| `data-size` | On the root, the resolved size. |
| `data-dragging` | On the thumb while it is dragged (scaled up). |
| `data-active` | On a tick (`data-slot="slider-tick"`) inside the selected range. |
| `data-disabled` | Present when disabled. |
