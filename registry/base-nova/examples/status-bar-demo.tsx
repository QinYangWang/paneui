"use client"

import { seededRandom } from "@/registry/base-nova/ui/chart-utils"
import { StatusBar, type StatusBarDatum } from "@/registry/base-nova/ui/status-bar"

function history(seed: number, days = 60): StatusBarDatum[] {
  const r = seededRandom(seed)
  const start = Date.UTC(2026, 7, 15)
  return Array.from({ length: days }, (_, i) => {
    const x = r()
    const status = x > 0.95 ? "outage" : x > 0.88 ? "degraded" : x > 0.86 ? "maintenance" : "operational"
    const date = new Date(start + i * 86_400_000).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    })
    const description =
      status === "outage"
        ? `${Math.round(8 + r() * 40)} min of failed requests`
        : status === "degraded"
          ? "Elevated p95 latency"
          : status === "maintenance"
            ? "Scheduled database upgrade"
            : "No incidents reported"
    return { id: `d${i}`, label: date, status, description }
  })
}

const api = history(4)
const dashboard = history(9)

export default function StatusBarDemo() {
  return (
    <div className="w-full max-w-xl space-y-6">
      <StatusBar title="API" label="API status, last 60 days" data={api} startLabel="60 days ago" />
      <StatusBar
        title="Dashboard"
        label="Dashboard status, last 60 days"
        data={dashboard}
        startLabel="60 days ago"
        showLegend={false}
      />
    </div>
  )
}
