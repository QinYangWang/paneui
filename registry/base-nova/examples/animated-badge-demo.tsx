"use client"

import * as React from "react"

import { AnimatedBadge, type AnimatedBadgeStatus } from "@/registry/base-nova/ui/animated-badge"
import { Button } from "@/registry/base-nova/ui/button"

const FLOW: { status: AnimatedBadgeStatus; label: string }[] = [
  { status: "idle", label: "Ready" },
  { status: "loading", label: "Syncing" },
  { status: "success", label: "Synced" },
  { status: "warning", label: "2 conflicts" },
  { status: "error", label: "Sync failed" },
]

export default function AnimatedBadgeDemo() {
  const [i, setI] = React.useState(0)
  const step = FLOW[i]
  return (
    <div className="flex flex-col items-start gap-4">
      <div className="flex items-center gap-3">
        <AnimatedBadge status={step.status} pulse={step.status === "loading"}>
          {step.label}
        </AnimatedBadge>
        <Button size="sm" variant="secondary" onClick={() => setI((n) => (n + 1) % FLOW.length)}>
          Next state
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <AnimatedBadge size="sm" status="idle" pulse className="text-success">
          Live
        </AnimatedBadge>
        <AnimatedBadge status="info">Beta</AnimatedBadge>
        <AnimatedBadge size="lg" status="success">
          Payment received
        </AnimatedBadge>
      </div>
    </div>
  )
}
