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
