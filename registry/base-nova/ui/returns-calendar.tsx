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
  useChartSize,
} from "@/registry/base-nova/ui/chart-utils"

const UP = "var(--success)"
const DOWN = "var(--destructive)"
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] as const

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

type ReturnsCalendarYear = {
  year: number
  /** Twelve monthly returns in percent (Jan..Dec); `null` = no data (e.g. future month). */
  returns: readonly (number | null)[]
}

/** Month cell; month 0..11. A whole year is { year, month: 0 } → { year, month: 11 }. */
type ReturnsCalendarCell = { year: number; month: number }
type ReturnsCalendarSelection = { start: ReturnsCalendarCell; end?: ReturnsCalendarCell }
type ReturnsCalendarView = "months" | "years"

type ReturnsCalendarProps = Omit<React.ComponentProps<"div">, "children"> & {
  data: readonly ReturnsCalendarYear[]
  label?: string
  view?: ReturnsCalendarView
  defaultView?: ReturnsCalendarView
  onViewChange?: (view: ReturnsCalendarView) => void
  selection?: ReturnsCalendarSelection | null
  defaultSelection?: ReturnsCalendarSelection | null
  onSelectionChange?: (selection: ReturnsCalendarSelection | null) => void
  /** |return| that maps to full colour strength; defaults to the largest monthly move. */
  range?: number
  /** Decimal places on cells. */
  digits?: number
  children?: React.ReactNode
}

/* -------------------------------------------------------------------------- */
/*                                   Helpers                                  */
/* -------------------------------------------------------------------------- */

const compound = (values: readonly number[]) => (values.reduce((acc, r) => acc * (1 + r / 100), 1) - 1) * 100
const signed = (v: number, digits = 1) => `${v > 0 ? "+" : v < 0 ? "−" : ""}${Math.abs(v).toFixed(digits)}`
const idx = (c: ReturnsCalendarCell) => c.year * 12 + c.month
const fromIdx = (i: number): ReturnsCalendarCell => ({ year: Math.floor(i / 12), month: ((i % 12) + 12) % 12 })
const cellLabel = (c: ReturnsCalendarCell) => `${MONTHS[c.month]} ${c.year}`

function tint(v: number | null, range: number, alpha = [10, 72]) {
  if (v == null) return undefined
  const t = clamp(Math.abs(v) / (range || 1), 0, 1)
  return chartAlpha(v >= 0 ? UP : DOWN, Math.round(alpha[0] + Math.sqrt(t) * (alpha[1] - alpha[0])))
}

type Hot =
  | { kind: "month"; cell: ReturnsCalendarCell; x: number; y: number }
  | { kind: "year"; year: number; x: number; y: number }

type Ctx = {
  rows: { year: number; returns: (number | null)[]; total: number | null; months: number }[]
  byIndex: Map<number, number | null>
  range: number
  digits: number
  label: string
  view: ReturnsCalendarView
  setView: (v: ReturnsCalendarView) => void
  selection: ReturnsCalendarSelection | null
  setSelection: (s: ReturnsCalendarSelection | null) => void
  selectedRange: [number, number] | null
  hot: Hot | null
  setHot: (h: Hot | null) => void
  size: { width: number; height: number }
  containerRef: React.RefObject<HTMLDivElement | null>
}

const ReturnsCalendarContext = React.createContext<Ctx | null>(null)
function useReturnsCalendar() {
  const ctx = React.useContext(ReturnsCalendarContext)
  if (!ctx) throw new Error("ReturnsCalendar parts must be rendered inside <ReturnsCalendar>.")
  return ctx
}

/* -------------------------------------------------------------------------- */
/*                                    Root                                    */
/* -------------------------------------------------------------------------- */

function ReturnsCalendar({
  data,
  label = "Monthly returns",
  view: viewProp,
  defaultView = "months",
  onViewChange,
  selection: selectionProp,
  defaultSelection = null,
  onSelectionChange,
  range: rangeProp,
  digits = 1,
  className,
  children,
  ...props
}: ReturnsCalendarProps) {
  const rows = React.useMemo(
    () =>
      [...data]
        .sort((a, b) => a.year - b.year)
        .map((y) => {
          const returns = Array.from({ length: 12 }, (_, m) => {
            const v = y.returns[m]
            return v != null && Number.isFinite(v) ? v : null
          })
          const valid = returns.filter((v): v is number => v != null)
          return { year: y.year, returns, total: valid.length ? compound(valid) : null, months: valid.length }
        }),
    [data]
  )
  const byIndex = React.useMemo(() => {
    const m = new Map<number, number | null>()
    for (const r of rows) r.returns.forEach((v, i) => m.set(r.year * 12 + i, v))
    return m
  }, [rows])
  const range =
    rangeProp ?? Math.max(1, ...rows.flatMap((r) => r.returns.filter((v): v is number => v != null).map(Math.abs)))

  const [innerView, setInnerView] = React.useState(defaultView)
  const view = viewProp ?? innerView
  const viewCb = React.useRef(onViewChange)
  viewCb.current = onViewChange
  const setView = React.useCallback(
    (v: ReturnsCalendarView) => {
      if (viewProp === undefined) setInnerView(v)
      viewCb.current?.(v)
    },
    [viewProp]
  )

  const [inner, setInner] = React.useState<ReturnsCalendarSelection | null>(defaultSelection)
  const selection = selectionProp === undefined ? inner : selectionProp
  const selCb = React.useRef(onSelectionChange)
  selCb.current = onSelectionChange
  const controlled = selectionProp !== undefined
  const setSelection = React.useCallback(
    (s: ReturnsCalendarSelection | null) => {
      if (!controlled) setInner(s)
      selCb.current?.(s)
    },
    [controlled]
  )
  const selectedRange: [number, number] | null = selection
    ? (() => {
        const a = idx(selection.start)
        const b = idx(selection.end ?? selection.start)
        return [Math.min(a, b), Math.max(a, b)]
      })()
    : null

  const [hot, setHot] = React.useState<Hot | null>(null)
  const [containerRef, size] = useChartSize<HTMLDivElement>()

  const value: Ctx = {
    rows,
    byIndex,
    range,
    digits,
    label,
    view,
    setView,
    selection,
    setSelection,
    selectedRange,
    hot,
    setHot,
    size,
    containerRef,
  }

  return (
    <ReturnsCalendarContext.Provider value={value}>
      <div data-slot="returns-calendar" className={cn("grid w-full min-w-0 gap-3", className)} {...props}>
        {children ?? (
          <>
            <ReturnsCalendarGrid />
            <ReturnsCalendarSummary />
          </>
        )}
        <ChartDataTable
          caption={`${label} (percent)`}
          columns={["Year", ...MONTHS, "Year total"]}
          rows={rows.map((r) => [
            r.year,
            ...r.returns.map((v) => (v == null ? "—" : `${signed(v, digits)}%`)),
            r.total == null ? "—" : `${signed(r.total, digits)}%`,
          ])}
        />
      </div>
    </ReturnsCalendarContext.Provider>
  )
}

/* -------------------------------------------------------------------------- */
/*                                    Grid                                    */
/* -------------------------------------------------------------------------- */

function useAnchor() {
  const { containerRef } = useReturnsCalendar()
  return (el: Element) => {
    const box = containerRef.current?.getBoundingClientRect()
    const r = el.getBoundingClientRect()
    return { x: r.left - (box?.left ?? 0) + r.width / 2, y: r.top - (box?.top ?? 0) }
  }
}

const cellBase =
  "relative flex items-center justify-center rounded-lg text-ui-xs font-medium tabular-nums outline-none transition-[box-shadow,opacity] duration-200 focus-visible:ring-2 focus-visible:ring-ring/50"

function ReturnsCalendarGrid({ className, children }: { className?: string; children?: React.ReactNode }) {
  const { view, containerRef, setHot, label } = useReturnsCalendar()
  const reduce = useReducedMotion()
  return (
    <div
      ref={containerRef}
      data-slot="returns-calendar-grid"
      className={cn("relative min-w-0", className)}
      onPointerLeave={() => setHot(null)}
    >
      {/* Months keep a readable minimum width; narrow containers scroll sideways instead of squeezing the cells. p-1/-m-1 keeps focus rings and the hover scale from being clipped. */}
      <div data-slot="returns-calendar-scroll" className="-m-1 overflow-x-auto overscroll-x-contain p-1" onScroll={() => setHot(null)}>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={view}
            initial={reduce ? false : { opacity: 0, y: 6, filter: "blur(3px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6, filter: "blur(3px)" }}
            transition={{ duration: 0.24, ease: CHART_EASE }}
            aria-label={label}
          >
            {view === "months" ? <MonthsGrid /> : <YearsGrid />}
          </motion.div>
        </AnimatePresence>
      </div>
      {children ?? <ReturnsCalendarTooltip />}
    </div>
  )
}

function MonthsGrid() {
  const { rows, byIndex, range, digits, selection, setSelection, selectedRange, hot, setHot, label } =
    useReturnsCalendar()
  const reduce = useReducedMotion()
  const anchor = useAnchor()
  const refs = React.useRef(new Map<number, HTMLElement>())
  const lastData = [...byIndex.entries()].filter(([, v]) => v != null).map(([k]) => k)
  const [focusIdx, setFocusIdx] = React.useState<number | null>(null)
  const focusKey = focusIdx ?? lastData[lastData.length - 1] ?? null
  const minYear = rows[0]?.year ?? 0
  const maxYear = rows[rows.length - 1]?.year ?? 0

  const pick = (i: number, extend: boolean) => {
    const c = fromIdx(i)
    if (extend && selection) return setSelection({ start: selection.start, end: c })
    if (selection && !selection.end && idx(selection.start) === i) return setSelection(null)
    if (selection && !selection.end) return setSelection({ start: selection.start, end: c })
    setSelection({ start: c })
  }

  const move = (from: number, e: React.KeyboardEvent) => {
    let to = from
    if (e.key === "ArrowLeft") to -= 1
    else if (e.key === "ArrowRight") to += 1
    else if (e.key === "ArrowUp") to -= 12
    else if (e.key === "ArrowDown") to += 12
    else if (e.key === "Home") to = Math.floor(from / 12) * 12
    else if (e.key === "End") to = Math.floor(from / 12) * 12 + 11
    else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      return pick(from, false)
    } else if (e.key === "Escape") return setSelection(null)
    else return
    e.preventDefault()
    to = clamp(to, minYear * 12, maxYear * 12 + 11)
    if (!byIndex.has(to)) return
    setFocusIdx(to)
    const el = refs.current.get(to)
    el?.focus()
    if (e.shiftKey) setSelection({ start: selection?.start ?? fromIdx(from), end: fromIdx(to) })
  }

  return (
    <div
      role="grid"
      aria-label={`${label}. Arrow keys move between months; Enter starts and ends a range; Shift+arrows extend it.`}
      className="grid gap-1 select-none"
      style={{ gridTemplateColumns: "2.75rem repeat(12, minmax(3.5rem, 1fr)) 3.75rem" }}
    >
      <div role="row" className="contents">
        {/* Takes the row-header column: an sr-only (absolute) header would drop out of the grid and shift every cell one column left. */}
        <span role="columnheader">
          <span className="sr-only">Year</span>
        </span>
        {MONTHS.map((m) => (
          <span
            key={m}
            role="columnheader"
            className="pb-0.5 text-center text-ui-2xs font-medium text-muted-foreground"
          >
            {m}
          </span>
        ))}
        <span role="columnheader" className="pb-0.5 text-center text-ui-2xs font-medium text-muted-foreground">
          Year
        </span>
      </div>

      {rows.map((row, ri) => {
        const yearSelected =
          !!selectedRange && selectedRange[0] <= row.year * 12 && selectedRange[1] >= row.year * 12 + 11
        return (
          <div role="row" key={row.year} className="contents">
            <span role="rowheader" className="flex items-center text-ui-sm font-medium text-muted-foreground tabular-nums">
              {row.year}
            </span>
            {row.returns.map((v, m) => {
              const i = row.year * 12 + m
              const selected = !!selectedRange && i >= selectedRange[0] && i <= selectedRange[1]
              const dim = !!selectedRange && !selected
              const isHot = hot?.kind === "month" && idx(hot.cell) === i
              if (v == null)
                return (
                  <span
                    key={m}
                    role="gridcell"
                    aria-disabled
                    aria-label={`${cellLabel({ year: row.year, month: m })}: no data`}
                    className="h-8 rounded-lg bg-muted/50 shadow-well"
                  />
                )
              return (
                <motion.button
                  key={m}
                  type="button"
                  ref={(el: HTMLButtonElement | null) => {
                    if (el) refs.current.set(i, el)
                    else refs.current.delete(i)
                  }}
                  role="gridcell"
                  tabIndex={focusKey === i ? 0 : -1}
                  aria-selected={selected}
                  aria-label={`${cellLabel({ year: row.year, month: m })}: ${signed(v, digits)}%`}
                  initial={reduce ? false : { opacity: 0, scale: 0.85 }}
                  animate={{ opacity: dim ? 0.4 : 1, scale: isHot ? 1.06 : 1 }}
                  transition={
                    reduce
                      ? { duration: 0 }
                      : {
                          opacity: { duration: 0.2 },
                          scale: { type: "spring", stiffness: 480, damping: 30 },
                          default: { delay: ri * 0.04 + m * 0.012 },
                        }
                  }
                  onPointerEnter={(e) => setHot({ kind: "month", cell: { year: row.year, month: m }, ...anchor(e.currentTarget) })}
                  onFocus={(e) => {
                    setFocusIdx(i)
                    setHot({ kind: "month", cell: { year: row.year, month: m }, ...anchor(e.currentTarget) })
                  }}
                  onBlur={() => setHot(null)}
                  onClick={(e) => pick(i, e.shiftKey)}
                  onKeyDown={(e) => move(i, e)}
                  className={cn(cellBase, "h-8 cursor-pointer text-foreground")}
                  style={{
                    background: tint(v, range),
                    boxShadow: selected ? "inset 0 0 0 1.5px var(--foreground)" : undefined,
                  }}
                >
                  {signed(v, digits)}
                </motion.button>
              )
            })}
            <motion.button
              type="button"
              aria-label={`${row.year} total: ${row.total == null ? "no data" : `${signed(row.total, digits)}%`}. Select whole year.`}
              aria-pressed={yearSelected}
              disabled={row.total == null}
              initial={reduce ? false : { opacity: 0, x: 6 }}
              animate={{ opacity: selectedRange && !yearSelected ? 0.45 : 1, x: 0 }}
              transition={reduce ? { duration: 0 } : { duration: 0.3, ease: CHART_EASE, delay: ri * 0.04 + 0.15 }}
              onPointerEnter={(e) => setHot({ kind: "year", year: row.year, ...anchor(e.currentTarget) })}
              onFocus={(e) => setHot({ kind: "year", year: row.year, ...anchor(e.currentTarget) })}
              onBlur={() => setHot(null)}
              onClick={() =>
                yearSelected && selectedRange?.[0] === row.year * 12 && selectedRange[1] === row.year * 12 + 11
                  ? setSelection(null)
                  : setSelection({ start: { year: row.year, month: 0 }, end: { year: row.year, month: 11 } })
              }
              className={cn(
                cellBase,
                "h-8 cursor-pointer bg-card font-semibold shadow-raised transition-[box-shadow,background-color] duration-150 ease-out hover:bg-accent hover:shadow-raised-hover disabled:cursor-default"
              )}
              style={{
                color: row.total == null ? undefined : row.total >= 0 ? UP : DOWN,
                boxShadow: yearSelected ? "inset 0 0 0 1.5px var(--foreground)" : undefined,
              }}
            >
              {row.total == null ? "—" : `${signed(row.total, digits)}%`}
            </motion.button>
          </div>
        )
      })}
    </div>
  )
}

function YearsGrid() {
  const { rows, range, digits, selectedRange, setSelection, selection, setHot, hot } = useReturnsCalendar()
  const reduce = useReducedMotion()
  const anchor = useAnchor()
  const yearRange = Math.max(1, ...rows.map((r) => Math.abs(r.total ?? 0)))

  const pick = (year: number, extend: boolean) => {
    const start = { year, month: 0 }
    const end = { year, month: 11 }
    if (extend && selection) {
      const s = selection.start.year
      return setSelection({ start: { year: Math.min(s, year), month: 0 }, end: { year: Math.max(s, year), month: 11 } })
    }
    if (selectedRange && selectedRange[0] === year * 12 && selectedRange[1] === year * 12 + 11)
      return setSelection(null)
    setSelection({ start, end })
  }

  return (
    <div role="group" className="grid grid-cols-[repeat(auto-fill,minmax(7.5rem,1fr))] gap-2 select-none">
      {rows.map((row, ri) => {
        const selected =
          !!selectedRange && selectedRange[0] <= row.year * 12 && selectedRange[1] >= row.year * 12 + 11
        const isHot = hot?.kind === "year" && hot.year === row.year
        const up = (row.total ?? 0) >= 0
        return (
          <motion.button
            key={row.year}
            type="button"
            aria-pressed={selected}
            aria-label={`${row.year}: ${row.total == null ? "no data" : `${signed(row.total, digits)}%`}`}
            disabled={row.total == null}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: selectedRange && !selected ? 0.45 : 1, y: isHot ? -2 : 0 }}
            transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 360, damping: 28, delay: ri * 0.035 }}
            onPointerEnter={(e) => setHot({ kind: "year", year: row.year, ...anchor(e.currentTarget) })}
            onFocus={(e) => setHot({ kind: "year", year: row.year, ...anchor(e.currentTarget) })}
            onBlur={() => setHot(null)}
            onClick={(e) => pick(row.year, e.shiftKey)}
            className="relative flex cursor-pointer flex-col gap-2 overflow-hidden rounded-2xl bg-card p-3 text-left shadow-raised outline-none transition-[box-shadow,scale] duration-150 ease-out hover:shadow-raised-hover focus-visible:ring-2 focus-visible:ring-ring/50"
            style={{ boxShadow: selected ? "inset 0 0 0 1.5px var(--foreground)" : undefined }}
          >
            <span
              aria-hidden
              className="absolute inset-0"
              style={{ background: tint(row.total, yearRange, [6, 30]) }}
            />
            <span className="relative flex items-baseline justify-between gap-2">
              <span className="text-ui-sm font-medium text-muted-foreground tabular-nums">{row.year}</span>
              <span className="text-ui font-semibold tabular-nums" style={{ color: row.total == null ? undefined : up ? UP : DOWN }}>
                {row.total == null ? "—" : `${signed(row.total, digits)}%`}
              </span>
            </span>
            {/* 12-month mini bars */}
            <span aria-hidden className="relative flex h-6 items-center gap-px">
              {row.returns.map((v, m) => {
                const h = v == null ? 0 : clamp(Math.abs(v) / range, 0.08, 1) * 50
                return (
                  <span key={m} className="relative h-full flex-1">
                    <span className="absolute inset-x-0 top-1/2 h-px bg-border" />
                    {v != null && (
                      <motion.span
                        className="absolute inset-x-0 rounded-[2px]"
                        initial={reduce ? false : { height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={reduce ? { duration: 0 } : { duration: 0.5, ease: CHART_EASE, delay: ri * 0.035 + m * 0.015 }}
                        style={{
                          background: v >= 0 ? UP : DOWN,
                          ...(v >= 0 ? { bottom: "50%" } : { top: "50%" }),
                        }}
                      />
                    )}
                  </span>
                )
              })}
            </span>
            <span className="relative text-ui-2xs text-muted-foreground tabular-nums">
              {row.returns.filter((v) => v != null && v >= 0).length} up · {row.returns.filter((v) => v != null && v < 0).length} down
            </span>
          </motion.button>
        )
      })}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*                                   Tooltip                                  */
/* -------------------------------------------------------------------------- */

type ReturnsCalendarTooltipData = { title: string; value: number; note: string | null; kind: "month" | "year" }

function ReturnsCalendarTooltip({
  className,
  children,
}: {
  className?: string
  children?: (data: ReturnsCalendarTooltipData) => React.ReactNode
}) {
  const { hot, rows, digits, size } = useReturnsCalendar()
  let data: ReturnsCalendarTooltipData | null = null
  if (hot?.kind === "month") {
    const row = rows.find((r) => r.year === hot.cell.year)
    const v = row?.returns[hot.cell.month]
    if (row && v != null) {
      const valid = row.returns.filter((x): x is number => x != null)
      const ytd = compound(row.returns.slice(0, hot.cell.month + 1).filter((x): x is number => x != null))
      const note =
        valid.length > 1 && v === Math.max(...valid)
          ? `Best month of ${row.year}`
          : valid.length > 1 && v === Math.min(...valid)
            ? `Worst month of ${row.year}`
            : null
      data = { title: cellLabel(hot.cell), value: v, note: note ?? `YTD ${signed(ytd, digits)}%`, kind: "month" }
    }
  } else if (hot?.kind === "year") {
    const row = rows.find((r) => r.year === hot.year)
    if (row && row.total != null) {
      const valid = row.returns.filter((x): x is number => x != null)
      data = {
        title: `${row.year}${row.months < 12 ? ` · ${row.months} months` : ""}`,
        value: row.total,
        note: `Best ${signed(Math.max(...valid), digits)}% · Worst ${signed(Math.min(...valid), digits)}%`,
        kind: "year",
      }
    }
  }
  return (
    <ChartTooltip open={!!data} x={hot?.x ?? 0} y={hot?.y ?? 0} bounds={size} side="top" offset={8} className={className}>
      {data &&
        (children ? (
          children(data)
        ) : (
          <>
            <ChartTooltipTitle>{data.title}</ChartTooltipTitle>
            <ChartTooltipRow
              color={data.value >= 0 ? UP : DOWN}
              label={data.kind === "month" ? "Return" : "Compounded"}
              value={`${signed(data.value, digits)}%`}
            />
            {data.note && <div className="pt-1 text-ui-xs text-muted-foreground">{data.note}</div>}
          </>
        ))}
    </ChartTooltip>
  )
}

/* -------------------------------------------------------------------------- */
/*                                   Summary                                  */
/* -------------------------------------------------------------------------- */

function ReturnsCalendarSummary({ className, ...props }: React.ComponentProps<"div">) {
  const { rows, byIndex, selectedRange, setSelection, digits } = useReturnsCalendar()
  const values: number[] = []
  let from = ""
  let to = ""
  if (selectedRange) {
    for (let i = selectedRange[0]; i <= selectedRange[1]; i++) {
      const v = byIndex.get(i)
      if (v != null) values.push(v)
    }
    from = cellLabel(fromIdx(selectedRange[0]))
    to = cellLabel(fromIdx(selectedRange[1]))
  } else {
    for (const r of rows) for (const v of r.returns) if (v != null) values.push(v)
    from = String(rows[0]?.year ?? "")
    to = String(rows[rows.length - 1]?.year ?? "")
  }
  const total = values.length ? compound(values) : 0
  const avg = values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0
  const hit = values.length ? values.filter((v) => v >= 0).length / values.length : 0
  const color = total >= 0 ? UP : DOWN
  return (
    <div
      data-slot="returns-calendar-summary"
      aria-live="polite"
      className={cn(
        "flex flex-wrap items-center gap-x-4 gap-y-1.5 rounded-2xl bg-muted px-3 py-2 text-ui-sm text-muted-foreground shadow-well tabular-nums",
        className
      )}
      {...props}
    >
      <span className="font-medium text-foreground">{from === to ? from : `${from} – ${to}`}</span>
      <span>
        Compounded{" "}
        <ChartNumber
          value={total}
          format={(v) => `${signed(v, digits)}%`}
          className="font-semibold"
          style={{ color }}
        />
      </span>
      <span>
        Avg / month <b className="font-medium text-foreground">{signed(avg, 2)}%</b>
      </span>
      <span>
        Positive <b className="font-medium text-foreground">{Math.round(hit * 100)}%</b> of {values.length} months
      </span>
      {selectedRange && (
        <button
          type="button"
          onClick={() => setSelection(null)}
          className="ml-auto rounded-md bg-card px-2 py-0.5 text-ui-xs font-medium text-secondary-foreground shadow-raised outline-none transition-[box-shadow,background-color,scale] duration-150 ease-out hover:bg-accent hover:shadow-raised-hover focus-visible:ring-2 focus-visible:ring-ring/50"
        >
          Clear
        </button>
      )}
    </div>
  )
}

export {
  ReturnsCalendar,
  ReturnsCalendarGrid,
  ReturnsCalendarTooltip,
  ReturnsCalendarSummary,
  useReturnsCalendar,
  type ReturnsCalendarProps,
  type ReturnsCalendarYear,
  type ReturnsCalendarCell,
  type ReturnsCalendarSelection,
  type ReturnsCalendarView,
  type ReturnsCalendarTooltipData,
}
