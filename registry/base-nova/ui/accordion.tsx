"use client"

import * as React from "react"
import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion"

import { ChevronDownIcon } from "@/components/icons"
import { cn } from "@/lib/utils"

// Underdamped spring sampled into CSS linear(): ~8% overshoot, settles in ~600ms.
const SPRING =
  "ease-[linear(0,0.073,0.242,0.444,0.64,0.805,0.929,1.013,1.061,1.081,1.082,1.072,1.056,1.039,1.024,1.011,1.002,0.997,0.994,0.993,1)]"

/**
 * Inset well holding raised rows. Single-open by default; pass `multiple`
 * to let several items stay open.
 */
function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("flex w-full flex-col gap-1 rounded-[1.25rem] bg-muted/60 p-1 shadow-well", className)}
      {...props}
    />
  )
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(
        "rounded-2xl transition-[background-color,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] data-open:bg-card data-open:bg-linear-to-b data-open:from-white/6 data-open:to-transparent data-open:shadow-raised",
        className
      )}
      {...props}
    />
  )
}

/** Trigger row with an optional leading icon chip and a springy chevron. */
function AccordionTrigger({
  className,
  children,
  icon,
  ...props
}: AccordionPrimitive.Trigger.Props & { icon?: React.ReactNode }) {
  return (
    <AccordionPrimitive.Header data-slot="accordion-header" className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/accordion-trigger flex min-h-11 flex-1 cursor-pointer items-center gap-3 rounded-2xl px-3 py-2 text-left text-sm font-medium text-foreground transition-[background-color] duration-150 outline-none select-none hover:not-data-panel-open:bg-card/50 focus-visible:ring-3 focus-visible:ring-ring data-disabled:pointer-events-none data-disabled:opacity-50",
          className
        )}
        {...props}
      >
        {icon && (
          <span
            data-slot="accordion-icon"
            aria-hidden
            className="flex size-7 shrink-0 items-center justify-center rounded-full bg-secondary bg-linear-to-b from-white/6 to-transparent text-muted-foreground shadow-raised transition-colors duration-200 group-data-panel-open/accordion-trigger:text-primary [&_svg]:size-4"
          >
            {icon}
          </span>
        )}
        <span className="min-w-0 flex-1">{children}</span>
        <ChevronDownIcon
          aria-hidden
          className={cn(
            "size-4 shrink-0 text-muted-foreground transition-transform duration-500 group-data-panel-open/accordion-trigger:rotate-180 group-data-panel-open/accordion-trigger:text-foreground motion-reduce:transition-none",
            SPRING
          )}
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

/** Panel with a springy height reveal (eases out without bounce on close). */
function AccordionPanel({ className, children, ...props }: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-panel"
      className={cn(
        "group/accordion-panel h-(--accordion-panel-height) overflow-hidden transition-[height] duration-600 data-ending-style:h-0 data-ending-style:duration-300 data-ending-style:ease-[cubic-bezier(0.22,1,0.36,1)] data-starting-style:h-0 motion-reduce:transition-none",
        SPRING
      )}
      {...props}
    >
      <div
        data-slot="accordion-content"
        className={cn(
          "px-3 pb-3 text-[0.8rem] leading-5 text-muted-foreground transition-[opacity,translate] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-data-ending-style/accordion-panel:-translate-y-1.5 group-data-ending-style/accordion-panel:opacity-0 group-data-starting-style/accordion-panel:-translate-y-1.5 group-data-starting-style/accordion-panel:opacity-0 motion-reduce:transition-none",
          className
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Panel>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionPanel }
