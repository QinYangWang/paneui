"use client"

import * as React from "react"

import { StatefulButton, type ButtonState } from "@paneui/ui/components/button-stateful"

const VARIANTS = ["default", "secondary", "outline", "ghost"] as const

export default function ButtonStatefulVariants() {
  const [state, setState] = React.useState<ButtonState>("idle")
  const timers = React.useRef<number[]>([])
  React.useEffect(() => () => timers.current.forEach(clearTimeout), [])
  const run = () => {
    if (state !== "idle") return
    setState("loading")
    timers.current.push(
      window.setTimeout(() => setState("success"), 1200),
      window.setTimeout(() => setState("idle"), 2800)
    )
  }
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {VARIANTS.map((variant) => (
        <StatefulButton key={variant} variant={variant} state={state} onClick={run} successText="Saved">
          Save draft
        </StatefulButton>
      ))}
    </div>
  )
}
