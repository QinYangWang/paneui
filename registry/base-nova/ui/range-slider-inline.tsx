"use client"

import * as React from "react"
import { Slider as SliderPrimitive } from "@base-ui/react/slider"

import { cn } from "@/lib/utils"

/** Gap between the well edge and the first/last stop, in px (matches `px-4` minus the `inset-1`). */
const EDGE = 12
const STOPS = 10

type RangeSliderInlineProps = Omit<
  SliderPrimitive.Root.Props<number>,
  "value" | "defaultValue" | "onValueChange" | "children" | "orientation"
> & {
  value?: number
  defaultValue?: number
  onValueChange?: (value: number, details: SliderPrimitive.Root.ChangeEventDetails) => void
  /** Short label drawn inside the left edge of the well. */
  label: string
  /** Formats the readout on the right (and the announced value). */
  formatValue?: (value: number) => string
  /** Paint the ten evenly spaced stop markers. */
  showStops?: boolean
  /** On pointer release, settle onto the nearest of the ten stops. */
  snapToStops?: boolean
}

/**
 * Inline slider: a raised fill grows inside an inset well, with the label and
 * value printed on the track itself. The thumb is a slim bar that parts around
 * the text as it passes, and ten stop markers hide where they would sit under it.
 */
function RangeSliderInline({
  className,
  value,
  defaultValue,
  onValueChange,
  onValueCommitted,
  min = 0,
  max = 100,
  step = 1,
  label,
  formatValue = String,
  showStops = true,
  snapToStops = false,
  disabled,
  ...props
}: RangeSliderInlineProps) {
  const [inner, setInner] = React.useState(defaultValue ?? min)
  const current = value ?? inner
  const span = max - min || 1
  const p = Math.min(1, Math.max(0, (current - min) / span))

  const boxRef = React.useRef<HTMLDivElement>(null)
  const labelRef = React.useRef<HTMLSpanElement>(null)
  const readoutRef = React.useRef<HTMLSpanElement>(null)
  const [geo, setGeo] = React.useState({ width: 0, label: 0, readout: 0 })

  React.useLayoutEffect(() => {
    const box = boxRef.current
    if (!box || typeof ResizeObserver === "undefined") return
    const measure = () => {
      const next = {
        width: box.clientWidth,
        label: labelRef.current?.offsetWidth ?? 0,
        readout: readoutRef.current?.offsetWidth ?? 0,
      }
      setGeo((prev) =>
        prev.width === next.width && prev.label === next.label && prev.readout === next.readout ? prev : next
      )
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(box)
    if (labelRef.current) ro.observe(labelRef.current)
    if (readoutRef.current) ro.observe(readoutRef.current)
    return () => ro.disconnect()
  }, [])

  // Pixel geometry inside the inner box (the well minus its 4px inset).
  const usable = Math.max(0, geo.width - EDGE * 2)
  const thumbX = EDGE + p * usable
  const labelZone: [number, number] = [EDGE - 4, EDGE + geo.label + 4]
  const readoutZone: [number, number] = [geo.width - EDGE - geo.readout - 4, geo.width - EDGE + 4]
  const inZone = (x: number, [a, b]: [number, number], pad = 0) => geo.width > 0 && x >= a - pad && x <= b + pad
  const parted = inZone(thumbX, labelZone) || inZone(thumbX, readoutZone)

  const stops = React.useMemo(
    () => Array.from({ length: STOPS }, (_, i) => snap(min + (span * i) / (STOPS - 1), min, max, step)),
    [min, max, span, step]
  )

  const set = (next: number, details: SliderPrimitive.Root.ChangeEventDetails) => {
    if (value === undefined) setInner(next)
    onValueChange?.(next, details)
  }

  return (
    <SliderPrimitive.Root
      data-slot="range-slider-inline"
      value={current}
      min={min}
      max={max}
      step={step}
      disabled={disabled}
      onValueChange={(next, details) => set(next as number, details)}
      onValueCommitted={(next, details) => {
        let settled = next as number
        if (snapToStops && (details.reason === "drag" || details.reason === "track-press")) {
          const nearest = stops.reduce((a, b) => (Math.abs(b - settled) < Math.abs(a - settled) ? b : a))
          if (nearest !== settled) {
            settled = nearest
            if (value === undefined) setInner(nearest)
            onValueChange?.(nearest, details as unknown as SliderPrimitive.Root.ChangeEventDetails)
          }
        }
        onValueCommitted?.(settled, details)
      }}
      className={cn("group/ris relative w-full touch-none select-none data-disabled:opacity-50", className)}
      {...props}
    >
      <SliderPrimitive.Control
        data-slot="range-slider-inline-control"
        className={cn(
          "relative flex h-11 w-full cursor-pointer items-center rounded-2xl bg-muted px-4 shadow-well outline-none",
          "has-focus-visible:ring-3 has-focus-visible:ring-ring data-disabled:cursor-not-allowed"
        )}
      >
        {/* Inner box: fill, stops and text all live in the same 4px-inset frame. */}
        <div ref={boxRef} aria-hidden className="pointer-events-none absolute inset-1">
          <div
            data-slot="range-slider-inline-fill"
            style={{ width: `calc(${EDGE + 6}px + ${p} * (100% - ${EDGE * 2}px))` }}
            className={cn(
              "absolute inset-y-0 left-0 rounded-xl bg-card shadow-raised",
              "transition-[width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-data-dragging/ris:transition-none motion-reduce:transition-none"
            )}
          />
          {showStops
            ? stops.map((stop, i) => {
                const x = EDGE + (i / (STOPS - 1)) * usable
                const hidden =
                  inZone(x, labelZone, 3) || inZone(x, readoutZone, 3) || Math.abs(x - thumbX) < 7
                return (
                  <span
                    key={i}
                    data-slot="range-slider-inline-stop"
                    style={{ left: `calc(${EDGE}px + ${i / (STOPS - 1)} * (100% - ${EDGE * 2}px))` }}
                    className={cn(
                      "absolute top-1/2 size-1 -translate-1/2 rounded-full transition-opacity duration-200",
                      stop <= current ? "bg-foreground/25" : "bg-foreground/20",
                      hidden ? "opacity-0" : "opacity-100"
                    )}
                  />
                )
              })
            : null}
          <div className="absolute inset-0 flex items-center justify-between px-3 text-sm font-medium">
            <span ref={labelRef} className="truncate text-foreground">
              {label}
            </span>
            <span ref={readoutRef} className="text-muted-foreground tabular-nums group-data-dragging/ris:text-foreground">
              {formatValue(current)}
            </span>
          </div>
        </div>

        <SliderPrimitive.Track data-slot="range-slider-inline-track" className="relative h-full w-full">
          <SliderPrimitive.Thumb
            data-slot="range-slider-inline-thumb"
            aria-label={label}
            getAriaValueText={(_, v) => formatValue(v)}
            data-parted={parted || undefined}
            className={cn(
              "group/thumb h-7 w-3 outline-none",
              "transition-[inset-inline-start] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-data-dragging/ris:transition-none motion-reduce:transition-none"
            )}
          >
            {/* Two halves of one bar: they slide apart to clear the text underneath. */}
            {(["top-0", "bottom-0"] as const).map((edge) => (
              <span
                key={edge}
                aria-hidden
                className={cn(
                  "absolute left-1/2 w-1 -translate-x-1/2 rounded-full bg-primary",
                  "h-1/2 transition-[height,scale] duration-250 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-data-parted/thumb:h-1.5 motion-reduce:transition-none",
                  "group-data-dragging/ris:scale-x-125",
                  edge
                )}
              />
            ))}
          </SliderPrimitive.Thumb>
        </SliderPrimitive.Track>
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  )
}

function snap(v: number, min: number, max: number, step: number) {
  const s = step > 0 ? step : 1
  const n = Math.round((v - min) / s) * s + min
  return Number(Math.min(max, Math.max(min, n)).toFixed(6))
}

export { RangeSliderInline }
export type { RangeSliderInlineProps }
