"use client"

import * as React from "react"
import { motion, useInView, useReducedMotion, type Transition } from "motion/react"

import { cn } from "@/lib/utils"

type NumberTickerProps = Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> & {
  value: number
  /** Locale for Intl.NumberFormat (defaults to the runtime locale). */
  locale?: string
  /** Intl.NumberFormat options: currency, percent, compact, fraction digits... */
  format?: Intl.NumberFormatOptions
  /** Wait until the number scrolls into view before rolling from zero. */
  startOnView?: boolean
  /** Seconds between neighbouring digits, rippling from the right. */
  stagger?: number
  transition?: Transition
  digitClassName?: string
}

const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
const SPRING: Transition = { type: "spring", stiffness: 140, damping: 20, mass: 0.9 }

function Digit({
  digit,
  delay,
  transition,
  className,
}: {
  digit: number
  delay: number
  transition: Transition
  className?: string
}) {
  return (
    <span
      data-slot="number-ticker-digit"
      className={cn(
        "relative inline-block h-[1.15em] overflow-hidden leading-[1.15em] [mask-image:linear-gradient(to_bottom,transparent,black_18%,black_82%,transparent)]",
        className
      )}
    >
      {/* Invisible 0 gives the column its width; tabular-nums keeps all digits equal. */}
      <span className="invisible">0</span>
      <motion.span
        className="absolute inset-x-0 top-0 flex flex-col"
        initial={false}
        animate={{ y: `${-digit * 10}%` }}
        transition={{ ...transition, delay }}
      >
        {DIGITS.map((d) => (
          <span key={d} className="block h-[1.15em] text-center">
            {d}
          </span>
        ))}
      </motion.span>
    </span>
  )
}

function NumberTicker({
  value,
  locale,
  format,
  startOnView = true,
  stagger = 0.045,
  transition,
  className,
  digitClassName,
  ...props
}: NumberTickerProps) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const reduce = useReducedMotion()
  const armed = !startOnView || inView

  const formatter = React.useMemo(
    () => new Intl.NumberFormat(locale, format),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [locale, JSON.stringify(format)]
  )
  const text = formatter.format(value)
  const chars = Array.from(text)
  const motionTransition: Transition = reduce ? { duration: 0 } : { ...SPRING, ...transition }

  const digitCount = chars.filter((c) => /\d/.test(c)).length
  let digitIndex = 0
  return (
    <span
      ref={ref}
      data-slot="number-ticker"
      className={cn("inline-flex items-baseline tabular-nums", className)}
      {...props}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden className="inline-flex">
        {chars.map((ch, i) => {
          // Key by place from the right so a digit keeps its column (and rolls)
          // when the number grows or shrinks.
          const place = chars.length - i
          if (!/\d/.test(ch)) {
            return (
              <span key={`s${place}`} className="inline-block whitespace-pre">
                {ch}
              </span>
            )
          }
          const order = digitIndex++
          return (
            <Digit
              key={`d${place}`}
              digit={armed ? Number(ch) : 0}
              delay={(digitCount - 1 - order) * stagger}
              transition={motionTransition}
              className={digitClassName}
            />
          )
        })}
      </span>
    </span>
  )
}

export { NumberTicker, type NumberTickerProps }
