"use client"

import * as React from "react"

import { MessageBubble } from "@/registry/base-nova/ui/message-bubble"

const REPLIES = ["Sounds good", "Make it 7 pm", "Cancel the booking"]

export default function MessageBubbleInteractive() {
  const [picked, setPicked] = React.useState<string | null>(null)
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <MessageBubble>Dinner for two at 6:30 tonight. Keep it?</MessageBubble>
      {picked ? (
        <MessageBubble tone="primary" align="end">
          {picked}
        </MessageBubble>
      ) : (
        <div className="flex flex-wrap justify-end gap-2">
          {REPLIES.map((reply) => (
            <MessageBubble key={reply} tone="outline" size="sm" tail={false} render={<button type="button" />} onClick={() => setPicked(reply)}>
              {reply}
            </MessageBubble>
          ))}
        </div>
      )}
    </div>
  )
}
