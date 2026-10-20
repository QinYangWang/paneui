# Dialog

> Asks for a decision or input in a modal window.

Page: https://paneui.dev/docs/dialog/

## Installation

```bash
npx shadcn@latest add @paneui/dialog
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/dialog.json
```

Packages: `@base-ui/react`.

Registry items it builds on: `@paneui/theme`, `@paneui/icons`, `@paneui/locale-provider`.

## Usage

```tsx
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
```

```tsx
<Dialog>
  <DialogTrigger render={<Button variant="secondary" />}>Open</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Archive project?</DialogTitle>
      <DialogDescription>You can restore it from Settings.</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose render={<Button variant="secondary" />}>Cancel</DialogClose>
      <DialogClose render={<Button />}>Archive</DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

## Composition

```text
Dialog
├── DialogTrigger
└── DialogContent
    ├── DialogHeader
    │   ├── DialogTitle
    │   └── DialogDescription
    └── DialogFooter
        └── DialogClose
```

## Examples

### Destructive

```tsx
import { Button } from "@/registry/base-nova/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/base-nova/ui/dialog"

export default function DialogDestructive() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="destructive" />}>Delete project</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete “Spring launch”?</DialogTitle>
          <DialogDescription>
            Its 14 tasks and 3 shared links are removed for everyone. This can’t be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="secondary" />}>Keep project</DialogClose>
          <DialogClose render={<Button variant="destructive" />}>Delete</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
```

### With Form

```tsx
"use client"

import * as React from "react"

import { Button } from "@/registry/base-nova/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/base-nova/ui/dialog"
import { Input } from "@/registry/base-nova/ui/input"
import { Label } from "@/registry/base-nova/ui/label"

export default function DialogWithForm() {
  const [open, setOpen] = React.useState(false)
  const [name, setName] = React.useState("Qinyang")
  return (
    <div className="flex flex-col items-center gap-2">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger render={<Button variant="secondary" />}>Edit profile</DialogTrigger>
        <DialogContent>
          <form
            className="flex flex-col gap-4"
            onSubmit={(event) => {
              event.preventDefault()
              const data = new FormData(event.currentTarget)
              setName(String(data.get("name") || name))
              setOpen(false)
            }}
          >
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>This is how teammates see you in comments and mentions.</DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-2">
              <Label htmlFor="profile-name">Display name</Label>
              <Input id="profile-name" name="name" defaultValue={name} />
            </div>
            <DialogFooter>
              <DialogClose render={<Button type="button" variant="secondary" />}>Cancel</DialogClose>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <p className="text-sm text-muted-foreground">Signed in as {name}</p>
    </div>
  )
}
```

### No Close Button

```tsx
import { Button } from "@/registry/base-nova/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/base-nova/ui/dialog"

export default function DialogNoCloseButton() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="secondary" />}>Review terms</DialogTrigger>
      <DialogContent showClose={false}>
        <DialogHeader>
          <DialogTitle>Updated terms of service</DialogTitle>
          <DialogDescription>
            We changed how long we keep deleted files: they now stay in the trash for 30 days instead of 7.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button />}>Got it</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
```

### Long Content

```tsx
import { Button } from "@/registry/base-nova/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/base-nova/ui/dialog"

const sections = [
  ["Your content", "You keep ownership of everything you upload. We only process it to run the service you asked for."],
  ["Acceptable use", "Don’t use the workspace to send spam, scrape other services or host malware. We may suspend accounts that do."],
  ["Billing", "Plans renew monthly. You can cancel any time from Settings → Billing; access continues until the period ends."],
  ["Data retention", "Deleted projects stay in the trash for 30 days, then they’re removed from our servers and backups."],
  ["Third-party services", "Integrations you connect follow their own terms. Disconnecting one stops any further data sharing."],
  ["Changes to these terms", "We’ll email you at least 14 days before a change takes effect, with a summary of what’s different."],
  ["Contact", "Questions about these terms go to legal@example.com. We answer within two business days."],
]

export default function DialogLongContent() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="secondary" />}>Review terms</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Terms of service</DialogTitle>
          <DialogDescription>Updated October 2026. Scroll to read every section before you accept.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 text-sm">
          {sections.map(([title, body]) => (
            <section key={title} className="flex flex-col gap-1">
              <h3 className="font-medium">{title}</h3>
              <p className="text-pretty text-muted-foreground">{body}</p>
            </section>
          ))}
        </div>
        <DialogFooter>
          <DialogClose render={<Button variant="secondary" />}>Decline</DialogClose>
          <DialogClose render={<Button />}>Accept</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
```

### RTL

```tsx
import { DirectionProvider } from "@base-ui/react/direction-provider"
import { Button } from "@/registry/base-nova/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/base-nova/ui/dialog"

export default function DialogRtl() {
  return (
    <DirectionProvider direction="rtl">
      <div dir="rtl">
        <Dialog>
          <DialogTrigger render={<Button variant="secondary" />}>إيقاف المهام التلقائية</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>إيقاف كل المهام التلقائية؟</DialogTitle>
              <DialogDescription>تنتهي المهام الجارية، ولا تبدأ مهام جديدة حتى تستأنفها.</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose render={<Button variant="secondary" />}>إلغاء</DialogClose>
              <DialogClose render={<Button />}>إيقاف</DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DirectionProvider>
  )
}
```

## Motion

The backdrop fades and the popup scales from 96% and rises 8px over 250ms; it scales back down as it closes. With reduced motion it only fades.

## Accessibility

Focus is trapped inside the popup and returns to the trigger on close. `Esc` and a backdrop click close it. `DialogTitle` and `DialogDescription` label the dialog.

## API Reference

Built on [the Dialog primitive](https://base-ui.com/react/components/dialog#api-reference). Only the props this library adds or changes are listed; everything else passes through.

### Dialog

Re-export of the primitive root. Also accepts every prop of [Dialog.Root](https://base-ui.com/react/components/dialog#root).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `open` | `boolean` | — | Controlled open state. |
| `defaultOpen` | `boolean` | `false` | Initial state when uncontrolled. |
| `onOpenChange` | `(open: boolean, eventDetails) => void` | — | Called when the dialog opens or closes. |

### DialogTrigger

Re-export. Use `render` to make a Button the trigger. Also accepts every prop of [Dialog.Trigger](https://base-ui.com/react/components/dialog#trigger).

### DialogContent

Portal, backdrop and centred popup (max-width 28rem, max-height the viewport minus 1rem each side). Taller content scrolls inside it with `overscroll-contain`, so the page doesn't scroll. Also accepts every prop of [Dialog.Popup](https://base-ui.com/react/components/dialog#popup).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `showClose` | `boolean` | `true` | Render the close button. It stays pinned while long content scrolls and comes last in the focus order. |

| Data attribute | Description |
| --- | --- |
| `data-starting-style` | Present while opening (scaled down, transparent). |
| `data-ending-style` | Present while closing. |

### DialogHeader

Stacks title and description, with right padding to clear the close button. Also accepts every prop of `div`.

### DialogFooter

Right-aligned action row. Also accepts every prop of `div`.

### DialogTitle

Also accepts every prop of [Dialog.Title](https://base-ui.com/react/components/dialog#title).

### DialogDescription

Also accepts every prop of [Dialog.Description](https://base-ui.com/react/components/dialog#description).

### DialogClose

Re-export. Closes the dialog when pressed. Also accepts every prop of [Dialog.Close](https://base-ui.com/react/components/dialog#close).
