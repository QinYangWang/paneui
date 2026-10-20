# Wheel Picker

> Picks values with a scrolling wheel.

Page: https://paneui.dev/docs/wheel-picker/

## Installation

```bash
npx shadcn@latest add @paneui/wheel-picker
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/wheel-picker.json
```

Packages: `motion`.

Registry items it builds on: `@paneui/theme`.

## Usage

```tsx
import { WheelPicker } from "@/components/ui/wheel-picker"
```

```tsx
<WheelPicker aria-label="Size" options={["S", "M", "L"]} defaultValue="M" />
```

## Composition

```text
WheelPickerGroup (optional)
└── WheelPicker
```

## Examples

### Single Wheel

Use a single wheel for one short list, such as sizes or quantities.

```tsx
import { WheelPicker } from "@/registry/base-nova/ui/wheel-picker"

const sizes = [
  { value: "xs", label: "Extra small" },
  { value: "s", label: "Small" },
  { value: "m", label: "Medium" },
  { value: "l", label: "Large" },
  { value: "xl", label: "Extra large" },
]

export default function WheelPickerSingle() {
  return (
    <div className="w-48">
      <WheelPicker aria-label="Shirt size" options={sizes} defaultValue="m" />
    </div>
  )
}
```

### Disabled Options

Use for options that exist but can't be picked right now.

```tsx
"use client"

import * as React from "react"

import { WheelPicker, type WheelPickerOption } from "@/registry/base-nova/ui/wheel-picker"

const slots: WheelPickerOption[] = [
  { value: "09:00", label: "9:00 AM" },
  { value: "10:00", label: "10:00 AM", disabled: true },
  { value: "11:00", label: "11:00 AM" },
  { value: "13:00", label: "1:00 PM", disabled: true },
  { value: "14:00", label: "2:00 PM" },
  { value: "15:00", label: "3:00 PM" },
  { value: "16:00", label: "4:00 PM", disabled: true },
]

export default function WheelPickerDisabledOptions() {
  const [slot, setSlot] = React.useState("11:00")

  return (
    <div className="flex w-48 flex-col items-center gap-3">
      <WheelPicker aria-label="Appointment time" options={slots} value={slot} onValueChange={setSlot} className="w-full" />
      <p className="text-sm text-muted-foreground">
        Booked for <span className="font-medium text-foreground tabular-nums">{slot}</span>
      </p>
    </div>
  )
}
```

### Rows and Height

```tsx
import { WheelPicker } from "@/registry/base-nova/ui/wheel-picker"

const years = Array.from({ length: 40 }, (_, i) => String(2026 - i))

export default function WheelPickerVisibleCount() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6">
      <div className="flex w-28 flex-col items-center gap-2">
        <WheelPicker aria-label="Birth year, compact" options={years} defaultValue="1999" visibleCount={3} className="w-full" />
        <span className="font-mono text-xs text-muted-foreground">visibleCount={3}</span>
      </div>
      <div className="flex w-28 flex-col items-center gap-2">
        <WheelPicker aria-label="Birth year, tall" options={years} defaultValue="1999" visibleCount={7} itemHeight={44} className="w-full" />
        <span className="font-mono text-xs text-muted-foreground">7 rows · 44px</span>
      </div>
    </div>
  )
}
```

### In a Form

```tsx
"use client"

import * as React from "react"

import { Button } from "@/registry/base-nova/ui/button"
import { WheelPicker, WheelPickerGroup } from "@/registry/base-nova/ui/wheel-picker"

const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"))
const minutes = ["00", "15", "30", "45"]

export default function WheelPickerForm() {
  const [saved, setSaved] = React.useState<string | null>(null)

  return (
    <form
      className="flex w-56 flex-col items-center gap-3"
      onSubmit={(event) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        setSaved(`${data.get("hour")}:${data.get("minute")}`)
      }}
    >
      <WheelPickerGroup className="w-full" visibleCount={3}>
        <WheelPicker aria-label="Hour" name="hour" options={hours} defaultValue="22" />
        <WheelPicker aria-label="Minute" name="minute" options={minutes} defaultValue="30" />
      </WheelPickerGroup>
      <Button type="submit" size="sm" className="w-full">
        Set quiet hours
      </Button>
      <p className="text-xs text-muted-foreground">{saved ? `Quiet from ${saved}` : "Not saved yet"}</p>
    </form>
  )
}
```

### Disabled

```tsx
import { WheelPicker, WheelPickerGroup } from "@/registry/base-nova/ui/wheel-picker"

export default function WheelPickerDisabled() {
  return (
    <WheelPickerGroup className="w-56">
      <WheelPicker aria-label="Month" options={["Jan", "Feb", "Mar", "Apr", "May"]} defaultValue="Mar" disabled />
      <WheelPicker aria-label="Day" options={["12", "13", "14", "15", "16"]} defaultValue="14" disabled />
    </WheelPickerGroup>
  )
}
```

## Keyboard

The wheel is a `listbox`. Up/Down move one row, PageUp/PageDown a window, and Home/End jump to the ends. Touch and trackpads scroll natively with momentum; mouse users can drag and fling. The drum never rests on a disabled option and nudges to the nearest enabled row.

## Motion

With reduced motion the drum is flat, rows slide straight, and keyboard or click jumps are instant.

## Related

Other pickers: [Color Picker](https://paneui.dev/docs/color-picker), [Date Range Picker](https://paneui.dev/docs/date-range-picker).

## API Reference

### WheelPicker

One scroll wheel. Also accepts every prop of `div`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `options` (required) | `readonly (string \| { value: string; label: ReactNode; textValue?: string; disabled?: boolean })[]` | — | Rows of the wheel. `textValue` is the accessible text when `label` isn't a string. |
| `value` | `string` | — | Controlled selected value. |
| `defaultValue` | `string` | — | Initial value when uncontrolled. Defaults to the first option. |
| `onValueChange` | `(value: string) => void` | — | Fires once the drum settles on a new row (after momentum, snap, a click or a key). |
| `visibleCount` | `number` | `5 (or the group's)` | Rows visible through the window. |
| `itemHeight` | `number` | `36 (or the group's)` | Row height in px. |
| `disabled` | `boolean` | `false` | Dim the wheel and stop scrolling, dragging and keys. |
| `name` | `string` | — | Name of a hidden input carrying the value, for forms. |
| `aria-label` | `string` | — | Accessible name for the listbox. Always set one. |

| Data attribute | Description |
| --- | --- |
| `data-disabled` | Present when `disabled`. |

### WheelPickerGroup

Lays several wheels side by side on one raised surface with a single selection band. Also accepts every prop of `div`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `itemHeight` | `number` | `36` | Row height for every wheel inside. |
| `visibleCount` | `number` | `5` | Visible rows for every wheel inside. |
