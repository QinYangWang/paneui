"use client"

import * as React from "react"
import { motion, useInView, useReducedMotion, type Transition } from "motion/react"

import { cn } from "@/lib/utils"

type TextRevealTag = "span" | "p" | "div" | "h1" | "h2" | "h3" | "h4" | "blockquote"

type TextRevealProps = Omit<React.HTMLAttributes<HTMLElement>, "children"> & {
  /** Text to reveal. An array renders one line per entry. */
  text: string | string[]
  as?: TextRevealTag
  /** Animate a word at a time or a character at a time. */
  split?: "word" | "char"
  /** "mount" plays immediately, "view" waits until the text scrolls into view. */
  trigger?: "mount" | "view"
  /** Only play the first time it enters view (trigger="view"). */
  once?: boolean
  /** Seconds between units. */
  stagger?: number
  /** Seconds before the first unit. */
  delay?: number
  /** Starting blur in px. */
  blur?: number
  /** Starting vertical offset, relative to the unit's own height. */
  offset?: string
  transition?: Transition
}

const DEFAULT_SPRING: Transition = { type: "spring", stiffness: 170, damping: 24, mass: 1 }

/** Splits a line into words that keep their trailing whitespace. */
function tokenize(line: string) {
  return (line.match(/\S+\s*|\s+/g) ?? []).map((chunk) => {
    const word = chunk.trimEnd()
    return { word, space: chunk.slice(word.length) }
  })
}

function TextReveal({
  text,
  as = "span",
  split = "word",
  trigger = "mount",
  once = true,
  stagger,
  delay = 0,
  blur = 10,
  offset = "45%",
  transition,
  className,
  ...props
}: TextRevealProps) {
  const ref = React.useRef<HTMLElement>(null)
  const inView = useInView(ref, { once, amount: 0.4 })
  const reduce = useReducedMotion()
  const active = trigger === "mount" ? true : inView

  const lines = Array.isArray(text) ? text : [text]
  const step = stagger ?? (split === "char" ? 0.025 : 0.07)
  const base = { ...DEFAULT_SPRING, ...transition }

  const hidden = reduce
    ? { opacity: 0 }
    : { opacity: 0, y: offset, filter: `blur(${blur}px)` }
  const shown = reduce
    ? { opacity: 1 }
    : { opacity: 1, y: "0%", filter: "blur(0px)" }

  let index = 0
  const unit = (content: string, key: string) => {
    const i = index++
    return (
      <motion.span
        key={key}
        data-slot="text-reveal-unit"
        className="inline-block will-change-[transform,filter,opacity]"
        initial={hidden}
        animate={active ? shown : hidden}
        transition={
          reduce
            ? { duration: 0.3, delay: delay + i * step * 0.5 }
            : { ...base, delay: delay + i * step, opacity: { duration: 0.35, delay: delay + i * step } }
        }
      >
        {content}
      </motion.span>
    )
  }

  const Comp = as as React.ElementType

  return (
    <Comp
      ref={ref}
      data-slot="text-reveal"
      aria-label={lines.join(" ")}
      className={cn(as === "span" ? "inline-block" : "block", className)}
      {...props}
    >
      {lines.map((line, li) => (
        <span key={li} aria-hidden className="block">
          {tokenize(line).map(({ word, space }, wi) =>
            split === "word" ? (
              <React.Fragment key={wi}>
                {word ? unit(word, `w${wi}`) : null}
                {space}
              </React.Fragment>
            ) : (
              <React.Fragment key={wi}>
                {/* Keep characters of a word together so lines only wrap between words. */}
                <span className="inline-block whitespace-nowrap">
                  {Array.from(word).map((ch, ci) => unit(ch, `c${ci}`))}
                </span>
                {space}
              </React.Fragment>
            )
          )}
        </span>
      ))}
    </Comp>
  )
}

export { TextReveal, type TextRevealProps }
