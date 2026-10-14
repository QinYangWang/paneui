"use client"

import * as React from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"
import {
  CHART_EASE,
  ChartDataTable,
  ChartNumber,
  chartAlpha,
  formatCompact,
  useChartTransition,
} from "@/registry/base-nova/ui/chart-utils"

type OrderBookLevel = { price: number; size: number }
type OrderBookSideName = "bid" | "ask"
type OrderBookDepthLevel = OrderBookLevel & { total: number }
/** A level addressed by side and price so it survives snapshot updates. */
type OrderBookActiveLevel = { side: OrderBookSideName; price: number } | null

const BID = "var(--success)"
const ASK = "var(--destructive)"

function normalise(levels: readonly OrderBookLevel[], side: OrderBookSideName, count: number) {
  const merged = new Map<number, number>()
  for (const { price, size } of levels) {
    if (!Number.isFinite(price) || !Number.isFinite(size) || size <= 0 || price <= 0) continue
    merged.set(price, (merged.get(price) ?? 0) + size)
  }
  const sorted = [...merged.entries()]
    .sort((a, b) => (side === "bid" ? b[0] - a[0] : a[0] - b[0]))
    .slice(0, count)
  let total = 0
  return sorted.map(([price, size]) => ((total += size), { price, size, total }))
}

type OrderBookContextValue = {
  bids: OrderBookDepthLevel[]
  asks: OrderBookDepthLevel[]
  maxTotal: number
  bestBid?: OrderBookDepthLevel
  bestAsk?: OrderBookDepthLevel
  spread: number | null
  mid: number | null
  lastPrice: number | null
  lastDirection: "up" | "down" | null
  active: { side: OrderBookSideName; index: number } | null
  setActive: (level: OrderBookActiveLevel) => void
  onLevelSelect?: (level: OrderBookDepthLevel, side: OrderBookSideName) => void
  formatPrice: (v: number) => string
  formatSize: (v: number) => string
  baseSymbol: string
  quoteSymbol: string
  label: string
}

const OrderBookContext = React.createContext<OrderBookContextValue | null>(null)

function useOrderBook() {
  const ctx = React.useContext(OrderBookContext)
  if (!ctx) throw new Error("OrderBook parts must be rendered inside <OrderBook>.")
  return ctx
}

const priceFmt = new Intl.NumberFormat("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
const defaultPrice = (v: number) => priceFmt.format(v)

type OrderBookProps = Omit<React.ComponentProps<"div">, "children"> & {
  bids: readonly OrderBookLevel[]
  asks: readonly OrderBookLevel[]
  /** Nearest levels to show per side. */
  levels?: number
  /** Last traded price; defaults to the mid price. */
  lastPrice?: number
  label?: string
  baseSymbol?: string
  quoteSymbol?: string
  formatPrice?: (v: number) => string
  formatSize?: (v: number) => string
  /** Inspected level: it and every better level on its side highlight and are totalled. */
  activeLevel?: OrderBookActiveLevel
  defaultActiveLevel?: OrderBookActiveLevel
  onActiveLevelChange?: (level: OrderBookActiveLevel) => void
  /** Makes rows clickable, e.g. to fill an order ticket. */
  onLevelSelect?: (level: OrderBookDepthLevel, side: OrderBookSideName) => void
  /** Custom composition of parts; defaults to header, asks, spread, bids, balance and depth summary. */
  children?: React.ReactNode
}

function OrderBook({
  bids: bidsProp,
  asks: asksProp,
  levels = 8,
  lastPrice: lastPriceProp,
  label = "Order book",
  baseSymbol = "",
  quoteSymbol = "USD",
  formatPrice = defaultPrice,
  formatSize = formatCompact,
  activeLevel,
  defaultActiveLevel = null,
  onActiveLevelChange,
  onLevelSelect,
  className,
  children,
  ...props
}: OrderBookProps) {
  const bids = React.useMemo(() => normalise(bidsProp, "bid", levels), [bidsProp, levels])
  const asks = React.useMemo(() => normalise(asksProp, "ask", levels), [asksProp, levels])
  const [inner, setInner] = React.useState<OrderBookActiveLevel>(defaultActiveLevel)
  const raw = activeLevel === undefined ? inner : activeLevel
  const list = raw ? (raw.side === "bid" ? bids : asks) : []
  const idx = raw ? list.findIndex((l) => l.price === raw.price) : -1
  const active = raw && idx >= 0 ? { side: raw.side, index: idx } : null

  const cb = React.useRef({ controlled: activeLevel !== undefined, onActiveLevelChange })
  cb.current = { controlled: activeLevel !== undefined, onActiveLevelChange }
  const setActive = React.useCallback((level: OrderBookActiveLevel) => {
    if (!cb.current.controlled) setInner(level)
    cb.current.onActiveLevelChange?.(level)
  }, [])

  const bestBid = bids[0]
  const bestAsk = asks[0]
  const spread = bestBid && bestAsk ? bestAsk.price - bestBid.price : null
  const mid = bestBid && bestAsk ? (bestAsk.price + bestBid.price) / 2 : bestBid?.price ?? bestAsk?.price ?? null
  const lastPrice = lastPriceProp ?? mid
  const prevLast = React.useRef<number | null>(lastPrice)
  const [lastDirection, setLastDirection] = React.useState<"up" | "down" | null>(null)
  React.useEffect(() => {
    if (lastPrice == null || prevLast.current == null) {
      prevLast.current = lastPrice
      return
    }
    if (lastPrice > prevLast.current) setLastDirection("up")
    else if (lastPrice < prevLast.current) setLastDirection("down")
    prevLast.current = lastPrice
  }, [lastPrice])

  const maxTotal = Math.max(1e-9, bids[bids.length - 1]?.total ?? 0, asks[asks.length - 1]?.total ?? 0)

  const value: OrderBookContextValue = {
    bids,
    asks,
    maxTotal,
    bestBid,
    bestAsk,
    spread,
    mid,
    lastPrice,
    lastDirection,
    active,
    setActive,
    onLevelSelect,
    formatPrice,
    formatSize,
    baseSymbol,
    quoteSymbol,
    label,
  }

  return (
    <OrderBookContext.Provider value={value}>
      <div
        data-slot="order-book"
        role="group"
        aria-label={label}
        className={cn(
          "flex w-full min-w-0 flex-col gap-1 rounded-2xl bg-card p-2 text-card-foreground shadow-raised",
          className
        )}
        {...props}
      >
        {children ?? (
          <>
            <OrderBookHeader />
            <OrderBookSide side="ask" />
            <OrderBookSpread />
            <OrderBookSide side="bid" />
            <OrderBookBalance />
            <OrderBookDepthSummary />
          </>
        )}
        <ChartDataTable
          caption={`${label} levels`}
          columns={["Side", "Price", "Size", "Total"]}
          rows={[
            ...asks.map((l) => ["Ask", formatPrice(l.price), formatSize(l.size), formatSize(l.total)]),
            ...bids.map((l) => ["Bid", formatPrice(l.price), formatSize(l.size), formatSize(l.total)]),
          ]}
        />
      </div>
    </OrderBookContext.Provider>
  )
}

function OrderBookHeader({ className, ...props }: React.ComponentProps<"div">) {
  const { baseSymbol, quoteSymbol } = useOrderBook()
  return (
    <div
      data-slot="order-book-header"
      className={cn(
        "grid grid-cols-3 px-2.5 pt-1 pb-1.5 text-[10px] font-medium tracking-wide text-muted-foreground uppercase",
        className
      )}
      {...props}
    >
      <span>Price{quoteSymbol ? ` (${quoteSymbol})` : ""}</span>
      <span className="text-right">Size{baseSymbol ? ` (${baseSymbol})` : ""}</span>
      <span className="text-right">Total</span>
    </div>
  )
}

function OrderBookDepthRow({
  level,
  side,
  index,
}: {
  level: OrderBookDepthLevel
  side: OrderBookSideName
  index: number
}) {
  const { maxTotal, active, setActive, onLevelSelect, formatPrice, formatSize } = useOrderBook()
  const reduce = useReducedMotion()
  const transition = useChartTransition()
  const color = side === "bid" ? BID : ASK
  const inDepth = active?.side === side && index <= active.index
  const isActive = active?.side === side && active.index === index

  // Flash when the size at this price changes.
  const prev = React.useRef(level.size)
  const [flash, setFlash] = React.useState<"up" | "down" | null>(null)
  React.useEffect(() => {
    if (level.size === prev.current) return
    setFlash(level.size > prev.current ? "up" : "down")
    prev.current = level.size
    const t = window.setTimeout(() => setFlash(null), 450)
    return () => window.clearTimeout(t)
  }, [level.size])

  const enter = () => setActive({ side, price: level.price })
  const Comp = onLevelSelect ? "button" : "div"

  return (
    <motion.li
      layout={reduce ? false : "position"}
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.12 } }}
      transition={transition}
      className="relative"
    >
      <Comp
        type={onLevelSelect ? "button" : undefined}
        tabIndex={onLevelSelect ? undefined : 0}
        data-active={isActive || undefined}
        data-in-depth={inDepth || undefined}
        aria-label={`${side === "bid" ? "Bid" : "Ask"} ${formatPrice(level.price)}, size ${formatSize(level.size)}, cumulative ${formatSize(level.total)}`}
        onPointerEnter={enter}
        onFocus={enter}
        onClick={onLevelSelect ? () => onLevelSelect(level, side) : undefined}
        className={cn(
          "relative grid h-6 w-full grid-cols-3 items-center overflow-hidden rounded-lg px-2.5 text-left font-mono text-xs tabular-nums outline-none focus-visible:ring-2 focus-visible:ring-ring",
          onLevelSelect && "cursor-pointer"
        )}
      >
        {/* cumulative depth bar */}
        <motion.span
          aria-hidden
          className="absolute inset-y-0.5 right-0 left-0 origin-right rounded-md"
          initial={reduce ? false : { scaleX: 0 }}
          animate={{ scaleX: level.total / maxTotal }}
          transition={transition}
          style={{ background: chartAlpha(color, inDepth ? 26 : 13) }}
        />
        {/* own size bar */}
        <motion.span
          aria-hidden
          className="absolute right-0 bottom-0.5 h-0.5 w-full origin-right rounded-full"
          initial={false}
          animate={{ scaleX: level.size / maxTotal }}
          transition={transition}
          style={{ background: chartAlpha(color, 70) }}
        />
        {/* hover / depth highlight */}
        {inDepth && <span aria-hidden className="absolute inset-0 rounded-lg bg-foreground/4" />}
        {isActive && (
          <span aria-hidden className="absolute inset-0 rounded-lg shadow-[inset_0_0_0_1px_var(--border)]" />
        )}
        <AnimatePresence>
          {flash && (
            <motion.span
              aria-hidden
              key={flash + level.size}
              initial={{ opacity: 0.55 }}
              animate={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: CHART_EASE }}
              className="absolute inset-0 rounded-lg"
              style={{ background: chartAlpha(flash === "up" ? BID : ASK, 22) }}
            />
          )}
        </AnimatePresence>
        <span className="relative font-medium" style={{ color }}>
          {formatPrice(level.price)}
        </span>
        <span className="relative text-right text-foreground">{formatSize(level.size)}</span>
        <span className="relative text-right text-muted-foreground">{formatSize(level.total)}</span>
      </Comp>
    </motion.li>
  )
}

function OrderBookSide({
  side,
  className,
  ...props
}: Omit<React.ComponentProps<"ul">, "children"> & { side: OrderBookSideName }) {
  const { bids, asks, setActive } = useOrderBook()
  const list = side === "bid" ? bids : asks
  // Asks read bottom-up so the best ask sits next to the spread.
  const ordered = side === "ask" ? [...list].reverse() : list
  return (
    <ul
      data-slot="order-book-side"
      data-side={side}
      aria-label={side === "bid" ? "Bids" : "Asks"}
      onPointerLeave={() => setActive(null)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setActive(null)
      }}
      className={cn("flex flex-col gap-px", className)}
      {...props}
    >
      <AnimatePresence initial={false} mode="popLayout">
        {ordered.map((level) => (
          <OrderBookDepthRow key={level.price} level={level} side={side} index={list.indexOf(level)} />
        ))}
      </AnimatePresence>
    </ul>
  )
}

function OrderBookSpread({ className, ...props }: React.ComponentProps<"div">) {
  const { spread, mid, lastPrice, lastDirection, formatPrice } = useOrderBook()
  const color = lastDirection === "up" ? BID : lastDirection === "down" ? ASK : undefined
  return (
    <div
      data-slot="order-book-spread"
      aria-live="polite"
      className={cn(
        "my-1 flex items-center justify-between gap-3 rounded-xl bg-muted px-2.5 py-1.5 shadow-well",
        className
      )}
      {...props}
    >
      <span className="flex items-center gap-1.5 text-base font-semibold tracking-tight tabular-nums" style={{ color }}>
        {lastPrice != null && <ChartNumber value={lastPrice} format={formatPrice} />}
        <AnimatePresence mode="popLayout" initial={false}>
          {lastDirection && (
            <motion.span
              key={lastDirection}
              initial={{ opacity: 0, y: lastDirection === "up" ? 4 : -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: CHART_EASE }}
              className="text-[10px]"
              aria-label={lastDirection === "up" ? "up" : "down"}
            >
              {lastDirection === "up" ? "▲" : "▼"}
            </motion.span>
          )}
        </AnimatePresence>
      </span>
      <span className="text-right text-[11px] text-muted-foreground tabular-nums">
        Spread{" "}
        <b className="font-medium text-foreground">{spread != null ? formatPrice(spread) : "—"}</b>
        {spread != null && mid ? (
          <span className="ml-1">({((spread / mid) * 10_000).toFixed(1)} bps)</span>
        ) : null}
      </span>
    </div>
  )
}

function OrderBookBalance({ className, ...props }: React.ComponentProps<"div">) {
  const { bids, asks } = useOrderBook()
  const transition = useChartTransition()
  const reduce = useReducedMotion()
  const b = bids[bids.length - 1]?.total ?? 0
  const a = asks[asks.length - 1]?.total ?? 0
  const share = b + a ? b / (b + a) : 0.5
  return (
    <div data-slot="order-book-balance" className={cn("mt-1.5 grid gap-1 px-1", className)} {...props}>
      <div className="flex justify-between text-[11px] font-medium tabular-nums">
        <span style={{ color: BID }}>B {(share * 100).toFixed(0)}%</span>
        <span style={{ color: ASK }}>{((1 - share) * 100).toFixed(0)}% S</span>
      </div>
      <div
        role="meter"
        aria-label="Bid share of visible volume"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(share * 100)}
        className="flex h-1.5 gap-0.5 overflow-hidden rounded-full bg-muted shadow-well"
      >
        <motion.span
          className="h-full rounded-full"
          initial={reduce ? false : { width: "50%" }}
          animate={{ width: `${share * 100}%` }}
          transition={transition}
          style={{ background: BID }}
        />
        <span className="h-full flex-1 rounded-full" style={{ background: ASK }} />
      </div>
    </div>
  )
}

function OrderBookDepthSummary({ className, ...props }: React.ComponentProps<"div">) {
  const { active, bids, asks, formatPrice, formatSize, baseSymbol, quoteSymbol } = useOrderBook()
  const list = active ? (active.side === "bid" ? bids : asks) : []
  const slice = active ? list.slice(0, active.index + 1) : []
  const size = slice.reduce((s, l) => s + l.size, 0)
  const notional = slice.reduce((s, l) => s + l.size * l.price, 0)
  const avg = size ? notional / size : 0
  return (
    <div
      data-slot="order-book-depth-summary"
      aria-live="polite"
      className={cn("grid min-h-9 items-center px-2.5 pt-1 text-[11px] text-muted-foreground tabular-nums", className)}
      {...props}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        {active ? (
          <motion.div
            key="summary"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.16, ease: CHART_EASE }}
            className="flex flex-wrap justify-between gap-x-3"
          >
            <span>
              {active.side === "bid" ? "Sell into" : "Buy through"} {slice.length} level{slice.length > 1 ? "s" : ""}
            </span>
            <span>
              <b className="font-medium text-foreground">{formatSize(size)}</b> {baseSymbol} · avg{" "}
              <b className="font-medium text-foreground">{formatPrice(avg)}</b> · {formatCompact(notional)} {quoteSymbol}
            </span>
          </motion.div>
        ) : (
          <motion.div
            key="hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16 }}
          >
            Hover a level to total its depth
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/** Deterministic book around a mid price, for demos and tests. */
function generateOrderBook(
  rand: () => number,
  { mid = 100, tick = 0.5, levels = 12, baseSize = 2 }: { mid?: number; tick?: number; levels?: number; baseSize?: number } = {}
) {
  const bestBid = Math.floor(mid / tick) * tick
  const bestAsk = bestBid + tick
  const size = (i: number) => Number((baseSize * (0.3 + rand() * 1.4) * (1 + i * 0.18) * (rand() > 0.9 ? 3 : 1)).toFixed(3))
  return {
    bids: Array.from({ length: levels }, (_, i) => ({ price: Number((bestBid - i * tick).toFixed(4)), size: size(i) })),
    asks: Array.from({ length: levels }, (_, i) => ({ price: Number((bestAsk + i * tick).toFixed(4)), size: size(i) })),
  }
}

export {
  OrderBook,
  OrderBookHeader,
  OrderBookSide,
  OrderBookSpread,
  OrderBookBalance,
  OrderBookDepthSummary,
  useOrderBook,
  generateOrderBook,
  type OrderBookProps,
  type OrderBookLevel,
  type OrderBookDepthLevel,
  type OrderBookActiveLevel,
  type OrderBookSideName,
}
