"use client"

import * as React from "react"

import { RefreshIcon } from "@paneui/ui/icons"
import { Button } from "@paneui/ui/components/button"
import { DigitSwap } from "@paneui/ui/components/digit-swap"

export default function DigitSwapReplay() {
  const [key, setKey] = React.useState(0)

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-col items-center gap-1">
        <DigitSwap
          value="$48,210"
          animationKey={key}
          duration={0.5}
          stagger={0.05}
          className="text-3xl font-semibold tracking-tight"
        />
        <span className="text-xs text-muted-foreground">revenue this month</span>
      </div>
      <Button variant="ghost" size="sm" onClick={() => setKey((k) => k + 1)}>
        <RefreshIcon data-icon="inline-start" />
        Replay
      </Button>
    </div>
  )
}
