# Native Select

> The browser's own select, styled as a field.

Page: https://paneui.dev/docs/native-select/

## Installation

```bash
npx shadcn@latest add @paneui/native-select
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/native-select.json
```

Packages: `class-variance-authority`.

Registry items it builds on: `@paneui/theme`, `@paneui/icons`, `@paneui/control-size`.

## Usage

```tsx
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
```

```tsx
<NativeSelect defaultValue="name">
  <NativeSelectOption value="name">Name</NativeSelectOption>
  <NativeSelectOption value="date">Date</NativeSelectOption>
</NativeSelect>
```

## Examples

### Sizes

```tsx
import { NativeSelect, NativeSelectOption } from "@/registry/base-nova/ui/native-select"

export default function NativeSelectSizes() {
  return (
    <div className="flex w-48 flex-col gap-3">
      {(["xs", "sm", "default", "lg"] as const).map((size) => (
        <NativeSelect key={size} size={size} aria-label={`Sort (${size})`} defaultValue="recent">
          <NativeSelectOption value="recent">Most recent</NativeSelectOption>
          <NativeSelectOption value="name">Name</NativeSelectOption>
          <NativeSelectOption value="size">Size</NativeSelectOption>
        </NativeSelect>
      ))}
    </div>
  )
}
```

## When to use

Prefer it to `Select` on touch devices, in long forms and wherever the platform picker helps. Use `Select` when options need icons or custom rows.

## API Reference

### NativeSelect

`className` goes on the wrapper, so width utilities apply to the field. Also accepts every prop of `select`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | `"xs" \| "sm" \| "default" \| "lg"` | `"default"` | Height (24 / 28 / 32 / 36px). Follows a sized `Field`. |
| `htmlSize` | `number` | — | The native `size` attribute. |

### NativeSelectOption

Also accepts every prop of `option`.

### NativeSelectOptGroup

Also accepts every prop of `optgroup`.
