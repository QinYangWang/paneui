# Menu

> Dropdown of actions or options opened from a trigger.

Page: https://paneui.dev/docs/menu/

## Installation

```bash
npx shadcn@latest add @paneui/menu
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/menu.json
```

Packages: `@base-ui/react`.

Registry items it builds on: `@paneui/theme`, `@paneui/icons`.

## Usage

```tsx
import { Menu, MenuContent, MenuItem, MenuSeparator, MenuTrigger } from "@/components/ui/menu"
```

```tsx
<Menu>
  <MenuTrigger render={<Button variant="secondary" />}>Options</MenuTrigger>
  <MenuContent>
    <MenuItem>Rename</MenuItem>
    <MenuItem>Duplicate</MenuItem>
    <MenuSeparator />
    <MenuItem variant="destructive">Delete</MenuItem>
  </MenuContent>
</Menu>
```

## Composition

```text
Menu
├── MenuTrigger
└── MenuContent
    ├── MenuGroup
    │   ├── MenuLabel
    │   └── MenuItem
    │       └── MenuShortcut
    ├── MenuCheckboxItem
    ├── MenuRadioGroup
    │   └── MenuRadioItem
    ├── MenuSeparator
    └── MenuSub
        ├── MenuSubTrigger
        └── MenuSubContent
```

## Examples

### Checkbox Items

```tsx
"use client"

import * as React from "react"

import { FilterIcon } from "@/components/icons"
import { Button } from "@/registry/base-nova/ui/button"
import { Menu, MenuCheckboxItem, MenuContent, MenuGroup, MenuLabel, MenuTrigger } from "@/registry/base-nova/ui/menu"

const columns = ["Status", "Assignee", "Due date", "Priority", "Estimate"]

export default function MenuCheckboxItems() {
  const [visible, setVisible] = React.useState<string[]>(["Status", "Assignee", "Due date"])
  return (
    <Menu>
      <MenuTrigger render={<Button variant="secondary" />}>
        <FilterIcon data-icon="inline-start" />
        Columns ({visible.length})
      </MenuTrigger>
      <MenuContent>
        <MenuGroup>
          <MenuLabel>Show columns</MenuLabel>
          {columns.map((column) => (
            <MenuCheckboxItem
              key={column}
              checked={visible.includes(column)}
              onCheckedChange={(checked) =>
                setVisible((prev) => (checked ? [...prev, column] : prev.filter((c) => c !== column)))
              }
            >
              {column}
            </MenuCheckboxItem>
          ))}
        </MenuGroup>
      </MenuContent>
    </Menu>
  )
}
```

### Radio Items

```tsx
"use client"

import * as React from "react"

import { SortIcon } from "@/components/icons"
import { Button } from "@/registry/base-nova/ui/button"
import { Menu, MenuContent, MenuGroup, MenuLabel, MenuRadioGroup, MenuRadioItem, MenuTrigger } from "@/registry/base-nova/ui/menu"

const options = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "name", label: "Name A–Z" },
  { value: "size", label: "Largest first" },
]

export default function MenuRadioItems() {
  const [sort, setSort] = React.useState("newest")
  const current = options.find((o) => o.value === sort)
  return (
    <Menu>
      <MenuTrigger render={<Button variant="secondary" />}>
        <SortIcon data-icon="inline-start" />
        {current?.label}
      </MenuTrigger>
      <MenuContent>
        <MenuGroup>
          <MenuLabel>Sort files</MenuLabel>
          <MenuRadioGroup value={sort} onValueChange={(value) => setSort(String(value))}>
            {options.map((o) => (
              <MenuRadioItem key={o.value} value={o.value}>
                {o.label}
              </MenuRadioItem>
            ))}
          </MenuRadioGroup>
        </MenuGroup>
      </MenuContent>
    </Menu>
  )
}
```

### Disabled and Destructive

```tsx
import { DownloadIcon, EditIcon, LinkIcon, MoreVerticalIcon, TrashIcon } from "@/components/icons"
import { Button } from "@/registry/base-nova/ui/button"
import { Menu, MenuContent, MenuItem, MenuSeparator, MenuShortcut, MenuTrigger } from "@/registry/base-nova/ui/menu"

export default function MenuDisabledAndDestructive() {
  return (
    <Menu>
      <MenuTrigger render={<Button variant="secondary" size="icon" aria-label="Invoice actions" />}>
        <MoreVerticalIcon />
      </MenuTrigger>
      <MenuContent align="end">
        <MenuItem>
          <DownloadIcon />
          Download PDF
          <MenuShortcut>⌘D</MenuShortcut>
        </MenuItem>
        <MenuItem>
          <LinkIcon />
          Copy payment link
        </MenuItem>
        <MenuItem disabled>
          <EditIcon />
          Edit (already paid)
        </MenuItem>
        <MenuSeparator />
        <MenuItem variant="destructive">
          <TrashIcon />
          Void invoice
        </MenuItem>
      </MenuContent>
    </Menu>
  )
}
```

### Inset

```tsx
import { CheckIcon } from "@/components/icons"
import { Button } from "@/registry/base-nova/ui/button"
import { Menu, MenuContent, MenuGroup, MenuItem, MenuLabel, MenuSeparator, MenuTrigger } from "@/registry/base-nova/ui/menu"

export default function MenuInset() {
  return (
    <Menu>
      <MenuTrigger render={<Button variant="secondary" />}>Workspace</MenuTrigger>
      <MenuContent>
        <MenuGroup>
          <MenuLabel inset>Switch workspace</MenuLabel>
          <MenuItem>
            <CheckIcon />
            paneui
          </MenuItem>
          <MenuItem inset>Novon</MenuItem>
          <MenuItem inset>Personal</MenuItem>
        </MenuGroup>
        <MenuSeparator />
        <MenuItem inset>Create workspace…</MenuItem>
      </MenuContent>
    </Menu>
  )
}
```

### RTL

```tsx
"use client"

import * as React from "react"
import { DirectionProvider } from "@base-ui/react/direction-provider"
import { LogOutIcon, SettingsIcon, UserIcon } from "@/components/icons"
import { Button } from "@/registry/base-nova/ui/button"
import {
  Menu,
  MenuCheckboxItem,
  MenuContent,
  MenuGroup,
  MenuItem,
  MenuLabel,
  MenuRadioGroup,
  MenuRadioItem,
  MenuSeparator,
  MenuShortcut,
  MenuSub,
  MenuSubContent,
  MenuSubTrigger,
  MenuTrigger,
} from "@/registry/base-nova/ui/menu"

export default function MenuRtl() {
  const [notify, setNotify] = React.useState(true)
  const [density, setDensity] = React.useState("comfortable")
  return (
    <DirectionProvider direction="rtl">
      <div dir="rtl">
        <Menu>
          <MenuTrigger render={<Button variant="secondary" />}>
            <UserIcon data-icon="inline-start" />
            الحساب
          </MenuTrigger>
          <MenuContent className="w-56">
            <MenuGroup>
              <MenuLabel>qinyang@example.com</MenuLabel>
              <MenuItem>
                <UserIcon />
                الملف الشخصي
                <MenuShortcut>⌘P</MenuShortcut>
              </MenuItem>
              <MenuItem>
                <SettingsIcon />
                الإعدادات
                <MenuShortcut>⌘,</MenuShortcut>
              </MenuItem>
            </MenuGroup>
            <MenuSeparator />
            <MenuCheckboxItem checked={notify} onCheckedChange={setNotify}>
              الإشعارات
            </MenuCheckboxItem>
            <MenuSub>
              <MenuSubTrigger>الكثافة</MenuSubTrigger>
              <MenuSubContent>
                <MenuRadioGroup value={density} onValueChange={setDensity}>
                  <MenuRadioItem value="compact">مضغوطة</MenuRadioItem>
                  <MenuRadioItem value="comfortable">مريحة</MenuRadioItem>
                  <MenuRadioItem value="spacious">واسعة</MenuRadioItem>
                </MenuRadioGroup>
              </MenuSubContent>
            </MenuSub>
            <MenuSeparator />
            <MenuItem>
              <LogOutIcon className="rtl:-scale-x-100" />
              تسجيل الخروج
            </MenuItem>
          </MenuContent>
        </Menu>
      </div>
    </DirectionProvider>
  )
}
```

## Keyboard

Arrow keys move the highlight, `Enter` or `Space` selects, `ArrowRight` opens a submenu and `ArrowLeft` or `Esc` closes it. Typing a letter jumps to the matching item.

## Motion

Popups scale from 95% at the trigger's edge over 200ms. Checkbox and radio indicators pop in with a short scale.

## API Reference

Built on [the Menu primitive](https://base-ui.com/react/components/menu#api-reference). Only the props this library adds or changes are listed; everything else passes through.

### Menu

Re-export of the primitive root. Also accepts every prop of [Menu.Root](https://base-ui.com/react/components/menu#root).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `open` | `boolean` | — | Controlled open state. |
| `onOpenChange` | `(open: boolean, eventDetails) => void` | — | Called when the menu opens or closes. |

### MenuTrigger

Re-export. Use `render` to make a Button the trigger. Also accepts every prop of [Menu.Trigger](https://base-ui.com/react/components/menu#trigger).

### MenuContent

Portal, positioner and popup in one. Also accepts every prop of [Menu.Popup](https://base-ui.com/react/components/menu#popup).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `side` | `"top" \| "right" \| "bottom" \| "left" \| "inline-start" \| "inline-end"` | `"bottom"` | Side of the trigger to open on. |
| `sideOffset` | `number` | `6` | Gap from the trigger in px. |
| `align` | `"start" \| "center" \| "end"` | `"start"` | Alignment against the trigger. |
| `alignOffset` | `number` | `0` | Shift along the alignment axis in px. |

### MenuItem

Also accepts every prop of [Menu.Item](https://base-ui.com/react/components/menu#item).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"default" \| "destructive"` | `"default"` | `destructive` tints the text, icon and highlight red. |
| `inset` | `boolean` | `false` | Left padding that matches items with an icon. |
| `disabled` | `boolean` | `false` | Dim the item and skip it. |
| `closeOnClick` | `boolean` | `true` | Close the menu when the item is chosen. |

| Data attribute | Description |
| --- | --- |
| `data-highlighted` | Present on the item under the pointer or keyboard focus. |
| `data-variant` | `default` or `destructive`. |

### MenuCheckboxItem

Item with a check indicator in the left gutter. Also accepts every prop of [Menu.CheckboxItem](https://base-ui.com/react/components/menu#checkbox-item).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `checked` | `boolean` | — | Controlled checked state. |
| `defaultChecked` | `boolean` | `false` | Initial state when uncontrolled. |
| `onCheckedChange` | `(checked: boolean, eventDetails) => void` | — | Called when toggled. |
| `closeOnClick` | `boolean` | `false` | Close the menu when toggled. |

### MenuRadioGroup

Re-export. Holds the selected value for its `MenuRadioItem`s. Also accepts every prop of [Menu.RadioGroup](https://base-ui.com/react/components/menu#radio-group).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `any` | — | Controlled selected value. |
| `defaultValue` | `any` | — | Initial value when uncontrolled. |
| `onValueChange` | `(value: any, eventDetails) => void` | — | Called when the selection changes. |

### MenuRadioItem

Item with a primary dot indicator in the left gutter. Also accepts every prop of [Menu.RadioItem](https://base-ui.com/react/components/menu#radio-item).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` (required) | `any` | — | Value selected by this item. |

### MenuGroup

Re-export. Groups items under a `MenuLabel`. Also accepts every prop of [Menu.Group](https://base-ui.com/react/components/menu#group).

### MenuLabel

Small muted heading for a group. Must sit inside a `MenuGroup`. Also accepts every prop of [Menu.GroupLabel](https://base-ui.com/react/components/menu#group-label).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `inset` | `boolean` | `false` | Indent to match inset items. |

### MenuSeparator

Also accepts every prop of [Menu.Separator](https://base-ui.com/react/components/menu#separator).

### MenuShortcut

Right-aligned monospace key hint inside an item. Also accepts every prop of `span`.

### MenuSub

Re-export. Root of a nested menu. Also accepts every prop of [Menu.SubmenuRoot](https://base-ui.com/react/components/menu#submenu-root).

### MenuSubTrigger

Item that opens the submenu, with a trailing chevron. Also accepts every prop of [Menu.SubmenuTrigger](https://base-ui.com/react/components/menu#submenu-trigger).

| Data attribute | Description |
| --- | --- |
| `data-popup-open` | Present while its submenu is open. |

### MenuSubContent

`MenuContent` preset to open on the right, aligned to the trigger item. Also accepts every prop of [MenuContent](#api-menucontent).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `side` | `same as MenuContent` | `"right"` |  |
| `sideOffset` | `number` | `4` |  |
| `alignOffset` | `number` | `-6` | Lines the first item up with the trigger. |
