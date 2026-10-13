"use client"

import * as React from "react"
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "motion/react"

import { RefreshIcon } from "@/components/icons"
import { cn } from "@/lib/utils"
import { Loader } from "@/registry/base-nova/ui/loader"

type PullToRefreshStatus = "idle" | "pulling" | "ready" | "refreshing"

const SETTLE = { type: "spring", stiffness: 420, damping: 38, mass: 0.6 } as const

type PullToRefreshProps = Omit<React.ComponentProps<"div">, "children"> & {
  children: React.ReactNode
  /** Runs once the pull passes the threshold and is released. Await it to hold the spinner. */
  onRefresh: () => void | Promise<void>
  /** Keep the spinner showing while an externally managed refresh runs. */
  refreshing?: boolean
  disabled?: boolean
  /** Resisted pull distance (px) that arms the refresh. */
  threshold?: number
  /** Ceiling of the resisted pull (px). */
  maxPull?: number
  /** Content offset (px) while refreshing. */
  holdDistance?: number
  pullingLabel?: React.ReactNode
  releaseLabel?: React.ReactNode
  refreshingLabel?: React.ReactNode
  /** Called whenever the gesture status changes. */
  onStatusChange?: (status: PullToRefreshStatus) => void
  /** Classes for the inner scrolling element. */
  contentClassName?: string
}

/** Rubber-band: the further you pull, the less the content follows. */
function resist(distance: number, maxPull: number) {
  return maxPull * (1 - Math.exp(-Math.max(0, distance) / maxPull))
}

/**
 * Scroll container with native-feeling pull-to-refresh: drag down from the
 * top against resistance, the arrow winds up and turns primary at the
 * threshold, release to run `onRefresh` while our loader spins, then the
 * content springs back. Works with touch, pen and mouse.
 */
function PullToRefresh({
  className,
  children,
  onRefresh,
  refreshing: refreshingProp,
  disabled,
  threshold = 64,
  maxPull = 120,
  holdDistance = 56,
  pullingLabel = "Pull to refresh",
  releaseLabel = "Release to refresh",
  refreshingLabel = "Refreshing…",
  onStatusChange,
  contentClassName,
  ...props
}: PullToRefreshProps) {
  const reduce = useReducedMotion() ?? false
  const scrollRef = React.useRef<HTMLDivElement>(null)
  const y = useMotionValue(0)
  const [status, setStatusState] = React.useState<PullToRefreshStatus>("idle")
  const statusRef = React.useRef(status)
  const setStatus = React.useCallback(
    (next: PullToRefreshStatus) => {
      if (statusRef.current === next) return
      statusRef.current = next
      setStatusState(next)
      onStatusChange?.(next)
    },
    [onStatusChange]
  )

  const progress = useTransform(y, [0, threshold], [0, 1], { clamp: true })
  const indicatorY = useTransform(y, (v) => Math.min(v, holdDistance) / 2 - 20)
  const indicatorOpacity = useTransform(y, [0, 16, threshold * 0.6], [0, 0.4, 1])
  const arrowRotate = useTransform(progress, [0, 1], [-90, 180])
  const ringOffset = useTransform(progress, (p) => 1 - p)

  const busy = status === "refreshing" || !!refreshingProp
  const busyRef = React.useRef(busy)
  busyRef.current = busy
  const refreshRef = React.useRef(onRefresh)
  refreshRef.current = onRefresh
  const running = React.useRef(false)
  const busyRefExternal = React.useRef(refreshingProp)
  busyRefExternal.current = refreshingProp

  // External refresh: hold the content open while it runs, close when it ends.
  React.useEffect(() => {
    if (refreshingProp) {
      setStatus("refreshing")
      animate(y, holdDistance, reduce ? { duration: 0 } : SETTLE)
    } else if (refreshingProp === false && statusRef.current === "refreshing" && !running.current) {
      setStatus("idle")
      animate(y, 0, reduce ? { duration: 0 } : SETTLE)
    }
  }, [refreshingProp, holdDistance, reduce, setStatus, y])

  const release = React.useCallback(async () => {
    if (statusRef.current === "ready") {
      setStatus("refreshing")
      running.current = true
      animate(y, holdDistance, reduce ? { duration: 0 } : SETTLE)
      try {
        await refreshRef.current()
      } finally {
        running.current = false
        if (!busyRefExternal.current) {
          setStatus("idle")
          animate(y, 0, reduce ? { duration: 0 } : SETTLE)
        }
      }
    } else if (statusRef.current === "pulling") {
      setStatus("idle")
      animate(y, 0, reduce ? { duration: 0 } : SETTLE)
    }
  }, [holdDistance, reduce, setStatus, y])
  // Gesture: native listeners so touchmove can be non-passive and stop the
  // page from scrolling/overscrolling while we own the pull.
  React.useEffect(() => {
    const el = scrollRef.current
    if (!el || disabled) return
    let start: { x: number; y: number } | null = null
    let pulling = false

    const begin = (cx: number, cy: number) => {
      if (busyRef.current || el.scrollTop > 0) return
      start = { x: cx, y: cy }
      pulling = false
    }
    const move = (cx: number, cy: number, prevent: () => void) => {
      if (!start) return
      const dy = cy - start.y
      const dx = cx - start.x
      if (!pulling) {
        if (Math.abs(dy) < 4 && Math.abs(dx) < 4) return
        // Only claim a downward, mostly vertical drag at the very top.
        if (dy <= 0 || Math.abs(dx) > Math.abs(dy) || el.scrollTop > 0) {
          start = null
          return
        }
        pulling = true
        y.stop()
      }
      prevent()
      const pulled = resist(dy, maxPull)
      y.set(pulled)
      const armed = pulled >= threshold
      if (armed && statusRef.current !== "ready") {
        if (typeof navigator !== "undefined") navigator.vibrate?.(8)
        setStatus("ready")
      } else if (!armed && statusRef.current !== "pulling") setStatus("pulling")
    }
    const end = () => {
      if (pulling) void release()
      start = null
      pulling = false
    }

    const onTouchStart = (e: TouchEvent) => begin(e.touches[0].clientX, e.touches[0].clientY)
    const onTouchMove = (e: TouchEvent) =>
      move(e.touches[0].clientX, e.touches[0].clientY, () => e.cancelable && e.preventDefault())
    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === "touch" || e.button !== 0) return
      begin(e.clientX, e.clientY)
    }
    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return
      const wasPulling = pulling
      move(e.clientX, e.clientY, () => e.preventDefault())
      // Capture only once the pull is claimed, so plain clicks inside still land.
      if (pulling && !wasPulling) {
        try {
          el.setPointerCapture(e.pointerId)
        } catch {}
      }
    }
    const onPointerUp = (e: PointerEvent) => {
      if (e.pointerType !== "touch") end()
    }

    el.addEventListener("touchstart", onTouchStart, { passive: true })
    el.addEventListener("touchmove", onTouchMove, { passive: false })
    el.addEventListener("touchend", end)
    el.addEventListener("touchcancel", end)
    el.addEventListener("pointerdown", onPointerDown)
    el.addEventListener("pointermove", onPointerMove)
    el.addEventListener("pointerup", onPointerUp)
    el.addEventListener("pointercancel", onPointerUp)
    return () => {
      el.removeEventListener("touchstart", onTouchStart)
      el.removeEventListener("touchmove", onTouchMove)
      el.removeEventListener("touchend", end)
      el.removeEventListener("touchcancel", end)
      el.removeEventListener("pointerdown", onPointerDown)
      el.removeEventListener("pointermove", onPointerMove)
      el.removeEventListener("pointerup", onPointerUp)
      el.removeEventListener("pointercancel", onPointerUp)
    }
  }, [disabled, maxPull, threshold, release, setStatus, y])

  const ready = status === "ready"
  const text = busy ? refreshingLabel : ready ? releaseLabel : pullingLabel

  return (
    <div
      data-slot="pull-to-refresh"
      data-status={status}
      aria-busy={busy || undefined}
      className={cn("relative isolate overflow-hidden", className)}
      {...props}
    >
      {/* Indicator sits in the gap the content opens up. */}
      <motion.div
        aria-hidden
        data-slot="pull-to-refresh-indicator"
        style={{ y: indicatorY, opacity: busy ? 1 : indicatorOpacity }}
        className="pointer-events-none absolute inset-x-0 top-0 z-0 flex items-center justify-center gap-2 pt-2"
      >
        <motion.span
          animate={reduce ? undefined : { scale: ready ? 1.1 : 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 18, mass: 0.5 }}
          className={cn(
            "relative flex size-9 items-center justify-center rounded-full shadow-raised transition-colors duration-200",
            "before:absolute before:inset-0 before:rounded-[inherit] before:bg-linear-to-b before:from-white/6 before:to-transparent",
            ready || busy ? "bg-primary text-primary-foreground shadow-primary" : "bg-card text-muted-foreground"
          )}
        >
          {busy ? (
            <Loader variant="ring" size="sm" label="Refreshing" />
          ) : (
            <>
              <svg viewBox="0 0 36 36" className="absolute inset-0 size-full -rotate-90">
                <motion.circle
                  cx={18}
                  cy={18}
                  r={15}
                  fill="none"
                  stroke="currentColor"
                  strokeOpacity={0.35}
                  strokeWidth={2}
                  strokeLinecap="round"
                  pathLength={1}
                  strokeDasharray="1 1"
                  style={{ strokeDashoffset: ringOffset }}
                />
              </svg>
              <motion.span style={reduce ? undefined : { rotate: arrowRotate }} className="flex">
                <RefreshIcon className="size-4" />
              </motion.span>
            </>
          )}
        </motion.span>
        <span className="text-xs font-medium text-muted-foreground">{text}</span>
      </motion.div>

      <span role="status" aria-live="polite" className="sr-only">
        {busy ? refreshingLabel : ""}
      </span>

      <motion.div
        ref={scrollRef}
        data-slot="pull-to-refresh-content"
        style={{ y }}
        className={cn(
          "relative z-10 h-full overflow-y-auto overscroll-y-contain bg-inherit [-webkit-touch-callout:none]",
          status === "pulling" || status === "ready" ? "select-none" : undefined,
          contentClassName
        )}
      >
        {children}
      </motion.div>
    </div>
  )
}

export { PullToRefresh }
export type { PullToRefreshProps, PullToRefreshStatus }
