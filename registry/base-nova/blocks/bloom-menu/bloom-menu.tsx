"use client"

import * as React from "react"
import { AnimatePresence, motion, useReducedMotion, type Transition } from "motion/react"

import { PlusIcon, XIcon } from "@/components/icons"
import { cn } from "@/lib/utils"

export type BloomMenuItem = {
  id: string
  label: string
  icon: React.ReactNode
  disabled?: boolean
}

export type BloomMenuProps = {
  items: BloomMenuItem[]
  onSelect?: (item: BloomMenuItem) => void
  /** Trigger label. */
  label?: React.ReactNode
  /** Trigger icon. */
  icon?: React.ReactNode
  /** Heading inside the open panel. */
  title?: React.ReactNode
  columns?: number
  /** Width of the open panel in px. */
  panelWidth?: number
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  className?: string
}

// A touch of overshoot as the panel grows out of the trigger.
const MORPH: Transition = { type: "spring", stiffness: 320, damping: 30, mass: 0.85 }
const TRIGGER = { width: 112, height: 40 }
const HEADER = 44
const CELL = 76
const GAP = 6
const PAD = 8

export function BloomMenu({
  items,
  onSelect,
  label = "New",
  icon = <PlusIcon />,
  title = "Create new",
  columns = 3,
  panelWidth = 320,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  className,
}: BloomMenuProps) {
  const reduce = useReducedMotion()
  const menuId = React.useId()
  const rootRef = React.useRef<HTMLDivElement>(null)
  const triggerRef = React.useRef<HTMLButtonElement>(null)
  const itemRefs = React.useRef<(HTMLButtonElement | null)[]>([])
  const restoreFocus = React.useRef(false)
  const [internal, setInternal] = React.useState(defaultOpen)
  const open = openProp ?? internal

  const setOpen = React.useCallback(
    (next: boolean, focusTrigger = false) => {
      restoreFocus.current = !next && focusTrigger
      if (openProp === undefined) setInternal(next)
      onOpenChange?.(next)
    },
    [openProp, onOpenChange]
  )

  const rows = Math.max(1, Math.ceil(items.length / columns))
  const panel = { width: panelWidth, height: HEADER + PAD * 2 + rows * CELL + (rows - 1) * GAP }

  // Outside press closes.
  React.useEffect(() => {
    if (!open) return
    const onPointer = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false)
    }
    window.addEventListener("pointerdown", onPointer, true)
    return () => window.removeEventListener("pointerdown", onPointer, true)
  }, [open, setOpen])

  // Focus the first item once the bloom has started; give focus back to the trigger on keyboard close.
  React.useEffect(() => {
    if (open) {
      const t = window.setTimeout(() => itemRefs.current.find((n) => n && !n.disabled)?.focus(), reduce ? 0 : 120)
      return () => window.clearTimeout(t)
    }
    if (restoreFocus.current) {
      restoreFocus.current = false
      requestAnimationFrame(() => triggerRef.current?.focus())
    }
  }, [open, reduce])

  const centre = { r: (rows - 1) / 2, c: (Math.min(columns, items.length) - 1) / 2 }

  const onGridKeyDown = (e: React.KeyboardEvent) => {
    const current = itemRefs.current.findIndex((n) => n === document.activeElement)
    let next = current
    if (e.key === "ArrowRight") next = current + 1
    else if (e.key === "ArrowLeft") next = current - 1
    else if (e.key === "ArrowDown") next = current + columns
    else if (e.key === "ArrowUp") next = current - columns
    else if (e.key === "Home") next = 0
    else if (e.key === "End") next = items.length - 1
    else if (e.key === "Escape") {
      e.preventDefault()
      setOpen(false, true)
      return
    } else if (e.key === "Tab") {
      setOpen(false)
      return
    } else return
    e.preventDefault()
    if (next < 0 || next >= items.length) return
    itemRefs.current[next]?.focus()
  }

  return (
    <div
      ref={rootRef}
      data-slot="bloom-menu"
      data-open={open || undefined}
      className={cn("relative inline-flex", className)}
      style={TRIGGER}
    >
      <motion.div
        initial={false}
        animate={open ? panel : TRIGGER}
        transition={reduce ? { duration: 0.15 } : MORPH}
        style={{ borderRadius: 20 }}
        className={cn(
          "absolute top-1/2 left-1/2 z-30 -translate-x-1/2 -translate-y-1/2 overflow-hidden bg-popover text-popover-foreground transition-shadow duration-200",
          open ? "shadow-surface" : "shadow-raised hover:shadow-raised-hover"
        )}
      >
        <AnimatePresence initial={false}>
          {open ? (
            <motion.div
              key="panel"
              id={menuId}
              role="menu"
              aria-label={typeof title === "string" ? title : undefined}
              initial={reduce ? { opacity: 0 } : { clipPath: "circle(0% at 50% 50%)", opacity: 0.4 }}
              animate={reduce ? { opacity: 1 } : { clipPath: "circle(75% at 50% 50%)", opacity: 1 }}
              exit={reduce ? { opacity: 0 } : { clipPath: "circle(0% at 50% 50%)", opacity: 0, transition: { duration: 0.2 } }}
              transition={reduce ? { duration: 0.12 } : { duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              style={panel}
              onKeyDown={onGridKeyDown}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <div className="flex items-center justify-between pr-2 pl-4" style={{ height: HEADER }}>
                <span className="text-sm font-semibold tracking-tight">{title}</span>
                <button
                  type="button"
                  aria-label="Close menu"
                  tabIndex={-1}
                  onClick={() => setOpen(false, true)}
                  className="inline-flex size-7 items-center justify-center rounded-full text-muted-foreground outline-none hover:bg-muted hover:text-foreground"
                >
                  <XIcon size={14} />
                </button>
              </div>
              <div
                className="grid px-2"
                style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`, gap: GAP }}
              >
                {items.map((item, i) => {
                  const r = Math.floor(i / columns)
                  const c = i % columns
                  const dist = Math.hypot(r - centre.r, c - centre.c)
                  return (
                    <motion.button
                      key={item.id}
                      ref={(node) => {
                        itemRefs.current[i] = node
                      }}
                      type="button"
                      role="menuitem"
                      disabled={item.disabled}
                      tabIndex={-1}
                      onClick={() => {
                        onSelect?.(item)
                        setOpen(false, true)
                      }}
                      initial={reduce ? false : { opacity: 0, scale: 0.6, filter: "blur(4px)" }}
                      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                      transition={
                        reduce
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 420, damping: 26, delay: 0.06 + dist * 0.05 }
                      }
                      style={{ height: CELL }}
                      className="group flex flex-col items-center justify-center gap-2 rounded-xl text-xs font-medium text-muted-foreground outline-none hover:bg-muted hover:text-foreground focus-visible:bg-muted focus-visible:text-foreground focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-45"
                    >
                      <span className="inline-flex size-9 items-center justify-center rounded-xl bg-card text-foreground shadow-raised transition-transform duration-200 group-hover:-translate-y-0.5 group-active:translate-y-0 group-active:scale-96 [&_svg]:size-4.5">
                        {item.icon}
                      </span>
                      {item.label}
                    </motion.button>
                  )
                })}
              </div>
            </motion.div>
          ) : (
            <motion.button
              key="trigger"
              ref={triggerRef}
              type="button"
              aria-haspopup="menu"
              aria-expanded={false}
              onClick={() => setOpen(true)}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") {
                  e.preventDefault()
                  setOpen(true)
                }
              }}
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.85, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.1 } }}
              transition={reduce ? { duration: 0.12 } : { type: "spring", stiffness: 420, damping: 30, delay: 0.05 }}
              style={TRIGGER}
              className="absolute top-1/2 left-1/2 inline-flex -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-1.5 rounded-[20px] text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset [&_svg]:size-4"
            >
              {icon}
              {label}
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
