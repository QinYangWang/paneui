import { MessageBubble, MessageBubbleCollapsible, MessageBubbleGroup } from "@paneui/ui/components/message-bubble"

export default function MessageBubbleDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <MessageBubbleGroup align="end">
        <MessageBubble tone="primary">Can you move my 3 pm with Dana?</MessageBubble>
        <MessageBubble tone="primary">Thursday works best</MessageBubble>
      </MessageBubbleGroup>

      <MessageBubbleGroup>
        <MessageBubble>Done — moved to Thursday at 3 pm. Dana accepted.</MessageBubble>
        <MessageBubble render={<a href="#calendar" />}>Open in Calendar →</MessageBubble>
      </MessageBubbleGroup>

      <MessageBubble>
        <MessageBubbleCollapsible collapsedHeight={72}>
          Here’s the summary of the vendor thread: the renewal quote went up 12% because of the new seat tier,
          procurement wants a 2-year term to hold the price, and legal flagged the auto-renew clause in section 4.2.
          Finance can approve up to $18k without a committee review, so the 2-year option would need sign-off.
          I’d suggest replying to ask for the 1-year price with a cap on next year’s increase.
        </MessageBubbleCollapsible>
      </MessageBubble>

      <div className="flex flex-col gap-1.5">
        <MessageBubble tone="muted" size="sm" className="self-center">
          Dana joined the conversation
        </MessageBubble>
        <MessageBubble tone="destructive" size="sm" align="end">
          Couldn’t send. Tap to retry.
        </MessageBubble>
        <MessageBubble tone="outline" size="sm">
          Draft saved
        </MessageBubble>
      </div>
    </div>
  )
}
