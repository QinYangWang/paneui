import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@paneui/ui/lib/utils"

/*
 * Joins buttons (and inputs, selects) into one control: inner corners go square and
 * neighbours overlap by their hairline. Nest groups with a gap to space clusters apart.
 */
const buttonGroupVariants = cva(
  "flex w-fit items-stretch *:focus-visible:relative *:focus-visible:z-10 has-[>[data-slot=button-group]]:gap-2",
  {
    variants: {
      orientation: {
        horizontal:
          "[&>*:not(:first-child)]:rounded-s-none [&>*:not(:last-child)]:rounded-e-none [&>[data-variant=outline]:not(:first-child)]:-ms-px [&>[data-slot=input]:not(:first-child)]:-ms-px",
        vertical:
          "flex-col [&>*:not(:first-child)]:rounded-t-none [&>*:not(:last-child)]:rounded-b-none [&>[data-variant=outline]:not(:first-child)]:-mt-px",
      },
    },
    defaultVariants: { orientation: "horizontal" },
  }
)

function ButtonGroup({
  className,
  orientation = "horizontal",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof buttonGroupVariants>) {
  return (
    <div
      role="group"
      data-slot="button-group"
      data-orientation={orientation}
      className={cn(buttonGroupVariants({ orientation }), className)}
      {...props}
    />
  )
}

/** Static text or an icon in the row, on the same well as an input. */
function ButtonGroupText({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="button-group-text"
      className={cn(
        "flex items-center gap-1.5 rounded-control bg-secondary px-2.5 text-ui font-medium text-muted-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

/** A hairline between filled buttons that would otherwise touch. */
function ButtonGroupSeparator({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<"div"> & { orientation?: "horizontal" | "vertical" }) {
  return (
    <div
      role="separator"
      aria-orientation={orientation}
      data-slot="button-group-separator"
      className={cn("shrink-0 self-stretch bg-foreground/10", orientation === "vertical" ? "w-px" : "h-px", className)}
      {...props}
    />
  )
}

export { ButtonGroup, ButtonGroupSeparator, ButtonGroupText, buttonGroupVariants }
