# Alert Dialog

> Interrupts to confirm a destructive or important action.

Page: https://paneui.dev/docs/alert-dialog/

## Installation

```bash
npx shadcn@latest add @paneui/alert-dialog
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/alert-dialog.json
```

Packages: `@base-ui/react`.

Registry items it builds on: `@paneui/theme`, `@paneui/button`.

## Usage

```tsx
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
```

```tsx
<AlertDialog>
  <AlertDialogTrigger render={<Button variant="secondary" />}>Delete</AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Delete this file?</AlertDialogTitle>
      <AlertDialogDescription>This can’t be undone.</AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction variant="destructive">Delete</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

## Composition

```text
AlertDialog
├── AlertDialogTrigger
└── AlertDialogContent
    ├── AlertDialogHeader
    │   ├── AlertDialogMedia
    │   ├── AlertDialogTitle
    │   └── AlertDialogDescription
    └── AlertDialogFooter
        ├── AlertDialogCancel
        └── AlertDialogAction
```

## Examples

### Small

```tsx
import { LogOutIcon } from "@/components/icons"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/registry/base-nova/ui/alert-dialog"
import { Button } from "@/registry/base-nova/ui/button"
import { IconChip } from "@/registry/base-nova/ui/icon-chip"

export default function AlertDialogSmall() {
  return (
    <AlertDialog>
      <AlertDialogTrigger render={<Button variant="secondary" />}>Sign out</AlertDialogTrigger>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia>
            <IconChip size="lg">
              <LogOutIcon className="rtl:-scale-x-100" />
            </IconChip>
          </AlertDialogMedia>
          <AlertDialogTitle>Sign out of all devices?</AlertDialogTitle>
          <AlertDialogDescription>You’ll need your password to sign back in.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Sign out</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
```

## Accessibility

The popup is an `alertdialog`. Focus is trapped and starts on Cancel, so Enter never confirms by accident. `Esc` cancels; a backdrop click does nothing.

## API Reference

Built on [the Alert Dialog primitive](https://base-ui.com/react/components/alert-dialog#api-reference). Only the props this library adds or changes are listed; everything else passes through.

### AlertDialog

Re-export of the primitive root. Also accepts every prop of [AlertDialog.Root](https://base-ui.com/react/components/alert-dialog#root).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `open` | `boolean` | — | Controlled open state. |
| `onOpenChange` | `(open: boolean, eventDetails) => void` | — | Called when it opens or closes. |

### AlertDialogContent

Portal, backdrop and centred popup. Also accepts every prop of [AlertDialog.Popup](https://base-ui.com/react/components/alert-dialog#popup).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | `"sm" \| "default"` | `"default"` | `sm` is 20rem wide, centres the header and splits the footer into two equal buttons. |
| `initialFocus` | `AlertDialog.Popup initialFocus` | `the Cancel button` | Where focus goes on open. |

### AlertDialogAction

Closes the dialog. Put the confirming work in `onClick`. Also accepts every prop of `Button`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `Button variant` | `"default"` | Use `destructive` for deletes. |

### AlertDialogCancel

Closes without acting. Also accepts every prop of `Button`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `Button variant` | `"secondary"` |  |

### AlertDialogMedia

Slot above the title for an `IconChip`. Also accepts every prop of `div`.

### AlertDialogHeader

Also accepts every prop of `div`.

### AlertDialogFooter

Also accepts every prop of `div`.

### AlertDialogTitle

Also accepts every prop of [AlertDialog.Title](https://base-ui.com/react/components/alert-dialog#title).

### AlertDialogDescription

Also accepts every prop of [AlertDialog.Description](https://base-ui.com/react/components/alert-dialog#description).
