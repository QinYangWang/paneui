# Message

> Lays out chat conversation rows by sender.

Page: https://paneui.dev/docs/message/

## Installation

```bash
npx shadcn@latest add @paneui/message
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/message.json
```

Packages: `motion`, `@base-ui/react`.

Registry items it builds on: `@paneui/theme`, `@paneui/button`, `@paneui/tooltip`, `@paneui/message-bubble`, `@paneui/locale-provider`.

## Usage

```tsx
import { Message, MessageBubble, MessageContent, MessageList } from "@/components/ui/message"
```

```tsx
<MessageList>
  <Message from="user">
    <MessageContent>
      <MessageBubble tone="primary">What's on my calendar today?</MessageBubble>
    </MessageContent>
  </Message>
</MessageList>
```

## Composition

```text
MessageList
├── MessageMarker
└── Message
    ├── MessageAvatar
    ├── MessageTyping
    └── MessageContent
        ├── MessageHeader
        ├── MessageBubble
        ├── MessageMeta
        └── MessageActions
            └── MessageAction
```

## Examples

### Avatars

```tsx
import { BotIcon } from "@/components/icons"
import { Message, MessageAvatar, MessageBubble, MessageContent, MessageHeader, MessageList } from "@/registry/base-nova/ui/message"

export default function MessageAvatars() {
  return (
    <MessageList className="max-w-lg">
      <Message from="user">
        <MessageAvatar>QW</MessageAvatar>
        <MessageContent>
          <MessageBubble tone="primary">Is the dentist still at 10 tomorrow?</MessageBubble>
        </MessageContent>
      </Message>
      <Message from="assistant">
        <MessageAvatar>
          <BotIcon />
        </MessageAvatar>
        <MessageContent>
          <MessageHeader>Hark</MessageHeader>
          <MessageBubble>Yes, 10:00 with Dr. Lin.</MessageBubble>
        </MessageContent>
      </Message>
      <Message from="assistant">
        <MessageAvatar placeholder />
        <MessageContent>
          <MessageBubble>I’ll remind you at 9:15 so you can leave on time.</MessageBubble>
        </MessageContent>
      </Message>
    </MessageList>
  )
}
```

### Hover Actions

```tsx
import { CopyIcon, EditIcon, RefreshIcon } from "@/components/icons"
import { Message, MessageAction, MessageActions, MessageBubble, MessageContent, MessageList } from "@/registry/base-nova/ui/message"

export default function MessageHoverActions() {
  return (
    <MessageList className="max-w-lg">
      <Message from="user">
        <MessageContent>
          <MessageBubble tone="primary">Translate “see you Friday” into Japanese.</MessageBubble>
          <MessageActions>
            <MessageAction label="Edit">
              <EditIcon />
            </MessageAction>
          </MessageActions>
        </MessageContent>
      </Message>
      <Message from="assistant">
        <MessageContent>
          <MessageBubble>金曜日に会いましょう (Kin’yōbi ni aimashō).</MessageBubble>
          <MessageActions>
            <MessageAction label="Copy">
              <CopyIcon />
            </MessageAction>
            <MessageAction label="Regenerate">
              <RefreshIcon />
            </MessageAction>
          </MessageActions>
        </MessageContent>
      </Message>
    </MessageList>
  )
}
```

### System Rows

```tsx
import { Message, MessageBubble, MessageContent, MessageList, MessageMarker } from "@/registry/base-nova/ui/message"

export default function MessageSystem() {
  return (
    <MessageList className="max-w-lg">
      <Message from="user">
        <MessageContent>
          <MessageBubble tone="primary">Add Sam to this chat.</MessageBubble>
        </MessageContent>
      </Message>
      <Message from="system">
        <MessageContent>
          <MessageBubble tone="muted" size="sm" tail={false}>
            Sam can now see messages from today onward.
          </MessageBubble>
        </MessageContent>
      </Message>
      <MessageMarker>Sam joined</MessageMarker>
      <Message from="assistant">
        <MessageContent>
          <MessageBubble>Hi Sam, we’re planning Saturday’s hike.</MessageBubble>
        </MessageContent>
      </Message>
    </MessageList>
  )
}
```

### Compact Spacing

```tsx
import { Message, MessageBubble, MessageContent, MessageList } from "@/registry/base-nova/ui/message"

const TURNS = [
  { from: "user", text: "Coffee at 9?" },
  { from: "assistant", text: "Booked for two at Fuglen." },
  { from: "user", text: "Perfect" },
  { from: "assistant", text: "I'll send Sam the address." },
] as const

export default function MessageCompact() {
  return (
    <MessageList spacing="compact" className="max-w-lg">
      {TURNS.map((t) => (
        <Message key={t.text} from={t.from}>
          <MessageContent>
            <MessageBubble size="sm" tone={t.from === "user" ? "primary" : "default"}>
              {t.text}
            </MessageBubble>
          </MessageContent>
        </Message>
      ))}
    </MessageList>
  )
}
```

### Animate In

```tsx
"use client"

import * as React from "react"

import { Button } from "@/registry/base-nova/ui/button"
import { Message, MessageBubble, MessageContent, MessageList } from "@/registry/base-nova/ui/message"

const LINES = ["Running late, 10 minutes", "Grab us a table?", "Thanks!"]

export default function MessageAnimateIn() {
  const [count, setCount] = React.useState(0)
  return (
    <div className="flex w-full max-w-lg flex-col gap-4">
      <MessageList spacing="compact">
        <Message from="assistant">
          <MessageContent>
            <MessageBubble>Sam is already at the café.</MessageBubble>
          </MessageContent>
        </Message>
        {LINES.slice(0, count).map((line) => (
          <Message key={line} from="user" animateIn>
            <MessageContent>
              <MessageBubble tone="primary">{line}</MessageBubble>
            </MessageContent>
          </Message>
        ))}
      </MessageList>
      <Button size="sm" variant="secondary" className="self-start" onClick={() => setCount((c) => (c >= LINES.length ? 0 : c + 1))}>
        {count >= LINES.length ? "Reset" : "Send next"}
      </Button>
    </div>
  )
}
```

## Motion

Under reduced motion `animateIn` becomes a 150ms fade and the typing dots pulse their opacity instead of bouncing.

## Accessibility

Each row is an `<article>` labelled "{from} message" unless you pass `aria-label`. `MessageActions` is a `role="toolbar"`, every `MessageAction` gets its `label` as `aria-label` and tooltip, and `MessageMarker` is a `role="separator"`.

## API Reference

### MessageList

Vertical stack of rows. Also accepts every prop of `div`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `spacing` | `"compact" \| "default"` | `"default"` | Gap between rows: 8px or 20px. |

### Message

One conversation row. `user` rows hug the right edge. Also accepts every prop of `motion.article`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `from` | `"user" \| "assistant" \| "system"` | `"assistant"` | Sender; sets the side for every bubble inside. |
| `animateIn` | `boolean` | `false` | Pop up from the sender's corner once on mount. |

| Data attribute | Description |
| --- | --- |
| `data-from` | `user`, `assistant` or `system`; children style off `group-data-[from=user]/message`. |

### MessageAvatar

Round 32px avatar slot. Also accepts every prop of `div`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `placeholder` | `boolean` | `false` | Render an invisible spacer instead of the avatar. |

### MessageContent

Column for bubbles, header, meta and actions; groups bubbles to the row's side. Also accepts every prop of [MessageBubbleGroup](/docs/message-bubble).

### MessageHeader

Sender name or model above the bubbles. Also accepts every prop of `div`.

### MessageMeta

Timestamp or delivery status below the bubbles; tabular numerals. Also accepts every prop of `div`.

### MessageActions

Toolbar of quiet icon actions. Also accepts every prop of `div`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `visible` | `boolean` | `false` | Keep shown instead of revealing on hover / focus. |

| Data attribute | Description |
| --- | --- |
| `data-visible` | Present when `visible`. |

### MessageAction

Ghost icon button with a tooltip. Also accepts every prop of [Button](/docs/button).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` (required) | `string` | — | Tooltip text and `aria-label`. |

### MessageTyping

Three-dot typing indicator in a bubble-shaped chip. Also accepts every prop of `div`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `string` | `"Typing"` | Accessible label of the status. |

### MessageMarker

Centred divider between turns, such as a date, "New" or a note. Also accepts every prop of `div`.

### MessageBubble

Re-exported from [Message Bubble](https://paneui.dev/docs/message-bubble), along with `MessageBubbleGroup` and `MessageBubbleCollapsible`.
