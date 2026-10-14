"use client"

import { LiquidityHeatmap, type LiquiditySnapshot } from "@/registry/base-nova/ui/liquidity-heatmap"

const prices = [101, 100.5, 100, 99.5, 99, 98.5, 98]
const times = ["09:30", "09:31", "09:32", "09:33", "09:34", "09:35", "09:36", "09:37"]
const trace = [99.6, 99.7, 99.9, 100.1, 99.8, 99.4, 99.3, 99.5]

// A 1,200-lot wall at 100.50 that gets pulled at 09:35, and steady bids at 98.50.
const snapshots: LiquiditySnapshot[] = times.map((label, t) => ({
  id: label,
  label,
  price: trace[t],
  levels: prices.map((price) => {
    const wall = price === 100.5 && t < 5 ? 1200 : 0
    const bids = price === 98.5 ? 640 : 0
    const base = Math.round(140 - Math.abs(price - trace[t]) * 60)
    return { price, size: Math.max(20, base) + wall + bids }
  }),
}))

export default function LiquidityHeatmapCustomData() {
  return (
    <div className="w-full max-w-2xl">
      <LiquidityHeatmap
        snapshots={snapshots}
        unit="lots"
        height={260}
        formatSize={(s) => s.toLocaleString("en-US")}
        label="Order book depth at the open"
      />
    </div>
  )
}
