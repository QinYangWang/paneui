# Range Slider Inline

> Slider that shows its label and value on the track.

Page: https://paneui.dev/docs/range-slider-inline/

## Installation

```bash
npx shadcn@latest add @paneui/range-slider-inline
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/range-slider-inline.json
```

Packages: `@base-ui/react`.

Registry items it builds on: `@paneui/theme`.

## Usage

```tsx
import { RangeSliderInline } from "@/components/ui/range-slider-inline"
```

```tsx
<RangeSliderInline label="Volume" defaultValue={64} />
```

## Examples

### Stops

```tsx
import { RangeSliderInline } from "@/registry/base-nova/ui/range-slider-inline"

export default function RangeSliderInlineStops() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <RangeSliderInline label="Snaps to stops" defaultValue={44} snapToStops />
      <RangeSliderInline label="Free" defaultValue={44} />
      <RangeSliderInline label="No stops" defaultValue={44} showStops={false} />
    </div>
  )
}
```

### Custom Range and Format

Use for units such as prices or percentages.

```tsx
"use client"

import { RangeSliderInline } from "@/registry/base-nova/ui/range-slider-inline"

export default function RangeSliderInlineFormat() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <RangeSliderInline
        label="Max tokens"
        min={256}
        max={8192}
        step={256}
        defaultValue={2048}
        formatValue={(v) => v.toLocaleString("en-US")}
      />
      <RangeSliderInline
        label="Timeout"
        min={5}
        max={120}
        step={5}
        defaultValue={30}
        formatValue={(v) => `${v}s`}
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
import { RangeSliderInline } from "@/registry/base-nova/ui/range-slider-inline"

export default function RangeSliderInlineControlled() {
  const [volume, setVolume] = React.useState(40)
  const [saved, setSaved] = React.useState(40)

  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <RangeSliderInline
        label="Alert volume"
        value={volume}
        onValueChange={setVolume}
        onValueCommitted={(v) => setSaved(v as number)}
        formatValue={(v) => `${v}%`}
      />
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs text-muted-foreground tabular-nums">Saved at {saved}%</span>
        <Button variant="ghost" size="sm" onClick={() => setVolume(40)}>
          Reset
        </Button>
      </div>
    </div>
  )
}
```

### Disabled

```tsx
"use client"

import { RangeSliderInline } from "@/registry/base-nova/ui/range-slider-inline"

export default function RangeSliderInlineDisabled() {
  return (
    <div className="w-full max-w-sm">
      <RangeSliderInline label="Bitrate" defaultValue={70} disabled formatValue={(v) => `${v * 4} kbps`} />
    </div>
  )
}
```

## Motion

Clicked or keyed values ease over 300ms, and drags track the pointer directly. The thumb fades out while it crosses the label or readout. With reduced motion everything moves instantly.

## Related

For a plain single or two-thumb slider, use [Slider](https://paneui.dev/docs/slider).

## API Reference

Built on [the Slider primitive](https://base-ui.com/react/components/slider#api-reference). Only the props this library adds or changes are listed; everything else passes through.

### RangeSliderInline

A raised fill inside an inset well, with the label and value printed on the track. Single value only. Also accepts every prop of [Slider.Root](https://base-ui.com/react/components/slider#root).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `number` | — | Controlled value. |
| `defaultValue` | `number` | `min` | Initial value when uncontrolled. |
| `onValueChange` | `(value: number, details: Slider.Root.ChangeEventDetails) => void` | — | Called on every change, with a single number rather than an array. |
| `min` | `number` | `0` | Lowest value. |
| `max` | `number` | `100` | Highest value. |
| `step` | `number` | `1` | Value granularity. |
| `label` (required) | `string` | — | Text inside the left edge of the well. Also the thumb's accessible name. |
| `formatValue` | `(value: number) => string` | `String` | Formats the readout and the announced value. |
| `showStops` | `boolean` | `true` | Paint ten evenly spaced stop markers. |
| `snapToStops` | `boolean` | `false` | When a drag or track press ends, settle onto the nearest of the ten stops. |

| Data attribute | Description |
| --- | --- |
| `data-dragging` | Present on the root while dragging. |
| `data-disabled` | Present when disabled. |
