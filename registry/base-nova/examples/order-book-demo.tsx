"use client"

import * as React from "react"

import { Button } from "@/registry/base-nova/ui/button"
import { seededRandom } from "@/registry/base-nova/ui/chart-utils"
import { generateOrderBook, OrderBook } from "@/registry/base-nova/ui/order-book"

const TICK = 0.5
const initial = generateOrderBook(seededRandom(8), { mid: 3412.25, tick: TICK, levels: 12, baseSize: 3 })

export default function OrderBookDemo() {
  const [book, setBook] = React.useState(initial)
  const [last, setLast] = React.useState(3412.25)
  const [live, setLive] = React.useState(true)
  const [ticket, setTicket] = React.useState<string | null>(null)
  const rand = React.useRef(seededRandom(77))
  const mid = React.useRef(3412.25)

  React.useEffect(() => {
    if (!live) return
    const id = window.setInterval(() => {
      const r = rand.current
      mid.current = Math.round((mid.current + (r() - 0.5) * TICK * 2.2) / (TICK / 2)) * (TICK / 2)
      setLast(Number((mid.current + (r() - 0.5) * TICK).toFixed(2)))
      setBook(generateOrderBook(r, { mid: mid.current, tick: TICK, levels: 12, baseSize: 3 }))
    }, 1100)
    return () => window.clearInterval(id)
  }, [live])

  return (
    <div className="w-full max-w-sm space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-medium">
          ETH-USD
          {live && <span className="size-1.5 animate-pulse rounded-full bg-success" aria-hidden />}
        </div>
        <Button size="xs" variant="secondary" onClick={() => setLive((l) => !l)}>
          {live ? "Pause" : "Resume"}
        </Button>
      </div>
      <OrderBook
        bids={book.bids}
        asks={book.asks}
        levels={8}
        lastPrice={last}
        baseSymbol="ETH"
        quoteSymbol="USD"
        formatSize={(v) => v.toFixed(3)}
        onLevelSelect={(level, side) =>
          setTicket(`${side === "bid" ? "Sell" : "Buy"} limit @ ${level.price.toFixed(2)} · ${level.size.toFixed(3)} ETH`)
        }
      />
      <p className="h-4 text-center text-xs text-muted-foreground" aria-live="polite">
        {ticket ?? "Click a level to prefill an order"}
      </p>
    </div>
  )
}
