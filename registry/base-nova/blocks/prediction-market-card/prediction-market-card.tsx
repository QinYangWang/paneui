"use client"

import * as React from "react"
import { motion, useReducedMotion } from "motion/react"

import { ArrowDownIcon, ArrowUpIcon, BookmarkIcon } from "@/components/icons"
import { cn } from "@/lib/utils"
import { ActionSwapText } from "@/registry/base-nova/ui/action-swap-blur"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/base-nova/ui/tooltip"

/* ───────────────────────── Types ───────────────────────── */

type PredictionMarketCardOutcome = {
  id: string
  label: string
  /** Implied probability of "Yes", 0–1. */
  probability: number
  /** Change since yesterday in probability points (e.g. 0.04 = +4 pts). */
  change?: number
  /** Short initials or an emoji shown in the outcome's avatar. */
  glyph?: React.ReactNode
  /** Accent colour for the avatar and probability bar (any CSS colour). */
  color?: string
}

type PredictionMarketCardSelection = {
  outcomeId: string
  side: "yes" | "no"
  /** Price in dollars per share (= probability of that side). */
  price: number
}

type PredictionMarketCardProps = Omit<React.ComponentProps<"article">, "title"> & {
  title: string
  /** Market avatar: initials, an emoji or an inline SVG. */
  icon?: React.ReactNode
  /** Background colour of the market avatar. */
  iconColor?: string
  category?: string
  /** Formatted volume, e.g. "$2.4M". */
  volume: string
  /** Chronological samples for the footer sparkline. */
  volumeHistory?: number[]
  /** Scheduled time or a live match status. */
  status?: string
  live?: boolean
  /**
   * One outcome renders a binary Yes / No market; several render one row each
   * with a single "Yes" odds button.
   */
  outcomes: PredictionMarketCardOutcome[]
  /** Fired when an odds button is pressed. The card keeps no selection state. */
  onOutcomeSelect?: (selection: PredictionMarketCardSelection) => void
  bookmarked?: boolean
  defaultBookmarked?: boolean
  onBookmarkedChange?: (bookmarked: boolean) => void
}

/* ───────────────────────── Helpers ───────────────────────── */

const EASE = [0.22, 1, 0.36, 1] as const
const PRESS = { type: "spring", stiffness: 520, damping: 30, mass: 0.6 } as const

function clamp01(v: number) {
  return Number.isFinite(v) ? Math.min(1, Math.max(0, v)) : 0
}

function multiplier(p: number) {
  const prob = clamp01(p)
  return prob > 0 ? `${(1 / prob).toFixed(prob > 0.5 ? 2 : 1)}×` : "—"
}

function useCanHover() {
  const [canHover, setCanHover] = React.useState(false)
  React.useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)")
    const update = () => setCanHover(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])
  return canHover
}

/* ───────────────────────── Pieces ───────────────────────── */

function MarketAvatar({
  children,
  color,
  size = "md",
}: {
  children?: React.ReactNode
  color?: string
  size?: "sm" | "md"
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex shrink-0 items-center justify-center overflow-hidden font-semibold shadow-chip",
        size === "md" ? "size-11 rounded-2xl text-sm" : "size-7 rounded-full text-[10px]",
        color ? "text-white" : "bg-muted text-foreground"
      )}
      style={
        color
          ? { backgroundColor: color }
          : undefined
      }
    >
      {children}
    </span>
  )
}

function OddsButton({
  side,
  price,
  label,
  onPress,
  binary = false,
  className,
}: {
  side: "yes" | "no"
  /** Binary markets read "Yes 62¢"; multi-outcome rows read "62%". */
  binary?: boolean
  price: number
  /** Accessible label of the outcome being traded. */
  label: string
  onPress: () => void
  className?: string
}) {
  const reduce = useReducedMotion()
  const canHover = useCanHover()
  const [hovered, setHovered] = React.useState(false)
  const [focused, setFocused] = React.useState(false)
  const cents = Math.round(clamp01(price) * 100)
  const showAction = (canHover && hovered) || focused
  const word = side === "yes" ? "Yes" : "No"

  return (
    <motion.button
      type="button"
      data-slot="prediction-odds-button"
      data-side={side}
      aria-label={`Buy ${word} on ${label} at ${cents} cents`}
      onClick={onPress}
      onPointerEnter={(e) => e.pointerType !== "touch" && setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocus={(e) => setFocused(e.currentTarget.matches(":focus-visible"))}
      onBlur={() => setFocused(false)}
      whileTap={reduce ? undefined : { scale: 0.95, y: 1 }}
      transition={PRESS}
      className={cn(
        "relative inline-flex h-9 min-w-[4.25rem] shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-xl px-3 text-sm font-semibold tabular-nums outline-none focus-visible:ring-3 focus-visible:ring-ring",
        "transition-[background-color,box-shadow]",
        side === "yes"
          ? "bg-success/12 text-success ring-1 ring-success/30 ring-inset hover:bg-success/20"
          : "bg-destructive/10 text-destructive ring-1 ring-destructive/30 ring-inset hover:bg-destructive/18",
        className
      )}
    >
      <ActionSwapText value={showAction ? "action" : `p${cents}`} animation="roll">
        {showAction ? `Buy ${word}` : binary ? `${word} ${cents}¢` : `${cents}%`}
      </ActionSwapText>
    </motion.button>
  )
}

function PayoutHint({ probability, label }: { probability: number; label: string }) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <button
            type="button"
            aria-label={`Payout ${multiplier(probability)} for ${label}: what $1 returns if it wins`}
            className="shrink-0 cursor-help rounded-md px-1 py-1 text-xs text-muted-foreground tabular-nums underline decoration-dotted decoration-muted-foreground/40 underline-offset-4 outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
          />
        }
      >
        {multiplier(probability)}
      </TooltipTrigger>
      <TooltipContent className="max-w-52 rounded-xl text-center leading-relaxed whitespace-normal">
        $1 on this outcome pays {multiplier(probability).replace("×", "")}× if it wins, stake included. Before fees.
      </TooltipContent>
    </Tooltip>
  )
}

function ChangeBadge({ change }: { change?: number }) {
  if (!change) return null
  const up = change > 0
  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 text-[11px] font-medium tabular-nums",
        up ? "text-success" : "text-destructive"
      )}
    >
      {up ? <ArrowUpIcon className="size-3" /> : <ArrowDownIcon className="size-3" />}
      <span className="sr-only">{up ? "up" : "down"}</span>
      {Math.abs(Math.round(change * 100))}
    </span>
  )
}

function ProbabilityBar({ value, color }: { value: number; color?: string }) {
  const reduce = useReducedMotion()
  return (
    <span aria-hidden className="block h-1.5 w-full overflow-hidden rounded-full bg-muted shadow-well">
      <motion.span
        className={cn("block h-full origin-left rounded-full", !color && "bg-success")}
        style={color ? { backgroundColor: color } : undefined}
        initial={false}
        animate={{ scaleX: clamp01(value) }}
        transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 160, damping: 24 }}
      />
    </span>
  )
}

function Sparkline({ samples }: { samples: number[] }) {
  const gradientId = React.useId()
  const clean = samples.filter(Number.isFinite)
  if (clean.length < 2) return null
  const low = Math.min(...clean)
  const range = Math.max(...clean) - low || 1
  const pts = clean
    .map((s, i) => `${(2 + (i / (clean.length - 1)) * 52).toFixed(2)},${(18 - ((s - low) / range) * 14).toFixed(2)}`)
    .join(" ")
  const rising = clean[clean.length - 1] >= clean[0]
  return (
    <svg
      aria-hidden
      viewBox="0 0 56 22"
      fill="none"
      className={cn("h-5 w-14 shrink-0", rising ? "text-success" : "text-destructive")}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.25" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={`2,22 ${pts} 54,22`} fill={`url(#${gradientId})`} />
      <polyline points={pts} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* ───────────────────────── Card ───────────────────────── */

function PredictionMarketCard({
  title,
  icon,
  iconColor,
  category,
  volume,
  volumeHistory,
  status,
  live = false,
  outcomes,
  onOutcomeSelect,
  bookmarked,
  defaultBookmarked = false,
  onBookmarkedChange,
  className,
  ...props
}: PredictionMarketCardProps) {
  const titleId = React.useId()
  const reduce = useReducedMotion()
  const [innerSaved, setInnerSaved] = React.useState(defaultBookmarked)
  const saved = bookmarked ?? innerSaved
  const binary = outcomes.length === 1
  const select = (o: PredictionMarketCardOutcome, side: "yes" | "no") =>
    onOutcomeSelect?.({ outcomeId: o.id, side, price: side === "yes" ? clamp01(o.probability) : 1 - clamp01(o.probability) })

  return (
    <article
      data-slot="prediction-market-card"
      aria-labelledby={titleId}
      className={cn(
        "flex w-full min-w-0 flex-col overflow-hidden rounded-3xl bg-card text-card-foreground shadow-surface",
        className
      )}
      {...props}
    >
      <header className="flex items-start gap-3 px-4 pt-4 pb-3">
        {icon ? <MarketAvatar color={iconColor}>{icon}</MarketAvatar> : null}
        <div className="min-w-0 flex-1">
          <h3 id={titleId} className="text-[0.95rem] leading-snug font-semibold tracking-tight text-balance">
            {title}
          </h3>
          {status || category ? (
            <p className="mt-1 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
              {status ? (
                <span className={cn("inline-flex items-center gap-1.5", live && "font-medium text-destructive")}>
                  {live ? (
                    <span aria-hidden className="relative flex size-1.5">
                      <span className="absolute inset-0 animate-ping rounded-full bg-current opacity-60 motion-reduce:animate-none" />
                      <span className="relative size-1.5 rounded-full bg-current" />
                    </span>
                  ) : null}
                  {live ? <span className="sr-only">Live: </span> : null}
                  {status}
                </span>
              ) : null}
              {status && category ? <span aria-hidden>·</span> : null}
              {category ? <span>{category}</span> : null}
            </p>
          ) : null}
        </div>
        {binary ? (
          <div className="flex shrink-0 flex-col items-end">
            <span className="text-xl leading-none font-semibold tabular-nums">
              {Math.round(clamp01(outcomes[0].probability) * 100)}%
            </span>
            <span className="mt-1 flex items-center gap-1 text-[11px] text-muted-foreground">
              chance <ChangeBadge change={outcomes[0].change} />
            </span>
          </div>
        ) : null}
      </header>

      <div className="mx-2 flex flex-1 flex-col rounded-[1.25rem] bg-muted/40 px-3 py-2.5 shadow-well">
        {binary ? (
          <div className="flex flex-col gap-3 py-1">
            <ProbabilityBar value={outcomes[0].probability} color={outcomes[0].color} />
            <div className="grid grid-cols-2 gap-2">
              <OddsButton side="yes" price={outcomes[0].probability} binary label={title} onPress={() => select(outcomes[0], "yes")} className="w-full" />
              <OddsButton side="no" price={1 - clamp01(outcomes[0].probability)} binary label={title} onPress={() => select(outcomes[0], "no")} className="w-full" />
            </div>
            <div className="flex justify-between px-1 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                Yes pays <PayoutHint probability={outcomes[0].probability} label={`Yes on ${title}`} />
              </span>
              <span className="inline-flex items-center gap-1">
                No pays <PayoutHint probability={1 - clamp01(outcomes[0].probability)} label={`No on ${title}`} />
              </span>
            </div>
          </div>
        ) : (
          <ul className="flex flex-col divide-y divide-border/50">
            {outcomes.map((o) => (
              <li key={o.id} className="flex items-center gap-2.5 py-2">
                {o.glyph ? (
                  <MarketAvatar size="sm" color={o.color}>
                    {o.glyph}
                  </MarketAvatar>
                ) : null}
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline gap-1.5">
                    <span className="truncate text-sm font-medium">{o.label}</span>
                    <ChangeBadge change={o.change} />
                  </div>
                  <div className="mt-1.5 w-full max-w-28">
                    <ProbabilityBar value={o.probability} color={o.color} />
                  </div>
                </div>
                <PayoutHint probability={o.probability} label={o.label} />
                <OddsButton side="yes" price={o.probability} label={o.label} onPress={() => select(o, "yes")} />
              </li>
            ))}
          </ul>
        )}
      </div>

      <footer className="flex items-center gap-2 px-4 py-2.5 text-xs text-muted-foreground">
        {volumeHistory ? <Sparkline samples={volumeHistory} /> : null}
        <span className="tabular-nums">{volume} vol.</span>
        <motion.button
          type="button"
          aria-label={saved ? `Remove ${title} from watchlist` : `Add ${title} to watchlist`}
          aria-pressed={saved}
          onClick={() => {
            if (bookmarked === undefined) setInnerSaved(!saved)
            onBookmarkedChange?.(!saved)
          }}
          whileTap={reduce ? undefined : { scale: 0.85 }}
          transition={PRESS}
          className={cn(
            "ml-auto inline-flex size-8 cursor-pointer items-center justify-center rounded-full outline-none hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring",
            saved && "text-primary hover:text-primary"
          )}
        >
          <motion.span
            className="inline-flex"
            initial={false}
            animate={{ scale: saved && !reduce ? [1, 1.25, 1] : 1 }}
            transition={{ duration: 0.28, ease: EASE }}
          >
            <BookmarkIcon className={cn("size-4", saved ? "fill-current" : "fill-transparent")} />
          </motion.span>
        </motion.button>
      </footer>
    </article>
  )
}

export {
  PredictionMarketCard,
  type PredictionMarketCardProps,
  type PredictionMarketCardOutcome,
  type PredictionMarketCardSelection,
}
