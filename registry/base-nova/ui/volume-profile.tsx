"use client"

import * as React from "react"
import { motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"
import {
  ChartDataTable,
  ChartNumber,
  ChartTooltip,
  ChartTooltipRow,
  ChartTooltipTitle,
  chartAlpha,
  clamp,
  formatCompact,
  formatPercent,
  useActiveId,
  useChartSize,
  useChartTransition,
} from "@/registry/base-nova/ui/chart-utils"

type VolumeProfileDatum = {
  /** Trade or level price. */
  price: number
  volume: number
  /** Optional aggressive-buy part of `volume`, drawn as a two-tone bar. */
  buyVolume?: number
}

type VolumeProfileRow = {
  id: string
  index: number
  priceLow: number
  priceHigh: number
  volume: number
  buyVolume: number
  share: number
  isPoc: boolean
  inValueArea: boolean
}

type VolumeProfileModel = {
  rows: VolumeProfileRow[]
  total: number
  poc: VolumeProfileRow | null
  vah: number
  val: number
}

/** Bin levels into `bins` price rows, find the POC and expand the value area around it. */
function buildProfile(
  data: readonly VolumeProfileDatum[],
  bins: number,
  valueArea: number
): VolumeProfileModel {
  const valid = data.filter((d) => Number.isFinite(d.price) && Number.isFinite(d.volume) && d.volume > 0)
  if (!valid.length) return { rows: [], total: 0, poc: null, vah: 0, val: 0 }
  let lo = Infinity
  let hi = -Infinity
  for (const d of valid) {
    lo = Math.min(lo, d.price)
    hi = Math.max(hi, d.price)
  }
  if (lo === hi) hi = lo + 1
  const n = Math.max(1, Math.round(bins))
  const step = (hi - lo) / n
  const vol = new Array<number>(n).fill(0)
  const buy = new Array<number>(n).fill(0)
  for (const d of valid) {
    const i = clamp(Math.floor((d.price - lo) / step), 0, n - 1)
    vol[i] += d.volume
    buy[i] += clamp(d.buyVolume ?? 0, 0, d.volume)
  }
  const total = vol.reduce((a, b) => a + b, 0)
  let pocIndex = 0
  vol.forEach((v, i) => {
    if (v > vol[pocIndex]) pocIndex = i
  })

  // Classic value-area walk: from the POC, keep adding the heavier neighbour.
  const inVA = new Array<boolean>(n).fill(false)
  inVA[pocIndex] = true
  let acc = vol[pocIndex]
  let up = pocIndex + 1
  let down = pocIndex - 1
  while (acc < total * valueArea && (up < n || down >= 0)) {
    const vu = up < n ? vol[up] : -1
    const vd = down >= 0 ? vol[down] : -1
    if (vu >= vd) {
      inVA[up] = true
      acc += vu
      up++
    } else {
      inVA[down] = true
      acc += vd
      down--
    }
  }

  const rows: VolumeProfileRow[] = vol.map((v, i) => ({
    id: `row-${i}`,
    index: i,
    priceLow: lo + i * step,
    priceHigh: lo + (i + 1) * step,
    volume: v,
    buyVolume: buy[i],
    share: total ? v / total : 0,
    isPoc: i === pocIndex,
    inValueArea: inVA[i],
  }))
  const vaRows = rows.filter((r) => r.inValueArea)
  return {
    rows,
    total,
    poc: rows[pocIndex],
    vah: Math.max(...vaRows.map((r) => r.priceHigh)),
    val: Math.min(...vaRows.map((r) => r.priceLow)),
  }
}

type VolumeProfileProps = Omit<React.ComponentProps<"section">, "children"> & {
  data: readonly VolumeProfileDatum[]
  label?: string
  /** Number of price rows. */
  bins?: number
  /** Fraction of volume inside the value area (0..1), or false to hide it. */
  valueArea?: number | false
  height?: number
  unit?: string
  formatPrice?: (price: number) => string
  formatVolume?: (volume: number) => string
  color?: string
  pocColor?: string
  showSummary?: boolean
  activeId?: string | null
  defaultActiveId?: string | null
  onActiveChange?: (id: string | null) => void
}

const defaultPrice = (p: number) =>
  p.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })

function VolumeProfile({
  data,
  label = "Volume profile",
  bins = 24,
  valueArea = 0.7,
  height = 340,
  unit = "contracts",
  formatPrice = defaultPrice,
  formatVolume = formatCompact,
  color = "var(--chart-1, var(--primary))",
  pocColor = "var(--chart-3, var(--warning))",
  showSummary = true,
  activeId: activeIdProp,
  defaultActiveId,
  onActiveChange,
  className,
  ...props
}: VolumeProfileProps) {
  const [ref, size] = useChartSize<HTMLDivElement>()
  const [activeId, setActiveId] = useActiveId(activeIdProp, defaultActiveId, onActiveChange)
  const reduce = useReducedMotion()
  const transition = useChartTransition()
  const model = React.useMemo(
    () => buildProfile(data, bins, valueArea === false ? 0 : clamp(valueArea, 0, 1)),
    [data, bins, valueArea]
  )
  const hasVA = valueArea !== false

  const axisW = 64
  const width = size.width
  const plotW = Math.max(0, width - axisW)
  const n = model.rows.length
  const rowH = n ? height / n : 0
  const barGap = Math.min(3, rowH * 0.25)
  const maxVol = Math.max(1, ...model.rows.map((r) => r.volume))
  // Rows are drawn top = highest price.
  const rowY = (i: number) => (n - 1 - i) * rowH
  const priceY = (p: number) => {
    if (!n) return 0
    const lo = model.rows[0].priceLow
    const hi = model.rows[n - 1].priceHigh
    return ((hi - p) / (hi - lo)) * height
  }

  const active = model.rows.find((r) => r.id === activeId) ?? null

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!n) return
    const cur = active?.index ?? model.poc?.index ?? 0
    let next = cur
    if (e.key === "ArrowUp") next = cur + 1
    else if (e.key === "ArrowDown") next = cur - 1
    else if (e.key === "Home") next = n - 1
    else if (e.key === "End") next = 0
    else if (e.key === "Escape") return setActiveId(null)
    else return
    e.preventDefault()
    setActiveId(model.rows[clamp(next, 0, n - 1)].id)
  }

  const level = (r: VolumeProfileRow) =>
    r.isPoc ? "Point of control" : !hasVA ? "—" : r.inValueArea ? "Inside value area" : "Outside value area"

  return (
    <section
      aria-label={label}
      data-slot="volume-profile"
      className={cn("w-full min-w-0 space-y-4", className)}
      {...props}
    >
      <div
        ref={ref}
        tabIndex={0}
        role="img"
        aria-label={`${label}. Use up and down arrow keys to inspect price rows.`}
        onKeyDown={onKeyDown}
        onBlur={() => setActiveId(null)}
        onPointerLeave={() => setActiveId(null)}
        onPointerMove={(e) => {
          const box = ref.current?.getBoundingClientRect()
          if (!box || !n) return
          const py = e.clientY - box.top
          const i = clamp(n - 1 - Math.floor(py / rowH), 0, n - 1)
          const id = model.rows[i].id
          if (id !== activeId) setActiveId(id)
        }}
        className="relative w-full touch-pan-y rounded-xl outline-none select-none focus-visible:ring-2 focus-visible:ring-ring"
        style={{ height }}
      >
        {width > 0 && n > 0 && (
          <svg width={width} height={height} className="block overflow-visible" aria-hidden>
            {/* value area band */}
            {hasVA && (
              <motion.rect
                x={0}
                width={plotW}
                initial={false}
                animate={{ y: priceY(model.vah), height: priceY(model.val) - priceY(model.vah) }}
                transition={transition}
                rx={8}
                style={{ fill: chartAlpha(color, 8) }}
              />
            )}

            {model.rows.map((r) => {
              const w = (r.volume / maxVol) * (plotW - 8)
              const bw = r.volume ? (r.buyVolume / r.volume) * w : 0
              const barColor = r.isPoc ? pocColor : color
              const dim = active ? active.id !== r.id : false
              const tone = r.isPoc ? 100 : hasVA && !r.inValueArea ? 38 : 72
              const yTop = rowY(r.index) + barGap / 2
              const h = Math.max(1, rowH - barGap)
              const delay = reduce ? 0 : Math.abs(r.index - (model.poc?.index ?? 0)) * 0.018
              return (
                <g key={r.id}>
                  <motion.rect
                    x={0}
                    rx={Math.min(4, h / 2)}
                    initial={{ width: 0, y: yTop, height: h }}
                    animate={{ width: Math.max(0, w), y: yTop, height: h, opacity: dim ? 0.45 : 1 }}
                    transition={{ ...transition, delay }}
                    style={{ fill: chartAlpha(barColor, tone) }}
                  />
                  {r.buyVolume > 0 && (
                    <motion.rect
                      x={0}
                      rx={Math.min(4, h / 2)}
                      initial={{ width: 0, y: yTop, height: h }}
                      animate={{ width: Math.max(0, bw), y: yTop, height: h, opacity: dim ? 0.45 : 1 }}
                      transition={{ ...transition, delay }}
                      style={{ fill: barColor }}
                    />
                  )}
                </g>
              )
            })}

            {/* VAH / VAL / POC guides */}
            {hasVA &&
              [
                { key: "vah", label: "VAH", price: model.vah },
                { key: "val", label: "VAL", price: model.val },
              ].map((g) => (
                <motion.g key={g.key} initial={false} animate={{ y: priceY(g.price) }} transition={transition}>
                  <line x1={0} x2={plotW} y1={0} y2={0} strokeDasharray="3 4" className="stroke-muted-foreground/50" />
                  <text
                    x={plotW + 8}
                    y={0}
                    dominantBaseline="middle"
                    className="fill-muted-foreground text-[10px] tabular-nums"
                  >
                    {g.label} {formatPrice(g.price)}
                  </text>
                </motion.g>
              ))}
            {model.poc && (
              <motion.g
                initial={false}
                animate={{ y: rowY(model.poc.index) + rowH / 2 }}
                transition={transition}
              >
                <line x1={0} x2={plotW} y1={0} y2={0} strokeWidth={1.5} style={{ stroke: pocColor }} />
                <rect x={plotW + 3} y={-9} width={axisW - 4} height={18} rx={9} style={{ fill: pocColor }} />
                <text
                  x={plotW + 1 + axisW / 2}
                  y={0}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="fill-white text-[10px] font-semibold tabular-nums"
                >
                  POC
                </text>
              </motion.g>
            )}

            {active && (
              <rect
                x={0}
                y={rowY(active.index)}
                width={plotW}
                height={rowH}
                rx={6}
                className="pointer-events-none fill-foreground/5 stroke-foreground/15"
              />
            )}
          </svg>
        )}

        <ChartTooltip
          open={!!active}
          side="right"
          x={active ? clamp(((active.volume / maxVol) * (plotW - 8)), 40, plotW - 40) : 0}
          y={active ? rowY(active.index) + rowH / 2 : 0}
          bounds={{ width, height }}
        >
          {active && (
            <>
              <ChartTooltipTitle className="tabular-nums">
                {formatPrice(active.priceLow)} – {formatPrice(active.priceHigh)}
              </ChartTooltipTitle>
              <ChartTooltipRow
                color={active.isPoc ? pocColor : color}
                label="Volume"
                value={<ChartNumber value={active.volume} format={formatVolume} />}
              />
              {active.buyVolume > 0 && (
                <ChartTooltipRow
                  label="Buy / sell"
                  value={`${formatPercent(active.buyVolume / active.volume, 0)} / ${formatPercent(1 - active.buyVolume / active.volume, 0)}`}
                />
              )}
              <ChartTooltipRow
                label="Share"
                value={<ChartNumber value={active.share} format={(v) => formatPercent(v)} />}
              />
              <p className="mt-1 text-muted-foreground">{level(active)}</p>
            </>
          )}
        </ChartTooltip>
      </div>

      {showSummary && model.poc && (
        <dl className="grid grid-cols-2 gap-1.5 rounded-2xl bg-muted/60 p-1.5 shadow-well sm:grid-cols-4">
          {[
            { k: "POC", v: formatPrice((model.poc.priceLow + model.poc.priceHigh) / 2), c: pocColor },
            ...(hasVA
              ? [
                  { k: "Value area high", v: formatPrice(model.vah), c: color },
                  { k: "Value area low", v: formatPrice(model.val), c: color },
                ]
              : []),
            { k: `Total (${unit})`, v: formatVolume(model.total) },
          ].map((item) => (
            <div
              key={item.k}
              className="rounded-xl bg-card bg-linear-to-b from-white/6 to-transparent px-3 py-2 shadow-raised"
            >
              <dt className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                {item.c && <span className="size-1.5 rounded-full" style={{ background: item.c }} />}
                {item.k}
              </dt>
              <dd className="mt-0.5 text-sm font-semibold text-foreground tabular-nums">{item.v}</dd>
            </div>
          ))}
        </dl>
      )}

      <ChartDataTable
        caption={`${label} data`}
        columns={["Price range", `Volume (${unit})`, "Share", "Level"]}
        rows={[...model.rows]
          .reverse()
          .map((r) => [
            `${formatPrice(r.priceLow)} to ${formatPrice(r.priceHigh)}`,
            formatVolume(r.volume),
            formatPercent(r.share),
            level(r),
          ])}
      />
    </section>
  )
}

export {
  VolumeProfile,
  buildProfile as buildVolumeProfile,
  type VolumeProfileProps,
  type VolumeProfileDatum,
  type VolumeProfileRow,
}
