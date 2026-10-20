# Button

> Triggers an action or submits a form.

Page: https://paneui.dev/docs/button/

## Installation

```bash
npx shadcn@latest add @paneui/button
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/button.json
```

Packages: `@base-ui/react`, `class-variance-authority`.

Registry items it builds on: `@paneui/theme`.

## Usage

```tsx
import { Button } from "@/components/ui/button"
```

```tsx
<Button variant="secondary">Button</Button>
```

## Examples

### Variants

```tsx
import { Button } from "@/registry/base-nova/ui/button"

export default function ButtonVariants() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
    </div>
  )
}
```

### Sizes

```tsx
import { Button } from "@/registry/base-nova/ui/button"

export default function ButtonSizes() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button variant="secondary" size="xs">
        Extra small
      </Button>
      <Button variant="secondary" size="sm">
        Small
      </Button>
      <Button variant="secondary">Default</Button>
      <Button variant="secondary" size="lg">
        Large
      </Button>
    </div>
  )
}
```

### With icon

```tsx
import { ArrowRightIcon, SparklesIcon } from "@/components/icons"
import { Button } from "@/registry/base-nova/ui/button"

export default function ButtonWithIcon() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button variant="secondary">
        <SparklesIcon data-icon="inline-start" />
        Generate
      </Button>
      <Button>
        Continue
        <ArrowRightIcon className="rtl:-scale-x-100" data-icon="inline-end" />
      </Button>
    </div>
  )
}
```

### Icon

```tsx
import { SettingsIcon } from "@/components/icons"
import { Button } from "@/registry/base-nova/ui/button"

export default function ButtonIcon() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button variant="secondary" size="icon-xs" aria-label="Settings">
        <SettingsIcon />
      </Button>
      <Button variant="secondary" size="icon-sm" aria-label="Settings">
        <SettingsIcon />
      </Button>
      <Button variant="secondary" size="icon" aria-label="Settings">
        <SettingsIcon />
      </Button>
      <Button variant="secondary" size="icon-lg" aria-label="Settings">
        <SettingsIcon />
      </Button>
    </div>
  )
}
```

### Disabled

```tsx
import { Button } from "@/registry/base-nova/ui/button"

export default function ButtonDisabled() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button disabled>Default</Button>
      <Button variant="secondary" disabled>
        Secondary
      </Button>
    </div>
  )
}
```

### As link

```tsx
import { ArrowRightIcon } from "@/components/icons"
import { Button } from "@/registry/base-nova/ui/button"

export default function ButtonAsLink() {
  return (
    <Button variant="secondary" nativeButton={false} render={<a href="#api-reference" />}>
      API reference
      <ArrowRightIcon className="rtl:-scale-x-100" data-icon="inline-end" />
    </Button>
  )
}
```

## API Reference

Built on [the Button primitive](https://base-ui.com/react/components/button#api-reference). Only the props this library adds or changes are listed; everything else passes through.

### Button

Also accepts every prop of [Button](https://base-ui.com/react/components/button#api-reference).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"default" \| "secondary" \| "outline" \| "ghost" \| "destructive" \| "link"` | `"default"` | Visual style. |
| `size` | `"default" \| "xs" \| "sm" \| "lg" \| "icon" \| "icon-xs" \| "icon-sm" \| "icon-lg"` | `"default"` | Height and padding. `xs` is 24px, `sm` 28px, `default` 32px and `lg` 36px, all with a 10px radius except `xs` at 6px. `icon*` sizes are square. |
| `render` | `ReactElement \| (props, state) => ReactElement` | — | Replace the rendered element, e.g. `<a />` or a router `Link`. |
| `nativeButton` | `boolean` | `true` | Set to `false` when `render` is not a `<button>` so keyboard and ARIA behaviour is added. |
| `disabled` | `boolean` | `false` | Disables interaction and dims the button. |

### buttonVariants

The `cva` function behind `Button`, for styling other elements like a button.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `same as Button` | — |  |
| `size` | `same as Button` | — |  |
| `className` | `string` | — | Merged last. |
