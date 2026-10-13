"use client"

import * as React from "react"
import { Slider as SliderPrimitive } from "@base-ui/react/slider"
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react"

import { cn } from "@/lib/utils"

/** Loose enough that the bubble keeps leaning a beat after the pointer stops. */
const TILT = { stiffness: 260, damping: 20, mass: 0.4 }
/** Track-% per second that maxes out lean and squash. */
const FULL_TILT = 300

type RangeSliderBubbleProps = Omit<
  SliderPrimitive.Root.Props<number>,
  "value" | "defaultValue" | "onValueChange" | "children" | "orientation"
> & {
  value?: number
  defaultValue?: number
  onValueChange?: (value: number, details: SliderPrimitive.Root.ChangeEventDetails) => void
  /** Formats the value in the bubble (and the announced value). */
  formatValue?: (value: number) => string
  /** Accessible name of the thumb. */
  label?: string
}

/**
 * Slider whose value bubble pops out of the thumb on grab (or keyboard focus),
 * leans into the direction of travel and squashes with drag speed, then
 * settles upright when you let go.
 */
function RangeSliderBubble({
  className,
  value,
  defaultValue,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  formatValue = String,
  label,
  ...props
}: RangeSliderBubbleProps) {
  const reduce = useReducedMotion() ?? false
  const [inner, setInner] = React.useState(defaultValue ?? min)
  const current = value ?? inner
  const span = max - min || 1
  const pct = Math.min(100, Math.max(0, ((current - min) / span) * 100))

  const [pressed, setPressed] = React.useState(false)
  const [focusVisible, setFocusVisible] = React.useState(false)
  React.useEffect(() => {
    if (!pressed) return
    const up = () => setPressed(false)
    window.addEventListener("pointerup", up)
    window.addEventListener("pointercancel", up)
    return () => {
      window.removeEventListener("pointerup", up)
      window.removeEventListener("pointercancel", up)
    }
  }, [pressed])

  // One spring drives the whole reaction: lean is signed, squash reads its size.
  const pos = useMotionValue(pct)
  React.useEffect(() => pos.set(pct), [pct, pos])
  const velocity = useVelocity(pos)
  const lean = useSpring(
    useTransform(velocity, [-FULL_TILT, 0, FULL_TILT], [1, 0, -1], { clamp: true }),
    TILT
  )
  const rotate = useTransform(lean, (v) => v * 14)
  const scaleX = useTransform(lean, (v) => 1 + Math.abs(v) * 0.16)
  const scaleY = useTransform(lean, (v) => 1 - Math.abs(v) * 0.1)

  const open = pressed || focusVisible

  return (
    <SliderPrimitive.Root
      data-slot="range-slider-bubble"
      value={current}
      min={min}
      max={max}
      step={step}
      onValueChange={(next, details) => {
        if (value === undefined) setInner(next as number)
        onValueChange?.(next as number, details)
      }}
      className={cn("relative w-full touch-none pt-12 select-none data-disabled:opacity-50", className)}
      {...props}
    >
      <SliderPrimitive.Control
        data-slot="range-slider-bubble-control"
        onPointerDown={() => setPressed(true)}
        className="relative flex h-6 w-full cursor-pointer items-center data-disabled:cursor-not-allowed"
      >
        <SliderPrimitive.Track
          data-slot="range-slider-bubble-track"
          className="relative h-2 w-full rounded-full bg-muted shadow-well"
        >
          <SliderPrimitive.Indicator
            data-slot="range-slider-bubble-indicator"
            className="rounded-full bg-primary shadow-[inset_0_1px_0_rgb(255_255_255/0.25),inset_0_0_0_1px_color-mix(in_oklch,var(--primary),black_18%)]"
          />
          <SliderPrimitive.Thumb
            data-slot="range-slider-bubble-thumb"
            aria-label={label}
            getAriaValueText={(_, v) => formatValue(v)}
            onFocus={(e) => setFocusVisible(e.currentTarget.matches(":focus-visible"))}
            onBlur={() => setFocusVisible(false)}
            className={cn(
              "group/thumb block size-5 rounded-full bg-linear-to-b from-white to-[oklch(0.93_0_0)] shadow-[inset_0_1px_0_rgb(255_255_255),0_0_0_0.5px_rgb(0_0_0/0.12),0_1px_2px_rgb(0_0_0/0.3),0_2px_4px_-1px_rgb(0_0_0/0.2)] outline-none",
              "transition-[scale] duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-110 data-dragging:scale-125 has-focus-visible:ring-3 has-focus-visible:ring-ring motion-reduce:transition-none"
            )}
          >
            <span className="pointer-events-none absolute bottom-full left-1/2 mb-3 -translate-x-1/2">
              <AnimatePresence>
                {open ? (
                  <motion.span
                    key="bubble"
                    data-slot="range-slider-bubble-value"
                    initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.4, y: 10 }}
                    animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
                    exit={
                      reduce
                        ? { opacity: 0, transition: { duration: 0.12 } }
                        : { opacity: 0, scale: 0.5, y: 8, transition: { duration: 0.14 } }
                    }
                    transition={reduce ? { duration: 0.12 } : { type: "spring", stiffness: 520, damping: 26, mass: 0.5 }}
                    style={{ originY: 1 }}
                    className="block"
                  >
                    <motion.span
                      style={reduce ? undefined : { rotate, scaleX, scaleY, originY: 1 }}
                      className={cn(
                        "relative block rounded-xl bg-primary px-2.5 py-1 text-sm font-medium whitespace-nowrap text-primary-foreground tabular-nums shadow-primary",
                        "before:absolute before:inset-0 before:rounded-[inherit] before:bg-linear-to-b before:from-white/15 before:to-transparent"
                      )}
                    >
                      {formatValue(current)}
                      <span
                        aria-hidden
                        className="absolute -bottom-1 left-1/2 -z-10 size-2.5 -translate-x-1/2 rotate-45 rounded-[3px] bg-primary"
                      />
                    </motion.span>
                  </motion.span>
                ) : null}
              </AnimatePresence>
            </span>
          </SliderPrimitive.Thumb>
        </SliderPrimitive.Track>
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  )
}

export { RangeSliderBubble }
export type { RangeSliderBubbleProps }
