import * as React from "react"

import { cn } from "@/lib/utils"
import { TextShimmer } from "@/registry/base-nova/ui/text-shimmer"

type ThinkingShimmerProps = React.HTMLAttributes<HTMLSpanElement> & {
  /** While true the line shimmers; set false to settle it into plain muted text. */
  active?: boolean
  /** Seconds per shimmer sweep. */
  duration?: number
  /** Leading soft pulse dot. */
  dot?: boolean
}

/**
 * The quiet status line under an agent's turn ("Thinking…", "Searching the web…").
 * Shimmers while the work runs and settles to plain text when it's done.
 */
function ThinkingShimmer({
  active = true,
  duration = 2,
  dot = false,
  className,
  children = "Thinking…",
  ...props
}: ThinkingShimmerProps) {
  return (
    <span
      role="status"
      aria-live="polite"
      aria-busy={active || undefined}
      data-slot="thinking-shimmer"
      data-active={active || undefined}
      className={cn("inline-flex items-center gap-2 text-sm font-medium text-muted-foreground", className)}
      {...props}
    >
      {dot && (
        <span aria-hidden className="relative inline-flex size-2 shrink-0">
          {active && (
            <span className="absolute inset-0 animate-ping rounded-full bg-primary/50 motion-reduce:animate-none" />
          )}
          <span
            className={cn(
              "relative size-2 rounded-full transition-colors duration-300",
              active ? "bg-primary" : "bg-muted-foreground/50"
            )}
          />
        </span>
      )}
      {active ? <TextShimmer duration={duration}>{children}</TextShimmer> : <span>{children}</span>}
    </span>
  )
}

export { ThinkingShimmer, type ThinkingShimmerProps }
