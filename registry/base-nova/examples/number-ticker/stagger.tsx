"use client"

import * as React from "react"

import { Button } from "@/registry/base-nova/ui/button"
import { NumberTicker } from "@/registry/base-nova/ui/number-ticker"

export default function NumberTickerStagger() {
  const [value, setValue] = React.useState(48213)
  return (
    <div className="flex flex-col items-start gap-4">
      <div className="flex flex-col gap-2">
        <div className="flex items-baseline gap-3">
          <span className="w-24 text-xs text-muted-foreground">stagger 0</span>
          <NumberTicker value={value} locale="en-US" stagger={0} className="text-2xl font-semibold" />
        </div>
        <div className="flex items-baseline gap-3">
          <span className="w-24 text-xs text-muted-foreground">stagger 0.12</span>
          <NumberTicker
            value={value}
            locale="en-US"
            stagger={0.12}
            transition={{ type: "spring", stiffness: 420, damping: 38, mass: 0.6 }}
            className="text-2xl font-semibold"
          />
        </div>
      </div>
      <Button size="sm" variant="secondary" onClick={() => setValue((v) => (v * 7 + 1931) % 99999)}>
        Shuffle
      </Button>
    </div>
  )
}
