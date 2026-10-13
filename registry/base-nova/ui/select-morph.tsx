"use client"

import * as React from "react"
import { Select as SelectPrimitive } from "@base-ui/react/select"

import { CheckIcon, ChevronDownIcon } from "@/components/icons"
import { cn } from "@/lib/utils"

/*
 * A select whose trigger grows into the option list. The popup is laid over the
 * trigger (negative side offset) and starts clipped to the trigger's exact box,
 * then unclips to its full height, so the pill itself appears to unfold into
 * the menu and fold back on close. Its first row mirrors the trigger, which is
 * what makes the hand-off seamless. Built on Base UI Select, so keyboard
 * navigation, typeahead, focus and ARIA come for free.
 */

const MorphSelect = SelectPrimitive.Root
const MorphSelectGroup = SelectPrimitive.Group

/** Shared row geometry for the trigger and the popup's mirrored header. */
const ROW = "flex h-10 w-full items-center gap-2 pr-3 pl-4 text-sm font-medium [&_svg]:size-4 [&_svg]:shrink-0"

function MorphSelectValue({ className, ...props }: SelectPrimitive.Value.Props) {
  return (
    <SelectPrimitive.Value
      data-slot="morph-select-value"
      className={cn("flex-1 truncate text-left data-placeholder:text-muted-foreground", className)}
      {...props}
    />
  )
}

function MorphSelectTrigger({ className, children, ...props }: SelectPrimitive.Trigger.Props) {
  return (
    <SelectPrimitive.Trigger
      data-slot="morph-select-trigger"
      className={cn(
        ROW,
        "min-w-44 cursor-pointer rounded-2xl bg-secondary bg-linear-to-b from-white/5 to-transparent shadow-raised transition-[box-shadow,opacity] duration-200 outline-none select-none hover:shadow-raised-hover focus-visible:ring-3 focus-visible:ring-ring data-disabled:pointer-events-none data-disabled:opacity-50",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon className="flex text-muted-foreground">
        <ChevronDownIcon />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

function MorphSelectContent({
  className,
  children,
  header,
  ...props
}: SelectPrimitive.Popup.Props & {
  /** What the mirrored first row shows. Defaults to the current value; match it to your trigger's content. */
  header?: React.ReactNode
}) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        className="z-50 outline-none select-none"
        side="bottom"
        align="start"
        alignItemWithTrigger={false}
        // sit on top of the trigger so the popup can grow out of it
        sideOffset={({ anchor }) => -anchor.height}
        collisionPadding={8}
      >
        <SelectPrimitive.Popup
          data-slot="morph-select-content"
          className={cn(
            "group/morph flex w-(--anchor-width) flex-col overflow-hidden rounded-2xl bg-popover text-popover-foreground shadow-surface outline-none data-[side=top]:flex-col-reverse",
            "[--morph-closed:inset(0_0_calc(100%_-_var(--anchor-height))_0_round_var(--radius-2xl))] data-[side=top]:[--morph-closed:inset(calc(100%_-_var(--anchor-height))_0_0_0_round_var(--radius-2xl))]",
            "[clip-path:inset(0_round_var(--radius-2xl))] transition-[clip-path,background-color,box-shadow] duration-450 ease-[cubic-bezier(0.22,1,0.36,1)]",
            "data-starting-style:bg-secondary data-starting-style:shadow-raised data-starting-style:[clip-path:var(--morph-closed)]",
            "data-ending-style:bg-secondary data-ending-style:shadow-raised data-ending-style:duration-300 data-ending-style:[clip-path:var(--morph-closed)]",
            "motion-reduce:transition-opacity motion-reduce:data-starting-style:opacity-0 motion-reduce:data-starting-style:[clip-path:inset(0_round_var(--radius-2xl))] motion-reduce:data-ending-style:opacity-0 motion-reduce:data-ending-style:[clip-path:inset(0_round_var(--radius-2xl))]",
            className
          )}
          {...props}
        >
          {/* Mirrors the trigger row; clicks fall through to the trigger beneath, which closes the menu. */}
          <div aria-hidden className={cn(ROW, "pointer-events-none shrink-0")}>
            {header ?? <SelectPrimitive.Value className="flex-1 truncate text-left data-placeholder:text-muted-foreground" />}
            <ChevronDownIcon className="text-muted-foreground transition-transform duration-300 rotate-180 group-data-ending-style/morph:rotate-0 group-data-starting-style/morph:rotate-0" />
          </div>
          <div
            aria-hidden
            className="mx-3 h-px shrink-0 bg-border transition-opacity duration-300 group-data-ending-style/morph:opacity-0 group-data-starting-style/morph:opacity-0"
          />
          <SelectPrimitive.List
            className={cn(
              "max-h-[min(18rem,calc(var(--available-height)_-_var(--anchor-height)))] overflow-y-auto p-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
              "transition-[opacity,translate,filter] delay-75 duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
              "group-data-starting-style/morph:-translate-y-1.5 group-data-starting-style/morph:opacity-0 group-data-starting-style/morph:blur-[3px]",
              "group-data-ending-style/morph:opacity-0 group-data-ending-style/morph:blur-[2px] group-data-ending-style/morph:delay-0 group-data-ending-style/morph:duration-150",
              "motion-reduce:translate-0 motion-reduce:blur-none"
            )}
          >
            {children}
          </SelectPrimitive.List>
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  )
}

function MorphSelectItem({ className, children, ...props }: SelectPrimitive.Item.Props) {
  return (
    <SelectPrimitive.Item
      data-slot="morph-select-item"
      className={cn(
        "relative flex h-8.5 cursor-default items-center gap-2 rounded-xl pr-8 pl-2.5 text-sm outline-none select-none transition-[background-color,box-shadow] duration-150 data-disabled:pointer-events-none data-disabled:opacity-50 data-highlighted:bg-secondary data-highlighted:shadow-raised [&_svg]:size-4 [&_svg]:shrink-0",
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

function MorphSelectLabel({ className, ...props }: SelectPrimitive.GroupLabel.Props) {
  return (
    <SelectPrimitive.GroupLabel
      data-slot="morph-select-label"
      className={cn("px-2.5 pt-1.5 pb-1 text-xs font-medium text-muted-foreground", className)}
      {...props}
    />
  )
}

function MorphSelectSeparator({ className, ...props }: SelectPrimitive.Separator.Props) {
  return (
    <SelectPrimitive.Separator
      data-slot="morph-select-separator"
      className={cn("mx-1.5 my-1.5 h-px bg-border", className)}
      {...props}
    />
  )
}

export {
  MorphSelect,
  MorphSelectGroup,
  MorphSelectValue,
  MorphSelectTrigger,
  MorphSelectContent,
  MorphSelectItem,
  MorphSelectLabel,
  MorphSelectSeparator,
}
