# Combobox

> Picks one option from a long list by typing to filter.

Page: https://paneui.dev/docs/combobox/

## Installation

```bash
npx shadcn@latest add @paneui/combobox
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/combobox.json
```

Packages: `@base-ui/react`, `class-variance-authority`.

Registry items it builds on: `@paneui/theme`, `@paneui/icons`, `@paneui/control-size`, `@paneui/locale-provider`.

## Usage

```tsx
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from "@/components/ui/combobox"
```

```tsx
<Combobox items={cities}>
  <ComboboxInput placeholder="Search cities" />
  <ComboboxContent>
    <ComboboxEmpty>No city found.</ComboboxEmpty>
    <ComboboxList>
      {(city: string) => (
        <ComboboxItem key={city} value={city}>
          {city}
        </ComboboxItem>
      )}
    </ComboboxList>
  </ComboboxContent>
</Combobox>
```

## Composition

```text
Combobox
├── ComboboxInput            (or ComboboxTrigger > ComboboxValue)
└── ComboboxContent
    ├── ComboboxSearch       (with ComboboxTrigger)
    ├── ComboboxEmpty
    └── ComboboxList
        ├── ComboboxItem
        └── ComboboxGroup
            ├── ComboboxLabel
            ├── ComboboxCollection
            │   └── ComboboxItem
            └── ComboboxSeparator
```

## Examples

### Search In Popup

```tsx
"use client"

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxSearch,
  ComboboxTrigger,
  ComboboxValue,
} from "@/registry/base-nova/ui/combobox"

const languages = ["English", "日本語", "繁體中文", "简体中文", "Español", "Français", "Deutsch", "Português"]

export default function ComboboxPopupSearch() {
  return (
    <div className="w-56">
      <Combobox items={languages} defaultValue="English">
        <ComboboxTrigger aria-label="Language">
          <ComboboxValue placeholder="Choose a language" />
        </ComboboxTrigger>
        <ComboboxContent>
          <ComboboxSearch placeholder="Search languages" aria-label="Search languages" />
          <ComboboxEmpty>No language matches that.</ComboboxEmpty>
          <ComboboxList>
            {(language: string) => (
              <ComboboxItem key={language} value={language}>
                {language}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  )
}
```

### Sizes

```tsx
"use client"

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/registry/base-nova/ui/combobox"

const airports = ["HKG · Hong Kong", "TPE · Taipei", "NRT · Tokyo Narita", "SIN · Singapore", "LHR · London Heathrow"]

const sizes = [
  { size: "xs", label: "Extra small" },
  { size: "sm", label: "Small" },
  { size: "default", label: "Default" },
  { size: "lg", label: "Large" },
] as const

export default function ComboboxSizes() {
  return (
    <div className="flex w-64 flex-col gap-3">
      {sizes.map(({ size, label }) => (
        <Combobox key={size} size={size} items={airports}>
          <ComboboxInput placeholder={label} aria-label={`Airport (${label})`} />
          <ComboboxContent>
            <ComboboxEmpty>No airport found.</ComboboxEmpty>
            <ComboboxList>
              {(airport: string) => (
                <ComboboxItem key={airport} value={airport}>
                  {airport}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      ))}
    </div>
  )
}
```

### Input Options

Turn off controls a field doesn't need, like the clear button when a choice is required.

```tsx
"use client"

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/registry/base-nova/ui/combobox"

const cities = ["Amsterdam", "Barcelona", "Copenhagen", "Dublin", "Edinburgh", "Florence"]

export default function ComboboxInputOptions() {
  return (
    <div className="w-64">
      <Combobox items={cities}>
        <ComboboxInput
          showSearchIcon={false}
          showTrigger={false}
          placeholder="Type a city"
          aria-label="City"
        />
        <ComboboxContent>
          <ComboboxEmpty>No city matches that.</ComboboxEmpty>
          <ComboboxList>
            {(city: string) => (
              <ComboboxItem key={city} value={city}>
                {city}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  )
}
```

### Controlled

```tsx
"use client"

import * as React from "react"

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/registry/base-nova/ui/combobox"

const assignees = ["Aiko Tanaka", "Daniel Ortiz", "Mei Chen", "Lucas Ferreira", "Priya Nair"]

export default function ComboboxControlled() {
  const [value, setValue] = React.useState<string | null>("Mei Chen")
  return (
    <div className="flex w-64 flex-col gap-2">
      <Combobox items={assignees} value={value} onValueChange={setValue}>
        <ComboboxInput placeholder="Assign to…" aria-label="Assignee" />
        <ComboboxContent>
          <ComboboxEmpty>Nobody by that name.</ComboboxEmpty>
          <ComboboxList>
            {(person: string) => (
              <ComboboxItem key={person} value={person}>
                {person}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
      <p className="text-xs text-muted-foreground">{value ? `Assigned to ${value}` : "Unassigned"}</p>
    </div>
  )
}
```

### Disabled

```tsx
"use client"

import {
  Combobox,
  ComboboxContent,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/registry/base-nova/ui/combobox"

const plans = [
  { value: "free", label: "Free" },
  { value: "pro", label: "Pro" },
  { value: "team", label: "Team" },
  { value: "enterprise", label: "Enterprise (contact sales)", disabled: true },
]

type Plan = (typeof plans)[number]

export default function ComboboxDisabled() {
  return (
    <div className="flex w-64 flex-col gap-3">
      <Combobox items={plans}>
        <ComboboxInput placeholder="Choose a plan" aria-label="Plan" />
        <ComboboxContent>
          <ComboboxList>
            {(plan: Plan) => (
              <ComboboxItem key={plan.value} value={plan} disabled={plan.disabled}>
                {plan.label}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
      <Combobox items={plans} disabled>
        <ComboboxInput placeholder="Plan locked by admin" aria-label="Locked plan" />
      </Combobox>
    </div>
  )
}
```

### RTL

```tsx
"use client"

import { DirectionProvider } from "@base-ui/react/direction-provider"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/registry/base-nova/ui/combobox"

const cities = ["القاهرة", "دبي", "الرياض", "عمّان", "بيروت", "الدار البيضاء", "تونس"]

export default function ComboboxRtl() {
  return (
    <DirectionProvider direction="rtl">
      <div dir="rtl" className="w-64">
        <Combobox items={cities}>
          <ComboboxInput placeholder="ابحث عن مدينة" aria-label="المدينة" />
          <ComboboxContent>
            <ComboboxEmpty>لا توجد نتائج.</ComboboxEmpty>
            <ComboboxList>
              {(city: string) => (
                <ComboboxItem key={city} value={city}>
                  {city}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </div>
    </DirectionProvider>
  )
}
```

## Keyboard

Typing filters the list; `ArrowUp` / `ArrowDown` move the highlight, `Enter` picks it and `Escape` closes the popup (standard combobox behaviour).

## Related

[Multi Select](https://paneui.dev/docs/multi-select) is the same primitive in `multiple` mode, with chips.

## API Reference

Built on [the Combobox primitive](https://base-ui.com/react/components/combobox#api-reference). Only the props this library adds or changes are listed; everything else passes through.

### Combobox

Re-export of the primitive root, taking `items`, `value`, `defaultValue`, `onValueChange`, `filter`, `disabled` and its other props. Also accepts every prop of [Combobox.Root](https://base-ui.com/react/components/combobox#root).

### ComboboxInput

Search input in an inset well with optional search icon, clear and chevron buttons. Also accepts every prop of [Combobox.Input](https://base-ui.com/react/components/combobox#input).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | `"xs" \| "sm" \| "default" \| "lg"` | `"default"` | Height 24 / 28 / 32 / 36px. Defaults to the `Combobox` size, then a sized `Field`. |
| `showSearchIcon` | `boolean` | `true` | Show the leading search icon. |
| `showClear` | `boolean` | `true` | Render a clear button, shown once something is chosen. |
| `showTrigger` | `boolean` | `true` | Render the chevron that opens the list. |

| Data attribute | Description |
| --- | --- |
| `data-size` | On the input group, the `size` value. |
| `data-disabled` | On the input group while disabled. |

### ComboboxTrigger

Raised button showing the chosen value, like `SelectTrigger`. Put `ComboboxValue` inside. Also accepts every prop of [Combobox.Trigger](https://base-ui.com/react/components/combobox#trigger).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | `"xs" \| "sm" \| "default" \| "lg"` | `"default"` | Height 24 / 28 / 32 / 36px. Defaults to the `Combobox` size, then a sized `Field`. |

| Data attribute | Description |
| --- | --- |
| `data-popup-open` | Present while the list is open. |

### ComboboxValue

Re-export. Renders the selected value, or `placeholder` when empty. Also accepts every prop of [Combobox.Value](https://base-ui.com/react/components/combobox#value).

### ComboboxSearch

Search field styled for the top of the popup. Also accepts every prop of [Combobox.Input](https://base-ui.com/react/components/combobox#input).

### ComboboxContent

Portal, positioner and popup in one. As wide as its anchor. Also accepts every prop of [Combobox.Popup](https://base-ui.com/react/components/combobox#popup).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `side` | `"top" \| "bottom" \| "left" \| "right" \| "inline-start" \| "inline-end"` | `"bottom"` | Side of the anchor to place the popup on. |
| `sideOffset` | `number` | `6` | Gap from the anchor in px. |
| `align` | `"start" \| "center" \| "end"` | `"start"` | Alignment against the anchor. |
| `anchor` | `Element \| RefObject<Element> \| VirtualElement \| null` | — | Position against another element. |

### ComboboxList

Scrollable list. Takes a render function called per item (or group). Also accepts every prop of [Combobox.List](https://base-ui.com/react/components/combobox#list).

### ComboboxItem

Option row with a check indicator on the right when selected. Also accepts every prop of [Combobox.Item](https://base-ui.com/react/components/combobox#item).

| Data attribute | Description |
| --- | --- |
| `data-highlighted` | Present on the keyboard / pointer highlighted item. |
| `data-disabled` | Present when the item is disabled. |

### ComboboxGroup

Also accepts every prop of [Combobox.Group](https://base-ui.com/react/components/combobox#group).

### ComboboxLabel

Also accepts every prop of [Combobox.GroupLabel](https://base-ui.com/react/components/combobox#group-label).

### ComboboxSeparator

Also accepts every prop of [Combobox.Separator](https://base-ui.com/react/components/combobox#separator).

### ComboboxEmpty

Shown only when the filter leaves nothing to pick. Also accepts every prop of [Combobox.Empty](https://base-ui.com/react/components/combobox#empty).

### ComboboxCollection

Re-export. Renders a group's `items` with a render function. Also accepts every prop of [Combobox.Collection](https://base-ui.com/react/components/combobox#collection).

### useComboboxFilter

Re-export of `Combobox.useFilter`, returning locale-aware `contains`, `startsWith` and `endsWith` matchers for `filter`. Also accepts every prop of [Combobox.useFilter](https://base-ui.com/react/components/combobox).
