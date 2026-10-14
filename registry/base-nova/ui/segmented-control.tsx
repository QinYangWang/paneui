"use client"

import * as React from "react"
import { Radio as RadioPrimitive } from "@base-ui/react/radio"
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group"
import { LayoutGroup, motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

/*
 * Pick one of a few options in place: billing cycle, chart type, light / dark,
 * date range. Looks like TabsList (raised thumb on a well) but is a radio group,
 * because it changes a value rather than switching panels. Arrow keys move the
 * selection.
 *
 *   <SegmentedControl value={cycle} onValueChange={setCycle} aria-label="Billing cycle">
 *     <SegmentedControlItem value="monthly">Monthly</SegmentedControlItem>
 *     <SegmentedControlItem value="yearly">Yearly</SegmentedControlItem>
 *   </SegmentedControl>
 */

const SegmentedContext = React.createContext<{ id: string; size: "sm" | "default"; value: unknown; reduce: boolean } | null>(null)

type SegmentedControlProps = Omit<RadioGroupPrimitive.Props<string>, "onValueChange"> & {
  onValueChange?: (value: string) => void
  size?: "sm" | "default"
}

function SegmentedControl({ className, size = "default", value, defaultValue, onValueChange, ...props }: SegmentedControlProps) {
  const id = React.useId()
  const reduce = useReducedMotion() ?? false
  const [inner, setInner] = React.useState<unknown>(defaultValue)
  const current = value !== undefined ? value : inner
  return (
    <SegmentedContext.Provider value={{ id, size, value: current, reduce }}>
      <LayoutGroup id={id}>
        <RadioGroupPrimitive
          data-slot="segmented-control"
          data-size={size}
          value={value}
          defaultValue={defaultValue}
          onValueChange={(v) => {
            setInner(v)
            onValueChange?.(String(v))
          }}
          className={cn("relative inline-flex w-fit items-center gap-0.5 rounded-lg bg-muted p-0.5 shadow-well", className)}
          {...props}
        />
      </LayoutGroup>
    </SegmentedContext.Provider>
  )
}

function SegmentedControlItem({ className, children, value, ...props }: RadioPrimitive.Root.Props<string>) {
  const ctx = React.useContext(SegmentedContext)
  const selected = ctx?.value === value
  return (
    <RadioPrimitive.Root
      data-slot="segmented-control-item"
      value={value}
      className={cn(
        "relative inline-flex cursor-pointer items-center select-none justify-center gap-1.5 rounded-md font-medium whitespace-nowrap text-muted-foreground outline-none transition-colors duration-150 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50 data-checked:text-foreground data-disabled:pointer-events-none data-disabled:opacity-64 [&_svg]:size-3.5 [&_svg]:shrink-0",
        ctx?.size === "sm" ? "h-6 px-2.5 text-ui-sm" : "h-7 px-3 text-ui",
        className
      )}
      {...props}
    >
      {selected && (
        <motion.span
          aria-hidden
          layoutId={`${ctx?.id}-thumb`}
          transition={ctx?.reduce ? { duration: 0 } : { type: "spring", stiffness: 500, damping: 40, mass: 0.6 }}
          className="absolute inset-0 rounded-md bg-card shadow-raised"
        />
      )}
      <span className="relative inline-flex items-center gap-1.5">{children}</span>
    </RadioPrimitive.Root>
  )
}

export { SegmentedControl, SegmentedControlItem }
export type { SegmentedControlProps }
