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
