# Hover Card

> Previews a linked item while it is hovered.

Page: https://paneui.dev/docs/hover-card/

## Installation

```bash
npx shadcn@latest add @paneui/hover-card
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/hover-card.json
```

Packages: `@base-ui/react`.

Registry items it builds on: `@paneui/theme`.

## Usage

```tsx
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
```

```tsx
<HoverCard>
  <HoverCardTrigger href="/people/mira">@mira</HoverCardTrigger>
  <HoverCardContent>…</HoverCardContent>
</HoverCard>
```

## Composition

```text
HoverCard
├── HoverCardTrigger
└── HoverCardContent
```

## Examples

### Sides

```tsx
import { Button } from "@/registry/base-nova/ui/button"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/registry/base-nova/ui/hover-card"

export default function HoverCardSides() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {(["top", "right", "bottom", "left"] as const).map((side) => (
        <HoverCard key={side}>
          <HoverCardTrigger variant="plain" render={<Button variant="secondary" size="sm" />} delay={200}>
            {side}
          </HoverCardTrigger>
          <HoverCardContent side={side} className="w-48">
            Opens on the {side}.
          </HoverCardContent>
        </HoverCard>
      ))}
    </div>
  )
}
```

## When to use

For a glance at a linked thing (a person, a repo, an issue) before following the link. Content must be optional: touch users never see it, so never put actions only here.

## API Reference

Built on [the Preview Card primitive](https://base-ui.com/react/components/preview-card#api-reference). Only the props this library adds or changes are listed; everything else passes through.

### HoverCard

Re-export of the primitive root. Also accepts every prop of [PreviewCard.Root](https://base-ui.com/react/components/preview-card#root).

### HoverCardTrigger

A link by default. Also accepts every prop of [PreviewCard.Trigger](https://base-ui.com/react/components/preview-card#trigger).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `delay` | `number` | `500` | ms before opening. |
| `closeDelay` | `number` | `200` | ms before closing. |
| `variant` | `"link" \| "plain"` | `"link"` | `plain` drops the link styling when `render` passes a Button. |

### HoverCardContent

Also accepts every prop of [PreviewCard.Popup](https://base-ui.com/react/components/preview-card#popup).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `side` | `"top" \| "right" \| "bottom" \| "left"` | `"bottom"` |  |
| `align` | `"start" \| "center" \| "end"` | `"center"` |  |
| `sideOffset` | `number` | `8` |  |
