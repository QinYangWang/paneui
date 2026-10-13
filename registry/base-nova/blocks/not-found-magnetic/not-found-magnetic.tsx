"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/registry/base-nova/ui/button"
import { Magnetic } from "@/registry/base-nova/ui/magnetic"

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

type NotFoundMagneticProps = NotFoundProps & {
  /** How strongly each digit follows the cursor. Default 0.45. */
  strength?: number
}

/**
 * 404 page where every digit of the code is its own Magnetic wrapper: each one
 * leans toward a nearby cursor and springs back when it leaves.
 */
function NotFoundMagnetic({
  code = "404",
  strength = 0.45,
  title,
  description,
  homeHref,
  homeLabel,
  secondaryHref,
  secondaryLabel,
  className,
  ...props
}: NotFoundMagneticProps) {
  return (
    <div
      data-slot="not-found-magnetic"
      className={cn("flex min-h-[420px] w-full flex-col items-center justify-center gap-7 px-4 text-center", className)}
      {...props}
    >
      <div role="img" aria-label={`Error ${code}`} className="flex items-center gap-[0.04em] text-[clamp(5rem,18vw,10rem)] leading-none font-bold tracking-tighter select-none">
        {[...code].map((ch, i) => (
          <Magnetic key={i} strength={strength} range={48} aria-hidden>
            <span className="inline-block bg-linear-to-b from-foreground to-foreground/55 bg-clip-text px-[0.02em] text-transparent tabular-nums drop-shadow-[0_2px_0_color-mix(in_oklch,var(--foreground),transparent_92%)]">
              {ch}
            </span>
          </Magnetic>
        ))}
      </div>
      <NotFoundCopy {...{ title, description, homeHref, homeLabel, secondaryHref, secondaryLabel }} />
    </div>
  )
}

export { NotFoundMagnetic, type NotFoundMagneticProps }
