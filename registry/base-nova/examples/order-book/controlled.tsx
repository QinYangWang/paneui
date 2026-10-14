"use client"

import * as React from "react"

import { seededRandom } from "@/registry/base-nova/ui/chart-utils"
import { generateOrderBook, OrderBook, type OrderBookActiveLevel } from "@/registry/base-nova/ui/order-book"

const book = generateOrderBook(seededRandom(12), { mid: 3412.25, tick: 0.5, levels: 8, baseSize: 3 })

export default function OrderBookControlled() {
  const [level, setLevel] = React.useState<OrderBookActiveLevel>(null)
  const [ticket, setTicket] = React.useState<string | null>(null)
  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <OrderBook
        bids={book.bids}
        asks={book.asks}
        levels={6}
        baseSymbol="ETH"
        formatSize={(v) => v.toFixed(3)}
        activeLevel={level}
        onActiveLevelChange={setLevel}
        onLevelSelect={(l, side) => setTicket(`${side === "bid" ? "Sell" : "Buy"} ${l.total.toFixed(3)} ETH up to ${l.price.toFixed(2)}`)}
        label="ETH-USD order book"
      />
      <p className="text-center text-xs text-muted-foreground tabular-nums" aria-live="polite">
        {ticket ?? (level ? `Inspecting ${level.side} ${level.price.toFixed(2)}` : "Hover a level, click to fill the ticket")}
      </p>
    </div>
  )
}
