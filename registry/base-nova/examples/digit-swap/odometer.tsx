"use client"

import * as React from "react"

import { Button } from "@/registry/base-nova/ui/button"
import { DigitSwap } from "@/registry/base-nova/ui/digit-swap"

export default function DigitSwapOdometer() {
  const [views, setViews] = React.useState(9_996)

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-col items-center gap-1">
        <DigitSwap value={views.toLocaleString("en-US")} staggerFrom="end" stagger={0.04} className="font-mono text-3xl font-semibold" />
        <span className="text-xs text-muted-foreground">page views</span>
      </div>
      <Button variant="secondary" size="sm" onClick={() => setViews((v) => v + 1)}>
        Add a view
      </Button>
    </div>
  )
}
