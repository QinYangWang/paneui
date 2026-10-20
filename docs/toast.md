# Toast

> Shows brief notifications that dismiss themselves.

Page: https://paneui.dev/docs/toast/

## Installation

```bash
npx shadcn@latest add @paneui/toast
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/toast.json
```

Packages: `@base-ui/react`.

Registry items it builds on: `@paneui/theme`, `@paneui/icons`, `@paneui/locale-provider`.

## Usage

```tsx
import { ToastProvider, useToast } from "@/components/ui/toast"
```

```tsx
// Once, at the root of your app
<ToastProvider>{children}</ToastProvider>

// Anywhere inside it
const toast = useToast()
toast.add({ title: "Saved", description: "Your changes are live.", type: "success" })
```

## Examples

### Types

```tsx
"use client"

import { Button } from "@/registry/base-nova/ui/button"
import { useToast } from "@/registry/base-nova/ui/toast"

export default function ToastTypes() {
  const toast = useToast()
  return (
    <div className="flex flex-wrap justify-center gap-2">
      <Button
        variant="secondary"
        onClick={() => toast.add({ title: "Invoice sent", description: "Acme Co. will get it in a minute.", type: "success" })}
      >
        Success
      </Button>
      <Button
        variant="secondary"
        onClick={() => toast.add({ title: "Payment declined", description: "The card ending 4242 was refused.", type: "error" })}
      >
        Error
      </Button>
      <Button
        variant="secondary"
        onClick={() => toast.add({ title: "Storage almost full", description: "You’ve used 9.4 of 10 GB.", type: "warning" })}
      >
        Warning
      </Button>
      <Button
        variant="secondary"
        onClick={() => toast.add({ title: "New version available", description: "Reload to get the latest fixes.", type: "info" })}
      >
        Info
      </Button>
      <Button variant="secondary" onClick={() => toast.add({ title: "Draft saved" })}>
        Plain
      </Button>
    </div>
  )
}
```

### With Action

```tsx
"use client"

import { Button } from "@/registry/base-nova/ui/button"
import { useToast } from "@/registry/base-nova/ui/toast"

export default function ToastWithAction() {
  const toast = useToast()
  return (
    <Button
      variant="secondary"
      onClick={() => {
        const id = toast.add({
          title: "3 emails archived",
          description: "They’re in All mail if you need them.",
          actionProps: {
            children: "Undo",
            onClick: () => {
              toast.close(id)
              toast.add({ title: "Moved back to Inbox", type: "success" })
            },
          },
        })
      }}
    >
      Archive selected
    </Button>
  )
}
```

### Promise

Use for saves and uploads that take a moment; the toast follows the promise to success or error.

```tsx
"use client"

import { Button } from "@/registry/base-nova/ui/button"
import { useToast } from "@/registry/base-nova/ui/toast"

function exportReport() {
  return new Promise<number>((resolve) => setTimeout(() => resolve(128), 2000))
}

export default function ToastPromise() {
  const toast = useToast()
  return (
    <Button
      variant="secondary"
      onClick={() =>
        toast.promise(exportReport(), {
          loading: { title: "Exporting report…", type: "loading" },
          success: (rows) => ({ title: "Report ready", description: `${rows} rows saved to Downloads.`, type: "success" }),
          error: { title: "Export failed", description: "Check your connection and try again.", type: "error" },
        })
      }
    >
      Export CSV
    </Button>
  )
}
```

### Persistent

```tsx
"use client"

import { Button } from "@/registry/base-nova/ui/button"
import { useToast } from "@/registry/base-nova/ui/toast"

export default function ToastPersistent() {
  const toast = useToast()
  return (
    <div className="flex flex-wrap justify-center gap-2">
      <Button
        variant="secondary"
        onClick={() =>
          toast.add({
            title: "You’re offline",
            description: "Changes are saved on this device and sync when you reconnect.",
            type: "warning",
            timeout: 0,
            priority: "high",
          })
        }
      >
        Show until dismissed
      </Button>
      <Button variant="ghost" onClick={() => toast.close()}>
        Dismiss all
      </Button>
    </div>
  )
}
```

### RTL

```tsx
"use client"

import { DirectionProvider } from "@base-ui/react/direction-provider"
import { Button } from "@/registry/base-nova/ui/button"
import { ToastProvider, useToast } from "@/registry/base-nova/ui/toast"

function Trigger() {
  const toast = useToast()
  return (
    <Button
      variant="secondary"
      onClick={() => toast.add({ title: "تم تقديم الطلب", description: "تصل ٢٠٠ قطعة يوم الخميس.", type: "success" })}
    >
      إظهار إشعار
    </Button>
  )
}

export default function ToastRtl() {
  return (
    <DirectionProvider direction="rtl">
      {/* A provider inside the direction provider puts its toasts at the bottom left. */}
      <ToastProvider>
        <div dir="rtl">
          <Trigger />
        </div>
      </ToastProvider>
    </DirectionProvider>
  )
}
```

## Motion

Hovering or focusing the stack expands it, and swiping right or down dismisses a toast.

## Accessibility

Toasts are announced in a live region. Timers pause while the stack is hovered or focused, and `F6` moves focus into the viewport.

## API Reference

Built on [the Toast primitive](https://base-ui.com/react/components/toast#api-reference). Only the props this library adds or changes are listed; everything else passes through.

### ToastProvider

Wrap your app once. Renders the viewport (fixed bottom-right) and the stacked toasts. Also accepts every prop of [Toast.Provider](https://base-ui.com/react/components/toast#provider).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `limit` | `number` | `3` | Toasts shown at once; older ones are hidden. |
| `timeout` | `number` | `5000` | Default auto-dismiss in ms. `0` never dismisses. |

### useToast

Alias of the toast primitive's `useToastManager`. Returns `{ toasts, add, update, close, promise }`; `add` returns the toast id and `close()` with no id clears every toast. Also accepts every prop of [Toast.useToastManager](https://base-ui.com/react/components/toast#usetoastmanager).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `ReactNode` | — | First line, medium weight. |
| `description` | `ReactNode` | — | Muted second line. |
| `type` | `"success" \| "error" \| "warning" \| "info" \| "loading" \| string` | — | Known types get an icon; `loading` spins. |
| `timeout` | `number` | — | Override the provider timeout for this toast; `0` keeps it until dismissed. |
| `priority` | `"low" \| "high"` | `"low"` | How urgently screen readers announce it. |
| `actionProps` | `ComponentProps<"button">` | — | Renders an action button; pass `children` and `onClick`. |
| `onClose` | `() => void` | — | Called when the toast starts closing. |
