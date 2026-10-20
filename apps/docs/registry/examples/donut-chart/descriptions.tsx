"use client"

import { DonutChart } from "@paneui/ui/components/donut-chart"

const usd = (v: number) => v.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })

const segments = [
  { id: "housing", label: "Housing", value: 1850, description: "Rent and renters insurance" },
  { id: "food", label: "Food", value: 640, description: "Groceries and eating out" },
  { id: "transport", label: "Transport", value: 210, description: "Transit pass and rideshare" },
  { id: "savings", label: "Savings", value: 900, description: "Auto-transfer on the 1st" },
]

export default function DonutChartDescriptions() {
  return (
    <div className="w-full max-w-xl">
      <DonutChart segments={segments} formatValue={usd} totalLabel="Spent" label="Monthly budget, October" />
    </div>
  )
}
