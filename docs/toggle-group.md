# Toggle Group

> Turns formatting or view options on and off.

Page: https://paneui.dev/docs/toggle-group/

## Installation

```bash
npx shadcn@latest add @paneui/toggle-group
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/toggle-group.json
```

Packages: `@base-ui/react`, `class-variance-authority`.

Registry items it builds on: `@paneui/theme`.

## Usage

```tsx
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
```

```tsx
<ToggleGroup multiple defaultValue={["bold"]} aria-label="Text style">
  <ToggleGroupItem value="bold" aria-label="Bold"><BoldIcon /></ToggleGroupItem>
  <ToggleGroupItem value="italic" aria-label="Italic"><ItalicIcon /></ToggleGroupItem>
</ToggleGroup>
```

## Composition

```text
ToggleGroup
└── ToggleGroupItem

Toggle
```

## Examples

### Outline

```tsx
"use client"

import { ToggleGroup, ToggleGroupItem } from "@/registry/base-nova/ui/toggle-group"

export default function ToggleGroupOutline() {
  return (
    <ToggleGroup variant="outline" size="sm" defaultValue={["50"]} aria-label="Image width">
      {["25", "50", "75", "100"].map((w) => (
        <ToggleGroupItem key={w} value={w}>
          {w}%
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}
```

### Single Toggle

```tsx
"use client"

import * as React from "react"

import { BoldIcon } from "@/components/icons"
import { Toggle } from "@/registry/base-nova/ui/toggle-group"

export default function SingleToggle() {
  const [pressed, setPressed] = React.useState(false)
  return (
    <div className="flex items-center gap-3">
      <Toggle pressed={pressed} onPressedChange={setPressed} aria-label="Bold">
        <BoldIcon />
      </Toggle>
      <span className="text-sm text-muted-foreground">{pressed ? "On" : "Off"}</span>
    </div>
  )
}
```

### Sizes

```tsx
import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon } from "@/components/icons"
import { ToggleGroup, ToggleGroupItem } from "@/registry/base-nova/ui/toggle-group"

export default function ToggleGroupSizes() {
  return (
    <div className="flex flex-col items-center gap-3">
      {(["xs", "sm", "default", "lg"] as const).map((size) => (
        <ToggleGroup key={size} size={size} defaultValue={["left"]} aria-label={`Alignment (${size})`}>
          <ToggleGroupItem value="left" aria-label="Align left">
            <AlignLeftIcon />
          </ToggleGroupItem>
          <ToggleGroupItem value="center" aria-label="Align center">
            <AlignCenterIcon />
          </ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Align right">
            <AlignRightIcon />
          </ToggleGroupItem>
        </ToggleGroup>
      ))}
    </div>
  )
}
```

### RTL

```tsx
"use client"

import * as React from "react"
import { DirectionProvider } from "@base-ui/react/direction-provider"
import { AlignLeftIcon, AlignRightIcon, BoldIcon, ItalicIcon, UnderlineIcon, AlignCenterIcon } from "@/components/icons"
import { ToggleGroup, ToggleGroupItem } from "@/registry/base-nova/ui/toggle-group"

export default function ToggleGroupRtl() {
  const [marks, setMarks] = React.useState<string[]>(["bold"])
  const [align, setAlign] = React.useState<string[]>(["right"])
  return (
    <DirectionProvider direction="rtl">
      <div dir="rtl" className="flex items-center gap-3">
        <ToggleGroup multiple value={marks} onValueChange={setMarks} aria-label="نمط النص">
          <ToggleGroupItem value="bold" aria-label="غامق">
            <BoldIcon />
          </ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="مائل">
            <ItalicIcon />
          </ToggleGroupItem>
          <ToggleGroupItem value="underline" aria-label="تسطير">
            <UnderlineIcon />
          </ToggleGroupItem>
        </ToggleGroup>
        <div className="h-5 w-px bg-border" />
        <ToggleGroup value={align} onValueChange={(v) => v.length && setAlign(v)} aria-label="المحاذاة">
          <ToggleGroupItem value="right" aria-label="محاذاة لليمين">
            <AlignRightIcon />
          </ToggleGroupItem>
          <ToggleGroupItem value="center" aria-label="توسيط">
            <AlignCenterIcon />
          </ToggleGroupItem>
          <ToggleGroupItem value="left" aria-label="محاذاة لليسار">
            <AlignLeftIcon />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </DirectionProvider>
  )
}
```

## One value or many

The value is always an array. Without `multiple` it holds at most one item, so read `value[0]`; to stop the user clearing the choice, ignore empty arrays in `onValueChange`.

## When to use something else

For a one-of-few value with a raised thumb (billing cycle, view mode) use `SegmentedControl`. Inside a `Toolbar`, use `ToolbarToggle` so the item joins the toolbar's arrow-key loop.

## API Reference

Built on [the Toggle Group primitive](https://base-ui.com/react/components/toggle-group#api-reference). Only the props this library adds or changes are listed; everything else passes through.

### ToggleGroup

Also accepts every prop of [ToggleGroup](https://base-ui.com/react/components/toggle-group#api-reference).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"default" \| "outline"` | `"default"` | `default` fills only the pressed item; `outline` frames every item, for settings panels. |
| `size` | `"xs" \| "sm" \| "default" \| "lg"` | `"default"` | Height 24 / 28 / 32 / 36px, matching the button sizes. |

| Data attribute | Description |
| --- | --- |
| `data-variant` | The group variant. |
| `data-size` | The group size. |

### ToggleGroupItem

Takes `variant` / `size` from the group unless set. Also accepts every prop of [Toggle](https://base-ui.com/react/components/toggle#api-reference).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` (required) | `string` | — | The item's value in the group. |

| Data attribute | Description |
| --- | --- |
| `data-pressed` | Present when pressed. |
| `data-variant` | The resolved variant. |
| `data-size` | The resolved size. |

### Toggle

Also accepts every prop of [Toggle](https://base-ui.com/react/components/toggle#api-reference).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"default" \| "outline"` | `"default"` | `default` fills only the pressed item; `outline` frames every item, for settings panels. |
| `size` | `"xs" \| "sm" \| "default" \| "lg"` | `"default"` | Height 24 / 28 / 32 / 36px, matching the button sizes. |
