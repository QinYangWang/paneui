"use client"

import { CandlestickChart, generateCandles } from "@/registry/base-nova/ui/candlestick-chart"

const CANDLES = generateCandles(32, { seed: 15, start: 228.4 })
const AFTER_HOURS = CANDLES[CANDLES.length - 1].close * 0.988

export default function CandlestickChartLastPrice() {
  return (
    <div className="flex w-full max-w-2xl flex-col gap-2">
      <CandlestickChart candles={CANDLES} label="AAPL with after-hours quote" lastPrice={AFTER_HOURS} height={280} />
      <p className="text-xs text-muted-foreground tabular-nums">After hours: {AFTER_HOURS.toFixed(2)}</p>
    </div>
  )
}
