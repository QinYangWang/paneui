"use client"

import { seededRandom } from "@/registry/base-nova/ui/chart-utils"
import { generateOrderBook, OrderBook, OrderBookSide, OrderBookSpread } from "@/registry/base-nova/ui/order-book"

const book = generateOrderBook(seededRandom(4), { mid: 64215, tick: 5, levels: 6, baseSize: 0.8 })

export default function OrderBookCustomComposition() {
  return (
    <div className="w-full max-w-xs">
      <OrderBook
        bids={book.bids}
        asks={book.asks}
        levels={5}
        baseSymbol="BTC"
        formatPrice={(v) => v.toLocaleString("en-US", { maximumFractionDigits: 0 })}
        formatSize={(v) => v.toFixed(3)}
        label="BTC-USD order book"
      >
        <OrderBookSide side="ask" />
        <OrderBookSpread />
        <OrderBookSide side="bid" />
      </OrderBook>
    </div>
  )
}
