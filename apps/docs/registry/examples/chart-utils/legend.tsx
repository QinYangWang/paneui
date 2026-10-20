"use client"

import * as React from "react"

import { ChartLegend, ChartLegendItem, chartColor, formatPercent } from "@paneui/ui/components/chart-utils"

const SPEND = [
  { name: "Rent", share: 0.42 },
  { name: "Groceries", share: 0.18 },
  { name: "Transport", share: 0.11 },
  { name: "Dining out", share: 0.09 },
  { name: "Subscriptions", share: 0.06 },
  { name: "Travel", share: 0.08 },
  { name: "Other", share: 0.06 },
]

export default function ChartUtilsLegend() {
  const [hidden, setHidden] = React.useState<string[]>(["Other"])
  const [hovered, setHovered] = React.useState<string | null>(null)
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <div className="flex h-3 overflow-hidden rounded-full bg-muted">
        {SPEND.map((s, i) =>
          hidden.includes(s.name) ? null : (
            <span
              key={s.name}
              style={{ "--share": `${s.share * 100}%`, "--color": chartColor(i) } as React.CSSProperties}
              className={hovered && hovered !== s.name ? "w-(--share) bg-(--color) opacity-40" : "w-(--share) bg-(--color)"}
            />
          )
        )}
      </div>
      <ChartLegend>
        {SPEND.map((s, i) => (
          <ChartLegendItem
            key={s.name}
            color={chartColor(i)}
            value={formatPercent(s.share, 0)}
            inactive={hidden.includes(s.name)}
            highlighted={hovered === s.name}
            aria-pressed={!hidden.includes(s.name)}
            onPointerEnter={() => setHovered(s.name)}
            onPointerLeave={() => setHovered(null)}
            onClick={() => setHidden((h) => (h.includes(s.name) ? h.filter((n) => n !== s.name) : [...h, s.name]))}
          >
            {s.name}
          </ChartLegendItem>
        ))}
      </ChartLegend>
    </div>
  )
}
