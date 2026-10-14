"use client"

import { seededRandom } from "@/registry/base-nova/ui/chart-utils"
import { generatePriceHistory, PriceTargetFan } from "@/registry/base-nova/ui/price-target-fan"

const history = generatePriceHistory(seededRandom(58), { endDate: "2026-10-09", weeks: 40, start: 84, drift: -0.002 })

const targets = [
  { key: "street-high", label: "Street high", price: 118, analysts: 22 },
  { key: "bull", label: "Our bull case", price: 104, color: "var(--primary)" },
  { key: "median", label: "Median", price: 92, analysts: 22 },
  { key: "bear", label: "Our bear case", price: 71, color: "var(--warning)" },
  { key: "street-low", label: "Street low", price: 62, analysts: 22 },
]

const usd = (v: number) => v.toLocaleString("en-US", { style: "currency", currency: "USD" })

export default function PriceTargetFanManyTargets() {
  return (
    <div className="w-full max-w-2xl">
      <PriceTargetFan
        history={history}
        targets={targets}
        symbol="NOVA"
        formatPrice={usd}
        label="NOVA price targets with in-house scenarios"
      />
    </div>
  )
}
