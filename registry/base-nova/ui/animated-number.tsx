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
  /** Spring settings; defaults settle in roughly a second. */
  stiffness?: number
  damping?: number
}

function AnimatedNumber({
  value,
  from = 0,
  locale,
  format,
  startOnView = true,
  stiffness = 70,
  damping = 20,
  className,
  ...props
}: AnimatedNumberProps) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const reduce = useReducedMotion()

  const formatter = React.useMemo(
    () => new Intl.NumberFormat(locale, format),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [locale, JSON.stringify(format)]
  )

  const target = useMotionValue(from)
  const spring = useSpring(target, { stiffness, damping, restDelta: 0.001 })
  const display = useTransform(spring, (v) => formatter.format(v))

  React.useEffect(() => {
    if (startOnView && !inView) return
    if (reduce) spring.jump(value)
    target.set(value)
  }, [value, inView, startOnView, reduce, spring, target])

  return (
    <span
      ref={ref}
      data-slot="animated-number"
      className={cn("inline-block tabular-nums", className)}
      {...props}
    >
      <span className="sr-only">{formatter.format(value)}</span>
      <motion.span aria-hidden>{display}</motion.span>
    </span>
  )
}

export { AnimatedNumber, type AnimatedNumberProps }
