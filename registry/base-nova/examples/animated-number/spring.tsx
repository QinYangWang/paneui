"use client"

import * as React from "react"

import { Button } from "@/registry/base-nova/ui/button"
import { AnimatedNumber } from "@/registry/base-nova/ui/animated-number"

const SPRINGS = [
  { label: "Default (380 / 42 / 0.7)", stiffness: 380, damping: 42, mass: 0.7 },
  { label: "Snappy (500 / 30 / 0.5)", stiffness: 500, damping: 30, mass: 0.5 },
  { label: "Lazy (60 / 20 / 1)", stiffness: 60, damping: 20, mass: 1 },
]

export default function AnimatedNumberSpring() {
  const [value, setValue] = React.useState(320)
  return (
    <div className="flex flex-col items-start gap-4">
      <div className="flex flex-col gap-2">
        {SPRINGS.map((s) => (
          <div key={s.label} className="flex items-baseline gap-3">
            <span className="w-44 text-xs text-muted-foreground">{s.label}</span>
            <AnimatedNumber
              value={value}
              stiffness={s.stiffness}
              damping={s.damping}
              mass={s.mass}
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
