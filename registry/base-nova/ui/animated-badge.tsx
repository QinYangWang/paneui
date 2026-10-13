"use client"

import * as React from "react"
import { AnimatePresence, motion, useReducedMotion, type Variants } from "motion/react"

import { InfoIcon, LoaderIcon } from "@/components/icons"
import { cn } from "@/lib/utils"
import { ActionSwapText } from "@/registry/base-nova/ui/action-swap-blur"
import { Badge } from "@/registry/base-nova/ui/badge"

type AnimatedBadgeStatus = "idle" | "loading" | "success" | "error" | "warning" | "info"
type AnimatedBadgeSize = "sm" | "default" | "lg"

const STATUS_VARIANT = {
  idle: "chip",
  loading: "primary",
  success: "success",
  error: "destructive",
  warning: "warning",
  info: "primary",
} as const

const SIZE_CLASS: Record<AnimatedBadgeSize, string> = {
  sm: "",
  default: "",
  lg: "h-8 gap-2 px-3 text-sm [&_[data-slot=animated-badge-icon]]:size-4",
}

const ICON_SIZE: Record<AnimatedBadgeSize, string> = {
  sm: "size-3",
  default: "size-3.5",
  lg: "size-4",
}

const EASE_OUT = [0.22, 1, 0.36, 1] as const

const ICON_SWAP: Variants = {
  initial: { opacity: 0, y: "70%", scale: 0.8, rotate: -10, filter: "blur(4px)" },
  animate: {
    opacity: 1,
    y: "0%",
    scale: 1,
    rotate: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 300, damping: 22, mass: 0.7, opacity: { duration: 0.2 } },
  },
  exit: { opacity: 0, y: "-70%", scale: 0.9, rotate: 10, filter: "blur(4px)", transition: { duration: 0.18, ease: EASE_OUT } },
}

const FADE: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.15 } },
  exit: { opacity: 0, transition: { duration: 0.12 } },
}

const line = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" } as const

/** Glyph drawn in on arrival: check strokes in, cross draws both arms, warning gives a nudge. */
function StatusGlyph({ status, reduce }: { status: AnimatedBadgeStatus; reduce: boolean }) {
  const draw = (delay = 0) =>
    reduce
      ? {}
      : {
          initial: { pathLength: 0 },
          animate: { pathLength: 1 },
          transition: { duration: 0.32, delay, ease: EASE_OUT },
        }

  switch (status) {
    case "idle":
      return (
        <svg viewBox="0 0 18 18" className="size-full" aria-hidden>
          <circle cx="9" cy="9" r="3.6" fill="currentColor" />
        </svg>
      )
    case "loading":
      return (
        <motion.span
          className="inline-flex size-full"
          animate={reduce ? { opacity: [1, 0.45, 1] } : { rotate: 360 }}
          transition={reduce ? { duration: 1.6, repeat: Infinity } : { duration: 0.9, repeat: Infinity, ease: "linear" }}
        >
          <LoaderIcon className="size-full" />
        </motion.span>
      )
    case "success":
      return (
        <svg viewBox="0 0 18 18" className="size-full" aria-hidden>
          <motion.path {...line} d="M4.4 9.6l3 3 6.2-6.4" {...draw(0.08)} />
        </svg>
      )
    case "error":
      return (
        <svg viewBox="0 0 18 18" className="size-full" aria-hidden>
          <motion.path {...line} d="M5.1 5.1l7.8 7.8" {...draw(0.06)} />
          <motion.path {...line} d="M12.9 5.1l-7.8 7.8" {...draw(0.16)} />
        </svg>
      )
    case "warning":
      return (
        <motion.svg
          viewBox="0 0 18 18"
          className="size-full"
          aria-hidden
          initial={false}
          animate={reduce ? undefined : { rotate: [0, -12, 10, -6, 0] }}
          transition={{ duration: 0.5, delay: 0.12 }}
        >
          <path {...line} strokeWidth={1.6} d="M7.7 4.2a1.5 1.5 0 012.6 0l4.2 7.6a1.5 1.5 0 01-1.3 2.2H4.8a1.5 1.5 0 01-1.3-2.2z" />
          <path {...line} strokeWidth={1.6} d="M9 7.4v2.6M9 12h.01" />
        </motion.svg>
      )
    case "info":
      return <InfoIcon className="size-full" />
  }
}

type AnimatedBadgeProps = Omit<React.ComponentProps<"span">, "children"> & {
  status?: AnimatedBadgeStatus
  size?: AnimatedBadgeSize
  children?: React.ReactNode
  /** Replace the built-in status glyph. */
  icon?: React.ReactNode
  showIcon?: boolean
  /** Soft ping ring behind the status glyph, e.g. for a "live" or "syncing" badge. */
  pulse?: boolean
  /** Identity of the label; defaults to the text itself, or the status. Change it to roll the label. */
  contentKey?: string | number
}

/** Status badge whose glyph and label roll between states, with an optional live pulse. */
function AnimatedBadge({
  status = "idle",
  size = "default",
  children,
  icon,
  showIcon = true,
  pulse = false,
  contentKey,
  className,
  ...props
}: AnimatedBadgeProps) {
  const reduce = useReducedMotion() ?? false
  const key = String(
    contentKey ?? (typeof children === "string" || typeof children === "number" ? children : status)
  )

  return (
    <Badge
      role="status"
      data-slot="animated-badge"
      data-status={status}
      variant={STATUS_VARIANT[status]}
      size={size === "sm" ? "sm" : "default"}
      className={cn("transition-[box-shadow,background-color,color] duration-300", SIZE_CLASS[size], className)}
      {...props}
    >
      {showIcon ? (
        <span
          data-slot="animated-badge-icon"
          aria-hidden
          className={cn("relative inline-grid shrink-0 place-items-center", ICON_SIZE[size])}
        >
          {pulse && !reduce ? (
            <motion.span
              className="absolute inset-0 rounded-full bg-current"
              initial={{ scale: 0.6, opacity: 0.45 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
            />
          ) : null}
          <AnimatePresence initial={false}>
            <motion.span
              key={icon ? `custom-${status}` : status}
              variants={reduce ? FADE : ICON_SWAP}
              initial="initial"
              animate="animate"
              exit="exit"
              className="col-start-1 row-start-1 inline-flex size-full items-center justify-center [&_svg]:size-full"
            >
              {icon ?? <StatusGlyph status={status} reduce={reduce} />}
            </motion.span>
          </AnimatePresence>
        </span>
      ) : null}
      {children != null ? (
        <ActionSwapText value={key} animation="roll" className="tabular-nums">
          {children}
        </ActionSwapText>
      ) : null}
    </Badge>
  )
}

export { AnimatedBadge, type AnimatedBadgeProps, type AnimatedBadgeStatus, type AnimatedBadgeSize }
