"use client"

import * as React from "react"

import { Button } from "@/registry/base-nova/ui/button"
import { AnimatedNumber } from "@/registry/base-nova/ui/animated-number"

const ITEMS = [
  { name: "Noise-cancelling headphones", price: 249 },
  { name: "Travel adapter", price: 29.5 },
  { name: "Carry-on suitcase", price: 189 },
]

export default function AnimatedNumberLive() {
  const [count, setCount] = React.useState(1)
  const total = ITEMS.slice(0, count).reduce((sum, item) => sum + item.price, 0)
  return (
    <div className="flex w-full max-w-xs flex-col gap-3 rounded-2xl bg-card p-4 shadow-raised">
      <ul className="flex flex-col gap-1 text-sm">
        {ITEMS.slice(0, count).map((item) => (
          <li key={item.name} className="flex justify-between gap-4">
            <span>{item.name}</span>
            <span className="text-muted-foreground tabular-nums">${item.price.toFixed(2)}</span>
          </li>
        ))}
      </ul>
      <div className="flex items-baseline justify-between border-t border-border pt-3">
        <span className="text-sm text-muted-foreground">Total</span>
        <AnimatedNumber
          value={total}
          locale="en-US"
          format={{ style: "currency", currency: "USD" }}
          startOnView={false}
          className="text-xl font-semibold tracking-tight"
        />
      </div>
      <Button
        size="sm"
        variant="secondary"
        onClick={() => setCount((c) => (c % ITEMS.length) + 1)}
      >
        {count < ITEMS.length ? "Add item" : "Reset cart"}
      </Button>
    </div>
  )
}
