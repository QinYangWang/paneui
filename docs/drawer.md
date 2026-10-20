# Drawer

> Side panel for navigation or secondary tasks over the page.

Page: https://paneui.dev/docs/drawer/

## Installation

```bash
npx shadcn@latest add @paneui/drawer
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/drawer.json
```

Packages: `@base-ui/react`, `motion`.

Registry items it builds on: `@paneui/theme`, `@paneui/icons`, `@paneui/locale-provider`.

## Usage

```tsx
import { Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
```

```tsx
<Drawer side="right">
  <DrawerTrigger render={<Button variant="secondary" />}>Open</DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Agent settings</DrawerTitle>
    </DrawerHeader>
    <DrawerBody>…</DrawerBody>
  </DrawerContent>
</Drawer>
```

## Composition

```text
Drawer
├── DrawerTrigger
└── DrawerContent
    ├── DrawerHeader
    │   ├── DrawerTitle
    │   └── DrawerDescription
    ├── DrawerBody
    └── DrawerFooter
        └── DrawerClose
```

## Examples

### Navigation

```tsx
"use client"

import * as React from "react"

import { CalendarDaysIcon, FolderIcon, HomeIcon, InboxIcon, MenuIcon, SettingsIcon } from "@/components/icons"
import { Button } from "@/registry/base-nova/ui/button"
import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/registry/base-nova/ui/drawer"

const links = [
  { label: "Home", icon: HomeIcon },
  { label: "Inbox", icon: InboxIcon },
  { label: "Calendar", icon: CalendarDaysIcon },
  { label: "Projects", icon: FolderIcon },
  { label: "Settings", icon: SettingsIcon },
]

export default function DrawerNavigation() {
  const [current, setCurrent] = React.useState("Home")

  return (
    <Drawer side="left">
      <DrawerTrigger render={<Button variant="secondary" size="icon" aria-label="Open menu" />}>
        <MenuIcon />
      </DrawerTrigger>
      <DrawerContent className="w-72">
        <DrawerHeader>
          <DrawerTitle>Workspace</DrawerTitle>
        </DrawerHeader>
        <DrawerBody>
          <nav className="flex flex-col gap-0.5">
            {links.map(({ label, icon: Icon }) => (
              <DrawerClose
                key={label}
                onClick={() => setCurrent(label)}
                aria-current={current === label ? "page" : undefined}
                render={<Button variant={current === label ? "secondary" : "ghost"} className="w-full justify-start" />}
              >
                <Icon data-icon="inline-start" />
                {label}
              </DrawerClose>
            ))}
          </nav>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}
```

### Controlled

```tsx
"use client"

import * as React from "react"

import { Button } from "@/registry/base-nova/ui/button"
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/registry/base-nova/ui/drawer"

export default function DrawerControlled() {
  const [open, setOpen] = React.useState(false)
  const [archived, setArchived] = React.useState(0)

  return (
    <div className="flex flex-col items-center gap-2">
      <Button variant="secondary" onClick={() => setOpen(true)}>
        Review 3 old threads
      </Button>
      <p className="text-xs text-muted-foreground tabular-nums">{archived} archived</p>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Archive old threads?</DrawerTitle>
            <DrawerDescription>3 threads have had no replies for 30 days.</DrawerDescription>
          </DrawerHeader>
          <DrawerBody className="text-muted-foreground">
            Archived threads stay searchable and come back when someone replies.
          </DrawerBody>
          <DrawerFooter>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Not now
            </Button>
            <Button
              onClick={() => {
                setArchived((n) => n + 3)
                setOpen(false)
              }}
            >
              Archive
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
```

### Without Close Button

```tsx
import { Button } from "@/registry/base-nova/ui/button"
import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/registry/base-nova/ui/drawer"

export default function DrawerNoCloseButton() {
  return (
    <Drawer>
      <DrawerTrigger render={<Button variant="secondary" />}>Show receipt</DrawerTrigger>
      <DrawerContent showClose={false}>
        <DrawerHeader className="pr-6">
          <DrawerTitle>Order #4821</DrawerTitle>
          <DrawerDescription>Paid Oct 12 with card ending 4242.</DrawerDescription>
        </DrawerHeader>
        <DrawerBody>
          <dl className="flex flex-col gap-2 tabular-nums">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Noise-cancelling headphones</dt>
              <dd>$249.00</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Shipping</dt>
              <dd>$0.00</dd>
            </div>
            <div className="flex justify-between font-medium">
              <dt>Total</dt>
              <dd>$249.00</dd>
            </div>
          </dl>
        </DrawerBody>
        <DrawerFooter>
          <DrawerClose render={<Button className="w-full" />}>Done</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
```

### Scrolling Body

```tsx
import { Button } from "@/registry/base-nova/ui/button"
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/registry/base-nova/ui/drawer"

const changes = [
  { version: "2.4.0", note: "Bottom sheets snap to two heights and dismiss with a flick." },
  { version: "2.3.2", note: "Popovers keep 8px from the viewport edge on small screens." },
  { version: "2.3.1", note: "Fixed the stepper skipping a digit when typing fast." },
  { version: "2.3.0", note: "New dock with magnifying items and a gliding active pill." },
  { version: "2.2.0", note: "Context menus grow out of the point you clicked." },
  { version: "2.1.0", note: "Alerts animate their height when they appear or dismiss." },
  { version: "2.0.0", note: "Flat tokens: neutral grays, calm primary blue, no gradient sheens." },
  { version: "1.9.0", note: "Slider ticks line up exactly under the thumb at every step." },
  { version: "1.8.0", note: "Breadcrumbs fold the middle into a menu past four items." },
]

export default function DrawerScrolling() {
  return (
    <Drawer>
      <DrawerTrigger render={<Button variant="secondary" />}>What&apos;s new</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Changelog</DrawerTitle>
          <DrawerDescription>The header stays put while the list scrolls.</DrawerDescription>
        </DrawerHeader>
        <DrawerBody>
          <ol className="flex flex-col gap-4">
            {changes.map((change) => (
              <li key={change.version} className="flex flex-col gap-1">
                <span className="font-mono text-xs text-muted-foreground">v{change.version}</span>
                <span className="text-pretty">{change.note}</span>
              </li>
            ))}
          </ol>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}
```

### RTL

```tsx
"use client"

import { DirectionProvider } from "@base-ui/react/direction-provider"
import { Button } from "@/registry/base-nova/ui/button"
import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/registry/base-nova/ui/drawer"
import { Label } from "@/registry/base-nova/ui/label"
import { Switch } from "@/registry/base-nova/ui/switch"

const settings = [
  { label: "الموافقة التلقائية تحت ٥٠ دولارًا", on: true },
  { label: "ملخص يومي الساعة ٨:٠٠", on: true },
  { label: "تنبيهات حالة الرحلات", on: false },
]

export default function DrawerRtl() {
  return (
    <DirectionProvider direction="rtl">
      <div dir="rtl">
        {/* In right-to-left the start edge is on the right. */}
        <Drawer side="right">
          <DrawerTrigger render={<Button variant="secondary" />}>فتح الإعدادات</DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>إعدادات المساعد</DrawerTitle>
              <DrawerDescription>اختر ما يمكن تنفيذه دون الرجوع إليك.</DrawerDescription>
            </DrawerHeader>
            <DrawerBody className="flex flex-col gap-4">
              {settings.map((s) => (
                <Label key={s.label} className="justify-between gap-3">
                  {s.label}
                  <Switch defaultChecked={s.on} />
                </Label>
              ))}
            </DrawerBody>
            <DrawerFooter>
              <DrawerClose render={<Button variant="ghost" />}>إلغاء</DrawerClose>
              <DrawerClose render={<Button />}>حفظ</DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </DirectionProvider>
  )
}
```

## Motion

The panel exits on a stiffer spring than it enters. With reduced motion the panel and backdrop only fade.

## Keyboard

Focus moves into the drawer and is trapped there; Esc or a backdrop press closes it.

## API Reference

Built on [the Dialog primitive](https://base-ui.com/react/components/dialog#api-reference). Only the props this library adds or changes are listed; everything else passes through.

### Drawer

Root. Holds the open state and the side. Also accepts every prop of [Dialog.Root](https://base-ui.com/react/components/dialog#root).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `side` | `"left" \| "right"` | `"right"` | Edge the panel slides in from. |
| `open` | `boolean` | — | Controlled open state. |
| `defaultOpen` | `boolean` | `false` | Open on first render. |
| `onOpenChange` | `(open: boolean, details) => void` | — | Called when the drawer opens or closes. |

### DrawerTrigger

Also accepts every prop of [Dialog.Trigger](https://base-ui.com/react/components/dialog#trigger).

### DrawerContent

The floating panel (up to 384px wide, 8px from the edges) with its backdrop and portal. Also accepts every prop of [Dialog.Popup](https://base-ui.com/react/components/dialog#popup).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `showClose` | `boolean` | `true` | Show the round × button in the top-right corner. |

| Data attribute | Description |
| --- | --- |
| `data-side` | `left` or `right`. |

### DrawerHeader

Padded top area; leaves room on the right for the close button. Also accepts every prop of `div`.

### DrawerBody

The scrolling area (`overscroll-contain`). Also accepts every prop of `div`.

### DrawerFooter

Action row pinned to the bottom of the panel. Also accepts every prop of `div`.

### DrawerTitle

Also accepts every prop of [Dialog.Title](https://base-ui.com/react/components/dialog#title).

### DrawerDescription

Also accepts every prop of [Dialog.Description](https://base-ui.com/react/components/dialog#description).

### DrawerClose

Also accepts every prop of [Dialog.Close](https://base-ui.com/react/components/dialog#close).
