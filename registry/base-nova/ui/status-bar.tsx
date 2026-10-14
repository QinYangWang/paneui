"use client"

import * as React from "react"
import { motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"
import {
  ChartDataTable,
  ChartSwatch,
  ChartTooltip,
  ChartTooltipTitle,
  clamp,
  scaleBand,
  useActiveId,
  useChartSize,
  useChartTransition,
} from "@/registry/base-nova/ui/chart-utils"

type StatusBarStatus = {
  label: string
  color: string
  /** Contribution to uptime: 1 = up, 0 = down, fractions for partial, null = not counted. */
  weight?: number | null
}

type StatusBarDatum = {
  id: string
  /** Period label, e.g. "Mon, Oct 12". */
  label: string
  status: string
  description?: string
}

const STATUS_BAR_STATUSES = {
  operational: { label: "Operational", color: "var(--success)", weight: 1 },
  degraded: { label: "Degraded", color: "var(--warning)", weight: 0.5 },
  outage: { label: "Outage", color: "var(--destructive)", weight: 0 },
  maintenance: { label: "Maintenance", color: "var(--primary)", weight: null },
  nodata: {
    label: "No data",
    color: "color-mix(in oklch, var(--muted-foreground) 30%, transparent)",
    weight: null,
  },
} satisfies Record<string, StatusBarStatus>

type StatusBarProps = Omit<React.ComponentProps<"section">, "children" | "title"> & {
  data: readonly StatusBarDatum[]
  statuses?: Record<string, StatusBarStatus>
  label?: string
  /** Service name shown in the header row. */
  title?: React.ReactNode
  height?: number
  /** Gap between bars in px. */
  gap?: number
  showHeader?: boolean
  showLegend?: boolean
  /** Caption under the bars' left and right ends. */
  startLabel?: string
  endLabel?: string
  activeId?: string | null
  defaultActiveId?: string | null
  onActiveChange?: (id: string | null) => void
}

function StatusBar({
  data,
  statuses = STATUS_BAR_STATUSES,
  label = "Status history",
  title,
  height = 36,
  gap = 3,
  showHeader = true,
  showLegend = true,
  startLabel,
  endLabel = "Today",
  activeId: activeIdProp,
  defaultActiveId,
  onActiveChange,
  className,
  ...props
}: StatusBarProps) {
  const [ref, size] = useChartSize<HTMLDivElement>()
  const [activeId, setActiveId] = useActiveId(activeIdProp, defaultActiveId, onActiveChange)
  const reduce = useReducedMotion()
  const transition = useChartTransition()

  const fallback: StatusBarStatus = { label: "Unknown", color: "var(--muted-foreground)", weight: null }
  const rows = data.map((datum) => ({ datum, status: statuses[datum.status] ?? fallback }))

  const counted = rows.filter((r) => r.status.weight != null)
  const uptime = counted.length
    ? counted.reduce((a, r) => a + (r.status.weight as number), 0) / counted.length
    : null
  const latest = rows[rows.length - 1]

  const width = size.width
  const n = rows.length
  const padding = n ? clamp(gap / Math.max(1, width / n), 0, 0.6) : 0
  const band = scaleBand(n, [0, width], padding)
  const bw = Math.max(1, band.bandwidth)
  const activeIndex = rows.findIndex((r) => r.datum.id === activeId)
  const active = activeIndex >= 0 ? rows[activeIndex] : null

  const counts = React.useMemo(() => {
    const m = new Map<string, number>()
    for (const d of data) m.set(d.status, (m.get(d.status) ?? 0) + 1)
    return m
  }, [data])

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!n) return
    const cur = activeIndex >= 0 ? activeIndex : n - 1
    let next = cur
    if (e.key === "ArrowLeft") next = cur - 1
    else if (e.key === "ArrowRight") next = cur + 1
    else if (e.key === "Home") next = 0
    else if (e.key === "End") next = n - 1
    else if (e.key === "Escape") return setActiveId(null)
    else return
    e.preventDefault()
    setActiveId(rows[clamp(next, 0, n - 1)].datum.id)
  }

  return (
    <section
      aria-label={label}
      data-slot="status-bar"
      className={cn("w-full min-w-0 space-y-2.5", className)}
      {...props}
    >
      {showHeader && (
        <div className="flex items-center gap-2 text-sm">
          {latest && (
            <span className="relative flex size-2.5">
              {!reduce && latest.status.weight === 1 && (
                <span
                  className="absolute inset-0 animate-ping rounded-full opacity-50"
                  style={{ background: latest.status.color }}
                />
              )}
              <span className="relative size-2.5 rounded-full" style={{ background: latest.status.color }} />
            </span>
          )}
          <span className="font-medium text-foreground">{title ?? label}</span>
          {latest && <span className="text-muted-foreground">{latest.status.label}</span>}
          {uptime !== null && (
            <span className="ml-auto text-xs font-medium text-muted-foreground tabular-nums">
              <span className="text-foreground">{(uptime * 100).toFixed(2)}%</span> uptime
            </span>
          )}
        </div>
      )}

      <div
        ref={ref}
        tabIndex={0}
        role="img"
        aria-label={`${label}. Use left and right arrow keys to inspect periods.`}
        onKeyDown={onKeyDown}
        onBlur={() => setActiveId(null)}
        onPointerLeave={() => setActiveId(null)}
        onPointerMove={(e) => {
          const box = ref.current?.getBoundingClientRect()
          if (!box || !n) return
          const id = rows[band.indexAt(e.clientX - box.left)].datum.id
          if (id !== activeId) setActiveId(id)
        }}
        onPointerDown={(e) => {
          const box = ref.current?.getBoundingClientRect()
          if (!box || !n) return
          setActiveId(rows[band.indexAt(e.clientX - box.left)].datum.id)
        }}
        className="relative w-full touch-pan-y rounded-lg outline-none select-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        style={{ height }}
      >
        {width > 0 && (
          <svg width={width} height={height} className="block overflow-visible" aria-hidden>
            {rows.map(({ datum, status }, i) => {
              const isActive = i === activeIndex
              const dim = activeIndex >= 0 && !isActive
              return (
                <motion.rect
                  key={datum.id}
                  initial={reduce ? false : { x: band(i), scaleY: 0, opacity: 0 }}
                  animate={{
                    x: band(i),
                    scaleY: isActive ? 1 : dim ? 0.86 : 1,
                    opacity: dim ? 0.55 : 1,
                  }}
                  transition={{ ...transition, delay: reduce ? 0 : Math.min(i * 0.008, 0.5) }}
                  y={0}
                  width={bw}
                  height={height}
                  rx={Math.min(bw / 2, 4)}
                  style={{ fill: status.color, transformBox: "fill-box", originY: 1 }}
                />
              )
            })}
          </svg>
        )}

        <ChartTooltip
          open={!!active}
          x={active ? band(activeIndex) + bw / 2 : 0}
          y={0}
          bounds={{ width, height }}
          side="top"
          avoidCollisions={false}
          offset={10}
        >
          {active && (
            <>
              <ChartTooltipTitle>{active.datum.label}</ChartTooltipTitle>
              <div className="flex items-center gap-2 text-popover-foreground">
                <ChartSwatch color={active.status.color} />
                <span className="font-medium">{active.status.label}</span>
              </div>
              {active.datum.description && (
                <p className="mt-1 text-muted-foreground">{active.datum.description}</p>
              )}
            </>
          )}
        </ChartTooltip>
      </div>

      {(startLabel || endLabel) && (
        <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
          <span>{startLabel ?? `${n} periods ago`}</span>
          <span className="h-px flex-1 bg-border" />
          <span>{endLabel}</span>
        </div>
      )}

      {showLegend && (
        <ul aria-label={`${label} legend`} className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
          {Object.entries(statuses)
            .filter(([key]) => counts.has(key))
            .map(([key, s]) => (
              <li key={key} className="flex items-center gap-1.5">
                <ChartSwatch color={s.color} className="size-2" />
                {s.label}
                <span className="text-foreground tabular-nums">{counts.get(key)}</span>
              </li>
            ))}
        </ul>
      )}

      <ChartDataTable
        caption={`${label} data`}
        columns={["Period", "Status", "Details"]}
        rows={rows.map(({ datum, status }) => [datum.label, status.label, datum.description ?? ""])}
      />
    </section>
  )
}

export {
  StatusBar,
  STATUS_BAR_STATUSES,
  type StatusBarProps,
  type StatusBarDatum,
  type StatusBarStatus,
}
