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
