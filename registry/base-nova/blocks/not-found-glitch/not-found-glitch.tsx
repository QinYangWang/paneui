"use client"

import * as React from "react"
import { useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/registry/base-nova/ui/button"

const GLYPHS = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789#%&@$?/\\<>"
const TICK = 45

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

/**
 * Scrambles each character through random glyphs before it settles, left to
 * right. The real text renders first (SSR, reduced motion), so the scramble is
 * purely an enhancement. `play` bumps restart it.
 */
function useScramble(text: string, play: number, duration = 750) {
  const reduce = useReducedMotion()
  const [display, setDisplay] = React.useState(text)
  React.useEffect(() => {
    if (reduce) {
      setDisplay(text)
      return
    }
    const chars = [...text]
    const start = performance.now()
    let last = 0
    let raf = 0
    const loop = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      if (now - last >= TICK || t === 1) {
        last = now
        const settled = Math.floor(t * chars.length + 0.0001)
        setDisplay(
          chars
            .map((ch, i) => (i < settled || ch === " " ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
            .join("")
        )
      }
      if (t < 1) raf = requestAnimationFrame(loop)
      else setDisplay(text)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [text, play, duration, reduce])
  return display
}

/**
 * 404 page whose digits scramble through glyphs before resolving. Hovering the
 * code replays the scramble and splits it into offset red and cyan channels.
 */
function NotFoundGlitch({
  code = "404",
  title,
  description,
  homeHref,
  homeLabel,
  secondaryHref,
  secondaryLabel,
  className,
  ...props
}: NotFoundProps) {
  const [play, setPlay] = React.useState(0)
  const display = useScramble(code, play)
  const channel =
    "pointer-events-none absolute inset-0 opacity-0 transition-[translate,opacity] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] mix-blend-multiply group-hover/glitch:opacity-80 dark:mix-blend-screen motion-reduce:hidden"

  return (
    <div
      data-slot="not-found-glitch"
      className={cn("flex min-h-[420px] w-full flex-col items-center justify-center gap-7 px-4 text-center", className)}
      {...props}
    >
      <div
        className="group/glitch relative cursor-default font-mono text-[clamp(5rem,18vw,10rem)] leading-none font-bold tracking-tighter select-none"
        onPointerEnter={(e) => e.pointerType === "mouse" && setPlay((p) => p + 1)}
        role="img"
        aria-label={`Error ${code}`}
      >
        <span aria-hidden className={cn(channel, "text-[oklch(0.65_0.25_25)] group-hover/glitch:translate-x-[4px] group-hover/glitch:-translate-y-px")}>
          {display}
        </span>
        <span aria-hidden className={cn(channel, "text-[oklch(0.78_0.15_200)] group-hover/glitch:-translate-x-[4px] group-hover/glitch:translate-y-px")}>
          {display}
        </span>
        <span aria-hidden className="relative bg-linear-to-b from-foreground to-foreground/60 bg-clip-text text-transparent tabular-nums">
          {display}
        </span>
      </div>
      <NotFoundCopy {...{ title, description, homeHref, homeLabel, secondaryHref, secondaryLabel }} />
    </div>
  )
}

export { NotFoundGlitch, type NotFoundProps }
