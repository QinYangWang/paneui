"use client"

import * as React from "react"

import { Button } from "@/registry/base-nova/ui/button"
import { NumberTicker } from "@/registry/base-nova/ui/number-ticker"
import { StatCard, StatCardDelta, StatCardHeader, StatCardHint, StatCardLabel, StatCardValue } from "@/registry/base-nova/ui/stat-card"

export default function StatCardWithTicker() {
  const [runs, setRuns] = React.useState(92318)
  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      <StatCard>
        <StatCardHeader>
          <StatCardLabel>Agent runs</StatCardLabel>
          <StatCardDelta value={18.9} />
        </StatCardHeader>
        <StatCardValue>
          <NumberTicker value={runs} locale="en-US" />
        </StatCardValue>
        <StatCardHint>This month</StatCardHint>
      </StatCard>
      <Button variant="secondary" size="sm" onClick={() => setRuns((r) => r + 1280)}>
        Add a batch
      </Button>
    </div>
  )
}
