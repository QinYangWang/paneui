import type * as React from "react"

import { formatCompact, niceDomain, scaleLinear } from "@/registry/base-nova/ui/chart-utils"

const RAW: [number, number] = [1830, 47260]

export default function ChartUtilsScales() {
  const domain = niceDomain(RAW)
  const scale = scaleLinear(domain, [0, 100])
  const ticks = scale.ticks(5)
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <p className="text-xs text-muted-foreground tabular-nums">
        Data {formatCompact(RAW[0])}–{formatCompact(RAW[1])} → nice domain {formatCompact(domain[0])}–{formatCompact(domain[1])}
      </p>
      <div className="relative h-8 border-t border-border">
        {ticks.map((t) => (
          <span
            key={t}
            className="absolute top-0 left-(--x) flex -translate-x-1/2 flex-col items-center gap-1 text-xs text-muted-foreground tabular-nums"
            style={{ "--x": `${scale(t)}%` } as React.CSSProperties}
          >
            <span className="h-1.5 w-px bg-border" />
            {formatCompact(t)}
          </span>
        ))}
      </div>
    </div>
  )
}
