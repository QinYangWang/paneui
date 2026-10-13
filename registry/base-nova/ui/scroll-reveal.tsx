"use client"

import * as React from "react"
import { motion, useInView, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"
import { useSmoothScrollContainer } from "@/registry/base-nova/ui/smooth-scroll"

type ScrollRevealProps = Omit<
  React.ComponentProps<typeof motion.div>,
  "ref" | "initial" | "animate" | "transition" | "children"
> & {
  children?: React.ReactNode
  /** Direction the content slides in from. */
  from?: "bottom" | "top" | "left" | "right"
  /** Slide distance in px. */
  distance?: number
  /** Starting blur in px. */
  blur?: number
  /** Delay in seconds, handy for staggering siblings. */
  delay?: number
  /** Reveal once (default) or every time it re-enters view. */
  once?: boolean
  /** How much of the element must be visible: "some", "all" or 0–1. */
  amount?: "some" | "all" | number
  /** Scroll root. Defaults to the nearest contained SmoothScroll, then the viewport. */
  root?: React.RefObject<Element | null>
}

function ScrollReveal({
  from = "bottom",
  distance = 24,
  blur = 8,
  delay = 0,
  once = true,
  amount = 0.3,
  root,
  className,
  children,
  ...props
}: ScrollRevealProps) {
  const reduce = useReducedMotion() ?? false
  const contextContainer = useSmoothScrollContainer()
  const ref = React.useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { root: root ?? contextContainer ?? undefined, once, amount })

  const axis = from === "left" || from === "right" ? "x" : "y"
  const sign = from === "bottom" || from === "right" ? 1 : -1
  const hidden = reduce
    ? { opacity: 0 }
    : { opacity: 0, [axis]: distance * sign, filter: `blur(${blur}px)` }
  const shown = reduce ? { opacity: 1 } : { opacity: 1, x: 0, y: 0, filter: "blur(0px)" }

  return (
    <motion.div
      ref={ref}
      data-slot="scroll-reveal"
      data-revealed={inView ? "" : undefined}
      initial={hidden}
      animate={inView ? shown : hidden}
      transition={
        reduce
          ? { duration: 0.2, delay }
          : {
              default: { type: "spring", stiffness: 220, damping: 26, mass: 0.8, delay },
              opacity: { duration: 0.45, ease: [0.22, 1, 0.36, 1], delay },
              filter: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay },
            }
      }
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export { ScrollReveal, type ScrollRevealProps }
