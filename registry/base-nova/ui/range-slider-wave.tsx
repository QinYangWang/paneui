"use client"

import * as React from "react"
import { Slider as SliderPrimitive } from "@base-ui/react/slider"
import { motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

const BAR_SPRING = { type: "spring", stiffness: 420, damping: 19, mass: 0.5 } as const

type RangeSliderWaveProps = Omit<
  SliderPrimitive.Root.Props<number>,
  "value" | "defaultValue" | "onValueChange" | "children" | "orientation"
> & {
  value?: number
  defaultValue?: number
  onValueChange?: (value: number, details: SliderPrimitive.Root.ChangeEventDetails) => void
  /** Number of equalizer bars. */
  bars?: number
  /** Crest width in bars; bigger spreads the bell wider. */
  spread?: number
  /** Optional heading row above the bars. Also the accessible name. */
  label?: string
  /** Formats the readout in the heading row (and the announced value). */
  formatValue?: (value: number) => string
}

/**
 * Equalizer slider: bars rise into a crest around the handle and fall back as
 * it passes, so the value travels down the well as a wave. Bars up to the
 * value are primary, the rest stay muted.
 */
function RangeSliderWave({
  className,
  value,
  defaultValue,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  bars = 28,
  spread = 2.4,
  label,
  formatValue = String,
  ...props
}: RangeSliderWaveProps) {
  const reduce = useReducedMotion() ?? false
  const [inner, setInner] = React.useState(defaultValue ?? min)
  const current = value ?? inner
  const span = max - min || 1
  const p = Math.min(1, Math.max(0, (current - min) / span))

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

  const head = p * (bars - 1)

  return (
    <SliderPrimitive.Root
      data-slot="range-slider-wave"
      value={current}
      min={min}
      max={max}
      step={step}
      onValueChange={(next, details) => {
        if (value === undefined) setInner(next as number)
        onValueChange?.(next as number, details)
      }}
      className={cn("flex w-full touch-none flex-col gap-2 select-none data-disabled:opacity-50", className)}
      {...props}
    >
      {label ? (
        <div aria-hidden className="flex items-baseline justify-between px-1 text-sm font-medium">
          <span className="text-foreground">{label}</span>
          <span className="text-muted-foreground tabular-nums">{formatValue(current)}</span>
        </div>
      ) : null}
      <SliderPrimitive.Control
        data-slot="range-slider-wave-control"
        onPointerDown={() => setPressed(true)}
        className={cn(
          "relative flex h-20 w-full cursor-grab items-center rounded-2xl bg-muted px-4 shadow-well active:cursor-grabbing",
          "has-focus-visible:ring-3 has-focus-visible:ring-ring data-disabled:cursor-not-allowed"
        )}
      >
        <div aria-hidden className="pointer-events-none absolute inset-x-4 inset-y-3 flex items-center justify-between gap-[3px]">
          {Array.from({ length: bars }, (_, i) => {
            const distance = Math.abs(i - head)
            const crest = Math.exp(-(distance ** 2) / (2 * spread ** 2))
            const filled = i <= Math.round(head)
            return (
              <motion.span
                key={i}
                data-slot="range-slider-wave-bar"
                data-filled={filled || undefined}
                className={cn(
                  "h-full flex-1 origin-center rounded-full transition-colors duration-150",
                  filled
                    ? "bg-primary"
                    : "bg-muted-foreground/30"
                )}
                initial={false}
                animate={{ scaleY: reduce ? (filled ? 0.5 : 0.3) : 0.18 + crest * (pressed ? 0.82 : 0.6) }}
                transition={
                  reduce ? { duration: 0 } : { ...BAR_SPRING, delay: Math.min(distance * 0.012, 0.12) }
                }
              />
            )
          })}
        </div>
        <SliderPrimitive.Track data-slot="range-slider-wave-track" className="relative h-full w-full">
          <SliderPrimitive.Thumb
            data-slot="range-slider-wave-thumb"
            aria-label={label}
            getAriaValueText={(_, v) => formatValue(v)}
            className="size-px opacity-0 outline-none"
          />
        </SliderPrimitive.Track>
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  )
}

export { RangeSliderWave }
export type { RangeSliderWaveProps }
