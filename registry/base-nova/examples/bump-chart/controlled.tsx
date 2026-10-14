"use client"

import * as React from "react"

import { BumpChart, type BumpSeries } from "@/registry/base-nova/ui/bump-chart"
import { Button } from "@/registry/base-nova/ui/button"

const periods = ["Mon", "Tue", "Wed", "Thu", "Fri"]

const series: BumpSeries[] = [
  { id: "maya", name: "Maya", ranks: [2, 1, 1, 1, 2], color: "var(--primary)" },
  { id: "leo", name: "Leo", ranks: [1, 2, 3, 2, 1], color: "var(--success)" },
  { id: "ines", name: "Inès", ranks: [3, 3, 2, 3, 3], color: "var(--warning)" },
  { id: "kai", name: "Kai", ranks: [4, 4, 4, 4, 4], color: "var(--destructive)" },
]

export default function BumpChartControlled() {
  const [pinned, setPinned] = React.useState<string | null>("maya")
  return (
    <div className="flex w-full max-w-2xl flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        {series.map((s) => (
          <Button
            key={s.id}
            size="sm"
            variant={pinned === s.id ? "default" : "secondary"}
            onClick={() => setPinned(pinned === s.id ? null : s.id)}
          >
            {s.name}
          </Button>
        ))}
      </div>
      <BumpChart
        series={series}
        periods={periods}
        active={pinned}
        onActiveChange={setPinned}
        label="Sales leaderboard this week"
      />
    </div>
  )
}
