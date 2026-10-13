"use client"

import * as React from "react"
import { AnimatePresence, animate, motion, useReducedMotion } from "motion/react"
import { Radio as RadioPrimitive } from "@base-ui/react/radio"
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group"

import { CreditCardIcon, InfoIcon, SparklesIcon } from "@/components/icons"
import { cn } from "@/lib/utils"
import { StatefulButton, type ButtonState } from "@/registry/base-nova/ui/button-stateful"
import { NumberTicker } from "@/registry/base-nova/ui/number-ticker"
import { Tabs, TabsList, TabsTab } from "@/registry/base-nova/ui/tabs"

/* ───────────────────────── Types ───────────────────────── */

type PredictionMarketMode = "buy" | "sell"

type PredictionMarketOutcome = {
  id: string
  label: string
  /** Price per share in dollars, 0.01–0.99. */
  price: number
  /** "positive" tints green, "negative" tints red. Defaults by position. */
  tone?: "positive" | "negative"
}

type PredictionMarketOrder = {
  mode: PredictionMarketMode
  outcomeId: string
  /** Dollars when buying, shares when selling (as typed). */
  amount: string
}

type PredictionMarketQuote = {
  valid: boolean
  amount: number
  price: number
  shares: number
  /** Buy: payout if the outcome wins. Sell: proceeds now. */
  payout: number
  error?: string
}

type PredictionMarketProps = Omit<React.ComponentProps<"section">, "onChange" | "defaultValue"> & {
  /** Market question shown above the ticket. */
  question?: string
  outcomes?: PredictionMarketOutcome[]
  value?: PredictionMarketOrder
  defaultValue?: Partial<PredictionMarketOrder>
  onValueChange?: (order: PredictionMarketOrder) => void
  /** Place the order. Return a promise to drive the loading state; reject to show an error. */
  onTrade?: (order: PredictionMarketOrder, quote: PredictionMarketQuote) => void | Promise<unknown>
  /** Cash available for buys. */
  balance?: number
  /** Shares held per outcome id, for sells. */
  positions?: Record<string, number>
  /** Quick-add increments (dollars when buying, shares when selling). */
  quickAmounts?: number[]
  minTrade?: number
  orderTypeLabel?: string
}

/* ───────────────────────── Helpers ───────────────────────── */

const EASE = [0.22, 1, 0.36, 1] as const
const SLIDE = { type: "spring", stiffness: 420, damping: 36, mass: 0.7 } as const

const DEFAULT_OUTCOMES: PredictionMarketOutcome[] = [
  { id: "yes", label: "Yes", price: 0.62, tone: "positive" },
  { id: "no", label: "No", price: 0.38, tone: "negative" },
]

function sanitize(raw: string) {
  const cleaned = raw.replace(/,/g, "").replace(/[^\d.]/g, "")
  const [whole, ...rest] = cleaned.split(".")
  const w = whole.replace(/^0+(?=\d)/, "").slice(0, 9)
  return rest.length ? `${w || "0"}.${rest.join("").slice(0, 2)}` : w
}

const usd = (v: number, max = 2) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: max }).format(v)

const cents = (p: number) => {
  const c = p * 100
  return `${Number.isInteger(Math.round(c * 10) / 10) ? Math.round(c) : c.toFixed(1)}¢`
}

function quoteOrder(
  order: PredictionMarketOrder,
  outcome: PredictionMarketOutcome,
  balance: number,
  held: number,
  minTrade: number
): PredictionMarketQuote {
  const amount = Number(order.amount) || 0
  const price = Math.min(0.99, Math.max(0.01, outcome.price))
  const shares = order.mode === "buy" ? amount / price : amount
  const payout = order.mode === "buy" ? shares : amount * price
  const base = { amount, price, shares, payout }
  if (amount <= 0) return { ...base, valid: false, error: "Enter an amount" }
  if (order.mode === "buy" && amount < minTrade) return { ...base, valid: false, error: `Minimum ${usd(minTrade, 0)}` }
  if (order.mode === "buy" && amount > balance) return { ...base, valid: false, error: "Insufficient balance" }
  if (order.mode === "sell" && amount > held) return { ...base, valid: false, error: "Not enough shares" }
  return { ...base, valid: true }
}

/** Gives each character a stable key so only changed ones animate. */
function keyChars(value: string) {
  const seen: Record<string, number> = {}
  return Array.from(value).map((char) => {
    seen[char] = (seen[char] ?? 0) + 1
    return { key: `${char}${seen[char]}`, char }
  })
}

function amountSize(value: string) {
  const n = value.replace(/\D/g, "").length
  if (n >= 9) return "text-3xl"
  if (n >= 7) return "text-4xl"
  return "text-5xl"
}

/* ───────────────────────── Rolling amount entry ───────────────────────── */

function RollingAmount({
  id,
  value,
  prefix,
  disabled,
  onChange,
  label,
}: {
  id: string
  value: string
  prefix?: string
  disabled?: boolean
  onChange: (v: string) => void
  label: string
}) {
  const reduce = useReducedMotion()
  const shown = value || "0"
  const chars = keyChars(shown)
  const size = amountSize(value)

  return (
    <div className={cn("flex h-16 items-center justify-center font-semibold tracking-tight tabular-nums transition-[font-size] duration-200", size)}>
      {prefix ? <span aria-hidden className="text-muted-foreground/60">{prefix}</span> : null}
      <span className="relative inline-flex min-w-[0.6em]">
        {/* The real input sits on top (transparent text, visible caret); the digits underneath animate. */}
        <input
          id={id}
          value={value}
          onChange={(e) => onChange(sanitize(e.target.value))}
          inputMode="decimal"
          autoComplete="off"
          placeholder="0"
          disabled={disabled}
          aria-label={label}
          className="absolute inset-0 w-full min-w-0 bg-transparent text-transparent caret-primary outline-none placeholder:text-transparent selection:bg-primary/20 disabled:cursor-not-allowed"
          style={{ font: "inherit", letterSpacing: "inherit" }}
        />
        <span aria-hidden className={cn("pointer-events-none inline-flex", !value && "text-muted-foreground/45")}>
          <AnimatePresence initial={false} mode="popLayout">
            {chars.map(({ key, char }) => (
              <motion.span
                key={key}
                layout={reduce ? false : "position"}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: "45%", filter: "blur(6px)", scale: 0.9 }}
                animate={{ opacity: 1, y: "0%", filter: "blur(0px)", scale: 1 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: "-40%", filter: "blur(6px)", scale: 0.9 }}
                transition={reduce ? { duration: 0.12 } : { type: "spring", stiffness: 520, damping: 34, mass: 0.6 }}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
          </AnimatePresence>
        </span>
      </span>
    </div>
  )
}

/* ───────────────────────── Outcome selector ───────────────────────── */

function OutcomePicker({
  outcomes,
  value,
  onChange,
  disabled,
}: {
  outcomes: PredictionMarketOutcome[]
  value: string
  onChange: (id: string) => void
  disabled?: boolean
}) {
  const reduce = useReducedMotion()
  const layoutId = React.useId()
  return (
    <RadioGroupPrimitive
      aria-label="Outcome"
      value={value}
      onValueChange={(v) => onChange(v as string)}
      disabled={disabled}
      className="grid gap-1 rounded-2xl bg-muted/60 p-1 shadow-well"
      style={{ gridTemplateColumns: `repeat(${outcomes.length}, minmax(0, 1fr))` }}
    >
      {outcomes.map((o, i) => {
        const tone = o.tone ?? (i === 0 ? "positive" : "negative")
        const selected = o.id === value
        return (
          <RadioPrimitive.Root
            key={o.id}
            value={o.id}
            className={cn(
              "relative flex h-12 cursor-pointer items-center justify-center gap-1.5 rounded-xl text-sm font-semibold outline-none select-none focus-visible:ring-3 focus-visible:ring-ring data-disabled:cursor-not-allowed",
              selected
                ? tone === "positive"
                  ? "text-success"
                  : "text-destructive"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {selected ? (
              <motion.span
                layoutId={layoutId}
                transition={reduce ? { duration: 0 } : SLIDE}
                className={cn(
                  "absolute inset-0 rounded-xl bg-card bg-linear-to-b to-transparent shadow-raised",
                  tone === "positive" ? "from-success/14" : "from-destructive/12"
                )}
              />
            ) : null}
            <span className="relative">{o.label}</span>
            <span className="relative tabular-nums opacity-80">{cents(o.price)}</span>
          </RadioPrimitive.Root>
        )
      })}
    </RadioGroupPrimitive>
  )
}

/* ───────────────────────── Ticket ───────────────────────── */

function PredictionMarket({
  question = "Will the Fed cut rates in December?",
  outcomes = DEFAULT_OUTCOMES,
  value,
  defaultValue,
  onValueChange,
  onTrade,
  balance = 500,
  positions = { yes: 40, no: 0 },
  quickAmounts,
  minTrade = 1,
  orderTypeLabel = "Market",
  className,
  ...props
}: PredictionMarketProps) {
  const reduce = useReducedMotion()
  const inputId = React.useId()
  const amountRef = React.useRef<HTMLDivElement>(null)
  const [inner, setInner] = React.useState<PredictionMarketOrder>({
    mode: defaultValue?.mode ?? "buy",
    outcomeId: defaultValue?.outcomeId ?? outcomes[0]?.id ?? "",
    amount: defaultValue?.amount ?? "",
  })
  const order = value ?? inner
  const [status, setStatus] = React.useState<ButtonState>("idle")

  const outcome = outcomes.find((o) => o.id === order.outcomeId) ?? outcomes[0]
  const held = positions[outcome.id] ?? 0
  const quote = quoteOrder(order, outcome, balance, held, minTrade)
  const buying = order.mode === "buy"
  const chips = quickAmounts ?? (buying ? [1, 20, 100] : [5, 10, 25])
  const busy = status === "loading"

  const update = (patch: Partial<PredictionMarketOrder>) => {
    const next = { ...order, ...patch }
    if (value === undefined) setInner(next)
    onValueChange?.(next)
    if (!busy) setStatus("idle")
  }

  const shake = () => {
    if (reduce || !amountRef.current) return
    animate(amountRef.current, { x: [0, -6, 6, -4, 4, -1, 0] }, { duration: 0.4, ease: EASE })
  }

  const submit = async () => {
    if (busy) return
    if (!quote.valid) {
      setStatus("error")
      shake()
      return
    }
    setStatus("loading")
    try {
      await (onTrade?.(order, quote) ?? new Promise((r) => setTimeout(r, 900)))
      setStatus("success")
    } catch {
      setStatus("error")
    }
  }

  // A filled trade settles back to idle so the ticket is ready for the next one.
  React.useEffect(() => {
    if (status !== "success") return
    const t = window.setTimeout(() => {
      setStatus("idle")
      update({ amount: "" })
    }, 1800)
    return () => window.clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status])

  const returnPct = buying && quote.amount > 0 ? (quote.payout / quote.amount - 1) * 100 : 0
  const tone = outcome.tone ?? (outcomes.indexOf(outcome) === 0 ? "positive" : "negative")

  return (
    <section
      data-slot="prediction-market"
      aria-label={`Trade: ${question}`}
      className={cn(
        "w-full max-w-[380px] overflow-hidden rounded-3xl bg-card text-card-foreground shadow-surface",
        className
      )}
      {...props}
    >
      <header className="flex flex-col gap-3 px-4 pt-4">
        <h2 className="text-sm leading-snug font-semibold tracking-tight text-balance">{question}</h2>
        <div className="flex items-center justify-between">
          <Tabs value={order.mode} onValueChange={(m) => update({ mode: m as PredictionMarketMode, amount: "" })}>
            <TabsList aria-label="Order side">
              <TabsTab value="buy" disabled={busy}>
                Buy
              </TabsTab>
              <TabsTab value="sell" disabled={busy}>
                Sell
              </TabsTab>
            </TabsList>
          </Tabs>
          <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground shadow-chip">
            {orderTypeLabel}
          </span>
        </div>
      </header>

      <div className="flex flex-col gap-3 p-3">
        <OutcomePicker outcomes={outcomes} value={outcome.id} onChange={(outcomeId) => update({ outcomeId })} disabled={busy} />

        <div ref={amountRef} className="rounded-[1.25rem] bg-muted/40 px-3 pt-3 pb-3.5 shadow-well">
          <div className="flex items-center justify-between px-1 text-xs text-muted-foreground">
            <label htmlFor={inputId} className="font-medium text-foreground">
              {buying ? "Amount" : "Shares"}
            </label>
            <span className="inline-flex items-center gap-1 tabular-nums">
              <CreditCardIcon className="size-3.5" />
              {buying ? `${usd(balance)} available` : `${held.toLocaleString("en-US")} ${outcome.label} shares`}
            </span>
          </div>

          <RollingAmount
            id={inputId}
            value={order.amount}
            prefix={buying ? "$" : undefined}
            onChange={(amount) => update({ amount })}
            disabled={busy}
            label={buying ? "Amount in dollars" : "Number of shares"}
          />

          <div role="group" aria-label="Quick amounts" className="flex flex-wrap justify-center gap-1.5">
            {chips.map((inc) => (
              <motion.button
                key={inc}
                type="button"
                disabled={busy}
                whileTap={reduce ? undefined : { scale: 0.92, y: 1 }}
                onClick={() => update({ amount: String(Number(((Number(order.amount) || 0) + inc).toFixed(2))) })}
                className="h-8 cursor-pointer rounded-full bg-secondary bg-linear-to-b from-white/6 to-transparent px-3 text-xs font-semibold text-secondary-foreground tabular-nums shadow-raised outline-none hover:shadow-raised-hover focus-visible:ring-3 focus-visible:ring-ring disabled:opacity-50"
              >
                +{buying ? usd(inc, 0) : inc}
              </motion.button>
            ))}
            <motion.button
              type="button"
              disabled={busy}
              whileTap={reduce ? undefined : { scale: 0.92, y: 1 }}
              onClick={() => update({ amount: buying ? String(Math.floor(balance)) : String(held) })}
              className="h-8 cursor-pointer rounded-full bg-secondary bg-linear-to-b from-white/6 to-transparent px-3 text-xs font-semibold text-secondary-foreground shadow-raised outline-none hover:shadow-raised-hover focus-visible:ring-3 focus-visible:ring-ring disabled:opacity-50"
            >
              Max
            </motion.button>
          </div>
        </div>
      </div>

      <footer className="border-t border-border/60 px-4 pt-3 pb-4">
        <div className="mb-3 flex items-end justify-between gap-3">
          <div className="min-w-0">
            <p className="flex items-center gap-1.5 text-sm font-semibold">
              {buying ? "To win" : "You'll receive"}
              <SparklesIcon className={cn("size-4", tone === "positive" ? "text-success" : "text-destructive")} />
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground tabular-nums">
              Avg. {cents(quote.price)}
              {buying && quote.shares > 0 ? ` · ${quote.shares.toFixed(1)} shares` : ""}
            </p>
          </div>
          <div className="flex flex-col items-end">
            <NumberTicker
              value={quote.payout}
              startOnView={false}
              stagger={0.02}
              format={{ style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 }}
              locale="en-US"
              className={cn(
                "text-3xl leading-none font-semibold tracking-tight",
                quote.payout > 0 ? "text-success" : "text-muted-foreground"
              )}
            />
            <AnimatePresence initial={false}>
              {returnPct > 0 ? (
                <motion.span
                  key="ret"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.2, ease: EASE }}
                  className="mt-1 text-xs font-medium text-success tabular-nums"
                >
                  +{returnPct.toFixed(0)}% if {outcome.label}
                </motion.span>
              ) : null}
            </AnimatePresence>
          </div>
        </div>

        <StatefulButton
          size="lg"
          state={status}
          onClick={submit}
          loadingText="Placing order"
          successText={buying ? `Bought ${quote.shares.toFixed(1)} ${outcome.label}` : `Sold for ${usd(quote.payout)}`}
          errorText={quote.error ?? "Order failed"}
          className="h-12 w-full rounded-2xl text-[0.95rem]"
        >
          {buying ? `Buy ${outcome.label}` : `Sell ${outcome.label}`}
        </StatefulButton>
        <p className="mt-2.5 flex items-center justify-center gap-1 text-[11px] text-muted-foreground">
          <InfoIcon className="size-3" />
          Each share pays $1 if {outcome.label} resolves true.
        </p>
      </footer>
    </section>
  )
}

export {
  PredictionMarket,
  type PredictionMarketProps,
  type PredictionMarketMode,
  type PredictionMarketOutcome,
  type PredictionMarketOrder,
  type PredictionMarketQuote,
}
