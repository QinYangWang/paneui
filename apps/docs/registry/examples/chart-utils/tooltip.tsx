"use client"

import * as React from "react"

import {
  ChartTooltip,
  ChartTooltipRow,
  ChartTooltipTitle,
  chartColor,
  formatNumber,
  niceDomain,
  scaleBand,
  scaleLinear,
  useChartSize,
} from "@paneui/ui/components/chart-utils"

const WEEK = [
  { day: "Mon", steps: 8420 },
  { day: "Tue", steps: 10230 },
  { day: "Wed", steps: 6120 },
  { day: "Thu", steps: 12890 },
  { day: "Fri", steps: 9310 },
  { day: "Sat", steps: 15400 },
  { day: "Sun", steps: 4870 },
]

export default function ChartUtilsTooltip() {
  const [ref, size] = useChartSize()
  const [active, setActive] = React.useState<number | null>(null)
  const x = scaleBand(WEEK.length, [0, size.width], 0.3)
  const [, top] = niceDomain([0, Math.max(...WEEK.map((d) => d.steps))])
  const y = scaleLinear([0, top], [size.height, 0])
  const color = chartColor(0)
  const point = active === null ? null : WEEK[active]

  return (
    <div className="w-full max-w-md rounded-xl bg-card p-4 shadow-raised">
      <p className="mb-3 text-sm font-medium">Steps this week</p>
      <div
        ref={ref}
        className="relative h-40"
        onPointerMove={(e) => setActive(x.indexAt(e.clientX - e.currentTarget.getBoundingClientRect().left))}
        onPointerLeave={() => setActive(null)}
      >
        <svg
          width={size.width}
          height={size.height}
          style={{ "--bar": color } as React.CSSProperties}
          className="absolute inset-0 fill-(--bar)"
          aria-hidden
        >
          {WEEK.map((d, i) => (
            <rect
              key={d.day}
              x={x(i)}
              y={y(d.steps)}
              width={x.bandwidth}
              height={Math.max(0, size.height - y(d.steps))}
              rx={4}
              opacity={active === null || active === i ? 1 : 0.4}
            />
          ))}
        </svg>
        <ChartTooltip
          open={point !== null}
          bounds={size}
          x={active === null ? 0 : x(active) + x.bandwidth / 2}
          y={point ? y(point.steps) : 0}
        >
          {point && (
            <>
              <ChartTooltipTitle>{point.day}</ChartTooltipTitle>
              <ChartTooltipRow color={color} label="Steps" value={formatNumber(point.steps)} />
            </>
          )}
        </ChartTooltip>
      </div>
    </div>
  )
}
