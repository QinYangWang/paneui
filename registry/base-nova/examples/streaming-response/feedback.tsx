"use client"

import * as React from "react"

import { StreamingResponse, type StreamingResponseFeedback } from "@/registry/base-nova/ui/streaming-response"

export default function StreamingResponseFeedbackExample() {
  const [feedback, setFeedback] = React.useState<StreamingResponseFeedback>(null)
  return (
    <div className="flex w-full max-w-lg flex-col gap-2">
      <StreamingResponse
        text="The 18:05 ferry to Lamma Island leaves from Central Pier 4 and takes about 30 minutes."
        status="complete"
        feedback={feedback}
        onFeedbackChange={setFeedback}
      />
      <p className="text-xs text-muted-foreground">
        Feedback: <span className="font-medium text-foreground">{feedback ?? "none"}</span>
      </p>
    </div>
  )
}
