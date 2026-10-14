"use client"

import * as React from "react"
import { motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"
import {
  CHART_EASE,
  ChartDataTable,
  ChartLegend,
  ChartLegendItem,
  ChartTooltip,
  ChartTooltipRow,
  ChartTooltipTitle,
  chartColor,
  clamp,
  useActiveId,
  useChartSize,
  useChartTransition,
} from "@/registry/base-nova/ui/chart-utils"

type BumpSeries = {
  id: string
  name: string
  /** One rank per period (1 = top). `null` leaves a gap in the line. */
  ranks: readonly (number | null)[]
  color?: string
}

type BumpRow = BumpSeries & { color: string; ranks: (number | null)[] }

type BumpChartProps = Omit<React.ComponentProps<"div">, "children"> & {
  series: readonly BumpSeries[]
  /** Period labels, oldest first. */
  periods: readonly string[]
  label?: string
  /** Vertical distance between ranks in px. */
  rowHeight?: number
  /** Pinned series id (controlled). Click a line, dot or legend item to pin. */
  activeId?: string | null
  /** Series pinned on first render (uncontrolled). */
  defaultActiveId?: string | null
  onActiveChange?: (id: string | null) => void
  /** @deprecated Use `activeId`. */
  active?: string | null
  /** @deprecated Use `defaultActiveId`. */
  defaultActive?: string | null
  showLegend?: boolean
  /** Show the rank number inside each dot. */
  showRankLabels?: boolean
}

/** Smooth S-curves between points; null ranks break the path. */
function bumpPath(ranks: readonly (number | null)[], x: (i: number) => number, y: (r: number) => number) {
  let d = ""
  let prev: { x: number; y: number } | null = null
  ranks.forEach((r, i) => {
    if (r == null) {
      prev = null
      return
    }
    const p = { x: x(i), y: y(r) }
    if (prev) {
      const mid = (prev.x + p.x) / 2
      d += ` C${mid.toFixed(2)} ${prev.y.toFixed(2)} ${mid.toFixed(2)} ${p.y.toFixed(2)} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`
    } else d += ` M${p.x.toFixed(2)} ${p.y.toFixed(2)}`
    prev = p
  })
  return d.trim()
}

function BumpChart({
  series,
  periods,
  label = "Rankings over time",
  rowHeight = 40,
  activeId,
  defaultActiveId,
  onActiveChange,
  active: deprecatedActive,
  defaultActive: deprecatedDefaultActive,
  showLegend = true,
  showRankLabels = true,
  className,
  ...props
}: BumpChartProps) {
  const [ref, size] = useChartSize<HTMLDivElement>()
  const reduce = useReducedMotion()
  const transition = useChartTransition()
  const [pinned, setPinned] = useActiveId(
    activeId !== undefined ? activeId : deprecatedActive,
    defaultActiveId !== undefined ? defaultActiveId : deprecatedDefaultActive,
    onActiveChange
  )
  const [hoverSeries, setHoverSeries] = React.useState<string | null>(null)
  const [cursor, setCursor] = React.useState<{ id: string; period: number } | null>(null)

  const rows: BumpRow[] = React.useMemo(() => {
    const seen = new Set<string>()
    return series
      .filter((s) => (seen.has(s.id) ? false : (seen.add(s.id), true)))
      .map((s, i) => ({
        ...s,
        color: s.color ?? chartColor(i),
        ranks: periods.map((_, p) => {
          const r = s.ranks[p]
          return r != null && Number.isFinite(r) && r > 0 ? Math.round(r) : null
        }),
      }))
  }, [series, periods])

  const maxRank = Math.max(1, ...rows.flatMap((r) => r.ranks.filter((v): v is number => v != null)))
  const padL = 34
  const padR = 112
  const padT = 18
  const padB = 30
  const height = padT + Math.max(1, maxRank - 1) * rowHeight + padB
  const width = size.width
  const plotW = Math.max(0, width - padL - padR)
  const x = (i: number) => (periods.length <= 1 ? padL + plotW / 2 : padL + (i / (periods.length - 1)) * plotW)
  const y = (r: number) => (maxRank === 1 ? padT + rowHeight / 2 : padT + (r - 1) * rowHeight)

  const pinnedValid = pinned && rows.some((r) => r.id === pinned) ? pinned : null
  const highlighted = cursor?.id ?? hoverSeries ?? pinnedValid
  const cursorRow = cursor ? rows.find((r) => r.id === cursor.id) : undefined
  const cursorRank = cursorRow?.ranks[cursor!.period] ?? null

  const togglePin = (id: string) => setPinned(pinnedValid === id ? null : id)

  /** Series ordered by their rank in a period (for up/down keyboard moves). */
  const orderAt = (p: number) =>
    rows
      .filter((r) => r.ranks[p] != null)
      .sort((a, b) => (a.ranks[p] as number) - (b.ranks[p] as number))

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!rows.length || !periods.length) return
    const p0 = cursor?.period ?? periods.length - 1
    const start = cursor ?? { id: pinnedValid ?? orderAt(p0)[0]?.id ?? rows[0].id, period: p0 }
    let { id, period } = start
    if (e.key === "ArrowLeft") period = clamp(period - 1, 0, periods.length - 1)
    else if (e.key === "ArrowRight") period = clamp(period + 1, 0, periods.length - 1)
    else if (e.key === "Home") period = 0
    else if (e.key === "End") period = periods.length - 1
    else if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      const order = orderAt(period)
      const idx = order.findIndex((r) => r.id === id)
      const next = order[clamp((idx < 0 ? 0 : idx) + (e.key === "ArrowUp" ? -1 : 1), 0, order.length - 1)]
      if (next) id = next.id
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      togglePin(id)
      return
    } else if (e.key === "Escape") {
      setCursor(null)
      return
    } else return
    e.preventDefault()
    setCursor({ id, period })
  }

  const prevRank = cursorRow && cursor ? cursorRow.ranks[cursor.period - 1] ?? null : null
  const delta = cursorRank != null && prevRank != null ? prevRank - cursorRank : null

  return (
    <div data-slot="bump-chart" className={cn("grid w-full min-w-0 gap-3", className)} {...props}>
      <div
        ref={ref}
        tabIndex={0}
        role="img"
        aria-label={`${label}. Arrow keys move between periods and ranks; Enter pins a series.`}
        onKeyDown={onKeyDown}
        onBlur={() => setCursor(null)}
        onPointerLeave={() => {
          setCursor(null)
          setHoverSeries(null)
        }}
        className="relative w-full rounded-xl outline-none select-none focus-visible:ring-2 focus-visible:ring-ring"
        style={{ height }}
      >
        {width > 0 && (
          <svg width={width} height={height} className="block overflow-visible" aria-hidden>
            {/* rank guides */}
            {Array.from({ length: maxRank }, (_, i) => i + 1).map((r) => (
              <g key={r}>
                <line
                  x1={padL}
                  x2={padL + plotW}
                  y1={y(r)}
                  y2={y(r)}
                  className="stroke-border"
                  strokeDasharray="2 5"
                />
                <text
                  x={padL - 14}
                  y={y(r)}
                  textAnchor="end"
                  dominantBaseline="central"
                  className="fill-muted-foreground text-[10px] font-medium tabular-nums"
                >
                  #{r}
                </text>
              </g>
            ))}

            {/* period column under cursor */}
            {cursor && (
              <motion.rect
                initial={false}
                animate={{ x: x(cursor.period) - 16 }}
                transition={transition}
                y={padT - 14}
                width={32}
                height={height - padT - padB + 28}
                rx={16}
                className="fill-muted"
              />
            )}

            {/* period labels */}
            {periods.map((p, i) => (
              <text
                key={p}
                x={x(i)}
                y={height - 8}
                textAnchor="middle"
                className={cn(
                  "text-[10px] tabular-nums transition-colors",
                  cursor?.period === i ? "fill-foreground font-medium" : "fill-muted-foreground"
                )}
              >
                {p}
              </text>
            ))}

            {/* lines */}
            {rows.map((row, ri) => {
              const d = bumpPath(row.ranks, x, y)
              const isHi = highlighted === row.id
              const dim = highlighted !== null && !isHi
              return (
                <g key={row.id}>
                  <motion.path
                    d={d}
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ stroke: row.color }}
                    initial={reduce ? false : { d, pathLength: 0, opacity: 0, strokeWidth: isHi ? 4.5 : 3 }}
                    animate={{ d, pathLength: 1, opacity: dim ? 0.18 : 1, strokeWidth: isHi ? 4.5 : 3 }}
                    transition={
                      reduce
                        ? { duration: 0 }
                        : {
                            pathLength: { duration: 1, ease: CHART_EASE, delay: ri * 0.06 },
                            opacity: { duration: 0.2 },
                            strokeWidth: { duration: 0.2 },
                            d: transition,
                          }
                    }
                  />
                  {/* wide invisible hit path */}
                  <path
                    d={d}
                    fill="none"
                    stroke="transparent"
                    strokeWidth={16}
                    className="cursor-pointer"
                    onPointerEnter={() => setHoverSeries(row.id)}
                    onPointerLeave={() => setHoverSeries(null)}
                    onClick={() => togglePin(row.id)}
                  />
                </g>
              )
            })}

            {/* dots */}
            {rows.map((row, ri) =>
              row.ranks.map((r, pi) => {
                if (r == null) return null
                const isHi = highlighted === row.id
                const dim = highlighted !== null && !isHi
                const isCursor = cursor?.id === row.id && cursor.period === pi
                return (
                  <motion.g
                    key={`${row.id}-${pi}`}
                    initial={reduce ? false : { opacity: 0, scale: 0.4, x: x(pi), y: y(r) }}
                    animate={{ opacity: dim ? 0.25 : 1, scale: isCursor ? 1.25 : 1, x: x(pi), y: y(r) }}
                    transition={
                      reduce
                        ? { duration: 0 }
                        : { ...transition, opacity: { duration: 0.2, delay: 0 }, delay: ri * 0.06 + pi * 0.03 }
                    }
                    className="cursor-pointer"
                    onPointerEnter={() => setCursor({ id: row.id, period: pi })}
                    onPointerLeave={() => setCursor(null)}
                    onClick={() => togglePin(row.id)}
                  >
                    <circle r={showRankLabels ? 9 : 5} className="stroke-background" strokeWidth={2} style={{ fill: row.color }} />
                    {showRankLabels && (
                      <text
                        textAnchor="middle"
                        dominantBaseline="central"
                        className="pointer-events-none fill-white text-[9px] font-semibold tabular-nums"
                      >
                        {r}
                      </text>
                    )}
                  </motion.g>
                )
              })
            )}

            {/* end labels */}
            {rows.map((row) => {
              let last = -1
              row.ranks.forEach((r, i) => {
                if (r != null) last = i
              })
              if (last < 0) return null
              const r = row.ranks[last] as number
              const dim = highlighted !== null && highlighted !== row.id
              return (
                <motion.text
                  key={row.id}
                  initial={false}
                  animate={{ x: x(last) + 16, y: y(r), opacity: dim ? 0.35 : 1 }}
                  transition={transition}
                  dominantBaseline="central"
                  className={cn(
                    "cursor-pointer text-xs",
                    highlighted === row.id ? "fill-foreground font-semibold" : "fill-muted-foreground font-medium"
                  )}
                  onPointerEnter={() => setHoverSeries(row.id)}
                  onPointerLeave={() => setHoverSeries(null)}
                  onClick={() => togglePin(row.id)}
                >
                  {row.name}
                </motion.text>
              )
            })}
          </svg>
        )}

        <ChartTooltip
          open={!!cursorRow && cursorRank != null}
          x={cursor ? x(cursor.period) : 0}
          y={cursorRank != null ? y(cursorRank) : 0}
          bounds={{ width, height }}
          side="top"
          offset={16}
        >
          {cursorRow && cursor && cursorRank != null && (
            <>
              <ChartTooltipTitle>{periods[cursor.period]}</ChartTooltipTitle>
              <ChartTooltipRow color={cursorRow.color} label={cursorRow.name} value={`#${cursorRank}`} />
              {delta !== null && (
                <ChartTooltipRow
                  label="Change"
                  value={
                    <span
                      style={{ color: delta > 0 ? "var(--success)" : delta < 0 ? "var(--destructive)" : undefined }}
                    >
                      {delta > 0 ? `▲ ${delta}` : delta < 0 ? `▼ ${-delta}` : "—"}
                    </span>
                  }
                />
              )}
              <ChartTooltipRow
                label="Best"
                value={`#${Math.min(...cursorRow.ranks.filter((v): v is number => v != null))}`}
              />
            </>
          )}
        </ChartTooltip>
      </div>

      {showLegend && (
        <ChartLegend aria-label={`${label} legend`}>
          {rows.map((row) => (
            <ChartLegendItem
              key={row.id}
              color={row.color}
              highlighted={highlighted === row.id}
              aria-pressed={pinnedValid === row.id}
              onPointerEnter={() => setHoverSeries(row.id)}
              onPointerLeave={() => setHoverSeries(null)}
              onFocus={() => setHoverSeries(row.id)}
              onBlur={() => setHoverSeries(null)}
              onClick={() => togglePin(row.id)}
            >
              {row.name}
            </ChartLegendItem>
          ))}
        </ChartLegend>
      )}

      <ChartDataTable
        caption={`${label} data`}
        columns={["Series", ...periods]}
        rows={rows.map((r) => [r.name, ...r.ranks.map((v) => (v == null ? "—" : `#${v}`))])}
      />
    </div>
  )
}

export { BumpChart, bumpPath, type BumpChartProps, type BumpSeries }
