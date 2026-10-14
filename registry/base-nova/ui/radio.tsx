"use client"

import * as React from "react"
import { Radio as RadioPrimitive } from "@base-ui/react/radio"
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group"
import { LayoutGroup, motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

const RadioGroupContext = React.createContext<string | null>(null)

/** Groups radios; the selected dot glides from one radio to the next. */
function RadioGroup<Value>({ className, ...props }: RadioGroupPrimitive.Props<Value>) {
  const id = React.useId()
  return (
    <RadioGroupContext.Provider value={id}>
      <LayoutGroup id={id}>
        <RadioGroupPrimitive
          data-slot="radio-group"
          className={cn("flex flex-col gap-3", className)}
          {...props}
        />
      </LayoutGroup>
    </RadioGroupContext.Provider>
  )
}

function Radio<Value>({ className, ...props }: RadioPrimitive.Root.Props<Value>) {
  const groupId = React.useContext(RadioGroupContext)
  const reduce = useReducedMotion()

  return (
    <RadioPrimitive.Root
      data-slot="radio"
      className={cn(
        "peer group/radio relative inline-flex size-4 shrink-0 cursor-pointer items-center justify-center rounded-full bg-background shadow-well outline-none dark:bg-input/32",
                "focus-visible:ring-2 focus-visible:ring-ring/50 data-invalid:shadow-[inset_0_0_0_1px_var(--destructive)] data-disabled:cursor-not-allowed data-disabled:opacity-64",
        className
      )}
      {...props}
    >
      <RadioPrimitive.Indicator data-slot="radio-indicator" className="flex items-center justify-center">
        <motion.span
          layoutId={groupId ? `${groupId}-dot` : undefined}
          initial={groupId ? false : { scale: 0 }}
          animate={{ scale: 1 }}
          transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 32, mass: 0.6 }}
          className="block size-2 rounded-full bg-primary"
        />
      </RadioPrimitive.Indicator>
    </RadioPrimitive.Root>
  )
}

export { RadioGroup, Radio }
