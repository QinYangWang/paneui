"use client"

import * as React from "react"

import { RefreshIcon } from "@paneui/ui/icons"
import { Button } from "@paneui/ui/components/button"
import { TextReveal } from "@paneui/ui/components/text-reveal"

export default function TextRevealSplitChar() {
  const [run, setRun] = React.useState(0)

  return (
    <div className="flex flex-col items-start gap-4">
      <TextReveal key={run} as="h3" split="char" text="Checked in." className="text-3xl font-semibold tracking-tight" />
      <Button variant="secondary" size="sm" onClick={() => setRun((r) => r + 1)}>
        <RefreshIcon data-icon="inline-start" />
        Replay
      </Button>
    </div>
  )
}
