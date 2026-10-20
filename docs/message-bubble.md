# Message Bubble

> Holds one chat message in a speech bubble.

Page: https://paneui.dev/docs/message-bubble/

## Installation

```bash
npx shadcn@latest add @paneui/message-bubble
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/message-bubble.json
```

Packages: `@base-ui/react`, `class-variance-authority`.

Registry items it builds on: `@paneui/theme`, `@paneui/icons`.

## Usage

```tsx
import { MessageBubble, MessageBubbleGroup } from "@/components/ui/message-bubble"
```

```tsx
<MessageBubbleGroup align="end">
  <MessageBubble tone="primary">Can we push the review to Friday?</MessageBubble>
</MessageBubbleGroup>
```

## Composition

```text
MessageBubbleGroup
└── MessageBubble
    └── MessageBubbleCollapsible
```

## Examples

### Tones

```tsx
import { MessageBubble } from "@/registry/base-nova/ui/message-bubble"

export default function MessageBubbleTones() {
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <MessageBubble tone="primary" align="end">
        Book the 7:40 train to Kyoto
      </MessageBubble>
      <MessageBubble>Booked. Car 6, seat 12A, arriving 9:58.</MessageBubble>
      <MessageBubble tone="muted">Your ticket was added to Wallet.</MessageBubble>
      <MessageBubble tone="outline">Reminder set for 7:00.</MessageBubble>
      <MessageBubble tone="destructive">The card on file was declined.</MessageBubble>
      <MessageBubble tone="ghost">Anything else for the trip?</MessageBubble>
    </div>
  )
}
```

### Sizes

```tsx
import { MessageBubble } from "@/registry/base-nova/ui/message-bubble"

export default function MessageBubbleSizes() {
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <MessageBubble>Lunch is booked for noon at Sora.</MessageBubble>
      <MessageBubble size="sm">Lunch is booked for noon at Sora.</MessageBubble>
    </div>
  )
}
```

### Alignment and Tail

```tsx
import { MessageBubble } from "@/registry/base-nova/ui/message-bubble"

export default function MessageBubbleAlignAndTail() {
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <MessageBubble tone="primary" align="end">
        With tail
      </MessageBubble>
      <MessageBubble tone="primary" align="end" tail={false}>
        Without tail
      </MessageBubble>
      <MessageBubble>With tail</MessageBubble>
      <MessageBubble tail={false}>Without tail</MessageBubble>
    </div>
  )
}
```

### Grouped

```tsx
import { MessageBubble, MessageBubbleGroup } from "@/registry/base-nova/ui/message-bubble"

export default function MessageBubbleGrouped() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <MessageBubbleGroup>
        <MessageBubble>I found three flats near the station.</MessageBubble>
        <MessageBubble>The cheapest is ¥92,000 a month.</MessageBubble>
        <MessageBubble>Want me to book viewings?</MessageBubble>
      </MessageBubbleGroup>
      <MessageBubbleGroup align="end">
        <MessageBubble tone="primary">Yes please</MessageBubble>
        <MessageBubble tone="primary">Saturday morning if possible</MessageBubble>
      </MessageBubbleGroup>
    </div>
  )
}
```

### Interactive

```tsx
"use client"

import * as React from "react"

import { MessageBubble } from "@/registry/base-nova/ui/message-bubble"

const REPLIES = ["Sounds good", "Make it 7 pm", "Cancel the booking"]

export default function MessageBubbleInteractive() {
  const [picked, setPicked] = React.useState<string | null>(null)
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <MessageBubble>Dinner for two at 6:30 tonight. Keep it?</MessageBubble>
      {picked ? (
        <MessageBubble tone="primary" align="end">
          {picked}
        </MessageBubble>
      ) : (
        <div className="flex flex-wrap justify-end gap-2">
          {REPLIES.map((reply) => (
            <MessageBubble key={reply} tone="outline" size="sm" tail={false} render={<button type="button" />} onClick={() => setPicked(reply)}>
              {reply}
            </MessageBubble>
          ))}
        </div>
      )}
    </div>
  )
}
```

### Collapsible

```tsx
import { MessageBubble, MessageBubbleCollapsible } from "@/registry/base-nova/ui/message-bubble"

export default function MessageBubbleCollapsibleExample() {
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <MessageBubble tone="primary" align="end">
        <MessageBubbleCollapsible collapsedHeight={48} moreLabel="Read all" lessLabel="Collapse">
          Here is the full packing list: passport, rail pass, two power adapters, the blue rain jacket, walking shoes,
          medication for the week, a paper copy of the hotel booking, and the camera charger that lives in the desk
          drawer.
        </MessageBubbleCollapsible>
      </MessageBubble>
      <MessageBubble>
        <MessageBubbleCollapsible collapsedHeight={48} defaultExpanded>
          Got it. I added everything to your Trip checklist and set a reminder the night before you leave so you can tick
          things off as you pack.
        </MessageBubbleCollapsible>
      </MessageBubble>
    </div>
  )
}
```

## Motion

The collapsible's height transition is removed under reduced motion; interactive bubbles press to `scale-98`.

## Accessibility

The Show more toggle is a real `<button>` with `aria-expanded` and `aria-controls` pointing at the clipped region. It only appears when the content overflows.

## API Reference

### MessageBubble

A single conversational surface. Also accepts every prop of [div (useRender)](https://base-ui.com/react/utils/use-render).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `tone` | `"default" \| "primary" \| "muted" \| "outline" \| "destructive" \| "ghost"` | `"default"` | `primary` for the sender, `default` for replies, `muted` for system, `outline` for quiet, `destructive` for errors and `ghost` for unframed messages. |
| `size` | `"default" \| "sm"` | `"default"` | Padding, radius and text size. |
| `align` | `"start" \| "end"` | — | Side the bubble hugs. Inherited from `Message` / `MessageBubbleGroup` when omitted, else `start`. |
| `tail` | `boolean` | `true` | Tighten the bottom corner toward the sender. Ignored for `ghost`. |
| `render` | `ReactElement \| (props, state) => ReactElement` | — | Render as another element, e.g. `<a />` or `<button />`; the bubble becomes pressable. |

### MessageBubbleGroup

Stacks consecutive bubbles from one sender with joined corners. Also accepts every prop of `div`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `align` | `"start" \| "end"` | — | Side for the whole group. Inherited from `Message` when omitted, else `start`. |

| Data attribute | Description |
| --- | --- |
| `data-align` | `start` or `end`. |

### MessageBubbleCollapsible

Clips long content with a fade and a Show more toggle. Also accepts every prop of `div`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `collapsedHeight` | `number` | `120` | Height in px while collapsed. |
| `defaultExpanded` | `boolean` | `false` | Start expanded. |
| `moreLabel` | `string` | `"Show more"` | Toggle label while collapsed. |
| `lessLabel` | `string` | `"Show less"` | Toggle label while expanded. |

### messageBubbleVariants

The `cva` function behind `MessageBubble`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `tone` | `same as MessageBubble` | — |  |
| `size` | `same as MessageBubble` | — |  |

### MessageSideContext

React context (`"start" | "end" | null`) that `Message` provides so nested bubbles inherit their side.
