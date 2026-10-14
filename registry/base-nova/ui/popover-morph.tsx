"use client"

import * as React from "react"
import { Popover as PopoverPrimitive } from "@base-ui/react/popover"

import { XIcon } from "@/components/icons"
import { cn } from "@/lib/utils"

/*
 * A popover whose panel grows out of the trigger's own shape. The panel is laid
 * over the trigger and starts clipped to the trigger's box (pill radius and
 * colour included), then unclips to its full size from the trigger's corner and
 * eases into the popover surface; closing folds it back into the button.
 * Base UI Popover handles focus, Escape, outside press and ARIA.
 */

const MorphPopover = PopoverPrimitive.Root

function MorphPopoverTrigger({ className, ...props }: PopoverPrimitive.Trigger.Props) {
  return (
    <PopoverPrimitive.Trigger
      data-slot="morph-popover-trigger"
      className={cn(
        "inline-flex h-9 cursor-pointer items-center gap-2 rounded-lg bg-secondary px-3.5 text-sm font-medium text-secondary-foreground shadow-raised transition-[box-shadow,background-color,scale] duration-150 ease-out outline-none select-none hover:bg-accent hover:shadow-raised-hover active:scale-96 focus-visible:ring-3 focus-visible:ring-ring data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
        className
      )}
      {...props}
    />
  )
}

function MorphPopoverContent({
  className,
  children,
  side = "bottom",
  align = "start",
  triggerRadius = "calc(var(--anchor-height) / 2)",
  ...props
}: PopoverPrimitive.Popup.Props & {
  /** Which way the panel grows from the trigger. */
  side?: "top" | "bottom"
  /** Which trigger edge the panel stays pinned to. */
  align?: "start" | "center" | "end"
  /** Corner radius of the trigger shape the panel starts from (CSS length). Defaults to a full pill. */
  triggerRadius?: string
}) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Positioner
        className="z-50 outline-none"
        side={side}
        align={align}
        // overlap the trigger so the panel can grow out of it
        sideOffset={({ anchor }) => -anchor.height}
        collisionPadding={8}
      >
        <PopoverPrimitive.Popup
          data-slot="morph-popover-content"
          style={{ "--morph-r0": triggerRadius } as React.CSSProperties}
          className={cn(
            "group/morph relative flex w-72 min-w-(--anchor-width) max-w-[calc(100vw-1rem)] flex-col gap-3 rounded-2xl bg-popover p-4 text-sm text-popover-foreground shadow-surface outline-none",
            // insets of the trigger's box inside the panel, per side/alignment
            "[--mt:0px] [--mb:calc(100%_-_var(--anchor-height))] [--ml:0px] [--mr:calc(100%_-_var(--anchor-width))]",
            "data-[side=top]:[--mt:calc(100%_-_var(--anchor-height))] data-[side=top]:[--mb:0px]",
            "data-[align=end]:[--ml:calc(100%_-_var(--anchor-width))] data-[align=end]:[--mr:0px]",
            "data-[align=center]:[--ml:calc((100%_-_var(--anchor-width))_/_2)] data-[align=center]:[--mr:calc((100%_-_var(--anchor-width))_/_2)]",
            "[clip-path:inset(0_round_var(--radius-2xl))] transition-[clip-path,background-color,box-shadow,opacity] [transition-duration:450ms,450ms,450ms,180ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
            "data-starting-style:bg-secondary data-starting-style:opacity-0 data-starting-style:shadow-raised data-starting-style:[clip-path:inset(var(--mt)_var(--mr)_var(--mb)_var(--ml)_round_var(--morph-r0))]",
            "data-ending-style:bg-secondary data-ending-style:opacity-0 data-ending-style:shadow-raised data-ending-style:duration-300 data-ending-style:[clip-path:inset(var(--mt)_var(--mr)_var(--mb)_var(--ml)_round_var(--morph-r0))]",
            "motion-reduce:duration-150 motion-reduce:data-starting-style:[clip-path:inset(0_round_var(--radius-2xl))] motion-reduce:data-ending-style:[clip-path:inset(0_round_var(--radius-2xl))]",
            className
          )}
          {...props}
        >
          {/* content settles in once the surface has opened up */}
          <div
            data-slot="morph-popover-body"
            className="contents [&>*]:transition-[opacity,filter,translate] [&>*]:delay-100 [&>*]:duration-300 [&>*]:ease-[cubic-bezier(0.22,1,0.36,1)] group-data-ending-style/morph:[&>*]:opacity-0 group-data-ending-style/morph:[&>*]:delay-0 group-data-ending-style/morph:[&>*]:duration-150 group-data-starting-style/morph:[&>*]:translate-y-1 group-data-starting-style/morph:[&>*]:opacity-0 group-data-starting-style/morph:[&>*]:blur-[3px] motion-reduce:[&>*]:translate-0 motion-reduce:[&>*]:blur-none"
          >
            {children}
          </div>
        </PopoverPrimitive.Popup>
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
  )
}

function MorphPopoverHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="morph-popover-header" className={cn("flex flex-col gap-1 pr-8", className)} {...props} />
}

function MorphPopoverTitle({ className, ...props }: PopoverPrimitive.Title.Props) {
  return (
    <PopoverPrimitive.Title
      data-slot="morph-popover-title"
      className={cn("text-[0.95rem] leading-snug font-semibold tracking-tight", className)}
      {...props}
    />
  )
}

function MorphPopoverDescription({ className, ...props }: PopoverPrimitive.Description.Props) {
  return (
    <PopoverPrimitive.Description
      data-slot="morph-popover-description"
      className={cn("text-sm leading-relaxed text-muted-foreground", className)}
      {...props}
    />
  )
}

function MorphPopoverFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="morph-popover-footer" className={cn("flex items-center justify-end gap-2", className)} {...props} />
}

/** Plain close part; pass `render` to turn any element (e.g. a Button) into a close control. */
function MorphPopoverClose(props: PopoverPrimitive.Close.Props) {
  return <PopoverPrimitive.Close data-slot="morph-popover-close" {...props} />
}

/** Round × button pinned to the panel's top-right corner. */
function MorphPopoverCloseButton({ className, ...props }: PopoverPrimitive.Close.Props) {
  return (
    <PopoverPrimitive.Close
      data-slot="morph-popover-close-button"
      aria-label="Close"
      className={cn(
        "absolute top-3 right-3 inline-flex size-7 cursor-pointer items-center justify-center rounded-full text-muted-foreground transition-colors outline-none hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring",
        className
      )}
      {...props}
    >
      <XIcon size={14} />
    </PopoverPrimitive.Close>
  )
}

export {
  MorphPopover,
  MorphPopoverTrigger,
  MorphPopoverContent,
  MorphPopoverHeader,
  MorphPopoverTitle,
  MorphPopoverDescription,
  MorphPopoverFooter,
  MorphPopoverClose,
  MorphPopoverCloseButton,
}
