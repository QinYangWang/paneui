"use client"

import * as React from "react"
import { AnimatePresence, motion, useReducedMotion, type Transition } from "motion/react"

import { CarIcon, ClockIcon, PauseIcon, PhoneIcon, PlayIcon, XIcon } from "@/components/icons"
import { cn } from "@/lib/utils"

/* ───────────────────────── Shell ───────────────────────── */

// One long glide with a little bounce; width/height are animated for real (no scale), so slots never distort.
const SHELL: Transition = { type: "spring", duration: 0.75, bounce: 0.24 }
const CONTENT: Transition = { type: "spring", duration: 0.7, bounce: 0.32 }
const PILL = { width: 126, height: 37 }

type IslandTone = "ink" | "surface"

export type DynamicIslandViewProps = {
  /** Identifier the island's `view` prop selects. */
  id: string
  /** Announced to assistive tech when this view becomes active. */
  label?: string
  className?: string
  children: React.ReactNode
}

/** One live-activity layout. Only the view whose `id` matches the island's `view` renders. */
export function DynamicIslandView({ className, children }: DynamicIslandViewProps) {
  return <div className={cn("w-max", className)}>{children}</div>
}

export type DynamicIslandProps = {
  /** Active view id; `null`/unknown shows the idle pill. */
  view?: string | null
  /**
   * `ink` (default) is the device-black pill of the real thing, readable on light and dark pages.
   * `surface` uses the popover token so it blends into the theme.
   */
  tone?: IslandTone
  className?: string
  children?: React.ReactNode
}

function useContentSize() {
  const ref = React.useRef<HTMLDivElement>(null)
  const [size, setSize] = React.useState<{ width: number; height: number } | null>(null)
  React.useLayoutEffect(() => {
    const node = ref.current
    if (!node) return
    const update = () =>
      setSize((prev) =>
        prev && prev.width === node.offsetWidth && prev.height === node.offsetHeight
          ? prev
          : { width: node.offsetWidth, height: node.offsetHeight }
      )
    update()
    if (typeof ResizeObserver === "undefined") return
    const ro = new ResizeObserver(update)
    ro.observe(node)
    return () => ro.disconnect()
  }, [])
  return [ref, size] as const
}

export function DynamicIsland({ view = null, tone = "ink", className, children }: DynamicIslandProps) {
  const reduce = useReducedMotion()
  const [contentRef, size] = useContentSize()
  const views = React.Children.toArray(children).filter(
    (child): child is React.ReactElement<DynamicIslandViewProps> => React.isValidElement(child)
  )
  const active = views.find((child) => child.props.id === view) ?? null
  const key = active?.props.id ?? "__idle"

  return (
    <div data-slot="dynamic-island" className={cn("flex justify-center", className)}>
      <motion.div
        role="status"
        aria-live="polite"
        aria-label={active?.props.label ?? active?.props.id ?? "Idle"}
        data-view={active?.props.id ?? "idle"}
        initial={false}
        animate={size ?? PILL}
        transition={reduce ? { duration: 0 } : SHELL}
        style={{ borderRadius: 32 }}
        className={cn(
          "relative flex justify-center overflow-hidden",
          tone === "ink"
            ? "bg-black text-white shadow-surface ring-1 ring-foreground/10"
            : "bg-popover text-popover-foreground shadow-surface"
        )}
      >
        {/* self-start: never stretch to the shell, or the measured height would just echo the animated height. */}
        <div ref={contentRef} className="relative w-max shrink-0 self-start">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={key}
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.9, y: -8, filter: "blur(6px)" }}
              animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
              exit={
                reduce
                  ? { opacity: 0, transition: { duration: 0.1 } }
                  : { opacity: 0, scale: 0.9, y: -6, transition: { duration: 0.09 } }
              }
              transition={reduce ? { duration: 0.15 } : CONTENT}
            >
              {active ?? <IslandIdle />}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}

function IslandIdle() {
  return (
    <div style={PILL} className="flex items-center justify-end pr-3.5" aria-hidden>
      <span className="size-2.5 rounded-full bg-current/15" />
    </div>
  )
}

/* ───────────────────────── Activities ───────────────────────── */

const pad = (n: number) => String(n).padStart(2, "0")
const clock = (s: number) => `${Math.floor(s / 60)}:${pad(Math.floor(s % 60))}`

/** Compact timer: ring + live countdown. Counts down from `seconds` while mounted. */
export function IslandTimer({ seconds = 300, label = "Timer" }: { seconds?: number; label?: string }) {
  const [left, setLeft] = React.useState(seconds)
  React.useEffect(() => {
    const t = window.setInterval(() => setLeft((s) => Math.max(0, s - 1)), 1000)
    return () => window.clearInterval(t)
  }, [])
  const progress = left / seconds
  return (
    <div className="flex h-[37px] w-56 items-center justify-between px-2">
      <span className="flex items-center gap-2 pl-0.5 text-warning">
        <svg viewBox="0 0 20 20" className="size-5 -rotate-90" aria-hidden>
          <circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2.5" />
          <circle
            cx="10"
            cy="10"
            r="8"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={50.27}
            strokeDashoffset={50.27 * (1 - progress)}
            className="transition-[stroke-dashoffset] duration-1000 ease-linear"
          />
        </svg>
        <span className="text-xs font-medium opacity-80">{label}</span>
      </span>
      <span className="pr-2 text-sm font-semibold text-warning tabular-nums">{clock(left)}</span>
    </div>
  )
}

function Bars({ playing }: { playing: boolean }) {
  const reduce = useReducedMotion()
  const bars = [0.55, 1, 0.7, 0.9]
  return (
    <span className="flex h-4 items-center gap-[3px] text-success" aria-hidden>
      {bars.map((peak, i) => (
        <motion.span
          key={i}
          className="h-full w-[3px] origin-center rounded-full bg-current"
          initial={false}
          animate={
            playing && !reduce
              ? { scaleY: [0.3, peak, 0.45, peak * 0.8, 0.3] }
              : { scaleY: 0.3 }
          }
          transition={
            playing && !reduce
              ? { duration: 0.9 + i * 0.17, repeat: Infinity, ease: "easeInOut" }
              : { duration: 0.2 }
          }
        />
      ))}
    </span>
  )
}

export type IslandMusicProps = {
  title?: string
  artist?: string
  /** CSS background for the cover square (gradient or url()). */
  cover?: string
  duration?: number
  defaultPosition?: number
}

/** Expanded now-playing card with cover, live bars, progress and play/pause. */
export function IslandMusic({
  title = "Weightless",
  artist = "Marconi Union",
  cover = "linear-gradient(135deg, oklch(0.72 0.16 300), oklch(0.62 0.19 25) 55%, oklch(0.8 0.14 80))",
  duration = 248,
  defaultPosition = 72,
}: IslandMusicProps) {
  const [playing, setPlaying] = React.useState(true)
  const [pos, setPos] = React.useState(defaultPosition)
  React.useEffect(() => {
    if (!playing) return
    const t = window.setInterval(() => setPos((p) => (p + 1) % duration), 1000)
    return () => window.clearInterval(t)
  }, [playing, duration])
  return (
    <div className="flex w-[340px] flex-col gap-3 p-4">
      <div className="flex items-center gap-3">
        <span className="size-12 shrink-0 rounded-xl ring-1 ring-current/10 ring-inset" style={{ background: cover }} />
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="truncate text-sm font-semibold">{title}</span>
          <span className="truncate text-xs opacity-60">{artist}</span>
        </span>
        <Bars playing={playing} />
      </div>
      <div className="flex items-center gap-2.5 text-[0.7rem] tabular-nums">
        <span className="w-8 opacity-60">{clock(pos)}</span>
        <span className="relative h-1 flex-1 overflow-hidden rounded-full bg-current/20">
          <span
            className="absolute inset-y-0 left-0 rounded-full bg-current transition-[width] duration-1000 ease-linear"
            style={{ width: `${(pos / duration) * 100}%` }}
          />
        </span>
        <span className="w-8 text-right opacity-60">-{clock(duration - pos)}</span>
      </div>
      <div className="flex justify-center">
        <button
          type="button"
          aria-label={playing ? "Pause" : "Play"}
          onClick={() => setPlaying((p) => !p)}
          className="inline-flex size-10 items-center justify-center rounded-full transition-[background-color,scale] duration-150 ease-out outline-none hover:bg-current/10 focus-visible:ring-3 focus-visible:ring-ring active:scale-96"
        >
          {playing ? <PauseIcon size={22} /> : <PlayIcon size={22} />}
        </button>
      </div>
    </div>
  )
}

export type IslandCallProps = {
  name?: string
  detail?: string
  initials?: string
  onAccept?: () => void
  onDecline?: () => void
}

/** Incoming call with avatar and accept / decline. */
export function IslandCall({
  name = "Mia Chen",
  detail = "mobile",
  initials = "MC",
  onAccept,
  onDecline,
}: IslandCallProps) {
  return (
    <div className="flex w-[340px] items-center gap-3 p-3 pl-3.5">
      <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
        {initials}
      </span>
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="text-xs opacity-60">{detail}</span>
        <span className="truncate text-sm font-semibold">{name}</span>
      </span>
      <button
        type="button"
        aria-label="Decline"
        onClick={onDecline}
        className="inline-flex size-10 items-center justify-center rounded-full bg-destructive text-white transition-[background-color,scale] duration-150 ease-out outline-none hover:bg-destructive/90 focus-visible:ring-3 focus-visible:ring-ring active:scale-96"
      >
        <XIcon size={18} />
      </button>
      <button
        type="button"
        aria-label="Accept"
        onClick={onAccept}
        className="inline-flex size-10 items-center justify-center rounded-full bg-success text-white transition-[background-color,scale] duration-150 ease-out outline-none hover:bg-success/90 focus-visible:ring-3 focus-visible:ring-ring active:scale-96"
      >
        <PhoneIcon size={18} />
      </button>
    </div>
  )
}

export type IslandRideProps = {
  eta?: number
  car?: string
  plate?: string
  /** 0–1 progress of the driver towards you. */
  progress?: number
}

/** Ride-hailing live activity: ETA, vehicle and a route progress track. */
export function IslandRide({ eta = 3, car = "White Toyota Prius", plate = "8KJ·221", progress = 0.62 }: IslandRideProps) {
  const reduce = useReducedMotion()
  return (
    <div className="flex w-[340px] flex-col gap-3 p-4">
      <div className="flex items-start justify-between gap-3">
        <span className="flex flex-col">
          <span className="text-xs opacity-60">Driver arriving</span>
          <span className="text-lg leading-tight font-semibold">
            {eta} min
          </span>
        </span>
        <span className="flex flex-col items-end">
          <span className="rounded-md bg-current/12 px-1.5 py-0.5 font-mono text-xs font-semibold tracking-wider">
            {plate}
          </span>
          <span className="mt-1 text-xs opacity-60">{car}</span>
        </span>
      </div>
      <div className="relative flex h-6 items-center">
        <span className="h-1 w-full rounded-full bg-current/20" />
        <motion.span
          className="absolute inset-y-0 left-0 flex items-center"
          initial={reduce ? false : { width: "0%" }}
          animate={{ width: `${progress * 100}%` }}
          transition={reduce ? { duration: 0 } : { type: "spring", duration: 1.1, bounce: 0.15 }}
        >
          <span className="h-1 w-full rounded-full bg-primary" />
          <span className="absolute right-0 inline-flex size-6 translate-x-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-primary">
            <CarIcon size={14} />
          </span>
        </motion.span>
        <span className="absolute right-0 size-2.5 rounded-full bg-current ring-3 ring-current/25" />
      </div>
      <span className="flex items-center gap-1.5 text-xs opacity-60">
        <ClockIcon size={13} />
        Pickup at Gate B · Terminal 2
      </span>
    </div>
  )
}
