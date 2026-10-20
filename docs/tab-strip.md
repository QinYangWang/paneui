# Tab Strip

> Switches, closes and reorders document tabs.

Page: https://paneui.dev/docs/tab-strip/

## Installation

```bash
npx shadcn@latest add @paneui/tab-strip
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/tab-strip.json
```

Packages: `motion`, `@base-ui/react`.

Registry items it builds on: `@paneui/theme`, `@paneui/icons`, `@paneui/overflow-hint`.

## Usage

```tsx
import { TabStrip, TabStripItem } from "@/components/ui/tab-strip"
```

```tsx
<TabStrip value={active} onValueChange={setActive} order={order} onReorder={setOrder} onClose={close}>
  {order.map((id) => (
    <TabStripItem key={id} value={id} icon={<FileIcon />}>{titles[id]}</TabStripItem>
  ))}
</TabStrip>
```

## Composition

```text
TabStrip
└── TabStripItem
```

## Examples

### Pill

```tsx
"use client"

import * as React from "react"

import { FolderIcon, GlobeIcon, TerminalSquareIcon } from "@/components/icons"
import { TabStrip, TabStripItem } from "@/registry/base-nova/ui/tab-strip"

export default function TabStripPill() {
  const [tab, setTab] = React.useState("terminal")
  return (
    <div className="w-full max-w-md frame-2xl frame-inset-1.75 bg-card p-1.5 shadow-raised">
      <TabStrip variant="pill" value={tab} onValueChange={setTab} aria-label="Panels">
        <TabStripItem value="terminal" icon={<TerminalSquareIcon />}>
          Terminal
        </TabStripItem>
        <TabStripItem value="explorer" icon={<FolderIcon />}>
          Explorer
        </TabStripItem>
        <TabStripItem value="browser" icon={<GlobeIcon />}>
          Browser
        </TabStripItem>
      </TabStrip>
    </div>
  )
}
```

### Overflow

```tsx
"use client"

import * as React from "react"

import { FileIcon } from "@/components/icons"
import { TabStrip, TabStripItem } from "@/registry/base-nova/ui/tab-strip"

const FILES = ["page.tsx", "layout.tsx", "globals.css", "utils.ts", "button.tsx", "dialog.tsx", "menu.tsx", "tabs.tsx"]

export default function TabStripOverflow() {
  const [tab, setTab] = React.useState("page.tsx")
  return (
    <div className="w-full max-w-sm frame-2xl frame-inset-1.75 bg-shell p-1.5">
      <TabStrip value={tab} onValueChange={setTab} aria-label="Open files">
        {FILES.map((f, i) => (
          <TabStripItem key={f} value={f} icon={<FileIcon />} indicator={i === 2}>
            {f}
          </TabStripItem>
        ))}
      </TabStrip>
    </div>
  )
}
```

## Reorder

Pass `order` and `onReorder` and render children in that order to enable dragging; with reduced motion tabs move instantly. On touch screens a swipe scrolls the strip instead, so dragging is off and tabs and close buttons grow to 32px and 24px targets. Without them the strip is static.

## Overflow

Extra tabs scroll sideways and the selected tab is kept in view.

## Long titles

A truncated title shows its full text in a hint below the tab after 300ms of hover. The pointer can move into the hint to select and copy the text; pressing the tab closes it. Pass `hint` to show other text, or `hint={false}` to turn it off.

## Closing

With `onClose`, tabs show a close button on hover (always on the selected tab), close on middle click, and on ⌫ / Delete when focused. Set `closable={false}` on a tab to keep it.

## Keyboard

The strip is a `tablist`. ← / → move and select, Home / End jump to the ends, and Enter or Space selects.

## API Reference

### TabStrip

Also accepts every prop of `div`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string \| null` | — | Selected tab (controlled). |
| `defaultValue` | `string \| null` | — | Initial tab (uncontrolled). |
| `onValueChange` | `(value: string) => void` | — | Called when a tab is selected. |
| `order` | `string[]` | — | Tab values in display order; enables drag to reorder with `onReorder`. |
| `onReorder` | `(order: string[]) => void` | — | Called with the new order while dragging. |
| `onClose` | `(value: string) => void` | — | Shows close buttons and handles middle click / Delete. |
| `variant` | `"default" \| "pill"` | `"default"` | Raised card (document tabs on the window band) or fill (panel tabs). |
| `actions` | `ReactNode` | — | Pinned after the scrolling tabs. |

### TabStripItem

Also accepts every prop of `div`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` (required) | `string` | — | Identifies the tab. |
| `icon` | `ReactNode` | — | Leading glyph, sized to 14px. |
| `closable` | `boolean` | — | Override whether this tab shows a close button. |
| `indicator` | `boolean` | — | Primary dot after the label. |
| `disabled` | `boolean` | — | Dim and skip the tab. |
| `hint` | `ReactNode \| false` | — | Full text shown on hover while the title is truncated. Defaults to the title; `false` turns it off. |

| Data attribute | Description |
| --- | --- |
| `data-selected` | Present on the selected tab. |
