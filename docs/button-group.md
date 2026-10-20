# Button Group

> Joins related buttons into one control.

Page: https://paneui.dev/docs/button-group/

## Installation

```bash
npx shadcn@latest add @paneui/button-group
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/button-group.json
```

Packages: `class-variance-authority`.

Registry items it builds on: `@paneui/theme`.

## Usage

```tsx
import { ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from "@/components/ui/button-group"
```

```tsx
<ButtonGroup aria-label="Alignment">
  <Button variant="outline">Left</Button>
  <Button variant="outline">Center</Button>
  <Button variant="outline">Right</Button>
</ButtonGroup>
```

## Examples

### Vertical

```tsx
import { MinusIcon, PlusIcon } from "@/components/icons"
import { Button } from "@/registry/base-nova/ui/button"
import { ButtonGroup } from "@/registry/base-nova/ui/button-group"

export default function ButtonGroupVertical() {
  return (
    <ButtonGroup orientation="vertical" aria-label="Zoom">
      <Button variant="outline" size="icon" aria-label="Zoom in">
        <PlusIcon />
      </Button>
      <Button variant="outline" size="icon" aria-label="Zoom out">
        <MinusIcon />
      </Button>
    </ButtonGroup>
  )
}
```

### Nested

```tsx
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons"
import { Button } from "@/registry/base-nova/ui/button"
import { ButtonGroup } from "@/registry/base-nova/ui/button-group"

export default function ButtonGroupNested() {
  return (
    <ButtonGroup aria-label="Pages">
      <ButtonGroup>
        <Button variant="outline" size="icon-sm" aria-label="Previous page">
          <ChevronLeftIcon className="rtl:-scale-x-100" />
        </Button>
        <Button variant="outline" size="icon-sm" aria-label="Next page">
          <ChevronRightIcon className="rtl:-scale-x-100" />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline" size="sm">
          1
        </Button>
        <Button variant="outline" size="sm">
          2
        </Button>
        <Button variant="outline" size="sm">
          3
        </Button>
      </ButtonGroup>
    </ButtonGroup>
  )
}
```

## Accessibility

The group has `role="group"`; give it an `aria-label`. For a set where one option is chosen, use `ToggleGroup` instead.

## API Reference

### ButtonGroup

Also accepts every prop of `div`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Direction of the joined buttons. |

### ButtonGroupSeparator

A hairline between filled buttons. Also accepts every prop of `div`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `orientation` | `"horizontal" \| "vertical"` | `"vertical"` |  |

### ButtonGroupText

A label on the group's fill. Also accepts every prop of `div`.
