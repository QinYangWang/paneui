"use client"

import * as React from "react"

import { Label } from "@/registry/base-nova/ui/label"
import { Radio, RadioGroup } from "@/registry/base-nova/ui/radio"

const speeds = [
  { value: "standard", label: "Standard", eta: "Arrives Thursday" },
  { value: "express", label: "Express", eta: "Arrives tomorrow" },
  { value: "pickup", label: "Store pickup", eta: "Ready in 2 hours" },
]

export default function RadioControlled() {
  const [speed, setSpeed] = React.useState("standard")
  const chosen = speeds.find((s) => s.value === speed)

  return (
    <div className="flex flex-col gap-4">
      <RadioGroup value={speed} onValueChange={(value) => setSpeed(value as string)} aria-label="Delivery speed">
        {speeds.map((s) => (
          <Label key={s.value} className="gap-3 font-normal">
            <Radio value={s.value} />
            {s.label}
          </Label>
        ))}
      </RadioGroup>
      <p className="text-xs text-muted-foreground">{chosen?.eta}</p>
    </div>
  )
}
