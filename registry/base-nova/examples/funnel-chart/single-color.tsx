"use client"

import { FunnelChart } from "@/registry/base-nova/ui/funnel-chart"

const stages = [
  { id: "applied", label: "Applied", value: 1240 },
  { id: "screened", label: "Phone screen", value: 310 },
  { id: "onsite", label: "Onsite", value: 84 },
  { id: "offer", label: "Offer", value: 19 },
  { id: "hired", label: "Hired", value: 14 },
]

export default function FunnelChartSingleColor() {
  return (
    <div className="w-full max-w-xl">
      <FunnelChart stages={stages} color="var(--primary)" unit="candidates" label="Hiring funnel, Q3" />
    </div>
  )
}
