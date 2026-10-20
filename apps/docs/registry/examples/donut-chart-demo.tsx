"use client"

import { DonutChart } from "@paneui/ui/components/donut-chart"

const usd = (v: number) =>
  v.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })

const segments = [
  { id: "subscriptions", label: "Subscriptions", value: 48200 },
  { id: "usage", label: "Usage", value: 26400 },
  { id: "services", label: "Services", value: 12900 },
  { id: "marketplace", label: "Marketplace", value: 7300 },
  { id: "other", label: "Other", value: 3100 },
]

export default function DonutChartDemo() {
  return (
    <div className="w-full max-w-xl">
      <DonutChart segments={segments} formatValue={usd} totalLabel="Revenue" label="Monthly revenue by source" />
    </div>
  )
}
