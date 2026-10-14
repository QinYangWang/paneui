"use client"

import * as React from "react"

import { Button } from "@/registry/base-nova/ui/button"
import { CompositionChart } from "@/registry/base-nova/ui/composition-chart"

const series = [
  { id: "new", label: "New", color: "var(--primary)" },
  { id: "returning", label: "Returning", color: "var(--success)" },
  { id: "reactivated", label: "Reactivated", color: "var(--warning)" },
]

const months = ["May", "Jun", "Jul", "Aug", "Sep", "Oct"]
const data = months.map((label, i) => ({
  label,
  values: { new: 820 + i * 60, returning: 2400 + i * 140, reactivated: 310 - i * 20 },
}))

export default function CompositionChartControlled() {
  const [hidden, setHidden] = React.useState<string[]>(["reactivated"])
  return (
    <div className="flex w-full max-w-2xl flex-col gap-3">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm text-muted-foreground">
          {hidden.length ? `Hiding ${hidden.length} of ${series.length} series` : "Showing all customers"}
        </span>
        <Button variant="ghost" size="sm" disabled={!hidden.length} onClick={() => setHidden([])}>
          Show all
        </Button>
      </div>
      <CompositionChart
        series={series}
        data={data}
        hidden={hidden}
        onHiddenChange={setHidden}
        label="Active customers by type"
      />
    </div>
  )
}
