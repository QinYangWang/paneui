# Select

> Picks one option from a list.

Page: https://paneui.dev/docs/select/

## Installation

```bash
npx shadcn@latest add @paneui/select
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/select.json
```

Packages: `@base-ui/react`, `class-variance-authority`.

Registry items it builds on: `@paneui/theme`, `@paneui/icons`, `@paneui/control-size`.

## Usage

```tsx
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
```

```tsx
<Select items={fruits} defaultValue="apple">
  <SelectTrigger>
    <SelectValue />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="apple">Apple</SelectItem>
    <SelectItem value="pear">Pear</SelectItem>
  </SelectContent>
</Select>
```

## Composition

```text
Select
├── SelectTrigger
│   └── SelectValue
└── SelectContent
    ├── SelectGroup
    │   ├── SelectLabel
    │   └── SelectItem
    ├── SelectSeparator
    └── SelectItem
```

## Examples

### Placeholder

```tsx
import { Label } from "@/registry/base-nova/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/base-nova/ui/select"

const timezones = [
  { value: null, label: "Select a timezone" },
  { value: "asia-taipei", label: "Taipei (GMT+8)" },
  { value: "asia-tokyo", label: "Tokyo (GMT+9)" },
  { value: "europe-london", label: "London (GMT+1)" },
  { value: "america-new-york", label: "New York (GMT−4)" },
]

export default function SelectPlaceholder() {
  return (
    <div className="flex w-full max-w-64 flex-col gap-2">
      <Label>Timezone</Label>
      <Select items={timezones}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {timezones.slice(1).map((tz) => (
            <SelectItem key={tz.value} value={tz.value}>
              {tz.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
```

### Sizes

```tsx
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/base-nova/ui/select"

const rows = [
  { value: "10", label: "10 rows" },
  { value: "25", label: "25 rows" },
  { value: "50", label: "50 rows" },
]

export default function SelectSizes() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {(["xs", "sm", "default", "lg"] as const).map((size) => (
        <Select key={size} size={size} items={rows} defaultValue="25">
          <SelectTrigger className="w-auto" aria-label={`Rows (${size})`}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {rows.map((r) => (
              <SelectItem key={r.value} value={r.value}>
                {r.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ))}
    </div>
  )
}
```

### With Icons

Use when icons help tell the options apart.

```tsx
import { GlobeIcon, LockIcon, UsersIcon } from "@/components/icons"
import { Label } from "@/registry/base-nova/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/base-nova/ui/select"

const access = [
  { value: "private", label: "Only me", icon: LockIcon },
  { value: "team", label: "My team", icon: UsersIcon },
  { value: "public", label: "Anyone with the link", icon: GlobeIcon },
]

export default function SelectWithIcons() {
  return (
    <div className="flex w-full max-w-64 flex-col gap-2">
      <Label>Who can view</Label>
      <Select defaultValue="team">
        <SelectTrigger>
          <SelectValue>
            {(value: string) => {
              const item = access.find((a) => a.value === value)
              if (!item) return null
              const Icon = item.icon
              return (
                <span className="flex items-center gap-2">
                  <Icon className="text-muted-foreground" />
                  {item.label}
                </span>
              )
            }}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {access.map(({ value, label, icon: Icon }) => (
            <SelectItem key={value} value={value}>
              <Icon className="text-muted-foreground" />
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
```

### Disabled

```tsx
import { Label } from "@/registry/base-nova/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/base-nova/ui/select"

const plans = [
  { value: "starter", label: "Starter" },
  { value: "pro", label: "Pro" },
  { value: "business", label: "Business" },
]

const regions = [
  { value: "apac", label: "Asia Pacific" },
  { value: "eu", label: "Europe" },
  { value: "us", label: "United States" },
]

export default function SelectDisabled() {
  return (
    <div className="flex w-full max-w-64 flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Label>Plan</Label>
        <Select items={plans} defaultValue="pro">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="starter">Starter</SelectItem>
            <SelectItem value="pro">Pro</SelectItem>
            <SelectItem value="business" disabled>
              Business (contact sales)
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2">
        <Label>Billing region</Label>
        <Select items={regions} defaultValue="apac" disabled>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {regions.map((r) => (
              <SelectItem key={r.value} value={r.value}>
                {r.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
```

### Controlled

Use when other UI reacts to the choice.

```tsx
"use client"

import * as React from "react"

import { Label } from "@/registry/base-nova/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/base-nova/ui/select"

const frequencies = [
  { value: "daily", label: "Every day", note: "A short recap at 8:00 each morning." },
  { value: "weekly", label: "Every Monday", note: "One summary of the week before." },
  { value: "never", label: "Never", note: "You’ll only get alerts that need action." },
]

export default function SelectControlled() {
  const [frequency, setFrequency] = React.useState<string | null>("weekly")
  const current = frequencies.find((f) => f.value === frequency)
  return (
    <div className="flex w-full max-w-64 flex-col gap-2">
      <Label>Email digest</Label>
      <Select items={frequencies} value={frequency} onValueChange={setFrequency}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {frequencies.map((f) => (
            <SelectItem key={f.value} value={f.value}>
              {f.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <p className="text-sm text-pretty text-muted-foreground">{current?.note}</p>
    </div>
  )
}
```

### RTL

```tsx
import { DirectionProvider } from "@base-ui/react/direction-provider"
import { Label } from "@/registry/base-nova/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/base-nova/ui/select"

const fruits = [
  { value: "apple", label: "تفاح" },
  { value: "banana", label: "موز" },
  { value: "orange", label: "برتقال" },
  { value: "grape", label: "عنب" },
]

export default function SelectRtl() {
  return (
    <DirectionProvider direction="rtl">
      <div dir="rtl" className="flex w-full max-w-56 flex-col gap-2">
        <Label>الفاكهة</Label>
        <Select items={fruits} defaultValue="banana">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {fruits.map((f) => (
              <SelectItem key={f.value} value={f.value}>
                {f.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </DirectionProvider>
  )
}
```

## Positioning

By default the popup opens over the trigger with the selected item aligned to it (`alignItemWithTrigger`), like a native select. Set it to `false` to drop the list below instead.

## Keyboard

`Space`, `Enter` or the arrow keys open the list. Arrow keys move, typing jumps to a matching item, `Enter` selects and `Esc` closes.

## API Reference

Built on [the Select primitive](https://base-ui.com/react/components/select#api-reference). Only the props this library adds or changes are listed; everything else passes through.

### Select

Re-export of the primitive root. Also accepts every prop of [Select.Root](https://base-ui.com/react/components/select#root).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `items` | `{ value: any; label: ReactNode }[] \| Record<string, ReactNode>` | — | Lets `SelectValue` show the label for the current value. |
| `value` | `any` | — | Controlled value. |
| `defaultValue` | `any` | — | Initial value when uncontrolled. |
| `onValueChange` | `(value: any, eventDetails) => void` | — | Called when an item is chosen. |
| `multiple` | `boolean` | `false` | Allow several values. |
| `disabled` | `boolean` | `false` | Disable the whole control. |

### SelectTrigger

Raised button with a trailing up/down chevron. Full width with a 10rem minimum. Also accepts every prop of [Select.Trigger](https://base-ui.com/react/components/select#trigger).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | `"xs" \| "sm" \| "default" \| "lg"` | `"default"` | Height 24 / 28 / 32 / 36px. Defaults to the `Select` size, then a sized `Field`. |

| Data attribute | Description |
| --- | --- |
| `data-popup-open` | Present while the list is open. |
| `data-size` | The resolved size. |

### SelectValue

Shows the selected label, truncated. Also accepts every prop of [Select.Value](https://base-ui.com/react/components/select#value).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode \| (value: any) => ReactNode` | — | Custom rendering of the selected value. |

| Data attribute | Description |
| --- | --- |
| `data-placeholder` | Present when nothing is selected (muted text). |

### SelectContent

Portal, positioner, popup and scrollable list with scroll arrows. Also accepts every prop of [Select.Popup](https://base-ui.com/react/components/select#popup).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `side` | `"top" \| "right" \| "bottom" \| "left" \| "inline-start" \| "inline-end"` | `"bottom"` | Side to open on when not aligned with the trigger. |
| `sideOffset` | `number` | `6` | Gap from the trigger in px. |
| `align` | `"start" \| "center" \| "end"` | `"center"` | Alignment against the trigger. |
| `alignItemWithTrigger` | `boolean` | `true` | Overlay the trigger so the selected item sits on top of it. |

### SelectItem

Option row with a check on the right when selected. Also accepts every prop of [Select.Item](https://base-ui.com/react/components/select#item).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `any` | — | Value chosen by this item. |
| `disabled` | `boolean` | `false` | Dim the item and skip it. |

| Data attribute | Description |
| --- | --- |
| `data-highlighted` | Present on the item under the pointer or keyboard focus. |
| `data-selected` | Present on the selected item. |

### SelectGroup

Re-export. Groups items under a `SelectLabel`. Also accepts every prop of [Select.Group](https://base-ui.com/react/components/select#group).

### SelectLabel

Small muted heading for a group. Also accepts every prop of [Select.GroupLabel](https://base-ui.com/react/components/select#group-label).

### SelectSeparator

Also accepts every prop of [Select.Separator](https://base-ui.com/react/components/select#separator).
