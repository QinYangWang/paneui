"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/registry/base-nova/ui/button"
import { Magnetic, type MagneticProps } from "@/registry/base-nova/ui/magnetic"

type MagneticButtonProps = React.ComponentProps<typeof Button> & {
  /** Fraction of the cursor offset the button follows. */
  strength?: number
  /** Pull zone around the button, in px. */
  range?: number
  /** Extra lean applied to the label on top of the button's own pull, for depth. */
  labelStrength?: number
  /** Class for the outer magnetic wrapper (layout, margins). */
  wrapperClassName?: string
  spring?: MagneticProps["spring"]
}

/** Our Button, pulled toward the cursor; the label leans a little further for a layered feel. */
function MagneticButton({
  strength = 0.3,
  range = 28,
  labelStrength = 0.12,
  wrapperClassName,
  spring,
  disabled,
  children,
  className,
  ...props
}: MagneticButtonProps) {
  return (
    <Magnetic
      strength={strength}
      range={range}
      spring={spring}
      disabled={disabled}
      className={wrapperClassName}
    >
      <Button
        data-slot="button-magnetic"
        disabled={disabled}
        className={cn(className)}
        {...props}
      >
        <Magnetic
          strength={labelStrength}
          range={range}
          disabled={disabled || labelStrength === 0}
          className="pointer-events-none items-center"
        >
          <span className="inline-flex items-center gap-1.5">{children}</span>
        </Magnetic>
      </Button>
    </Magnetic>
  )
}

export { MagneticButton, type MagneticButtonProps }
