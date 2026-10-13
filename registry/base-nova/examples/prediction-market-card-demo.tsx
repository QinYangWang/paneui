"use client"

import * as React from "react"

import { PredictionMarketCard } from "@/registry/base-nova/blocks/prediction-market-card/prediction-market-card"

export default function PredictionMarketCardDemo() {
  // Nudge the live match's odds every few seconds so the CTAs roll.
  const [lakers, setLakers] = React.useState(0.58)
  React.useEffect(() => {
    const t = window.setInterval(() => {
      setLakers((p) => Math.min(0.9, Math.max(0.1, p + (Math.random() - 0.5) * 0.06)))
    }, 2800)
    return () => window.clearInterval(t)
  }, [])

  return (
    <div className="grid w-full max-w-3xl gap-4 sm:grid-cols-2">
      <PredictionMarketCard
        title="Lakers vs Celtics"
        icon="NBA"
        iconColor="#552583"
        status="Q3 · 4:12"
        live
        category="Basketball"
        volume="$1.8M"
        volumeHistory={[12, 18, 16, 24, 30, 28, 41, 46]}
        outcomes={[
          { id: "lal", label: "Lakers", glyph: "LAL", color: "#552583", probability: lakers, change: 0.06 },
          { id: "bos", label: "Celtics", glyph: "BOS", color: "#007a33", probability: 1 - lakers, change: -0.06 },
        ]}
      />
      <PredictionMarketCard
        title="Will the Fed cut rates in December?"
        icon="Fed"
        iconColor="#2f6f4f"
        status="Resolves Dec 17"
        category="Economy"
        volume="$4.2M"
        volumeHistory={[30, 34, 31, 29, 35, 38, 36, 42]}
        defaultBookmarked
        outcomes={[{ id: "cut", label: "Rate cut", probability: 0.72, change: 0.03 }]}
      />
    </div>
  )
}
