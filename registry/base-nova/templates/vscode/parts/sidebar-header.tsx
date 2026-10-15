"use client"

import * as React from "react"

import { Button } from "@/registry/base-nova/ui/button"
import { Tooltip, TooltipContent, TooltipKbd, TooltipTrigger } from "@/registry/base-nova/ui/tooltip"

/** Title row of a sidebar view, with its actions on the right. */
export function SidebarHeader({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <div className="flex h-9 shrink-0 items-center gap-0.5 pr-1.5 pl-3">
      <h2 className="min-w-0 flex-1 truncate text-ui-sm font-semibold text-muted-foreground">{title}</h2>
      {children}
    </div>
  )
}

/** Small icon button with a tooltip, for view headers and panel toolbars. */
export function IconAction({
  label,
  shortcut,
  onClick,
  pressed,
  disabled,
  size = "icon-xs",
  children,
}: {
  label: string
  shortcut?: string
  onClick?: () => void
  pressed?: boolean
  disabled?: boolean
  size?: "icon-xs" | "icon-sm" | "icon"
  children: React.ReactNode
}) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            variant="ghost"
            size={size}
            aria-label={label}
            aria-pressed={pressed}
            disabled={disabled}
            onClick={onClick}
            className={pressed ? "text-foreground" : "text-muted-foreground"}
          >
            {children}
          </Button>
        }
      />
      <TooltipContent side="bottom">
        {label}
        {shortcut && <TooltipKbd>{shortcut}</TooltipKbd>}
      </TooltipContent>
    </Tooltip>
  )
}
