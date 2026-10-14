"use client"

import * as React from "react"

import { DonutChart } from "@/registry/base-nova/ui/donut-chart"

const usd = (v: number) => v.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })

const segments = [
  { id: "rent", label: "Rent", value: 1850 },
  { id: "groceries", label: "Groceries", value: 640 },
  { id: "transport", label: "Transport", value: 210 },
  { id: "dining", label: "Dining out", value: 380 },
  { id: "subscriptions", label: "Subscriptions", value: 95 },
]

export default function DonutChartControlled() {
  const [active, setActive] = React.useState<string | null>("groceries")
  const current = segments.find((s) => s.id === active)
  return (
    <div className="flex w-full max-w-xl flex-col gap-4">
      <DonutChart
        segments={segments}
        formatValue={usd}
        totalLabel="Spending"
        label="October spending"
        activeId={active}
        onActiveChange={(id) => setActive(id ?? "groceries")}
      />
      <p className="text-center text-sm text-muted-foreground">
        Highlighted: <span className="font-medium text-foreground">{current?.label}</span>
      </p>
    </div>
  )
}
