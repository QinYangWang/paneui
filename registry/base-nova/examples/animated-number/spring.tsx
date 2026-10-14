"use client"

import * as React from "react"

import { Button } from "@/registry/base-nova/ui/button"
import { AnimatedNumber } from "@/registry/base-nova/ui/animated-number"

const SPRINGS = [
  { label: "Default (70 / 20)", stiffness: 70, damping: 20 },
  { label: "Snappy (420 / 38)", stiffness: 420, damping: 38 },
  { label: "Lazy (30 / 18)", stiffness: 30, damping: 18 },
]

export default function AnimatedNumberSpring() {
  const [value, setValue] = React.useState(320)
  return (
    <div className="flex flex-col items-start gap-4">
      <div className="flex flex-col gap-2">
        {SPRINGS.map((s) => (
          <div key={s.label} className="flex items-baseline gap-3">
            <span className="w-36 text-xs text-muted-foreground">{s.label}</span>
            <AnimatedNumber
              value={value}
              stiffness={s.stiffness}
              damping={s.damping}
              startOnView={false}
              locale="en-US"
              className="text-xl font-semibold"
            />
          </div>
        ))}
      </div>
      <Button size="sm" variant="secondary" onClick={() => setValue((v) => (v === 320 ? 9480 : 320))}>
        Toggle value
      </Button>
    </div>
  )
}
