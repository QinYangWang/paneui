# Input

> Single-line text field.

Page: https://paneui.dev/docs/input/

## Installation

```bash
npx shadcn@latest add @paneui/input
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/input.json
```

Packages: `@base-ui/react`, `class-variance-authority`.

Registry items it builds on: `@paneui/theme`, `@paneui/control-size`.

## Usage

```tsx
import { Input } from "@/components/ui/input"
```

```tsx
<Input type="email" placeholder="you@example.com" />
```

## Examples

### Types

```tsx
import { Input } from "@/registry/base-nova/ui/input"
import { Label } from "@/registry/base-nova/ui/label"

export default function InputTypes() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="input-password">Password</Label>
        <Input id="input-password" type="password" defaultValue="correct-horse" />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="input-number">Guests</Label>
        <Input id="input-number" type="number" min={1} max={8} defaultValue={2} />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="input-date">Check-in</Label>
        <Input id="input-date" type="date" defaultValue="2026-11-12" />
      </div>
    </div>
  )
}
```

### File

```tsx
import { Input } from "@/registry/base-nova/ui/input"
import { Label } from "@/registry/base-nova/ui/label"

export default function InputFile() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-2">
      <Label htmlFor="input-receipt">Receipt</Label>
      <Input id="input-receipt" type="file" accept="image/*,.pdf" />
    </div>
  )
}
```

### Disabled

```tsx
import { Input } from "@/registry/base-nova/ui/input"
import { Label } from "@/registry/base-nova/ui/label"

export default function InputDisabled() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-2">
      <Label htmlFor="input-workspace">Workspace URL</Label>
      <Input id="input-workspace" disabled defaultValue="qinyang.hark.app" />
    </div>
  )
}
```

### Invalid

```tsx
import { Input } from "@/registry/base-nova/ui/input"
import { Label } from "@/registry/base-nova/ui/label"

export default function InputInvalid() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-2">
      <Label htmlFor="input-invalid">Email</Label>
      <Input id="input-invalid" type="email" defaultValue="dana@" aria-invalid aria-describedby="input-invalid-error" />
      <p id="input-invalid-error" className="text-xs text-destructive">
        Enter a full email address, like dana@example.com.
      </p>
    </div>
  )
}
```

### With Button

```tsx
import { Button } from "@/registry/base-nova/ui/button"
import { Input } from "@/registry/base-nova/ui/input"

export default function InputWithButton() {
  return (
    <form className="flex w-full max-w-sm items-center gap-2">
      <Input type="email" placeholder="you@example.com" aria-label="Email" />
      <Button type="submit">Subscribe</Button>
    </form>
  )
}
```

### Sizes

Match the size of the button beside it.

```tsx
import { Button } from "@/registry/base-nova/ui/button"
import { Input } from "@/registry/base-nova/ui/input"

const sizes = [
  { size: "xs", label: "Extra small" },
  { size: "sm", label: "Small" },
  { size: "default", label: "Default" },
  { size: "lg", label: "Large" },
] as const

export default function InputSizes() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      {sizes.map(({ size, label }) => (
        <div key={size} className="flex items-center gap-2">
          <Input size={size} placeholder={label} aria-label={label} />
          <Button variant="secondary" size={size}>
            Save
          </Button>
        </div>
      ))}
    </div>
  )
}
```

## Text size on phones

Field text matches the control size on every screen (13px at the default size), the same as the button beside it. iOS Safari zooms into a focused field whose text is under 16px. To stop that, mount [iOS Zoom Lock](https://paneui.dev/docs/ios-zoom-lock) once (recommended, opt-in); or add `max-md:text-base` to a field to give it 16px text on phones.

## API Reference

Built on [the Input primitive](https://base-ui.com/react/components/input#api-reference). Only the props this library adds or changes are listed; everything else passes through.

### Input

Text field that takes any native `type`. It adds no props of its own. Also accepts every prop of [Input](https://base-ui.com/react/components/input#api-reference).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | `"xs" \| "sm" \| "default" \| "lg"` | `"default"` | Height 24 / 28 / 32 / 36px, the Button heights. Inside a sized `Field` it takes the field's size. |
| `htmlSize` | `number` | — | The native `size` attribute (width in characters). |

| Data attribute | Description |
| --- | --- |
| `data-size` | The resolved size. |
