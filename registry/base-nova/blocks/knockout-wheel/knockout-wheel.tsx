"use client"

import * as React from "react"
import { motion, useReducedMotion } from "motion/react"

import { StarIcon } from "@/components/icons"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/registry/base-nova/ui/tooltip"

type WheelTeam = {
  name: string
  /** Two-to-four letter code drawn in the node. Defaults to initials. */
  short?: string
  /** Any CSS colour for the node. Defaults to a hue derived from the name. */
  color?: string
}
type WheelSide = { team: WheelTeam | null; score?: number | null; penalties?: number | null }
type WheelMatch = { id: string; home: WheelSide; away: WheelSide; winner?: "home" | "away"; date?: string }
type WheelRound = { name: string; matches: WheelMatch[] }

type KnockoutWheelProps = Omit<React.ComponentProps<"div">, "children"> & {
  /**
   * Widest round first; each round halves, and `rounds[r].matches[k]` is fed by
   * matches `2k` and `2k + 1` of round `r - 1`. A deeper draw adds a ring.
   */
  rounds: WheelRound[]
  /** Accessible name for the wheel. */
  label?: string
}

type WheelNode = {
  key: string
  ring: number
  angle: number
  team: WheelTeam | null
  /** Text for the tooltip under the team name. */
  detail: string
  /** Index into `nodes` of the node this one feeds, if any. */
  parent?: number
  hub?: boolean
}

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
const sideScore = (s: WheelSide) =>
  s.score == null ? "" : `${s.score}${s.penalties != null ? ` (${s.penalties})` : ""}`

function buildNodes(rounds: WheelRound[]) {
  const R = rounds.length
  const nodes: WheelNode[] = []
  const first = rounds[0]?.matches ?? []
  const leafCount = first.length * 2
  let prev: number[] = []

  // Rim: every team of the first round.
  first.forEach((m, k) => {
    ;(["home", "away"] as const).forEach((side, s) => {
      const i = 2 * k + s
      const me = m[side]
      const opp = m[side === "home" ? "away" : "home"]
      const played = me.score != null && opp.score != null
      nodes.push({
        key: `leaf-${m.id}-${side}`,
        ring: R,
        angle: -Math.PI / 2 + ((i + 0.5) / leafCount) * Math.PI * 2,
        team: me.team,
        detail: `${rounds[0].name} · vs ${opp.team?.name ?? "TBD"}${played ? ` · ${sideScore(me)}–${sideScore(opp)}` : ""}`,
      })
      prev.push(nodes.length - 1)
    })
  })

  // Each match produces a winner node one ring further in; the final's sits at the hub.
  rounds.forEach((round, r) => {
    const next: number[] = []
    round.matches.forEach((m, k) => {
      const a = prev[2 * k]
      const b = prev[2 * k + 1]
      const won = m.winner ? m[m.winner] : null
      const lost = m.winner ? m[m.winner === "home" ? "away" : "home"] : null
      const hub = r === R - 1
      const angle = a !== undefined && b !== undefined ? (nodes[a].angle + nodes[b].angle) / 2 : 0
      nodes.push({
        key: `win-${m.id}`,
        ring: R - 1 - r,
        angle,
        team: won?.team ?? null,
        hub,
        detail: won
          ? hub
            ? `Champion · beat ${lost?.team?.name ?? "TBD"} ${sideScore(won)}–${sideScore(lost!)}`
            : `Won ${round.name} · beat ${lost?.team?.name ?? "TBD"} ${sideScore(won)}–${sideScore(lost!)}`
          : `Winner of ${round.name}${m.date ? ` · ${m.date}` : ""}`,
      })
      const idx = nodes.length - 1
      if (a !== undefined) nodes[a].parent = idx
      if (b !== undefined) nodes[b].parent = idx
      next.push(idx)
    })
    prev = next
  })
  return { nodes, leafCount, R }
}

/**
 * A knockout tournament drawn radially: the champion holds the hub, each round
 * is a ring further out and the teams form the rim. Nodes spring in ring by
 * ring; hovering or focusing one isolates that team's path while the rest recede.
 */
function KnockoutWheel({ rounds, label = "Tournament wheel", className, ...props }: KnockoutWheelProps) {
  const reduce = useReducedMotion()
  const { nodes, leafCount, R } = React.useMemo(() => buildNodes(rounds), [rounds])
  const [active, setActive] = React.useState<string | null>(null)
  // The ring-by-ring stagger is for the entrance only; later hovers respond at once.
  const [entered, setEntered] = React.useState(false)
  React.useEffect(() => {
    const id = window.setTimeout(() => setEntered(true), 900)
    return () => window.clearTimeout(id)
  }, [])

  const MAX_R = 43
  const radius = (ring: number) => (R === 0 ? 0 : (ring / R) * MAX_R)
  const pos = (n: WheelNode) => {
    const r = radius(n.ring)
    return { x: 50 + Math.cos(n.angle) * r, y: 50 + Math.sin(n.angle) * r }
  }
  const leafSize = leafCount <= 8 ? 40 : leafCount <= 16 ? 30 : 22
  const sizeOf = (n: WheelNode) => (n.hub ? leafSize + 14 : n.ring === R ? leafSize : leafSize - 4)
  const dim = (team: WheelTeam | null) => active !== null && team?.name !== active

  // Child → parent: run inward along the child's spoke, then arc across to the parent.
  const edgePath = (c: WheelNode, p: WheelNode) => {
    const a = pos(c)
    const pr = radius(p.ring)
    if (pr === 0) return `M${a.x} ${a.y}L50 50`
    const mx = 50 + Math.cos(c.angle) * pr
    const my = 50 + Math.sin(c.angle) * pr
    const b = pos(p)
    const sweep = p.angle > c.angle ? 1 : 0
    return `M${a.x} ${a.y}L${mx} ${my}A${pr} ${pr} 0 0 ${sweep} ${b.x} ${b.y}`
  }

  return (
    <TooltipProvider delay={120}>
      <div
        data-slot="knockout-wheel"
        role="group"
        aria-label={label}
        className={cn("relative mx-auto aspect-square w-full max-w-[520px] select-none", className)}
        onPointerLeave={() => setActive(null)}
        {...props}
      >
        <svg viewBox="0 0 100 100" className="absolute inset-0 size-full overflow-visible" aria-hidden>
          {Array.from({ length: R }, (_, i) => i + 1).map((ring) => (
            <circle
              key={ring}
              cx={50}
              cy={50}
              r={radius(ring)}
              fill="none"
              className="stroke-border/60"
              strokeWidth={0.25}
              strokeDasharray="0.6 1.2"
            />
          ))}
          {nodes.map((n) => {
            if (n.parent === undefined) return null
            const p = nodes[n.parent]
            const advanced = !!n.team && p.team?.name === n.team.name
            const lit = active !== null && advanced && n.team?.name === active
            return (
              <motion.path
                key={`e-${n.key}`}
                d={edgePath(n, p)}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={reduce ? false : { pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: active !== null && !lit ? 0.25 : 1 }}
                transition={{
                  pathLength: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: (R - n.ring) * 0.08 + 0.2 },
                  opacity: { duration: 0.2 },
                }}
                className={cn(
                  "transition-[stroke,stroke-width] duration-200",
                  lit ? "stroke-primary" : advanced ? "stroke-foreground/45" : "stroke-border"
                )}
                strokeWidth={lit ? 0.9 : advanced ? 0.55 : 0.4}
              />
            )
          })}
        </svg>

        {nodes.map((n) => {
          const { x, y } = pos(n)
          const size = sizeOf(n)
          const faded = dim(n.team)
          const name = n.team?.name ?? "To be decided"
          return (
            <Tooltip key={n.key}>
              <TooltipTrigger
                aria-label={`${name}. ${n.detail}`}
                onPointerEnter={() => setActive(n.team?.name ?? null)}
                onFocus={() => setActive(n.team?.name ?? null)}
                onBlur={() => setActive(null)}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-default rounded-full outline-none focus-visible:ring-3 focus-visible:ring-ring"
                style={{ left: `${x}%`, top: `${y}%`, width: size, height: size }}
              >
                <motion.span
                  initial={reduce ? false : { scale: 0, opacity: 0 }}
                  animate={{ scale: faded ? 0.86 : 1, opacity: faded ? 0.3 : 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 420,
                    damping: 22,
                    delay: entered || reduce ? 0 : n.ring * 0.07,
                    opacity: { duration: 0.2 },
                  }}
                  className={cn(
                    "relative flex size-full items-center justify-center rounded-full font-bold tracking-tight",
                    n.team
                      ? "text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.35),0_0_0_0.5px_rgb(0_0_0/0.15),0_1px_3px_rgb(0_0_0/0.25)] text-shadow-[0_1px_0_rgb(0_0_0/0.2)]"
                      : "border border-dashed border-border bg-muted text-muted-foreground shadow-well",
                    n.hub && n.team && "ring-3 ring-primary/35 ring-offset-2 ring-offset-background"
                  )}
                  style={{
                    background: n.team ? (n.team.color ?? `oklch(0.62 0.15 ${hue(n.team.name)})`) : undefined,
                    fontSize: Math.max(7, size * 0.3),
                  }}
                >
                  {n.team ? (n.team.short ?? initials(n.team.name)).slice(0, 3) : "?"}
                  {n.hub && n.team && (
                    <span className="absolute -top-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full bg-popover text-warning shadow-chip">
                      <StarIcon className="size-3" />
                    </span>
                  )}
                </motion.span>
              </TooltipTrigger>
              <TooltipContent className="flex-col items-start gap-0.5 rounded-2xl px-3 py-2">
                <span className="text-xs font-semibold">{name}</span>
                <span className="text-[11px] font-normal text-muted-foreground">{n.detail}</span>
              </TooltipContent>
            </Tooltip>
          )
        })}
      </div>
    </TooltipProvider>
  )
}

export { KnockoutWheel, type KnockoutWheelProps, type WheelRound, type WheelMatch, type WheelSide, type WheelTeam }
