# Toolbar

> Groups related actions into one keyboard-navigable bar.

Page: https://paneui.dev/docs/toolbar/

## Installation

```bash
npx shadcn@latest add @paneui/toolbar
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/toolbar.json
```

Packages: `@base-ui/react`, `class-variance-authority`.

Registry items it builds on: `@paneui/theme`.

## Usage

```tsx
import { Toolbar, ToolbarButton, ToolbarSeparator, ToolbarToggle } from "@/components/ui/toolbar"
```

```tsx
<Toolbar variant="floating" aria-label="Format">
  <ToolbarToggle aria-label="Bold" pressed={bold} onPressedChange={setBold}>
    <BoldIcon />
  </ToolbarToggle>
  <ToolbarSeparator />
  <ToolbarButton aria-label="Link"><LinkIcon /></ToolbarButton>
</Toolbar>
```

## Composition

```text
Toolbar
├── ToolbarGroup
│   ├── ToolbarButton
│   └── ToolbarToggle
├── ToolbarSeparator
├── ToolbarLink
└── ToolbarInput
```

## Examples

### Document Bar

```tsx
"use client"

import { DownloadIcon, UndoIcon, UploadIcon } from "@/components/icons"
import { Toolbar, ToolbarButton, ToolbarGroup, ToolbarSeparator } from "@/registry/base-nova/ui/toolbar"

export default function ToolbarDocumentBar() {
  return (
    <div className="frame-xl frame-inset-2 w-full max-w-lg bg-card px-2 shadow-raised">
      <Toolbar aria-label="Document" className="h-11">
        <ToolbarGroup>
          <ToolbarButton aria-label="Undo">
            <UndoIcon className="rtl:-scale-x-100" />
          </ToolbarButton>
          <ToolbarButton aria-label="Redo" disabled>
            <UndoIcon className="-scale-x-100 rtl:scale-x-100" />
          </ToolbarButton>
        </ToolbarGroup>
        <span className="ml-auto px-2 text-xs text-muted-foreground tabular-nums">128 words</span>
        <ToolbarSeparator />
        <ToolbarButton size="label">
          <UploadIcon />
          Import
        </ToolbarButton>
        <ToolbarButton size="label">
          <DownloadIcon />
          Export
        </ToolbarButton>
      </Toolbar>
    </div>
  )
}
```

### Inset

```tsx
"use client"

import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon } from "@/components/icons"
import { Toolbar, ToolbarToggle } from "@/registry/base-nova/ui/toolbar"

export default function ToolbarInset() {
  return (
    <Toolbar variant="inset" aria-label="Alignment">
      <ToolbarToggle aria-label="Align left" defaultPressed>
        <AlignLeftIcon />
      </ToolbarToggle>
      <ToolbarToggle aria-label="Align centre">
        <AlignCenterIcon />
      </ToolbarToggle>
      <ToolbarToggle aria-label="Align right">
        <AlignRightIcon />
      </ToolbarToggle>
    </Toolbar>
  )
}
```

## Keyboard

The toolbar is one tab stop. Arrow keys move between items (looping) and `Home` / `End` jump to the ends. Menu and popover triggers join the loop with `render={<ToolbarButton />}`.

## Radii

`floating` is `rounded-xl` with `p-1`, so its 28px items take `rounded-inner` (10px). The plain variant falls back to `rounded-lg` items.

## API Reference

Built on [the Toolbar primitive](https://base-ui.com/react/components/toolbar#api-reference). Only the props this library adds or changes are listed; everything else passes through.

### Toolbar

Also accepts every prop of [Toolbar.Root](https://base-ui.com/react/components/toolbar#api-reference).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"default" \| "floating" \| "inset"` | `"default"` | `floating` is the popover surface for selection bubbles; `inset` sits in a well. |

### ToolbarButton

Also accepts every prop of [Toolbar.Button](https://base-ui.com/react/components/toolbar#api-reference).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | `"icon" \| "label"` | `"icon"` | `icon` is a 28px square; `label` adds padding for text. |

| Data attribute | Description |
| --- | --- |
| `data-pressed` | Set it yourself for a toggled look on a non-toggle (an active link). |

### ToolbarToggle

A toggle inside the toolbar. Also accepts every prop of [Toolbar.Button](https://base-ui.com/react/components/toolbar#api-reference).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `pressed` | `boolean` | — | Controlled pressed state. |
| `defaultPressed` | `boolean` | — | Uncontrolled initial state. |
| `onPressedChange` | `(pressed: boolean) => void` | — | Called when toggled. |
| `size` | `"icon" \| "label"` | `"icon"` | As on ToolbarButton. |

### ToolbarSeparator

Also accepts every prop of [Toolbar.Separator](https://base-ui.com/react/components/toolbar#api-reference).

### ToolbarGroup

Also accepts every prop of [Toolbar.Group](https://base-ui.com/react/components/toolbar#api-reference).

### ToolbarInput

Also accepts every prop of [Toolbar.Input](https://base-ui.com/react/components/toolbar#api-reference).

### ToolbarLink

Also accepts every prop of [Toolbar.Link](https://base-ui.com/react/components/toolbar#api-reference).
