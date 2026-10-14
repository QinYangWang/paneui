"use client"

import * as React from "react"
import { AnimatePresence, motion, useInView, useReducedMotion, type MotionStyle } from "motion/react"

import { cn } from "@/lib/utils"

const DEFAULT_COLORS: [string, string, string] = [
  "oklch(0.66 0.25 25)", // red channel
  "oklch(0.78 0.19 150)", // green channel
  "oklch(0.64 0.22 262)", // blue channel
]

const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const
const EASE_OUT = [0.22, 1, 0.36, 1] as const

// Each channel starts pulled apart by this much (em) and converges onto the word.
const SPLIT = [-0.09, 0.03, 0.09]

type ChromaticTextRevealProps = Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> & {
  /** Fixed part of the sentence. */
  prefix?: string
  /** Final words, revealed one after another. */
  words: string[]
  /** Three channel colours that split apart and converge. */
  colors?: [string, string, string]
  /** Seconds the reveal sweep takes. */
  duration?: number
  /** Seconds a word rests before the next one. */
  pauseDuration?: number
  /** Seconds before the first reveal. */
  delay?: number
  /** Go back to the first word after the last one. */
  loop?: boolean
  /** Wait until the text scrolls into view. */
  startOnView?: boolean
  /**
   * What screen readers read instead of the animation. Defaults to the prefix
   * followed by every word ("Built to feel fast or calm").
   */
  srLabel?: string
}

const listFormat = new Intl.ListFormat("en", { type: "disjunction" })

/**
 * A fixed prefix followed by a cycling final word. Each word sweeps in left to right while
 * its red, green and blue channels, pulled apart, slide back together into the text colour.
 */
function ChromaticTextReveal({
  prefix,
  words,
  colors = DEFAULT_COLORS,
  duration = 0.9,
  pauseDuration = 1.8,
  delay = 0,
  loop = true,
  startOnView = true,
  srLabel,
  className,
  ...props
}: ChromaticTextRevealProps) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const reduce = useReducedMotion()
  const started = !startOnView || inView
  const [index, setIndex] = React.useState(0)
  const word = words.length ? words[index % words.length] : ""

  React.useEffect(() => {
    if (!started || words.length < 2) return
    const isLast = index === words.length - 1
    if (isLast && !loop) return
    const wait = (index === 0 ? delay : 0) + duration + pauseDuration
    const timer = window.setTimeout(() => setIndex((i) => (i + 1) % words.length), wait * 1000)
    return () => window.clearTimeout(timer)
  }, [started, index, words.length, loop, delay, duration, pauseDuration])

  const first = index === 0
  const sweepDelay = first ? delay : 0.05

  return (
    <span
      ref={ref}
      data-slot="chromatic-text-reveal"
      className={cn("inline-flex flex-wrap items-baseline", className)}
      {...props}
    >
      {/* The animation is aria-hidden; screen readers get the whole phrase once,
          not a live region that re-announces on every cycle. */}
      <span className="sr-only">
        {srLabel ?? [prefix, listFormat.format(Array.from(new Set(words)))].filter(Boolean).join(" ")}
      </span>
      {prefix ? (
        <span aria-hidden className="whitespace-pre">
          {prefix}{" "}
        </span>
      ) : null}
      <span aria-hidden className="relative inline-grid">
        {/* Reserve the widest word so the line never reflows. */}
        {Array.from(new Set(words)).map((w) => (
          <span key={w} className="invisible col-start-1 row-start-1 whitespace-nowrap">
            {w}
          </span>
        ))}
        <AnimatePresence initial={false}>
          {started ? (
            <motion.span
              key={`${index}-${word}`}
              data-slot="chromatic-text-reveal-word"
              className="col-start-1 row-start-1 whitespace-nowrap"
              style={
                {
                  "--sweep": reduce ? "130%" : "-30%",
                  maskImage: "linear-gradient(90deg, #000 calc(var(--sweep) - 30%), transparent var(--sweep))",
                  WebkitMaskImage: "linear-gradient(90deg, #000 calc(var(--sweep) - 30%), transparent var(--sweep))",
                } as MotionStyle
              }
              initial={reduce ? { opacity: 0 } : { opacity: 1 }}
              animate={{ "--sweep": "130%", opacity: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: "-0.2em", filter: "blur(4px)" }}
              transition={{
                "--sweep": reduce ? { duration: 0 } : { duration, delay: sweepDelay, ease: EASE_IN_OUT },
                opacity: { duration: 0.25 },
                default: { duration: 0.3, ease: EASE_OUT },
              }}
            >
              <span className="relative inline-block">
                {!reduce &&
                  colors.map((color, c) => (
                    <motion.span
                      key={c}
                      className="pointer-events-none absolute inset-0 whitespace-nowrap"
                      style={{ color }}
                      initial={{ x: `${SPLIT[c]}em`, opacity: 0.85, filter: "blur(1.5px)" }}
                      animate={{ x: "0em", opacity: 0, filter: "blur(0px)" }}
                      transition={{ duration: duration * 1.25, delay: sweepDelay + duration * 0.2, ease: EASE_OUT }}
                    >
                      {word}
                    </motion.span>
                  ))}
                <motion.span
                  className="relative inline-block"
                  initial={reduce ? false : { opacity: 0.25, filter: "blur(3px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  transition={{ duration: duration * 1.1, delay: sweepDelay + duration * 0.25, ease: EASE_OUT }}
                >
                  {word}
                </motion.span>
              </span>
            </motion.span>
          ) : null}
        </AnimatePresence>
      </span>
    </span>
  )
}

export { ChromaticTextReveal, type ChromaticTextRevealProps }
