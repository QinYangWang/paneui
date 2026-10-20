import { MessageBubble } from "@paneui/ui/components/message-bubble"

export default function MessageBubbleSizes() {
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <MessageBubble>Lunch is booked for noon at Sora.</MessageBubble>
      <MessageBubble size="sm">Lunch is booked for noon at Sora.</MessageBubble>
    </div>
  )
}
