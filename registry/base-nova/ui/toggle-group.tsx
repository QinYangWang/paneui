"use client"

import * as React from "react"
import { Toggle as TogglePrimitive } from "@base-ui/react/toggle"
import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Native toggles: a pressed state is a fill, never a press scale. Sizes follow the button
// density (h-8 default, sm h-7, xs h-6). For a one-of-many value with a raised thumb on a
// well, use SegmentedControl instead.
const toggleVariants = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-lg text-ui font-medium whitespace-nowrap text-muted-foreground transition-[background-color,color,box-shadow] duration-150 ease-out outline-none select-none hover:bg-secondary hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50 data-disabled:pointer-events-none data-disabled:opacity-64 data-pressed:text-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "data-pressed:bg-foreground/8 data-pressed:hover:bg-foreground/10",
        outline:
          "shadow-[inset_0_0_0_1px_var(--input)] data-pressed:bg-secondary data-pressed:shadow-[inset_0_0_0_1px_var(--input)]",
      },
      size: {
        default: "h-8 min-w-8 px-2.5",
        sm: "h-7 min-w-7 px-2 [&_svg:not([class*='size-'])]:size-3.5",
        xs: "h-6 min-w-6 rounded-sm px-1.5 text-ui-xs [&_svg:not([class*='size-'])]:size-3.5",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
)

type ToggleVariantProps = VariantProps<typeof toggleVariants>

/** A two-state button (bold on/off). `pressed` / `defaultPressed` / `onPressedChange`. */
function Toggle({ className, variant, size, ...props }: TogglePrimitive.Props & ToggleVariantProps) {
  return <TogglePrimitive data-slot="toggle" className={cn(toggleVariants({ variant, size }), className)} {...props} />
}

const ToggleGroupContext = React.createContext<ToggleVariantProps>({})

/**
 * A row of toggles sharing one value array (Base UI ToggleGroup). Single choice by
 * default (text alignment); `multiple` for independent marks (bold, italic).
 */
function ToggleGroup<Value extends string = string>({
  className,
  variant = "default",
  size = "default",
  children,
  ...props
}: ToggleGroupPrimitive.Props<Value> & ToggleVariantProps) {
  return (
    <ToggleGroupPrimitive
      data-slot="toggle-group"
      data-variant={variant}
      className={cn(
        "inline-flex w-fit items-center gap-0.5 data-[orientation=vertical]:flex-col",
        className
      )}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size }}>{children}</ToggleGroupContext.Provider>
    </ToggleGroupPrimitive>
  )
}

function ToggleGroupItem({ className, variant, size, ...props }: TogglePrimitive.Props & ToggleVariantProps) {
  const ctx = React.useContext(ToggleGroupContext)
  return (
    <TogglePrimitive
      data-slot="toggle-group-item"
      className={cn(toggleVariants({ variant: variant ?? ctx.variant, size: size ?? ctx.size }), className)}
      {...props}
    />
  )
}

export { Toggle, ToggleGroup, ToggleGroupItem, toggleVariants }
