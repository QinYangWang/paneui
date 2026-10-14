"use client"

import * as React from "react"
import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox"

import { CheckIcon, ChevronsUpDownIcon, SearchIcon, XIcon } from "@/components/icons"
import { cn } from "@/lib/utils"

const Combobox = ComboboxPrimitive.Root
const ComboboxValue = ComboboxPrimitive.Value
const ComboboxCollection = ComboboxPrimitive.Collection
const useComboboxFilter = ComboboxPrimitive.useFilter

/**
 * Searchable input in an inset pill well. Typing filters the list; the chevron
 * opens it, and a clear button appears once something is chosen.
 */
function ComboboxInput({
  className,
  showSearchIcon = true,
  showClear = true,
  showTrigger = true,
  size = "default",
  ...props
}: Omit<ComboboxPrimitive.Input.Props, "size"> & {
  showSearchIcon?: boolean
  showClear?: boolean
  showTrigger?: boolean
  size?: "sm" | "default"
}) {
  return (
    <ComboboxPrimitive.InputGroup
      data-slot="combobox-input-group"
      data-size={size}
      className={cn(
        "group/combobox relative flex w-full min-w-48 items-center gap-1.5 rounded-lg bg-muted/60 pr-1.5 pl-3.5 shadow-well transition-[box-shadow,background-color] focus-within:bg-background focus-within:ring-3 focus-within:ring-ring data-disabled:pointer-events-none data-disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8",
        className
      )}
    >
      {showSearchIcon && <SearchIcon size={16} className="shrink-0 text-muted-foreground" />}
      <ComboboxPrimitive.Input
        data-slot="combobox-input"
        className="h-full min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground md:text-sm"
        {...props}
      />
      {showClear && (
        <ComboboxPrimitive.Clear
          data-slot="combobox-clear"
          aria-label="Clear selection"
          className="flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-[color,background-color,opacity,scale] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] outline-none hover:bg-secondary hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring data-ending-style:scale-75 data-ending-style:opacity-0 data-starting-style:scale-75 data-starting-style:opacity-0"
        >
          <XIcon size={14} />
        </ComboboxPrimitive.Clear>
      )}
      {showTrigger && (
        <ComboboxPrimitive.Trigger
          data-slot="combobox-trigger"
          aria-label="Show options"
          className="flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors outline-none hover:bg-secondary hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring"
        >
          <ChevronsUpDownIcon size={16} />
        </ComboboxPrimitive.Trigger>
      )}
    </ComboboxPrimitive.InputGroup>
  )
}

/**
 * Raised button that shows the chosen value, like SelectTrigger. Pair it
 * with <ComboboxSearch /> inside the popup for the "search in popup" pattern.
 */
function ComboboxTrigger({
  className,
  size = "default",
  children,
  ...props
}: ComboboxPrimitive.Trigger.Props & { size?: "sm" | "default" }) {
  return (
    <ComboboxPrimitive.Trigger
      data-slot="combobox-trigger"
      data-size={size}
      className={cn(
        "inline-flex w-full min-w-40 cursor-pointer items-center gap-2 rounded-lg bg-secondary pr-2.5 pl-3 text-sm font-medium shadow-raised transition-[box-shadow,background-color] duration-150 ease-out outline-none select-none hover:bg-accent hover:shadow-raised-hover focus-visible:ring-3 focus-visible:ring-ring data-disabled:pointer-events-none data-disabled:opacity-50 data-popup-open:bg-accent data-[size=default]:h-9 data-[size=sm]:h-8 [&_svg]:size-4 [&_svg]:shrink-0",
        className
      )}
      {...props}
    >
      <span className="flex-1 truncate text-left data-placeholder:text-muted-foreground">{children}</span>
      <ChevronsUpDownIcon className="text-muted-foreground" />
    </ComboboxPrimitive.Trigger>
  )
}

/** Search field rendered inside the popup (use with ComboboxTrigger). */
function ComboboxSearch({ className, ...props }: ComboboxPrimitive.Input.Props) {
  return (
    <div data-slot="combobox-search" className="p-1.5 pb-0">
      <div className="flex h-8 items-center gap-2 rounded-xl bg-muted/60 px-2.5 shadow-well focus-within:bg-background">
        <SearchIcon size={15} className="shrink-0 text-muted-foreground" />
        <ComboboxPrimitive.Input
          className={cn(
            "h-full min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground",
            className
          )}
          {...props}
        />
      </div>
    </div>
  )
}

function ComboboxContent({
  className,
  children,
  side = "bottom",
  sideOffset = 6,
  align = "start",
  anchor,
  ...props
}: ComboboxPrimitive.Popup.Props &
  Pick<ComboboxPrimitive.Positioner.Props, "side" | "sideOffset" | "align" | "anchor">) {
  return (
    <ComboboxPrimitive.Portal>
      <ComboboxPrimitive.Positioner
        className="z-50 outline-none"
        side={side}
        sideOffset={sideOffset}
        align={align}
        anchor={anchor}
      >
        <ComboboxPrimitive.Popup
          data-slot="combobox-content"
          className={cn(
            "relative flex max-h-[min(var(--available-height),22rem)] w-(--anchor-width) min-w-48 origin-(--transform-origin) flex-col overflow-hidden rounded-2xl bg-popover text-popover-foreground shadow-surface transition-[opacity,scale] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0",
            className
          )}
          {...props}
        >
          {children}
        </ComboboxPrimitive.Popup>
      </ComboboxPrimitive.Positioner>
    </ComboboxPrimitive.Portal>
  )
}

function ComboboxList({ className, ...props }: ComboboxPrimitive.List.Props) {
  return (
    <ComboboxPrimitive.List
      data-slot="combobox-list"
      className={cn(
        "min-h-0 flex-1 scroll-py-1.5 overflow-y-auto overscroll-contain p-1.5 [scrollbar-width:none] data-empty:p-0 [&::-webkit-scrollbar]:hidden",
        className
      )}
      {...props}
    />
  )
}

function ComboboxItem({ className, children, ...props }: ComboboxPrimitive.Item.Props) {
  return (
    <ComboboxPrimitive.Item
      data-slot="combobox-item"
      className={cn(
        "relative flex h-8 cursor-default items-center gap-2 rounded-xl pr-8 pl-2.5 text-sm outline-none select-none transition-[background-color,box-shadow] duration-150 data-disabled:pointer-events-none data-disabled:opacity-50 data-highlighted:bg-secondary data-highlighted:shadow-raised [&_svg]:size-4 [&_svg]:shrink-0",
        className
      )}
      {...props}
    >
      <span className="flex flex-1 items-center gap-2 truncate">{children}</span>
      <ComboboxPrimitive.ItemIndicator className="absolute right-2.5 flex text-primary">
        <CheckIcon />
      </ComboboxPrimitive.ItemIndicator>
    </ComboboxPrimitive.Item>
  )
}

function ComboboxGroup({ className, ...props }: ComboboxPrimitive.Group.Props) {
  return <ComboboxPrimitive.Group data-slot="combobox-group" className={cn("py-0.5", className)} {...props} />
}

function ComboboxLabel({ className, ...props }: ComboboxPrimitive.GroupLabel.Props) {
  return (
    <ComboboxPrimitive.GroupLabel
      data-slot="combobox-label"
      className={cn("px-2.5 pt-1.5 pb-1 text-xs font-medium text-muted-foreground", className)}
      {...props}
    />
  )
}

function ComboboxSeparator({ className, ...props }: ComboboxPrimitive.Separator.Props) {
  return (
    <ComboboxPrimitive.Separator
      data-slot="combobox-separator"
      className={cn("mx-1.5 my-1.5 h-px bg-border", className)}
      {...props}
    />
  )
}

/** Shown only when the filter leaves nothing to pick. */
function ComboboxEmpty({ className, ...props }: ComboboxPrimitive.Empty.Props) {
  return (
    <ComboboxPrimitive.Empty
      data-slot="combobox-empty"
      className={cn("px-3 py-6 text-center text-sm text-muted-foreground empty:m-0 empty:p-0", className)}
      {...props}
    />
  )
}

export {
  Combobox,
  ComboboxValue,
  ComboboxInput,
  ComboboxTrigger,
  ComboboxSearch,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxGroup,
  ComboboxLabel,
  ComboboxSeparator,
  ComboboxEmpty,
  ComboboxCollection,
  useComboboxFilter,
}
