"use client"

import * as React from "react"
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type AnimationPlaybackControls,
  type MotionValue,
} from "motion/react"

import { cn } from "@/lib/utils"

type ArcPickerOption = { value: string; label: string; disabled?: boolean }
type ArcPickerSide = "top" | "bottom" | "left" | "right"

type ArcPickerProps = Omit<React.ComponentProps<"div">, "children" | "defaultValue" | "onChange"> & {
  options: readonly ArcPickerOption[]
  value?: string
  defaultValue?: string
  /** Fires live for every enabled choice the arc passes while scrolling, dragging or coasting. */
  onValueChange?: (value: string) => void
  /** Edge the arc bows toward. `top`/`bottom` scroll horizontally, `left`/`right` vertically. */
  side?: ArcPickerSide
  /** Circle radius in px; larger = gentler curve. Default 260. */
  radius?: number
  /** Minimum spacing between labels along the arc, px. Default 44. */
  itemSpacing?: number
  /** Labels shown on the arc at once. Default 7. */
  visibleCount?: number
  disabled?: boolean
  /** Hidden input name for forms. */
  name?: string
}

const SNAP = { type: "spring", stiffness: 360, damping: 32, mass: 0.6 } as const
const PILL = { stiffness: 520, damping: 38, mass: 0.5 }
const PAD = 20
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))

/** Geometry for one label at float distance `d` (in rows) from the apex. */
function place(d: number, spacing: number, radius: number, side: ArcPickerSide) {
  const angle = clamp((d * spacing) / radius, -1.45, 1.45)
  const bend = radius * (1 - Math.cos(angle))
  const along = radius * Math.sin(angle)
  const horizontal = side === "top" || side === "bottom"
  const x = horizontal ? along : side === "right" ? -bend : bend
  const y = horizontal ? (side === "top" ? bend : -bend) : along
  const rotate = ((side === "left" || side === "bottom" ? -angle : angle) * 180) / Math.PI
  return { x, y, rotate, bend }
}

function ArcLabel({
  option,
  index,
  position,
  spacing,
  radius,
  side,
  visibleCount,
  selected,
  disabled,
  focusable,
  onSelect,
  setRef,
}: {
  option: ArcPickerOption
  index: number
  position: MotionValue<number>
  spacing: number
  radius: number
  side: ArcPickerSide
  visibleCount: number
  selected: boolean
  disabled: boolean
  focusable: boolean
  onSelect: () => void
  setRef: (el: HTMLButtonElement | null) => void
}) {
  const horizontal = side === "top" || side === "bottom"
  const anchor = horizontal ? "-50%" : side === "left" ? "-100%" : "0%"
  const transform = useTransform(position, (at) => {
    const { x, y, rotate } = place(index - at, spacing, radius, side)
    return `translate3d(${x}px, ${y}px, 0) translate(${anchor}, -50%) rotate(${rotate}deg)`
  })
  const opacity = useTransform(position, (at) => {
    const d = Math.abs(index - at)
    return clamp((visibleCount / 2 + 0.5 - d) / 1.25, 0, 1) * (option.disabled ? 0.4 : 1)
  })
  const pointerEvents = useTransform(position, (at) => (Math.abs(index - at) < visibleCount / 2 ? "auto" : "none"))

  return (
    <motion.button
      ref={setRef}
      type="button"
      role="radio"
      aria-checked={selected}
      disabled={disabled || option.disabled}
      tabIndex={focusable ? 0 : -1}
      data-slot="arc-picker-option"
      data-selected={selected || undefined}
      onClick={(e) => {
        if (!e.defaultPrevented) onSelect()
      }}
      className={cn(
        "absolute top-0 left-0 cursor-pointer rounded-full px-3 py-1.5 text-lg whitespace-nowrap text-muted-foreground transition-[color] duration-200 outline-none",
        "focus-visible:ring-3 focus-visible:ring-ring disabled:cursor-not-allowed disabled:line-through",
        "data-selected:font-medium data-selected:text-foreground",
        horizontal ? "origin-center" : side === "left" ? "origin-right" : "origin-left"
      )}
      style={{ transform, opacity, pointerEvents }}
    >
      {option.label}
    </motion.button>
  )
}

/**
 * Radial single-choice picker: labels ride a circle that bows toward `side`.
 * Wheel, drag (with momentum) and arrow keys move it; the selection changes live
 * with each step and a raised pill stretches to fit whichever label sits at the apex.
 */
function ArcPicker({
  options,
  value: valueProp,
  defaultValue,
  onValueChange,
  side = "right",
  radius: radiusProp = 260,
  itemSpacing = 44,
  visibleCount: visibleProp = 7,
  disabled = false,
  name,
  className,
  style,
  "aria-label": ariaLabel = "Choose an option",
  onPointerDown: onPointerDownProp,
  onPointerMove: onPointerMoveProp,
  onPointerUp: onPointerUpProp,
  onPointerCancel: onPointerCancelProp,
  onKeyDown: onKeyDownProp,
  onClickCapture: onClickCaptureProp,
  ...props
}: ArcPickerProps) {
  const reduce = useReducedMotion() ?? false
  const horizontal = side === "top" || side === "bottom"
  const radius = Math.max(120, radiusProp)
  const visibleCount = Math.max(3, Math.floor(visibleProp))
  const last = options.length - 1

  const firstEnabled = options.findIndex((o) => !o.disabled)
  const [internal, setInternal] = React.useState(defaultValue)
  const controlled = valueProp !== undefined
  const candidate = controlled ? valueProp : internal
  let selectedIndex = options.findIndex((o) => o.value === candidate && !o.disabled)
  if (selectedIndex < 0) selectedIndex = Math.max(0, firstEnabled)
  const selected = options[selectedIndex]

  const root = React.useRef<HTMLDivElement>(null)
  const buttons = React.useRef<(HTMLButtonElement | null)[]>([])
  const [widths, setWidths] = React.useState<number[]>([])
  const [size, setSize] = React.useState({ w: 0, h: 0 })

  const labelsKey = options.map((o) => o.label).join("\u0000")
  React.useLayoutEffect(() => {
    setWidths(buttons.current.slice(0, options.length).map((b) => b?.offsetWidth ?? 0))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [labelsKey])
  React.useLayoutEffect(() => {
    const el = root.current
    if (!el) return
    const ro = new ResizeObserver(() => setSize({ w: el.clientWidth, h: el.clientHeight }))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const widest = widths.length ? Math.max(...widths) : 0
  const labelH = 40
  const spacing = horizontal ? Math.max(itemSpacing, widest + 12) : itemSpacing
  // Horizontal arcs can only show as many labels as fit across the box.
  const half = horizontal && size.w ? Math.min(visibleCount / 2, size.w / 2 / spacing + 0.5) : visibleCount / 2
  const edge = place(half, spacing, radius, side)
  const span = 2 * radius * Math.sin(clamp(((visibleCount / 2) * spacing) / radius, 0, 1.45))
  // Where the apex sits inside the box.
  const apex = horizontal
    ? { x: size.w / 2, y: side === "top" ? PAD + labelH / 2 : size.h - PAD - labelH / 2 }
    : { x: side === "right" ? size.w - PAD - widest : PAD + widest, y: size.h / 2 }
  const autoSize = horizontal
    ? { minHeight: Math.round(edge.bend + labelH + PAD * 2), minWidth: 240 }
    : { minHeight: Math.round(span + labelH), minWidth: Math.round(widest + edge.bend + PAD * 2) }

  const position = useMotionValue(selectedIndex)
  const anim = React.useRef<AnimationPlaybackControls | null>(null)
  const live = React.useRef(selectedIndex)
  const dragJustEnded = React.useRef(false)
  const wheelTimer = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const dragState = React.useRef<{ start: number; from: number; samples: { t: number; p: number }[]; moved: boolean } | null>(
    null
  )

  const nearestEnabled = React.useCallback(
    (at: number) => {
      const r = clamp(Math.round(at), 0, last)
      for (let k = 0; k <= last; k++) {
        const order = at >= r ? [r + k, r - k] : [r - k, r + k]
        for (const i of order) if (options[i] && !options[i].disabled) return i
      }
      return r
    },
    [options, last]
  )

  const commit = React.useCallback(
    (i: number) => {
      const o = options[i]
      if (!o || o.disabled || i === live.current) return
      live.current = i
      if (!controlled) setInternal(o.value)
      onValueChange?.(o.value)
    },
    [options, controlled, onValueChange]
  )

  // Live selection: whatever enabled row is nearest the apex.
  React.useEffect(() => position.on("change", (at) => commit(nearestEnabled(at))), [position, commit, nearestEnabled])

  const snapTo = React.useCallback(
    (i: number) => {
      anim.current?.stop()
      const to = clamp(i, 0, last)
      if (reduce) {
        position.set(to)
        return
      }
      anim.current = animate(position, to, SNAP)
    },
    [last, position, reduce]
  )

  // Follow controlled changes from outside.
  React.useEffect(() => {
    if (selectedIndex === live.current) return
    live.current = selectedIndex
    if (!dragState.current) snapTo(selectedIndex)
  }, [selectedIndex, snapTo])

  // Wheel: non-passive so the page doesn't scroll underneath.
  React.useEffect(() => {
    const el = root.current
    if (!el || disabled) return
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      anim.current?.stop()
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY
      const unit = e.deltaMode === 1 ? 0.33 : 0.012
      position.set(clamp(position.get() + delta * unit, -0.4, last + 0.4))
      clearTimeout(wheelTimer.current)
      wheelTimer.current = setTimeout(() => snapTo(nearestEnabled(position.get())), 120)
    }
    el.addEventListener("wheel", onWheel, { passive: false })
    return () => {
      el.removeEventListener("wheel", onWheel)
      clearTimeout(wheelTimer.current)
    }
  }, [disabled, last, position, snapTo, nearestEnabled])

  const axis = (e: React.PointerEvent) => (horizontal ? e.clientX : e.clientY)
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    onPointerDownProp?.(e)
    if (disabled || e.button !== 0) return
    anim.current?.stop()
    dragState.current = { start: axis(e), from: position.get(), samples: [{ t: e.timeStamp, p: axis(e) }], moved: false }
  }
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    onPointerMoveProp?.(e)
    const d = dragState.current
    if (!d) return
    const delta = axis(e) - d.start
    if (!d.moved && Math.abs(delta) > 4) {
      d.moved = true
      try {
        e.currentTarget.setPointerCapture(e.pointerId)
      } catch {}
    }
    if (!d.moved) return
    const raw = d.from - delta / spacing
    // Rubber band past either end.
    const banded = raw < 0 ? raw * 0.35 : raw > last ? last + (raw - last) * 0.35 : raw
    position.set(banded)
    d.samples.push({ t: e.timeStamp, p: axis(e) })
    while (d.samples.length > 2 && e.timeStamp - d.samples[0].t > 90) d.samples.shift()
  }
  const endDrag = () => {
    const d = dragState.current
    dragState.current = null
    if (!d) return
    if (!d.moved) return
    const a = d.samples[0]
    const b = d.samples[d.samples.length - 1]
    const v = -((b.p - a.p) / Math.max(1, b.t - a.t)) / spacing // rows per ms
    snapTo(nearestEnabled(position.get() + v * 180))
  }
  // Swallow the click that ends a drag so it doesn't select the label under the pointer.
  const onClickCapture = (e: React.MouseEvent<HTMLDivElement>) => {
    onClickCaptureProp?.(e)
    if (dragJustEnded.current) {
      e.preventDefault()
      e.stopPropagation()
      dragJustEnded.current = false
    }
  }

  const move = (by: number | "first" | "last") => {
    let i = selectedIndex
    if (by === "first") i = Math.max(0, firstEnabled)
    else if (by === "last") {
      for (let k = last; k >= 0; k--) if (!options[k].disabled) { i = k; break }
    } else {
      for (let k = selectedIndex + by; k >= 0 && k <= last; k += by)
        if (!options[k].disabled) { i = k; break }
    }
    if (i === selectedIndex) return
    commit(i)
    snapTo(i)
    requestAnimationFrame(() => buttons.current[i]?.focus({ preventScroll: true }))
  }
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    onKeyDownProp?.(e)
    if (disabled || e.defaultPrevented) return
    const prev = horizontal ? ["ArrowLeft", "ArrowUp"] : ["ArrowUp", "ArrowLeft"]
    const next = horizontal ? ["ArrowRight", "ArrowDown"] : ["ArrowDown", "ArrowRight"]
    let handled = true
    if (prev.includes(e.key)) move(-1)
    else if (next.includes(e.key)) move(1)
    else if (e.key === "Home") move("first")
    else if (e.key === "End") move("last")
    else handled = false
    if (handled) e.preventDefault()
  }

  // Selection pill follows the apex label's width.
  const pillWidth = useSpring(widths[selectedIndex] ?? 0, reduce ? { duration: 0 } : PILL)
  React.useEffect(() => {
    const w = widths[selectedIndex]
    if (w) pillWidth.set(w)
  }, [widths, selectedIndex, pillWidth])
  const pillX = useTransform(pillWidth, (w) => (horizontal ? -w / 2 : side === "left" ? -w : 0))

  return (
    <div
      ref={root}
      role="radiogroup"
      aria-label={ariaLabel}
      aria-disabled={disabled || undefined}
      data-slot="arc-picker"
      data-side={side}
      data-disabled={disabled || undefined}
      className={cn(
        "relative isolate touch-none overflow-hidden rounded-2xl bg-card bg-linear-to-b from-white/4 to-transparent shadow-raised select-none [-webkit-touch-callout:none] data-disabled:opacity-50",
        disabled ? "cursor-not-allowed" : "cursor-grab active:cursor-grabbing",
        className
      )}
      style={{ ...autoSize, ...style }}
      {...props}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={(e) => {
        dragJustEnded.current = !!dragState.current?.moved
        endDrag()
        onPointerUpProp?.(e)
      }}
      onPointerCancel={(e) => {
        endDrag()
        onPointerCancelProp?.(e)
      }}
      onKeyDown={onKeyDown}
      onClickCapture={onClickCapture}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0 isolate *:pointer-events-auto",
          horizontal
            ? "[mask-image:linear-gradient(to_right,transparent,black_14%,black_86%,transparent)]"
            : "[mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)]"
        )}
      >
      <div className="absolute" style={{ left: apex.x, top: apex.y, visibility: size.w ? undefined : "hidden" }}>
        <motion.span
          aria-hidden
          data-slot="arc-picker-indicator"
          className="pointer-events-none absolute top-0 left-0 -z-10 h-10 -translate-y-1/2 rounded-full bg-muted shadow-well"
          style={{ width: pillWidth, x: pillX }}
        />
        {options.map((o, i) => (
          <ArcLabel
            key={o.value}
            option={o}
            index={i}
            position={position}
            spacing={spacing}
            radius={radius}
            side={side}
            visibleCount={visibleCount}
            selected={i === selectedIndex}
            focusable={i === selectedIndex && !disabled}
            disabled={disabled}
            onSelect={() => {
              commit(i)
              snapTo(i)
            }}
            setRef={(el) => {
              buttons.current[i] = el
            }}
          />
        ))}
      </div>
      </div>
      {name ? <input type="hidden" name={name} value={selected?.value ?? ""} /> : null}
    </div>
  )
}

export { ArcPicker }
export type { ArcPickerOption, ArcPickerProps, ArcPickerSide }
