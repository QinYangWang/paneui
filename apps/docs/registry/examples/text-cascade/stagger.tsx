"use client"

import * as React from "react"

import { Button } from "@paneui/ui/components/button"
import { TextCascade } from "@paneui/ui/components/text-cascade"

const WORDS = ["Morning", "Afternoon", "Evening"]
const STAGGERS = [0, 0.025, 0.07]

export default function TextCascadeStagger() {
  const [i, setI] = React.useState(0)
  return (
    <div className="flex flex-col items-start gap-4">
      <div className="flex flex-col gap-2">
        {STAGGERS.map((stagger) => (
          <div key={stagger} className="flex items-baseline gap-3">
            <span className="w-24 text-xs text-muted-foreground tabular-nums">stagger {stagger}</span>
            <TextCascade text={WORDS[i]} stagger={stagger} className="text-lg font-semibold" />
          </div>
        ))}
      </div>
      <Button size="sm" variant="secondary" onClick={() => setI((n) => (n + 1) % WORDS.length)}>
        Next
      </Button>
    </div>
  )
}
