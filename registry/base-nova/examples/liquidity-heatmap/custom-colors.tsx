"use client"

import { generateLiquiditySnapshots, LiquidityHeatmap } from "@/registry/base-nova/ui/liquidity-heatmap"

const snapshots = generateLiquiditySnapshots(48, { seed: 8, start: 3420, step: 1, bands: 20 })
const fmt = (p: number) => p.toLocaleString("en-US", { maximumFractionDigits: 0 })

export default function LiquidityHeatmapCustomColors() {
  return (
    <div className="w-full max-w-2xl">
      <LiquidityHeatmap
        snapshots={snapshots}
        lowColor="var(--primary)"
        highColor="var(--destructive)"
        formatPrice={fmt}
        unit="ETH"
        height={280}
        label="ETH-USD liquidity, red walls"
      />
    </div>
  )
}
