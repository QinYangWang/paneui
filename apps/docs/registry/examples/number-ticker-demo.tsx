"use client"

import * as React from "react"

import { MinusIcon, PlusIcon } from "@paneui/ui/icons"
import { Button } from "@paneui/ui/components/button"
import { NumberTicker } from "@paneui/ui/components/number-ticker"

export default function NumberTickerDemo() {
  const [total, setTotal] = React.useState(1284.5)
  return (
    <div className="flex flex-col items-start gap-4">
      <div className="flex flex-col gap-1">
        <span className="text-sm text-muted-foreground">Saved this year</span>
        <NumberTicker
          value={total}
          locale="en-US"
          format={{ style: "currency", currency: "USD" }}
          className="text-4xl font-semibold tracking-tight"
        />
      </div>
      <div className="flex gap-2">
        <Button variant="secondary" size="icon-sm" aria-label="Subtract 87.25" onClick={() => setTotal((t) => Math.max(0, t - 87.25))}>
          <MinusIcon />
        </Button>
        <Button variant="secondary" size="icon-sm" aria-label="Add 312.75" onClick={() => setTotal((t) => t + 312.75)}>
          <PlusIcon />
        </Button>
      </div>
    </div>
  )
}
