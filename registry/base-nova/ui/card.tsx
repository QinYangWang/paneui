import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * `variant="inset"` is the two-layer card: a quiet tinted frame (4px padding)
 * that holds a raised CardPanel. Use it to present something (a demo, image,
 * code, a featured plan); keep dense dashboard cards on the default variant.
 * Radii stay concentric: frame rounded-2xl (16px) = panel rounded-xl (12px) + p-1.
 */
function Card({
  className,
  size = "default",
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & { size?: "default" | "sm"; variant?: "default" | "inset" }) {
  return (
    <div
      data-slot="card"
      data-size={size}
      data-variant={variant}
      className={cn(
        "group/card flex flex-col gap-(--card-spacing) overflow-hidden rounded-xl bg-card py-(--card-spacing) text-ui text-card-foreground shadow-raised [--card-spacing:--spacing(4)] data-[size=sm]:[--card-spacing:--spacing(3)]",
        "data-[variant=inset]:gap-0 data-[variant=inset]:rounded-2xl data-[variant=inset]:bg-muted data-[variant=inset]:p-1 data-[variant=inset]:shadow-raised dark:data-[variant=inset]:bg-background",
        className
      )}
      {...props}
    />
  )
}

/** The raised inner surface of an inset Card. */
function CardPanel({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-panel"
      className={cn(
        "flex flex-col gap-(--card-spacing) overflow-hidden rounded-xl bg-card py-(--card-spacing) shadow-raised",
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "grid auto-rows-min items-start gap-1.5 px-(--card-spacing) has-data-[slot=card-action]:grid-cols-[1fr_auto]",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("text-ui-lg leading-snug font-semibold group-data-[size=sm]/card:text-ui", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-ui leading-relaxed text-pretty text-muted-foreground", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className)}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-content" className={cn("px-(--card-spacing)", className)} {...props} />
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center gap-2 px-(--card-spacing)", className)}
      {...props}
    />
  )
}

export { Card, CardPanel, CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter }
