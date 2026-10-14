"use client"

import { CandlestickChart, generateCandles } from "@/registry/base-nova/ui/candlestick-chart"

const CANDLES = generateCandles(90, { seed: 33, start: 54.1, volatility: 0.009 })

export default function CandlestickChartVolumeRatio() {
  return <CandlestickChart candles={CANDLES} label="Ninety one-minute candles" volumeRatio={0.35} height={320} className="max-w-2xl" />
}
