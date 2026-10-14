"use client"

import * as React from "react"
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react"

import { cn } from "@/lib/utils"

type AnimatedNumberProps = Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> & {
  value: number
  /** Where the count starts on first reveal. */
  from?: number
  /** Locale for Intl.NumberFormat (defaults to the runtime locale). */
  locale?: string
  /** Intl.NumberFormat options: currency, percent, compact, fraction digits... */
  format?: Intl.NumberFormatOptions
  /** Wait until the number scrolls into view before counting. */
  startOnView?: boolean
  /**
   * Spring settings. The default 380/42/0.7 is in the house range and slightly
   * overdamped, so the count glides in without overshooting the target.
   */
  stiffness?: number
  damping?: number
  mass?: number
}

/** Fraction digits the formatted target shows ("1,842" → 0, "$29.50" → 2, "98.6%" → 1). */
function fractionDigits(formatter: Intl.NumberFormat, value: number) {
  return formatter.formatToParts(value).find((p) => p.type === "fraction")?.value.length ?? 0
}

function AnimatedNumber({
  value,
  from = 0,
  locale,
  format,
  startOnView = true,
  stiffness = 380,
  damping = 42,
  mass = 0.7,
  className,
  ...props
}: AnimatedNumberProps) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const reduce = useReducedMotion()
  const formatKey = JSON.stringify(format ?? {})

  const formatter = React.useMemo(
    () => new Intl.NumberFormat(locale, format),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [locale, formatKey]
  )

  // In-between frames are formatted with the target's fraction digits, so a
  // count to 1,842 never flashes "1,234.567" and the width only changes when
  // a whole digit is gained or lost.
  const digits = fractionDigits(formatter, value)
  const frameFormatter = React.useMemo(() => {
    const options = format ?? {}
    if (options.maximumSignificantDigits != null || options.minimumSignificantDigits != null) return formatter
    return new Intl.NumberFormat(locale, {
      ...options,
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formatter, locale, formatKey, digits])
  const frameFormatterRef = React.useRef(frameFormatter)
  frameFormatterRef.current = frameFormatter

  // The value the current animation started from, so its ghost can reserve
  // the wider of the two widths while the count runs.
  const [start, setStart] = React.useState(from)
  const lastTarget = React.useRef<number | null>(null)

  const target = useMotionValue(from)
  const spring = useSpring(target, { stiffness, damping, mass, restDelta: 0.001 })
  const display = useTransform(spring, (v) => frameFormatterRef.current.format(v))

  React.useEffect(() => {
    if (startOnView && !inView) return
    if (lastTarget.current === value) return
    setStart(lastTarget.current ?? from)
    lastTarget.current = value
    if (reduce) spring.jump(value)
    target.set(value)
    // `from` only matters for the first reveal.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, inView, startOnView, reduce, spring, target])

  return (
    <span
      ref={ref}
      data-slot="animated-number"
      className={cn("inline-grid tabular-nums whitespace-nowrap", className)}
      {...props}
    >
      <span className="sr-only">{formatter.format(value)}</span>
      {/* Ghosts: stack in the same cell to hold the widest value steady. */}
      <span aria-hidden className="invisible col-start-1 row-start-1">
        {frameFormatter.format(start)}
      </span>
      <span aria-hidden className="invisible col-start-1 row-start-1">
        {formatter.format(value)}
      </span>
      <motion.span aria-hidden className="col-start-1 row-start-1">
        {display}
      </motion.span>
    </span>
  )
}

export { AnimatedNumber, type AnimatedNumberProps }
