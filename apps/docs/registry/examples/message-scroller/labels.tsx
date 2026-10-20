"use client"

import * as React from "react"

import { Button } from "@paneui/ui/components/button"
import { Message, MessageBubble, MessageContent } from "@paneui/ui/components/message"
import { MessageScroller } from "@paneui/ui/components/message-scroller"

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
