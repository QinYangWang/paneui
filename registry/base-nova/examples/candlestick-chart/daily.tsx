"use client"

import { CandlestickChart, generateCandles } from "@/registry/base-nova/ui/candlestick-chart"

const DAY = 86_400_000
const CANDLES = generateCandles(30, { seed: 4, start: 412.5, startTime: Date.UTC(2026, 8, 1), interval: DAY, volatility: 0.018 })

const hkd = (p: number) => `HK$${p.toFixed(2)}`
const date = (t: number) => new Date(t).toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: "UTC" })

export default function CandlestickChartDaily() {
  return <CandlestickChart candles={CANDLES} label="Tencent daily candles, September" formatPrice={hkd} formatTime={date} height={280} className="max-w-2xl" />
}
