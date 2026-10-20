# Chat

> Message thread between a user and an agent.

Page: https://paneui.dev/docs/chat/

## Installation

```bash
npx shadcn@latest add @paneui/chat
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/chat.json
```

Packages: `motion`.

Registry items it builds on: `@paneui/theme`.

## Usage

```tsx
"use client"

import * as React from "react"

import { ChatBubble, ChatThread, ChatTyping } from "@/registry/base-nova/blocks/chat/chat"
import { PromptBar } from "@/registry/base-nova/blocks/prompt-bar/prompt-bar"

type Message = { from: "user" | "assistant"; text: string }

export default function ChatDemo() {
  const [messages, setMessages] = React.useState<Message[]>([
    { from: "user", text: "How many waffle cones do we have left?" },
    { from: "assistant", text: "About 140, roughly four days at this week's pace. Want me to reorder?" },
  ])
  const [busy, setBusy] = React.useState(false)

  return (
    <div className="flex w-full max-w-xl flex-col gap-4">
      <ChatThread>
        {messages.map((m, i) => (
          <ChatBubble key={i} from={m.from}>
            {m.text}
          </ChatBubble>
        ))}
        {busy && <ChatTyping />}
      </ChatThread>
      <PromptBar
        busy={busy}
        onStop={() => setBusy(false)}
        onSubmit={(text) => {
          setMessages((m) => [...m, { from: "user", text }])
          setBusy(true)
          setTimeout(() => {
            setBusy(false)
            setMessages((m) => [...m, { from: "assistant", text: "On it." }])
          }, 1400)
        }}
      />
    </div>
  )
}
```
