"use client"

import * as React from "react"
import { Radio as RadioPrimitive } from "@base-ui/react/radio"
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group"
import { LayoutGroup, motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

type ColorSelectorSize = "sm" | "default" | "lg"

const ColorSelectorContext = React.createContext<{ value: string | undefined; size: ColorSelectorSize }>({
  value: undefined,
  size: "default",
})

const RING_SPRING = { type: "spring", stiffness: 420, damping: 32, mass: 0.6 } as const

/**
 * A radio group of colour swatches. Arrow keys move the choice; the selection
 * ring glides between swatches. Give it an aria-label (or wrap it in a Field).
 */
function ColorSelector({
  className,
  value: valueProp,
  defaultValue,
  onValueChange,
  size = "default",
  ...props
}: Omit<RadioGroupPrimitive.Props<string>, "value" | "defaultValue"> & {
  value?: string
  defaultValue?: string
  size?: ColorSelectorSize
}) {
  const id = React.useId()
  const [internal, setInternal] = React.useState(defaultValue)
  const value = valueProp ?? internal

  return (
    <ColorSelectorContext.Provider value={{ value, size }}>
      <LayoutGroup id={id}>
        <RadioGroupPrimitive<string>
          data-slot="color-selector"
          data-size={size}
          value={value}
          onValueChange={(next, details) => {
            if (valueProp === undefined) setInternal(next)
            onValueChange?.(next, details)
          }}
          className={cn(
            "flex flex-wrap items-center data-[size=default]:gap-2.5 data-[size=lg]:gap-3 data-[size=sm]:gap-2 data-disabled:opacity-50",
            className
          )}
          {...props}
        />
      </LayoutGroup>
    </ColorSelectorContext.Provider>
  )
}

/** One swatch. `color` is any CSS colour; `label` names it for screen readers and the tooltip. */
function ColorSwatch({
  className,
  value,
  color,
  label,
  style,
  ...props
}: Omit<RadioPrimitive.Root.Props<string>, "value" | "color"> & {
  value: string
  color?: string
  label?: string
}) {
  const { value: selected, size } = React.useContext(ColorSelectorContext)
  const reduce = useReducedMotion()
  const checked = selected === value

  return (
    <RadioPrimitive.Root
      data-slot="color-swatch"
      data-size={size}
      value={value}
      aria-label={label ?? value}
      title={label ?? value}
      className={cn(
        "group/swatch relative flex shrink-0 cursor-pointer items-center justify-center rounded-full outline-none data-disabled:cursor-not-allowed data-[size=default]:size-7 data-[size=lg]:size-9 data-[size=sm]:size-5",
        className
      )}
      style={style}
      {...props}
    >
      <span
        aria-hidden
        className="absolute inset-0 rounded-full shadow-[inset_0_0_0_1px_color-mix(in_oklch,var(--foreground)_12%,transparent)] transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/swatch:scale-105 group-active/swatch:scale-95 group-data-checked/swatch:scale-[0.8]"
        style={{ backgroundColor: color ?? value }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-1 rounded-full ring-0 ring-ring transition-[box-shadow] group-focus-visible/swatch:ring-3"
      />
      {checked && (
        <motion.span
          aria-hidden
          layoutId="color-selector-ring"
          transition={reduce ? { duration: 0 } : RING_SPRING}
          className="pointer-events-none absolute inset-0 rounded-full border-2 border-foreground/85"
        />
      )}
    </RadioPrimitive.Root>
  )
}

export { ColorSelector, ColorSwatch }
