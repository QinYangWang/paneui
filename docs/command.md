# Command

> Searchable list of actions, inline or in a dialog.

Page: https://paneui.dev/docs/command/

## Installation

```bash
npx shadcn@latest add @paneui/command
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/command.json
```

Packages: `@base-ui/react`.

Registry items it builds on: `@paneui/theme`, `@paneui/icons`.

## Usage

```tsx
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command"
```

```tsx
<Command>
  <CommandInput placeholder="Type a command…" />
  <CommandList>
    <CommandEmpty>No results.</CommandEmpty>
    <CommandGroup heading="Files">
      <CommandItem onSelect={() => createFile()}>
        New file
        <CommandShortcut>⌘N</CommandShortcut>
      </CommandItem>
    </CommandGroup>
  </CommandList>
</Command>
```

## Composition

```text
Command  (or CommandDialog)
├── CommandInput
└── CommandList
    ├── CommandEmpty
    ├── CommandGroup
    │   └── CommandItem
    │       └── CommandShortcut
    └── CommandSeparator
```

## Examples

### Dialog

Use for an app-wide palette opened with a shortcut.

```tsx
"use client"

import * as React from "react"

import { FileIcon, InboxIcon, SettingsIcon } from "@/components/icons"
import { Button } from "@/registry/base-nova/ui/button"
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandShortcut } from "@/registry/base-nova/ui/command"
import { Kbd, KbdGroup } from "@/registry/base-nova/ui/kbd"

export default function CommandDialogExample() {
  const [open, setOpen] = React.useState(false)
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])
  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        Open palette
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>J</Kbd>
        </KbdGroup>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search or run a command…" aria-label="Search commands" />
        <CommandList>
          <CommandEmpty>No results.</CommandEmpty>
          <CommandGroup heading="Go to">
            <CommandItem onSelect={() => setOpen(false)}>
              <InboxIcon />
              Inbox
            </CommandItem>
            <CommandItem onSelect={() => setOpen(false)}>
              <SettingsIcon />
              Settings
              <CommandShortcut>⌘,</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Create">
            <CommandItem onSelect={() => setOpen(false)}>
              <FileIcon />
              New document
              <CommandShortcut>⌘N</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
```

## Keyboard

↑/↓ (or Ctrl+N / Ctrl+P) move the highlight, Enter runs it, typing filters. Groups with no matches hide, and separators hide while searching.

## Filtering

Items rank by prefix, then substring, then letters in order, across `value` and `keywords`. Pass `filter` to change the ranking, or `shouldFilter={false}` when you filter the items yourself.

## API Reference

### Command

Also accepts every prop of `div`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `search` | `string` | — | Controlled search text. |
| `onSearchChange` | `(search: string) => void` | — | Called as the input changes. |
| `filter` | `(value, search, keywords?) => number` | `prefix / substring / in-order letters` | Ranking; 0 hides the item. |
| `shouldFilter` | `boolean` | `true` | Set false for server-filtered items. |
| `loop` | `boolean` | `false` | Wrap at the ends with the arrow keys. |

### CommandDialog

The Command in a centred dialog; the input takes focus on open. Also accepts every prop of [Dialog.Root](https://base-ui.com/react/components/dialog#root).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | `"Command palette"` | Screen-reader title. |
| `commandProps` | `CommandProps` | — | Props for the inner Command. |

### CommandItem

Also accepts every prop of `div`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` | `the text content` | Identity and search text. |
| `keywords` | `string[]` | — | Extra words that match. |
| `onSelect` | `(value: string) => void` | — | Runs on click or Enter. |
| `disabled` | `boolean` | `false` | Skip in navigation and dim. |

| Data attribute | Description |
| --- | --- |
| `data-selected` | Present on the highlighted item. |

### CommandInput

Also accepts every prop of `input`.

### CommandList

Scrolls at 20rem. Also accepts every prop of `div`.

### CommandEmpty

Rendered only when nothing matches. Also accepts every prop of `div`.

### CommandGroup

Also accepts every prop of `div`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `heading` | `ReactNode` | — | Label above the items. |

### CommandSeparator

Also accepts every prop of `div`.

### CommandShortcut

Also accepts every prop of `span`.
