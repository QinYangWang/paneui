import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@paneui/ui/lib/utils"

/*
 * Desktop window chrome for showing a piece of UI as an app: a title bar with the three window
 * dots, then an inset body that follows the frame's corner (frame + frame-inner). `glass` lets a
 * picture behind it through; `solid` sits on plain pages.
 */
const windowFrameVariants = cva("frame-3xl frame-p-1.5 flex flex-col rounded-3xl shadow-xl", {
  variants: {
    variant: {
      solid: "bg-shell",
      glass: "bg-shell/80 backdrop-blur-xl",
    },
  },
  defaultVariants: { variant: "solid" },
})

type WindowFrameSize = "sm" | "default"
const WindowFrameContext = React.createContext<WindowFrameSize>("default")

function WindowFrame({
  className,
  variant = "solid",
  size = "default",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof windowFrameVariants> & { size?: WindowFrameSize }) {
  return (
    <WindowFrameContext.Provider value={size}>
      <div
        data-slot="window-frame"
        data-variant={variant}
        data-size={size}
        className={cn(windowFrameVariants({ variant }), className)}
        {...props}
      />
    </WindowFrameContext.Provider>
  )
}

/** The title bar. Starts with the window dots unless `controls={false}`. */
function WindowFrameBar({
  className,
  controls = true,
  children,
  ...props
}: React.ComponentProps<"div"> & { controls?: boolean }) {
  const size = React.useContext(WindowFrameContext)
  return (
    <div
      data-slot="window-frame-bar"
      className={cn("relative flex shrink-0 items-center gap-3", size === "sm" ? "h-8 px-2.5" : "h-9 px-3", className)}
      {...props}
    >
      {controls ? <WindowFrameControls /> : null}
      {children}
    </div>
  )
}

/** The three window dots. Decoration only, so hidden from assistive tech. */
function WindowFrameControls({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span data-slot="window-frame-controls" aria-hidden className={cn("flex gap-1.5", className)} {...props}>
      <span className="size-2.5 rounded-full bg-foreground/15" />
      <span className="size-2.5 rounded-full bg-foreground/15" />
      <span className="size-2.5 rounded-full bg-foreground/15" />
    </span>
  )
}

/** The window title: beside the dots by default, or centred on the bar as a chip. */
function WindowFrameTitle({
  className,
  align = "start",
  ...props
}: React.ComponentProps<"span"> & { align?: "start" | "center" }) {
  return (
    <span
      data-slot="window-frame-title"
      data-align={align}
      className={cn(
        align === "center"
          ? "absolute start-1/2 max-w-1/2 -translate-x-1/2 truncate rounded-md bg-foreground/5 px-3 py-0.5 text-ui-sm text-muted-foreground rtl:translate-x-1/2"
          : "min-w-0 truncate text-ui font-medium text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

/** Controls at the end of the bar. */
function WindowFrameActions({ className, ...props }: React.ComponentProps<"span">) {
  return <span data-slot="window-frame-actions" className={cn("ms-auto flex items-center", className)} {...props} />
}

/** The window's content, inset from the frame with a matching corner. */
function WindowFrameBody({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="window-frame-body"
      className={cn("frame-inner min-h-0 grow overflow-hidden bg-background", className)}
      {...props}
    />
  )
}

export {
  WindowFrame,
  WindowFrameBar,
  WindowFrameControls,
  WindowFrameTitle,
  WindowFrameActions,
  WindowFrameBody,
  windowFrameVariants,
}
