# Theme Accents

> Switches the accent colour at runtime with one attribute.

Page: https://paneui.dev/docs/theme-accents/

## Installation

```bash
npx shadcn@latest add @paneui/theme-accents
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/theme-accents.json
```

Registry items it builds on: `@paneui/theme`.

## Usage

```tsx
/* your Tailwind CSS file, after the theme */
@import "./theme-accents.css";
```

```tsx
<html data-accent="violet">
```

## Examples

### Switch at Runtime

Use the attribute on a section when one part of a page needs its own accent.

```tsx
"use client"

import * as React from "react"

import { Button } from "@/registry/base-nova/ui/button"
import { SegmentedControl, SegmentedControlItem } from "@/registry/base-nova/ui/segmented-control"

const accents = [
  { value: "blue", label: "Blue" },
  { value: "green", label: "Green" },
  { value: "violet", label: "Violet" },
]

export default function ThemeAccentsSwitch() {
  const [accent, setAccent] = React.useState("blue")
  return (
    <div className="flex flex-col items-center gap-3">
      <SegmentedControl value={accent} onValueChange={setAccent} aria-label="Accent">
        {accents.map(({ value, label }) => (
          <SegmentedControlItem key={value} value={value}>
            {label}
          </SegmentedControlItem>
        ))}
      </SegmentedControl>
      <div data-accent={accent} className="flex gap-2">
        <Button>Publish</Button>
        <Button variant="outline">Preview</Button>
      </div>
    </div>
  )
}
```

## Presets

`blue` (the default, also what no attribute gives), `neutral`, `green`, `orange`, `rose` and `violet`. Each sets the eight accent roles (`--primary` with its `-hover`, `-active`, `-foreground`, `-subtle`, `-subtle-hover` and `-border` variants, plus `--ring`), in light and under `.dark`. The values are the same as the single `theme-<name>` items, which bake one accent into the theme instead.

## Switching

Set or remove the attribute with `document.documentElement.dataset.accent = "rose"`. To keep a pick across visits, store it and set the attribute in a pre-paint script, as the theme toggle does for `.dark`. For a ready-made control, see [Accent Picker](https://paneui.dev/docs/accent-picker).

## Radius presets

`theme-radii` is the same idea for corners: `@import "./theme-radii.css"` and set `data-radius="none" | "sm" | "lg" | "xl"` on `<html>` (no attribute or `default` is the theme radius). Install it from `/r/theme-radii.json`.
