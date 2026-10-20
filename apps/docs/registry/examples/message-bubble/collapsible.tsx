import { MessageBubble, MessageBubbleCollapsible } from "@paneui/ui/components/message-bubble"

export default function MessageBubbleCollapsibleExample() {
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <MessageBubble tone="primary" align="end">
        <MessageBubbleCollapsible collapsedHeight={48} moreLabel="Read all" lessLabel="Collapse">
          Here is the full packing list: passport, rail pass, two power adapters, the blue rain jacket, walking shoes,
          medication for the week, a paper copy of the hotel booking, and the camera charger that lives in the desk
          drawer.
        </MessageBubbleCollapsible>
      </MessageBubble>
      <MessageBubble>
        <MessageBubbleCollapsible collapsedHeight={48} defaultExpanded>
          Got it. I added everything to your Trip checklist and set a reminder the night before you leave so you can tick
          things off as you pack.
        </MessageBubbleCollapsible>
      </MessageBubble>
    </div>
  )
}
