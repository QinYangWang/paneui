"use client"

import * as React from "react"

import { Button } from "@paneui/ui/components/button"
import { CandlestickChart, generateCandles, type Candle } from "@paneui/ui/components/candlestick-chart"
import { seededRandom } from "@paneui/ui/components/chart-utils"

const INITIAL = generateCandles(48, { seed: 11, start: 184.2 })
const TICKS_PER_CANDLE = 6

export default function CandlestickChartDemo() {
  const [candles, setCandles] = React.useState<Candle[]>(INITIAL)
  const [live, setLive] = React.useState(true)
  const rand = React.useRef(seededRandom(42))
  const tick = React.useRef(0)

  React.useEffect(() => {
    if (!live) return
    const id = window.setInterval(() => {
      const r = rand.current
      tick.current += 1
      setCandles((prev) => {
        const last = prev[prev.length - 1]
        const price = Math.max(0.01, last.close * (1 + (r() - 0.49) * 0.004))
        const volume = Math.round(60 + r() * 380)
        if (tick.current % TICKS_PER_CANDLE === 0) {
          // roll over: open a fresh candle and drop the oldest
          const next: Candle = {
            time: last.time + 60_000,
            open: last.close,
            high: Math.max(last.close, price),
            low: Math.min(last.close, price),
            close: price,
            volume,
          }
          return [...prev.slice(1), next]
        }
        const updated: Candle = {
          ...last,
          close: price,
          high: Math.max(last.high, price),
          low: Math.min(last.low, price),
          volume: (last.volume ?? 0) + volume,
        }
        return [...prev.slice(0, -1), updated]
      })
    }, 900)
    return () => window.clearInterval(id)
  }, [live])

  return (
    <div className="w-full max-w-2xl space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-medium">
          ACME · 1m
          {live && <span className="size-1.5 animate-pulse rounded-full bg-success" aria-hidden />}
        </div>
        <Button size="xs" variant="secondary" onClick={() => setLive((l) => !l)}>
          {live ? "Pause" : "Resume"}
        </Button>
      </div>
      <CandlestickChart candles={candles} label="ACME one-minute candles" height={300} />
    </div>
  )
}
