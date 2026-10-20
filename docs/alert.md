# Alert

> Shows a message that needs attention.

Page: https://paneui.dev/docs/alert/

## Installation

```bash
npx shadcn@latest add @paneui/alert
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/alert.json
```

Packages: `motion`, `class-variance-authority`.

Registry items it builds on: `@paneui/theme`, `@paneui/icons`, `@paneui/icon-chip`, `@paneui/locale-provider`.

## Usage

```tsx
import { Alert, AlertClose, AlertContent, AlertDescription, AlertIcon, AlertTitle } from "@/components/ui/alert"
```

```tsx
<Alert variant="info">
  <AlertIcon />
  <AlertContent>
    <AlertTitle>Calendar connected</AlertTitle>
    <AlertDescription>New events show up within a minute.</AlertDescription>
  </AlertContent>
  <AlertClose />
</Alert>
```

## Composition

```text
Alert
├── AlertIcon
├── AlertContent
│   ├── AlertTitle
│   └── AlertDescription
├── AlertAction
└── AlertClose
```

## Examples

### Variants

```tsx
import { Alert, AlertContent, AlertDescription, AlertIcon, AlertTitle } from "@/registry/base-nova/ui/alert"

const variants = [
  { variant: "default", title: "New sign-in", body: "Chrome on macOS, Hong Kong." },
  { variant: "info", title: "Maintenance tonight", body: "Search is read-only from 02:00 to 02:30." },
  { variant: "success", title: "Export ready", body: "248 rows saved to your downloads." },
  { variant: "warning", title: "Storage at 90%", body: "Old builds are removed after 30 days." },
  { variant: "destructive", title: "Payment failed", body: "Update your card to keep the Pro plan." },
] as const

export default function AlertVariants() {
  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      {variants.map(({ variant, title, body }) => (
        <Alert key={variant} variant={variant}>
          <AlertIcon />
          <AlertContent>
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription>{body}</AlertDescription>
          </AlertContent>
        </Alert>
      ))}
    </div>
  )
}
```

### Default

```tsx
import { Alert, AlertContent, AlertDescription, AlertIcon, AlertTitle } from "@/registry/base-nova/ui/alert"

export default function AlertDefaultVariant() {
  return (
    <Alert className="w-full max-w-md">
      <AlertIcon />
      <AlertContent>
        <AlertTitle>Maintenance on Sunday</AlertTitle>
        <AlertDescription>Sync pauses from 02:00 to 02:30 HKT. Nothing to do on your side.</AlertDescription>
      </AlertContent>
    </Alert>
  )
}
```

### Custom Icon

```tsx
import { CalendarDaysIcon, SparklesIcon } from "@/components/icons"
import { Alert, AlertContent, AlertDescription, AlertIcon, AlertTitle } from "@/registry/base-nova/ui/alert"

export default function AlertCustomIcon() {
  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      <Alert variant="info">
        <AlertIcon>
          <SparklesIcon />
        </AlertIcon>
        <AlertContent>
          <AlertTitle>Summary ready</AlertTitle>
          <AlertDescription>3 action items from this morning&apos;s standup.</AlertDescription>
        </AlertContent>
      </Alert>
      <Alert variant="warning">
        <AlertIcon>
          <CalendarDaysIcon />
        </AlertIcon>
        <AlertContent>
          <AlertTitle>Two meetings overlap</AlertTitle>
          <AlertDescription>Design review and 1:1 both start at 15:00.</AlertDescription>
        </AlertContent>
      </Alert>
    </div>
  )
}
```

### Actions

```tsx
import { Alert, AlertAction, AlertContent, AlertDescription, AlertIcon, AlertTitle } from "@/registry/base-nova/ui/alert"
import { Button } from "@/registry/base-nova/ui/button"

export default function AlertActions() {
  return (
    <Alert variant="info" className="w-full max-w-md">
      <AlertIcon />
      <AlertContent>
        <AlertTitle>Price dropped</AlertTitle>
        <AlertDescription>Your Tokyo flight is now $86 cheaper.</AlertDescription>
      </AlertContent>
      <AlertAction>
        <Button size="xs" variant="ghost">
          Ignore
        </Button>
        <Button size="xs">Rebook</Button>
      </AlertAction>
    </Alert>
  )
}
```

### Custom Dismiss

```tsx
"use client"

import * as React from "react"

import {
  Alert,
  AlertAction,
  AlertContent,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  useAlert,
} from "@/registry/base-nova/ui/alert"
import { Button } from "@/registry/base-nova/ui/button"

function GotIt() {
  const { dismiss } = useAlert()
  return (
    <Button size="xs" variant="secondary" onClick={dismiss}>
      Got it
    </Button>
  )
}

export default function AlertUseAlert() {
  const [open, setOpen] = React.useState(true)

  return (
    <div className="flex w-full max-w-md flex-col items-start gap-2">
      <Alert variant="success" open={open} onOpenChange={setOpen} className="w-full">
        <AlertIcon />
        <AlertContent>
          <AlertTitle>Backup complete</AlertTitle>
          <AlertDescription>12,480 photos copied to your drive.</AlertDescription>
        </AlertContent>
        <AlertAction>
          <GotIt />
        </AlertAction>
      </Alert>
      {!open && (
        <Button size="sm" variant="ghost" onClick={() => setOpen(true)}>
          Show again
        </Button>
      )}
    </div>
  )
}
```

### Small

Use inside cards, dialogs and forms.

```tsx
import { Alert, AlertContent, AlertDescription, AlertIcon, AlertTitle } from "@/registry/base-nova/ui/alert"

export default function AlertSmall() {
  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      <Alert size="sm" variant="info">
        <AlertIcon />
        <AlertContent>
          <AlertTitle>Sync paused</AlertTitle>
          <AlertDescription>Resumes when you are back online.</AlertDescription>
        </AlertContent>
      </Alert>
      <Alert size="sm" variant="warning">
        <AlertIcon />
        <AlertContent>
          <AlertTitle>Card expires in 5 days</AlertTitle>
        </AlertContent>
      </Alert>
    </div>
  )
}
```

## Motion

The alert scales from 96% as it enters and reverses on dismiss, so the content below slides up. With reduced motion it only fades.

## Accessibility

`warning` and `destructive` alerts get `role="alert"` so screen readers announce them at once; the others get `role="status"`. Override with `role`.

## API Reference

### Alert

Inline message surface that animates in and out. Also accepts every prop of `motion.div`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | `"sm" \| "default"` | `"default"` | `sm` uses 10px padding, a 14px radius and the 24px icon chip; `default` 14px, 18px and 32px. |
| `variant` | `"default" \| "info" \| "success" \| "warning" \| "destructive"` | `"default"` | Background tint, icon chip tone and default icon. |
| `open` | `boolean` | — | Controlled visibility. Hiding animates the alert out. |
| `defaultOpen` | `boolean` | `true` | Visible on first render. |
| `onOpenChange` | `(open: boolean) => void` | — | Called when the alert is shown or dismissed. |
| `role` | `"alert" \| "status"` | — | Defaults to `alert` for `warning` / `destructive` and `status` otherwise. |
| `contentClassName` | `string` | — | Classes for the inner surface row; `className` goes on the outer element that animates height. |

| Data attribute | Description |
| --- | --- |
| `data-variant` | The `variant` value. |
| `data-size` | The `size` value. |

### AlertIcon

An `IconChip` in the variant's tone. Renders the variant's default icon unless children are given. Also accepts every prop of `span`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` | — | Icon to show instead of the default. |

### AlertContent

Stacks title and description beside the icon. Also accepts every prop of `div`.

### AlertTitle

Also accepts every prop of `div`.

### AlertDescription

Muted text; links inside are underlined. Also accepts every prop of `div`.

### AlertAction

Right-aligned slot for buttons. Also accepts every prop of `div`.

### AlertClose

Round × button that dismisses the alert. Call `event.preventDefault()` in `onClick` to keep it open. Also accepts every prop of `button`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` | `<XIcon />` | Replace the × icon. |

### useAlert

Reads the nearest `Alert`. Throws outside one.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `open` | `boolean` | — | Whether the alert is visible. |
| `variant` | `AlertVariant` | — | The alert's variant. |
| `size` | `AlertSize` | — | The alert's size. |
| `setOpen` | `(open: boolean) => void` | — | Show or hide the alert. |
| `dismiss` | `() => void` | — | Hide the alert with its exit animation. |
