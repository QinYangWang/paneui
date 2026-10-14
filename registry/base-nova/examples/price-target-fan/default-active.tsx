"use client"

import { seededRandom } from "@/registry/base-nova/ui/chart-utils"
import { generatePriceHistory, PriceTargetFan } from "@/registry/base-nova/ui/price-target-fan"

const history = generatePriceHistory(seededRandom(9), { endDate: "2026-10-09", weeks: 52, start: 410, drift: 0.004, vol: 0.025 })

const targets = [
  { key: "high", label: "High", price: 640, analysts: 51 },
  { key: "average", label: "Average", price: 560, analysts: 51 },
  { key: "low", label: "Low", price: 420, analysts: 51 },
]

const usd = (v: number) => v.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })

export default function PriceTargetFanDefaultActive() {
  return (
    <div className="w-full max-w-2xl">
      <PriceTargetFan
        history={history}
        targets={targets}
        current={498.2}
        symbol="MSFT"
        formatPrice={usd}
        defaultActive={{ type: "target", key: "average" }}
        label="MSFT analyst price targets"
      />
    </div>
  )
}
