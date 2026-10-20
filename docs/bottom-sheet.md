# Bottom Sheet

> Opens a panel from the bottom of the page.

Page: https://paneui.dev/docs/bottom-sheet/

## Installation

```bash
npx shadcn@latest add @paneui/bottom-sheet
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/bottom-sheet.json
```

Packages: `@base-ui/react`, `motion`.

Registry items it builds on: `@paneui/theme`.

## Usage

```tsx
import {
  BottomSheet,
  BottomSheetBody,
  BottomSheetContent,
  BottomSheetHeader,
  BottomSheetTitle,
  BottomSheetTrigger,
} from "@/components/ui/bottom-sheet"
```

```tsx
<BottomSheet snapPoints={[0.45, 0.9]}>
  <BottomSheetTrigger render={<Button variant="secondary" />}>Open</BottomSheetTrigger>
  <BottomSheetContent>
    <BottomSheetHeader>
      <BottomSheetTitle>Friday, travel day</BottomSheetTitle>
    </BottomSheetHeader>
    <BottomSheetBody>…</BottomSheetBody>
  </BottomSheetContent>
</BottomSheet>
```

## Composition

```text
BottomSheet
├── BottomSheetTrigger
└── BottomSheetContent
    ├── BottomSheetHandle (added for you)
    ├── BottomSheetHeader
    │   ├── BottomSheetTitle
    │   └── BottomSheetDescription
    ├── BottomSheetBody
    └── BottomSheetFooter
        └── BottomSheetClose
```

## Examples

### Single Snap

Use one snap point for short content; the handle then only drags to close.

```tsx
import { Button } from "@/registry/base-nova/ui/button"
import {
  BottomSheet,
  BottomSheetBody,
  BottomSheetClose,
  BottomSheetContent,
  BottomSheetDescription,
  BottomSheetFooter,
  BottomSheetHeader,
  BottomSheetTitle,
  BottomSheetTrigger,
} from "@/registry/base-nova/ui/bottom-sheet"

export default function BottomSheetSingleSnap() {
  return (
    <BottomSheet snapPoints={[0.4]}>
      <BottomSheetTrigger render={<Button variant="secondary" />}>Share trip</BottomSheetTrigger>
      <BottomSheetContent>
        <BottomSheetHeader>
          <BottomSheetTitle>Share “Kyoto, November”</BottomSheetTitle>
          <BottomSheetDescription>Anyone with the link can view the itinerary.</BottomSheetDescription>
        </BottomSheetHeader>
        <BottomSheetBody className="text-muted-foreground">
          Bookings and prices stay private. Drag the handle down to dismiss.
        </BottomSheetBody>
        <BottomSheetFooter>
          <BottomSheetClose render={<Button className="w-full" />}>Copy link</BottomSheetClose>
        </BottomSheetFooter>
      </BottomSheetContent>
    </BottomSheet>
  )
}
```

### Controlled Snap

```tsx
"use client"

import * as React from "react"

import { Button } from "@/registry/base-nova/ui/button"
import {
  BottomSheet,
  BottomSheetBody,
  BottomSheetContent,
  BottomSheetHeader,
  BottomSheetTitle,
  BottomSheetTrigger,
} from "@/registry/base-nova/ui/bottom-sheet"

const SNAPS = [0.3, 0.6, 0.9]
const names = ["Peek", "Half", "Full"]

export default function BottomSheetControlledSnap() {
  const [snap, setSnap] = React.useState(0)

  return (
    <BottomSheet snapPoints={SNAPS} snap={snap} onSnapChange={setSnap}>
      <BottomSheetTrigger render={<Button variant="secondary" />}>Nearby stations</BottomSheetTrigger>
      <BottomSheetContent>
        <BottomSheetHeader>
          <BottomSheetTitle>3 stations within 500 m</BottomSheetTitle>
        </BottomSheetHeader>
        <BottomSheetBody className="flex flex-col gap-4">
          <div className="flex gap-2">
            {names.map((name, i) => (
              <Button key={name} size="sm" variant={snap === i ? "default" : "secondary"} onClick={() => setSnap(i)}>
                {name}
              </Button>
            ))}
          </div>
          <p className="text-muted-foreground">
            Drag the handle or press a button; both update the same snap index.
          </p>
        </BottomSheetBody>
      </BottomSheetContent>
    </BottomSheet>
  )
}
```

### Non-dismissible

```tsx
import { Button } from "@/registry/base-nova/ui/button"
import {
  BottomSheet,
  BottomSheetBody,
  BottomSheetClose,
  BottomSheetContent,
  BottomSheetDescription,
  BottomSheetFooter,
  BottomSheetHeader,
  BottomSheetTitle,
  BottomSheetTrigger,
} from "@/registry/base-nova/ui/bottom-sheet"

export default function BottomSheetNonDismissible() {
  return (
    <BottomSheet snapPoints={[0.45]} dismissible={false}>
      <BottomSheetTrigger render={<Button variant="secondary" />}>Confirm booking</BottomSheetTrigger>
      <BottomSheetContent>
        <BottomSheetHeader>
          <BottomSheetTitle>Book Hotel Gion for 3 nights?</BottomSheetTitle>
          <BottomSheetDescription>Nov 12–15 · $420 total · free cancellation until Nov 10.</BottomSheetDescription>
        </BottomSheetHeader>
        <BottomSheetBody className="text-muted-foreground">
          Dragging down, Esc and the backdrop won&apos;t close this sheet. Pick an answer.
        </BottomSheetBody>
        <BottomSheetFooter>
          <BottomSheetClose render={<Button variant="ghost" />}>Cancel</BottomSheetClose>
          <BottomSheetClose render={<Button />}>Book</BottomSheetClose>
        </BottomSheetFooter>
      </BottomSheetContent>
    </BottomSheet>
  )
}
```

### Without Handle

Hide the handle when the sheet shouldn't be resized by dragging.

```tsx
"use client"

import * as React from "react"

import { Button } from "@/registry/base-nova/ui/button"
import {
  BottomSheet,
  BottomSheetBody,
  BottomSheetContent,
  BottomSheetFooter,
  BottomSheetHeader,
  BottomSheetTitle,
} from "@/registry/base-nova/ui/bottom-sheet"

export default function BottomSheetWithoutHandle() {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        Filters
      </Button>
      <BottomSheet open={open} onOpenChange={setOpen} snapPoints={[0.5]}>
        <BottomSheetContent showHandle={false}>
          <BottomSheetHeader className="pt-6">
            <BottomSheetTitle>Filters</BottomSheetTitle>
          </BottomSheetHeader>
          <BottomSheetBody className="text-muted-foreground">
            No grip here: the header is still a drag zone, and Esc or the backdrop closes the sheet.
          </BottomSheetBody>
          <BottomSheetFooter>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Reset
            </Button>
            <Button onClick={() => setOpen(false)}>Show 24 results</Button>
          </BottomSheetFooter>
        </BottomSheetContent>
      </BottomSheet>
    </>
  )
}
```

## Motion

A flick moves a whole snap. With reduced motion the sheet fades in and out and jumps between snaps.

## Keyboard

The handle is a button, so Enter or Space cycles to the next snap point (or collapses from the top one). Esc closes when `dismissible`.

## API Reference

Built on [the Dialog primitive](https://base-ui.com/react/components/dialog#api-reference). Only the props this library adds or changes are listed; everything else passes through.

### BottomSheet

Root. Holds the open state and the snap index. Also accepts every prop of [Dialog.Root](https://base-ui.com/react/components/dialog#root).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `snapPoints` | `number[]` | `[0.5, 0.92]` | Visible heights as fractions of the viewport, smallest first. |
| `defaultSnap` | `number` | `0` | Index into `snapPoints` each open starts at. |
| `snap` | `number` | — | Controlled snap index. |
| `onSnapChange` | `(index: number) => void` | — | Called when the sheet settles on a new snap. |
| `dismissible` | `boolean` | `true` | Allow drag-down, Esc and backdrop press to close. |
| `open` | `boolean` | — | Controlled open state. |
| `defaultOpen` | `boolean` | `false` | Open on first render. |
| `onOpenChange` | `(open: boolean, details: Dialog.Root.ChangeEventDetails) => void` | — | Called when the sheet opens or closes, with the dialog's event details (`reason`, `event`, `cancel()`), like Drawer. A drag-down dismissal reports `reason: "imperative-action"`. |

### BottomSheetTrigger

Also accepts every prop of [Dialog.Trigger](https://base-ui.com/react/components/dialog#trigger).

### BottomSheetContent

The sheet (up to 576px wide) with its backdrop and portal. Always as tall as the highest snap. Also accepts every prop of [Dialog.Popup](https://base-ui.com/react/components/dialog#popup).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `showHandle` | `boolean` | `true` | Render the grip at the top. |

### BottomSheetHandle

The grip. Drag it to resize or dismiss, press it to cycle snap points. Rendered by `BottomSheetContent`. Also accepts every prop of `button`.

### BottomSheetHeader

Doubles as a drag zone, ignoring presses on buttons, links and fields inside it. Also accepts every prop of `div`.

### BottomSheetBody

The scrolling area (`overscroll-contain`). Also accepts every prop of `div`.

### BottomSheetFooter

Bottom action row with a top border and safe-area padding. Also accepts every prop of `div`.

### BottomSheetTitle

Also accepts every prop of [Dialog.Title](https://base-ui.com/react/components/dialog#title).

### BottomSheetDescription

Also accepts every prop of [Dialog.Description](https://base-ui.com/react/components/dialog#description).

### BottomSheetClose

Also accepts every prop of [Dialog.Close](https://base-ui.com/react/components/dialog#close).
