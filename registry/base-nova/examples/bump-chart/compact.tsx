"use client"

import { BumpChart, type BumpSeries } from "@/registry/base-nova/ui/bump-chart"

const periods = ["2021", "2022", "2023", "2024", "2025", "2026"]

const series: BumpSeries[] = [
  { id: "py", name: "Python", ranks: [2, 1, 1, 1, 1, 1] },
  { id: "js", name: "JavaScript", ranks: [1, 2, 2, 2, 3, 3] },
  { id: "ts", name: "TypeScript", ranks: [5, 4, 3, 3, 2, 2] },
  { id: "java", name: "Java", ranks: [3, 3, 4, 4, 4, 5] },
  { id: "go", name: "Go", ranks: [6, 6, 6, 5, 5, 4] },
  { id: "rust", name: "Rust", ranks: [8, 8, 7, 7, 6, 6] },
  { id: "c", name: "C#", ranks: [4, 5, 5, 6, 7, 7] },
  { id: "kt", name: "Kotlin", ranks: [7, 7, 8, 8, 8, 8] },
]

export default function BumpChartCompact() {
  return (
    <div className="w-full max-w-2xl">
      <BumpChart
        series={series}
        periods={periods}
        rowHeight={26}
        showRankLabels={false}
        showLegend={false}
        label="Language popularity rank by year"
      />
    </div>
  )
}
