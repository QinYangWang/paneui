"use client"

import { DonutChart } from "@/registry/base-nova/ui/donut-chart"

const segments = [
  { id: "used", label: "Used", value: 68, color: "var(--chart-1)" },
  { id: "free", label: "Free", value: 32, color: "var(--muted-foreground)" },
]

export default function DonutChartThinRing() {
  return (
    <div className="w-full max-w-48">
      <DonutChart
        segments={segments}
        thickness={10}
        gap={8}
        maxSize={180}
        showLegend={false}
        formatValue={(v) => `${v} GB`}
        totalLabel="Storage"
        label="Storage used"
      />
    </div>
  )
}
