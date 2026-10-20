# Kbd

> Shows a keyboard key or shortcut.

Page: https://paneui.dev/docs/kbd/

## Installation

```bash
npx shadcn@latest add @paneui/kbd
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/kbd.json
```

Packages: `class-variance-authority`.

Registry items it builds on: `@paneui/theme`.

## Usage

```tsx
import { Kbd, KbdGroup } from "@/components/ui/kbd"
```

```tsx
<KbdGroup>
  <Kbd>⌘</Kbd>
  <Kbd>K</Kbd>
</KbdGroup>
```

## Examples

### Sizes

```tsx
import { Kbd } from "@/registry/base-nova/ui/kbd"

export default function KbdSizes() {
  return (
    <div className="flex items-center gap-3">
      <Kbd size="sm">esc</Kbd>
      <Kbd>⌘K</Kbd>
      <Kbd size="lg">Enter</Kbd>
    </div>
  )
}
```

### In a Button

```tsx
import { Button } from "@/registry/base-nova/ui/button"
import { Kbd } from "@/registry/base-nova/ui/kbd"

export default function KbdInButton() {
  return (
    <div className="flex items-center gap-2">
      <Button variant="secondary">
        Save draft
        <Kbd>⌘S</Kbd>
      </Button>
      <Button variant="outline">
        Search
        <Kbd>/</Kbd>
      </Button>
    </div>
  )
}
```

## Tooltips

`TooltipKbd` is a small `Kbd` on the tooltip's own fill, so shortcuts read the same in tooltips, menus and buttons.

## API Reference

### Kbd

Also accepts every prop of `kbd`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | `"sm" \| "default" \| "lg"` | `"default"` | Key height (16 / 20 / 24px). |

### KbdGroup

Keys pressed together or in sequence. Also accepts every prop of `kbd`.
