"use client"

import * as React from "react"

import { SegmentedControl, SegmentedControlItem } from "@paneui/ui/components/segmented-control"
import { TrendChart } from "@paneui/ui/components/trend-chart"

const months = ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"]
const data = months.map((label, i) => ({
  label,
  values: { team: 14000 + i * 1450 + ((i * 7) % 5) * 300, enterprise: 9000 + i * 1100 + ((i * 3) % 4) * 500, solo: 1800 + i * 120 },
}))
const series = [
  { id: "solo", label: "Solo" },
  { id: "team", label: "Team" },
  { id: "enterprise", label: "Enterprise" },
]
const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })

export default function TrendChartDemo() {
  const [variant, setVariant] = React.useState<"area" | "line" | "bar">("area")
  return (
    <div className="flex w-full max-w-2xl flex-col gap-4">
      <SegmentedControl size="sm" value={variant} onValueChange={(v) => setVariant(v as typeof variant)} aria-label="Chart type" className="self-end">
        <SegmentedControlItem value="area">Area</SegmentedControlItem>
        <SegmentedControlItem value="line">Line</SegmentedControlItem>
        <SegmentedControlItem value="bar">Bars</SegmentedControlItem>
      </SegmentedControl>
      <TrendChart series={series} data={data} variant={variant} stacked={variant !== "line"} formatValue={(v) => usd.format(v)} label="Revenue by plan" />
    </div>
  )
}
