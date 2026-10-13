"use client"

import * as React from "react"
import { motion, useReducedMotion, type Transition } from "motion/react"

import { cn } from "@/lib/utils"

type LoaderVariant = "spinner" | "ring" | "dots" | "bars" | "pulse" | "ripple" | "orbit" | "typing"
type LoaderSize = "sm" | "md" | "lg"

const SIZES: Record<LoaderSize, number> = { sm: 16, md: 24, lg: 32 }
const EASE = [0.45, 0, 0.55, 1] as const

type PartProps = { s: number; speed: number; reduce: boolean }

/** Reduced motion: every variant falls back to a calm opacity fade, no transforms. */
function fade(speed: number, delay = 0): Transition {
  return { duration: 1.4 / speed, ease: EASE, repeat: Infinity, delay }
}

function Spinner({ s, speed }: PartProps) {
  // Opacity-only, so it is already reduced-motion safe.
  const ticks = 8
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      {Array.from({ length: ticks }, (_, i) => (
        <motion.rect
          key={i}
          x={10.75}
          y={1.5}
          width={2.5}
          height={6.5}
          rx={1.25}
          fill="currentColor"
          transform={`rotate(${(360 / ticks) * i} 12 12)`}
          initial={{ opacity: 0.2 }}
          animate={{ opacity: [1, 0.2] }}
          transition={{ duration: 0.9 / speed, ease: "linear", repeat: Infinity, delay: (i / ticks) * (0.9 / speed) }}
        />
      ))}
    </svg>
  )
}

function Ring({ s, speed, reduce }: PartProps) {
  return (
    <motion.svg
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="none"
      animate={reduce ? { opacity: [1, 0.45, 1] } : { rotate: 360 }}
      transition={reduce ? fade(speed) : { duration: 0.8 / speed, ease: "linear", repeat: Infinity }}
    >
      <circle cx={12} cy={12} r={9.5} stroke="currentColor" strokeOpacity={0.18} strokeWidth={3} />
      <path d="M12 2.5a9.5 9.5 0 0 1 9.5 9.5" stroke="currentColor" strokeWidth={3} strokeLinecap="round" />
    </motion.svg>
  )
}

function Dots({ s, speed, reduce }: PartProps) {
  const d = Math.max(3, Math.round(s / 4.5))
  return (
    <span className="flex items-center" style={{ height: s, gap: d * 0.6 }}>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="block rounded-full bg-current"
          style={{ width: d, height: d }}
          animate={reduce ? { opacity: [0.3, 1, 0.3] } : { y: [0, -d * 0.9, 0], opacity: [0.55, 1, 0.55] }}
          transition={reduce ? fade(speed, i * 0.18) : { duration: 0.75 / speed, ease: EASE, repeat: Infinity, delay: i * 0.12 / speed, repeatDelay: 0.15 / speed }}
        />
      ))}
    </span>
  )
}

function Bars({ s, speed, reduce }: PartProps) {
  const w = Math.max(2, Math.round(s / 8))
  return (
    <span className="flex items-center" style={{ height: s, gap: w * 0.75 }}>
      {[0, 1, 2, 3].map((i) => (
        <motion.span
          key={i}
          className="block origin-center rounded-full bg-current"
          style={{ width: w, height: s * 0.8 }}
          animate={reduce ? { opacity: [0.3, 1, 0.3] } : { scaleY: [0.35, 1, 0.35] }}
          transition={reduce ? fade(speed, i * 0.15) : { duration: 0.9 / speed, ease: EASE, repeat: Infinity, delay: i * 0.1 / speed }}
        />
      ))}
    </span>
  )
}

function Pulse({ s, speed, reduce }: PartProps) {
  return (
    <span className="relative flex items-center justify-center" style={{ width: s, height: s }}>
      {!reduce && (
        <motion.span
          className="absolute inset-0 rounded-full bg-current"
          animate={{ scale: [0.35, 1], opacity: [0.45, 0] }}
          transition={{ duration: 1.2 / speed, ease: [0.22, 1, 0.36, 1], repeat: Infinity }}
        />
      )}
      <motion.span
        className="block rounded-full bg-current"
        style={{ width: s * 0.38, height: s * 0.38 }}
        animate={reduce ? { opacity: [1, 0.4, 1] } : { scale: [1, 0.82, 1] }}
        transition={reduce ? fade(speed) : { duration: 1.2 / speed, ease: EASE, repeat: Infinity }}
      />
    </span>
  )
}

function Ripple({ s, speed, reduce }: PartProps) {
  if (reduce) {
    return (
      <motion.span
        className="block rounded-full border-2 border-current"
        style={{ width: s, height: s }}
        animate={{ opacity: [1, 0.35, 1] }}
        transition={fade(speed)}
      />
    )
  }
  return (
    <span className="relative block" style={{ width: s, height: s }}>
      {[0, 1].map((i) => (
        <motion.span
          key={i}
          className="absolute inset-0 rounded-full border-current"
          style={{ borderWidth: Math.max(1.5, s / 14) }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: [0, 1], opacity: [1, 0] }}
          transition={{ duration: 1.4 / speed, ease: [0.22, 1, 0.36, 1], repeat: Infinity, delay: (i * 0.7) / speed }}
        />
      ))}
    </span>
  )
}

function Orbit({ s, speed, reduce }: PartProps) {
  const d = Math.max(3, s / 5)
  return (
    <span className="relative block" style={{ width: s, height: s }}>
      <span
        className="absolute rounded-full bg-current opacity-30"
        style={{ width: d, height: d, left: (s - d) / 2, top: (s - d) / 2 }}
      />
      {[0, 1].map((i) => (
        <motion.span
          key={i}
          className="absolute inset-0"
          initial={{ rotate: i * 180 }}
          animate={reduce ? { opacity: [1, 0.35, 1] } : { rotate: i * 180 + 360 }}
          transition={reduce ? fade(speed, i * 0.35) : { duration: 1.1 / speed, ease: [0.6, 0.1, 0.4, 0.9], repeat: Infinity }}
        >
          <span
            className="absolute rounded-full bg-current"
            style={{ width: d, height: d, left: (s - d) / 2, top: 0, opacity: i ? 0.6 : 1 }}
          />
        </motion.span>
      ))}
    </span>
  )
}

function Typing({ s, speed, reduce }: PartProps) {
  const d = Math.max(3, Math.round(s / 5.5))
  return (
    <span
      className="flex items-center justify-center rounded-full"
      style={{
        height: s,
        paddingInline: s * 0.32,
        gap: d * 0.7,
        backgroundColor: "color-mix(in oklch, currentColor 12%, transparent)",
      }}
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="block rounded-full bg-current"
          style={{ width: d, height: d }}
          animate={reduce ? { opacity: [0.3, 1, 0.3] } : { opacity: [0.3, 1, 0.3], scale: [0.85, 1.1, 0.85], y: [0, -d * 0.35, 0] }}
          transition={reduce ? fade(speed, i * 0.2) : { duration: 1.1 / speed, ease: EASE, repeat: Infinity, delay: (i * 0.18) / speed }}
        />
      ))}
    </span>
  )
}

const PARTS: Record<LoaderVariant, (props: PartProps) => React.ReactNode> = {
  spinner: Spinner,
  ring: Ring,
  dots: Dots,
  bars: Bars,
  pulse: Pulse,
  ripple: Ripple,
  orbit: Orbit,
  typing: Typing,
}

/**
 * Loading indicator in eight styles. Inherits `currentColor`, so set colour
 * with a text-* class. Reduced motion swaps movement for a soft fade.
 */
function Loader({
  className,
  variant = "spinner",
  size = "md",
  speed = 1,
  label = "Loading",
  ...props
}: Omit<React.ComponentProps<"span">, "children"> & {
  variant?: LoaderVariant
  size?: LoaderSize
  /** Multiplier on animation speed; 2 is twice as fast. */
  speed?: number
  /** Announced to screen readers. */
  label?: string
}) {
  const reduce = useReducedMotion() ?? false
  const Part = PARTS[variant]
  return (
    <span
      role="status"
      aria-label={label}
      data-slot="loader"
      data-variant={variant}
      data-size={size}
      className={cn("inline-flex shrink-0 items-center justify-center text-current", className)}
      {...props}
    >
      <Part s={SIZES[size]} speed={speed} reduce={reduce} />
    </span>
  )
}

export { Loader, type LoaderVariant, type LoaderSize }
