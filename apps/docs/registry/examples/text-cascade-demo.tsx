"use client"

import * as React from "react"

import { TextCascade } from "@paneui/ui/components/text-cascade"

const STEPS = ["Queued", "Building", "Running checks", "Deploying", "Live"]

export default function TextCascadeDemo() {
  const [i, setI] = React.useState(0)
  React.useEffect(() => {
    const id = window.setInterval(() => setI((n) => (n + 1) % STEPS.length), 1800)
    return () => window.clearInterval(id)
  }, [])
  return (
    <div className="rounded-2xl bg-card px-4 py-3 text-sm text-muted-foreground shadow-raised">
      {/* Inline + align-middle centres the dot on the text's x-height, not on the line box. */}
      <span aria-hidden className="mr-3 inline-block size-2 rounded-full bg-primary align-middle ring-3 ring-primary/20" />
      production · <TextCascade text={STEPS[i]} className="font-medium text-foreground" />
    </div>
  )
}
