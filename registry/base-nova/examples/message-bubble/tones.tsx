import { MessageBubble } from "@/registry/base-nova/ui/message-bubble"

export default function MessageBubbleTones() {
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <MessageBubble tone="primary" align="end">
        Book the 7:40 train to Kyoto
      </MessageBubble>
      <MessageBubble>Booked. Car 6, seat 12A, arriving 9:58.</MessageBubble>
      <MessageBubble tone="muted">Your ticket was added to Wallet.</MessageBubble>
      <MessageBubble tone="outline">Reminder set for 7:00.</MessageBubble>
      <MessageBubble tone="destructive">The card on file was declined.</MessageBubble>
      <MessageBubble tone="ghost">Anything else for the trip?</MessageBubble>
    </div>
  )
}
