"use client"

import * as React from "react"
import { Menu as MenuPrimitive } from "@base-ui/react/menu"

import { CheckIcon, ChevronRightIcon } from "@/components/icons"
import { cn } from "@/lib/utils"

const Menu = MenuPrimitive.Root
const MenuTrigger = MenuPrimitive.Trigger
const MenuGroup = MenuPrimitive.Group
const MenuRadioGroup = MenuPrimitive.RadioGroup
const MenuSub = MenuPrimitive.SubmenuRoot

const popupClass =
  "min-w-48 origin-(--transform-origin) rounded-2xl bg-popover p-1.5 text-popover-foreground shadow-surface outline-none transition-[opacity,scale] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0"

const itemClass =
  "relative flex h-8 cursor-default items-center gap-2 rounded-xl px-2.5 text-sm outline-none select-none transition-[background-color,box-shadow] duration-150 data-disabled:pointer-events-none data-disabled:opacity-50 data-highlighted:bg-secondary data-highlighted:shadow-raised [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-muted-foreground data-highlighted:[&_svg]:text-foreground"

function MenuContent({
  className,
  side = "bottom",
  sideOffset = 6,
  align = "start",
  alignOffset = 0,
  ...props
}: MenuPrimitive.Popup.Props &
  Pick<MenuPrimitive.Positioner.Props, "side" | "sideOffset" | "align" | "alignOffset">) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Positioner
        className="z-50 outline-none"
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
      >
        <MenuPrimitive.Popup data-slot="menu-content" className={cn(popupClass, className)} {...props} />
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  )
}

function MenuItem({
  className,
  variant = "default",
  inset,
  ...props
}: MenuPrimitive.Item.Props & { variant?: "default" | "destructive"; inset?: boolean }) {
  return (
    <MenuPrimitive.Item
      data-slot="menu-item"
      data-variant={variant}
      className={cn(
        itemClass,
        inset && "pl-8",
        "data-[variant=destructive]:text-destructive data-[variant=destructive]:[&_svg]:text-destructive/80 data-[variant=destructive]:data-highlighted:bg-destructive/12 data-[variant=destructive]:data-highlighted:shadow-none",
        className
      )}
      {...props}
    />
  )
}

function MenuCheckboxItem({ className, children, ...props }: MenuPrimitive.CheckboxItem.Props) {
  return (
    <MenuPrimitive.CheckboxItem data-slot="menu-checkbox-item" className={cn(itemClass, "pl-8", className)} {...props}>
      <span className="absolute left-2.5 flex size-4 items-center justify-center">
        <MenuPrimitive.CheckboxItemIndicator className="transition-[opacity,scale] duration-150 data-ending-style:scale-50 data-ending-style:opacity-0 data-starting-style:scale-50 data-starting-style:opacity-0">
          <CheckIcon className="!text-primary" />
        </MenuPrimitive.CheckboxItemIndicator>
      </span>
      {children}
    </MenuPrimitive.CheckboxItem>
  )
}

function MenuRadioItem({ className, children, ...props }: MenuPrimitive.RadioItem.Props) {
  return (
    <MenuPrimitive.RadioItem data-slot="menu-radio-item" className={cn(itemClass, "pl-8", className)} {...props}>
      <span className="absolute left-2.5 flex size-4 items-center justify-center">
        <MenuPrimitive.RadioItemIndicator className="size-2 rounded-full bg-primary shadow-[0_0_0_3px_color-mix(in_oklab,var(--primary)_22%,transparent)] transition-[opacity,scale] duration-150 data-ending-style:scale-0 data-starting-style:scale-0" />
      </span>
      {children}
    </MenuPrimitive.RadioItem>
  )
}

function MenuLabel({ className, inset, ...props }: MenuPrimitive.GroupLabel.Props & { inset?: boolean }) {
  return (
    <MenuPrimitive.GroupLabel
      data-slot="menu-label"
      className={cn("px-2.5 pt-1.5 pb-1 text-xs font-medium text-muted-foreground", inset && "pl-8", className)}
      {...props}
    />
  )
}

function MenuSeparator({ className, ...props }: React.ComponentProps<typeof MenuPrimitive.Separator>) {
  return (
    <MenuPrimitive.Separator data-slot="menu-separator" className={cn("mx-1.5 my-1.5 h-px bg-border", className)} {...props} />
  )
}

function MenuShortcut({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="menu-shortcut"
      className={cn("ml-auto pl-4 font-mono text-[11px] tracking-wider text-muted-foreground", className)}
      {...props}
    />
  )
}

function MenuSubTrigger({ className, children, ...props }: MenuPrimitive.SubmenuTrigger.Props) {
  return (
    <MenuPrimitive.SubmenuTrigger
      data-slot="menu-sub-trigger"
      className={cn(itemClass, "data-popup-open:bg-secondary data-popup-open:shadow-raised", className)}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto" />
    </MenuPrimitive.SubmenuTrigger>
  )
}

function MenuSubContent(props: React.ComponentProps<typeof MenuContent>) {
  return <MenuContent side="right" align="start" sideOffset={4} alignOffset={-6} {...props} />
}

export {
  Menu,
  MenuTrigger,
  MenuContent,
  MenuItem,
  MenuCheckboxItem,
  MenuRadioGroup,
  MenuRadioItem,
  MenuGroup,
  MenuLabel,
  MenuSeparator,
  MenuShortcut,
  MenuSub,
  MenuSubTrigger,
  MenuSubContent,
}
