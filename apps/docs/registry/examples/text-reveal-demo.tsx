"use client"

import * as React from "react"

import { RefreshIcon } from "@paneui/ui/icons"
import { Button } from "@paneui/ui/components/button"
import { TextReveal } from "@paneui/ui/components/text-reveal"

export default function TextRevealDemo() {
  const [run, setRun] = React.useState(0)
  return (
    <div className="flex max-w-md flex-col items-start gap-4">
      <div key={run} className="flex flex-col gap-2">
        <TextReveal
          as="h3"
          text="Your week, handled."
          className="text-2xl font-semibold tracking-tight"
        />
        <TextReveal
          as="p"
          split="char"
          delay={0.35}
          text="Three bookings confirmed, two bills paid."
          className="text-sm text-muted-foreground"
        />
      </div>
      <Button variant="secondary" size="sm" onClick={() => setRun((r) => r + 1)}>
        <RefreshIcon data-icon="inline-start" />
        Replay
      </Button>
    </div>
  )
}
