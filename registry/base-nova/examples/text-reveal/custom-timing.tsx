"use client"

import * as React from "react"

import { RefreshIcon } from "@/components/icons"
import { Button } from "@/registry/base-nova/ui/button"
import { TextReveal } from "@/registry/base-nova/ui/text-reveal"

export default function TextRevealCustomTiming() {
  const [run, setRun] = React.useState(0)

  return (
    <div key={run} className="flex flex-col items-start gap-4">
      <TextReveal
        as="h3"
        text="Slow, soft and deep."
        stagger={0.18}
        blur={16}
        offset="100%"
        transition={{ stiffness: 90, damping: 20 }}
        className="text-2xl font-semibold tracking-tight"
      />
      <TextReveal
        as="p"
        text="Quick and crisp, with almost no blur."
        stagger={0.03}
        blur={2}
        offset="20%"
        delay={0.2}
        className="text-sm text-muted-foreground"
      />
      <Button variant="secondary" size="sm" onClick={() => setRun((r) => r + 1)}>
        <RefreshIcon data-icon="inline-start" />
        Replay
      </Button>
    </div>
  )
}
