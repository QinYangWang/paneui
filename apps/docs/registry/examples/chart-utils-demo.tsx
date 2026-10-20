"use client"

import { chartColor, formatCompact, formatPercent } from "@paneui/ui/components/chart-utils"

const SERIES = ["Bookings", "Orders", "Bills", "Refunds", "Other"]

export default function ChartUtilsDemo() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        {SERIES.map((name, i) => (
          <div key={name} className="flex flex-col items-center gap-1.5">
            <span className="size-10 rounded-xl shadow-raised" style={{ background: chartColor(i) }} />
            <span className="text-xs text-muted-foreground">{name}</span>
          </div>
        ))}
      </div>
      <div className="text-center text-sm text-muted-foreground tabular-nums">
        {formatCompact(1284000)} · {formatPercent(0.4213)}
      </div>
    </div>
  )
}
