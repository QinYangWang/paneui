import * as React from "react"
import { Button as ButtonPrimitive } from "@base-ui/react/button"

import { cn } from "@/lib/utils"

type ExpandingArrowButtonProps = ButtonPrimitive.Props & {
  /** Classes for the accent tile (e.g. a different background). */
  accentClassName?: string
  /** Classes for the label. */
  labelClassName?: string
}

// Trail chevrons fade out as they get further from the leading one.
const TRAIL = [0.16, 0.32, 0.54, 0.78, 1]

function DottedChevron({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 18 24" fill="currentColor" aria-hidden className={className} style={style}>
      <circle cx="4" cy="4" r="1.9" />
      <circle cx="9" cy="8" r="1.9" />
      <circle cx="14" cy="12" r="1.9" />
      <circle cx="9" cy="16" r="1.9" />
      <circle cx="4" cy="20" r="1.9" />
    </svg>
  )
}

const EASE = "ease-[cubic-bezier(0.22,1,0.36,1)]"
// Active on real hover (Tailwind's hover: is already gated to hover-capable devices), keyboard
// focus, or a tap (`data-swept`, set for one sweep after a touch or pen press).
const ACTIVE = "group-hover/arrow:opacity-100 group-focus-visible/arrow:opacity-100 group-data-swept/arrow:opacity-100"
// How long a tap holds the sweep: the 500ms tile plus the last chevron's delay and fade.
const TAP_SWEEP_MS = 900

/**
 * A raised pill with an accent tile at its start. On hover, keyboard focus or a tap the tile
 * sweeps across the whole button and turns into a trail of dotted chevrons.
 */
function ExpandingArrowButton({
  className,
  accentClassName,
  labelClassName,
  children,
  onClick,
  onPointerDown,
  ...props
}: ExpandingArrowButtonProps) {
  // Touch has no hover, so a tap plays the sweep once. It starts on click, not on press, so a
  // scroll that begins on the button never sets it off, and nothing sticks after the finger lifts.
  const [swept, setSwept] = React.useState(false)
  const pointerType = React.useRef("mouse")
  const timer = React.useRef<ReturnType<typeof setTimeout>>(undefined)
  React.useEffect(() => () => clearTimeout(timer.current), [])
  return (
    <ButtonPrimitive
      data-slot="expanding-arrow-button"
      data-swept={swept ? "" : undefined}
      onPointerDown={(event) => {
        pointerType.current = event.pointerType
        onPointerDown?.(event)
      }}
      onClick={(event) => {
        if (pointerType.current !== "mouse" && event.detail > 0) {
          clearTimeout(timer.current)
          setSwept(true)
          timer.current = setTimeout(() => setSwept(false), TAP_SWEEP_MS)
        }
        onClick?.(event)
      }}
      className={cn(
        "group/arrow relative inline-flex h-14 min-w-64 shrink-0 cursor-pointer items-center overflow-hidden frame-3xl frame-p-1.5 bg-card text-secondary-foreground shadow-raised outline-none select-none",
        "transition-[box-shadow,background-color,scale] duration-150 ease-out hover:bg-accent hover:shadow-raised-hover focus-visible:ring-2 focus-visible:ring-ring/50 active:scale-96",
        "disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...props}
    >
      <span
        aria-hidden
        className={cn(
          "absolute inset-y-1.5 left-1.5 z-10 w-11 overflow-hidden rounded-inner bg-primary text-primary-foreground",
          // Flat primary tile with the primary hairline token. Inset (56 - 44) / 2 =
          // 6px on every side, radius 20 - 6 = 14px, concentric with the button.
          "shadow-primary",
          "transition-[width] duration-500 motion-reduce:duration-0",
          EASE,
          "group-hover/arrow:w-[calc(100%-0.75rem)] group-focus-visible/arrow:w-[calc(100%-0.75rem)] group-data-swept/arrow:w-[calc(100%-0.75rem)]",
          accentClassName
        )}
      >
        {/* Resting glyph, pinned to the tile's start. */}
        <span className="absolute inset-y-0 left-0 grid w-11 place-items-center transition-opacity duration-150 group-hover/arrow:opacity-0 group-focus-visible/arrow:opacity-0 group-data-swept/arrow:opacity-0">
          <DottedChevron className="h-6 w-4.5" />
        </span>
        {/* Trail, revealed as the tile widens. */}
        <span className="absolute inset-0 flex items-center justify-around px-4">
          {TRAIL.map((opacity, i) => (
            <span
              key={i}
              className={cn(
                "-translate-x-1.5 opacity-0 transition-[opacity,translate] duration-300 group-hover/arrow:translate-x-0 group-hover/arrow:delay-(--d) group-focus-visible/arrow:delay-(--d) group-focus-visible/arrow:translate-x-0 group-data-swept/arrow:translate-x-0 group-data-swept/arrow:delay-(--d) motion-reduce:translate-x-0",
                EASE,
                ACTIVE
              )}
              style={{ "--d": `${80 + i * 35}ms` } as React.CSSProperties}
            >
              <DottedChevron className="h-6 w-4.5" style={{ opacity }} />
            </span>
          ))}
        </span>
      </span>
      <span
        className={cn(
          "relative ml-15 mr-5 text-base font-medium whitespace-nowrap transition-[opacity,translate] duration-200 group-hover/arrow:translate-x-2 group-hover/arrow:opacity-0 group-focus-visible/arrow:translate-x-2 group-focus-visible/arrow:opacity-0 group-data-swept/arrow:translate-x-2 group-data-swept/arrow:opacity-0 motion-reduce:translate-x-0",
          EASE,
          labelClassName
        )}
      >
        {children}
      </span>
    </ButtonPrimitive>
  )
}

export { ExpandingArrowButton, type ExpandingArrowButtonProps }
