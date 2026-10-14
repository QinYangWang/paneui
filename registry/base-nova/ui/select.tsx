"use client"

import * as React from "react"
import { Select as SelectPrimitive } from "@base-ui/react/select"

import { CheckIcon, ChevronDownIcon, ChevronUpIcon, ChevronsUpDownIcon } from "@/components/icons"
import { cn } from "@/lib/utils"

const Select = SelectPrimitive.Root
const SelectGroup = SelectPrimitive.Group

function SelectValue({ className, ...props }: SelectPrimitive.Value.Props) {
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      className={cn("flex-1 truncate text-left data-placeholder:text-muted-foreground", className)}
      {...props}
    />
  )
}

function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: SelectPrimitive.Trigger.Props & { size?: "sm" | "default" }) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        "inline-flex w-full min-w-40 cursor-pointer items-center gap-2 rounded-lg bg-secondary pr-2.5 pl-3.5 text-sm font-medium shadow-raised transition-[box-shadow,background-color] duration-150 ease-out outline-none select-none hover:bg-accent hover:shadow-raised-hover focus-visible:ring-3 focus-visible:ring-ring data-disabled:pointer-events-none data-disabled:opacity-50 data-popup-open:bg-accent data-[size=default]:h-9 data-[size=sm]:h-8 [&_svg]:size-4 [&_svg]:shrink-0",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon className="text-muted-foreground">
        <ChevronsUpDownIcon />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({
  className,
  children,
  side = "bottom",
  sideOffset = 6,
  align = "center",
  alignItemWithTrigger = true,
  ...props
}: SelectPrimitive.Popup.Props &
  Pick<SelectPrimitive.Positioner.Props, "side" | "sideOffset" | "align" | "alignItemWithTrigger">) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        className="z-50 outline-none select-none"
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignItemWithTrigger={alignItemWithTrigger}
      >
        <SelectPrimitive.Popup
          data-slot="select-content"
          className={cn(
            "relative max-h-(--available-height) min-w-(--anchor-width) origin-(--transform-origin) overflow-hidden rounded-xl bg-popover text-popover-foreground shadow-surface transition-[opacity,scale] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] data-ending-style:scale-95 data-ending-style:opacity-0 data-[side=none]:data-ending-style:scale-100 data-starting-style:scale-95 data-starting-style:opacity-0 data-[side=none]:data-starting-style:scale-100",
            className
          )}
          {...props}
        >
          <SelectPrimitive.ScrollUpArrow className="top-0 z-10 flex h-6 w-full cursor-default items-center justify-center rounded-t-xl bg-popover text-muted-foreground">
            <ChevronUpIcon size={14} />
          </SelectPrimitive.ScrollUpArrow>
          <SelectPrimitive.List className="max-h-(--available-height) scroll-py-6 overflow-y-auto p-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">{children}</SelectPrimitive.List>
          <SelectPrimitive.ScrollDownArrow className="bottom-0 z-10 flex h-6 w-full cursor-default items-center justify-center rounded-b-xl bg-popover text-muted-foreground">
            <ChevronDownIcon size={14} />
          </SelectPrimitive.ScrollDownArrow>
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  )
}

function SelectItem({ className, children, ...props }: SelectPrimitive.Item.Props) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "relative flex h-8 cursor-default items-center gap-2 rounded-md pr-8 pl-2.5 text-sm outline-none select-none transition-colors duration-150 data-disabled:pointer-events-none data-disabled:opacity-50 data-highlighted:bg-accent [&_svg]:size-4 [&_svg]:shrink-0",
        className
      )}
      {...props}
    >
      <SelectPrimitive.ItemText className="flex flex-1 items-center gap-2 truncate">{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator className="absolute right-2.5 flex text-primary">
        <CheckIcon />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  )
}

function SelectLabel({ className, ...props }: SelectPrimitive.GroupLabel.Props) {
  return (
    <SelectPrimitive.GroupLabel
      data-slot="select-label"
      className={cn("px-2.5 pt-1.5 pb-1 text-xs font-medium text-muted-foreground", className)}
      {...props}
    />
  )
}

function SelectSeparator({ className, ...props }: SelectPrimitive.Separator.Props) {
  return <SelectPrimitive.Separator data-slot="select-separator" className={cn("mx-1.5 my-1.5 h-px bg-border", className)} {...props} />
}

export { Select, SelectGroup, SelectValue, SelectTrigger, SelectContent, SelectItem, SelectLabel, SelectSeparator }
