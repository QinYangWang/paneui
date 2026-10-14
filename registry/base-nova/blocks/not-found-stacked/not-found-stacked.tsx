"use client"

import * as React from "react"
import { motion, useReducedMotion, type Transition } from "motion/react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/registry/base-nova/ui/button"

const FAN: Transition = { type: "spring", stiffness: 320, damping: 22, mass: 0.8 }
const CARD =
  "absolute inset-0 flex flex-col items-center justify-center rounded-3xl bg-card shadow-raised"

type NotFoundProps = Omit<React.ComponentProps<"div">, "title" | "children"> & {
  /** The big status code. Default "404". */
  code?: string
  title?: React.ReactNode
  description?: React.ReactNode
  homeHref?: string
  homeLabel?: React.ReactNode
  /** Optional second action; hidden when no href is given. */
  secondaryHref?: string
  secondaryLabel?: React.ReactNode
}

function NotFoundCopy({
  title = "Page not found",
  description = "The page you're looking for moved, was renamed, or never existed.",
  homeHref = "/",
  homeLabel = "Back home",
  secondaryHref,
  secondaryLabel = "Contact support",
}: Pick<NotFoundProps, "title" | "description" | "homeHref" | "homeLabel" | "secondaryHref" | "secondaryLabel">) {
  return (
    <>
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-xl font-semibold tracking-tight text-balance">{title}</h1>
        <p className="max-w-sm text-sm text-pretty text-muted-foreground">{description}</p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2.5">
        <a href={homeHref} className={buttonVariants({ size: "lg" })}>
          {homeLabel}
        </a>
        {secondaryHref && (
          <a href={secondaryHref} className={buttonVariants({ variant: "secondary", size: "lg" })}>
            {secondaryLabel}
          </a>
        )}
      </div>
    </>
  )
}

type NotFoundStackedProps = NotFoundProps & {
  /** Caption under the code on the front card. */
  caption?: React.ReactNode
  /** Codes peeking from the two hidden cards. */
  behind?: [string, string]
}

/**
 * 404 page with the code on a card that sits over a hidden stack. Hovering or
 * focusing the deck (or tapping it on touch) fans the cards out on a spring.
 */
function NotFoundStacked({
  code = "404",
  caption = "Not in the deck",
  behind = ["403", "410"],
  title,
  description,
  homeHref,
  homeLabel,
  secondaryHref,
  secondaryLabel,
  className,
  ...props
}: NotFoundStackedProps) {
  const reduce = useReducedMotion()
  const [hover, setHover] = React.useState(false)
  const [pinned, setPinned] = React.useState(false)
  const open = hover || pinned
  const t = reduce ? { duration: 0 } : FAN
  const spread = (side: -1 | 1) =>
    open ? { rotate: 10 * side, x: 46 * side, y: 10, scale: 0.94 } : { rotate: 2.5 * side, x: 0, y: 6 * (side === -1 ? 1 : 2), scale: 0.97 - (side === 1 ? 0.03 : 0) }

  return (
    <div
      data-slot="not-found-stacked"
      className={cn("flex min-h-[420px] w-full flex-col items-center justify-center gap-8 px-4 text-center", className)}
      {...props}
    >
      <button
        type="button"
        aria-label={`Error ${code}. ${open ? "Collapse" : "Fan out"} the deck`}
        aria-pressed={pinned}
        onPointerEnter={(e) => e.pointerType === "mouse" && setHover(true)}
        onPointerLeave={() => setHover(false)}
        onFocus={() => setHover(true)}
        onBlur={() => setHover(false)}
        onClick={() => setPinned((p) => !p)}
        className="relative h-44 w-64 cursor-pointer rounded-3xl outline-none focus-visible:ring-3 focus-visible:ring-ring"
      >
        {([-1, 1] as const).map((side, i) => (
          <motion.span
            key={side}
            aria-hidden
            initial={false}
            animate={spread(side)}
            transition={t}
            className={cn(CARD, "text-muted-foreground/60")}
          >
            <span
              className={cn(
                "absolute top-3 font-mono text-xs font-semibold tabular-nums transition-opacity duration-200",
                side === -1 ? "left-4" : "right-4",
                open ? "opacity-100" : "opacity-0"
              )}
            >
              {behind[i]}
            </span>
          </motion.span>
        ))}
        <motion.span
          aria-hidden
          initial={false}
          animate={open ? { y: -8, rotate: 0, scale: 1.02 } : { y: 0, rotate: 0, scale: 1 }}
          transition={t}
          className={cn(CARD, "gap-1 shadow-surface")}
        >
          <span className="text-[clamp(3.5rem,9vw,4.75rem)] leading-none font-bold tracking-tighter tabular-nums">{code}</span>
          <span className="text-[11px] font-medium tracking-wide text-muted-foreground uppercase">{caption}</span>
        </motion.span>
      </button>
      <NotFoundCopy {...{ title, description, homeHref, homeLabel, secondaryHref, secondaryLabel }} />
    </div>
  )
}

export { NotFoundStacked, type NotFoundStackedProps }
