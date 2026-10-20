# Input Group

> Groups related controls inside an input.

Page: https://paneui.dev/docs/input-group/

## Installation

```bash
npx shadcn@latest add @paneui/input-group
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/input-group.json
```

Packages: `class-variance-authority`.

Registry items it builds on: `@paneui/theme`, `@paneui/control-size`, `@paneui/button`.

## Usage

```tsx
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group"
```

```tsx
<InputGroup>
  <InputGroupAddon>
    <SearchIcon />
  </InputGroupAddon>
  <InputGroupInput placeholder="Search" />
  <InputGroupAddon align="inline-end">
    <InputGroupButton>Go</InputGroupButton>
  </InputGroupAddon>
</InputGroup>
```

## Composition

```text
InputGroup
├── InputGroupAddon (inline-start | inline-end | block-start | block-end)
│   ├── InputGroupText
│   └── InputGroupButton
└── InputGroupInput  (or InputGroupTextarea)
```

## Examples

### Textarea

Use for prompts that need room for longer text.

```tsx
import { ArrowUpIcon, AttachIcon } from "@/components/icons"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupText, InputGroupTextarea } from "@/registry/base-nova/ui/input-group"

export default function InputGroupTextareaExample() {
  return (
    <InputGroup className="max-w-sm">
      <InputGroupTextarea placeholder="Reply to the thread…" aria-label="Reply" />
      <InputGroupAddon align="block-end">
        <InputGroupButton size="icon-xs" aria-label="Attach a file">
          <AttachIcon />
        </InputGroupButton>
        <InputGroupText className="ms-auto">Markdown</InputGroupText>
        <InputGroupButton variant="default" size="icon-xs" aria-label="Send">
          <ArrowUpIcon />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  )
}
```

### Sizes

```tsx
import { SearchIcon } from "@/components/icons"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/registry/base-nova/ui/input-group"

export default function InputGroupSizes() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      {(["xs", "sm", "default", "lg"] as const).map((size) => (
        <InputGroup key={size} size={size}>
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
          <InputGroupInput placeholder={`Search (${size})`} aria-label={`Search ${size}`} />
          <InputGroupAddon align="inline-end">
            <InputGroupButton>Go</InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      ))}
    </div>
  )
}
```

### RTL

```tsx
import { DirectionProvider } from "@base-ui/react/direction-provider"
import { ArrowUpIcon, SearchIcon } from "@/components/icons"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/registry/base-nova/ui/input-group"
import { Kbd } from "@/registry/base-nova/ui/kbd"

export default function InputGroupRtl() {
  return (
    <DirectionProvider direction="rtl">
      <div dir="rtl" className="flex w-full max-w-xs flex-col gap-3">
        <InputGroup>
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
          <InputGroupInput placeholder="ابحث في المهام" aria-label="ابحث في المهام" />
          <InputGroupAddon align="inline-end">
            <Kbd>⌘K</Kbd>
          </InputGroupAddon>
        </InputGroup>
        <InputGroup>
          <InputGroupInput placeholder="اسأل أي شيء" aria-label="الرسالة" />
          <InputGroupAddon align="inline-end">
            <InputGroupButton variant="default" size="icon-xs" aria-label="إرسال">
              <ArrowUpIcon />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>
    </DirectionProvider>
  )
}
```

## Behaviour

The group draws the well and the focus ring; the input inside is bare. Clicking an addon (not its buttons) focuses the input. Buttons inside are concentric with the well at every size.

## API Reference

### InputGroup

Also accepts every prop of `div`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | `"xs" \| "sm" \| "default" \| "lg"` | `"default"` | Height (24 / 28 / 32 / 36px); also sizes buttons inside. Follows a sized `Field`. |

### InputGroupAddon

Also accepts every prop of `div`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `align` | `"inline-start" \| "inline-end" \| "block-start" \| "block-end"` | `"inline-start"` | Where the addon sits. Block addons make the group a column. |

### InputGroupButton

Also accepts every prop of [Button](/docs/button#api-reference).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `Button variant` | `"ghost"` |  |
| `size` | `Button size` | `"xs"` | Use `icon-xs` for an icon-only button. |

### InputGroupInput

Also accepts every prop of `input`.

### InputGroupTextarea

Grows with its content. Also accepts every prop of `textarea`.

### InputGroupText

Also accepts every prop of `span`.
