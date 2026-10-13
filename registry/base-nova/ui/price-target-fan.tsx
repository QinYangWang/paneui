"use client"

import * as React from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"
import {
  CHART_EASE,
  ChartDataTable,
  ChartNumber,
  ChartTooltip,
  ChartTooltipRow,
  ChartTooltipTitle,
  chartAlpha,
  clamp,
  niceDomain,
  scaleLinear,
  useChartId,
  useChartSize,
  useChartTransition,
  type LinearScale,
} from "@/registry/base-nova/ui/chart-utils"

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

type PriceHistoryPoint = { /** UTC date, "YYYY-MM-DD". */ date: string; price: number }

type PriceTarget = {
  key: string
  label: string
  price: number
  /** Number of analysts behind this target. */
  analysts?: number
  color?: string
}

type PriceTargetFanActive =
  | { type: "history"; index: number }
  | { type: "forecast"; /** 0 = now, 1 = horizon. */ t: number }
  | { type: "target"; key: string }

type PriceTargetFanProps = Omit<React.ComponentProps<"div">, "children"> & {
  history: readonly PriceHistoryPoint[]
  /** Usually [high, average, low]; any count works, the fan spans the extremes. */
  targets: readonly PriceTarget[]
  /** Last traded price; defaults to the last history price. */
  current?: number
  /** Target date ("YYYY-MM-DD", UTC); defaults to 12 months after the last history date. */
  horizon?: string
  label?: string
  /** Ticker or name shown in the header. */
  symbol?: string
  formatPrice?: (v: number) => string
  active?: PriceTargetFanActive | null
  defaultActive?: PriceTargetFanActive | null
  onActiveChange?: (active: PriceTargetFanActive | null) => void
  children?: React.ReactNode
}

const DAY = 86_400_000
const utcDay = (iso: string) => {
  const [y, m, d] = iso.slice(0, 10).split("-").map(Number)
  return Date.UTC(y, (m || 1) - 1, d || 1)
}
const fmtDate = new Intl.DateTimeFormat("en-US", { timeZone: "UTC", month: "short", day: "numeric", year: "numeric" })
const fmtAxis = new Intl.DateTimeFormat("en-US", { timeZone: "UTC", month: "short", year: "2-digit" })
const defaultPrice = (v: number) =>
  v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
const pct = (from: number, to: number) => (from ? ((to - from) / from) * 100 : 0)
const signedPct = (v: number) => `${v >= 0 ? "+" : "−"}${Math.abs(v).toFixed(1)}%`

/* -------------------------------------------------------------------------- */
/*                                   Context                                  */
/* -------------------------------------------------------------------------- */

type ResolvedTarget = PriceTarget & { color: string; upside: number }

type RootCtx = {
  history: { time: number; date: string; price: number }[]
  targets: ResolvedTarget[]
  current: number
  nowTime: number
  horizonTime: number
  label: string
  symbol?: string
  formatPrice: (v: number) => string
  active: PriceTargetFanActive | null
  setActive: (a: PriceTargetFanActive | null) => void
  /** Price of each target at forecast fraction t (straight line from now). */
  projectAt: (t: number) => { target: ResolvedTarget; price: number }[]
}

type PlotCtx = {
  width: number
  height: number
  x: LinearScale
  y: LinearScale
  plot: { left: number; right: number; top: number; bottom: number }
  nowX: number
  nowY: number
}

const RootContext = React.createContext<RootCtx | null>(null)
const PlotContext = React.createContext<PlotCtx | null>(null)

function usePriceTargetFan() {
  const ctx = React.useContext(RootContext)
  if (!ctx) throw new Error("PriceTargetFan parts must be rendered inside <PriceTargetFan>.")
  return ctx
}
function usePriceTargetFanPlot() {
  const ctx = React.useContext(PlotContext)
  if (!ctx) throw new Error("This PriceTargetFan part must be rendered inside <PriceTargetFanPlot>.")
  return ctx
}

/* -------------------------------------------------------------------------- */
/*                                    Root                                    */
/* -------------------------------------------------------------------------- */

function PriceTargetFan({
  history: historyProp,
  targets: targetsProp,
  current: currentProp,
  horizon,
  label = "Analyst price targets",
  symbol,
  formatPrice = defaultPrice,
  active: activeProp,
  defaultActive = null,
  onActiveChange,
  className,
  children,
  ...props
}: PriceTargetFanProps) {
  const history = React.useMemo(
    () =>
      historyProp
        .filter((p) => Number.isFinite(p.price))
        .map((p) => ({ time: utcDay(p.date), date: p.date, price: p.price }))
        .sort((a, b) => a.time - b.time),
    [historyProp]
  )
  const current = currentProp ?? history[history.length - 1]?.price ?? 0
  const nowTime = history[history.length - 1]?.time ?? Date.UTC(2026, 0, 1)
  const horizonTime = horizon ? utcDay(horizon) : nowTime + 365 * DAY

  const targets = React.useMemo(() => {
    const sorted = [...targetsProp].filter((t) => Number.isFinite(t.price)).sort((a, b) => b.price - a.price)
    return sorted.map((t, i) => ({
      ...t,
      color:
        t.color ??
        (i === 0 ? "var(--success)" : i === sorted.length - 1 && sorted.length > 1 ? "var(--destructive)" : "var(--chart-1, var(--primary))"),
      upside: pct(current, t.price),
    }))
  }, [targetsProp, current])

  const [inner, setInner] = React.useState<PriceTargetFanActive | null>(defaultActive)
  const active = activeProp === undefined ? inner : activeProp
  const cb = React.useRef(onActiveChange)
  cb.current = onActiveChange
  const controlled = activeProp !== undefined
  const setActive = React.useCallback(
    (a: PriceTargetFanActive | null) => {
      if (!controlled) setInner(a)
      cb.current?.(a)
    },
    [controlled]
  )

  const projectAt = React.useCallback(
    (t: number) => targets.map((target) => ({ target, price: current + (target.price - current) * clamp(t, 0, 1) })),
    [targets, current]
  )

  const value: RootCtx = {
    history,
    targets,
    current,
    nowTime,
    horizonTime,
    label,
    symbol,
    formatPrice,
    active,
    setActive,
    projectAt,
  }

  return (
    <RootContext.Provider value={value}>
      <div data-slot="price-target-fan" className={cn("grid w-full min-w-0 gap-3", className)} {...props}>
        {children ?? (
          <>
            <PriceTargetFanHeader />
            <PriceTargetFanPlot />
          </>
        )}
        <ChartDataTable
          caption={`${label}: targets`}
          columns={["Target", "Price", "Change from current", "Analysts"]}
          rows={targets.map((t) => [t.label, formatPrice(t.price), signedPct(t.upside), t.analysts ?? ""])}
        />
      </div>
    </RootContext.Provider>
  )
}

/* -------------------------------------------------------------------------- */
/*                                   Header                                   */
/* -------------------------------------------------------------------------- */

function PriceTargetFanHeader({ className, children, ...props }: React.ComponentProps<"div">) {
  const { current, targets, active, history, formatPrice, symbol, projectAt, nowTime, horizonTime } = usePriceTargetFan()
  const mean = targets[Math.floor(targets.length / 2)]
  const analysts = Math.max(0, ...targets.map((t) => t.analysts ?? 0))

  let price = current
  let caption = "Current price"
  if (active?.type === "history" && history[active.index]) {
    price = history[active.index].price
    caption = fmtDate.format(history[active.index].time)
  } else if (active?.type === "forecast" && mean) {
    price = projectAt(active.t).find((p) => p.target.key === mean.key)?.price ?? current
    caption = `${mean.label} path · ${fmtDate.format(nowTime + (horizonTime - nowTime) * active.t)}`
  } else if (active?.type === "target") {
    const t = targets.find((x) => x.key === active.key)
    if (t) {
      price = t.price
      caption = `${t.label} target`
    }
  }
  const change = pct(current, price)

  return (
    <div
      data-slot="price-target-fan-header"
      className={cn("flex flex-wrap items-end justify-between gap-x-6 gap-y-2", className)}
      {...props}
    >
      <div className="min-w-0">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          {symbol && <span className="font-medium text-foreground">{symbol}</span>}
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={caption}
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -3 }}
              transition={{ duration: 0.16, ease: CHART_EASE }}
              className="truncate"
            >
              {caption}
            </motion.span>
          </AnimatePresence>
        </div>
        <div className="mt-0.5 flex items-baseline gap-2">
          <ChartNumber value={price} format={formatPrice} className="text-2xl font-semibold tracking-tight" />
          {active && (
            <span
              className="rounded-full px-2 py-0.5 text-xs font-medium shadow-chip tabular-nums"
              style={{
                color: change >= 0 ? "var(--success)" : "var(--destructive)",
                background: chartAlpha(change >= 0 ? "var(--success)" : "var(--destructive)", 12),
              }}
            >
              {signedPct(change)} vs now
            </span>
          )}
        </div>
      </div>
      {children ?? (
        mean && (
          <div className="text-right text-xs text-muted-foreground tabular-nums">
            <div>
              {mean.label} target <b className="font-semibold text-foreground">{formatPrice(mean.price)}</b>{" "}
              <span style={{ color: mean.upside >= 0 ? "var(--success)" : "var(--destructive)" }}>
                ({signedPct(mean.upside)})
              </span>
            </div>
            {analysts > 0 && <div className="mt-0.5">{analysts} analysts · 12-month horizon</div>}
          </div>
        )
      )}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*                                    Plot                                    */
/* -------------------------------------------------------------------------- */

type PriceTargetFanPlotProps = Omit<React.ComponentProps<"div">, "children"> & {
  height?: number
  /** SVG layers; defaults to Axes, Targets, History, Now and Cursor. */
  children?: React.ReactNode
  /** HTML overlay; defaults to the tooltip. */
  overlay?: React.ReactNode
}

function PriceTargetFanPlot({ height = 260, className, children, overlay, ...props }: PriceTargetFanPlotProps) {
  const { history, targets, current, nowTime, horizonTime, active, setActive, label } = usePriceTargetFan()
  const [ref, size] = useChartSize<HTMLDivElement>()
  const width = size.width
  const plot = { left: 44, right: Math.max(44, width - 104), top: 14, bottom: height - 24 }

  const [lo, hi] = React.useMemo(() => {
    const vals = [...history.map((h) => h.price), ...targets.map((t) => t.price), current]
    const l = Math.min(...vals)
    const h = Math.max(...vals)
    const pad = (h - l) * 0.08 || 1
    return niceDomain([l - pad, h + pad], 5)
  }, [history, targets, current])

  const startTime = history[0]?.time ?? nowTime - 365 * DAY
  const x = scaleLinear([startTime, horizonTime], [plot.left, plot.right])
  const y = scaleLinear([lo, hi], [plot.bottom, plot.top])
  const nowX = x(nowTime)
  const nowY = y(current)

  const forecastSteps = 12
  const indexFromPointer = (px: number): PriceTargetFanActive | null => {
    if (px <= nowX) {
      if (!history.length) return null
      const t = x.invert(px)
      let best = 0
      for (let i = 1; i < history.length; i++)
        if (Math.abs(history[i].time - t) < Math.abs(history[best].time - t)) best = i
      return { type: "history", index: best }
    }
    return { type: "forecast", t: clamp((px - nowX) / Math.max(1, plot.right - nowX), 0, 1) }
  }

  const onPointer = (e: React.PointerEvent) => {
    const box = ref.current?.getBoundingClientRect()
    if (!box) return
    const px = e.clientX - box.left
    if (px < plot.left - 8 || px > plot.right + 8) return
    if ((e.target as Element).closest?.("[data-target-label]")) return
    setActive(indexFromPointer(clamp(px, plot.left, plot.right)))
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    const last = history.length - 1
    const cur: PriceTargetFanActive =
      active && active.type !== "target" ? active : { type: "history", index: Math.max(0, last) }
    const step = e.shiftKey ? 5 : 1
    let next: PriceTargetFanActive | null = cur
    if (e.key === "ArrowLeft") {
      if (cur.type === "forecast") {
        const t = Math.round(cur.t * forecastSteps) - step
        next = t <= 0 ? { type: "history", index: Math.max(0, last) } : { type: "forecast", t: t / forecastSteps }
      } else next = { type: "history", index: clamp(cur.index - step, 0, Math.max(0, last)) }
    } else if (e.key === "ArrowRight") {
      if (cur.type === "history" && cur.index < last) next = { type: "history", index: clamp(cur.index + step, 0, last) }
      else {
        const t = cur.type === "forecast" ? Math.round(cur.t * forecastSteps) + step : step
        next = { type: "forecast", t: clamp(t, 0, forecastSteps) / forecastSteps }
      }
    } else if (e.key === "Home") next = { type: "history", index: 0 }
    else if (e.key === "End") next = { type: "forecast", t: 1 }
    else if (e.key === "Escape") next = null
    else return
    e.preventDefault()
    setActive(next)
  }

  const plotCtx: PlotCtx = { width, height, x, y, plot, nowX, nowY }

  return (
    <PlotContext.Provider value={plotCtx}>
      <div
        ref={ref}
        data-slot="price-target-fan-plot"
        tabIndex={0}
        role="img"
        aria-label={`${label}. Use left and right arrow keys to scrub history and the target projection.`}
        onPointerMove={onPointer}
        onPointerDown={onPointer}
        onPointerLeave={() => setActive(null)}
        onBlur={() => setActive(null)}
        onKeyDown={onKeyDown}
        className={cn(
          "relative w-full touch-pan-y rounded-xl outline-none select-none focus-visible:ring-2 focus-visible:ring-ring",
          className
        )}
        style={{ height }}
        {...props}
      >
        {width > 0 && (
          <svg width={width} height={height} className="block overflow-visible" aria-hidden>
            {children ?? (
              <>
                <PriceTargetFanAxes />
                <PriceTargetFanTargets />
                <PriceTargetFanHistory />
                <PriceTargetFanNow />
                <PriceTargetFanCursor />
              </>
            )}
          </svg>
        )}
        {width > 0 && (overlay ?? <PriceTargetFanTooltip />)}
      </div>
    </PlotContext.Provider>
  )
}

/* -------------------------------------------------------------------------- */
/*                                   Layers                                   */
/* -------------------------------------------------------------------------- */

function PriceTargetFanAxes({ className }: { className?: string }) {
  const { formatPrice, history, nowTime, horizonTime } = usePriceTargetFan()
  const { x, y, plot, nowX } = usePriceTargetFanPlot()
  const ticks = y.ticks(5)
  const start = history[0]?.time
  const mid = start !== undefined ? start + (nowTime - start) / 2 : undefined
  return (
    <g data-slot="price-target-fan-axes" className={className}>
      {/* forecast region tint */}
      <rect
        x={nowX}
        y={plot.top - 6}
        width={Math.max(0, plot.right - nowX)}
        height={plot.bottom - plot.top + 6}
        rx={10}
        className="fill-muted/60"
      />
      {ticks.map((t) => (
        <g key={t}>
          <line x1={plot.left} x2={plot.right} y1={y(t)} y2={y(t)} className="stroke-border" strokeDasharray="2 4" />
          <text
            x={plot.left - 8}
            y={y(t)}
            textAnchor="end"
            dominantBaseline="middle"
            className="fill-muted-foreground text-[10px] tabular-nums"
          >
            {formatPrice(t)}
          </text>
        </g>
      ))}
      <g className="fill-muted-foreground text-[10px] tabular-nums">
        {start !== undefined && (
          <text x={x(start)} y={plot.bottom + 16} textAnchor="start">
            {fmtAxis.format(start)}
          </text>
        )}
        {mid !== undefined && x(mid) - x(start ?? 0) > 60 && (
          <text x={x(mid)} y={plot.bottom + 16} textAnchor="middle">
            {fmtAxis.format(mid)}
          </text>
        )}
        <text x={nowX} y={plot.bottom + 16} textAnchor="middle" className="fill-foreground font-medium">
          Now
        </text>
        <text x={x(horizonTime)} y={plot.bottom + 16} textAnchor="end">
          {fmtAxis.format(horizonTime)}
        </text>
      </g>
    </g>
  )
}

function PriceTargetFanHistory({ className }: { className?: string }) {
  const { history, current, nowTime } = usePriceTargetFan()
  const { x, y, plot } = usePriceTargetFanPlot()
  const reduce = useReducedMotion()
  const gradId = useChartId("ptf-hist")
  const pts = history.map((h) => [x(h.time), y(h.price)] as const)
  if (pts.length && history[history.length - 1].time === nowTime) pts[pts.length - 1] = [x(nowTime), y(current)]
  if (!pts.length) return null
  const line = pts.map(([px, py], i) => `${i ? "L" : "M"}${px.toFixed(2)} ${py.toFixed(2)}`).join(" ")
  const area = `${line} L${pts[pts.length - 1][0].toFixed(2)} ${plot.bottom} L${pts[0][0].toFixed(2)} ${plot.bottom} Z`
  const color = "var(--foreground)"
  return (
    <g data-slot="price-target-fan-history" className={className}>
      <defs>
        <linearGradient id={gradId} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={chartAlpha("var(--chart-1, var(--primary))", 22)} />
          <stop offset="100%" stopColor={chartAlpha("var(--chart-1, var(--primary))", 0)} />
        </linearGradient>
      </defs>
      <motion.path
        d={area}
        fill={`url(#${gradId})`}
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1, d: area }}
        transition={reduce ? { duration: 0 } : { duration: 0.6, ease: CHART_EASE, delay: 0.4 }}
      />
      <motion.path
        d={line}
        fill="none"
        strokeWidth={1.75}
        strokeLinejoin="round"
        strokeLinecap="round"
        style={{ stroke: color }}
        initial={reduce ? false : { pathLength: 0 }}
        animate={{ pathLength: 1, d: line }}
        transition={reduce ? { duration: 0 } : { duration: 1, ease: CHART_EASE }}
      />
    </g>
  )
}

function PriceTargetFanTargets({ className }: { className?: string }) {
  const { targets, formatPrice, active, setActive } = usePriceTargetFan()
  const { x, y, nowX, nowY, plot } = usePriceTargetFanPlot()
  const { horizonTime } = usePriceTargetFan()
  const reduce = useReducedMotion()
  const transition = useChartTransition()
  const gradId = useChartId("ptf-fan")
  if (!targets.length) return null
  const hx = x(horizonTime)
  const top = targets[0]
  const bottom = targets[targets.length - 1]
  const fan = `M${nowX} ${nowY} L${hx} ${y(top.price)} L${hx} ${y(bottom.price)} Z`
  const collapsed = `M${nowX} ${nowY} L${nowX} ${nowY} L${nowX} ${nowY} Z`
  const activeKey = active?.type === "target" ? active.key : null

  // Spread labels so they never overlap.
  const labelH = 20
  const ys = targets.map((t) => y(t.price))
  for (let i = 1; i < ys.length; i++) if (ys[i] - ys[i - 1] < labelH + 2) ys[i] = ys[i - 1] + labelH + 2
  for (let i = ys.length - 1; i >= 0; i--) {
    const max = plot.bottom - labelH / 2 - (ys.length - 1 - i) * (labelH + 2)
    if (ys[i] > max) ys[i] = max
  }

  return (
    <g data-slot="price-target-fan-targets" className={className}>
      <defs>
        <linearGradient id={gradId} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor={chartAlpha("var(--chart-1, var(--primary))", 4)} />
          <stop offset="100%" stopColor={chartAlpha("var(--chart-1, var(--primary))", 22)} />
        </linearGradient>
      </defs>
      <motion.path
        d={fan}
        fill={`url(#${gradId})`}
        initial={reduce ? false : { d: collapsed }}
        animate={{ d: fan }}
        transition={reduce ? { duration: 0 } : { duration: 0.8, ease: CHART_EASE, delay: 0.6 }}
      />
      {targets.map((t, i) => {
        const ty = y(t.price)
        const dim = activeKey !== null && activeKey !== t.key
        return (
          <g key={t.key}>
            <motion.line
              x1={nowX}
              y1={nowY}
              initial={reduce ? false : { x2: nowX, y2: nowY }}
              animate={{ x1: nowX, y1: nowY, x2: hx, y2: ty, opacity: dim ? 0.3 : 1 }}
              transition={reduce ? { duration: 0 } : { ...transition, delay: 0.6 + i * 0.06, opacity: { duration: 0.2 } }}
              strokeWidth={activeKey === t.key ? 2 : 1.5}
              strokeDasharray="4 4"
              strokeLinecap="round"
              style={{ stroke: t.color }}
            />
            <motion.circle
              r={4}
              strokeWidth={2}
              className="stroke-background"
              style={{ fill: t.color }}
              initial={reduce ? false : { cx: nowX, cy: nowY, opacity: 0 }}
              animate={{ cx: hx, cy: ty, opacity: dim ? 0.4 : 1 }}
              transition={reduce ? { duration: 0 } : { ...transition, delay: 0.6 + i * 0.06 }}
            />
            {/* label pill */}
            <motion.g
              data-target-label
              role="button"
              tabIndex={-1}
              initial={reduce ? false : { opacity: 0, x: hx + 10, y: ys[i] }}
              animate={{ opacity: dim ? 0.45 : 1, x: hx + 10, y: ys[i] }}
              transition={reduce ? { duration: 0 } : { ...transition, delay: 0.8 + i * 0.06, opacity: { duration: 0.2 } }}
              className="cursor-default"
              onPointerEnter={() => setActive({ type: "target", key: t.key })}
              onPointerLeave={() => setActive(null)}
            >
              <rect x={0} y={-labelH / 2} width={90} height={labelH} rx={labelH / 2} className="fill-secondary" />
              <rect
                x={0.5}
                y={-labelH / 2 + 0.5}
                width={89}
                height={labelH - 1}
                rx={labelH / 2}
                fill="none"
                strokeWidth={1}
                style={{ stroke: chartAlpha(t.color, 45) }}
              />
              <circle cx={10} cy={0} r={3} style={{ fill: t.color }} />
              <text x={18} y={0} dominantBaseline="central" className="fill-muted-foreground text-[10px] font-medium">
                {t.label}
              </text>
              <text
                x={84}
                y={0}
                textAnchor="end"
                dominantBaseline="central"
                className="fill-foreground text-[10px] font-semibold tabular-nums"
              >
                {formatPrice(t.price)}
              </text>
            </motion.g>
          </g>
        )
      })}
    </g>
  )
}

function PriceTargetFanNow({ className }: { className?: string }) {
  const { nowX, nowY, plot } = usePriceTargetFanPlot()
  const reduce = useReducedMotion()
  const transition = useChartTransition()
  return (
    <motion.g
      data-slot="price-target-fan-now"
      className={className}
      initial={false}
      animate={{ x: nowX, y: nowY }}
      transition={transition}
    >
      <line x1={0} x2={0} y1={plot.top - 6 - nowY} y2={plot.bottom - nowY} className="stroke-foreground/25" strokeDasharray="2 3" />
      {!reduce && (
        <motion.circle
          r={5}
          className="fill-foreground/20"
          animate={{ r: [5, 12], opacity: [0.6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
        />
      )}
      <circle r={5} className="fill-foreground stroke-background" strokeWidth={2} />
    </motion.g>
  )
}

function PriceTargetFanCursor({ className }: { className?: string }) {
  const { active, history, projectAt } = usePriceTargetFan()
  const { x, y, plot, nowX } = usePriceTargetFanPlot()
  if (!active || active.type === "target") return null
  let cx: number
  let dots: { y: number; color: string }[]
  if (active.type === "history") {
    const h = history[active.index]
    if (!h) return null
    cx = x(h.time)
    dots = [{ y: y(h.price), color: "var(--foreground)" }]
  } else {
    cx = nowX + (plot.right - nowX) * active.t
    dots = projectAt(active.t).map((p) => ({ y: y(p.price), color: p.target.color }))
  }
  return (
    <g data-slot="price-target-fan-cursor" className={cn("pointer-events-none", className)}>
      <line x1={cx} x2={cx} y1={plot.top - 6} y2={plot.bottom} className="stroke-foreground/40" strokeDasharray="3 3" />
      {dots.map((d, i) => (
        <circle key={i} cx={cx} cy={d.y} r={4} strokeWidth={2} className="stroke-background" style={{ fill: d.color }} />
      ))}
    </g>
  )
}

/* -------------------------------------------------------------------------- */
/*                                   Tooltip                                  */
/* -------------------------------------------------------------------------- */

function PriceTargetFanTooltip({
  className,
  children,
}: {
  className?: string
  /** Custom body; receives the active item. */
  children?: (active: PriceTargetFanActive) => React.ReactNode
}) {
  const { active, history, targets, current, formatPrice, projectAt, nowTime, horizonTime } = usePriceTargetFan()
  const { x, y, plot, nowX, width, height } = usePriceTargetFanPlot()
  let ax = 0
  let ay = 0
  let body: React.ReactNode = null
  if (active?.type === "history" && history[active.index]) {
    const h = history[active.index]
    ax = x(h.time)
    ay = y(h.price)
    body = (
      <>
        <ChartTooltipTitle>{fmtDate.format(h.time)}</ChartTooltipTitle>
        <ChartTooltipRow color="var(--foreground)" label="Close" value={formatPrice(h.price)} />
        <ChartTooltipRow label="To current" value={signedPct(pct(h.price, current))} />
      </>
    )
  } else if (active?.type === "forecast") {
    ax = nowX + (plot.right - nowX) * active.t
    const proj = projectAt(active.t)
    ay = Math.min(...proj.map((p) => y(p.price)))
    body = (
      <>
        <ChartTooltipTitle>{fmtDate.format(nowTime + (horizonTime - nowTime) * active.t)}</ChartTooltipTitle>
        {proj.map((p) => (
          <ChartTooltipRow key={p.target.key} color={p.target.color} label={p.target.label} value={formatPrice(p.price)} />
        ))}
      </>
    )
  } else if (active?.type === "target") {
    const t = targets.find((v) => v.key === active.key)
    if (t) {
      ax = x(horizonTime)
      ay = y(t.price)
      body = (
        <>
          <ChartTooltipTitle>{t.label} target</ChartTooltipTitle>
          <ChartTooltipRow color={t.color} label="Price" value={formatPrice(t.price)} />
          <ChartTooltipRow
            label="From current"
            value={<span style={{ color: t.upside >= 0 ? "var(--success)" : "var(--destructive)" }}>{signedPct(t.upside)}</span>}
          />
          {t.analysts !== undefined && <ChartTooltipRow label="Analysts" value={t.analysts} />}
        </>
      )
    }
  }
  const side = active?.type === "target" ? "left" : ax > width * 0.6 ? "left" : "right"
  return (
    <ChartTooltip open={!!body} x={ax} y={ay} bounds={{ width, height }} side={side} offset={14} className={className}>
      {active && body && (children ? children(active) : body)}
    </ChartTooltip>
  )
}

/* -------------------------------------------------------------------------- */
/*                                  Demo data                                 */
/* -------------------------------------------------------------------------- */

/** Deterministic weekly closes ending on `endDate` (UTC). */
function generatePriceHistory(
  rand: () => number,
  { endDate = "2026-10-09", weeks = 52, start = 100, drift = 0.004, vol = 0.035 }: {
    endDate?: string
    weeks?: number
    start?: number
    drift?: number
    vol?: number
  } = {}
): PriceHistoryPoint[] {
  const end = utcDay(endDate)
  let p = start
  return Array.from({ length: weeks }, (_, i) => {
    if (i) p = Math.max(1, p * (1 + drift + (rand() - 0.5) * 2 * vol))
    return { date: new Date(end - (weeks - 1 - i) * 7 * DAY).toISOString().slice(0, 10), price: Number(p.toFixed(2)) }
  })
}

export {
  PriceTargetFan,
  PriceTargetFanHeader,
  PriceTargetFanPlot,
  PriceTargetFanAxes,
  PriceTargetFanHistory,
  PriceTargetFanTargets,
  PriceTargetFanNow,
  PriceTargetFanCursor,
  PriceTargetFanTooltip,
  usePriceTargetFan,
  usePriceTargetFanPlot,
  generatePriceHistory,
  type PriceTargetFanProps,
  type PriceTargetFanPlotProps,
  type PriceTargetFanActive,
  type PriceTarget,
  type PriceHistoryPoint,
}
