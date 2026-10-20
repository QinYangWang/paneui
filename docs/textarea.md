# Textarea

> A text field that grows with your writing.

Page: https://paneui.dev/docs/textarea/

## Installation

```bash
npx shadcn@latest add @paneui/textarea
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/textarea.json
```

Packages: `class-variance-authority`.

Registry items it builds on: `@paneui/theme`, `@paneui/control-size`.

## Usage

```tsx
import { Textarea } from "@/components/ui/textarea"
```

```tsx
<Textarea placeholder="Anything the agent should know?" />
```

## Examples

### Disabled

```tsx
import { Label } from "@/registry/base-nova/ui/label"
import { Textarea } from "@/registry/base-nova/ui/textarea"

export default function TextareaDisabled() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <Label htmlFor="textarea-disabled">Agent instructions</Label>
      <Textarea id="textarea-disabled" disabled defaultValue="Managed by your workspace admin." />
    </div>
  )
}
```

### Invalid

```tsx
import { Label } from "@/registry/base-nova/ui/label"
import { Textarea } from "@/registry/base-nova/ui/textarea"

export default function TextareaInvalid() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <Label htmlFor="textarea-invalid">Reason for refund</Label>
      <Textarea id="textarea-invalid" aria-invalid aria-describedby="textarea-invalid-error" />
      <p id="textarea-invalid-error" className="text-xs text-destructive">
        Tell us what went wrong so we can route your request.
      </p>
    </div>
  )
}
```

### With Counter

```tsx
"use client"

import * as React from "react"

import { Label } from "@/registry/base-nova/ui/label"
import { Textarea } from "@/registry/base-nova/ui/textarea"

const MAX = 160

export default function TextareaWithCounter() {
  const [value, setValue] = React.useState("Running 10 minutes late, start without me.")

  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <Label htmlFor="textarea-status">Status message</Label>
      <Textarea
        id="textarea-status"
        value={value}
        maxLength={MAX}
        onChange={(event) => setValue(event.target.value)}
        aria-describedby="textarea-status-count"
      />
      <p id="textarea-status-count" className="self-end text-xs text-muted-foreground tabular-nums">
        {value.length}/{MAX}
      </p>
    </div>
  )
}
```

### With Button

Use for short forms that submit straight from the field.

```tsx
import { Button } from "@/registry/base-nova/ui/button"
import { Label } from "@/registry/base-nova/ui/label"
import { Textarea } from "@/registry/base-nova/ui/textarea"

export default function TextareaWithButton() {
  return (
    <form className="flex w-full max-w-sm flex-col gap-2">
      <Label htmlFor="textarea-feedback">Feedback</Label>
      <Textarea id="textarea-feedback" placeholder="What should we improve?" />
      <Button type="submit" size="sm" className="self-end">
        Send feedback
      </Button>
    </form>
  )
}
```

### Sizes

```tsx
import { Textarea } from "@/registry/base-nova/ui/textarea"

export default function TextareaSizes() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <Textarea size="sm" placeholder="Small" aria-label="Small" />
      <Textarea placeholder="Default" aria-label="Default" />
      <Textarea size="lg" placeholder="Large" aria-label="Large" />
    </div>
  )
}
```

## Auto height

The field uses `field-sizing: content`, so it grows with its text from an 80px minimum in browsers that support it.

## Text size on phones

Text matches Input on every screen. iOS Safari zooms into a focused field whose text is under 16px; mount [iOS Zoom Lock](https://paneui.dev/docs/ios-zoom-lock) to stop it, or add `max-md:text-base` for 16px text on phones.

## API Reference

### Textarea

Multi-line text field. It adds no props of its own. Also accepts every prop of `textarea`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | `"xs" \| "sm" \| "default" \| "lg"` | `"default"` | Padding, minimum height (48 / 56 / 64 / 80px) and text size, matching Input. Inside a sized `Field` it takes the field's size. |

| Data attribute | Description |
| --- | --- |
| `data-size` | The resolved size. |
