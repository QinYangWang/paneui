"use client"

import { BumpChart, type BumpSeries } from "@/registry/base-nova/ui/bump-chart"

const periods = ["Wk 1", "Wk 2", "Wk 3", "Wk 4", "Wk 5", "Wk 6"]

const series: BumpSeries[] = [
  { id: "lakers", name: "Lakers", ranks: [3, 2, 2, 1, 1, 2] },
  { id: "celtics", name: "Celtics", ranks: [1, 1, 1, 2, 3, 1] },
  { id: "nuggets", name: "Nuggets", ranks: [2, 3, 4, 4, 2, 3] },
  { id: "knicks", name: "Knicks", ranks: [5, 4, 3, 3, 4, 4] },
  { id: "thunder", name: "Thunder", ranks: [4, 5, 5, 5, 5, 5] },
]

export default function BumpChartPinned() {
  return (
    <div className="w-full max-w-2xl">
      <BumpChart series={series} periods={periods} defaultActiveId="knicks" label="Power rankings by week" />
    </div>
  )
}
