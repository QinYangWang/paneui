"use client"

import * as React from "react"

import { RefreshIcon } from "@/components/icons"
import { Button } from "@/registry/base-nova/ui/button"
import { TextReveal } from "@/registry/base-nova/ui/text-reveal"

export default function TextRevealLines() {
  const [run, setRun] = React.useState(0)

  return (
    <div className="flex flex-col items-start gap-4">
      <TextReveal
        key={run}
        as="blockquote"
        text={["Less time on the screen,", "more time with the people you love."]}
        className="text-xl font-medium tracking-tight text-balance"
      />
      <Button variant="secondary" size="sm" onClick={() => setRun((r) => r + 1)}>
        <RefreshIcon data-icon="inline-start" />
        Replay
      </Button>
    </div>
  )
}
