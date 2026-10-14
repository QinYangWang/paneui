"use client"

import * as React from "react"
import { AnimatePresence, motion, useReducedMotion, type Transition } from "motion/react"

import {
  CheckIcon,
  ChevronDownIcon,
  ClockIcon,
  CreditCardIcon,
  LoaderIcon,
  SearchIcon,
  SettingsIcon,
  SortIcon,
  XIcon,
} from "@/components/icons"
import { cn } from "@/lib/utils"
import { StatefulButton, type ButtonState } from "@/registry/base-nova/ui/button-stateful"

/* ───────────────────────── Types & sample data ───────────────────────── */

type SwapChain = {
  id: string
  name: string
  /** Brand colour for the coloured-initial logo (any CSS colour). */
  color: string
  /** One or two characters drawn in the logo. */
  glyph?: string
}

type SwapToken = {
  id: string
  symbol: string
  name: string
  chainId: string
  /** USD price used for the sample quote. */
  usd: number
  balance?: number
  color: string
  popular?: boolean
}

type SwapSide = "from" | "to"

type SwapQuote = {
  from: SwapToken
  to: SwapToken
  amountIn: number
  amountOut: number
  rate: number
  feeUsd: number
  slippage: number
  etaSeconds: number
}

const SWAP_CHAINS: SwapChain[] = [
  { id: "eth", name: "Ethereum", color: "#627eea", glyph: "Ξ" },
  { id: "sol", name: "Solana", color: "#9945ff", glyph: "◎" },
  { id: "base", name: "Base", color: "#0052ff", glyph: "B" },
  { id: "arb", name: "Arbitrum", color: "#28a0f0", glyph: "A" },
  { id: "op", name: "Optimism", color: "#ff0420", glyph: "O" },
  { id: "poly", name: "Polygon", color: "#8247e5", glyph: "P" },
]

const SWAP_TOKENS: SwapToken[] = [
  { id: "eth-eth", symbol: "ETH", name: "Ether", chainId: "eth", usd: 3142, balance: 1.245, color: "#627eea", popular: true },
  { id: "eth-usdc", symbol: "USDC", name: "USD Coin", chainId: "eth", usd: 1, balance: 4521, color: "#2775ca", popular: true },
  { id: "eth-usdt", symbol: "USDT", name: "Tether", chainId: "eth", usd: 1, balance: 2100, color: "#26a17b", popular: true },
  { id: "eth-wbtc", symbol: "WBTC", name: "Wrapped Bitcoin", chainId: "eth", usd: 96000, balance: 0.04, color: "#f7931a", popular: true },
  { id: "eth-link", symbol: "LINK", name: "Chainlink", chainId: "eth", usd: 22.4, balance: 120, color: "#2a5ada" },
  { id: "sol-sol", symbol: "SOL", name: "Solana", chainId: "sol", usd: 168, balance: 12.4, color: "#9945ff", popular: true },
  { id: "sol-usdc", symbol: "USDC", name: "USD Coin", chainId: "sol", usd: 1, balance: 985.32, color: "#2775ca" },
  { id: "sol-jup", symbol: "JUP", name: "Jupiter", chainId: "sol", usd: 0.92, balance: 0, color: "#4bb38a" },
  { id: "base-eth", symbol: "ETH", name: "Ether", chainId: "base", usd: 3142, balance: 0.65, color: "#627eea" },
  { id: "base-usdc", symbol: "USDC", name: "USD Coin", chainId: "base", usd: 1, balance: 1200, color: "#2775ca" },
  { id: "arb-arb", symbol: "ARB", name: "Arbitrum", chainId: "arb", usd: 0.95, balance: 800, color: "#28a0f0" },
  { id: "arb-eth", symbol: "ETH", name: "Ether", chainId: "arb", usd: 3142, balance: 0.32, color: "#627eea" },
  { id: "op-op", symbol: "OP", name: "Optimism", chainId: "op", usd: 2.8, balance: 450, color: "#ff0420" },
  { id: "poly-pol", symbol: "POL", name: "Polygon", chainId: "poly", usd: 0.75, balance: 1500, color: "#8247e5" },
]

/* ───────────────────────── Helpers ───────────────────────── */

const EASE = [0.22, 1, 0.36, 1] as const
const PANEL: Transition = { type: "spring", stiffness: 420, damping: 38, mass: 0.8 }
const FLIP: Transition = { type: "spring", stiffness: 380, damping: 22, mass: 0.6 }

function formatAmount(value: number, max = 6) {
  if (!Number.isFinite(value) || value === 0) return "0"
  const digits = value >= 1000 ? 2 : value >= 1 ? 4 : max
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: digits }).format(value)
}

function formatUsd(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value || 0)
}

function sanitizeAmount(raw: string) {
  const cleaned = raw.replace(/,/g, ".").replace(/[^\d.]/g, "")
  const [whole, ...rest] = cleaned.split(".")
  const normalisedWhole = whole.replace(/^0+(?=\d)/, "")
  return rest.length ? `${normalisedWhole || "0"}.${rest.join("").slice(0, 8)}` : normalisedWhole
}

/* ───────────────────────── Logos (coloured initials, no images) ───────────────────────── */

function ChainLogo({ chain, size = 16, className }: { chain: SwapChain; size?: number; className?: string }) {
  return (
    <span
      aria-hidden
      data-slot="swap-chain-logo"
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full font-semibold text-white ring-2 ring-card",
        className
      )}
      style={{
        width: size,
        height: size,
        fontSize: size * 0.55,
        backgroundColor: chain.color,
      }}
    >
      {chain.glyph ?? chain.name[0]}
    </span>
  )
}

function TokenLogo({
  token,
  chain,
  size = 28,
  className,
}: {
  token: SwapToken
  chain?: SwapChain
  size?: number
  className?: string
}) {
  return (
    <span aria-hidden data-slot="swap-token-logo" className={cn("relative inline-flex shrink-0", className)}>
      <span
        className="inline-flex items-center justify-center rounded-full font-bold tracking-tight text-white shadow-chip"
        style={{
          width: size,
          height: size,
          fontSize: size * (token.symbol.length > 3 ? 0.3 : 0.36),
          backgroundColor: token.color,
        }}
      >
        {token.symbol.slice(0, 4)}
      </span>
      {chain ? (
        <ChainLogo chain={chain} size={Math.round(size * 0.46)} className="absolute -right-0.5 -bottom-0.5" />
      ) : null}
    </span>
  )
}

/* ───────────────────────── Field ───────────────────────── */

function SwapField({
  side,
  token,
  chain,
  amount,
  onAmountChange,
  quoting,
  invalid,
  onOpenPicker,
  disabled,
}: {
  side: SwapSide
  token: SwapToken
  chain: SwapChain
  amount: string
  onAmountChange?: (value: string) => void
  quoting?: boolean
  invalid?: boolean
  onOpenPicker: () => void
  disabled?: boolean
}) {
  const id = React.useId()
  const reduce = useReducedMotion()
  const usd = (Number(amount) || 0) * token.usd
  const editable = side === "from"

  return (
    <div
      data-slot="swap-field"
      data-side={side}
      className={cn(
        "rounded-2xl bg-muted/60 p-3.5 shadow-well transition-shadow",
        editable && "focus-within:ring-3 focus-within:ring-ring/60",
        invalid && "ring-2 ring-destructive/40"
      )}
    >
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="text-xs font-medium text-muted-foreground">
          {side === "from" ? "You pay" : "You receive"}
        </label>
        <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <ChainLogo chain={chain} size={12} className="ring-0" />
          {chain.name}
        </span>
      </div>

      <div className="mt-1.5 flex items-center gap-3">
        <div className="relative min-w-0 flex-1">
          {editable ? (
            <input
              id={id}
              inputMode="decimal"
              autoComplete="off"
              placeholder="0"
              value={amount}
              disabled={disabled}
              aria-invalid={invalid || undefined}
              onChange={(e) => onAmountChange?.(sanitizeAmount(e.target.value))}
              className="h-10 w-full bg-transparent text-[1.75rem] font-semibold tracking-tight tabular-nums outline-none placeholder:text-muted-foreground/50 disabled:opacity-60"
            />
          ) : (
            <output
              id={id}
              aria-live="polite"
              aria-busy={quoting || undefined}
              className="flex h-10 items-center gap-2 text-[1.75rem] font-semibold tracking-tight tabular-nums"
            >
              <motion.span
                initial={false}
                animate={{ opacity: quoting ? 0.45 : 1, filter: quoting && !reduce ? "blur(3px)" : "blur(0px)" }}
                transition={{ duration: 0.2, ease: EASE }}
                className={cn("truncate", !amount && "text-muted-foreground/50")}
              >
                {amount || "0"}
              </motion.span>
            </output>
          )}
        </div>

        <button
          type="button"
          onClick={onOpenPicker}
          disabled={disabled}
          aria-haspopup="dialog"
          aria-label={`${side === "from" ? "Pay with" : "Receive"} ${token.symbol} on ${chain.name}. Change token`}
          className="inline-flex h-10 shrink-0 cursor-pointer items-center gap-2 rounded-xl bg-secondary py-1 pr-2.5 pl-1 text-sm font-semibold text-secondary-foreground shadow-raised transition-[box-shadow,background-color,scale] duration-150 ease-out outline-none hover:bg-accent hover:shadow-raised-hover focus-visible:ring-3 focus-visible:ring-ring enabled:active:scale-96 disabled:opacity-50"
        >
          <TokenLogo token={token} chain={chain} size={30} />
          {token.symbol}
          <ChevronDownIcon className="size-3.5 text-muted-foreground" />
        </button>
      </div>

      <div className="mt-2 flex h-5 items-center justify-between text-xs text-muted-foreground tabular-nums">
        <span>{formatUsd(usd)}</span>
        <span className="inline-flex items-center gap-1.5">
          <CreditCardIcon className="size-3.5" />
          {formatAmount(token.balance ?? 0)}
          {editable && token.balance ? (
            <button
              type="button"
              disabled={disabled}
              onClick={() => onAmountChange?.(String(token.balance))}
              className="ml-0.5 cursor-pointer rounded-full bg-background/70 px-1.5 py-px text-[10px] font-semibold tracking-wide text-foreground uppercase shadow-chip outline-none hover:bg-background focus-visible:ring-2 focus-visible:ring-ring"
            >
              Max
            </button>
          ) : null}
        </span>
      </div>
    </div>
  )
}

/* ───────────────────────── Flip button ───────────────────────── */

function FlipButton({ onFlip, disabled }: { onFlip: () => void; disabled?: boolean }) {
  const reduce = useReducedMotion()
  const [turns, setTurns] = React.useState(0)
  return (
    <div className="relative z-10 -my-[18px] flex justify-center">
      <motion.button
        type="button"
        aria-label="Switch pay and receive tokens"
        disabled={disabled}
        onClick={() => {
          setTurns((t) => t + 1)
          onFlip()
        }}
        whileTap={reduce ? undefined : { scale: 0.88 }}
        whileHover={reduce ? undefined : { scale: 1.06 }}
        className="inline-flex size-10 cursor-pointer items-center justify-center rounded-full bg-secondary text-secondary-foreground shadow-raised ring-4 ring-card outline-none focus-visible:ring-3 focus-visible:ring-ring disabled:opacity-50"
      >
        <motion.span
          className="inline-flex"
          initial={false}
          animate={{ rotate: reduce ? 0 : turns * 180 }}
          transition={FLIP}
        >
          <SortIcon className="size-4" />
        </motion.span>
      </motion.button>
    </div>
  )
}

/* ───────────────────────── Quote ───────────────────────── */

type QuoteStatus = "empty" | "quoting" | "ready" | "insufficient"

function QuoteRow({
  status,
  quote,
  fromChain,
  toChain,
}: {
  status: QuoteStatus
  quote: SwapQuote
  fromChain: SwapChain
  toChain: SwapChain
}) {
  const reduce = useReducedMotion()
  const [open, setOpen] = React.useState(false)
  const detailsId = React.useId()
  const showDetails = open && status !== "empty"

  const summary =
    status === "empty" ? (
      <span className="text-muted-foreground">Enter an amount to get a quote</span>
    ) : status === "quoting" ? (
      <span className="inline-flex items-center gap-1.5 text-muted-foreground">
        <LoaderIcon className="size-3.5 animate-spin motion-reduce:animate-none" />
        Finding the best route…
      </span>
    ) : (
      <span className="tabular-nums">
        1 {quote.from.symbol} ≈ {formatAmount(quote.rate)} {quote.to.symbol}
      </span>
    )

  const rows: [string, React.ReactNode][] = [
    [
      "Route",
      <span key="route" className="inline-flex items-center gap-1">
        <ChainLogo chain={fromChain} size={13} className="ring-0" />
        {fromChain.name}
        <span aria-hidden className="text-muted-foreground">→</span>
        <ChainLogo chain={toChain} size={13} className="ring-0" />
        {toChain.name}
      </span>,
    ],
    ["Network fee", formatUsd(quote.feeUsd)],
    ["Max slippage", `${quote.slippage}%`],
    [
      "Minimum received",
      `${formatAmount(quote.amountOut * (1 - quote.slippage / 100))} ${quote.to.symbol}`,
    ],
  ]

  return (
    <div data-slot="swap-quote" data-status={status} className="rounded-2xl bg-muted/40 text-xs shadow-well">
      <button
        type="button"
        aria-expanded={showDetails}
        aria-controls={detailsId}
        disabled={status === "empty"}
        onClick={() => setOpen((v) => !v)}
        className="flex h-10 w-full cursor-pointer items-center justify-between gap-2 rounded-2xl px-3.5 text-left outline-none focus-visible:ring-3 focus-visible:ring-ring disabled:cursor-default"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={status === "insufficient" ? "ready" : status}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 6, filter: "blur(3px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6, filter: "blur(3px)" }}
            transition={{ duration: 0.2, ease: EASE }}
            className="min-w-0 truncate"
          >
            {summary}
          </motion.span>
        </AnimatePresence>
        {status !== "empty" ? (
          <span className="inline-flex shrink-0 items-center gap-2 text-muted-foreground">
            <span className="inline-flex items-center gap-1 tabular-nums">
              <ClockIcon className="size-3.5" />~{quote.etaSeconds}s
            </span>
            <motion.span
              initial={false}
              animate={{ rotate: showDetails ? 180 : 0 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="inline-flex"
            >
              <ChevronDownIcon className="size-3.5" />
            </motion.span>
          </span>
        ) : null}
      </button>
      <AnimatePresence initial={false}>
        {showDetails ? (
          <motion.div
            id={detailsId}
            key="details"
            initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.26, ease: EASE }}
            className="overflow-hidden"
          >
            <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 border-t border-border/60 px-3.5 pt-2.5 pb-3">
              {rows.map(([label, value]) => (
                <React.Fragment key={label}>
                  <dt className="text-muted-foreground">{label}</dt>
                  <dd className="text-right tabular-nums">{value}</dd>
                </React.Fragment>
              ))}
            </dl>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

/* ───────────────────────── Token picker (in-card sheet) ───────────────────────── */

function TokenPicker({
  side,
  chains,
  tokens,
  selectedId,
  onPick,
  onClose,
}: {
  side: SwapSide
  chains: SwapChain[]
  tokens: SwapToken[]
  selectedId: string
  onPick: (id: string) => void
  onClose: () => void
}) {
  const reduce = useReducedMotion()
  const titleId = React.useId()
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [query, setQuery] = React.useState("")
  const selectedChain = tokens.find((t) => t.id === selectedId)?.chainId ?? "all"
  const [chainFilter, setChainFilter] = React.useState<string>(selectedChain)
  const chainById = React.useMemo(() => new Map(chains.map((c) => [c.id, c])), [chains])

  React.useEffect(() => {
    const frame = requestAnimationFrame(() => inputRef.current?.focus({ preventScroll: true }))
    return () => cancelAnimationFrame(frame)
  }, [])

  const needle = query.trim().toLowerCase()
  const results = tokens.filter((t) => {
    if (chainFilter !== "all" && t.chainId !== chainFilter) return false
    if (!needle) return true
    return [t.symbol, t.name, chainById.get(t.chainId)?.name].some((s) => s?.toLowerCase().includes(needle))
  })
  const popular = tokens.filter((t) => t.popular)

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      data-slot="swap-token-picker"
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.98 }}
      transition={reduce ? { duration: 0.15 } : PANEL}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          e.stopPropagation()
          onClose()
        }
      }}
      className="absolute inset-0 z-30 flex flex-col bg-card"
    >
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <h3 id={titleId} className="text-sm font-semibold">
          {side === "from" ? "Pay with" : "Receive"}
        </h3>
        <button
          type="button"
          aria-label="Close token picker"
          onClick={onClose}
          className="inline-flex size-8 cursor-pointer items-center justify-center rounded-full text-muted-foreground outline-none hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring"
        >
          <XIcon className="size-4" />
        </button>
      </div>

      <div className="px-4">
        <label className="flex h-10 items-center gap-2 rounded-xl bg-muted/60 px-3 shadow-well focus-within:ring-3 focus-within:ring-ring/60">
          <SearchIcon className="size-4 shrink-0 text-muted-foreground" />
          <span className="sr-only">Search tokens</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search token or chain"
            autoComplete="off"
            spellCheck={false}
            className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </label>
      </div>

      <div
        role="group"
        aria-label="Filter by chain"
        className="flex gap-1.5 overflow-x-auto px-4 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {[{ id: "all", name: "All" } as const, ...chains].map((c) => {
          const active = chainFilter === c.id
          const chain = c.id === "all" ? undefined : chainById.get(c.id)
          return (
            <button
              key={c.id}
              type="button"
              aria-pressed={active}
              onClick={() => setChainFilter(c.id)}
              className={cn(
                "relative inline-flex h-8 shrink-0 cursor-pointer items-center gap-1.5 rounded-lg px-3 text-xs font-medium outline-none focus-visible:ring-3 focus-visible:ring-ring",
                active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {active ? (
                <motion.span
                  layoutId={`${titleId}-chain`}
                  transition={reduce ? { duration: 0 } : PANEL}
                  className="absolute inset-0 -z-0 rounded-lg bg-secondary shadow-raised"
                />
              ) : null}
              <span className="relative inline-flex items-center gap-1.5">
                {chain ? <ChainLogo chain={chain} size={14} className="ring-0" /> : null}
                {c.name}
              </span>
            </button>
          )
        })}
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-2 pb-3">
        {!needle && chainFilter === "all" && popular.length ? (
          <div className="px-2 pb-2">
            <p className="pb-2 text-[11px] font-medium tracking-wide text-muted-foreground uppercase">Popular</p>
            <div className="flex flex-wrap gap-1.5">
              {popular.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => onPick(t.id)}
                  className="inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-full bg-muted/50 py-1 pr-3 pl-1 text-xs font-semibold shadow-chip outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring"
                >
                  <TokenLogo token={t} size={22} />
                  {t.symbol}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        <p className="px-2 pt-2 pb-1 text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
          {needle ? "Results" : "Tokens"}
        </p>
        <ul className="flex flex-col">
          <AnimatePresence initial={false} mode="popLayout">
            {results.map((t) => {
              const chain = chainById.get(t.chainId)
              if (!chain) return null
              const selected = t.id === selectedId
              return (
                <motion.li
                  key={t.id}
                  layout={reduce ? false : "position"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.16, ease: EASE }}
                >
                  <button
                    type="button"
                    aria-current={selected || undefined}
                    onClick={() => onPick(t.id)}
                    className={cn(
                      "flex w-full cursor-pointer items-center gap-3 rounded-xl px-2 py-2 text-left outline-none focus-visible:ring-3 focus-visible:ring-ring",
                      selected ? "bg-muted" : "hover:bg-muted/60"
                    )}
                  >
                    <TokenLogo token={t} chain={chain} size={34} />
                    <span className="flex min-w-0 flex-1 flex-col">
                      <span className="truncate text-sm font-semibold">{t.name}</span>
                      <span className="truncate text-xs text-muted-foreground">
                        {t.symbol} · {chain.name}
                      </span>
                    </span>
                    <span className="flex shrink-0 flex-col items-end text-xs tabular-nums">
                      <span className={cn(!t.balance && "text-muted-foreground")}>{formatAmount(t.balance ?? 0)}</span>
                      <span className="text-muted-foreground">{formatUsd((t.balance ?? 0) * t.usd)}</span>
                    </span>
                    {selected ? <CheckIcon className="size-4 shrink-0 text-primary" /> : null}
                  </button>
                </motion.li>
              )
            })}
          </AnimatePresence>
          {results.length === 0 ? (
            <li className="py-10 text-center text-sm text-muted-foreground">No tokens match “{query}”</li>
          ) : null}
        </ul>
      </div>
    </motion.div>
  )
}

/* ───────────────────────── Settings (slippage) ───────────────────────── */

const SLIPPAGE_OPTIONS = [0.1, 0.5, 1]

function SlippageRow({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const reduce = useReducedMotion()
  const id = React.useId()
  return (
    <motion.div
      key="slippage"
      initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
      animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
      exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
      transition={{ duration: 0.26, ease: EASE }}
      className="overflow-hidden"
    >
      <div className="flex items-center justify-between gap-3 px-4 pt-1 pb-3">
        <span id={id} className="text-xs text-muted-foreground">
          Max slippage
        </span>
        <div role="radiogroup" aria-labelledby={id} className="inline-flex gap-0.5 rounded-lg bg-muted/70 p-1 shadow-well">
          {SLIPPAGE_OPTIONS.map((opt) => {
            const active = opt === value
            return (
              <button
                key={opt}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => onChange(opt)}
                className={cn(
                  "relative h-6 cursor-pointer rounded-md px-2.5 text-xs font-medium tabular-nums outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {active ? (
                  <motion.span
                    layoutId={`${id}-slip`}
                    transition={reduce ? { duration: 0 } : PANEL}
                    className="absolute inset-0 rounded-md bg-secondary shadow-raised"
                  />
                ) : null}
                <span className="relative">{opt}%</span>
              </button>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}

/* ───────────────────────── Swap ───────────────────────── */

type SwapProps = {
  chains?: SwapChain[]
  tokens?: SwapToken[]
  defaultFromId?: string
  defaultToId?: string
  defaultAmount?: string
  /** Simulated quote latency in ms. */
  quoteDelay?: number
  /** Called when the user confirms. Return a promise to drive the loading state. */
  onSwap?: (quote: SwapQuote) => void | Promise<unknown>
  className?: string
}

function Swap({
  chains = SWAP_CHAINS,
  tokens = SWAP_TOKENS,
  defaultFromId = "eth-eth",
  defaultToId = "sol-sol",
  defaultAmount = "0.5",
  quoteDelay = 650,
  onSwap,
  className,
}: SwapProps) {
  const reduce = useReducedMotion()
  const [fromId, setFromId] = React.useState(defaultFromId)
  const [toId, setToId] = React.useState(defaultToId)
  const [amount, setAmount] = React.useState(defaultAmount)
  const [slippage, setSlippage] = React.useState(0.5)
  const [settingsOpen, setSettingsOpen] = React.useState(false)
  const [picking, setPicking] = React.useState<SwapSide | null>(null)
  const [quoting, setQuoting] = React.useState(false)
  const [action, setAction] = React.useState<ButtonState>("idle")
  const triggerRef = React.useRef<HTMLDivElement>(null)
  const returnFocus = React.useRef<SwapSide | null>(null)

  const from = tokens.find((t) => t.id === fromId) ?? tokens[0]
  const to = tokens.find((t) => t.id === toId) ?? tokens[1]
  const fromChain = chains.find((c) => c.id === from.chainId) ?? chains[0]
  const toChain = chains.find((c) => c.id === to.chainId) ?? chains[0]

  const amountIn = Number(amount) || 0
  const rate = from.usd / to.usd
  const crossChain = from.chainId !== to.chainId
  const quote: SwapQuote = {
    from,
    to,
    amountIn,
    amountOut: amountIn * rate * 0.997,
    rate: rate * 0.997,
    feeUsd: crossChain ? 1.84 : 0.42,
    slippage,
    etaSeconds: crossChain ? 24 : 6,
  }

  const insufficient = amountIn > (from.balance ?? 0)
  const status: QuoteStatus =
    amountIn <= 0 ? "empty" : quoting ? "quoting" : insufficient ? "insufficient" : "ready"

  // Re-quote whenever the pair or amount changes.
  React.useEffect(() => {
    if (amountIn <= 0) return
    setQuoting(true)
    const t = window.setTimeout(() => setQuoting(false), quoteDelay)
    return () => window.clearTimeout(t)
  }, [amountIn, fromId, toId, quoteDelay])

  // Any edit resets a finished swap back to idle.
  React.useEffect(() => {
    setAction((s) => (s === "loading" ? s : "idle"))
  }, [amountIn, fromId, toId])

  // Hand focus back to the trigger that opened the picker.
  React.useEffect(() => {
    if (picking || !returnFocus.current) return
    const side = returnFocus.current
    returnFocus.current = null
    triggerRef.current
      ?.querySelector<HTMLButtonElement>(`[data-side="${side}"] button[aria-haspopup]`)
      ?.focus({ preventScroll: true })
  }, [picking])

  const flip = () => {
    setFromId(toId)
    setToId(fromId)
    if (quote.amountOut > 0) setAmount(String(Number(quote.amountOut.toFixed(6))))
  }

  const pick = (id: string) => {
    if (picking === "from") {
      if (id === toId) setToId(fromId)
      setFromId(id)
    } else if (picking === "to") {
      if (id === fromId) setFromId(toId)
      setToId(id)
    }
    returnFocus.current = picking
    setPicking(null)
  }

  const submit = async () => {
    if (status !== "ready" || action === "loading") return
    setAction("loading")
    try {
      await (onSwap?.(quote) ?? new Promise((r) => setTimeout(r, 1400)))
      setAction("success")
    } catch {
      setAction("error")
    }
  }

  const label =
    status === "empty"
      ? "Enter an amount"
      : status === "insufficient"
        ? `Insufficient ${from.symbol}`
        : status === "quoting"
          ? "Fetching quote…"
          : crossChain
            ? `Bridge & swap to ${to.symbol}`
            : `Swap ${from.symbol} for ${to.symbol}`

  const busy = action === "loading"

  return (
    <section
      data-slot="swap"
      aria-label="Swap tokens"
      className={cn(
        "relative isolate w-full max-w-[400px] overflow-hidden rounded-3xl bg-card text-card-foreground shadow-surface",
        className
      )}
    >
      <motion.div
        inert={picking !== null}
        initial={false}
        animate={
          picking && !reduce
            ? { scale: 0.96, opacity: 0, filter: "blur(4px)" }
            : { scale: 1, opacity: 1, filter: "blur(0px)" }
        }
        transition={{ duration: 0.28, ease: EASE }}
      >
        <header className="flex items-center justify-between px-4 pt-3.5 pb-2">
          <h2 className="pl-1 text-base font-semibold tracking-tight">Swap</h2>
          <div className="flex items-center gap-1">
            <AnimatePresence initial={false}>
              {slippage !== 0.5 && !settingsOpen ? (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground tabular-nums shadow-chip"
                >
                  {slippage}% slippage
                </motion.span>
              ) : null}
            </AnimatePresence>
            <button
              type="button"
              aria-label="Swap settings"
              aria-expanded={settingsOpen}
              onClick={() => setSettingsOpen((v) => !v)}
              className="inline-flex size-8 cursor-pointer items-center justify-center rounded-full text-muted-foreground outline-none hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring aria-expanded:bg-muted aria-expanded:text-foreground"
            >
              <motion.span
                className="inline-flex"
                initial={false}
                animate={{ rotate: settingsOpen && !reduce ? 90 : 0 }}
                transition={{ duration: 0.35, ease: EASE }}
              >
                <SettingsIcon className="size-4" />
              </motion.span>
            </button>
          </div>
        </header>

        <AnimatePresence initial={false}>
          {settingsOpen ? <SlippageRow value={slippage} onChange={setSlippage} /> : null}
        </AnimatePresence>

        <div ref={triggerRef} className="flex flex-col gap-1.5 px-3 pb-3">
          <SwapField
            side="from"
            token={from}
            chain={fromChain}
            amount={amount}
            onAmountChange={setAmount}
            invalid={status === "insufficient"}
            disabled={busy}
            onOpenPicker={() => setPicking("from")}
          />
          <FlipButton onFlip={flip} disabled={busy} />
          <SwapField
            side="to"
            token={to}
            chain={toChain}
            amount={status === "empty" ? "" : formatAmount(quote.amountOut)}
            quoting={status === "quoting"}
            disabled={busy}
            onOpenPicker={() => setPicking("to")}
          />

          <div className="mt-1.5">
            <QuoteRow status={status} quote={quote} fromChain={fromChain} toChain={toChain} />
          </div>

          <StatefulButton
            size="lg"
            state={action}
            disabled={status !== "ready"}
            onClick={submit}
            loadingText={crossChain ? "Bridging…" : "Swapping…"}
            successText={`Received ${formatAmount(quote.amountOut)} ${to.symbol}`}
            errorText="Swap failed, retry"
            className="mt-2 h-12 w-full rounded-2xl text-[0.95rem]"
          >
            {label}
          </StatefulButton>
        </div>
      </motion.div>

      <AnimatePresence>
        {picking ? (
          <TokenPicker
            key="picker"
            side={picking}
            chains={chains}
            tokens={tokens}
            selectedId={picking === "from" ? fromId : toId}
            onPick={pick}
            onClose={() => {
              returnFocus.current = picking
              setPicking(null)
            }}
          />
        ) : null}
      </AnimatePresence>
    </section>
  )
}

export {
  Swap,
  TokenLogo,
  ChainLogo,
  SWAP_CHAINS,
  SWAP_TOKENS,
  type SwapProps,
  type SwapChain,
  type SwapToken,
  type SwapQuote,
  type SwapSide,
}
