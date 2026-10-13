"use client"

import * as React from "react"
import { useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

const DEFAULT_GLYPHS = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789#%&*+=?/"

type TextScrambleProps = Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> & {
  /** The text to show. Changing it scrambles from the old value to the new one. */
  value: string
  /** Total animation time in ms. Defaults scale with length (360–900ms). */
  duration?: number
  /** Characters sampled while a position is unresolved. */
  glyphs?: string
  /** Also scramble in on first render. */
  scrambleOnMount?: boolean
  /** Called once the new value has fully resolved. */
  onComplete?: () => void
}

function TextScramble({
  value,
  duration,
  glyphs = DEFAULT_GLYPHS,
  scrambleOnMount = false,
  onComplete,
  className,
  ...props
}: TextScrambleProps) {
  const reduce = useReducedMotion()
  const [display, setDisplay] = React.useState(value)
  const previous = React.useRef<string | null>(scrambleOnMount ? "" : null)
  const completeRef = React.useRef(onComplete)
  completeRef.current = onComplete

  React.useEffect(() => {
    const from = previous.current ?? value
    previous.current = value
    if (from === value || reduce || !glyphs) {
      setDisplay(value)
      return
    }

    const target = Array.from(value)
    const source = Array.from(from)
    const length = Math.max(target.length, source.length)
    const total = duration ?? Math.min(900, Math.max(360, length * 34))
    // Each position resolves at its own moment, left to right with a little jitter.
    const resolveAt = Array.from({ length }, (_, i) =>
      Math.min(1, (i / length) * 0.75 + Math.random() * 0.25)
    )
    const pick = () => glyphs[Math.floor(Math.random() * glyphs.length)]
    const start = performance.now()
    let frame = 0
    let last = 0

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / total)
      if (now - last > 45 || progress === 1) {
        last = now
        let out = ""
        for (let i = 0; i < length; i++) {
          const ch = target[i]
          if (progress >= resolveAt[i]) out += ch ?? ""
          else if (ch === " " || (ch === undefined && source[i] === " ")) out += " "
          else out += pick()
        }
        setDisplay(out)
      }
      if (progress < 1) frame = requestAnimationFrame(tick)
      else {
        setDisplay(value)
        completeRef.current?.()
      }
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [value, duration, glyphs, reduce])

  return (
    <span
      data-slot="text-scramble"
      className={cn("relative inline-block whitespace-pre align-bottom", className)}
      {...props}
    >
      {/* The final value sizes the box, so width never jumps while scrambling. */}
      <span aria-hidden className="invisible">
        {value}
      </span>
      <span
        aria-hidden
        data-slot="text-scramble-display"
        className="absolute inset-0 overflow-hidden"
      >
        {display}
      </span>
      <span className="sr-only">{value}</span>
    </span>
  )
}

export { TextScramble, type TextScrambleProps }
