"use client"

import * as React from "react"
import { AnimatePresence, LayoutGroup, motion, Reorder, useReducedMotion, type Transition } from "motion/react"

import { XIcon } from "@/components/icons"
import { cn } from "@/lib/utils"

type MorphingTabsItem = {
  id: string
  label: string
  icon?: React.ReactNode
  content: React.ReactNode
  disabled?: boolean
}

type MorphingTabsProps = {
  items: MorphingTabsItem[]
  value?: string | null
  defaultValue?: string | null
  onValueChange?: (id: string | null) => void
  /** Called once after a drag or keyboard (Alt + ←/→) reorder settles. */
  onOrderChange?: (ids: string[]) => void
  /** Shows a close button on each tab and enables Delete/Backspace to close. */
  onClose?: (id: string) => void
  /** Allow dragging tabs to reorder them. Default true. */
  reorderable?: boolean
  "aria-label"?: string
  className?: string
  contentClassName?: string
}

const SURFACE: Transition = { type: "spring", duration: 0.5, bounce: 0.14 }

/** Keep the user's order for ids that still exist, append ids that are new. */
function reconcile(order: string[], ids: string[]) {
  const known = new Set(ids)
  const kept = order.filter((id) => known.has(id))
  const seen = new Set(kept)
  return [...kept, ...ids.filter((id) => !seen.has(id))]
}

/** Callback ref that tracks an element's height while it is mounted. */
function useMeasuredHeight<T extends HTMLElement>() {
  const [height, setHeight] = React.useState<number | null>(null)
  const observer = React.useRef<ResizeObserver | null>(null)
  const ref = React.useCallback((el: T | null) => {
    observer.current?.disconnect()
    observer.current = null
    if (!el) return
    setHeight(el.offsetHeight)
    observer.current = new ResizeObserver(() => setHeight(el.offsetHeight))
    observer.current.observe(el)
  }, [])
  return [ref, height] as const
}

const sameOrder = (a: string[], b: string[]) => a.length === b.length && a.every((id, i) => id === b[i])

/**
 * Reorderable tab rail. The selected tab is part of the content surface: its raised
 * card glides between tabs (and follows them while they are dragged) and joins the
 * panel below, which morphs its height to each tab's content.
 */
function MorphingTabs({
  items,
  value: valueProp,
  defaultValue,
  onValueChange,
  onOrderChange,
  onClose,
  reorderable = true,
  "aria-label": ariaLabel = "Tabs",
  className,
  contentClassName,
}: MorphingTabsProps) {
  const reduceMotion = useReducedMotion()
  const uid = React.useId()
  const ids = items.map((item) => item.id)
  const byId = new Map(items.map((item) => [item.id, item]))

  const [rawOrder, setRawOrder] = React.useState(ids)
  const order = reconcile(rawOrder, ids)
  const orderRef = React.useRef(order)
  orderRef.current = order
  const [contentRef, contentHeight] = useMeasuredHeight<HTMLDivElement>()
  const [uncontrolled, setUncontrolled] = React.useState<string | null>(
    defaultValue !== undefined ? defaultValue : (items.find((item) => !item.disabled)?.id ?? null)
  )
  const value = valueProp !== undefined ? valueProp : uncontrolled
  const active = value != null ? byId.get(value) : undefined

  const setValue = (next: string | null) => {
    if (valueProp === undefined) setUncontrolled(next)
    onValueChange?.(next)
  }

  // Direction for the content slide, from rail positions.
  const prevIndex = React.useRef(active ? order.indexOf(active.id) : -1)
  const activeIndex = active ? order.indexOf(active.id) : -1
  const direction = activeIndex >= prevIndex.current ? 1 : -1
  React.useEffect(() => {
    prevIndex.current = activeIndex
  }, [activeIndex])

  const tabRefs = React.useRef(new Map<string, HTMLButtonElement | null>())
  const dragging = React.useRef(false)
  const orderAtDragStart = React.useRef<string[]>(order)
  const [focusId, setFocusId] = React.useState<string | null>(null)
  const pendingFocus = React.useRef<string | null>(null)

  React.useEffect(() => {
    if (!pendingFocus.current) return
    tabRefs.current.get(pendingFocus.current)?.focus()
    pendingFocus.current = null
  })

  const close = (id: string) => {
    if (!onClose) return
    if (id === value) {
      const i = order.indexOf(id)
      const rest = order.filter((o) => o !== id && !byId.get(o)?.disabled)
      const next = rest[Math.min(i, rest.length - 1)] ?? null
      setValue(next)
      if (next) pendingFocus.current = next
    }
    onClose(id)
  }

  const move = (id: string, delta: number) => {
    const i = order.indexOf(id)
    const j = i + delta
    if (j < 0 || j >= order.length) return
    const next = [...order]
    next.splice(i, 1)
    next.splice(j, 0, id)
    setRawOrder(next)
    pendingFocus.current = id
    onOrderChange?.(next)
  }

  const enabled = order.filter((id) => !byId.get(id)?.disabled)
  const onKeyDown = (event: React.KeyboardEvent, id: string) => {
    if (event.altKey && reorderable && (event.key === "ArrowLeft" || event.key === "ArrowRight")) {
      event.preventDefault()
      move(id, event.key === "ArrowLeft" ? -1 : 1)
      return
    }
    if (onClose && (event.key === "Delete" || event.key === "Backspace")) {
      event.preventDefault()
      close(id)
      return
    }
    const pos = enabled.indexOf(id)
    let to: string | undefined
    if (event.key === "ArrowRight") to = enabled[(pos + 1) % enabled.length]
    else if (event.key === "ArrowLeft") to = enabled[(pos - 1 + enabled.length) % enabled.length]
    else if (event.key === "Home") to = enabled[0]
    else if (event.key === "End") to = enabled[enabled.length - 1]
    if (!to) return
    event.preventDefault()
    setValue(to)
    tabRefs.current.get(to)?.focus()
  }

  const rovingId = active?.id ?? focusId ?? enabled[0]
  const panelId = `${uid}-panel`

  return (
    <LayoutGroup id={uid}>
      <div data-slot="morphing-tabs" className={cn("flex w-full flex-col", className)}>
        <Reorder.Group
          as="div"
          axis="x"
          values={order}
          onReorder={(next: string[]) => setRawOrder(next)}
          role="tablist"
          aria-label={ariaLabel}
          aria-orientation="horizontal"
          data-slot="morphing-tabs-rail"
          className="relative z-10 flex items-end gap-1 overflow-x-auto overflow-y-hidden px-5 pt-1 [scrollbar-width:none]"
        >
          {order.map((id) => {
            const item = byId.get(id)
            if (!item) return null
            const selected = id === active?.id
            return (
              <Reorder.Item
                key={id}
                as="div"
                value={id}
                role="presentation"
                drag={reorderable && !item.disabled ? "x" : false}
                dragElastic={0.12}
                whileDrag={reduceMotion ? undefined : { scale: 1.03 }}
                onDragStart={() => {
                  dragging.current = true
                  orderAtDragStart.current = orderRef.current
                }}
                onDragEnd={() => {
                  // Let the click that ends a drag be ignored.
                  requestAnimationFrame(() => {
                    dragging.current = false
                  })
                  if (!sameOrder(orderAtDragStart.current, orderRef.current)) onOrderChange?.(orderRef.current)
                }}
                transition={reduceMotion ? { duration: 0 } : SURFACE}
                className={cn("group/tab relative shrink-0 touch-pan-y", selected ? "z-10" : "z-0")}
              >
                {selected && (
                  <motion.span
                    aria-hidden
                    layoutId="morphing-tabs-surface"
                    transition={reduceMotion ? { duration: 0 } : SURFACE}
                    className="absolute inset-0 rounded-t-xl bg-card"
                  >
                    {/* Soft concave feet so the tab flows into the panel below. */}
                    <span className="absolute bottom-0 -left-2 size-2 bg-[radial-gradient(circle_at_0_0,transparent_0.5rem,var(--card)_calc(0.5rem+0.5px))]" />
                    <span className="absolute -right-2 bottom-0 size-2 bg-[radial-gradient(circle_at_100%_0,transparent_0.5rem,var(--card)_calc(0.5rem+0.5px))]" />
                  </motion.span>
                )}
                <div className="relative flex items-center">
                  <button
                    ref={(el) => {
                      tabRefs.current.set(id, el)
                    }}
                    id={`${uid}-tab-${id}`}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-controls={selected ? panelId : undefined}
                    aria-keyshortcuts={reorderable ? "Alt+ArrowLeft Alt+ArrowRight" : undefined}
                    disabled={item.disabled}
                    tabIndex={id === rovingId ? 0 : -1}
                    data-active={selected || undefined}
                    onFocus={() => setFocusId(id)}
                    onClick={() => {
                      if (dragging.current) return
                      setValue(id)
                    }}
                    onKeyDown={(event) => onKeyDown(event, id)}
                    className={cn(
                      "flex h-9 cursor-pointer items-center gap-1.5 rounded-t-xl pl-3 text-sm font-medium whitespace-nowrap text-muted-foreground outline-none select-none",
                      "transition-colors duration-200 hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring focus-visible:ring-inset disabled:pointer-events-none disabled:opacity-40",
                      "data-active:text-card-foreground [&_svg]:size-4 [&_svg]:shrink-0",
                      onClose ? "pr-1.5" : "pr-3",
                      reorderable && "active:cursor-grabbing"
                    )}
                  >
                    {item.icon && (
                      <span aria-hidden className="flex">
                        {item.icon}
                      </span>
                    )}
                    {item.label}
                  </button>
                  {onClose && (
                    <button
                      type="button"
                      tabIndex={-1}
                      aria-label={`Close ${item.label}`}
                      onPointerDownCapture={(event) => event.stopPropagation()}
                      onClick={() => close(id)}
                      className={cn(
                        "mr-1.5 flex size-5 cursor-pointer items-center justify-center rounded-full text-muted-foreground opacity-0 transition-[opacity,background-color,color] duration-150 group-hover/tab:opacity-100 hover:bg-muted hover:text-foreground focus-visible:opacity-100",
                        selected && "opacity-100"
                      )}
                    >
                      <XIcon size={12} />
                    </button>
                  )}
                </div>
              </Reorder.Item>
            )
          })}
        </Reorder.Group>

        <motion.div
          animate={{ height: contentHeight ?? "auto" }}
          transition={reduceMotion ? { duration: 0 } : SURFACE}
          data-slot="morphing-tabs-content"
          className={cn(
            "relative -mt-px overflow-hidden rounded-2xl bg-card text-card-foreground shadow-surface",
            contentClassName
          )}
        >
          <div ref={contentRef} className="relative">
            <AnimatePresence initial={false} mode="popLayout" custom={direction}>
              {active ? (
                <motion.div
                  key={active.id}
                  id={panelId}
                  role="tabpanel"
                  aria-labelledby={`${uid}-tab-${active.id}`}
                  tabIndex={0}
                  custom={direction}
                  variants={{
                    enter: (d: number) => (reduceMotion ? { opacity: 0 } : { opacity: 0, x: d * 24, filter: "blur(4px)" }),
                    center: { opacity: 1, x: 0, filter: "blur(0px)" },
                    exit: (d: number) => (reduceMotion ? { opacity: 0 } : { opacity: 0, x: d * -24, filter: "blur(4px)" }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={reduceMotion ? { duration: 0.12 } : { type: "spring", duration: 0.4, bounce: 0 }}
                  className="p-5 outline-none focus-visible:ring-3 focus-visible:ring-ring focus-visible:ring-inset"
                >
                  {active.content}
                </motion.div>
              ) : (
                <motion.p
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-5 text-sm text-muted-foreground"
                >
                  No tab selected.
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </LayoutGroup>
  )
}

export { MorphingTabs }
export type { MorphingTabsItem, MorphingTabsProps }
