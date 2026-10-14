"use client"

import { TrendChart } from "@/registry/base-nova/ui/trend-chart"

const data = Array.from({ length: 30 }, (_, i) => ({ label: `Oct ${i + 1}`, values: { signups: 30 + ((i * 17) % 23) + Math.round(i / 2) } }))

export default function TrendChartSingle() {
  return (
    <div className="w-full max-w-2xl">
      <TrendChart series={[{ id: "signups", label: "Sign-ups" }]} data={data} variant="bar" height={200} label="Daily sign-ups" />
    </div>
  )
}
