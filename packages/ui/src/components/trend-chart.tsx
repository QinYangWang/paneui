"use client"

import * as React from "react"
import { motion, useReducedMotion } from "motion/react"

import { cn } from "@paneui/ui/lib/utils"
import { useLocale } from "@paneui/ui/components/locale-provider"
import {
  chartAlpha,
  chartColor,
  ChartDataTable,
  ChartLegend,
  ChartLegendItem,
  ChartTooltip,
  ChartTooltipRow,
  ChartTooltipTitle,
  formatCompact,
  formatNumber,
  niceDomain,
  scaleBand,
  scaleLinear,
  useChartId,
  useChartSize,
} from "@paneui/ui/components/chart-utils"

/*
 * Values over time (or any ordered categories) as an area, line or bar chart,
 * with a value axis, gridlines, a hover crosshair + tooltip and a legend that
 * toggles series. `stacked` stacks areas and bars.
 *
 *   <TrendChart
 *     series={[{ id: "pro", label: "Pro" }, { id: "team", label: "Team" }]}
 *     data={[{ label: "Jan", values: { pro: 120, team: 80 } }, …]}
 *     variant="area"
 *     stacked
 *     formatValue={(v) => `$${v}`}
 *   />
 *
 * Colours default to the chart palette (chart-1…); pass `color` per series to
 * pin one. For shares of a whole use CompositionChart; for parts of one total,
 * DonutChart.
 */

type TrendSeries = { id: string; label: string; color?: string }
type TrendPoint = { label: string; values: Record<string, number> }

type TrendChartProps = Omit<React.ComponentProps<"figure">, "children"> & {
  series: readonly TrendSeries[]
  data: readonly TrendPoint[]
  variant?: "area" | "line" | "bar"
  stacked?: boolean
  /** Plot height in px (legend excluded). Default 240. */
  height?: number
  /** Tooltip / screen-reader values. */
  formatValue?: (value: number) => string
  /** Axis tick labels. Default compact (1.2k). */
  formatAxis?: (value: number) => string
  /** Most x labels to print; the rest are skipped evenly. Default 6. */
  maxXLabels?: number
  showLegend?: boolean
  showYAxis?: boolean
  /** Accessible name (also the hidden data table's caption). */
  label?: string
  defaultHidden?: readonly string[]
}

const M = { top: 8, right: 8, bottom: 24, left: 44 }

function TrendChart({
  series,
  data,
  variant = "area",
  stacked = false,
  height = 240,
  formatValue = formatNumber,
  formatAxis = formatCompact,
  maxXLabels = 6,
  showLegend = true,
  showYAxis = true,
  label: labelProp,
  defaultHidden = [],
  className,
  ...props
}: TrendChartProps) {
  const { labels } = useLocale()
  const label = labelProp ?? labels.chart
  const reduce = useReducedMotion()
  const id = useChartId("trend")
  const [ref, size] = useChartSize<HTMLDivElement>()
  const [hidden, setHidden] = React.useState<string[]>(() => [...defaultHidden])
  const [hover, setHover] = React.useState<number | null>(null)

  const colored = React.useMemo(() => series.map((s, i) => ({ ...s, color: s.color ?? chartColor(i) })), [series])
  const visible = colored.filter((s) => !hidden.includes(s.id))
  const val = (p: TrendPoint, sid: string) => {
    const v = p.values[sid]
    return Number.isFinite(v) ? v : 0
  }

  const left = showYAxis ? M.left : 8
  const w = Math.max(0, size.width - left - M.right)
  const h = Math.max(0, height - M.top - M.bottom)

  // stacked baselines per point: [start, end] for each visible series
  const spans = React.useMemo(
    () =>
      data.map((p) => {
        let acc = 0
        const out: Record<string, [number, number]> = {}
        for (const s of visible) {
          const v = val(p, s.id)
          out[s.id] = stacked ? [acc, (acc += v)] : [0, v]
        }
        return out
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- visible is derived from colored + hidden
    [data, stacked, colored, hidden]
  )
  const max = Math.max(1, ...spans.flatMap((sp) => Object.values(sp).map((r) => r[1])))
  const domain = niceDomain([0, max], 4)
  const y = scaleLinear(domain, [h, 0])
  const ticks = y.ticks(4)

  const n = data.length
  const band = scaleBand(n, [0, w], 0.28)
  const xAt = (i: number) => (variant === "bar" ? band(i) + band.bandwidth / 2 : n <= 1 ? w / 2 : (i / (n - 1)) * w)
  const labelEvery = Math.max(1, Math.ceil(n / Math.max(1, maxXLabels)))

  const onMove = (e: React.PointerEvent<SVGRectElement>) => {
    if (!n || w <= 0) return
    const box = e.currentTarget.getBoundingClientRect()
    const px = e.clientX - box.left
    const i = variant === "bar" ? band.indexAt(px) : Math.round((px / w) * (n - 1))
    setHover(Math.min(n - 1, Math.max(0, i)))
  }

  const linePath = (sid: string, end: 0 | 1) =>
    data.map((_, i) => `${i ? "L" : "M"}${xAt(i).toFixed(2)} ${y(spans[i][sid]?.[end] ?? 0).toFixed(2)}`).join(" ")
  const areaPath = (sid: string) => {
    const top = data.map((_, i) => `${i ? "L" : "M"}${xAt(i).toFixed(2)} ${y(spans[i][sid]?.[1] ?? 0).toFixed(2)}`).join(" ")
    const bottom = data
      .map((_, i) => n - 1 - i)
      .map((i) => `L${xAt(i).toFixed(2)} ${y(spans[i][sid]?.[0] ?? 0).toFixed(2)}`)
      .join(" ")
    return `${top} ${bottom} Z`
  }

  const hp = hover != null ? data[hover] : null
  const tipX = hover != null ? left + xAt(hover) : 0
  const tipY = hover != null ? M.top + y(Math.max(...visible.map((s) => spans[hover]?.[s.id]?.[1] ?? 0), 0)) : 0
  const revealKey = `${variant}-${stacked}-${n}`

  return (
    <figure data-slot="trend-chart" data-variant={variant} className={cn("flex min-w-0 flex-col gap-3", className)} {...props} aria-label={props["aria-label"] ?? label}>
      <div ref={ref} className="relative w-full" style={{ height }}>
        {size.width > 0 && (
          <svg width={size.width} height={height} aria-hidden className="block overflow-visible">
            <defs>
              <clipPath id={`${id}-clip`}>
                <motion.rect
                  key={revealKey}
                  x={0}
                  y={-M.top}
                  height={height}
                  initial={reduce ? { width: w } : { width: 0 }}
                  animate={{ width: w + 1 }}
                  transition={reduce ? { duration: 0 } : { duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                />
              </clipPath>
              {visible.map((s) => (
                <linearGradient key={s.id} id={`${id}-fill-${s.id}`} x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor={s.color} stopOpacity={stacked ? 0.4 : 0.28} />
                  <stop offset="100%" stopColor={s.color} stopOpacity={stacked ? 0.22 : 0.02} />
                </linearGradient>
              ))}
            </defs>
            <g transform={`translate(${left} ${M.top})`}>
              {/* grid + y axis */}
              {ticks.map((t) => (
                <g key={t}>
                  <line x1={0} x2={w} y1={y(t)} y2={y(t)} className="stroke-border" strokeDasharray={t === 0 ? undefined : "2 3"} />
                  {showYAxis && (
                    <text x={-8} y={y(t)} dy="0.32em" textAnchor="end" className="fill-muted-foreground text-ui-xs tabular-nums">
                      {formatAxis(t)}
                    </text>
                  )}
                </g>
              ))}
              {/* x labels */}
              {data.map((p, i) =>
                i % labelEvery === 0 || (variant !== "bar" && i === n - 1 && (n - 1) % labelEvery > labelEvery / 2) ? (
                  <text
                    key={`x${i}`}
                    x={xAt(i)}
                    y={h + 16}
                    textAnchor={variant === "bar" ? "middle" : i === 0 ? "start" : i === n - 1 ? "end" : "middle"}
                    className="fill-muted-foreground text-ui-xs"
                  >
                    {p.label}
                  </text>
                ) : null
              )}

              {variant === "bar" && hover != null && (
                <rect x={band(hover) - (band.step - band.bandwidth) / 2} y={0} width={band.step} height={h} rx={4} className="fill-foreground/4" />
              )}

              <g clipPath={`url(#${id}-clip)`}>
                {variant === "bar"
                  ? visible.map((s, si) =>
                      data.map((_, i) => {
                        const [a, b] = spans[i][s.id] ?? [0, 0]
                        const bw = stacked ? band.bandwidth : band.bandwidth / Math.max(1, visible.length)
                        const bx = stacked ? band(i) : band(i) + si * bw
                        const top = y(b)
                        const bh = Math.max(0, y(a) - top)
                        const isTop = !stacked || si === visible.length - 1
                        return (
                          <rect
                            key={`${s.id}-${i}`}
                            x={bx + (stacked ? 0 : 0.5)}
                            y={top}
                            width={Math.max(1, bw - (stacked ? 0 : 1))}
                            height={bh}
                            rx={isTop ? Math.min(3, bw / 2) : 0}
                            style={{ fill: hover == null || hover === i ? s.color : chartAlpha(s.color, 55) }}
                            className="transition-[fill] duration-150"
                          />
                        )
                      })
                    )
                  : [...visible].reverse().map((s) => (
                      <g key={s.id}>
                        {variant === "area" && <path d={areaPath(s.id)} fill={`url(#${id}-fill-${s.id})`} />}
                        <path
                          d={linePath(s.id, 1)}
                          fill="none"
                          stroke={s.color}
                          strokeWidth={1.75}
                          strokeLinejoin="round"
                          strokeLinecap="round"
                        />
                      </g>
                    ))}
              </g>

              {variant !== "bar" && hover != null && (
                <g pointerEvents="none">
                  <line x1={xAt(hover)} x2={xAt(hover)} y1={0} y2={h} className="stroke-foreground/20" />
                  {visible.map((s) => (
                    <circle
                      key={s.id}
                      cx={xAt(hover)}
                      cy={y(spans[hover][s.id]?.[1] ?? 0)}
                      r={3.5}
                      fill={s.color}
                      className="stroke-card"
                      strokeWidth={2}
                    />
                  ))}
                </g>
              )}

              <rect
                x={0}
                y={0}
                width={w}
                height={h}
                fill="transparent"
                onPointerMove={onMove}
                onPointerDown={onMove}
                onPointerLeave={() => setHover(null)}
              />
            </g>
          </svg>
        )}
        <ChartTooltip open={hp != null} x={tipX} y={tipY} bounds={{ width: size.width, height }}>
          {hp && (
            <>
              <ChartTooltipTitle>{hp.label}</ChartTooltipTitle>
              {visible.map((s) => (
                <ChartTooltipRow key={s.id} color={s.color} label={s.label} value={formatValue(val(hp, s.id))} />
              ))}
              {stacked && visible.length > 1 && (
                <ChartTooltipRow label={labels.total} value={formatValue(visible.reduce((sum, s) => sum + val(hp, s.id), 0))} />
              )}
            </>
          )}
        </ChartTooltip>
      </div>

      {showLegend && colored.length > 1 && (
        <ChartLegend>
          {colored.map((s) => {
            const off = hidden.includes(s.id)
            return (
              <ChartLegendItem
                key={s.id}
                color={s.color}
                inactive={off}
                aria-pressed={!off}
                onClick={() =>
                  setHidden((hd) => (off ? hd.filter((x) => x !== s.id) : hd.length >= colored.length - 1 ? hd : [...hd, s.id]))
                }
              >
                {s.label}
              </ChartLegendItem>
            )
          })}
        </ChartLegend>
      )}

      <ChartDataTable
        caption={label}
        columns={["", ...colored.map((s) => s.label)]}
        rows={data.map((p) => [p.label, ...colored.map((s) => formatValue(val(p, s.id)))])}
      />
    </figure>
  )
}

export { TrendChart }
export type { TrendChartProps, TrendSeries, TrendPoint }
