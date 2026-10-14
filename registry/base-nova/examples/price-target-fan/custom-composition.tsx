"use client"

import { seededRandom } from "@/registry/base-nova/ui/chart-utils"
import {
  generatePriceHistory,
  PriceTargetFan,
  PriceTargetFanAxes,
  PriceTargetFanCursor,
  PriceTargetFanHistory,
  PriceTargetFanNow,
  PriceTargetFanPlot,
  PriceTargetFanTargets,
} from "@/registry/base-nova/ui/price-target-fan"

const history = generatePriceHistory(seededRandom(77), { endDate: "2026-10-09", weeks: 26, start: 31.5, drift: 0.006 })

const targets = [
  { key: "high", label: "High", price: 52, analysts: 12 },
  { key: "average", label: "Average", price: 44, analysts: 12 },
  { key: "low", label: "Low", price: 33, analysts: 12 },
]

export default function PriceTargetFanCustomComposition() {
  return (
    <div className="flex w-full max-w-xl flex-col gap-2">
      <span className="text-sm font-medium">Targets, no header</span>
      <PriceTargetFan history={history} targets={targets} horizon="2027-04-09" label="Six-month targets">
        <PriceTargetFanPlot height={200}>
          <PriceTargetFanAxes />
          <PriceTargetFanTargets />
          <PriceTargetFanHistory />
          <PriceTargetFanNow />
          <PriceTargetFanCursor />
        </PriceTargetFanPlot>
      </PriceTargetFan>
    </div>
  )
}
