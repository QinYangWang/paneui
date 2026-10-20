import { MessageBubble } from "@paneui/ui/components/message-bubble"

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
