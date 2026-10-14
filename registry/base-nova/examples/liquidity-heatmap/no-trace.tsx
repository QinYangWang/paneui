"use client"

import { generateLiquiditySnapshots, LiquidityHeatmap } from "@/registry/base-nova/ui/liquidity-heatmap"

const snapshots = generateLiquiditySnapshots(60, { seed: 31, start: 78.4, step: 0.05, bands: 24 })

export default function LiquidityHeatmapNoTrace() {
  return (
    <div className="w-full max-w-2xl">
      <LiquidityHeatmap
        snapshots={snapshots}
        showTrace={false}
        unit="contracts"
        height={260}
        label="Crude oil resting liquidity without the price line"
      />
    </div>
  )
}
