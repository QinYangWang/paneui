"use client"

import { CandlestickChart, generateCandles } from "@paneui/ui/components/candlestick-chart"

const CANDLES = generateCandles(24, { seed: 9, start: 61250, volatility: 0.004, interval: 300_000 })

export default function CandlestickChartCompact() {
  const last = CANDLES[CANDLES.length - 1]
  return (
    <div className="flex w-full max-w-sm flex-col gap-2 rounded-2xl bg-card p-4 shadow-raised">
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-sm font-medium">BTC · 5m</span>
        <span className="text-sm font-semibold tabular-nums">${Math.round(last.close).toLocaleString("en-US")}</span>
      </div>
      <CandlestickChart
        candles={CANDLES}
        label="Bitcoin five-minute candles"
        formatPrice={(p) => `${Math.round(p / 1000)}k`}
        showReadout={false}
        showVolume={false}
        height={140}
      />
    </div>
  )
}
