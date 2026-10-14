"use client"

import { BumpChart, type BumpSeries } from "@/registry/base-nova/ui/bump-chart"

const periods = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]

// `null` means the song was off the chart that month.
const series: BumpSeries[] = [
  { id: "a", name: "Golden Hour", ranks: [1, 1, 2, 3, null, null] },
  { id: "b", name: "Night Drive", ranks: [2, 3, 1, 1, 1, 2] },
  { id: "c", name: "Paper Planes", ranks: [3, 2, 3, null, 3, 3] },
  { id: "d", name: "Low Tide", ranks: [null, 4, 4, 2, 2, 1] },
  { id: "e", name: "Satellite", ranks: [4, null, null, 4, 4, 4] },
]

export default function BumpChartGaps() {
  return (
    <div className="w-full max-w-2xl">
      <BumpChart series={series} periods={periods} label="Top 4 songs by month" />
    </div>
  )
}
