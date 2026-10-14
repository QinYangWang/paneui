"use client"

import { seededRandom } from "@/registry/base-nova/ui/chart-utils"
import { StatusBar, type StatusBarDatum } from "@/registry/base-nova/ui/status-bar"

function history(seed: number): StatusBarDatum[] {
  const r = seededRandom(seed)
  return Array.from({ length: 90 }, (_, i) => {
    const x = r()
    return { id: `d${i}`, label: `${90 - i} days ago`, status: x > 0.97 ? "outage" : x > 0.92 ? "degraded" : "operational" }
  })
}

const services = [
  { name: "Auth", data: history(2) },
  { name: "Storage", data: history(5) },
  { name: "Search", data: history(8) },
]

export default function StatusBarCompact() {
  return (
    <div className="flex w-full max-w-xl flex-col gap-4">
      {services.map((s) => (
        <div key={s.name} className="flex flex-col gap-1.5">
          <span className="text-sm font-medium">{s.name}</span>
          <StatusBar
            label={`${s.name} status, last 90 days`}
            data={s.data}
            showHeader={false}
            showLegend={false}
            height={24}
            gap={2}
            startLabel="90 days ago"
          />
        </div>
      ))}
    </div>
  )
}
