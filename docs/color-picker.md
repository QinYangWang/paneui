# Color Picker

> Picks a colour by dragging, entering hex or choosing a preset.

Page: https://paneui.dev/docs/color-picker/

## Installation

```bash
npx shadcn@latest add @paneui/color-picker
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/color-picker.json
```

Packages: `@base-ui/react`.

Registry items it builds on: `@paneui/theme`.

## Usage

```tsx
import { ColorPicker, ColorPickerArea, ColorPickerContent, ColorPickerHue, ColorPickerTrigger } from "@/components/ui/color-picker"
```

```tsx
<ColorPicker>
  <ColorPickerTrigger />
  <ColorPickerContent>
    <ColorPickerArea />
    <ColorPickerHue />
  </ColorPickerContent>
</ColorPicker>
```

## Composition

```text
ColorPicker
├── ColorPickerTrigger
│   └── ColorPickerSwatch (default content)
└── ColorPickerContent
    ├── ColorPickerArea
    ├── ColorPickerHue
    ├── ColorPickerAlpha
    ├── ColorPickerSwatch
    ├── ColorPickerHexInput
    └── ColorPickerPresets
        └── ColorPickerPreset
```

## Examples

### With Alpha

```tsx
"use client"

import * as React from "react"

import {
  ColorPicker,
  ColorPickerAlpha,
  ColorPickerArea,
  ColorPickerContent,
  ColorPickerHexInput,
  ColorPickerHue,
  ColorPickerSwatch,
  ColorPickerTrigger,
} from "@/registry/base-nova/ui/color-picker"

export default function ColorPickerWithAlpha() {
  const [color, setColor] = React.useState("#0ea5e980")

  return (
    <div className="flex flex-col items-center gap-2">
      <ColorPicker alpha value={color} onValueChange={setColor}>
        <ColorPickerTrigger />
        <ColorPickerContent>
          <ColorPickerArea />
          <ColorPickerHue />
          <ColorPickerAlpha />
          <div className="flex items-center gap-2">
            <ColorPickerSwatch />
            <ColorPickerHexInput />
          </div>
        </ColorPickerContent>
      </ColorPicker>
      <p className="text-xs text-muted-foreground">Overlay tint · 8-digit hex when opacity is below 100%</p>
    </div>
  )
}
```

### Inline

```tsx
"use client"

import {
  ColorPicker,
  ColorPickerArea,
  ColorPickerHexInput,
  ColorPickerHue,
  ColorPickerSwatch,
  hsvaToRgba,
  useColorPicker,
} from "@/registry/base-nova/ui/color-picker"

function RgbReadout() {
  const { hsva } = useColorPicker()
  const { r, g, b } = hsvaToRgba(hsva)
  return (
    <p className="font-mono text-xs text-muted-foreground tabular-nums">
      rgb({r} {g} {b})
    </p>
  )
}

export default function ColorPickerInline() {
  return (
    <div className="flex w-64 flex-col gap-3 frame-2xl frame-p-3 bg-card shadow-raised">
      <ColorPicker defaultValue="#e11d48">
        <ColorPickerArea />
        <ColorPickerHue />
        <div className="flex items-center gap-2">
          <ColorPickerSwatch />
          <ColorPickerHexInput />
        </div>
        <RgbReadout />
      </ColorPicker>
    </div>
  )
}
```

### Change vs Commit

```tsx
"use client"

import * as React from "react"

import {
  ColorPicker,
  ColorPickerArea,
  ColorPickerContent,
  ColorPickerHue,
  ColorPickerTrigger,
} from "@/registry/base-nova/ui/color-picker"

export default function ColorPickerCommit() {
  const [live, setLive] = React.useState("#16a34a")
  const [saved, setSaved] = React.useState("#16a34a")
  const [saves, setSaves] = React.useState(0)

  return (
    <div className="flex flex-col items-center gap-3">
      <ColorPicker
        defaultValue={saved}
        onValueChange={setLive}
        onValueCommit={(hex) => {
          setSaved(hex)
          setSaves((n) => n + 1)
        }}
      >
        <ColorPickerTrigger />
        <ColorPickerContent>
          <ColorPickerArea />
          <ColorPickerHue />
        </ColorPickerContent>
      </ColorPicker>
      <dl className="grid grid-cols-2 gap-x-4 gap-y-1 font-mono text-xs tabular-nums">
        <dt className="text-muted-foreground">onValueChange</dt>
        <dd className="uppercase">{live}</dd>
        <dt className="text-muted-foreground">onValueCommit</dt>
        <dd className="uppercase">
          {saved} · {saves} saves
        </dd>
      </dl>
    </div>
  )
}
```

### Swatch Trigger

```tsx
import {
  ColorPicker,
  ColorPickerArea,
  ColorPickerContent,
  ColorPickerHue,
  ColorPickerPreset,
  ColorPickerPresets,
  ColorPickerTrigger,
} from "@/registry/base-nova/ui/color-picker"

const labels = [
  { name: "Bug", color: "#dc2626" },
  { name: "Feature", color: "#2563eb" },
  { name: "Docs", color: "#16a34a" },
]

const presets = ["#dc2626", "#ea580c", "#ca8a04", "#16a34a", "#2563eb", "#7c3aed"]

export default function ColorPickerSwatchTrigger() {
  return (
    <ul className="flex w-56 flex-col gap-2">
      {labels.map((l) => (
        <li key={l.name} className="flex items-center justify-between gap-3">
          <span className="text-sm font-medium">{l.name}</span>
          <ColorPicker defaultValue={l.color}>
            <ColorPickerTrigger showHex={false} aria-label={`${l.name} label colour`} />
            <ColorPickerContent align="end">
              <ColorPickerArea />
              <ColorPickerHue />
              <ColorPickerPresets>
                {presets.map((p) => (
                  <ColorPickerPreset key={p} value={p} />
                ))}
              </ColorPickerPresets>
            </ColorPickerContent>
          </ColorPicker>
        </li>
      ))}
    </ul>
  )
}
```

### Disabled

```tsx
import { ColorPicker, ColorPickerContent, ColorPickerArea, ColorPickerTrigger } from "@/registry/base-nova/ui/color-picker"

export default function ColorPickerDisabled() {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-muted-foreground">Locked by theme</span>
      <ColorPicker defaultValue="#475569" disabled>
        <ColorPickerTrigger />
        <ColorPickerContent>
          <ColorPickerArea />
        </ColorPickerContent>
      </ColorPicker>
    </div>
  )
}
```

## Keyboard

The area thumb is a 2D slider; arrow keys nudge saturation and brightness 1% (Shift for 10%). Hue and alpha are sliders. The hex field commits on Enter or blur, reverts invalid input, and Escape restores the last value.

## Motion

With reduced motion the panel fades instead of growing from the trigger, and the area thumb barely scales while dragging.

## Related

See also [Wheel Picker](https://paneui.dev/docs/wheel-picker) and [Date Range Picker](https://paneui.dev/docs/date-range-picker).

## API Reference

Built on [the Popover primitive](https://base-ui.com/react/components/popover#api-reference). Only the props this library adds or changes are listed; everything else passes through.

### ColorPicker

Colour state plus the popover root. Parts also work inline without trigger and content. Also accepts every prop of [Popover.Root](https://base-ui.com/react/components/popover#root).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` | — | Controlled hex colour (`#rrggbb` or `#rrggbbaa`). |
| `defaultValue` | `string` | theme `--primary` | Initial colour when uncontrolled. Without it the picker starts on the live `--primary` token (read after mount; `#171717`, the default light primary, during server render). |
| `onValueChange` | `(hex: string) => void` | — | Fires continuously while dragging or typing. |
| `onValueCommit` | `(hex: string) => void` | — | Fires once when a gesture ends (pointer up, key, hex commit, preset); `onValueChange` fires continuously while dragging. |
| `alpha` | `boolean` | `false` | Allow transparency; without it alpha is always 1. |
| `disabled` | `boolean` | `false` | Disable the trigger and all parts. |

### ColorPickerTrigger

Raised chip with the swatch and hex. Pass children to replace its content. Also accepts every prop of [Popover.Trigger](https://base-ui.com/react/components/popover#trigger).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `showHex` | `boolean` | `true` | Show the hex label next to the swatch. |

### ColorPickerContent

Portal, positioner and 256px popup that grows out of the trigger. Also accepts every prop of [Popover.Popup](https://base-ui.com/react/components/popover#popup).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `align` | `"start" \| "center" \| "end"` | `"start"` | Trigger edge the panel lines up with. |
| `collisionPadding` | `number \| Padding` | `8` | Space kept from the viewport edges. |
| `triggerRadius` | `string` | `"var(--radius-lg)"` | Corner radius (CSS length) of the trigger shape the panel morphs from. The default matches `ColorPickerTrigger`; change it only if you reshape the trigger. |

### ColorPickerArea

Saturation (x) by brightness (y) plane with a draggable thumb. Also accepts every prop of `div`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `string` | `the locale's` | Accessible name of the thumb. |

| Data attribute | Description |
| --- | --- |
| `data-disabled` | Present when the picker is disabled. |

### ColorPickerHue

Hue slider (0–360). Value, range and change handlers are owned by the picker; other props go to the slider root. Also accepts every prop of [Slider.Root](https://base-ui.com/react/components/slider#root).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `string` | `the locale's` | Accessible name of the thumb. |
| `disabled` | `boolean` | `false` | Disable this slider; the root's `disabled` also applies. |

### ColorPickerAlpha

Opacity slider over a checkerboard. Only meaningful with `alpha` on the root. Other props go to the slider root, as for `ColorPickerHue`. Also accepts every prop of [Slider.Root](https://base-ui.com/react/components/slider#root).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `string` | `the locale's` | Accessible name of the thumb. |
| `disabled` | `boolean` | `false` | Disable this slider; the root's `disabled` also applies. |

### ColorPickerHexInput

Hex field in an inset well; full 6 or 8-digit values apply while typing, and values below full opacity come out as 8-digit hex. Also accepts every prop of `input`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `aria-label` | `string` | `the locale's` | Accessible name of the field. |

### ColorPickerSwatch

The current colour over a checkerboard so transparency shows (20px; resize with `size-*`). Also accepts every prop of `span`.

### ColorPickerPresets

Wrapping group of preset buttons, labelled `Presets`. Also accepts every prop of `div`.

### ColorPickerPreset

One preset swatch button, an 18px swatch in a 24px hit area, with a ring when `aria-pressed` (it matches the current colour). Also accepts every prop of `button`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` (required) | `string` | — | Hex colour applied on click. |
| `label` | `string` | — | Accessible name. Defaults to the hex value. |

### useColorPicker

Current colour and setters for custom parts. Use inside `ColorPicker`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `hsva` | `{ h: number; s: number; v: number; a: number }` | — | Current colour; `h` 0–360, others 0–1. |
| `hex` | `string` | — | Current colour as lowercase hex. |
| `setHsva` | `(next: Hsva, commit?: boolean) => void` | — | Set the colour; `commit` also fires `onValueCommit`. |
| `commit` | `() => void` | — | Fire `onValueCommit` with the current colour. |
| `alpha` | `boolean` | — | Whether alpha is enabled. |
| `disabled` | `boolean` | — | Whether the picker is disabled. |
