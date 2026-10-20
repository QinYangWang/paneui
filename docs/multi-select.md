# Multi Select

> Searchable picker for choosing several options at once.

Page: https://paneui.dev/docs/multi-select/

## Installation

```bash
npx shadcn@latest add @paneui/multi-select
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/multi-select.json
```

Packages: `@base-ui/react`, `motion`.

Registry items it builds on: `@paneui/theme`, `@paneui/icons`, `@paneui/combobox`, `@paneui/control-size`, `@paneui/locale-provider`.

## Usage

```tsx
import { MultiSelect, MultiSelectContent, MultiSelectEmpty, MultiSelectItem, MultiSelectList, MultiSelectTrigger } from "@/components/ui/multi-select"
```

```tsx
<MultiSelect items={labels}>
  <MultiSelectTrigger placeholder="Add labels" />
  <MultiSelectContent>
    <MultiSelectEmpty>No labels found.</MultiSelectEmpty>
    <MultiSelectList>
      {(label: string) => (
        <MultiSelectItem key={label} value={label}>
          {label}
        </MultiSelectItem>
      )}
    </MultiSelectList>
  </MultiSelectContent>
</MultiSelect>
```

## Composition

```text
MultiSelect
├── MultiSelectTrigger
└── MultiSelectContent
    ├── MultiSelectEmpty
    └── MultiSelectList
        ├── MultiSelectItem
        └── MultiSelectGroup
            ├── MultiSelectLabel
            ├── MultiSelectCollection
            │   └── MultiSelectItem
            └── MultiSelectSeparator
```

## Examples

### Groups

Use when the options fall into categories.

```tsx
"use client"

import {
  MultiSelect,
  MultiSelectCollection,
  MultiSelectContent,
  MultiSelectEmpty,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectLabel,
  MultiSelectList,
  MultiSelectSeparator,
  MultiSelectTrigger,
} from "@/registry/base-nova/ui/multi-select"

type Group = { value: string; items: string[] }

const groups: Group[] = [
  { value: "Frontend", items: ["React", "Vue", "Svelte"] },
  { value: "Backend", items: ["Node.js", "Go", "Rust"] },
  { value: "Data", items: ["PostgreSQL", "Redis"] },
]

export default function MultiSelectGroups() {
  return (
    <div className="w-80">
      <MultiSelect items={groups} defaultValue={["React", "Go"]}>
        <MultiSelectTrigger placeholder="Pick your stack" aria-label="Stack" />
        <MultiSelectContent>
          <MultiSelectEmpty>Nothing matches that.</MultiSelectEmpty>
          <MultiSelectList>
            {(group: Group, index: number) => (
              <MultiSelectGroup key={group.value} items={group.items}>
                {index > 0 && <MultiSelectSeparator />}
                <MultiSelectLabel>{group.value}</MultiSelectLabel>
                <MultiSelectCollection>
                  {(item: string) => (
                    <MultiSelectItem key={item} value={item}>
                      {item}
                    </MultiSelectItem>
                  )}
                </MultiSelectCollection>
              </MultiSelectGroup>
            )}
          </MultiSelectList>
        </MultiSelectContent>
      </MultiSelect>
    </div>
  )
}
```

### Object Values

```tsx
"use client"

import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectEmpty,
  MultiSelectItem,
  MultiSelectList,
  MultiSelectTrigger,
} from "@/registry/base-nova/ui/multi-select"

type Person = { id: string; name: string; email: string }

const people: Person[] = [
  { id: "u1", name: "Aiko Tanaka", email: "aiko@studio.jp" },
  { id: "u2", name: "Daniel Ortiz", email: "daniel@ortiz.dev" },
  { id: "u3", name: "Mei Chen", email: "mei@lumen.app" },
  { id: "u4", name: "Priya Nair", email: "priya@northwind.io" },
]

export default function MultiSelectObjects() {
  return (
    <div className="w-80">
      <MultiSelect<Person> items={people} defaultValue={[people[2]]} itemToStringLabel={(p) => p.name}>
        <MultiSelectTrigger
          placeholder="Invite people"
          aria-label="Invitees"
          renderChip={(p: Person) => p.name.split(" ")[0]}
          getKey={(p: Person) => p.id}
        />
        <MultiSelectContent>
          <MultiSelectEmpty>No one by that name.</MultiSelectEmpty>
          <MultiSelectList>
            {(p: Person) => (
              <MultiSelectItem key={p.id} value={p}>
                <span className="flex flex-col">
                  <span>{p.name}</span>
                </span>
                <span className="ml-auto text-xs text-muted-foreground">{p.email}</span>
              </MultiSelectItem>
            )}
          </MultiSelectList>
        </MultiSelectContent>
      </MultiSelect>
    </div>
  )
}
```

### Controlled

Use when other UI sets or reads the selection.

```tsx
"use client"

import * as React from "react"

import { Button } from "@/registry/base-nova/ui/button"
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectEmpty,
  MultiSelectItem,
  MultiSelectList,
  MultiSelectTrigger,
} from "@/registry/base-nova/ui/multi-select"

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

export default function MultiSelectControlled() {
  const [value, setValue] = React.useState<string[]>(["Monday", "Wednesday", "Friday"])
  return (
    <div className="flex w-80 flex-col gap-3">
      <MultiSelect items={days} value={value} onValueChange={setValue}>
        <MultiSelectTrigger placeholder="Workout days" aria-label="Workout days" />
        <MultiSelectContent>
          <MultiSelectEmpty>No day matches that.</MultiSelectEmpty>
          <MultiSelectList>
            {(day: string) => (
              <MultiSelectItem key={day} value={day}>
                {day}
              </MultiSelectItem>
            )}
          </MultiSelectList>
        </MultiSelectContent>
      </MultiSelect>
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground tabular-nums">{value.length} days a week</span>
        <div className="flex gap-2">
          <Button size="xs" variant="ghost" onClick={() => setValue(days.slice(0, 5))}>
            Weekdays
          </Button>
          <Button size="xs" variant="ghost" onClick={() => setValue([])}>
            Clear
          </Button>
        </div>
      </div>
    </div>
  )
}
```

### Sizes

```tsx
"use client"

import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectItem,
  MultiSelectList,
  MultiSelectTrigger,
} from "@/registry/base-nova/ui/multi-select"

const labels = ["Bug", "Design", "Docs", "Infra", "Research"]

export default function MultiSelectSizes() {
  return (
    <div className="flex w-72 flex-col gap-3">
      {(["sm", "default", "lg"] as const).map((size) => (
        <MultiSelect key={size} size={size} items={labels} defaultValue={["Design"]}>
          <MultiSelectTrigger placeholder="Labels" aria-label={`Labels (${size})`} />
          <MultiSelectContent>
            <MultiSelectList>
              {(label: string) => (
                <MultiSelectItem key={label} value={label}>
                  {label}
                </MultiSelectItem>
              )}
            </MultiSelectList>
          </MultiSelectContent>
        </MultiSelect>
      ))}
    </div>
  )
}
```

## Keyboard

Typing filters; `Enter` toggles the highlighted option and keeps the list open. `Backspace` in an empty input removes the last chip.

## Motion

Chips use a 520 / 34 / 0.6 spring. With reduced motion they only fade.

## Related

See also [Combobox](https://paneui.dev/docs/combobox).

## API Reference

Built on [the Combobox primitive](https://base-ui.com/react/components/combobox#api-reference). Only the props this library adds or changes are listed; everything else passes through.

### MultiSelect

`Combobox.Root` with `multiple` always on. Also accepts every prop of [Combobox.Root](https://base-ui.com/react/components/combobox#root).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | `"sm" \| "default" \| "lg"` | — | Sizes the well (28, 32 or 36px for one row of chips), its chips and the option rows. Inside a sized `Field` it takes the field's size (`xs` maps to `sm`). |
| `value` | `Value[]` | — | Controlled selected values. |
| `defaultValue` | `Value[]` | — | Initially selected values. |
| `onValueChange` | `(value: Value[], details) => void` | — | Called when the selection changes. |

### MultiSelectTrigger

Holds the chips and the search input. The popup anchors to it. Also accepts every prop of [Combobox.Chips](https://base-ui.com/react/components/combobox#chips).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | `"sm" \| "default" \| "lg"` | — | Overrides the root size for the well only. |
| `placeholder` | `string` | `"Select…"` | Input placeholder while nothing is selected. |
| `renderChip` | `(value) => ReactNode` | `value.label ?? value.value ?? String(value)` | Chip content for a selected value. |
| `getKey` | `(value, index: number) => Key` | `value.value ?? value.id ?? index (strings: the value)` | React key for each chip. |

| Data attribute | Description |
| --- | --- |
| `data-size` | The resolved size. |

### MultiSelectContent

Portal, positioner and popup, anchored to the trigger. Also accepts every prop of [Combobox.Popup](https://base-ui.com/react/components/combobox#popup).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `side` | `"top" \| "bottom" \| "left" \| "right" \| "inline-start" \| "inline-end"` | `"bottom"` | Side of the trigger to place the popup on. |
| `sideOffset` | `number` | `6` | Gap from the trigger in px. |
| `align` | `"start" \| "center" \| "end"` | `"start"` | Alignment against the trigger. |

### MultiSelectItem

Option row with a tick that fills when chosen. Also accepts every prop of [Combobox.Item](https://base-ui.com/react/components/combobox#item).

| Data attribute | Description |
| --- | --- |
| `data-selected` | Present when the value is chosen (fills the tick). |
| `data-highlighted` | Present on the highlighted item. |

### MultiSelectList

Alias of `ComboboxList`. Also accepts every prop of [Combobox.List](https://base-ui.com/react/components/combobox#list).

### MultiSelectGroup

Alias of `ComboboxGroup`. Also accepts every prop of [Combobox.Group](https://base-ui.com/react/components/combobox#group).

### MultiSelectLabel

Alias of `ComboboxLabel`. Also accepts every prop of [Combobox.GroupLabel](https://base-ui.com/react/components/combobox#group-label).

### MultiSelectSeparator

Alias of `ComboboxSeparator`. Also accepts every prop of [Combobox.Separator](https://base-ui.com/react/components/combobox#separator).

### MultiSelectEmpty

Alias of `ComboboxEmpty`. Also accepts every prop of [Combobox.Empty](https://base-ui.com/react/components/combobox#empty).

### MultiSelectCollection

Alias of `ComboboxCollection`. Also accepts every prop of [Combobox.Collection](https://base-ui.com/react/components/combobox#collection).
