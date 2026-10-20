# Field

> Connects form labels, controls and feedback.

Page: https://paneui.dev/docs/field/

## Installation

```bash
npx shadcn@latest add @paneui/field
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/field.json
```

Packages: `@base-ui/react`, `motion`.

Registry items it builds on: `@paneui/theme`, `@paneui/control-size`.

## Usage

```tsx
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field"
```

```tsx
<Field invalid={!!error}>
  <FieldLabel>Email</FieldLabel>
  <Input type="email" />
  <FieldDescription>We never share it.</FieldDescription>
  <FieldError>{error}</FieldError>
</Field>
```

## Composition

```text
FieldGroup
└── Field
    ├── FieldLabel (or FieldLabelRow)
    ├── Input / Select / FieldControl
    ├── FieldDescription
    └── FieldError
```

## Examples

### Sizes

```tsx
import { Field, FieldLabel } from "@/registry/base-nova/ui/field"
import { Input } from "@/registry/base-nova/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/base-nova/ui/select"

const regions = [
  { value: "hkg", label: "Hong Kong" },
  { value: "sin", label: "Singapore" },
  { value: "nrt", label: "Tokyo" },
]

export default function FieldSizes() {
  return (
    <div className="flex w-full max-w-md flex-col gap-5">
      {(["sm", "default", "lg"] as const).map((size) => (
        <div key={size} className="grid grid-cols-2 gap-3">
          <Field size={size}>
            <FieldLabel>Project</FieldLabel>
            <Input defaultValue="Atlas" />
          </Field>
          <Field size={size}>
            <FieldLabel>Region</FieldLabel>
            <Select items={regions} defaultValue="hkg">
              <SelectTrigger className="min-w-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {regions.map((r) => (
                  <SelectItem key={r.value} value={r.value}>
                    {r.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        </div>
      ))}
    </div>
  )
}
```

### Any Control

```tsx
"use client"

import * as React from "react"

import { Field, FieldControl, FieldDescription, FieldLabel } from "@/registry/base-nova/ui/field"
import { Textarea } from "@/registry/base-nova/ui/textarea"

export default function FieldTextarea() {
  const [bio, setBio] = React.useState("Platform lead.")
  return (
    <Field className="w-full max-w-sm">
      <FieldLabel>Bio</FieldLabel>
      <FieldControl render={<Textarea rows={3} maxLength={160} />} value={bio} onValueChange={(v) => setBio(String(v))} />
      <FieldDescription>{160 - bio.length} characters left.</FieldDescription>
    </Field>
  )
}
```

## Validation

Validate however you like and pass the message to `FieldError`; it renders only while it has children. `invalid` on `Field` sets `aria-invalid` on the control, which turns its ring destructive.

## Accessibility

The field links the label to the control and the description and error to it with `aria-describedby`.

## API Reference

Built on [the Field primitive](https://base-ui.com/react/components/field#api-reference). Only the props this library adds or changes are listed; everything else passes through.

### Field

Also accepts every prop of [Field.Root](https://base-ui.com/react/components/field#root).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | `"xs" \| "sm" \| "default" \| "lg"` | — | Sizes the label and every control inside (Input, Textarea, PasswordInput, Select and Combobox triggers, MultiSelect, Checkbox, Radio, Switch, Slider). A control's own `size` wins. |
| `invalid` | `boolean` | — | Marks the control invalid. |
| `disabled` | `boolean` | — | Disables the control and dims the label. |

| Data attribute | Description |
| --- | --- |
| `data-size` | The resolved size. |

### FieldError

The message; nothing renders while it is empty. Also accepts every prop of `Field.Error`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` | — | The message. |

### FieldControl

Makes any element a field control via `render`. Also accepts every prop of `Field.Control`.

### FieldLabelRow

Label with something at the end, e.g. a "Forgot password?" link. Also accepts every prop of `div`.

### FieldGroup

Stacks fields 16px apart. Also accepts every prop of `div`.
