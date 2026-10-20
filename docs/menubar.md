# Menubar

> Row of menus for a desktop app window.

Page: https://paneui.dev/docs/menubar/

## Installation

```bash
npx shadcn@latest add @paneui/menubar
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/menubar.json
```

Packages: `@base-ui/react`.

Registry items it builds on: `@paneui/theme`, `@paneui/menu`.

## Usage

```tsx
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"
```

```tsx
<Menubar>
  <MenubarMenu>
    <MenubarTrigger>File</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>
        New tab<MenubarShortcut>⌘T</MenubarShortcut>
      </MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>
```

## Composition

```text
Menubar
└── MenubarMenu
    ├── MenubarTrigger
    └── MenubarContent
        ├── MenubarItem / MenubarCheckboxItem / MenubarRadioGroup
        ├── MenubarSub → MenubarSubTrigger, MenubarSubContent
        └── MenubarSeparator
```

## Examples

### Radio Items

```tsx
"use client"

import * as React from "react"

import {
  Menubar,
  MenubarContent,
  MenubarGroup,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarTrigger,
} from "@/registry/base-nova/ui/menubar"

export default function MenubarRadioItems() {
  const [sort, setSort] = React.useState("modified")
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Sort</MenubarTrigger>
        <MenubarContent>
          <MenubarGroup>
            <MenubarLabel>Sort by</MenubarLabel>
            <MenubarRadioGroup value={sort} onValueChange={setSort}>
              <MenubarRadioItem value="name">Name</MenubarRadioItem>
              <MenubarRadioItem value="modified">Date modified</MenubarRadioItem>
              <MenubarRadioItem value="size">Size</MenubarRadioItem>
            </MenubarRadioGroup>
          </MenubarGroup>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}
```

## Keyboard

←/→ move between menus; once one is open, hovering or arrowing to another trigger switches menus. Items inside behave as in `Menu`.

## API Reference

Built on [the Menubar primitive](https://base-ui.com/react/components/menubar#api-reference). Only the props this library adds or changes are listed; everything else passes through.

### Menubar

Also accepts every prop of [Menubar](https://base-ui.com/react/components/menubar).

### MenubarMenu

Re-export of the menu root. Also accepts every prop of [Menu.Root](https://base-ui.com/react/components/menu#root).

### MenubarTrigger

Also accepts every prop of [Menu.Trigger](https://base-ui.com/react/components/menu#trigger).

| Data attribute | Description |
| --- | --- |
| `data-popup-open` | Present while its menu is open. |

### MenubarContent

`MenuContent`, aligned to the trigger's start. Also accepts every prop of [MenuContent](/docs/menu#api-reference).

### MenubarItem, MenubarCheckboxItem, MenubarRadioItem…

The `Menu` parts under menubar names. Also accepts every prop of [Menu parts](/docs/menu#api-reference).
