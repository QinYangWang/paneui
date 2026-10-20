# Overflow Hint

> Shows the full text of a truncated label on hover.

Page: https://paneui.dev/docs/overflow-hint/

## Installation

```bash
npx shadcn@latest add @paneui/overflow-hint
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/overflow-hint.json
```

Packages: `@base-ui/react`.

Registry items it builds on: `@paneui/theme`.

## Usage

```tsx
import { OverflowHintText } from "@/components/ui/overflow-hint"
```

```tsx
<OverflowHintText>{thread.title}</OverflowHintText>
```

## Composition

```text
OverflowHint
├── OverflowHintTrigger
└── OverflowHintContent

OverflowHintText
```

## Examples

### Line Clamp

```tsx
import { OverflowHintText } from "@/registry/base-nova/ui/overflow-hint"

const summary =
  "Moved the session store to a single reducer, split the transport into its own module and added retries with backoff for dropped connections. The old event names still work for one release."

export default function OverflowHintLines() {
  return (
    <div className="flex w-72 flex-col gap-1 rounded-xl bg-card p-3 shadow-raised">
      <p className="text-ui font-medium">Refactor session store</p>
      <div className="text-ui text-muted-foreground">
        <OverflowHintText lines={2}>{summary}</OverflowHintText>
      </div>
    </div>
  )
}
```

### Parts

Use the parts when the hint shows something other than the label.

```tsx
import { FileIcon } from "@/components/icons"
import { OverflowHint, OverflowHintContent, OverflowHintTrigger } from "@/registry/base-nova/ui/overflow-hint"

const files = [
  "src/app/(workspace)/projects/[projectId]/settings/members/page.tsx",
  "src/components/composer.tsx",
  "src/lib/transport/reconnect-with-backoff.ts",
]

export default function OverflowHintParts() {
  return (
    <ul className="flex w-64 flex-col frame-xl frame-p-1 bg-card text-ui shadow-raised">
      {files.map((path) => (
        <li key={path} className="flex h-7 items-center gap-1.5 rounded-inner px-2 hover:bg-secondary">
          <FileIcon className="size-4 shrink-0 text-muted-foreground" />
          <OverflowHint>
            <OverflowHintTrigger>{path}</OverflowHintTrigger>
            <OverflowHintContent>
              <span className="font-mono">{path}</span>
            </OverflowHintContent>
          </OverflowHint>
        </li>
      ))}
    </ul>
  )
}
```

## When it opens

The trigger is measured when the pointer rests on it, and the hint opens only if its text is cut off (wider or taller than its box). Text that fits never opens it, so it is safe on every row.

## Selecting text

The pointer can move from the trigger into the hint without closing it, and the text there can be selected and copied. Presses inside the hint don't reach the trigger's row or tab. Pressing the trigger closes the hint until the pointer leaves, so clicks and drags don't bring it back.

## Long text

The hint wraps at 320px (or the viewport less 16px), breaks long paths and scrolls past 192px of height. Line breaks in a string are kept.

## Accessibility

Truncation is visual, so screen readers already get the full label from the trigger. The hint opens on hover only, which keeps it out of the way of keyboard focus on tabs and rows.

## Motion

The hint opens and closes over 150ms with a slight scale and a 4px nudge from the trigger; with reduced motion it only fades.

## API Reference

Built on [the Preview Card primitive](https://base-ui.com/react/components/preview-card#api-reference). Only the props this library adds or changes are listed; everything else passes through.

### OverflowHintText

A trigger and its hint in one. Takes every `OverflowHintTrigger` prop. Also accepts every prop of `OverflowHintTrigger`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `hint` | `ReactNode` | — | Hint content. Defaults to `children`. |
| `side` | `"top" \| "right" \| "bottom" \| "left"` | `"top"` | Side of the text to open on. |
| `align` | `"start" \| "center" \| "end"` | `"center"` | Alignment against the text. |
| `sideOffset` | `number` | `6` | Gap from the text in px. |
| `alignOffset` | `number` | `0` | Shift along the text in px. |

### OverflowHint

Root. Keeps the hint closed while the trigger's text fits. Also accepts every prop of [PreviewCard.Root](https://base-ui.com/react/components/preview-card#root).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `open` | `boolean` | — | Controlled open state. |
| `onOpenChange` | `(open: boolean, eventDetails) => void` | — | Called when the hint opens or closes; never called to open untruncated text. |

### OverflowHintTrigger

The text that truncates and gets measured. Renders a block `span`. Also accepts every prop of [PreviewCard.Trigger](https://base-ui.com/react/components/preview-card#trigger).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `lines` | `1 \| 2 \| 3` | `1` | Lines before the text is cut off with an ellipsis. |
| `delay` | `number` | `300` | Milliseconds before the hint opens. |
| `closeDelay` | `number` | `150` | Milliseconds before it closes after the pointer leaves. |

### OverflowHintContent

Portal, positioner and popup in one. Also accepts every prop of [PreviewCard.Popup](https://base-ui.com/react/components/preview-card#popup).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `side` | `"top" \| "right" \| "bottom" \| "left"` | `"top"` | Side of the trigger to open on. |
| `sideOffset` | `number` | `6` | Gap from the trigger in px. |
| `align` | `"start" \| "center" \| "end"` | `"center"` | Alignment against the trigger. |
| `alignOffset` | `number` | `0` | Shift along the trigger in px. |
| `collisionPadding` | `number` | `8` | Space kept from the viewport edges in px. |

| Data attribute | Description |
| --- | --- |
| `data-side` | The side it actually opened on, after collision handling. |
