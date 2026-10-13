"use client"

import * as React from "react"
import { animate, motion, useMotionValue, useMotionValueEvent, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

/** Settle after a flick: quick, no overshoot past the tick. */
const SNAP = { type: "spring", stiffness: 420, damping: 42, mass: 0.7 } as const
/** How far a flick coasts: seconds of release velocity projected forward. */
const COAST = 0.22

type RangeSliderRulerProps = Omit<React.ComponentProps<"div">, "onChange" | "defaultValue"> & {
  value?: number
  defaultValue?: number
  onValueChange?: (value: number) => void
  /** Fires when a drag, flick, wheel or key press has settled. */
  onValueCommitted?: (value: number) => void
  min?: number
  max?: number
  step?: number
  /** Pixels between two steps on the scale. */
  gap?: number
  /** Every Nth step is a tall, labelled tick. */
  majorEvery?: number
  /** Unit after the readout, e.g. "kg". */
  unit?: string
  /** Accessible name; also shown above the readout. */
  label?: string
  disabled?: boolean
}

/**
 * Ruler slider: a fixed needle with the scale scrolling underneath. Drag the
 * scale, flick it and it coasts with inertia, then settles onto the nearest
 * tick. Arrow keys, Page keys, Home/End and horizontal wheel all work too.
 */
function RangeSliderRuler({
  className,
  value,
  defaultValue,
  onValueChange,
  onValueCommitted,
  min = 0,
  max = 100,
  step = 1,
  gap = 12,
  majorEvery = 5,
  unit,
  label,
  disabled,
  ...props
}: RangeSliderRulerProps) {
  const reduce = useReducedMotion() ?? false
  const stride = step > 0 ? step : 1
  const steps = Math.max(0, Math.round((max - min) / stride))
  const decimals = (String(stride).split(".")[1] ?? "").length
  const fmt = (v: number) => v.toFixed(decimals)

  const [inner, setInner] = React.useState(defaultValue ?? min)
  const current = clampSnap(value ?? inner, min, stride, steps)

  const toX = React.useCallback((v: number) => -((v - min) / stride) * gap, [min, stride, gap])
  const fromX = React.useCallback(
    (x: number) => clampSnap(min + (-x / gap) * stride, min, stride, steps),
    [min, stride, gap, steps]
  )

  const x = useMotionValue(toX(current))
  const minX = -steps * gap

  // While the pointer (or its momentum) drives the strip, x owns the value;
  // otherwise the value owns x.
  const driving = React.useRef(false)
  const lastEmitted = React.useRef(current)
  const commitRef = React.useRef(onValueCommitted)
  commitRef.current = onValueCommitted

  const emit = React.useCallback(
    (next: number) => {
      if (next === lastEmitted.current) return
      lastEmitted.current = next
      if (value === undefined) setInner(next)
      onValueChange?.(next)
    },
    [value, onValueChange]
  )

  useMotionValueEvent(x, "change", (v) => {
    if (driving.current) emit(fromX(v))
  })

  React.useEffect(() => {
    lastEmitted.current = current
    if (driving.current) return
    const target = toX(current)
    if (reduce) x.jump(target)
    else if (x.get() !== target) animate(x, target, SNAP)
  }, [current, toX, reduce, x])

  const settle = (velocity = 0, shift = 0) => {
    const projected = x.get() + shift + velocity * COAST
    const target = toX(fromX(Math.min(0, Math.max(minX, projected))))
    const done = () => {
      driving.current = false
      commitRef.current?.(fromX(target))
    }
    if (reduce) {
      x.jump(target)
      emit(fromX(target))
      done()
      return
    }
    animate(x, target, { ...SNAP, velocity }).then(done)
  }

  // Pointer drag with a short velocity history for the flick.
  const drag = React.useRef<{ id: number; startX: number; origin: number; samples: { t: number; x: number }[] } | null>(null)
  const [grabbing, setGrabbing] = React.useState(false)

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (disabled || (e.pointerType === "mouse" && e.button !== 0)) return
    x.stop()
    driving.current = true
    try {
      e.currentTarget.setPointerCapture(e.pointerId)
    } catch {}
    drag.current = { id: e.pointerId, startX: e.clientX, origin: x.get(), samples: [{ t: e.timeStamp, x: e.clientX }] }
    setGrabbing(true)
  }
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current
    if (!d || d.id !== e.pointerId) return
    let next = d.origin + (e.clientX - d.startX)
    // Rubber-band past either end.
    if (next > 0) next = rubber(next)
    else if (next < minX) next = minX - rubber(minX - next)
    x.set(next)
    d.samples.push({ t: e.timeStamp, x: e.clientX })
    if (d.samples.length > 6) d.samples.shift()
  }
  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current
    if (!d || d.id !== e.pointerId) return
    drag.current = null
    setGrabbing(false)
    const first = d.samples[0]
    const last = d.samples[d.samples.length - 1]
    const dt = (last.t - first.t) / 1000
    const fresh = e.timeStamp - last.t < 80
    const velocity = dt > 0 && fresh ? (last.x - first.x) / dt : 0
    // A tap without movement: move the tapped tick under the needle.
    if (Math.abs(e.clientX - d.startX) < 3) {
      const rect = e.currentTarget.getBoundingClientRect()
      const offset = e.clientX - (rect.left + rect.width / 2)
      settle(0, -offset)
      return
    }
    settle(Math.max(-4000, Math.min(4000, velocity)))
  }

  // Horizontal trackpad scroll nudges the scale, then snaps once it rests.
  const wheelTimer = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (disabled || Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return
    x.stop()
    driving.current = true
    x.set(Math.min(0, Math.max(minX, x.get() - e.deltaX)))
    clearTimeout(wheelTimer.current)
    wheelTimer.current = setTimeout(() => settle(0), 120)
  }
  React.useEffect(() => () => clearTimeout(wheelTimer.current), [])

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return
    const big = stride * majorEvery
    const map: Record<string, number> = {
      ArrowRight: current + stride,
      ArrowUp: current + stride,
      ArrowLeft: current - stride,
      ArrowDown: current - stride,
      PageUp: current + big,
      PageDown: current - big,
      Home: min,
      End: min + steps * stride,
    }
    if (!(e.key in map)) return
    e.preventDefault()
    x.stop()
    driving.current = false
    const next = clampSnap(map[e.key], min, stride, steps)
    emit(next)
    onValueCommitted?.(next)
  }

  const ticks = React.useMemo(
    () =>
      Array.from({ length: steps + 1 }, (_, i) => ({
        i,
        value: Number((min + i * stride).toFixed(6)),
        major: i % majorEvery === 0,
      })),
    [steps, min, stride, majorEvery]
  )

  const valueText = unit ? `${fmt(current)} ${unit}` : fmt(current)

  return (
    <div
      data-slot="range-slider-ruler"
      data-disabled={disabled || undefined}
      className={cn("flex w-full flex-col items-center gap-2 select-none data-disabled:opacity-50", className)}
      {...props}
    >
      <div aria-hidden className="flex flex-col items-center">
        {label ? <span className="text-xs font-medium text-muted-foreground">{label}</span> : null}
        <span className="text-3xl font-semibold tracking-tight text-foreground tabular-nums">
          {fmt(current)}
          {unit ? <span className="ml-1 text-base font-medium text-muted-foreground">{unit}</span> : null}
        </span>
      </div>

      <div
        role="slider"
        tabIndex={disabled ? -1 : 0}
        aria-label={label}
        aria-valuemin={min}
        aria-valuemax={min + steps * stride}
        aria-valuenow={current}
        aria-valuetext={valueText}
        aria-orientation="horizontal"
        aria-disabled={disabled || undefined}
        data-slot="range-slider-ruler-scale"
        data-grabbing={grabbing || undefined}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onKeyDown={onKeyDown}
        onWheel={onWheel}
        className={cn(
          "relative h-20 w-full cursor-grab touch-none overflow-hidden rounded-2xl bg-muted shadow-well outline-none [-webkit-touch-callout:none] focus-visible:ring-3 focus-visible:ring-ring data-grabbing:cursor-grabbing",
          disabled && "pointer-events-none"
        )}
      >
        {/* Edge fade so the scale melts into the well instead of being cut. */}
        <div
          className="absolute inset-0 [mask-image:linear-gradient(to_right,transparent,black_18%,black_82%,transparent)]"
          aria-hidden
        >
          <motion.div className="absolute top-0 left-1/2 h-full" style={{ x }}>
            {ticks.map((t) => (
              <span
                key={t.i}
                className="absolute top-3 flex -translate-x-1/2 flex-col items-center"
                style={{ left: t.i * gap }}
              >
                <span
                  className={cn(
                    "w-px rounded-full",
                    t.major ? "h-6 bg-foreground/55" : "h-3 bg-foreground/25"
                  )}
                />
                {t.major ? (
                  <span className="mt-1.5 text-[11px] font-medium whitespace-nowrap text-muted-foreground tabular-nums">
                    {fmt(t.value)}
                  </span>
                ) : null}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Fixed needle. */}
        <span aria-hidden className="pointer-events-none absolute top-1.5 left-1/2 flex -translate-x-1/2 flex-col items-center">
          <span className="size-0 border-x-[5px] border-t-[6px] border-x-transparent border-t-primary" />
          <span className="-mt-px h-9 w-0.5 rounded-full bg-primary shadow-[0_0_0_0.5px_color-mix(in_oklch,var(--primary),black_25%)]" />
        </span>
      </div>
    </div>
  )
}

function clampSnap(v: number, min: number, stride: number, steps: number) {
  const i = Math.min(steps, Math.max(0, Math.round((v - min) / stride)))
  return Number((min + i * stride).toFixed(6))
}

/** Diminishing overscroll: the further you pull past the end, the less it moves. */
function rubber(distance: number, limit = 80) {
  return limit * (1 - Math.exp(-distance / limit))
}

export { RangeSliderRuler }
export type { RangeSliderRulerProps }
