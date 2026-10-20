# iOS Zoom Lock

> Stops iOS from zooming into small text fields on focus.

Page: https://paneui.dev/docs/ios-zoom-lock/

## Installation

```bash
npx shadcn@latest add @paneui/ios-zoom-lock
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/ios-zoom-lock.json
```

Registry items it builds on: `@paneui/theme`.

## Usage

```tsx
import { IosZoomLock } from "@/components/ui/ios-zoom-lock"
```

```tsx
// app/layout.tsx
<body>
  <IosZoomLock />
  {children}
</body>
```

## Examples

### Scoped

```tsx
"use client"

import * as React from "react"

import { Button } from "@/registry/base-nova/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/base-nova/ui/dialog"
import { useIosInputZoomLock } from "@/registry/base-nova/ui/ios-zoom-lock"
import { Textarea } from "@/registry/base-nova/ui/textarea"

export default function IosZoomLockScoped() {
  const [open, setOpen] = React.useState(false)
  useIosInputZoomLock({ enabled: open })
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant="secondary" />}>Reply</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reply</DialogTitle>
        </DialogHeader>
        <Textarea aria-label="Message" placeholder="Write a reply" />
        <DialogFooter>
          <DialogClose render={<Button variant="secondary" />}>Cancel</DialogClose>
          <DialogClose render={<Button />}>Send</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
```

## Why

Fields keep the 13px control text on phones. iOS and iPadOS Safari zoom into a focused field whose text is under 16px and stay zoomed after it loses focus. This is the recommended fix when that zoom gets in the way; `max-md:text-base` on a field is the alternative when you'd rather have 16px text on phones.

## How it works

When an input, textarea, select or contenteditable element gets focus, the viewport meta gains `maximum-scale=1` (an existing `maximum-scale` is replaced). When focus leaves text entry, the meta gets its original `content` back exactly. Moving from one field to the next keeps the lock, so the meta doesn't flicker. Buttons, checkboxes, radios, ranges, file and colour inputs don't lock.

## Pinch zoom

Outside a focused field the viewport is untouched, so pinch zoom works as before. Safari still allows pinch zoom while a field is focused, since it ignores `maximum-scale` for gestures; a home-screen web app honours it, so there pinch zoom waits until the field loses focus.

## Devices

Off by default and imported by nothing else. It runs only on iPhone, iPad and iPod, including iPads that report a desktop Mac user agent (`MacIntel` with more than one touch point). `devices="touch"` adds every coarse pointer; other browsers don't zoom on focus, so this is rarely needed.

## Edge cases

Everything runs in effects, so server rendering is unaffected. Without a viewport meta, a temporary one is added while a field is focused and removed afterwards. Several mounted locks share one listener set, and the original content comes back when the last one unmounts or its `enabled` turns off, focused or not. A field removed while focused fires no blur; the next touch restores the meta.

## API Reference

### IosZoomLock

Runs `useIosInputZoomLock` and renders nothing. Mount it once in a layout, a form or a sheet.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `enabled` | `boolean` | `true` | Turns the lock off without unmounting. |
| `devices` | `"ios" \| "touch"` | `"ios"` | `touch` also locks on any coarse pointer. |

### useIosInputZoomLock

`useIosInputZoomLock({ enabled, devices })` with the same options, for a component that already owns the state.

### isIosDevice

True on iPhone, iPad and iPod, including iPadOS with a desktop user agent. Call it in an effect.

### withMaximumScale

Returns viewport content with `maximum-scale=1`, keeping the other directives in order.
