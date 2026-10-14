"use client"

import * as React from "react"

import { DigitSwap } from "@/registry/base-nova/ui/digit-swap"

function format(seconds: number) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
}

export default function DigitSwapFixedDirection() {
  const [left, setLeft] = React.useState(5 * 60)

  React.useEffect(() => {
    const id = window.setInterval(() => setLeft((s) => (s <= 0 ? 5 * 60 : s - 1)), 1000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div className="flex flex-col items-center gap-1">
      <DigitSwap value={format(left)} direction="down" className="font-mono text-3xl font-semibold" />
      <span className="text-xs text-muted-foreground">until your code expires</span>
    </div>
  )
}
