# Resizable

> Split panes the user can resize or collapse.

Page: https://paneui.dev/docs/resizable/

## Installation

```bash
npx shadcn@latest add @paneui/resizable
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/resizable.json
```

Registry items it builds on: `@paneui/theme`.

## Usage

```tsx
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
```

```tsx
<ResizablePanelGroup direction="horizontal" autoSaveId="workspace">
  <ResizablePanel id="sidebar" defaultSize="240px" minSize="200px" collapsible>…</ResizablePanel>
  <ResizableHandle />
  <ResizablePanel id="main">…</ResizablePanel>
</ResizablePanelGroup>
```

## Composition

```text
ResizablePanelGroup
├── ResizablePanel
├── ResizableHandle
└── ResizablePanel
```

## Examples

### Collapsible

Use for sidebars that can be dragged shut or toggled from a button.

```tsx
"use client"

import * as React from "react"

import { SidebarIcon } from "@/components/icons"
import { Button } from "@/registry/base-nova/ui/button"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  type ResizablePanelGroupHandle,
} from "@/registry/base-nova/ui/resizable"

export default function ResizableCollapsible() {
  const group = React.useRef<ResizablePanelGroupHandle>(null)
  const [open, setOpen] = React.useState(true)
  return (
    <div className="flex w-full max-w-2xl flex-col gap-2">
      <Button variant="secondary" size="sm" className="self-start" onClick={() => group.current?.toggle("sidebar")}>
        <SidebarIcon data-icon="inline-start" />
        {open ? "Hide" : "Show"} sidebar
      </Button>
      <div className="h-56 overflow-hidden rounded-xl bg-card shadow-raised">
        <ResizablePanelGroup handleRef={group}>
          <ResizablePanel id="sidebar" defaultSize="200px" minSize="160px" maxSize="320px" collapsible onCollapsedChange={(c) => setOpen(!c)}>
            <div className="h-full bg-shell p-3 text-ui text-muted-foreground">Sidebar</div>
          </ResizablePanel>
          <ResizableHandle variant="hidden" />
          <ResizablePanel id="main">
            <div className="flex h-full items-center justify-center p-3 text-center text-ui text-pretty text-muted-foreground">
              Drag the edge past the minimum to collapse it, or press Enter on the focused divider.
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  )
}
```

### With Handle

Use where the divider is easy to miss.

```tsx
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/registry/base-nova/ui/resizable"

export default function ResizableWithHandle() {
  return (
    <div className="h-48 w-full max-w-xl overflow-hidden rounded-xl bg-card shadow-raised">
      <ResizablePanelGroup>
        <ResizablePanel id="left" minSize={20}>
          <div className="flex h-full items-center justify-center text-ui text-muted-foreground">Chat A</div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel id="right" minSize={20}>
          <div className="flex h-full items-center justify-center text-ui text-muted-foreground">Chat B</div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
```

## Sizes

Sizes are percentages of the group, or pixel strings like `"240px"` for `defaultSize`, `minSize`, `maxSize` and `collapsedSize` (converted with the group's current size). Panels without `defaultSize` share what is left.

## Persistence

`autoSaveId` stores sizes and collapsed state in `localStorage["resizable:<id>"]` when a drag, key press or collapse settles. The saved layout is used only while the set of panel ids is unchanged.

## Keyboard

The divider is a focusable `separator`. Arrow keys move it 2% (10% with Shift), Enter collapses or expands the collapsible neighbour, double click resets every panel to its default.

## Motion

Panels follow the pointer exactly while dragging; collapse and expand ease `flex-grow` over 200ms, instant with reduced motion. The primary guide on the divider appears after a 150ms hover.

## API Reference

### ResizablePanelGroup

Flex container that owns the sizes. Also accepts every prop of `div`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `direction` | `"horizontal" \| "vertical"` | `"horizontal"` | Lay panels out in a row or a column. |
| `autoSaveId` | `string` | — | Persist the layout under this key. |
| `onLayout` | `(sizes: number[]) => void` | — | Called with percentages whenever the layout settles. |
| `handleRef` | `Ref<ResizablePanelGroupHandle>` | — | Imperative handle with `collapse(id)`, `expand(id)`, `toggle(id)`, `isCollapsed(id)`, `getSizes()`, `setSizes(sizes)` and `reset()`. |

| Data attribute | Description |
| --- | --- |
| `data-dragging` | Present while a divider is dragged. |

### ResizablePanel

Also accepts every prop of `div`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `id` | `string` | — | Stable id for the imperative API and saved layouts. |
| `defaultSize` | number \| `${number}px` | — | Initial size. |
| `minSize` | number \| `${number}px` | `0` | Smallest size while dragging. |
| `maxSize` | number \| `${number}px` | `100` | Largest size while dragging. |
| `collapsible` | `boolean` | `false` | Snap to `collapsedSize` when dragged past half of `minSize`. |
| `collapsedSize` | number \| `${number}px` | `0` | Size when collapsed. |
| `onCollapsedChange` | `(collapsed: boolean) => void` | — | Called when the panel collapses or expands. |

| Data attribute | Description |
| --- | --- |
| `data-collapsed` | Present while collapsed. |

### ResizableHandle

Also accepts every prop of `div`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"line" \| "hidden"` | `"line"` | `hidden` drops the resting hairline; the guide still shows on hover and drag. |
| `withHandle` | `boolean` | `false` | Show a grip in the middle. |
| `keyboardStep` | `number` | `2` | Percent per arrow key press. |

| Data attribute | Description |
| --- | --- |
| `data-active` | Present while this divider is dragged. |
