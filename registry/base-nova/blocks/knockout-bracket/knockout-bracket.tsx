"use client"

import * as React from "react"
import { motion, useReducedMotion, type Transition } from "motion/react"

import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/base-nova/ui/button"

type BracketTeam = {
  name: string
  /** Two-to-four letter code shown in the crest. Defaults to the name's initials. */
  short?: string
  /** Any CSS colour for the crest. Defaults to a hue derived from the name. */
  color?: string
}
type BracketSide = { team: BracketTeam | null; score?: number | null; penalties?: number | null }
type BracketMatch = {
  id: string
  /** Already formatted, e.g. "Sat 12 Jul · 21:00". */
  date?: string
  home: BracketSide
  away: BracketSide
  winner?: "home" | "away"
  /** Overrides the derived result chip ("FT", "Pens"), e.g. "AET" or "BO5". */
  badge?: string
}
type BracketRound = { name: string; matches: BracketMatch[] }

type KnockoutBracketProps = Omit<React.ComponentProps<"div">, "children"> & {
  /**
   * Widest round first; each round has half the matches of the one before, and
   * `rounds[r].matches[k]` is fed by matches `2k` and `2k + 1` of round `r - 1`.
   */
  rounds: BracketRound[]
  /** Round shown as the leftmost column on mount (0-based). */
  initialRound?: number
  /** Most columns shown at once. The block fits fewer when narrow. Default 3. */
  maxColumns?: number
  /** Optional third-place match, drawn under the tree. */
  thirdPlace?: BracketMatch
  thirdPlaceLabel?: string
}

const CARD_W = 220
const CARD_H = 88
const GAP_X = 40
const GAP_Y = 16
const COL_W = CARD_W + GAP_X
const ROW_H = CARD_H + GAP_Y
const POCKET = 20
// Breathing room inside the clipped stage so card shadows are not shaved off.
const PAD = 6

const REFLOW: Transition = { type: "spring", stiffness: 260, damping: 32, mass: 0.9 }
const FADE: Transition = { duration: 0.25, ease: [0.22, 1, 0.36, 1] }

const initials = (name: string) =>
  name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => [...w][0])
    .join("")
    .toUpperCase()

const hue = (name: string) => {
  let h = 0
  for (const ch of name) h = (h * 31 + ch.charCodeAt(0)) % 360
  return h
}

/**
 * Knockout bracket that pages one round at a time. The leftmost visible round
 * stacks at a fixed rhythm, every later round centres between its two feeders,
 * and cards, elbow connectors and the stage height spring into each new layout.
 */
function KnockoutBracket({
  rounds,
  initialRound = 0,
  maxColumns = 3,
  thirdPlace,
  thirdPlaceLabel = "Third place play-off",
  className,
  ...props
}: KnockoutBracketProps) {
  const reduce = useReducedMotion()
  const wrapRef = React.useRef<HTMLDivElement>(null)
  const [cols, setCols] = React.useState(Math.min(maxColumns, rounds.length))

  React.useLayoutEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const update = () => {
      const fit = Math.max(1, Math.floor((el.clientWidth + GAP_X) / COL_W))
      setCols(Math.min(fit, maxColumns, rounds.length))
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [maxColumns, rounds.length])

  const maxPage = Math.max(0, rounds.length - cols)
  const [pageState, setPage] = React.useState(initialRound)
  const page = Math.min(Math.max(0, pageState), maxPage)

  // y of every card for this page: base column stacked, later columns centred on feeders.
  const layout = React.useMemo(() => {
    const ys: number[][] = rounds.map((r) => r.matches.map(() => 0))
    rounds[page]?.matches.forEach((_, k) => (ys[page][k] = k * ROW_H))
    for (let r = page + 1; r < rounds.length; r++) {
      rounds[r].matches.forEach((_, k) => {
        const a = ys[r - 1][2 * k] ?? 0
        const b = ys[r - 1][2 * k + 1] ?? a
        ys[r][k] = (a + b) / 2
      })
    }
    // Earlier rounds collapse toward their parent so they slide out sensibly.
    for (let r = page - 1; r >= 0; r--) {
      rounds[r].matches.forEach((_, k) => (ys[r][k] = ys[r + 1][Math.floor(k / 2)] ?? 0))
    }
    const height = Math.max(CARD_H, (rounds[page]?.matches.length ?? 1) * ROW_H - GAP_Y)
    return { ys, height }
  }, [rounds, page])

  const colX = (r: number) => (r - page) * COL_W
  const visible = (r: number) => r >= page && r < page + cols
  const t = reduce ? { duration: 0 } : REFLOW

  return (
    <div
      ref={wrapRef}
      data-slot="knockout-bracket"
      role="region"
      aria-label="Tournament bracket"
      className={cn("flex w-full flex-col gap-4", className)}
      {...props}
    >
      <div className="flex items-center justify-between gap-3" style={{ maxWidth: cols * COL_W - GAP_X }}>
        <p className="truncate text-sm font-medium" aria-live="polite">
          {rounds[page]?.name}
          {cols > 1 && rounds[page + cols - 1] ? ` – ${rounds[page + cols - 1].name}` : ""}
          <span className="ml-2 text-xs font-normal text-muted-foreground tabular-nums">
            {page + 1}/{maxPage + 1}
          </span>
        </p>
        <div className="flex shrink-0 gap-1.5">
          <Button
            variant="secondary"
            size="icon-sm"
            aria-label="Previous round"
            disabled={page === 0}
            onClick={() => setPage(page - 1)}
          >
            <ChevronLeftIcon />
          </Button>
          <Button
            variant="secondary"
            size="icon-sm"
            aria-label="Next round"
            disabled={page >= maxPage}
            onClick={() => setPage(page + 1)}
          >
            <ChevronRightIcon />
          </Button>
        </div>
      </div>

      <div className="relative -mb-2 h-6 overflow-hidden" style={{ maxWidth: cols * COL_W - GAP_X }} aria-hidden>
        {rounds.map((round, r) => (
          <motion.div
            key={round.name + r}
            initial={false}
            animate={{ x: colX(r), opacity: visible(r) ? 1 : 0 }}
            transition={{ ...t, opacity: FADE }}
            className="absolute top-0 left-0 flex h-6 items-center gap-2 text-[11px] font-semibold tracking-wide text-muted-foreground uppercase"
            style={{ width: CARD_W }}
          >
            {round.name}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={false}
        animate={{ height: layout.height + PAD * 2 }}
        transition={t}
        className="relative overflow-hidden"
        style={{ maxWidth: cols * COL_W - GAP_X + PAD * 2, margin: `${-PAD}px 0 ${-PAD}px ${-PAD}px` }}
      >
        {/* Elbow connectors: a rounded "]" pocket from two feeders, then a stem into the child. */}
        {rounds.map((round, r) =>
          r === 0
            ? null
            : round.matches.map((m, k) => {
                const a = layout.ys[r - 1][2 * k]
                const b = layout.ys[r - 1][2 * k + 1]
                if (a === undefined || b === undefined) return null
                const show = visible(r) && visible(r - 1)
                return (
                  <motion.div
                    key={`c-${m.id}`}
                    aria-hidden
                    initial={false}
                    animate={{
                      x: PAD + colX(r - 1) + CARD_W,
                      y: PAD + a + CARD_H / 2,
                      height: Math.max(1, b - a),
                      opacity: show ? 1 : 0,
                    }}
                    transition={{ ...t, opacity: FADE }}
                    className="pointer-events-none absolute top-0 left-0 rounded-r-xl border-y border-r border-border"
                    style={{ width: POCKET }}
                  >
                    <span
                      className="absolute top-1/2 left-full h-px bg-border"
                      style={{ width: GAP_X - POCKET }}
                    />
                  </motion.div>
                )
              })
        )}

        {rounds.map((round, r) =>
          round.matches.map((m, k) => (
            <motion.div
              key={m.id}
              initial={false}
              animate={{ x: PAD + colX(r), y: PAD + layout.ys[r][k], opacity: visible(r) ? 1 : 0 }}
              transition={{ ...t, opacity: FADE }}
              className="absolute top-0 left-0"
              style={{ width: CARD_W, pointerEvents: visible(r) ? "auto" : "none" }}
              aria-hidden={!visible(r)}
              inert={!visible(r)}
            >
              <MatchCard match={m} roundName={round.name} />
            </motion.div>
          ))
        )}
      </motion.div>

      {thirdPlace && (
        <div className="flex flex-col gap-3 border-t border-border/70 pt-4" style={{ maxWidth: cols * COL_W - GAP_X }}>
          <h3 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">{thirdPlaceLabel}</h3>
          <div style={{ width: CARD_W }}>
            <MatchCard match={thirdPlace} roundName={thirdPlaceLabel} />
          </div>
        </div>
      )}
    </div>
  )
}

function resultChip(m: BracketMatch) {
  if (m.badge) return m.badge
  if (!m.winner) return null
  return m.home.penalties != null && m.away.penalties != null ? "Pens" : "FT"
}

function describe(m: BracketMatch, roundName: string) {
  const name = (s: BracketSide) => s.team?.name ?? "To be decided"
  const score = (s: BracketSide) =>
    s.score == null ? "" : ` ${s.score}${s.penalties != null ? ` (${s.penalties})` : ""}`
  return `${roundName}: ${name(m.home)}${score(m.home)}, ${name(m.away)}${score(m.away)}${m.date ? `, ${m.date}` : ""}`
}

function MatchCard({ match, roundName }: { match: BracketMatch; roundName: string }) {
  const chip = resultChip(match)
  return (
    <div
      role="group"
      aria-label={describe(match, roundName)}
      className="flex flex-col justify-center gap-1 rounded-2xl bg-card bg-linear-to-b from-white/5 to-transparent px-3 py-2 shadow-raised"
      style={{ height: CARD_H }}
    >
      <SideRow side={match.home} state={match.winner ? (match.winner === "home" ? "won" : "lost") : "open"} />
      <SideRow side={match.away} state={match.winner ? (match.winner === "away" ? "won" : "lost") : "open"} />
      {(match.date || chip) && (
        <div className="flex items-center justify-between gap-2 pt-0.5 text-[11px] text-muted-foreground">
          <span className="truncate">{match.date}</span>
          {chip && (
            <span className="rounded-full bg-muted px-1.5 py-px text-[10px] font-medium shadow-chip">{chip}</span>
          )}
        </div>
      )}
    </div>
  )
}

function SideRow({ side, state }: { side: BracketSide; state: "won" | "lost" | "open" }) {
  const team = side.team
  return (
    <div
      data-state={state}
      className="flex h-6 items-center gap-2 text-sm data-[state=lost]:text-muted-foreground"
    >
      <Crest team={team} />
      <span className={cn("min-w-0 flex-1 truncate", state === "won" && "font-semibold")}>
        {team?.name ?? <span className="text-muted-foreground">TBD</span>}
      </span>
      {side.score != null && (
        <span className="flex items-baseline gap-1 tabular-nums">
          {side.penalties != null && <span className="text-[11px] text-muted-foreground">({side.penalties})</span>}
          <span className={cn("w-4 text-right", state === "won" && "font-semibold")}>{side.score}</span>
        </span>
      )}
      {state === "won" && <span aria-hidden className="-mr-1 size-1.5 rounded-full bg-primary" />}
    </div>
  )
}

function Crest({ team }: { team: BracketTeam | null }) {
  if (!team)
    return <span aria-hidden className="size-5 shrink-0 rounded-full border border-dashed border-border bg-muted/60" />
  return (
    <span
      aria-hidden
      className="flex size-5 shrink-0 items-center justify-center rounded-full text-[8px] font-bold text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.3),0_0_0_0.5px_rgb(0_0_0/0.15)] text-shadow-[0_1px_0_rgb(0_0_0/0.2)]"
      style={{ background: team.color ?? `oklch(0.62 0.15 ${hue(team.name)})` }}
    >
      {(team.short ?? initials(team.name)).slice(0, 3)}
    </span>
  )
}

export {
  KnockoutBracket,
  type KnockoutBracketProps,
  type BracketRound,
  type BracketMatch,
  type BracketSide,
  type BracketTeam,
}
