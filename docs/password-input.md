# Password Input

> Password field with a button to show or hide it.

Page: https://paneui.dev/docs/password-input/

## Installation

```bash
npx shadcn@latest add @paneui/password-input
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/password-input.json
```

Packages: `motion`.

Registry items it builds on: `@paneui/theme`, `@paneui/icons`, `@paneui/input`, `@paneui/control-size`, `@paneui/locale-provider`.

## Usage

```tsx
import { PasswordInput } from "@/components/ui/password-input"
```

```tsx
<PasswordInput autoComplete="current-password" />
```

## Examples

### Sizes

```tsx
import { PasswordInput } from "@/registry/base-nova/ui/password-input"

export default function PasswordInputSizes() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      <PasswordInput size="sm" defaultValue="hunter2" aria-label="Small" />
      <PasswordInput defaultValue="hunter2" aria-label="Default" />
      <PasswordInput size="lg" defaultValue="hunter2" aria-label="Large" />
    </div>
  )
}
```

## Accessibility

The reveal button is labelled "Show password" / "Hide password" and reports `aria-pressed`. Inside a `Field` the input is wired like any other control.

## API Reference

### PasswordInput

Also accepts every prop of `Input`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | `"xs" \| "sm" \| "default" \| "lg"` | `"default"` | Same heights as Input; the reveal button shrinks with it. |
| `revealed` | `boolean` | — | Controlled visibility. |
| `defaultRevealed` | `boolean` | `false` | Initial visibility. |
| `onRevealedChange` | `(revealed: boolean) => void` | — | Called when the eye button toggles. |
