"use client"

import { CompositionChart } from "@/registry/base-nova/ui/composition-chart"

const series = [
  { id: "compute", label: "Compute" },
  { id: "storage", label: "Storage" },
  { id: "network", label: "Network" },
  { id: "support", label: "Support" },
]

const data = [
  { label: "Q1", values: { compute: 18400, storage: 6200, network: 3100, support: 2400 } },
  { label: "Q2", values: { compute: 21900, storage: 6900, network: 3800, support: 2400 } },
  { label: "Q3", values: { compute: 24800, storage: 7600, network: 4400, support: 2600 } },
  { label: "Q4", values: { compute: 23100, storage: 8300, network: 4100, support: 2600 } },
]

const usd = (v: number) => v.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })

export default function CompositionChartDefaultHidden() {
  return (
    <div className="w-full max-w-2xl">
      <CompositionChart
        series={series}
        data={data}
        defaultHidden={["support"]}
        formatValue={usd}
        label="Cloud spend by category, 2026"
      />
    </div>
  )
}
