"use client"

import * as React from "react"
import {
  animate,
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
} from "motion/react"

import { ChevronRightIcon, CheckIcon, LoaderIcon } from "@/components/icons"
import { cn } from "@/lib/utils"
import { TextShimmer } from "@/registry/base-nova/ui/text-shimmer"

type SlidePhase = "idle" | "pending" | "complete"

type SlideActionButtonProps = {
  /** Track label, e.g. "Slide to pay". */
  children: React.ReactNode
  /** Shown once the slide confirms. */
  completeLabel?: React.ReactNode
  /** Shown while a promise returned from onComplete is pending. */
  pendingLabel?: React.ReactNode
  /** Fires when the thumb reaches the end. Return a promise to show a pending state; a rejection springs the thumb back. */
  onComplete?: () => void | Promise<unknown>
  /** Fraction of the track the thumb must pass to confirm on release. */
  threshold?: number
  /** Milliseconds the completed state shows before resetting. Pass null to stay complete. */
  resetDelay?: number | null
  /** Accessible name for the thumb. Defaults to the label when it is a string. */
  "aria-label"?: string
  disabled?: boolean
  className?: string
  thumbIcon?: React.ReactNode
}

const PAD = 4
const THUMB = 44
const SPRING = { type: "spring", stiffness: 420, damping: 34 } as const

function SlideActionButton({
  children,
  completeLabel = "Confirmed",
  pendingLabel = "Processing",
  onComplete,
  threshold = 0.9,
  resetDelay = 2000,
  disabled = false,
  className,
  thumbIcon,
  "aria-label": ariaLabel,
}: SlideActionButtonProps) {
  const reduce = useReducedMotion()
  const trackRef = React.useRef<HTMLDivElement>(null)
  const [max, setMax] = React.useState(0)
  const [phase, setPhase] = React.useState<SlidePhase>("idle")
  const [percent, setPercent] = React.useState(0)
  const resetTimer = React.useRef<number | undefined>(undefined)
  const x = useMotionValue(0)

  React.useLayoutEffect(() => {
    const track = trackRef.current
    if (!track) return
    const update = () => setMax(Math.max(0, track.clientWidth - THUMB - PAD * 2))
    update()
    const ro = new ResizeObserver(update)
    ro.observe(track)
    return () => ro.disconnect()
  }, [])
  React.useEffect(() => () => window.clearTimeout(resetTimer.current), [])

  useMotionValueEvent(x, "change", (v) => {
    const next = max ? Math.round((v / max) * 10) * 10 : 0
    setPercent((p) => (p === next ? p : next))
  })

  // The fill wraps the thumb: it spans the leading pad, the travelled distance,
  // the thumb and the trailing pad, so its rounded cap (radius THUMB/2 + PAD) is
  // concentric with the thumb, and at x = max it is exactly the track's width.
  const fillWidth = useTransform(x, (v) => v + THUMB + PAD * 2)
  const labelOpacity = useTransform(x, (v) => (max ? Math.max(0, 1 - v / (max * 0.55)) : 1))
  const labelShift = useTransform(x, (v) => (reduce ? 0 : v * 0.15))

  const springTo = (target: number) =>
    animate(x, target, reduce ? { duration: 0.2 } : SPRING)

  const reset = () => {
    setPhase("idle")
    springTo(0)
  }

  const confirm = async () => {
    if (phase !== "idle") return
    springTo(max)
    const result = onComplete?.()
    if (result && typeof (result as Promise<unknown>).then === "function") {
      setPhase("pending")
      try {
        await result
      } catch {
        reset()
        return
      }
    }
    setPhase("complete")
    navigator.vibrate?.(12)
    if (resetDelay !== null) resetTimer.current = window.setTimeout(reset, resetDelay)
  }

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (disabled || phase !== "idle") return
    const step = max / 4
    if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      event.preventDefault()
      const next = Math.min(max, x.get() + step)
      if (next >= max * threshold) confirm()
      else springTo(next)
    } else if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
      event.preventDefault()
      springTo(Math.max(0, x.get() - step))
    } else if (event.key === "Home" || event.key === "Escape") {
      event.preventDefault()
      springTo(0)
    } else if (event.key === "End" || event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      confirm()
    }
  }

  const label = phase === "complete" ? completeLabel : phase === "pending" ? pendingLabel : children
  const name = ariaLabel ?? (typeof children === "string" ? children : "Slide to confirm")

  return (
    <div
      ref={trackRef}
      data-slot="slide-action-button"
      data-phase={phase}
      data-disabled={disabled || undefined}
      className={cn(
        "relative isolate flex h-13 w-72 items-center overflow-hidden rounded-full bg-muted p-1 shadow-well select-none",
        "data-disabled:opacity-50",
        className
      )}
    >
      {/* Fill trailing the thumb. */}
      <motion.span
        aria-hidden
        data-phase={phase}
        style={{ width: fillWidth }}
        className="pointer-events-none absolute inset-y-0 left-0 -z-10 rounded-full bg-primary/15 transition-colors data-[phase=complete]:bg-primary/25"
      />

      <motion.span
        aria-hidden
        style={{ opacity: phase === "idle" ? labelOpacity : 1, x: phase === "idle" ? labelShift : 0 }}
        className="pointer-events-none absolute inset-0 grid place-items-center pl-10 text-sm font-medium"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={phase}
            initial={reduce ? { opacity: 0 } : { opacity: 0, filter: "blur(4px)", y: 6 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, filter: "blur(4px)", y: -6 }}
            transition={SPRING}
            className="whitespace-nowrap"
          >
            {phase === "idle" ? (
              <TextShimmer duration={2.6}>{label}</TextShimmer>
            ) : (
              <span className="text-foreground">{label}</span>
            )}
          </motion.span>
        </AnimatePresence>
      </motion.span>

      <motion.div
        role="slider"
        tabIndex={disabled ? -1 : 0}
        aria-label={name}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={phase === "idle" ? percent : 100}
        aria-valuetext={phase === "complete" ? "Confirmed" : phase === "pending" ? "Processing" : `${percent}%`}
        aria-disabled={disabled || undefined}
        drag={disabled || phase !== "idle" ? false : "x"}
        dragConstraints={{ left: 0, right: max }}
        dragElastic={0.04}
        dragMomentum={false}
        onDragEnd={() => {
          if (x.get() >= max * threshold) confirm()
          else springTo(0)
        }}
        onKeyDown={onKeyDown}
        style={{ x, width: THUMB, height: THUMB }}
        whileTap={reduce || disabled ? undefined : { scale: 0.96 }}
        className={cn(
          "relative grid shrink-0 cursor-grab touch-pan-y place-items-center rounded-full bg-primary text-primary-foreground shadow-primary outline-none active:cursor-grabbing",
          "focus-visible:ring-3 focus-visible:ring-ring [&_svg]:size-4.5",
          (disabled || phase !== "idle") && "cursor-default active:cursor-default"
        )}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={phase}
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.5, rotate: -45 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.5 }}
            transition={SPRING}
            className="grid place-items-center"
          >
            {phase === "complete" ? (
              <CheckIcon />
            ) : phase === "pending" ? (
              <LoaderIcon className="animate-spin motion-reduce:animate-none" />
            ) : (
              (thumbIcon ?? <ChevronRightIcon />)
            )}
          </motion.span>
        </AnimatePresence>
      </motion.div>
      <span className="sr-only" aria-live="polite">
        {phase === "idle" ? "" : label}
      </span>
    </div>
  )
}

export { SlideActionButton, type SlideActionButtonProps }
