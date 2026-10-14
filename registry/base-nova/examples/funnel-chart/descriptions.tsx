"use client"

import { FunnelChart } from "@/registry/base-nova/ui/funnel-chart"

const stages = [
  { id: "sent", label: "Emails sent", value: 48000, description: "October newsletter, one send." },
  { id: "opened", label: "Opened", value: 19700, description: "Apple Mail privacy opens excluded." },
  { id: "clicked", label: "Clicked", value: 3150, description: "Most clicks went to the pricing link." },
  { id: "converted", label: "Bought", value: 212, description: "Within 7 days of the click." },
]

export default function FunnelChartDescriptions() {
  return (
    <div className="w-full max-w-xl">
      <FunnelChart
        stages={stages}
        defaultActiveId="clicked"
        minRatio={0.12}
        size={64}
        label="Newsletter funnel"
        formatValue={(v) => Math.round(v).toLocaleString("en-US")}
      />
    </div>
  )
}
