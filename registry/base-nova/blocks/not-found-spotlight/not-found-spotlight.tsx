"use client"

import * as React from "react"
import { motion, useMotionTemplate, useReducedMotion, useSpring } from "motion/react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/registry/base-nova/ui/button"

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

type NotFoundSpotlightProps = NotFoundProps & {
  /** Spotlight radius in px. Default 160. */
  radius?: number
}

/**
 * 404 page on a recessed panel: the code sits dim until a cursor-tracked
 * spotlight passes over it and reveals a bright copy underneath. Without a
 * hovering pointer the light rests at the centre.
 */
function NotFoundSpotlight({
  code = "404",
  radius = 160,
  title,
  description,
  homeHref,
  homeLabel,
  secondaryHref,
  secondaryLabel,
  className,
  ...props
}: NotFoundSpotlightProps) {
  const reduce = useReducedMotion()
  const panelRef = React.useRef<HTMLDivElement>(null)
  const spring = reduce ? { duration: 0 } : { stiffness: 260, damping: 30, mass: 0.6 }
  const x = useSpring(50, spring)
  const y = useSpring(50, spring)
  const r = useSpring(radius * 0.7, spring)
  const mask = useMotionTemplate`radial-gradient(${r}px circle at ${x}% ${y}%, black 0%, black 35%, transparent 100%)`
  const glow = useMotionTemplate`radial-gradient(${r}px circle at ${x}% ${y}%, color-mix(in oklch, var(--primary), transparent 82%), transparent 70%)`

  const move = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" && e.pointerType !== "pen") return
    const rect = panelRef.current?.getBoundingClientRect()
    if (!rect) return
    x.set(((e.clientX - rect.left) / rect.width) * 100)
    y.set(((e.clientY - rect.top) / rect.height) * 100)
    r.set(radius)
  }
  const rest = () => {
    x.set(50)
    y.set(50)
    r.set(radius * 0.7)
  }

  return (
    <div
      data-slot="not-found-spotlight"
      className={cn("flex min-h-[420px] w-full flex-col items-center justify-center gap-7 px-4 text-center", className)}
      {...props}
    >
      <div
        ref={panelRef}
        onPointerMove={move}
        onPointerLeave={rest}
        role="img"
        aria-label={`Error ${code}`}
        className="relative w-full max-w-md cursor-default overflow-hidden rounded-3xl bg-muted px-6 py-10 shadow-well select-none"
      >
        <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: glow }} />
        {/* Faint dot grid that the light also catches. */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 [background-image:radial-gradient(currentColor_1px,transparent_1px)] [background-size:14px_14px] text-foreground/25"
          style={{ maskImage: mask, WebkitMaskImage: mask }}
        />
        <div aria-hidden className="relative grid font-mono text-[clamp(5rem,16vw,9rem)] leading-none font-bold tracking-tighter">
          <span className="col-start-1 row-start-1 text-foreground/10">{code}</span>
          <motion.span
            className="col-start-1 row-start-1 bg-linear-to-br from-primary via-foreground to-primary bg-clip-text text-transparent"
            style={{ maskImage: mask, WebkitMaskImage: mask }}
          >
            {code}
          </motion.span>
        </div>
      </div>
      <NotFoundCopy {...{ title, description, homeHref, homeLabel, secondaryHref, secondaryLabel }} />
    </div>
  )
}

export { NotFoundSpotlight, type NotFoundSpotlightProps }
