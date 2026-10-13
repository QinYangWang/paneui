"use client"

import * as React from "react"

import { Button } from "@/registry/base-nova/ui/button"
import { generateLiquiditySnapshots, LiquidityHeatmap } from "@/registry/base-nova/ui/liquidity-heatmap"

const ALL = generateLiquiditySnapshots(220, { seed: 19, start: 64210, step: 5, bands: 22 })
const WINDOW = 40
const fmt = (p: number) => p.toLocaleString("en-US", { maximumFractionDigits: 0 })

export default function LiquidityHeatmapDemo() {
  const [offset, setOffset] = React.useState(0)
  const [live, setLive] = React.useState(true)

  React.useEffect(() => {
    if (!live) return
    const id = window.setInterval(() => setOffset((o) => (o + 1) % (ALL.length - WINDOW)), 1400)
    return () => window.clearInterval(id)
  }, [live])

  const snapshots = React.useMemo(() => ALL.slice(offset, offset + WINDOW), [offset])
  const last = snapshots[snapshots.length - 1]

  return (
    <div className="w-full max-w-2xl space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-medium">
          BTC-USD resting liquidity
          {live && <span className="size-1.5 animate-pulse rounded-full bg-success" aria-hidden />}
          <span className="text-xs font-normal text-muted-foreground tabular-nums">
            {last?.price !== undefined && fmt(last.price)}
          </span>
        </div>
        <Button size="xs" variant="secondary" onClick={() => setLive((l) => !l)}>
          {live ? "Pause" : "Resume"}
        </Button>
      </div>
      <LiquidityHeatmap snapshots={snapshots} formatPrice={fmt} unit="BTC" height={300} label="BTC-USD liquidity by price and time" />
    </div>
  )
}
