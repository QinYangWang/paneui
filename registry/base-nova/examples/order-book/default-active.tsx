"use client"

import { OrderBook } from "@/registry/base-nova/ui/order-book"

const bids = [
  { price: 189.42, size: 1200 },
  { price: 189.41, size: 800 },
  { price: 189.4, size: 4500 },
  { price: 189.39, size: 650 },
  { price: 189.38, size: 2100 },
  { price: 189.37, size: 900 },
]

const asks = [
  { price: 189.44, size: 300 },
  { price: 189.45, size: 1500 },
  { price: 189.46, size: 700 },
  { price: 189.47, size: 5200 },
  { price: 189.48, size: 400 },
  { price: 189.49, size: 1100 },
]

export default function OrderBookDefaultActive() {
  return (
    <div className="w-full max-w-sm">
      <OrderBook
        bids={bids}
        asks={asks}
        levels={6}
        lastPrice={189.43}
        baseSymbol="shares"
        formatSize={(v) => v.toLocaleString("en-US")}
        defaultActiveLevel={{ side: "ask", price: 189.47 }}
        label="AAPL level 2 quotes"
      />
    </div>
  )
}
