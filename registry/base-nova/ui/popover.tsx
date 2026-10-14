"use client"

import * as React from "react"
import { Popover as PopoverPrimitive } from "@base-ui/react/popover"

import { XIcon } from "@/components/icons"
import { cn } from "@/lib/utils"

const Popover = PopoverPrimitive.Root
const PopoverTrigger = PopoverPrimitive.Trigger

function PopoverContent({
  className,
  side = "bottom",
  sideOffset = 8,
  align = "center",
  alignOffset = 0,
  collisionPadding = 8,
  ...props
}: PopoverPrimitive.Popup.Props &
  Pick<PopoverPrimitive.Positioner.Props, "side" | "sideOffset" | "align" | "alignOffset" | "collisionPadding">) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Positioner
        className="z-50 outline-none"
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        collisionPadding={collisionPadding}
      >
        <PopoverPrimitive.Popup
          data-slot="popover-content"
          className={cn(
            "relative flex w-72 max-w-[calc(100vw-1rem)] origin-(--transform-origin) flex-col gap-3 rounded-2xl bg-popover p-4 text-sm text-popover-foreground shadow-surface outline-none",
            "transition-[opacity,scale,translate] duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] data-ending-style:duration-150",
            "data-starting-style:scale-90 data-starting-style:opacity-0 data-ending-style:scale-95 data-ending-style:opacity-0",
            "data-[side=bottom]:data-starting-style:-translate-y-1 data-[side=top]:data-starting-style:translate-y-1 data-[side=left]:data-starting-style:translate-x-1 data-[side=right]:data-starting-style:-translate-x-1",
            "motion-reduce:data-starting-style:scale-100 motion-reduce:data-starting-style:translate-0",
            className
          )}
          {...props}
        />
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
  )
}

function PopoverHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="popover-header" className={cn("flex flex-col gap-1", className)} {...props} />
}

function PopoverTitle({ className, ...props }: PopoverPrimitive.Title.Props) {
  return (
    <PopoverPrimitive.Title
      data-slot="popover-title"
      className={cn("text-[0.95rem] leading-snug font-semibold tracking-tight", className)}
      {...props}
    />
  )
}

function PopoverDescription({ className, ...props }: PopoverPrimitive.Description.Props) {
  return (
    <PopoverPrimitive.Description
      data-slot="popover-description"
      className={cn("text-sm leading-relaxed text-muted-foreground", className)}
      {...props}
    />
  )
}

function PopoverFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="popover-footer" className={cn("flex items-center justify-end gap-2", className)} {...props} />
}

/** Plain close part; pass `render` to turn any element (e.g. a Button) into a close control. */
function PopoverClose({ className, ...props }: PopoverPrimitive.Close.Props) {
  return <PopoverPrimitive.Close data-slot="popover-close" className={className} {...props} />
}

/** Round × button pinned to the popover's top-right corner. */
function PopoverCloseButton({ className, ...props }: PopoverPrimitive.Close.Props) {
  return (
    <PopoverPrimitive.Close
      data-slot="popover-close-button"
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
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
  PopoverFooter,
  PopoverClose,
  PopoverCloseButton,
}
