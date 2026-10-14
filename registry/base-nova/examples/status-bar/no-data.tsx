"use client"

import { StatusBar, type StatusBarDatum } from "@/registry/base-nova/ui/status-bar"

const data: StatusBarDatum[] = Array.from({ length: 30 }, (_, i) => {
  const day = `Oct ${i + 1}`
  if (i < 9) return { id: `d${i}`, label: day, status: "nodata", description: "Monitor not set up yet" }
  if (i === 17) return { id: `d${i}`, label: day, status: "degraded", description: "Slow image uploads in EU" }
  return { id: `d${i}`, label: day, status: "operational", description: "No incidents reported" }
})

export default function StatusBarNoData() {
  return (
    <div className="w-full max-w-xl">
      <StatusBar title="Media CDN" label="Media CDN status, October" data={data} startLabel="Oct 1" endLabel="Oct 30" />
    </div>
  )
}
