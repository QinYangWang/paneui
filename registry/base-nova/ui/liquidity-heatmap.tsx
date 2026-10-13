"use client"

import * as React from "react"
import { motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"
import {
  CHART_EASE,
  ChartDataTable,
  ChartTooltip,
  ChartTooltipRow,
  ChartTooltipTitle,
  clamp,
  formatCompact,
  seededRandom,
  useChartId,
  useChartSize,
  useChartTransition,
} from "@/registry/base-nova/ui/chart-utils"

type LiquidityLevel = { price: number; size: number }

type LiquiditySnapshot = {
  /** Stable identity, usually a UTC timestamp (ms) or ISO string. */
  id: string | number
  /** Axis / tooltip label for this column. */
  label: string
  /** Resting size per price level at this moment. */
  levels: readonly LiquidityLevel[]
  /** Traded price at this moment; drawn as the price trace. */
  price?: number
}

type LiquidityColumn = Omit<LiquiditySnapshot, "levels"> & { levels: Map<number, number> }

type LiquidityModel = {
  columns: LiquidityColumn[]
  /** Distinct price bands, highest first. */
  prices: number[]
  maximum: number
}

/** Merge duplicate prices, drop invalid levels and duplicate snapshots. */
function buildLiquidityModel(snapshots: readonly LiquiditySnapshot[]): LiquidityModel {
  const seen = new Set<string | number>()
  const columns: LiquidityColumn[] = []
  const priceSet = new Set<number>()
  let maximum = 0
  for (const s of snapshots) {
    if (seen.has(s.id)) continue
    seen.add(s.id)
    const levels = new Map<number, number>()
    for (const { price, size } of s.levels) {
      if (!Number.isFinite(price) || !Number.isFinite(size) || size < 0) continue
      const total = (levels.get(price) ?? 0) + size
      levels.set(price, total)
      priceSet.add(price)
      if (total > maximum) maximum = total
    }
    columns.push({ ...s, levels })
  }
  return { columns, prices: [...priceSet].sort((a, b) => b - a), maximum }
}

/** Fractional row position of a price between band centres (null when outside the bands). */
function priceRow(price: number | undefined, prices: readonly number[]) {
  if (price === undefined || !Number.isFinite(price) || !prices.length) return null
  if (price > prices[0] || price < prices[prices.length - 1]) return null
  for (let i = 0; i < prices.length - 1; i++) {
    const a = prices[i]
    const b = prices[i + 1]
    if (price <= a && price >= b) return i + 0.5 + (a - price) / (a - b || 1)
  }
  return prices.length - 0.5
}

type LiquidityHeatmapProps = Omit<React.ComponentProps<"div">, "children"> & {
  snapshots: readonly LiquiditySnapshot[]
  label?: string
  height?: number
  /** Colour of thin liquidity. */
  lowColor?: string
  /** Colour of the deepest walls. */
  highColor?: string
  /** Gamma applied to size/max; below 1 lifts thin liquidity so it stays visible. */
  gamma?: number
  showTrace?: boolean
  showLegend?: boolean
  formatPrice?: (price: number) => string
  formatSize?: (size: number) => string
  /** Unit after sizes in the tooltip, e.g. "BTC". */
  unit?: string
}

const defaultPrice = (p: number) =>
  p.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })

function heatFill(t: number, low: string, high: string) {
  // Blend hue from low→high and fade in strength; t is 0..1.
  const hue = Math.round(clamp(t, 0, 1) * 100)
  const alpha = Math.round(8 + clamp(t, 0, 1) * 88)
  return `color-mix(in oklch, color-mix(in oklch, ${high} ${hue}%, ${low}) ${alpha}%, transparent)`
}

function LiquidityHeatmap({
  snapshots,
  label = "Liquidity heatmap",
  height = 320,
  lowColor = "var(--chart-1, var(--primary))",
  highColor = "var(--chart-3, var(--warning))",
  gamma = 0.6,
  showTrace = true,
  showLegend = true,
  formatPrice = defaultPrice,
  formatSize = formatCompact,
  unit,
  className,
  ...props
}: LiquidityHeatmapProps) {
  const [ref, size] = useChartSize<HTMLDivElement>()
  const reduce = useReducedMotion()
  const transition = useChartTransition()
  const clipId = useChartId("lh-clip")
  const model = React.useMemo(() => buildLiquidityModel(snapshots), [snapshots])
  const { columns, prices, maximum } = model
  const [hover, setHover] = React.useState<{ col: number; row: number } | null>(null)

  const axisW = 64
  const timeH = 20
  const width = size.width
  const plotW = Math.max(0, width - axisW)
  const plotH = height - timeH
  const colW = columns.length ? plotW / columns.length : 0
  const rowH = prices.length ? plotH / prices.length : 0
  const intensity = (s: number) => (maximum ? Math.pow(s / maximum, gamma) : 0)

  // Keep the hover cell valid when data shifts underneath it.
  const hc = hover ? clamp(hover.col, 0, columns.length - 1) : -1
  const hr = hover ? clamp(hover.row, 0, prices.length - 1) : -1
  const hoverCol = hover ? columns[hc] : undefined
  const hoverPrice = hover ? prices[hr] : undefined
  const hoverSize = hoverCol && hoverPrice !== undefined ? hoverCol.levels.get(hoverPrice) : undefined

  const tracePoints = React.useMemo(() => {
    const pts: { x: number; y: number }[] = []
    columns.forEach((c, i) => {
      const r = priceRow(c.price, prices)
      if (r !== null) pts.push({ x: (i + 0.5) * colW, y: r * rowH })
    })
    return pts
  }, [columns, prices, colW, rowH])
  const traceD = tracePoints.length
    ? tracePoints.map((p, i) => `${i ? "L" : "M"}${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(" ")
    : ""
  const lastPoint = tracePoints[tracePoints.length - 1]

  const labelEvery = Math.max(1, Math.ceil(prices.length / Math.max(1, Math.floor(plotH / 26))))

  const onPointer = (e: React.PointerEvent) => {
    const box = ref.current?.getBoundingClientRect()
    if (!box || !columns.length || !prices.length) return
    const px = e.clientX - box.left
    const py = e.clientY - box.top
    if (px < 0 || px > plotW || py < 0 || py > plotH) return setHover(null)
    setHover({
      col: clamp(Math.floor(px / (colW || 1)), 0, columns.length - 1),
      row: clamp(Math.floor(py / (rowH || 1)), 0, prices.length - 1),
    })
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!columns.length || !prices.length) return
    const cur = hover ?? {
      col: columns.length - 1,
      row: clamp(Math.floor(priceRow(columns[columns.length - 1]?.price, prices) ?? 0), 0, prices.length - 1),
    }
    let { col, row } = cur
    if (e.key === "ArrowLeft") col -= 1
    else if (e.key === "ArrowRight") col += 1
    else if (e.key === "ArrowUp") row -= 1
    else if (e.key === "ArrowDown") row += 1
    else if (e.key === "Home") col = 0
    else if (e.key === "End") col = columns.length - 1
    else if (e.key === "Escape") return setHover(null)
    else return
    e.preventDefault()
    setHover({ col: clamp(col, 0, columns.length - 1), row: clamp(row, 0, prices.length - 1) })
  }

  const legendStops = [0, 0.25, 0.5, 0.75, 1]

  return (
    <div data-slot="liquidity-heatmap" className={cn("grid w-full min-w-0 gap-3", className)} {...props}>
      <div
        ref={ref}
        tabIndex={0}
        role="img"
        aria-label={`${label}. Use arrow keys to inspect price levels over time.`}
        onPointerMove={onPointer}
        onPointerDown={onPointer}
        onPointerLeave={() => setHover(null)}
        onBlur={() => setHover(null)}
        onKeyDown={onKeyDown}
        className="relative w-full touch-pan-y rounded-xl outline-none select-none focus-visible:ring-2 focus-visible:ring-ring"
        style={{ height }}
      >
        {width > 0 && (
          <svg width={width} height={height} className="block overflow-visible" aria-hidden>
            <defs>
              <clipPath id={clipId}>
                <motion.rect
                  x={0}
                  y={0}
                  height={plotH}
                  rx={10}
                  initial={reduce ? false : { width: 0 }}
                  width={plotW}
                  animate={{ width: plotW }}
                  transition={reduce ? { duration: 0 } : { duration: 0.9, ease: CHART_EASE }}
                />
              </clipPath>
            </defs>

            {/* well */}
            <rect x={0} y={0} width={plotW} height={plotH} rx={10} className="fill-muted" />

            <g clipPath={`url(#${clipId})`}>
              {columns.map((c, ci) => (
                <g key={c.id} transform={`translate(${ci * colW},0)`}>
                  {prices.map((p, ri) => {
                    const s = c.levels.get(p)
                    if (s === undefined || s <= 0) return null
                    return (
                      <rect
                        key={p}
                        x={0.5}
                        y={ri * rowH + 0.5}
                        width={Math.max(0, colW - 1)}
                        height={Math.max(0, rowH - 1)}
                        rx={Math.min(2, rowH / 4)}
                        style={{
                          fill: heatFill(intensity(s), lowColor, highColor),
                          transition: "fill 400ms cubic-bezier(0.22,1,0.36,1)",
                        }}
                      />
                    )
                  })}
                </g>
              ))}

              {showTrace && traceD && (
                <>
                  <motion.path
                    d={traceD}
                    fill="none"
                    strokeWidth={4}
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    className="stroke-background"
                    strokeOpacity={0.7}
                    initial={reduce ? false : { pathLength: 0, d: traceD }}
                    animate={{ pathLength: 1, d: traceD }}
                    transition={reduce ? { duration: 0 } : { pathLength: { duration: 1.1, ease: CHART_EASE }, d: transition }}
                  />
                  <motion.path
                    d={traceD}
                    fill="none"
                    strokeWidth={1.75}
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    className="stroke-foreground"
                    initial={reduce ? false : { pathLength: 0, d: traceD }}
                    animate={{ pathLength: 1, d: traceD }}
                    transition={reduce ? { duration: 0 } : { pathLength: { duration: 1.1, ease: CHART_EASE }, d: transition }}
                  />
                </>
              )}
            </g>

            {/* last price marker */}
            {showTrace && lastPoint && (
              <motion.g initial={false} animate={{ x: lastPoint.x, y: lastPoint.y }} transition={transition}>
                <circle r={4.5} className="fill-foreground stroke-background" strokeWidth={2} />
              </motion.g>
            )}

            {/* hover cell */}
            {hover && hoverCol && (
              <g className="pointer-events-none">
                <rect
                  x={hc * colW}
                  y={0}
                  width={colW}
                  height={plotH}
                  className="fill-foreground/5"
                />
                <rect
                  x={hc * colW + 0.5}
                  y={hr * rowH + 0.5}
                  width={Math.max(0, colW - 1)}
                  height={Math.max(0, rowH - 1)}
                  rx={Math.min(2, rowH / 4)}
                  fill="none"
                  strokeWidth={1.5}
                  className="stroke-foreground"
                />
              </g>
            )}

            {/* price axis */}
            {prices.map((p, i) =>
              i % labelEvery === 0 ? (
                <text
                  key={p}
                  x={plotW + 8}
                  y={(i + 0.5) * rowH}
                  dominantBaseline="middle"
                  className={cn(
                    "text-[10px] tabular-nums transition-colors",
                    hover && hr === i ? "fill-foreground font-medium" : "fill-muted-foreground"
                  )}
                >
                  {formatPrice(p)}
                </text>
              ) : null
            )}

            {/* time axis */}
            {columns.length > 0 && (
              <g className="fill-muted-foreground text-[10px] tabular-nums">
                <text x={0} y={plotH + 14}>
                  {columns[0].label}
                </text>
                {columns.length > 2 && (
                  <text x={plotW / 2} y={plotH + 14} textAnchor="middle">
                    {columns[Math.floor(columns.length / 2)].label}
                  </text>
                )}
                <text x={plotW} y={plotH + 14} textAnchor="end">
                  {columns[columns.length - 1].label}
                </text>
              </g>
            )}
          </svg>
        )}

        <ChartTooltip
          open={!!hover && !!hoverCol}
          x={(hc + 0.5) * colW}
          y={(hr + 0.5) * rowH}
          bounds={size}
          side="top"
        >
          {hoverCol && hoverPrice !== undefined && (
            <>
              <ChartTooltipTitle>{hoverCol.label}</ChartTooltipTitle>
              <ChartTooltipRow
                color={heatFill(intensity(hoverSize ?? 0), lowColor, highColor)}
                label={`@ ${formatPrice(hoverPrice)}`}
                value={`${formatSize(hoverSize ?? 0)}${unit ? ` ${unit}` : ""}`}
              />
              <ChartTooltipRow
                label="Share of peak"
                value={`${maximum ? Math.round(((hoverSize ?? 0) / maximum) * 100) : 0}%`}
              />
              {hoverCol.price !== undefined && (
                <ChartTooltipRow label="Traded" value={formatPrice(hoverCol.price)} />
              )}
            </>
          )}
        </ChartTooltip>
      </div>

      {showLegend && (
        <LiquidityHeatmapLegend
          lowColor={lowColor}
          highColor={highColor}
          stops={legendStops}
          max={maximum}
          formatSize={formatSize}
          unit={unit}
        />
      )}

      <ChartDataTable
        caption={`${label} data`}
        columns={["Time", "Traded", "Deepest level", "Size"]}
        rows={columns.map((c) => {
          let best: [number, number] = [NaN, 0]
          c.levels.forEach((s, p) => {
            if (s > best[1]) best = [p, s]
          })
          return [
            c.label,
            c.price !== undefined ? formatPrice(c.price) : "",
            Number.isFinite(best[0]) ? formatPrice(best[0]) : "",
            formatSize(best[1]),
          ]
        })}
      />
    </div>
  )
}

function LiquidityHeatmapLegend({
  lowColor = "var(--chart-1, var(--primary))",
  highColor = "var(--chart-3, var(--warning))",
  stops = [0, 0.25, 0.5, 0.75, 1],
  max,
  formatSize = formatCompact,
  unit,
  className,
  ...props
}: Omit<React.ComponentProps<"div">, "children"> & {
  lowColor?: string
  highColor?: string
  stops?: readonly number[]
  max?: number
  formatSize?: (size: number) => string
  unit?: string
}) {
  const gradient = `linear-gradient(90deg, ${stops
    .map((t) => `${heatFill(t, lowColor, highColor)} ${t * 100}%`)
    .join(", ")})`
  return (
    <div
      data-slot="liquidity-heatmap-legend"
      className={cn("flex items-center gap-2 text-[11px] text-muted-foreground tabular-nums", className)}
      {...props}
    >
      <span>Thin</span>
      <span className="h-2 w-32 rounded-full bg-muted shadow-well" style={{ backgroundImage: gradient }} />
      <span>Deep{max ? ` · ${formatSize(max)}${unit ? ` ${unit}` : ""}` : ""}</span>
      <span className="ml-auto inline-flex items-center gap-1.5">
        <span className="h-0.5 w-4 rounded-full bg-foreground" aria-hidden />
        Price
      </span>
    </div>
  )
}

/** Deterministic order-book-like snapshots for demos and tests. */
function generateLiquiditySnapshots(
  count: number,
  {
    seed = 3,
    start = 100,
    step = 0.5,
    bands = 24,
    startTime = Date.UTC(2026, 0, 15, 14, 0),
    interval = 60_000,
    rand,
  }: {
    seed?: number
    start?: number
    step?: number
    bands?: number
    startTime?: number
    interval?: number
    rand?: () => number
  } = {}
): LiquiditySnapshot[] {
  const r = rand ?? seededRandom(seed)
  const base = Math.round(start / step) * step
  const lo = base - (bands / 2) * step
  // a few persistent walls that drift in and out
  const walls = Array.from({ length: 4 }, () => ({
    price: lo + Math.floor(r() * bands) * step,
    size: 0.6 + r() * 0.8,
    life: 0.3 + r() * 0.7,
  }))
  let price = base
  const out: LiquiditySnapshot[] = []
  for (let i = 0; i < count; i++) {
    price = clamp(price + (r() - 0.5) * step * 1.6, lo + step, lo + (bands - 2) * step)
    const levels: LiquidityLevel[] = []
    for (let b = 0; b < bands; b++) {
      const p = Number((lo + b * step).toFixed(6))
      const dist = Math.abs(p - price) / step
      let s = (0.15 + r() * 0.25) * Math.exp(-dist / 9)
      for (const w of walls) {
        if (Math.abs(w.price - p) < step / 2 && (i / count < w.life || r() > 0.6)) s += w.size * (0.7 + r() * 0.4)
      }
      levels.push({ price: p, size: Math.round(s * 1000) / 10 })
    }
    const t = startTime + i * interval
    out.push({
      id: t,
      label: new Date(t).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "UTC" }),
      levels,
      price: Number(price.toFixed(2)),
    })
  }
  return out
}

export {
  LiquidityHeatmap,
  LiquidityHeatmapLegend,
  buildLiquidityModel,
  generateLiquiditySnapshots,
  type LiquidityHeatmapProps,
  type LiquiditySnapshot,
  type LiquidityLevel,
}
