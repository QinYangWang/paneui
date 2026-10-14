"use client"

import * as React from "react"
import { motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

/*
 * A word-sized trend chart: no axes, no labels, just the shape of a series.
 * Colour comes from `currentColor`, so tint it with a text token
 * (`text-success`, `text-chart-1`, `text-muted-foreground`). The SVG stretches
 * to its box: size it with `h-*` / `w-*` (default 36px tall, full width).
 */

type SparklineProps = Omit<React.ComponentProps<"svg">, "values" | "children"> & {
  values: readonly number[]
  /** `area` adds a soft wash under the line; `bar` draws one column per value. */
  variant?: "line" | "area" | "bar"
  /** Accessible summary, e.g. "Revenue, up 12% over 30 days". Without it the chart is decorative. */
  label?: string
  /** Draw the line in on mount. Default true (always off under reduced motion). */
  animate?: boolean
}

const W = 120
const H = 36
const PAD = 3

function Sparkline({
  values,
  variant = "area",
  label,
  animate = true,
  className,
  ...props
}: SparklineProps) {
  const id = React.useId().replace(/:/g, "")
  const reduce = useReducedMotion()
  const play = animate && !reduce
  const list = values.length > 1 ? values : [values[0] ?? 0, values[0] ?? 0]
  const min = Math.min(...list)
  const max = Math.max(...list)
  const span = max - min || 1
  const y = (v: number) => H - PAD - ((v - min) / span) * (H - PAD * 2 - 2)

  const a11y = label ? { role: "img" as const, "aria-label": label } : { "aria-hidden": true as const }

  if (variant === "bar") {
    const gap = 2
    const bw = (W - gap * (list.length - 1)) / list.length
    const floor = Math.min(0, min)
    const top = Math.max(...list, 0)
    const range = top - floor || 1
    return (
      <svg
        data-slot="sparkline"
        data-variant="bar"
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        className={cn("block h-9 w-full", className)}
        {...a11y}
        {...props}
      >
        {list.map((v, i) => {
          const h = Math.max(1.5, ((v - floor) / range) * (H - 1))
          return (
            <motion.rect
              key={i}
              x={i * (bw + gap)}
              width={Math.max(bw, 1)}
              y={H - h}
              height={h}
              rx={Math.min(1.5, bw / 2)}
              fill="currentColor"
              opacity={i === list.length - 1 ? 1 : 0.45}
              initial={play ? { scaleY: 0 } : false}
              animate={{ scaleY: 1 }}
              style={{ transformOrigin: `0 ${H}px`, transformBox: "view-box" }}
              transition={{ type: "spring", stiffness: 420, damping: 38, mass: 0.6, delay: play ? i * 0.015 : 0 }}
            />
          )
        })}
      </svg>
    )
  }

  const pts = list.map((v, i) => [(i / (list.length - 1)) * W, y(v)] as const)
  const line = pts.map(([px, py], i) => `${i ? "L" : "M"}${px.toFixed(2)} ${py.toFixed(2)}`).join(" ")
  const area = `${line} L${W} ${H} L0 ${H} Z`

  return (
    <svg
      data-slot="sparkline"
      data-variant={variant}
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      className={cn("block h-9 w-full overflow-visible", className)}
      {...a11y}
      {...props}
    >
      {variant === "area" && (
        <>
          <defs>
            <linearGradient id={`spark-${id}`} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="currentColor" stopOpacity={0.2} />
              <stop offset="100%" stopColor="currentColor" stopOpacity={0} />
            </linearGradient>
          </defs>
          <motion.path
            d={area}
            fill={`url(#spark-${id})`}
            initial={play ? { opacity: 0 } : false}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: play ? 0.25 : 0 }}
          />
        </>
      )}
      <motion.path
        d={line}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        initial={play ? { pathLength: 0 } : false}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  )
}

export { Sparkline }
export type { SparklineProps }
