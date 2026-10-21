"use client"

import * as React from "react"
import { motion, useReducedMotion } from "motion/react"

/** The landing's one ease. */
export const EASE = [0.22, 1, 0.36, 1] as const

/**
 * True when movement should stay off. It reads false while the static HTML hydrates, so server
 * and client markup match, then settles on the reader's setting.
 */
export function useStill() {
  return useReducedMotion() ?? false
}

/** Fades and lifts its content once, the first time it scrolls into view. Under reduced motion it only fades. */
export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  as?: "div" | "section" | "li"
}) {
  const still = useStill()
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: still ? 0 : 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: still ? 0.4 : 0.9, delay, ease: EASE }}
    >
      {children}
    </Tag>
  )
}
