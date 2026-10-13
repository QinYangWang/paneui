"use client"

import { seededRandom } from "@/registry/base-nova/ui/chart-utils"
import { generatePriceHistory, PriceTargetFan } from "@/registry/base-nova/ui/price-target-fan"

const history = generatePriceHistory(seededRandom(314), { endDate: "2026-10-09", weeks: 52, start: 162.4, drift: 0.003 })
const current = history[history.length - 1].price

const targets = [
  { key: "high", label: "High", price: Number((current * 1.34).toFixed(2)), analysts: 38 },
  { key: "average", label: "Average", price: Number((current * 1.12).toFixed(2)), analysts: 38 },
  { key: "low", label: "Low", price: Number((current * 0.86).toFixed(2)), analysts: 38 },
]

const usd = (v: number) => v.toLocaleString("en-US", { style: "currency", currency: "USD" })

export default function PriceTargetFanDemo() {
  return (
    <div className="w-full max-w-2xl">
      <PriceTargetFan
        history={history}
        targets={targets}
        horizon="2027-10-09"
        symbol="ACME"
        formatPrice={usd}
        label="ACME 12-month analyst price targets"
      />
    </div>
  )
}
