"use client"

import * as React from "react"
import { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu"

import { cn } from "@/lib/utils"
import {
  MenuCheckboxItem,
  MenuGroup,
  MenuItem,
  MenuLabel,
  MenuRadioGroup,
  MenuRadioItem,
  MenuSeparator,
  MenuShortcut,
  MenuSub,
  MenuSubContent,
  MenuSubTrigger,
} from "@/registry/base-nova/ui/menu"

// Base UI's ContextMenu shares its item parts with Menu, so the styled items from
// menu.tsx are reused as-is and the two menus always look identical.
const ContextMenu = ContextMenuPrimitive.Root

function ContextMenuTrigger({ className, ...props }: ContextMenuPrimitive.Trigger.Props) {
  return (
    <ContextMenuPrimitive.Trigger
      data-slot="context-menu-trigger"
      className={cn("select-none [-webkit-touch-callout:none]", className)}
      {...props}
    />
  )
}

function ContextMenuContent({
  className,
  side,
  sideOffset = 4,
  align = "start",
  alignOffset = 4,
  ...props
}: ContextMenuPrimitive.Popup.Props &
  Pick<ContextMenuPrimitive.Positioner.Props, "side" | "sideOffset" | "align" | "alignOffset">) {
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Positioner
        className="z-50 outline-none"
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
      >
        <ContextMenuPrimitive.Popup
          data-slot="context-menu-content"
          className={cn(
            // Positioned against the pointer, so --transform-origin is the click point:
            // the menu grows out from exactly where the user right-clicked.
            "min-w-44 origin-(--transform-origin) rounded-xl bg-popover p-1 text-popover-foreground shadow-surface outline-none",
            "transition-[opacity,scale] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] data-ending-style:duration-120",
            "data-starting-style:scale-96 data-starting-style:opacity-0 data-ending-style:scale-98 data-ending-style:opacity-0",
            "motion-reduce:data-starting-style:scale-100",
            className
          )}
          {...props}
        />
      </ContextMenuPrimitive.Positioner>
    </ContextMenuPrimitive.Portal>
  )
}

const ContextMenuItem = MenuItem
const ContextMenuCheckboxItem = MenuCheckboxItem
const ContextMenuRadioGroup = MenuRadioGroup
const ContextMenuRadioItem = MenuRadioItem
const ContextMenuGroup = MenuGroup
const ContextMenuLabel = MenuLabel
const ContextMenuSeparator = MenuSeparator
const ContextMenuShortcut = MenuShortcut
const ContextMenuSub = MenuSub
const ContextMenuSubTrigger = MenuSubTrigger
const ContextMenuSubContent = MenuSubContent

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuGroup,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
}
