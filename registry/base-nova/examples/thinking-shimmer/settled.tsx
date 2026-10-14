"use client"

import * as React from "react"

import { Button } from "@/registry/base-nova/ui/button"
import { ThinkingShimmer } from "@/registry/base-nova/ui/thinking-shimmer"

export default function ThinkingShimmerSettled() {
  const [active, setActive] = React.useState(true)
  return (
    <div className="flex flex-col items-start gap-4">
      <ThinkingShimmer active={active}>{active ? "Reading your inbox…" : "Read 42 messages"}</ThinkingShimmer>
      <Button variant="secondary" size="sm" onClick={() => setActive((a) => !a)}>
        {active ? "Finish step" : "Restart"}
      </Button>
    </div>
  )
}
