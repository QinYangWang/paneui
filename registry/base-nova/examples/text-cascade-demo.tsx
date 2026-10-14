"use client"

import * as React from "react"

import { TextCascade } from "@/registry/base-nova/ui/text-cascade"

const STEPS = ["Queued", "Building", "Running checks", "Deploying", "Live"]

export default function TextCascadeDemo() {
  const [i, setI] = React.useState(0)
  React.useEffect(() => {
    const id = window.setInterval(() => setI((n) => (n + 1) % STEPS.length), 1800)
    return () => window.clearInterval(id)
  }, [])
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-card px-4 py-3 shadow-raised">
      <span className="size-2 rounded-full bg-primary ring-3 ring-primary/20" />
      <span className="text-sm text-muted-foreground">
        production · <TextCascade text={STEPS[i]} className="font-medium text-foreground" />
      </span>
    </div>
  )
}
