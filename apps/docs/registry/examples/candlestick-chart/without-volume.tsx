"use client"

import { CandlestickChart, generateCandles } from "@paneui/ui/components/candlestick-chart"

const CANDLES = generateCandles(36, { seed: 21, start: 1.0842, volatility: 0.0012 })

export default function CandlestickChartWithoutVolume() {
  return (
    <CandlestickChart
      candles={CANDLES}
      label="EUR/USD one-minute candles"
      formatPrice={(p) => p.toFixed(4)}
      showVolume={false}
      height={260}
      className="max-w-2xl"
    />
  )
}
