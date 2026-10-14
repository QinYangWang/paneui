"use client"

import { CompositionChart } from "@/registry/base-nova/ui/composition-chart"

const series = [
  { id: "mobile", label: "Mobile" },
  { id: "desktop", label: "Desktop" },
  { id: "tablet", label: "Tablet" },
]

const weeks = ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8"]
const mobile = [52, 54, 55, 58, 57, 60, 62, 63]
const tablet = [9, 9, 8, 8, 7, 7, 7, 6]

const data = weeks.map((label, i) => ({
  label,
  values: { mobile: mobile[i] * 120, desktop: (100 - mobile[i] - tablet[i]) * 120, tablet: tablet[i] * 120 },
}))

export default function CompositionChartArea() {
  return (
    <div className="w-full max-w-2xl">
      <CompositionChart series={series} data={data} mode="area" height={220} label="Orders by device, last 8 weeks" />
    </div>
  )
}
