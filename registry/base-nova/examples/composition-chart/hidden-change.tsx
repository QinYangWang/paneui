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

export default function CompositionChartHiddenChange() {
  const [hidden, setHidden] = React.useState<string[]>([])
  const [resetKey, setResetKey] = React.useState(0)
  return (
    <div className="flex w-full max-w-2xl flex-col gap-3">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm text-muted-foreground">
          {hidden.length ? `Hiding ${hidden.length} of ${series.length} series` : "Showing all customers"}
        </span>
        <Button
          variant="ghost"
          size="sm"
          disabled={!hidden.length}
          onClick={() => {
            setHidden([])
            setResetKey((k) => k + 1)
          }}
        >
          Show all
        </Button>
      </div>
      <CompositionChart
        key={resetKey}
        series={series}
        data={data}
        onHiddenChange={setHidden}
        label="Active customers by type"
      />
    </div>
  )
}
