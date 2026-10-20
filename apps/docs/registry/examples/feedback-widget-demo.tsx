"use client"

import { FeedbackWidget } from "@paneui/ui/blocks/feedback-widget/feedback-widget"

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export default function FeedbackWidgetDemo() {
  return (
    <div className="relative h-96 w-full max-w-md overflow-hidden rounded-2xl bg-muted/50 shadow-well">
      <div className="flex flex-col gap-2.5 p-5" aria-hidden>
        <div className="h-3 w-24 rounded-full bg-foreground/10" />
        <div className="h-5 w-48 rounded-full bg-foreground/15" />
        <div className="mt-3 h-24 rounded-xl bg-card shadow-raised" />
        <div className="h-3 w-full rounded-full bg-foreground/8" />
        <div className="h-3 w-4/5 rounded-full bg-foreground/8" />
      </div>
      <p className="absolute bottom-5 left-5 max-w-40 text-xs text-muted-foreground">
        Tip: include the word &ldquo;fail&rdquo; to see the retry state.
      </p>
      <FeedbackWidget
        onSubmit={async ({ message }) => {
          await wait(1200)
          if (/fail/i.test(message)) throw new Error("Network error")
        }}
      />
    </div>
  )
}
