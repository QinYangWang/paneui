"use client"

import * as React from "react"
import {
  animate,
  type AnimationPlaybackControls,
  motion,
  type MotionValue,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
} from "motion/react"

import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons"
import { cn } from "@/lib/utils"

/* A heavy spring that takes the release velocity, so flicks roll on and settle. */
const glide = { type: "spring", stiffness: 70, damping: 18, mass: 1.2 } as const
const DEG = Math.PI / 180
/* Items past this wall angle are fully faded out. */
const FADE_END = 82 * DEG
const FADE_START = 64 * DEG

type CylinderCarouselProps = Omit<React.ComponentProps<"div">, "children" | "onChange"> & {
  children: React.ReactNode
  /** Items fully in view; the next one each side peeks in at the edge. */
  visibleItems?: number
  /** Item height as a multiple of its width. */
  aspectRatio?: number
  /** Item width in px. Defaults to filling the arc between neighbours. */
  itemWidth?: number
  /** Items rolled per item-width dragged. */
  dragSpeed?: number
  /** Controlled active index. */
  index?: number
  defaultIndex?: number
  onIndexChange?: (index: number) => void
  /** Show previous / next buttons under the stage. */
  controls?: boolean
  /** Accessible name for the carousel region. */
  label?: string
}

function wrap(i: number, count: number) {
  return ((Math.round(i) % count) + count) % count
}

function CylinderItem({
  rotation,
  index,
  count,
  step,
  radius,
  width,
  height,
  active,
  onSelect,
  children,
}: {
  rotation: MotionValue<number>
  index: number
  count: number
  step: number
  radius: number
  width: number
  height: number
  active: boolean
  onSelect: (index: number) => void
  children: React.ReactNode
}) {
  // Shortest signed distance (in items) from the front, so the ring loops.
  const offset = useTransform(rotation, (r) => {
    let o = index - r
    o -= Math.round(o / count) * count
    return o
  })
  // On the inside wall: the front item is the far wall, edges come toward
  // the camera and turn to face the middle.
  const transform = useTransform(offset, (o) => {
    const theta = Math.max(-100 * DEG, Math.min(100 * DEG, o * step))
    const x = radius * Math.sin(theta)
    const z = radius * (1 - Math.cos(theta))
    return `translate3d(${x}px, 0, ${z}px) rotateY(${-theta}rad)`
  })
  const opacity = useTransform(offset, (o) => {
    const t = Math.abs(o * step)
    if (t <= FADE_START) return 1
    return Math.max(0, 1 - (t - FADE_START) / (FADE_END - FADE_START))
  })
  const zIndex = useTransform(offset, (o) => Math.round(Math.abs(o) * 10))
  const visibility = useTransform(opacity, (v) => (v <= 0.01 ? "hidden" : "visible"))
  const shade = useTransform(offset, (o) => Math.min(0.35, Math.abs(o * step) / (FADE_END * 2.4)))

  return (
    <motion.div
      role="group"
      aria-roledescription="slide"
      aria-label={`${index + 1} of ${count}`}
      aria-hidden={!active || undefined}
      data-slot="cylinder-carousel-item"
      data-active={active ? "" : undefined}
      onClick={() => onSelect(index)}
      style={{
        transform,
        opacity,
        zIndex,
        visibility,
        width,
        height,
        marginLeft: -width / 2,
        marginTop: -height / 2,
      }}
      className="absolute top-1/2 left-1/2 overflow-hidden rounded-2xl bg-card shadow-raised [backface-visibility:hidden]"
    >
      {children}
      <motion.div
        aria-hidden
        style={{ opacity: shade }}
        className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/10 to-black/40"
      />
    </motion.div>
  )
}

function CylinderCarousel({
  children,
  visibleItems = 5,
  aspectRatio = 1.25,
  itemWidth,
  dragSpeed = 1.2,
  index: indexProp,
  defaultIndex = 0,
  onIndexChange,
  controls = true,
  label = "Carousel",
  className,
  ...props
}: CylinderCarouselProps) {
  const reduce = useReducedMotion() ?? false
  const items = React.Children.toArray(children)
  const count = items.length

  const stageRef = React.useRef<HTMLDivElement>(null)
  const [stageWidth, setStageWidth] = React.useState(640)
  React.useEffect(() => {
    const el = stageRef.current
    if (!el) return
    const observer = new ResizeObserver(([entry]) => setStageWidth(entry.contentRect.width))
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Geometry: the outermost fully visible items sit at ~56° on the wall.
  const halfVisible = Math.max(1, (visibleItems - 1) / 2)
  const step = Math.min((56 * DEG) / halfVisible, (2 * Math.PI) / Math.max(count, 1))
  const radius = (stageWidth / 2) * 0.78
  const perspective = radius * 2.1
  const chord = 2 * radius * Math.sin(step / 2)
  const width = Math.round(itemWidth ?? Math.max(48, chord * 0.86))
  const height = Math.round(width * aspectRatio)

  const [uncontrolled, setUncontrolled] = React.useState(defaultIndex)
  const active = wrap(indexProp ?? uncontrolled, Math.max(count, 1))
  // Start the ring on the controlled index when there is one, not defaultIndex.
  const rotation = useMotionValue(wrap(indexProp ?? defaultIndex, Math.max(count, 1)))
  const animation = React.useRef<AnimationPlaybackControls | null>(null)

  const reported = React.useRef(wrap(indexProp ?? defaultIndex, Math.max(count, 1)))
  const report = React.useCallback(
    (next: number) => {
      if (count === 0) return
      const wrapped = wrap(next, count)
      if (indexProp === undefined) setUncontrolled(wrapped)
      if (wrapped !== reported.current) {
        reported.current = wrapped
        onIndexChange?.(wrapped)
      }
    },
    [count, indexProp, onIndexChange]
  )

  const settleTo = React.useCallback(
    (target: number, velocity = 0) => {
      animation.current?.stop()
      if (reduce) rotation.set(target)
      else animation.current = animate(rotation, target, { ...glide, velocity })
      report(target)
    },
    [reduce, rotation, report]
  )

  // Shortest path to a given index from wherever the ring currently sits.
  const goTo = React.useCallback(
    (i: number) => {
      const current = Math.round(rotation.get())
      let delta = i - wrap(current, count)
      delta -= Math.round(delta / count) * count
      settleTo(current + delta)
    },
    [rotation, count, settleTo]
  )

  // Follow a controlled index set from outside.
  React.useEffect(() => {
    if (indexProp === undefined || count === 0) return
    const wanted = wrap(indexProp, count)
    if (wanted !== reported.current) {
      reported.current = wanted
      goTo(wanted)
    }
  }, [indexProp, count, goTo])

  // Keep the active index current while the ring rolls under a drag or flick.
  useMotionValueEvent(rotation, "change", (r) => {
    if (drag.current) report(r)
  })

  /* Drag */
  const drag = React.useRef<{ x: number; start: number; t: number; v: number; moved: boolean } | null>(null)
  const suppressClick = React.useRef(false)
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return
    animation.current?.stop()
    suppressClick.current = false
    drag.current = { x: e.clientX, start: rotation.get(), t: performance.now(), v: 0, moved: false }
  }
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current
    if (!d) return
    const dx = e.clientX - d.x
    if (!d.moved && Math.abs(dx) > 4) {
      // Capture only once it is a drag, so plain clicks still reach items.
      d.moved = true
      e.currentTarget.setPointerCapture(e.pointerId)
    }
    if (!d.moved) return
    const next = d.start - (dx / width) * dragSpeed
    const now = performance.now()
    const dt = Math.max(1, now - d.t)
    d.v = ((next - rotation.get()) / dt) * 1000
    d.t = now
    rotation.set(next)
  }
  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current
    drag.current = null
    if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId)
    if (!d || !d.moved) return
    suppressClick.current = true
    // Stale velocity if the pointer rested before release.
    const velocity = performance.now() - d.t > 80 ? 0 : d.v
    const projected = rotation.get() + Math.max(-5, Math.min(5, velocity * 0.25))
    settleTo(Math.round(projected), velocity)
  }
  // Swallow the click that ends a drag so it doesn't select an item.
  const onClickCapture = (e: React.MouseEvent) => {
    if (!suppressClick.current) return
    suppressClick.current = false
    e.stopPropagation()
  }

  /* Wheel (horizontal trackpad swipes, or shift + wheel) */
  const wheelTimer = React.useRef<number | null>(null)
  React.useEffect(() => {
    const el = stageRef.current
    if (!el) return
    const onWheel = (e: WheelEvent) => {
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.shiftKey ? e.deltaY : 0
      if (!delta) return
      e.preventDefault()
      animation.current?.stop()
      rotation.set(rotation.get() + (delta / width) * 0.6)
      if (wheelTimer.current) window.clearTimeout(wheelTimer.current)
      wheelTimer.current = window.setTimeout(() => settleTo(Math.round(rotation.get())), 120)
    }
    el.addEventListener("wheel", onWheel, { passive: false })
    return () => el.removeEventListener("wheel", onWheel)
  }, [rotation, width, settleTo])

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const base = Math.round(rotation.get())
    if (e.key === "ArrowRight") settleTo(base + 1)
    else if (e.key === "ArrowLeft") settleTo(base - 1)
    else if (e.key === "Home") goTo(0)
    else if (e.key === "End") goTo(count - 1)
    else return
    e.preventDefault()
  }

  if (count === 0) return null

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      data-slot="cylinder-carousel"
      className={cn("flex w-full flex-col items-center gap-4", className)}
      {...props}
    >
      <div
        ref={stageRef}
        role="group"
        tabIndex={0}
        aria-label={`${label}, use arrow keys to rotate`}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onClickCapture={onClickCapture}
        data-slot="cylinder-carousel-stage"
        style={{ height: height * 1.45, perspective, perspectiveOrigin: "50% 50%" }}
        className="relative w-full cursor-grab touch-pan-y overflow-hidden rounded-3xl outline-none select-none focus-visible:ring-3 focus-visible:ring-ring active:cursor-grabbing [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
      >
        <div className="absolute inset-0 [transform-style:preserve-3d]">
          {items.map((child, i) => (
            <CylinderItem
              key={i}
              rotation={rotation}
              index={i}
              count={count}
              step={step}
              radius={radius}
              width={width}
              height={height}
              active={i === active}
              onSelect={goTo}
            >
              {child}
            </CylinderItem>
          ))}
        </div>
      </div>
      {controls && (
        <div className="flex items-center gap-3" data-slot="cylinder-carousel-controls">
          <CarouselButton label="Previous" onClick={() => settleTo(Math.round(rotation.get()) - 1)}>
            <ChevronLeftIcon size={16} />
          </CarouselButton>
          <span aria-live="polite" className="min-w-12 text-center text-xs text-muted-foreground tabular-nums">
            {active + 1} / {count}
          </span>
          <CarouselButton label="Next" onClick={() => settleTo(Math.round(rotation.get()) + 1)}>
            <ChevronRightIcon size={16} />
          </CarouselButton>
        </div>
      )}
    </div>
  )
}

function CarouselButton({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="inline-flex size-9 cursor-pointer items-center justify-center rounded-full bg-secondary text-secondary-foreground shadow-raised transition-[box-shadow,background-color,scale] duration-150 ease-out outline-none hover:bg-accent hover:shadow-raised-hover focus-visible:ring-3 focus-visible:ring-ring active:scale-96"
    >
      {children}
    </button>
  )
}

export { CylinderCarousel, type CylinderCarouselProps }
