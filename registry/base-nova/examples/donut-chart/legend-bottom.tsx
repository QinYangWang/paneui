"use client"

import { DonutChart } from "@/registry/base-nova/ui/donut-chart"

const segments = [
  { id: "ios", label: "iOS", value: 5820 },
  { id: "android", label: "Android", value: 4310 },
  { id: "web", label: "Web", value: 2140 },
]

export default function DonutChartLegendBottom() {
  return (
    <div className="w-full max-w-xs">
      <DonutChart
        segments={segments}
        legendPosition="bottom"
        totalLabel="Sessions"
        label="Sessions by platform"
        maxSize={200}
      />
    </div>
  )
}
