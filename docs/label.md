# Label

> Names a form control.

Page: https://paneui.dev/docs/label/

## Installation

```bash
npx shadcn@latest add @paneui/label
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/label.json
```

## Usage

```tsx
import { Label } from "@/components/ui/label"
```

```tsx
<Label htmlFor="email">Email</Label>
```

## Examples

### With Input

```tsx
import { Input } from "@/registry/base-nova/ui/input"
import { Label } from "@/registry/base-nova/ui/label"

export default function LabelWithInput() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-2">
      <Label htmlFor="label-full-name">Full name</Label>
      <Input id="label-full-name" autoComplete="name" placeholder="Dana Reyes" />
    </div>
  )
}
```

### With Checkbox

```tsx
import { Checkbox } from "@/registry/base-nova/ui/checkbox"
import { Label } from "@/registry/base-nova/ui/label"

export default function LabelWithCheckbox() {
  return (
    <div className="flex flex-col gap-3">
      <Label className="gap-3">
        <Checkbox defaultChecked />
        Remember this device
      </Label>
      <Label className="gap-3 font-normal">
        <Checkbox />
        Email me product updates
      </Label>
    </div>
  )
}
```

### Disabled

```tsx
import { Checkbox } from "@/registry/base-nova/ui/checkbox"
import { Input } from "@/registry/base-nova/ui/input"
import { Label } from "@/registry/base-nova/ui/label"
import { Switch } from "@/registry/base-nova/ui/switch"

export default function LabelDisabled() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-5">
      <Label className="gap-3 font-normal">
        <Checkbox disabled defaultChecked />
        Sync contacts (managed by your admin)
      </Label>
      <div className="flex items-center gap-3">
        <Switch id="label-disabled-switch" disabled />
        <Label htmlFor="label-disabled-switch">Beta features</Label>
      </div>
      <div data-disabled="true" className="group flex flex-col gap-2">
        <Label htmlFor="label-disabled-input">Billing email</Label>
        <Input id="label-disabled-input" disabled defaultValue="billing@example.com" />
      </div>
    </div>
  )
}
```

## Disabled styles

Checkbox, Switch and Radio render a `span` with `data-disabled`, so the label matches it with `has-data-disabled` (wrapping) and `peer-data-disabled` (sibling; Checkbox and Switch carry the `peer` class) as well as the native `has-disabled` / `peer-disabled`.

## API Reference

### Label

A `font-medium` text label laid out as a row with an 8px gap. It adds no props of its own. Also accepts every prop of `label`.
