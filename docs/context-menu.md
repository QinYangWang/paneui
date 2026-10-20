# Context Menu

> Opens actions for an item on right-click or long-press.

Page: https://paneui.dev/docs/context-menu/

## Installation

```bash
npx shadcn@latest add @paneui/context-menu
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/context-menu.json
```

Packages: `@base-ui/react`.

Registry items it builds on: `@paneui/theme`, `@paneui/icons`, `@paneui/menu`.

## Usage

```tsx
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu"
```

```tsx
<ContextMenu>
  <ContextMenuTrigger>Right-click here</ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>Rename</ContextMenuItem>
    <ContextMenuItem variant="destructive">Delete</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>
```

## Composition

```text
ContextMenu
├── ContextMenuTrigger
└── ContextMenuContent
    ├── ContextMenuGroup
    │   ├── ContextMenuLabel
    │   └── ContextMenuItem
    │       └── ContextMenuShortcut
    ├── ContextMenuSeparator
    ├── ContextMenuCheckboxItem
    ├── ContextMenuRadioGroup
    │   └── ContextMenuRadioItem
    └── ContextMenuSub
        ├── ContextMenuSubTrigger
        └── ContextMenuSubContent
```

## Examples

### Basic

```tsx
import { CopyIcon, DownloadIcon, EditIcon, TrashIcon } from "@/components/icons"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/registry/base-nova/ui/context-menu"

export default function ContextMenuBasic() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-32 w-full max-w-xs items-center justify-center rounded-2xl bg-muted/50 text-sm text-muted-foreground shadow-well">
        Right-click invoice-0412.pdf
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>
          <EditIcon />
          Rename
          <ContextMenuShortcut>F2</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          <CopyIcon />
          Duplicate
          <ContextMenuShortcut>⌘D</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          <DownloadIcon />
          Download
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem variant="destructive">
          <TrashIcon />
          Delete
          <ContextMenuShortcut>⌫</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}
```

### Checkboxes

Use checkbox items for toggles; the menu stays open so several can change.

```tsx
"use client"

import * as React from "react"

import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuLabel,
  ContextMenuTrigger,
} from "@/registry/base-nova/ui/context-menu"

export default function ContextMenuCheckboxes() {
  const [columns, setColumns] = React.useState({ owner: true, size: true, modified: false })

  const toggle = (key: keyof typeof columns) => (checked: boolean) =>
    setColumns((prev) => ({ ...prev, [key]: checked }))

  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-32 w-full max-w-xs items-center justify-center rounded-2xl bg-muted/50 text-sm text-muted-foreground shadow-well">
        Right-click the table header
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuGroup>
          <ContextMenuLabel inset>Columns</ContextMenuLabel>
          <ContextMenuCheckboxItem checked={columns.owner} onCheckedChange={toggle("owner")}>
            Owner
          </ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem checked={columns.size} onCheckedChange={toggle("size")}>
            Size
          </ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem checked={columns.modified} onCheckedChange={toggle("modified")}>
            Last modified
          </ContextMenuCheckboxItem>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  )
}
```

### Radio Group

Use a radio group when the reader picks one option, like a sort order.

```tsx
"use client"

import * as React from "react"

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuTrigger,
} from "@/registry/base-nova/ui/context-menu"

export default function ContextMenuRadioGroupExample() {
  const [density, setDensity] = React.useState("comfortable")

  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-32 w-full max-w-xs flex-col items-center justify-center gap-1 rounded-2xl bg-muted/50 text-sm text-muted-foreground shadow-well">
        Right-click the inbox
        <span className="text-xs capitalize">{density}</span>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuGroup>
          <ContextMenuLabel inset>Density</ContextMenuLabel>
          <ContextMenuRadioGroup value={density} onValueChange={setDensity}>
            <ContextMenuRadioItem value="compact">Compact</ContextMenuRadioItem>
            <ContextMenuRadioItem value="comfortable">Comfortable</ContextMenuRadioItem>
            <ContextMenuRadioItem value="spacious">Spacious</ContextMenuRadioItem>
          </ContextMenuRadioGroup>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  )
}
```

### Inset

```tsx
"use client"

import * as React from "react"

import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/registry/base-nova/ui/context-menu"

export default function ContextMenuInset() {
  const [bookmarks, setBookmarks] = React.useState(true)

  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-32 w-full max-w-xs items-center justify-center rounded-2xl bg-muted/50 text-sm text-muted-foreground shadow-well">
        Right-click the page
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem inset>
          Back
          <ContextMenuShortcut>⌘[</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset>
          Reload
          <ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuCheckboxItem checked={bookmarks} onCheckedChange={setBookmarks}>
          Show bookmarks bar
        </ContextMenuCheckboxItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}
```

## Motion

The menu grows out of the exact point that was clicked. With reduced motion it fades without scaling.

## Keyboard

Opens on right-click or long-press. Arrow keys move between items, Enter selects, Arrow Right opens a submenu and Esc closes.

## Related

The items are shared with [Menu](https://paneui.dev/docs/menu), so both menus always look the same.

## API Reference

Built on [the Context Menu primitive](https://base-ui.com/react/components/context-menu#api-reference). Only the props this library adds or changes are listed; everything else passes through.

### ContextMenu

Also accepts every prop of [ContextMenu.Root](https://base-ui.com/react/components/context-menu#root).

### ContextMenuTrigger

The area that opens the menu. Unstyled apart from disabling text selection and the iOS callout. Also accepts every prop of [ContextMenu.Trigger](https://base-ui.com/react/components/context-menu#trigger).

### ContextMenuContent

The popup, already wrapped in a portal and positioner. Also accepts every prop of [ContextMenu.Popup](https://base-ui.com/react/components/context-menu#popup).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `side` | `"top" \| "right" \| "bottom" \| "left" \| "inline-start" \| "inline-end"` | — | Side of the pointer it opens on. |
| `sideOffset` | `number` | `4` | Gap to the pointer in px. |
| `align` | `"start" \| "center" \| "end"` | `"start"` | Alignment against the pointer. |
| `alignOffset` | `number` | `4` | Shift along the alignment axis in px. |

### ContextMenuItem

Also accepts every prop of [ContextMenu.Item](https://base-ui.com/react/components/context-menu#item).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"default" \| "destructive"` | `"default"` | `destructive` tints the text, icon and highlight. |
| `inset` | `boolean` | `false` | Indent to line up with checkbox and radio items. |

| Data attribute | Description |
| --- | --- |
| `data-highlighted` | Present on the item under the pointer or keyboard focus. |

### ContextMenuCheckboxItem

Item with a check mark on the left. Also accepts every prop of [ContextMenu.CheckboxItem](https://base-ui.com/react/components/context-menu#checkboxitem).

### ContextMenuRadioGroup

Also accepts every prop of [ContextMenu.RadioGroup](https://base-ui.com/react/components/context-menu#radiogroup).

### ContextMenuRadioItem

Item with a primary dot on the left when selected. Also accepts every prop of [ContextMenu.RadioItem](https://base-ui.com/react/components/context-menu#radioitem).

### ContextMenuGroup

Also accepts every prop of [ContextMenu.Group](https://base-ui.com/react/components/context-menu#group).

### ContextMenuLabel

Small muted heading for a group. Place it inside a `ContextMenuGroup`. Also accepts every prop of [ContextMenu.GroupLabel](https://base-ui.com/react/components/context-menu#grouplabel).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `inset` | `boolean` | `false` | Indent to line up with checkbox and radio items. |

### ContextMenuSeparator

Also accepts every prop of [ContextMenu.Separator](https://base-ui.com/react/components/context-menu#separator).

### ContextMenuShortcut

Right-aligned monospace hint, e.g. `⌘D`. Visual only. Also accepts every prop of `span`.

### ContextMenuSub

Also accepts every prop of [ContextMenu.SubmenuRoot](https://base-ui.com/react/components/context-menu#submenuroot).

### ContextMenuSubTrigger

Item with a trailing chevron that opens the submenu. Also accepts every prop of [ContextMenu.SubmenuTrigger](https://base-ui.com/react/components/context-menu#submenutrigger).

| Data attribute | Description |
| --- | --- |
| `data-popup-open` | Present while its submenu is open. |

### ContextMenuSubContent

The submenu popup. Opens to the right by default; takes the same props as `MenuContent`. Also accepts every prop of [Menu.Popup](https://base-ui.com/react/components/menu#popup).
