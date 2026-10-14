"use client"

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox"

import { cn } from "@/lib/utils"

/**
 * Checkbox in an inset well. Checking fills it primary and draws the check on
 * stroke by stroke; `indeterminate` swaps in a dash. Presses squish on a spring.
 */
function Checkbox({ className, ...props }: CheckboxPrimitive.Root.Props) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer group/checkbox relative inline-flex size-[18px] shrink-0 cursor-pointer items-center justify-center rounded-[6px] bg-muted text-primary-foreground shadow-well outline-none",
        "transition-[background-color,box-shadow,scale] duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] active:scale-[0.86] motion-reduce:transition-none motion-reduce:active:scale-100",
        "focus-visible:ring-3 focus-visible:ring-ring",
        "data-checked:bg-primary data-checked:shadow-primary data-indeterminate:bg-primary data-indeterminate:shadow-primary",
        "data-invalid:shadow-[inset_0_0_0_1px_var(--destructive)] data-disabled:cursor-not-allowed data-disabled:opacity-50",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        keepMounted
        data-slot="checkbox-indicator"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <svg viewBox="0 0 18 18" fill="none" aria-hidden className="size-[18px]">
          {/* Same path and round caps/joins as CheckIcon; heavier stroke for the filled box. Dash offset 1 → 0 draws it on; retracts quickly on uncheck. */}
          <path
            d="M4.4 9.6l3 3 6.2-6.4"
            pathLength={1}
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="[stroke-dasharray:1] [stroke-dashoffset:1] transition-[stroke-dashoffset] duration-150 ease-out group-data-checked/checkbox:[stroke-dashoffset:0] group-data-checked/checkbox:delay-75 group-data-checked/checkbox:duration-300 group-data-checked/checkbox:ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
          />
          {/* Indeterminate dash grows out from the centre. */}
          <path
            d="M5.25 9h7.5"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            className="origin-center scale-x-0 opacity-0 transition-[scale,opacity] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] [transform-box:fill-box] group-data-indeterminate/checkbox:scale-x-100 group-data-indeterminate/checkbox:opacity-100 motion-reduce:transition-none"
          />
        </svg>
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
