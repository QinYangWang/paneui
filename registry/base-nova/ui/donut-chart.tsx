"use client"

import * as React from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"
import {
  CHART_EASE,
  ChartDataTable,
  ChartNumber,
  ChartSwatch,
  chartColor,
  formatNumber,
  formatPercent,
  useActiveId,
  useChartTransition,
} from "@/registry/base-nova/ui/chart-utils"

type DonutSegment = {
  id: string
  label: string
  value: number
  color?: string
  description?: string
}

type PlacedSegment = DonutSegment & {
  color: string
  share: number
  /** Arc start / length in px along the ring, already shortened for round caps and gaps. */
  start: number
  length: number
}

const VIEW = 200

type DonutChartProps = Omit<React.ComponentProps<"div">, "children"> & {
  segments: readonly DonutSegment[]
  label?: string
  /** Ring thickness in viewBox units (the ring is drawn in a 200×200 box). */
  thickness?: number
  /** Gap between segments in viewBox units. */
  gap?: number
  formatValue?: (value: number) => string
  /** Centre caption when nothing is hovered. */
  totalLabel?: string
  /** Max diameter of the ring in px; it shrinks with its container. */
  maxSize?: number
  showLegend?: boolean
  legendPosition?: "side" | "bottom"
  activeId?: string | null
  defaultActiveId?: string | null
  onActiveChange?: (id: string | null) => void
}

function placeSegments(
  segments: readonly DonutSegment[],
  circumference: number,
  thickness: number,
  gap: number
): PlacedSegment[] {
  const valid = segments.filter((s) => Number.isFinite(s.value) && s.value > 0)
  const total = valid.reduce((a, s) => a + s.value, 0)
  if (!total) return []
  // Round caps reach thickness/2 past each end, so trim that plus the gap.
  const trim = valid.length > 1 ? thickness + gap : 0
  let cursor = 0
  return valid.map((s) => {
    const span = (s.value / total) * circumference
    const placed: PlacedSegment = {
      ...s,
      color: s.color ?? chartColor(segments.indexOf(s)),
      share: s.value / total,
      start: cursor + trim / 2,
      length: Math.max(0.001, span - trim),
    }
    cursor += span
    return placed
  })
}

function DonutChart({
  segments,
  label = "Donut chart",
  thickness = 22,
  gap = 4,
  formatValue = formatNumber,
  totalLabel = "Total",
  maxSize = 240,
  showLegend = true,
  legendPosition = "side",
  activeId: activeIdProp,
  defaultActiveId,
  onActiveChange,
  className,
  ...props
}: DonutChartProps) {
  const [activeId, setActiveId] = useActiveId(activeIdProp, defaultActiveId, onActiveChange)
  const reduce = useReducedMotion()
  const baseId = React.useId().replace(/[^a-zA-Z0-9_-]/g, "")
  const transition = useChartTransition()
  const radius = (VIEW - thickness - 12) / 2
  const circumference = 2 * Math.PI * radius
  const placed = React.useMemo(
    () => placeSegments(segments, circumference, thickness, gap),
    [segments, circumference, thickness, gap]
  )
  const total = placed.reduce((a, s) => a + s.value, 0)
  const active = placed.find((s) => s.id === activeId) ?? null

  const focusSegment = (index: number) => {
    const n = placed.length
    const i = ((index % n) + n) % n
    document.getElementById(`${baseId}-seg-${i}`)?.focus()
  }

  return (
    <div
      data-slot="donut-chart"
      className={cn(
        "grid w-full items-center gap-6",
        showLegend && legendPosition === "side" && "sm:grid-cols-[minmax(0,auto)_1fr]",
        className
      )}
      {...props}
    >
      <div
        className="relative mx-auto aspect-square w-full"
        style={{ maxWidth: maxSize }}
        onPointerLeave={() => setActiveId(null)}
      >
        <svg
          viewBox={`0 0 ${VIEW} ${VIEW}`}
          className="block size-full -rotate-90 overflow-visible"
          role="group"
          aria-label={label}
        >
          {/* inset track */}
          <circle
            cx={VIEW / 2}
            cy={VIEW / 2}
            r={radius}
            fill="none"
            strokeWidth={thickness + 6}
            className="stroke-muted"
          />
          <circle
            cx={VIEW / 2}
            cy={VIEW / 2}
            r={radius + thickness / 2 + 3}
            fill="none"
            strokeWidth={1}
            className="stroke-border"
          />
          {placed.map((s, i) => {
            const isActive = s.id === activeId
            const dim = !!active && !isActive
            return (
              <motion.circle
                key={s.id}
                id={`${baseId}-seg-${i}`}
                cx={VIEW / 2}
                cy={VIEW / 2}
                r={radius}
                fill="none"
                strokeWidth={thickness}
                strokeLinecap="round"
                tabIndex={0}
                role="img"
                aria-label={`${s.label}: ${formatValue(s.value)}, ${formatPercent(s.share)}`}
                className="cursor-pointer outline-none focus-visible:[filter:drop-shadow(0_0_3px_var(--ring))]"
                style={{ stroke: s.color }}
                initial={
                  reduce
                    ? false
                    : {
                        strokeDasharray: `0.001 ${circumference}`,
                        strokeDashoffset: -s.start,
                        strokeWidth: thickness,
                        opacity: 0,
                      }
                }
                animate={{
                  strokeDasharray: `${s.length} ${circumference}`,
                  strokeDashoffset: -s.start,
                  strokeWidth: isActive ? thickness + 6 : thickness,
                  opacity: dim ? 0.4 : 1,
                }}
                transition={{ ...transition, delay: reduce ? 0 : i * 0.04 }}
                onPointerEnter={() => setActiveId(s.id)}
                onFocus={() => setActiveId(s.id)}
                onBlur={() => setActiveId(null)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowRight" || e.key === "ArrowDown") {
                    e.preventDefault()
                    focusSegment(i + 1)
                  } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
                    e.preventDefault()
                    focusSegment(i - 1)
                  } else if (e.key === "Escape") {
                    ;(e.currentTarget as SVGElement).blur()
                  }
                }}
              />
            )
          })}
        </svg>

        {/* linked centre readout */}
        <div
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center"
          aria-live="polite"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={active?.id ?? "__total"}
              initial={{ opacity: 0, y: 4, filter: "blur(2px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -4, filter: "blur(2px)" }}
              transition={{ duration: 0.18, ease: CHART_EASE }}
              className="flex max-w-[70%] items-center gap-1.5 truncate text-xs font-medium text-muted-foreground"
            >
              {active && <ChartSwatch color={active.color} />}
              {active?.label ?? totalLabel}
            </motion.span>
          </AnimatePresence>
          <ChartNumber
            value={active?.value ?? total}
            format={formatValue}
            className="mt-0.5 text-2xl font-semibold tracking-tight text-foreground"
          />
          <motion.span
            animate={{ opacity: active ? 1 : 0 }}
            transition={{ duration: 0.15 }}
            className="text-xs text-muted-foreground tabular-nums"
          >
            {active ? `${formatPercent(active.share)} of ${totalLabel.toLowerCase()}` : "\u00a0"}
          </motion.span>
        </div>
      </div>

      {showLegend && (
        <ul
          aria-label={`${label} legend`}
          className="flex w-full flex-col gap-1 rounded-2xl bg-muted/60 p-1.5 shadow-well"
        >
          {placed.map((s) => {
            const isActive = s.id === activeId
            return (
              <li key={s.id}>
                <button
                  type="button"
                  data-active={isActive || undefined}
                  onPointerEnter={() => setActiveId(s.id)}
                  onPointerLeave={() => setActiveId(null)}
                  onFocus={() => setActiveId(s.id)}
                  onBlur={() => setActiveId(null)}
                  className={cn(
                    "relative flex w-full items-center gap-2.5 rounded-xl px-2.5 py-1.5 text-left text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    active && !isActive && "opacity-55",
                    "transition-opacity duration-200"
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId={`${baseId}-legend-hl`}
                      transition={transition}
                      className="absolute inset-0 -z-0 rounded-xl bg-secondary shadow-raised"
                    />
                  )}
                  <ChartSwatch color={s.color} className="relative" />
                  <span className="relative min-w-0 flex-1 truncate text-foreground">{s.label}</span>
                  <span className="relative text-muted-foreground tabular-nums">
                    {formatValue(s.value)}
                  </span>
                  <span className="relative w-12 text-right font-medium text-foreground tabular-nums">
                    {formatPercent(s.share, 0)}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      )}

      <ChartDataTable
        caption={`${label} data`}
        columns={["Segment", "Value", "Share"]}
        rows={placed.map((s) => [s.label, formatValue(s.value), formatPercent(s.share)])}
      />
    </div>
  )
}

export { DonutChart, type DonutChartProps, type DonutSegment, type PlacedSegment as DonutPlacedSegment }
