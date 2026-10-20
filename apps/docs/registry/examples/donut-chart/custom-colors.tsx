"use client"

import { DonutChart } from "@paneui/ui/components/donut-chart"

const segments = [
  { id: "passed", label: "Passed", value: 412, color: "var(--success)" },
  { id: "flaky", label: "Flaky", value: 23, color: "var(--warning)" },
  { id: "failed", label: "Failed", value: 9, color: "var(--destructive)" },
  { id: "skipped", label: "Skipped", value: 31, color: "var(--muted-foreground)" },
]

export default function DonutChartCustomColors() {
  return (
    <div className="w-full max-w-xl">
      <DonutChart segments={segments} totalLabel="Tests" label="Test results for the last run" />
    </div>
  )
}
