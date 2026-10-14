"use client"

import * as React from "react"
import {
  animate,
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type PanInfo,
} from "motion/react"

import { cn } from "@/lib/utils"

/** Which rail is revealed: "right" = actions on the right edge (row swiped left). */
type SwipeSide = "left" | "right"
type SwipeTone = "neutral" | "primary" | "success" | "warning" | "destructive"

type SwipeAction = {
  id: string
  label: string
  icon: React.ReactNode
  tone?: SwipeTone
  disabled?: boolean
  onAction?: (item: SwipeableListItem) => void
}

type SwipeableListItem = {
  id: string
  title: React.ReactNode
  description?: React.ReactNode
  meta?: React.ReactNode
  leading?: React.ReactNode
  /** Revealed by swiping right; the first one is committed by a full swipe. */
  leftActions?: SwipeAction[]
  /** Revealed by swiping left; the last one is committed by a full swipe. */
  rightActions?: SwipeAction[]
  disabled?: boolean
}

type SwipeableListOpen = { id: string; side: SwipeSide } | null

type SwipeableListProps = {
  items: SwipeableListItem[]
  /** The row that is swiped open, if any. Only one row is open at a time. */
  open?: SwipeableListOpen
  defaultOpen?: SwipeableListOpen
  onOpenChange?: (open: SwipeableListOpen) => void
  onAction?: (payload: { item: SwipeableListItem; action: SwipeAction; side: SwipeSide }) => void
  /** Width of one action button in px. Default 76. */
  actionWidth?: number
  /** Swiping past this share of the row width commits the edge action. Default 0.55; false disables. */
  fullSwipe?: number | false
  "aria-label"?: string
  className?: string
  renderItem?: (item: SwipeableListItem) => React.ReactNode
}

const toneClass: Record<SwipeTone, string> = {
  neutral: "bg-secondary text-secondary-foreground",
  primary: "bg-primary text-primary-foreground",
  success: "bg-success text-white",
  warning: "bg-warning text-black/80",
  destructive: "bg-destructive text-white",
}

const SNAP = { type: "spring", duration: 0.42, bounce: 0.18 } as const

type RowProps = {
  item: SwipeableListItem
  openSide: SwipeSide | null
  onOpen: (side: SwipeSide | null) => void
  onCommit: (action: SwipeAction, side: SwipeSide) => void
  actionWidth: number
  fullSwipe: number | false
  renderItem?: (item: SwipeableListItem) => React.ReactNode
}

function SwipeRow({ item, openSide, onOpen, onCommit, actionWidth, fullSwipe, renderItem }: RowProps) {
  const reduceMotion = useReducedMotion()
  const rowRef = React.useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const left = item.disabled ? [] : (item.leftActions ?? [])
  const right = item.disabled ? [] : (item.rightActions ?? [])
  const leftWidth = left.length * actionWidth
  const rightWidth = right.length * actionWidth
  const [armed, setArmed] = React.useState<SwipeSide | null>(null)
  const [committing, setCommitting] = React.useState(false)
  // The click that ends a drag must not toggle the row.
  const dragged = React.useRef(false)

  const leftRail = useTransform(x, (v) => Math.max(0, v))
  const rightRail = useTransform(x, (v) => Math.max(0, -v))

  const snapTo = React.useCallback(
    (target: number) => animate(x, target, reduceMotion ? { duration: 0 } : SNAP),
    [reduceMotion, x]
  )

  // Follow the open state (also when another row opens and this one should close).
  React.useEffect(() => {
    if (committing) return
    snapTo(openSide === "left" ? leftWidth : openSide === "right" ? -rightWidth : 0)
  }, [openSide, leftWidth, rightWidth, snapTo, committing])

  const width = () => rowRef.current?.offsetWidth ?? 320
  const edgeAction = (side: SwipeSide) => (side === "left" ? left[0] : right[right.length - 1])
  const armedFor = (offset: number): SwipeSide | null => {
    if (fullSwipe === false) return null
    const side: SwipeSide = offset > 0 ? "left" : "right"
    const action = edgeAction(side)
    return action && !action.disabled && Math.abs(offset) > width() * fullSwipe ? side : null
  }

  const commit = async (action: SwipeAction, side: SwipeSide) => {
    setCommitting(true)
    await snapTo(side === "left" ? width() : -width())
    onCommit(action, side)
    setArmed(null)
    setCommitting(false)
  }

  const onDrag = () => {
    const next = armedFor(x.get())
    if (next !== armed) setArmed(next)
  }

  const onDragEnd = (_: unknown, info: PanInfo) => {
    setTimeout(() => {
      dragged.current = false
    }, 0)
    const current = x.get()
    const full = armedFor(current)
    setArmed(null)
    if (full) {
      void commit(edgeAction(full)!, full)
      return
    }
    // Decide from position, nudged by a quick flick.
    const projected = current + info.velocity.x * 0.12
    const target: SwipeSide | null =
      leftWidth && projected > leftWidth / 2 ? "left" : rightWidth && projected < -rightWidth / 2 ? "right" : null
    snapTo(target === "left" ? leftWidth : target === "right" ? -rightWidth : 0)
    if (target !== openSide) onOpen(target)
  }

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.target !== event.currentTarget) return
    if (event.key === "ArrowLeft") {
      event.preventDefault()
      onOpen(openSide === "left" ? null : rightWidth ? "right" : null)
    } else if (event.key === "ArrowRight") {
      event.preventDefault()
      onOpen(openSide === "right" ? null : leftWidth ? "left" : null)
    } else if (event.key === "Escape" && openSide) {
      event.preventDefault()
      onOpen(null)
    }
  }

  const rail = (side: SwipeSide, actions: SwipeAction[]) => {
    if (!actions.length) return null
    const isOpen = openSide === side
    const isArmed = armed === side
    const edgeId = edgeAction(side)?.id
    return (
      <motion.div
        aria-hidden={!isOpen}
        data-slot="swipeable-list-rail"
        style={{ width: side === "left" ? leftRail : rightRail }}
        className={cn("absolute inset-y-0 flex overflow-hidden", side === "left" ? "left-0" : "right-0 flex-row-reverse")}
      >
        {(side === "left" ? actions : [...actions].reverse()).map((action) => {
          const hidden = isArmed && action.id !== edgeId
          return (
            <button
              key={action.id}
              type="button"
              tabIndex={isOpen ? 0 : -1}
              disabled={action.disabled}
              onClick={() => void commit(action, side)}
              className={cn(
                "relative flex shrink-0 cursor-pointer flex-col items-center justify-center gap-1 overflow-hidden text-[0.7rem] font-medium outline-none",
                "transition-[flex-grow,opacity,width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:ring-3 focus-visible:ring-ring focus-visible:ring-inset disabled:opacity-50",
                "[&_svg]:size-4.5",
                toneClass[action.tone ?? "neutral"],
                isArmed && action.id === edgeId ? "grow" : "grow-0",
                hidden && "opacity-0"
              )}
              style={{ width: hidden ? 0 : actionWidth, minWidth: hidden ? 0 : undefined }}
            >
              <motion.span
                className="flex"
                animate={reduceMotion ? undefined : { scale: isArmed && action.id === edgeId ? 1.15 : 1 }}
                transition={SNAP}
              >
                {action.icon}
              </motion.span>
              {action.label}
            </button>
          )
        })}
      </motion.div>
    )
  }

  const hasActions = leftWidth > 0 || rightWidth > 0
  const hint = [rightWidth ? "Left arrow for actions" : "", leftWidth ? "Right arrow for more actions" : ""]
    .filter(Boolean)
    .join(", ")

  return (
    <div ref={rowRef} role="listitem" data-slot="swipeable-list-item" className="relative isolate overflow-hidden rounded-2xl bg-muted shadow-well">
      {rail("left", left)}
      {rail("right", right)}
      <motion.div
        tabIndex={item.disabled ? -1 : 0}
        aria-description={hasActions ? hint : undefined}
        aria-disabled={item.disabled || undefined}
        drag={hasActions ? "x" : false}
        dragDirectionLock
        dragConstraints={{ left: -rightWidth, right: leftWidth }}
        dragElastic={{ left: right.length ? 0.6 : 0.08, right: left.length ? 0.6 : 0.08 }}
        dragMomentum={false}
        onDragStart={() => {
          dragged.current = true
        }}
        onDrag={onDrag}
        onDragEnd={onDragEnd}
        onKeyDown={onKeyDown}
        onClick={() => !dragged.current && openSide && onOpen(null)}
        style={{ x }}
        data-slot="swipeable-list-surface"
        className={cn(
          "relative z-10 flex touch-pan-y items-center gap-3 rounded-2xl bg-card px-3.5 py-3 text-card-foreground shadow-raised outline-none select-none",
          "focus-visible:ring-3 focus-visible:ring-ring",
          hasActions && "cursor-grab active:cursor-grabbing",
          item.disabled && "opacity-60"
        )}
      >
        {renderItem ? (
          renderItem(item)
        ) : (
          <>
            {item.leading && <div className="flex shrink-0">{item.leading}</div>}
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-medium">{item.title}</div>
              {item.description && <div className="truncate text-[0.8rem] text-muted-foreground">{item.description}</div>}
            </div>
            {item.meta && <div className="shrink-0 self-start text-xs text-muted-foreground tabular-nums">{item.meta}</div>}
          </>
        )}
      </motion.div>
    </div>
  )
}

/**
 * Mobile-style list: swipe a row to reveal actions on either edge, swipe all the way to
 * commit the edge action. Keyboard: focus a row, ←/→ reveal its actions, Tab into them,
 * Escape closes.
 */
function SwipeableList({
  items,
  open: openProp,
  defaultOpen = null,
  onOpenChange,
  onAction,
  actionWidth = 76,
  fullSwipe = 0.55,
  "aria-label": ariaLabel,
  className,
  renderItem,
}: SwipeableListProps) {
  const reduceMotion = useReducedMotion()
  const listRef = React.useRef<HTMLDivElement>(null)
  const [uncontrolled, setUncontrolled] = React.useState<SwipeableListOpen>(defaultOpen)
  const open = openProp !== undefined ? openProp : uncontrolled

  const setOpen = React.useCallback(
    (next: SwipeableListOpen) => {
      if (openProp === undefined) setUncontrolled(next)
      onOpenChange?.(next)
    },
    [onOpenChange, openProp]
  )

  // Tapping anywhere outside the list closes the open row.
  React.useEffect(() => {
    if (!open) return
    const onPointerDown = (event: PointerEvent) => {
      if (!listRef.current?.contains(event.target as Node)) setOpen(null)
    }
    document.addEventListener("pointerdown", onPointerDown)
    return () => document.removeEventListener("pointerdown", onPointerDown)
  }, [open, setOpen])

  return (
    <div ref={listRef} role="list" aria-label={ariaLabel} data-slot="swipeable-list" className={cn("flex flex-col gap-2", className)}>
      <AnimatePresence initial={false}>
        {items.map((item) => (
          <motion.div
            key={item.id}
            layout={!reduceMotion}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, height: 0, marginTop: -8 }}
            transition={{ type: "spring", duration: 0.4, bounce: 0 }}
            className="overflow-visible"
          >
            <SwipeRow
              item={item}
              openSide={open?.id === item.id ? open.side : null}
              onOpen={(side) => setOpen(side ? { id: item.id, side } : open?.id === item.id ? null : open)}
              onCommit={(action, side) => {
                if (open?.id === item.id) setOpen(null)
                action.onAction?.(item)
                onAction?.({ item, action, side })
              }}
              actionWidth={actionWidth}
              fullSwipe={fullSwipe}
              renderItem={renderItem}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export { SwipeableList }
export type { SwipeableListItem, SwipeableListOpen, SwipeableListProps, SwipeAction, SwipeSide, SwipeTone }
