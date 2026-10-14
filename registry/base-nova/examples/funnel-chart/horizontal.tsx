"use client"

import { FunnelChart } from "@/registry/base-nova/ui/funnel-chart"

const stages = [
  { id: "cart", label: "Added to cart", value: 9820 },
  { id: "checkout", label: "Checkout", value: 5140 },
  { id: "shipping", label: "Shipping", value: 4320 },
  { id: "payment", label: "Payment", value: 3610 },
  { id: "complete", label: "Order placed", value: 3290 },
]

export default function FunnelChartHorizontal() {
  return (
    <div className="w-full max-w-2xl">
      <FunnelChart stages={stages} direction="horizontal" size={160} gap={6} unit="sessions" label="Checkout funnel" />
    </div>
  )
}
