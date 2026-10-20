# Morphing Modal

> Dialog that moves between several views inside one panel.

Page: https://paneui.dev/docs/morphing-modal/

## Installation

```bash
npx shadcn@latest add @paneui/morphing-modal
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/morphing-modal.json
```

Packages: `@base-ui/react`, `motion`.

Registry items it builds on: `@paneui/theme`, `@paneui/icons`, `@paneui/locale-provider`.

## Usage

```tsx
import { MorphingModal, MorphingModalContent, MorphingModalLink, MorphingModalTitle, MorphingModalTrigger, MorphingModalView } from "@/components/ui/morphing-modal"
```

```tsx
<MorphingModal>
  <MorphingModalTrigger>Share</MorphingModalTrigger>
  <MorphingModalContent>
    <MorphingModalView name="main">
      <MorphingModalTitle>Share</MorphingModalTitle>
      <MorphingModalLink to="link">Get a link</MorphingModalLink>
    </MorphingModalView>
    <MorphingModalView name="link">
      <MorphingModalTitle>Share link</MorphingModalTitle>
    </MorphingModalView>
  </MorphingModalContent>
</MorphingModal>
```

## Composition

```text
MorphingModal
├── MorphingModalTrigger
└── MorphingModalContent
    └── MorphingModalView
        ├── MorphingModalHeader
        │   ├── MorphingModalBack (automatic)
        │   ├── MorphingModalTitle
        │   └── MorphingModalDescription
        ├── MorphingModalLink
        └── MorphingModalFooter
            └── MorphingModalClose
```

## Examples

### Multi-step Flow

```tsx
"use client"

import type * as React from "react"

import { CheckIcon } from "@/components/icons"
import { Button } from "@/registry/base-nova/ui/button"
import { Input } from "@/registry/base-nova/ui/input"
import { Label } from "@/registry/base-nova/ui/label"
import {
  MorphingModal,
  MorphingModalBack,
  MorphingModalClose,
  MorphingModalContent,
  MorphingModalDescription,
  MorphingModalFooter,
  MorphingModalHeader,
  MorphingModalTitle,
  MorphingModalTrigger,
  MorphingModalView,
  useMorphingModal,
} from "@/registry/base-nova/ui/morphing-modal"

function NextButton({ to, children }: { to: string; children: React.ReactNode }) {
  const { push } = useMorphingModal()
  return <Button onClick={() => push(to)}>{children}</Button>
}

export default function MorphingModalSteps() {
  return (
    <MorphingModal defaultView="name">
      <MorphingModalTrigger render={<Button variant="secondary" />}>Create workspace</MorphingModalTrigger>
      <MorphingModalContent>
        <MorphingModalView name="name">
          <MorphingModalHeader>
            <MorphingModalTitle>Name your workspace</MorphingModalTitle>
            <MorphingModalDescription>Step 1 of 2. You can rename it later.</MorphingModalDescription>
          </MorphingModalHeader>
          <div className="flex flex-col gap-2">
            <Label htmlFor="workspace-name">Workspace name</Label>
            <Input id="workspace-name" defaultValue="Acme Design" />
          </div>
          <MorphingModalFooter>
            <NextButton to="url">Continue</NextButton>
          </MorphingModalFooter>
        </MorphingModalView>

        <MorphingModalView name="url">
          <MorphingModalHeader>
            <MorphingModalTitle>Pick a URL</MorphingModalTitle>
            <MorphingModalDescription>Step 2 of 2. Teammates use it to sign in.</MorphingModalDescription>
          </MorphingModalHeader>
          <div className="flex flex-col gap-2">
            <Label htmlFor="workspace-url">URL</Label>
            <Input id="workspace-url" defaultValue="acme-design.app" />
          </div>
          <MorphingModalFooter>
            <MorphingModalBack />
            <NextButton to="done">Create workspace</NextButton>
          </MorphingModalFooter>
        </MorphingModalView>

        <MorphingModalView name="done">
          <MorphingModalHeader>
            <MorphingModalTitle>Workspace ready</MorphingModalTitle>
            <MorphingModalDescription>Acme Design is live at acme-design.app.</MorphingModalDescription>
          </MorphingModalHeader>
          <MorphingModalFooter>
            <MorphingModalClose render={<Button />}>
              <CheckIcon data-icon="inline-start" />
              Done
            </MorphingModalClose>
          </MorphingModalFooter>
        </MorphingModalView>
      </MorphingModalContent>
    </MorphingModal>
  )
}
```

### Nested Settings

```tsx
"use client"

import * as React from "react"

import { BellIcon, ChevronRightIcon, LockIcon, UserIcon } from "@/components/icons"
import { Button } from "@/registry/base-nova/ui/button"
import { Switch } from "@/registry/base-nova/ui/switch"
import { Label } from "@/registry/base-nova/ui/label"
import {
  MorphingModal,
  MorphingModalContent,
  MorphingModalDescription,
  MorphingModalHeader,
  MorphingModalLink,
  MorphingModalTitle,
  MorphingModalTrigger,
  MorphingModalView,
} from "@/registry/base-nova/ui/morphing-modal"

export default function MorphingModalViewChange() {
  const [view, setView] = React.useState("main")

  return (
    <div className="flex flex-col items-center gap-3">
      <MorphingModal onViewChange={setView}>
        <MorphingModalTrigger render={<Button variant="secondary" />}>Settings</MorphingModalTrigger>
        <MorphingModalContent>
          <MorphingModalView name="main">
            <MorphingModalHeader>
              <MorphingModalTitle>Settings</MorphingModalTitle>
            </MorphingModalHeader>
            <div className="-mx-2 flex flex-col">
              <MorphingModalLink to="profile">
                <UserIcon className="text-muted-foreground" />
                <span className="flex-1">Profile</span>
                <ChevronRightIcon className="text-muted-foreground rtl:-scale-x-100" />
              </MorphingModalLink>
              <MorphingModalLink to="notifications">
                <BellIcon className="text-muted-foreground" />
                <span className="flex-1">Notifications</span>
                <ChevronRightIcon className="text-muted-foreground rtl:-scale-x-100" />
              </MorphingModalLink>
              <MorphingModalLink to="security">
                <LockIcon className="text-muted-foreground" />
                <span className="flex-1">Security</span>
                <ChevronRightIcon className="text-muted-foreground rtl:-scale-x-100" />
              </MorphingModalLink>
            </div>
          </MorphingModalView>
          <MorphingModalView name="profile">
            <MorphingModalHeader>
              <MorphingModalTitle>Profile</MorphingModalTitle>
              <MorphingModalDescription>Mei Lin · mei@acme.design</MorphingModalDescription>
            </MorphingModalHeader>
          </MorphingModalView>
          <MorphingModalView name="notifications">
            <MorphingModalHeader>
              <MorphingModalTitle>Notifications</MorphingModalTitle>
            </MorphingModalHeader>
            <Label className="justify-between">
              Weekly digest
              <Switch defaultChecked />
            </Label>
            <Label className="justify-between">
              Mentions
              <Switch defaultChecked />
            </Label>
          </MorphingModalView>
          <MorphingModalView name="security">
            <MorphingModalHeader>
              <MorphingModalTitle>Security</MorphingModalTitle>
              <MorphingModalDescription>Two-factor authentication is on. Last sign-in from Taipei, 2 hours ago.</MorphingModalDescription>
            </MorphingModalHeader>
          </MorphingModalView>
        </MorphingModalContent>
      </MorphingModal>
      <p className="text-xs text-muted-foreground">
        Last view: <span className="font-medium text-foreground">{view}</span>
      </p>
    </div>
  )
}
```

### Without Close Button

Use for confirmations that should end with an explicit choice.

```tsx
import { Button } from "@/registry/base-nova/ui/button"
import {
  MorphingModal,
  MorphingModalClose,
  MorphingModalContent,
  MorphingModalDescription,
  MorphingModalFooter,
  MorphingModalHeader,
  MorphingModalLink,
  MorphingModalTitle,
  MorphingModalTrigger,
  MorphingModalView,
} from "@/registry/base-nova/ui/morphing-modal"

export default function MorphingModalNoCloseButton() {
  return (
    <MorphingModal>
      <MorphingModalTrigger render={<Button variant="destructive" />}>Delete project</MorphingModalTrigger>
      <MorphingModalContent showCloseButton={false}>
        <MorphingModalView name="main">
          <MorphingModalHeader>
            <MorphingModalTitle>Delete “Launch site”?</MorphingModalTitle>
            <MorphingModalDescription>All 14 deployments and their logs are removed.</MorphingModalDescription>
          </MorphingModalHeader>
          <MorphingModalLink to="details">
            <span className="text-muted-foreground">What else gets deleted?</span>
          </MorphingModalLink>
          <MorphingModalFooter>
            <MorphingModalClose render={<Button variant="ghost" />}>Cancel</MorphingModalClose>
            <MorphingModalClose render={<Button variant="destructive" />}>Delete</MorphingModalClose>
          </MorphingModalFooter>
        </MorphingModalView>
        <MorphingModalView name="details">
          <MorphingModalHeader>
            <MorphingModalTitle>What gets deleted</MorphingModalTitle>
            <MorphingModalDescription>
              Deployments, build logs, environment variables and the project&apos;s domains. Your team and billing stay as they are.
            </MorphingModalDescription>
          </MorphingModalHeader>
          <MorphingModalFooter>
            <MorphingModalClose render={<Button variant="ghost" />}>Cancel</MorphingModalClose>
            <MorphingModalClose render={<Button variant="destructive" />}>Delete</MorphingModalClose>
          </MorphingModalFooter>
        </MorphingModalView>
      </MorphingModalContent>
    </MorphingModal>
  )
}
```

## Motion

The panel springs to each view's height while views slide 28px and blur in the direction of travel. With reduced motion the height snaps and views cross-fade in 150ms.

## Accessibility

After navigating, focus moves to the first focusable control in the new view (or the view itself). Closing resets to the first view once the exit finishes.

## Related

See also [Select Morph](https://paneui.dev/docs/select-morph), [Popover Morph](https://paneui.dev/docs/popover-morph), [Morphing Search](https://paneui.dev/docs/morphing-search) and [Morphing Tabs](https://paneui.dev/docs/morphing-tabs).

## API Reference

Built on [the Dialog primitive](https://base-ui.com/react/components/dialog#api-reference). Only the props this library adds or changes are listed; everything else passes through.

### MorphingModal

Dialog root that also holds the view stack. Also accepts every prop of [Dialog.Root](https://base-ui.com/react/components/dialog#root).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `defaultView` | `string` | `"main"` | The view shown when the modal opens. |
| `onViewChange` | `(view: string) => void` | — | Called once with the new view whenever it changes, including the reset to `defaultView` when the modal finishes closing. |

### MorphingModalTrigger

`Dialog.Trigger`, re-exported unchanged. Also accepts every prop of [Dialog.Trigger](https://base-ui.com/react/components/dialog#trigger).

### MorphingModalContent

Backdrop and centred popup (max 384px wide). Renders the active `MorphingModalView` child; other children render after it. Also accepts every prop of [Dialog.Popup](https://base-ui.com/react/components/dialog#popup).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `showCloseButton` | `boolean` | `true` | Show the round × in the top-right corner. |

### MorphingModalView

One screen of the modal. Must be a direct child of `MorphingModalContent`. Also accepts every prop of `div`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `name` (required) | `string` | — | Identifier other parts navigate to. |

| Data attribute | Description |
| --- | --- |
| `data-view` | The view's `name`. |

### MorphingModalHeader

Title block; shows `MorphingModalBack` automatically when there is a view to go back to. Also accepts every prop of `div`.

### MorphingModalTitle

Also accepts every prop of [Dialog.Title](https://base-ui.com/react/components/dialog#title).

### MorphingModalDescription

Also accepts every prop of [Dialog.Description](https://base-ui.com/react/components/dialog#description).

### MorphingModalLink

A full-width row button that pushes another view. Also accepts every prop of `button`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `to` (required) | `string` | — | Name of the view to open. |

### MorphingModalBack

Round back chevron labelled `Back`. Renders nothing on the first view. Also accepts every prop of `button`.

### MorphingModalFooter

Right-aligned row of actions. Also accepts every prop of `div`.

### MorphingModalClose

`Dialog.Close`, re-exported unchanged. Also accepts every prop of [Dialog.Close](https://base-ui.com/react/components/dialog#close).

### useMorphingModal

Navigation state for custom controls. Use inside `MorphingModal`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `view` | `string` | — | The active view. |
| `canGoBack` | `boolean` | — | Whether there is a previous view. |
| `direction` | `1 \| -1` | — | Direction of the last navigation. |
| `push` | `(view: string) => void` | — | Go to a view (pushes it onto the back stack). |
| `back` | `() => void` | — | Return to the previous view. |
| `reset` | `() => void` | — | Jump back to the first view and clear the stack (calls `onViewChange` if the view changes). |
