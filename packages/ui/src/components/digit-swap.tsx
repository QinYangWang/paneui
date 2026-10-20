"use client"

import * as React from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"

import { cn } from "@paneui/ui/lib/utils"

type DigitSwapDirection = "up" | "down" | "auto"

type DigitSwapProps = Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> & {
  /** Number or pre-formatted string ("$1,204", "•••• 4242"). Each character gets its own slot. */
  value: string | number
  /**
   * Where incoming glyphs enter from. "up" rolls them up from below, "down" drops them from above,
   * "auto" picks "up" when the numeric value grows and "down" when it shrinks.
   */
  direction?: DigitSwapDirection
  /** Seconds per glyph roll. */
  duration?: number
  /** Seconds between neighbouring glyphs. */
  stagger?: number
  /** Which end the stagger starts from. "end" ripples right-to-left, like an odometer. */
  staggerFrom?: "start" | "end"
  /** Change to replay every glyph even when the characters are the same (e.g. on reveal). */
  animationKey?: string | number
  /** Number of trailing characters that get `suffixClassName` (units, cents, "/mo"). */
  suffixLength?: number
  glyphClassName?: string
  suffixClassName?: string
}

type GlyphCustom = { dir: "up" | "down"; reduce: boolean }

const EASE_OUT = [0.22, 1, 0.36, 1] as const

const GLYPH_VARIANTS = {
  enter: ({ dir, reduce }: GlyphCustom) => ({
    opacity: 0,
    y: reduce ? "0%" : dir === "up" ? "60%" : "-60%",
    filter: reduce ? "blur(0px)" : "blur(2px)",
  }),
  shown: { opacity: 1, y: "0%", filter: "blur(0px)" },
  exit: ({ dir, reduce }: GlyphCustom) => ({
    opacity: 0,
    y: reduce ? "0%" : dir === "up" ? "-60%" : "60%",
    filter: reduce ? "blur(0px)" : "blur(2px)",
  }),
}

function numeric(text: string) {
  const n = Number.parseFloat(text.replace(/[^\d.-]/g, ""))
  return Number.isFinite(n) ? n : null
}

/**
 * Fixed-slot digits and mask glyphs that roll when they change. Unchanged characters stay put;
 * digits sit in 1ch slots so nothing jitters, and slots are keyed from the right so a
 * number that gains a digit keeps its ones column in place.
 */
function DigitSwap({
  value,
  direction = "auto",
  duration = 0.32,
  stagger = 0.02,
  staggerFrom = "start",
  animationKey,
  suffixLength = 0,
  className,
  glyphClassName,
  suffixClassName,
  ...props
}: DigitSwapProps) {
  const reduce = useReducedMotion() ?? false
  const text = String(value)

  // Remember the last value to work out "auto" direction (render-time derived state).
  const [track, setTrack] = React.useState({ text, dir: "up" as "up" | "down" })
  if (track.text !== text) {
    const before = numeric(track.text)
    const after = numeric(text)
    const dir = before != null && after != null && after < before ? "down" : "up"
    setTrack({ text, dir })
  }
  const dir = direction === "auto" ? track.dir : direction

  // Slots added after mount (a new leading digit) should animate in too.
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])

  const chars = Array.from(text)
  const count = chars.length
  const suffixStart = count - Math.max(0, suffixLength)
  const custom: GlyphCustom = { dir, reduce }

  return (
    <span
      data-slot="digit-swap"
      data-direction={dir}
      className={cn("inline-flex items-baseline whitespace-nowrap tabular-nums", className)}
      {...props}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden className="inline-flex items-baseline">
        {chars.map((char, i) => {
          const fromEnd = count - 1 - i
          const order = staggerFrom === "end" ? fromEnd : i
          const isDigit = /\d/.test(char)
          if (char === " ") return <span key={`s${fromEnd}`} className="inline-block w-[0.3em]" />
          return (
            <span
              key={`s${fromEnd}`}
              data-slot="digit-swap-glyph"
              className={cn(
                "relative inline-block [clip-path:inset(-0.05em_-0.1em)]",
                isDigit && "w-[1ch] text-center",
                i >= suffixStart && suffixClassName
              )}
            >
              <span className="invisible">{char}</span>
              <AnimatePresence initial={mounted} custom={custom}>
                <motion.span
                  key={`${char}-${animationKey ?? ""}`}
                  custom={custom}
                  variants={GLYPH_VARIANTS}
                  initial="enter"
                  animate="shown"
                  exit="exit"
                  transition={{
                    duration: reduce ? Math.min(duration, 0.15) : duration,
                    delay: reduce ? 0 : order * stagger,
                    ease: EASE_OUT,
                  }}
                  className={cn("absolute inset-0 text-center will-change-[transform,opacity]", glyphClassName)}
                >
                  {char}
                </motion.span>
              </AnimatePresence>
            </span>
          )
        })}
      </span>
    </span>
  )
}

export { DigitSwap, type DigitSwapProps, type DigitSwapDirection }
