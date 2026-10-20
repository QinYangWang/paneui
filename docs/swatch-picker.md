# Swatch Picker

> Picks one colour from a fixed palette.

Page: https://paneui.dev/docs/swatch-picker/

## Installation

```bash
npx shadcn@latest add @paneui/swatch-picker
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/swatch-picker.json
```

Packages: `@base-ui/react`.

Registry items it builds on: `@paneui/theme`.

## Usage

```tsx
import { SwatchPicker } from "@/components/ui/swatch-picker"
```

```tsx
<SwatchPicker
  label="Tag colour"
  swatches={[
    { value: "none", label: "None" },
    { value: "blue", label: "Blue", color: "var(--chart-1)" },
    { value: "pink", label: "Pink", color: "var(--chart-5)" },
  ]}
  value={color}
  onValueChange={setColor}
/>
```

## Examples

### Letter

```tsx
"use client"

import { SwatchPicker, type Swatch } from "@/registry/base-nova/ui/swatch-picker"

const textColors: Swatch[] = [
  { value: "default", label: "Default" },
  { value: "gray", label: "Gray", color: "var(--muted-foreground)" },
  { value: "red", label: "Red", color: "var(--destructive)" },
  { value: "yellow", label: "Yellow", color: "var(--warning)" },
  { value: "green", label: "Green", color: "var(--success)" },
  { value: "blue", label: "Blue", color: "var(--chart-1)" },
  { value: "purple", label: "Purple", color: "var(--chart-3)" },
]

export default function SwatchPickerLetter() {
  return <SwatchPicker label="Text colour" variant="letter" swatches={textColors} defaultValue="default" />
}
```

## Palette, not picker

For an arbitrary colour use `ColorPicker`; `SwatchPicker` is a fixed palette. It is a radio group with one tab stop, and arrow keys move between swatches. A swatch without `color` is the "none" choice.

## Colours

Pass theme tokens (`var(--chart-1)`) for UI that follows light and dark, or hex when the value leaves the app (the email editor's palette).

## API Reference

Built on [the Radio Group primitive](https://base-ui.com/react/components/radio#api-reference). Only the props this library adds or changes are listed; everything else passes through.

### SwatchPicker

Also accepts every prop of [RadioGroup](https://base-ui.com/react/components/radio#api-reference).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `swatches` (required) | `{ value: string; label: string; color?: string }[]` | — | The palette. `label` is the accessible name and tooltip. |
| `variant` | `"dot" \| "letter"` | `"dot"` | Colour dots or an "A" per colour. |
| `label` | `React.ReactNode` | — | Visible label above the swatches (also labels the group). |
