# Select Morph

> Select whose trigger unfolds into its option list.

Page: https://paneui.dev/docs/select-morph/

## Installation

```bash
npx shadcn@latest add @paneui/select-morph
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/select-morph.json
```

Packages: `@base-ui/react`.

Registry items it builds on: `@paneui/theme`, `@paneui/icons`.

## Usage

```tsx
import { MorphSelect, MorphSelectContent, MorphSelectItem, MorphSelectTrigger, MorphSelectValue } from "@/components/ui/select-morph"
```

```tsx
<MorphSelect items={items} defaultValue="tpe">
  <MorphSelectTrigger>
    <MorphSelectValue />
  </MorphSelectTrigger>
  <MorphSelectContent>
    <MorphSelectItem value="tpe">Taipei</MorphSelectItem>
    <MorphSelectItem value="tyo">Tokyo</MorphSelectItem>
  </MorphSelectContent>
</MorphSelect>
```

## Composition

```text
MorphSelect
├── MorphSelectTrigger
│   └── MorphSelectValue
└── MorphSelectContent
    ├── MorphSelectItem
    ├── MorphSelectSeparator
    └── MorphSelectGroup
        ├── MorphSelectLabel
        └── MorphSelectItem
```

## Examples

### Placeholder

```tsx
import { Label } from "@/registry/base-nova/ui/label"
import { MorphSelect, MorphSelectContent, MorphSelectItem, MorphSelectTrigger, MorphSelectValue } from "@/registry/base-nova/ui/select-morph"

const plans = [
  { value: null, label: "Choose a plan" },
  { value: "hobby", label: "Hobby" },
  { value: "pro", label: "Pro" },
  { value: "team", label: "Team" },
]

export default function SelectMorphPlaceholder() {
  return (
    <div className="flex w-full max-w-56 flex-col gap-2">
      <Label>Plan</Label>
      <MorphSelect items={plans}>
        <MorphSelectTrigger>
          <MorphSelectValue />
        </MorphSelectTrigger>
        <MorphSelectContent>
          {plans.slice(1).map((p) => (
            <MorphSelectItem key={p.value} value={p.value}>
              {p.label}
            </MorphSelectItem>
          ))}
        </MorphSelectContent>
      </MorphSelect>
    </div>
  )
}
```

### With Icons

```tsx
"use client"

import * as React from "react"

import { MonitorIcon, MoonIcon, SunIcon } from "@/components/icons"
import { Label } from "@/registry/base-nova/ui/label"
import { MorphSelect, MorphSelectContent, MorphSelectItem, MorphSelectTrigger } from "@/registry/base-nova/ui/select-morph"

const themes = {
  light: { label: "Light", icon: <SunIcon /> },
  dark: { label: "Dark", icon: <MoonIcon /> },
  system: { label: "System", icon: <MonitorIcon /> },
} as const

type Theme = keyof typeof themes

export default function SelectMorphWithIcons() {
  const [theme, setTheme] = React.useState<Theme>("system")
  const current = themes[theme]
  const row = (
    <span className="flex flex-1 items-center gap-2 truncate text-start">
      {current.icon}
      {current.label}
    </span>
  )

  return (
    <div className="flex w-full max-w-56 flex-col gap-2">
      <Label>Appearance</Label>
      <MorphSelect value={theme} onValueChange={(value) => value && setTheme(value as Theme)}>
        <MorphSelectTrigger>{row}</MorphSelectTrigger>
        <MorphSelectContent header={row}>
          {(Object.keys(themes) as Theme[]).map((key) => (
            <MorphSelectItem key={key} value={key}>
              {themes[key].icon}
              {themes[key].label}
            </MorphSelectItem>
          ))}
        </MorphSelectContent>
      </MorphSelect>
    </div>
  )
}
```

### Disabled

```tsx
import { Label } from "@/registry/base-nova/ui/label"
import { MorphSelect, MorphSelectContent, MorphSelectItem, MorphSelectTrigger, MorphSelectValue } from "@/registry/base-nova/ui/select-morph"

const sizes = [
  { value: "s", label: "Small · 1 vCPU" },
  { value: "m", label: "Medium · 2 vCPU" },
  { value: "l", label: "Large · 4 vCPU" },
  { value: "xl", label: "X-Large · 8 vCPU" },
]

export default function SelectMorphDisabled() {
  return (
    <div className="flex w-full max-w-sm flex-wrap items-end gap-4">
      <div className="flex w-full max-w-56 flex-col gap-2">
        <Label>Instance size</Label>
        <MorphSelect items={sizes} defaultValue="m">
          <MorphSelectTrigger>
            <MorphSelectValue />
          </MorphSelectTrigger>
          <MorphSelectContent>
            {sizes.map((s) => (
              <MorphSelectItem key={s.value} value={s.value} disabled={s.value === "xl"}>
                {s.label}
              </MorphSelectItem>
            ))}
          </MorphSelectContent>
        </MorphSelect>
      </div>
      <div className="flex w-full max-w-56 flex-col gap-2">
        <Label>Region (locked)</Label>
        <MorphSelect items={[{ value: "tpe", label: "Taipei" }]} defaultValue="tpe" disabled>
          <MorphSelectTrigger>
            <MorphSelectValue />
          </MorphSelectTrigger>
          <MorphSelectContent>
            <MorphSelectItem value="tpe">Taipei</MorphSelectItem>
          </MorphSelectContent>
        </MorphSelect>
      </div>
    </div>
  )
}
```

### Controlled

Use when other UI sets the value or opens the popup.

```tsx
"use client"

import * as React from "react"

import { Label } from "@/registry/base-nova/ui/label"
import { MorphSelect, MorphSelectContent, MorphSelectItem, MorphSelectTrigger, MorphSelectValue } from "@/registry/base-nova/ui/select-morph"

const intervals = [
  { value: "5", label: "Every 5 minutes" },
  { value: "15", label: "Every 15 minutes" },
  { value: "60", label: "Every hour" },
  { value: "1440", label: "Once a day" },
]

export default function SelectMorphControlled() {
  const [value, setValue] = React.useState<string | null>("15")
  const [open, setOpen] = React.useState(false)

  return (
    <div className="flex w-full max-w-56 flex-col gap-2">
      <Label>Sync interval</Label>
      <MorphSelect items={intervals} value={value} onValueChange={setValue} open={open} onOpenChange={setOpen}>
        <MorphSelectTrigger>
          <MorphSelectValue />
        </MorphSelectTrigger>
        <MorphSelectContent>
          {intervals.map((i) => (
            <MorphSelectItem key={i.value} value={i.value}>
              {i.label}
            </MorphSelectItem>
          ))}
        </MorphSelectContent>
      </MorphSelect>
      <p className="text-xs text-muted-foreground">
        {open ? "Picking…" : `Syncs ${intervals.find((i) => i.value === value)?.label.toLowerCase() ?? "never"}.`}
      </p>
    </div>
  )
}
```

## Motion

The popup grows from the trigger's size to its content height over 450ms. With reduced motion it cross-fades at full size.

## Keyboard

Space, Enter and the arrow keys open it, arrows move between options, typing jumps to a match, Enter selects and Escape closes.

## Related

See also [Popover Morph](https://paneui.dev/docs/popover-morph), [Morphing Modal](https://paneui.dev/docs/morphing-modal), [Morphing Search](https://paneui.dev/docs/morphing-search) and [Morphing Tabs](https://paneui.dev/docs/morphing-tabs).

## API Reference

Built on [the Select primitive](https://base-ui.com/react/components/select#api-reference). Only the props this library adds or changes are listed; everything else passes through.

### MorphSelect

`Select.Root`, re-exported unchanged. Also accepts every prop of [Select.Root](https://base-ui.com/react/components/select#root).

### MorphSelectTrigger

The raised 40px trigger the popup grows out of. Renders a chevron after its children. Also accepts every prop of [Select.Trigger](https://base-ui.com/react/components/select#trigger).

### MorphSelectValue

The selected label, truncated; muted while showing the placeholder. Also accepts every prop of [Select.Value](https://base-ui.com/react/components/select#value).

### MorphSelectContent

Portal, positioner and popup laid over the trigger, with a mirrored header row and a scrollable list (max 18rem). Also accepts every prop of [Select.Popup](https://base-ui.com/react/components/select#popup).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `header` | `ReactNode` | `the current value` | What the mirrored first row shows. Match it to your trigger's content. |

| Data attribute | Description |
| --- | --- |
| `data-side` | `bottom` or `top` (after a collision flip); on `top` the box grows upward. |
| `data-starting-style / data-ending-style` | Present while the morph opens or closes. |

### MorphSelectItem

An option row with a check indicator on the right. Also accepts every prop of [Select.Item](https://base-ui.com/react/components/select#item).

| Data attribute | Description |
| --- | --- |
| `data-highlighted` | Present on the keyboard or pointer highlighted row. |
| `data-selected` | Present on the selected row. |

### MorphSelectGroup

Also accepts every prop of [Select.Group](https://base-ui.com/react/components/select#group).

### MorphSelectLabel

Small muted heading for a group. Also accepts every prop of [Select.GroupLabel](https://base-ui.com/react/components/select#grouplabel).

### MorphSelectSeparator

Also accepts every prop of [Select.Separator](https://base-ui.com/react/components/select#separator).
