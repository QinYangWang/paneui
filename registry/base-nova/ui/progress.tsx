import * as React from "react"
import { Progress as ProgressPrimitive } from "@base-ui/react/progress"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const trackVariants = cva("relative w-full overflow-hidden rounded-full bg-foreground/8", {
  variants: {
    size: { sm: "h-1", default: "h-1.5", lg: "h-2" },
  },
  defaultVariants: { size: "default" },
})

const indicatorVariants = cva(
  "h-full rounded-full transition-[width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
  {
    variants: {
      tone: {
        default: "bg-primary",
        success: "bg-success",
        warning: "bg-warning",
        destructive: "bg-destructive",
      },
    },
    defaultVariants: { tone: "default" },
  }
)

// The indeterminate bar slides across the track; under reduced motion it pulses in place.
const INDETERMINATE_CSS =
  "@keyframes qy-progress{0%{transform:translateX(-100%)}100%{transform:translateX(250%)}}@keyframes qy-progress-pulse{0%,100%{opacity:.4}50%{opacity:1}}"

type ProgressProps = Omit<ProgressPrimitive.Root.Props, "children"> &
  VariantProps<typeof trackVariants> &
  VariantProps<typeof indicatorVariants> & {
    /** Label and value row above the track (`ProgressLabel`, `ProgressValue`). */
    children?: React.ReactNode
  }

/** A determinate bar, or an indeterminate one when `value` is `null`. */
function Progress({ className, size = "default", tone = "default", value, children, ...props }: ProgressProps) {
  const indeterminate = value == null
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      data-size={size}
      value={value}
      className={cn("flex w-full flex-col gap-1.5", className)}
      {...props}
    >
      {indeterminate && (
        <style href="qy-progress" precedence="default">
          {INDETERMINATE_CSS}
        </style>
      )}
      {children != null && <div className="flex items-center justify-between gap-3">{children}</div>}
      <ProgressPrimitive.Track data-slot="progress-track" className={trackVariants({ size })}>
        <ProgressPrimitive.Indicator
          data-slot="progress-indicator"
          className={cn(
            indicatorVariants({ tone }),
            indeterminate &&
              "w-2/5 animate-[qy-progress_1.4s_cubic-bezier(0.65,0,0.35,1)_infinite] motion-reduce:w-full motion-reduce:animate-[qy-progress-pulse_1.6s_ease-in-out_infinite]"
          )}
        />
      </ProgressPrimitive.Track>
    </ProgressPrimitive.Root>
  )
}

function ProgressLabel({ className, ...props }: ProgressPrimitive.Label.Props) {
  return <ProgressPrimitive.Label data-slot="progress-label" className={cn("text-ui font-medium", className)} {...props} />
}

function ProgressValue({ className, ...props }: ProgressPrimitive.Value.Props) {
  return (
    <ProgressPrimitive.Value
      data-slot="progress-value"
      className={cn("text-ui-sm text-muted-foreground tabular-nums", className)}
      {...props}
    />
  )
}

export { Progress, ProgressLabel, ProgressValue }
export type { ProgressProps }
