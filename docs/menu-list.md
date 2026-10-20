# Menu List

> Keyboard-driven option list that leaves focus in the text field.

Page: https://paneui.dev/docs/menu-list/

## Installation

```bash
npx shadcn@latest add @paneui/menu-list
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/menu-list.json
```

Packages: `class-variance-authority`.

Registry items it builds on: `@paneui/theme`.

## Usage

```tsx
import { MenuList, MenuListItem, type MenuListHandle } from "@/components/ui/menu-list"
```

```tsx
const list = React.useRef<MenuListHandle>(null)

<Input onKeyDown={(e) => list.current?.onKeyDown(e) && e.preventDefault()} />
<MenuList ref={list} aria-label="Blocks">
  <MenuListItem value="text" onSelect={() => insert("text")}>Text</MenuListItem>
  <MenuListItem value="h1" onSelect={() => insert("h1")}>Heading 1</MenuListItem>
</MenuList>
```

## Composition

```text
MenuList
├── MenuListGroup
│   ├── MenuListLabel
│   └── MenuListItem
│       ├── MenuListItemText
│       └── MenuListShortcut
├── MenuListSeparator
└── MenuListEmpty
```

## Examples

### Plain

```tsx
"use client"

import { MenuList, MenuListItem, MenuListSeparator } from "@/registry/base-nova/ui/menu-list"

export default function MenuListPlain() {
  return (
    <div className="frame-xl frame-p-1 w-48 bg-card shadow-raised">
      <MenuList variant="plain" tabIndex={0} aria-label="Sort">
        <MenuListItem value="newest">Newest first</MenuListItem>
        <MenuListItem value="oldest">Oldest first</MenuListItem>
        <MenuListSeparator />
        <MenuListItem value="name">Name A–Z</MenuListItem>
        <MenuListItem value="size" disabled>
          Size (soon)
        </MenuListItem>
      </MenuList>
    </div>
  )
}
```

## Why not Menu

`Menu` moves focus into its popup. Slash menus, mention pickers and autocomplete need focus to stay in the text, so `MenuList` tracks a highlighted value and exposes it with `aria-activedescendant`. The block and email editors use it for `/` and `{{`.

## Keyboard

`ref.current.onKeyDown(event)` handles `ArrowUp` / `ArrowDown` (looping), `Home` / `End`, and `Enter` / `Tab` (clicks the highlighted item); it returns true when it used the key. The highlight resets to the first item when the list changes under it.

## API Reference

### MenuList

Also accepts every prop of `div`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `ref` | `React.Ref<MenuListHandle>` | — | `{ onKeyDown(event): boolean, move(delta), select(): boolean }`. |
| `variant` | `"popup" \| "plain"` | `"popup"` | `popup` is the menu surface (`rounded-xl`, `p-1`, max-height 320px, scrolls). |
| `activeValue` | `string` | — | Controlled highlighted item. |
| `defaultActiveValue` | `string` | — | Initial highlight (else the first item). |
| `onActiveValueChange` | `(value: string) => void` | — | Called as the highlight moves. |
| `loop` | `boolean` | `true` | Wrap from the last item to the first. |

### MenuListItem

Also accepts every prop of `div`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` (required) | `string` | — | Unique value for the highlight. |
| `onSelect` | `() => void` | — | Called on click or Enter. |
| `disabled` | `boolean` | — | Skipped by the keyboard, dimmed. |

| Data attribute | Description |
| --- | --- |
| `data-highlighted` | Present on the highlighted item. |

### MenuListItemText

Also accepts every prop of `span`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` (required) | `React.ReactNode` | — | The item label. |
| `description` | `React.ReactNode` | — | A muted second line. |
