"use client"

import * as React from "react"
import {
  type MotionValue,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react"

import { cn } from "@/lib/utils"
import { useSmoothScroll } from "@/registry/base-nova/ui/smooth-scroll"

/* Soft follow so the indicator trails the scroll instead of ticking. */
const followSpring = { stiffness: 140, damping: 30, mass: 0.5 }

function useProgress(source: MotionValue<number> | undefined, spring: boolean) {
  const reduce = useReducedMotion() ?? false
  const scroll = useSmoothScroll()
  const raw = source ?? scroll.progress
  const smoothed = useSpring(raw, followSpring)
  return spring && !reduce ? smoothed : raw
}

type CommonProps = {
  /** Custom 0–1 source. Defaults to the nearest SmoothScroll (or the window). */
  progress?: MotionValue<number>
  /** Spring-smooth the indicator. Off automatically under reduced motion. */
  spring?: boolean
  /** Accessible name; the indicator is exposed as a progressbar. */
  label?: string
  className?: string
}

type ScrollProgressBarProps = CommonProps & {
  variant?: "bar"
  /** Edge the bar sticks to. */
  side?: "top" | "bottom"
  /** `fixed` for the page, `sticky` inside a scroll container, `absolute` inside a relative box. */
  position?: "fixed" | "sticky" | "absolute"
  /** Thickness in px. */
  thickness?: number
}

type ScrollProgressRingProps = CommonProps & {
  variant: "ring"
  /** Diameter in px. */
  size?: number
  /** Stroke width in px. */
  thickness?: number
  /** Show the percentage in the middle. */
  showValue?: boolean
}

type ScrollProgressProps = ScrollProgressBarProps | ScrollProgressRingProps

/** Keeps aria-valuenow in step without re-rendering on every frame. */
function useAriaValue(value: MotionValue<number>) {
  const ref = React.useRef<HTMLDivElement>(null)
  useMotionValueEvent(value, "change", (v) => {
    ref.current?.setAttribute("aria-valuenow", String(Math.round(v * 100)))
  })
  return ref
}

function ScrollProgress(props: ScrollProgressProps) {
  if (props.variant === "ring") return <ScrollProgressRing {...props} />
  return <ScrollProgressBar {...props} />
}

function ScrollProgressBar({
  progress,
  spring = true,
  label = "Reading progress",
  side = "top",
  position = "fixed",
  thickness = 3,
  className,
}: ScrollProgressBarProps) {
  const value = useProgress(progress, spring)
  const ref = useAriaValue(value)
  return (
    <div
      ref={ref}
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={0}
      data-slot="scroll-progress"
      data-variant="bar"
      style={{ height: thickness }}
      className={cn(
        "pointer-events-none inset-x-0 z-40 overflow-hidden bg-muted/60",
        position,
        side === "top" ? "top-0" : "bottom-0",
        className
      )}
    >
      <motion.div
        data-slot="scroll-progress-indicator"
        style={{ scaleX: value }}
        className="h-full origin-left rounded-r-full bg-primary"
      />
    </div>
  )
}

function ScrollProgressRing({
  progress,
  spring = true,
  label = "Reading progress",
  size = 44,
  thickness = 3,
  showValue = false,
  className,
}: ScrollProgressRingProps) {
  const value = useProgress(progress, spring)
  const ref = useAriaValue(value)
  /* Inset from the chip edge so the raised rim stays visible. */
  const radius = (size - thickness) / 2 - 3
  const circumference = 2 * Math.PI * radius
  const dashOffset = useTransform(value, (v) => circumference * (1 - Math.min(1, Math.max(0, v))))
  const percent = useTransform(value, (v) => `${Math.round(Math.min(1, Math.max(0, v)) * 100)}`)

  return (
    <div
      ref={ref}
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={0}
      data-slot="scroll-progress"
      data-variant="ring"
      style={{ width: size, height: size }}
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center rounded-full bg-card text-primary shadow-raised",
        className
      )}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="absolute inset-0 -rotate-90" aria-hidden>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={thickness}
          className="stroke-muted"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={thickness}
          strokeLinecap="round"
          className="stroke-current"
          strokeDasharray={circumference}
          style={{ strokeDashoffset: dashOffset }}
        />
      </svg>
      {showValue && (
        <motion.span className="relative text-ui-2xs font-semibold text-foreground tabular-nums" aria-hidden>
          {percent}
        </motion.span>
      )}
    </div>
  )
}

export { ScrollProgress, type ScrollProgressProps, type ScrollProgressBarProps, type ScrollProgressRingProps }
