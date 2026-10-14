"use client"

import { generateLiquiditySnapshots, LiquidityHeatmap } from "@/registry/base-nova/ui/liquidity-heatmap"

const snapshots = generateLiquiditySnapshots(36, { seed: 14, start: 512, step: 0.25, bands: 18 })

export default function LiquidityHeatmapGamma() {
  return (
    <div className="grid w-full max-w-3xl gap-6 sm:grid-cols-2">
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium">gamma 1 · linear</span>
        <LiquidityHeatmap snapshots={snapshots} gamma={1} height={220} showLegend={false} label="Linear intensity" />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium">gamma 0.35 · thin levels lifted</span>
        <LiquidityHeatmap snapshots={snapshots} gamma={0.35} height={220} showLegend={false} label="Lifted intensity" />
      </div>
    </div>
  )
}
