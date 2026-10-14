"use client"

import * as React from "react"
import { Slider as SliderPrimitive } from "@base-ui/react/slider"
import { motion, useMotionTemplate, useReducedMotion, useSpring, useTransform } from "motion/react"

import { cn } from "@/lib/utils"

const GLIDE = { stiffness: 620, damping: 48, mass: 0.5 }

type RangeSliderFluidProps = Omit<
  SliderPrimitive.Root.Props<number>,
  "value" | "defaultValue" | "onValueChange" | "children" | "orientation"
> & {
  value?: number
  defaultValue?: number
  onValueChange?: (value: number, details: SliderPrimitive.Root.ChangeEventDetails) => void
  /** Text on the left of the pill. Also the accessible name; without it, `aria-label` / `aria-labelledby` on the root name the thumb. */
  label?: string
  /** Formats the value on the right (and the announced value). */
  formatValue?: (value: number) => string
}

/**
 * Thumbless slider: the whole pill is the control. A primary fill glides
 * behind a rounded liquid cap, and the label and value flip to the
 * on-primary colour exactly where the fill covers them.
 */
function RangeSliderFluid({
  className,
  value,
  defaultValue,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  formatValue = (v) => `${v}%`,
  ...props
}: RangeSliderFluidProps) {
  const reduce = useReducedMotion() ?? false

  const unnamed = !label && !ariaLabel && !ariaLabelledBy
  React.useEffect(() => {
    if (process.env.NODE_ENV !== "production" && unnamed)
      console.warn("RangeSliderFluid: pass `label`, `aria-label` or `aria-labelledby` so the slider has an accessible name.")
  }, [unnamed])
  const [inner, setInner] = React.useState(defaultValue ?? min)
  const current = value ?? inner
  const span = max - min || 1
  const pct = Math.min(100, Math.max(0, ((current - min) / span) * 100))

  const spring = useSpring(pct, GLIDE)
  React.useEffect(() => {
    if (reduce) spring.jump(pct)
    else spring.set(pct)
  }, [pct, reduce, spring])

  // Clip a full-width layer instead of sizing it, so the text inside never
  // re-lays out and lines up glyph for glyph with the copy underneath.
  const uncovered = useTransform(spring, (v) => 100 - v)
  const clipPath = useMotionTemplate`inset(0 ${uncovered}% 0 0 round 9999px)`
  // A soft meniscus highlight that rides the leading edge of the fill.
  const capLeft = useMotionTemplate`${spring}%`

  const [pressed, setPressed] = React.useState(false)
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

  const row = (
    <>
      <span className="truncate">{label}</span>
      <span className="tabular-nums">{formatValue(current)}</span>
    </>
  )

  return (
    <SliderPrimitive.Root
      data-slot="range-slider-fluid"
      value={current}
      min={min}
      max={max}
      step={step}
      onValueChange={(next, details) => {
        if (value === undefined) setInner(next as number)
        onValueChange?.(next as number, details)
      }}
      className={cn("relative w-full touch-none select-none data-disabled:opacity-50", className)}
      {...props}
    >
      <SliderPrimitive.Control
        data-slot="range-slider-fluid-control"
        onPointerDown={() => setPressed(true)}
        render={
          <motion.div
            animate={reduce ? undefined : { scale: pressed ? 1.025 : 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 30, mass: 0.6 }}
          />
        }
        className={cn(
          "relative flex h-12 w-full cursor-grab items-center overflow-hidden rounded-full bg-muted shadow-well active:cursor-grabbing",
          "has-focus-visible:ring-3 has-focus-visible:ring-ring data-disabled:cursor-not-allowed"
        )}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-center justify-between gap-3 px-5 text-sm font-medium text-foreground"
        >
          {row}
        </div>

        <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ clipPath }}>
          <div className="absolute inset-0 bg-primary" />
          <div className="absolute inset-0 flex items-center justify-between gap-3 px-5 text-sm font-medium text-primary-foreground">
            {row}
          </div>
          <motion.span
            style={{ left: capLeft }}
            className="absolute inset-y-1.5 w-3 -translate-x-[calc(100%+2px)] rounded-full bg-primary-foreground/30"
          />
        </motion.div>

        <SliderPrimitive.Track data-slot="range-slider-fluid-track" className="absolute inset-0">
          {/* Invisible handle: keeps a real range input for keyboard and AT. */}
          <SliderPrimitive.Thumb
            data-slot="range-slider-fluid-thumb"
            aria-label={label ?? ariaLabel}
            aria-labelledby={ariaLabelledBy}
            getAriaValueText={(_, v) => formatValue(v)}
            className="size-px opacity-0 outline-none"
          />
        </SliderPrimitive.Track>
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  )
}

export { RangeSliderFluid }
export type { RangeSliderFluidProps }
