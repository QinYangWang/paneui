# Message Scroller

> Follows new messages until the reader scrolls up.

Page: https://paneui.dev/docs/message-scroller/

## Installation

```bash
npx shadcn@latest add @paneui/message-scroller
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/message-scroller.json
```

Packages: `motion`.

Registry items it builds on: `@paneui/theme`, `@paneui/icons`, `@paneui/locale-provider`.

## Usage

```tsx
import { MessageScroller } from "@/components/ui/message-scroller"
```

```tsx
<MessageScroller className="h-96">
  {messages.map((m) => <Message key={m.id} from={m.from}>…</Message>)}
</MessageScroller>
```

## Examples

### Pill Labels

```tsx
"use client"

import * as React from "react"

import { Button } from "@/registry/base-nova/ui/button"
import { Message, MessageBubble, MessageContent } from "@/registry/base-nova/ui/message"
import { MessageScroller } from "@/registry/base-nova/ui/message-scroller"

const THREAD = [
  { id: 1, from: "user", text: "What did the landlord say about the lease?" },
  { id: 2, from: "assistant", text: "She's happy to renew for another year." },
  { id: 3, from: "assistant", text: "Rent goes up 3%, from ¥120,000 to ¥123,600." },
  { id: 4, from: "user", text: "Can we ask for a 2-year term at the old rate?" },
  { id: 5, from: "assistant", text: "I can draft that. Want it polite or firm?" },
  { id: 6, from: "user", text: "Polite, but mention we've never paid late." },
  { id: 7, from: "assistant", text: "Draft is ready in your inbox for review." },
  { id: 8, from: "user", text: "Great, send it after lunch." },
] as const

export default function MessageScrollerLabels() {
  const [extra, setExtra] = React.useState<string[]>([])
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <MessageScroller
        className="h-72 rounded-2xl bg-card shadow-surface"
        contentClassName="gap-3"
        jumpLabel="Back to now"
        newLabel="New reply below"
      >
        {THREAD.map((m) => (
          <Message key={m.id} from={m.from}>
            <MessageContent>
              <MessageBubble tone={m.from === "user" ? "primary" : "default"}>{m.text}</MessageBubble>
            </MessageContent>
          </Message>
        ))}
        {extra.map((text, i) => (
          <Message key={i} from="assistant" animateIn>
            <MessageContent>
              <MessageBubble>{text}</MessageBubble>
            </MessageContent>
          </Message>
        ))}
      </MessageScroller>
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground text-pretty">Scroll up, then add a reply.</p>
        <Button size="sm" variant="secondary" onClick={() => setExtra((e) => [...e, `Sent. She usually answers within a day (${e.length + 1}).`])}>
          Add reply
        </Button>
      </div>
    </div>
  )
}
```

### Custom Jump Control

```tsx
"use client"

import { ArrowDownIcon } from "@/components/icons"
import { Button } from "@/registry/base-nova/ui/button"
import { Message, MessageBubble, MessageContent } from "@/registry/base-nova/ui/message"
import { MessageScroller, useMessageScroller } from "@/registry/base-nova/ui/message-scroller"

const THREAD = [
  { id: 1, from: "user", text: "What did the landlord say about the lease?" },
  { id: 2, from: "assistant", text: "She's happy to renew for another year." },
  { id: 3, from: "assistant", text: "Rent goes up 3%, from ¥120,000 to ¥123,600." },
  { id: 4, from: "user", text: "Can we ask for a 2-year term at the old rate?" },
  { id: 5, from: "assistant", text: "I can draft that. Want it polite or firm?" },
  { id: 6, from: "user", text: "Polite, but mention we've never paid late." },
  { id: 7, from: "assistant", text: "Draft is ready in your inbox for review." },
  { id: 8, from: "user", text: "Great, send it after lunch." },
] as const

function JumpBar() {
  const { atLiveEdge, hasNew, scrollToLatest } = useMessageScroller()
  return (
    <div className="flex items-center justify-between gap-3 border-t border-border py-2 pr-2 pl-4 [&>[data-slot=button]]:rounded-inner-or-lg">
      <span className="text-xs text-muted-foreground">
        {atLiveEdge ? "Following the conversation" : hasNew ? "New messages below" : "Reading earlier messages"}
      </span>
      <Button size="sm" variant="secondary" disabled={atLiveEdge} onClick={() => scrollToLatest()}>
        <ArrowDownIcon data-icon="inline-start" />
        Latest
      </Button>
    </div>
  )
}

export default function MessageScrollerCustomJump() {
  return (
    // The card's frame: the Latest button sits 8px into its bottom corner.
    <div className="frame-2xl frame-inset-2 w-full max-w-md">
      <MessageScroller
        showJumpButton={false}
        footer={<JumpBar />}
        className="h-80 w-full rounded-2xl bg-card shadow-surface"
        contentClassName="gap-3"
      >
        {THREAD.map((m) => (
          <Message key={m.id} from={m.from}>
            <MessageContent>
              <MessageBubble tone={m.from === "user" ? "primary" : "default"}>{m.text}</MessageBubble>
            </MessageContent>
          </Message>
        ))}
      </MessageScroller>
    </div>
  )
}
```

### Live Edge Callback

```tsx
"use client"

import * as React from "react"

import { Message, MessageBubble, MessageContent } from "@/registry/base-nova/ui/message"
import { MessageScroller } from "@/registry/base-nova/ui/message-scroller"

const THREAD = [
  { id: 1, from: "user", text: "What did the landlord say about the lease?" },
  { id: 2, from: "assistant", text: "She's happy to renew for another year." },
  { id: 3, from: "assistant", text: "Rent goes up 3%, from ¥120,000 to ¥123,600." },
  { id: 4, from: "user", text: "Can we ask for a 2-year term at the old rate?" },
  { id: 5, from: "assistant", text: "I can draft that. Want it polite or firm?" },
  { id: 6, from: "user", text: "Polite, but mention we've never paid late." },
  { id: 7, from: "assistant", text: "Draft is ready in your inbox for review." },
  { id: 8, from: "user", text: "Great, send it after lunch." },
] as const

export default function MessageScrollerLiveEdgeChange() {
  const [following, setFollowing] = React.useState(true)
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <MessageScroller onLiveEdgeChange={setFollowing} className="h-72 rounded-2xl bg-card shadow-surface" contentClassName="gap-3">
        {THREAD.map((m) => (
          <Message key={m.id} from={m.from}>
            <MessageContent>
              <MessageBubble tone={m.from === "user" ? "primary" : "default"}>{m.text}</MessageBubble>
            </MessageContent>
          </Message>
        ))}
      </MessageScroller>
      <p className="text-xs text-muted-foreground">
        Read receipts: <span className="font-medium text-foreground">{following ? "on" : "paused while you scroll back"}</span>
      </p>
    </div>
  )
}
```

### Start at Top

```tsx
import { Message, MessageBubble, MessageContent } from "@/registry/base-nova/ui/message"
import { MessageScroller } from "@/registry/base-nova/ui/message-scroller"

const THREAD = [
  { id: 1, from: "user", text: "What did the landlord say about the lease?" },
  { id: 2, from: "assistant", text: "She's happy to renew for another year." },
  { id: 3, from: "assistant", text: "Rent goes up 3%, from ¥120,000 to ¥123,600." },
  { id: 4, from: "user", text: "Can we ask for a 2-year term at the old rate?" },
  { id: 5, from: "assistant", text: "I can draft that. Want it polite or firm?" },
  { id: 6, from: "user", text: "Polite, but mention we've never paid late." },
  { id: 7, from: "assistant", text: "Draft is ready in your inbox for review." },
  { id: 8, from: "user", text: "Great, send it after lunch." },
] as const

export default function MessageScrollerStartAtTop() {
  return (
    <MessageScroller startAtEnd={false} className="h-72 w-full max-w-md rounded-2xl bg-card shadow-surface" contentClassName="gap-3">
      {THREAD.map((m) => (
        <Message key={m.id} from={m.from}>
          <MessageContent>
            <MessageBubble tone={m.from === "user" ? "primary" : "default"}>{m.text}</MessageBubble>
          </MessageContent>
        </Message>
      ))}
    </MessageScroller>
  )
}
```

### No Follow

```tsx
"use client"

import * as React from "react"

import { Button } from "@/registry/base-nova/ui/button"
import { Message, MessageBubble, MessageContent } from "@/registry/base-nova/ui/message"
import { MessageScroller } from "@/registry/base-nova/ui/message-scroller"

const THREAD = [
  { id: 1, from: "user", text: "What did the landlord say about the lease?" },
  { id: 2, from: "assistant", text: "She's happy to renew for another year." },
  { id: 3, from: "assistant", text: "Rent goes up 3%, from ¥120,000 to ¥123,600." },
  { id: 4, from: "user", text: "Can we ask for a 2-year term at the old rate?" },
  { id: 5, from: "assistant", text: "I can draft that. Want it polite or firm?" },
  { id: 6, from: "user", text: "Polite, but mention we've never paid late." },
  { id: 7, from: "assistant", text: "Draft is ready in your inbox for review." },
  { id: 8, from: "user", text: "Great, send it after lunch." },
] as const

export default function MessageScrollerNoFollow() {
  const [extra, setExtra] = React.useState(0)
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <MessageScroller follow={false} className="h-72 rounded-2xl bg-card shadow-surface" contentClassName="gap-3">
        {THREAD.map((m) => (
          <Message key={m.id} from={m.from}>
            <MessageContent>
              <MessageBubble tone={m.from === "user" ? "primary" : "default"}>{m.text}</MessageBubble>
            </MessageContent>
          </Message>
        ))}
        {Array.from({ length: extra }, (_, i) => (
          <Message key={i} from="assistant" animateIn>
            <MessageContent>
              <MessageBubble>Update {i + 1}: the landlord opened your email.</MessageBubble>
            </MessageContent>
          </Message>
        ))}
      </MessageScroller>
      <Button size="sm" variant="secondary" className="self-end" onClick={() => setExtra((n) => n + 1)}>
        Add update
      </Button>
    </div>
  )
}
```

## Keyboard

The viewport is focusable. `ArrowUp`, `PageUp`, `Home` and `Shift+Space` release it from the live edge; `End` jumps back to the latest message.

## Motion

Under reduced motion the viewport jumps instead of gliding to the bottom, and the pill fades instead of blurring and lifting.

## API Reference

### MessageScroller

A conversation viewport pinned to the live edge while output streams. Also accepts every prop of `div`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `threshold` | `number` | `48` | Distance from the bottom (px) still treated as at the live edge. |
| `startAtEnd` | `boolean` | `true` | Start scrolled to the bottom on mount. |
| `follow` | `boolean` | `true` | Follow new content while at the live edge. |
| `showJumpButton` | `boolean` | `true` | Show the floating jump-to-latest pill when released. |
| `jumpButton` | `"pill" \| "icon"` | `"pill"` | `icon` renders a round arrow-only button (label kept for screen readers), as in desktop chat apps. |
| `jumpLabel` | `string` | `"Jump to latest"` | Pill label when nothing new is below. |
| `newLabel` | `string` | `"New messages"` | Pill label once content arrived below the reader. |
| `viewportClassName` | `string` | — | Classes for the scrolling viewport. |
| `contentClassName` | `string` | — | Classes for the content column inside the viewport (default `flex flex-col p-4`). |
| `onLiveEdgeChange` | `(atLiveEdge: boolean) => void` | — | Called when the viewport attaches to or releases the live edge. |
| `footer` | `ReactNode` | — | Rendered below the viewport, outside the scrolling content (a composer, a jump bar). Can call `useMessageScroller()`. |
| `overlay` | `ReactNode` | — | Rendered over the viewport, outside the scrolling content, in a `relative` frame; position it yourself. Can call `useMessageScroller()`. |

| Data attribute | Description |
| --- | --- |
| `data-live-edge` | On the root while pinned to the newest content. |
| `data-new` | On the jump pill once new content arrived below. |

### useMessageScroller

Reads the nearest `MessageScroller` from its children, `footer` or `overlay`. Throws outside one.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `atLiveEdge` | `boolean` | — | Returned. True while pinned to the newest content. |
| `hasNew` | `boolean` | — | Returned. True once content arrived below a reader who scrolled up. |
| `scrollToLatest` | `(behavior?: ScrollBehavior) => void` | — | Returned. Scroll to the newest content and re-attach; `"smooth"` by default. |
