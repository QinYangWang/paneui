"use client"

import * as React from "react"
import { Toolbar } from "@base-ui/react/toolbar"
import { LayoutGroup, motion, useReducedMotion, type Transition } from "motion/react"

import { cn } from "@/lib/utils"

export type ExpandableActionBarItem = {
  id: string
  label: React.ReactNode
  icon: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  /** Small count or dot on the icon. */
  badge?: React.ReactNode
  /** Keyboard hint shown next to the label while expanded (display only). */
  shortcut?: React.ReactNode
}

export type ExpandableActionBarProps = {
  items: ExpandableActionBarItem[]
  expanded?: boolean
  defaultExpanded?: boolean
  onExpandedChange?: (expanded: boolean) => void
  /** Item that carries the gliding active highlight. */
  activeId?: string
  onAction?: (item: ExpandableActionBarItem) => void
  size?: "sm" | "md"
  /**
   * Expand while a mouse rests on the bar (default true). Also sets the touch behaviour: with no hover,
   * the first tap expands the bar and the second one acts. Set false to make every press act at once.
   */
  expandOnHover?: boolean
  expandOnFocus?: boolean
  /** ms to wait after the pointer leaves before collapsing. */
  collapseDelay?: number
  "aria-label"?: string
  className?: string
}

const LABEL: Transition = { type: "spring", stiffness: 400, damping: 34, mass: 0.7 }
const GLIDE: Transition = { type: "spring", stiffness: 460, damping: 36, mass: 0.6 }

const sizes = {
  sm: { bar: "gap-0.5 p-1", item: "h-7 min-w-7 px-1.5 text-xs", icon: "[&_svg]:size-3.5" },
  md: { bar: "gap-1 p-1.5", item: "h-9 min-w-9 px-2.5 text-sm", icon: "[&_svg]:size-4" },
}

export function ExpandableActionBar({
  items,
  expanded: expandedProp,
  defaultExpanded = false,
  onExpandedChange,
  activeId,
  onAction,
  size = "md",
  expandOnHover = true,
  expandOnFocus = true,
  collapseDelay = 120,
  "aria-label": ariaLabel = "Actions",
  className,
}: ExpandableActionBarProps) {
  const reduce = useReducedMotion()
  const groupId = React.useId()
  const rootRef = React.useRef<HTMLDivElement>(null)
  const [internal, setInternal] = React.useState(defaultExpanded)
  const expanded = expandedProp ?? internal
  const timer = React.useRef<number | null>(null)
  const pointerType = React.useRef<string | null>(null)
  const hovering = React.useRef(false)
  const focused = React.useRef(false)
  const s = sizes[size]

  const setExpanded = React.useCallback(
    (next: boolean) => {
      if (timer.current !== null) {
        window.clearTimeout(timer.current)
        timer.current = null
      }
      if (expandedProp === undefined) setInternal(next)
      if (next !== expanded) onExpandedChange?.(next)
    },
    [expandedProp, expanded, onExpandedChange]
  )

  const scheduleCollapse = () => {
    if (timer.current !== null) window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => {
      timer.current = null
      if (!hovering.current && !focused.current) setExpanded(false)
    }, collapseDelay)
  }

  React.useEffect(() => () => {
    if (timer.current !== null) window.clearTimeout(timer.current)
  }, [])

  // After a touch expanded the bar, a press anywhere else folds it back.
  React.useEffect(() => {
    if (!expanded || expandedProp !== undefined) return
    const onPointer = (e: PointerEvent) => {
      if (e.pointerType === "mouse") return
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        focused.current = false
        setExpanded(false)
      }
    }
    window.addEventListener("pointerdown", onPointer, true)
    return () => window.removeEventListener("pointerdown", onPointer, true)
  }, [expanded, expandedProp, setExpanded])

  return (
    <Toolbar.Root
      ref={rootRef}
      aria-label={ariaLabel}
      data-slot="expandable-action-bar"
      data-expanded={expanded || undefined}
      onPointerDown={(e) => {
        pointerType.current = e.pointerType
      }}
      onKeyDown={(e) => {
        pointerType.current = null
        if (e.key === "Escape" && expanded) setExpanded(false)
      }}
      onPointerEnter={(e) => {
        if (!expandOnHover || e.pointerType !== "mouse") return
        hovering.current = true
        setExpanded(true)
      }}
      onPointerLeave={(e) => {
        if (e.pointerType !== "mouse") return
        hovering.current = false
        scheduleCollapse()
      }}
      onFocus={(e) => {
        // Pointer presses focus the button too; only keyboard (focus-visible) focus expands.
        if (!expandOnFocus || !e.target.matches(":focus-visible")) return
        focused.current = true
        setExpanded(true)
      }}
      onBlur={(e) => {
        if (e.currentTarget.contains(e.relatedTarget as Node | null)) return
        focused.current = false
        scheduleCollapse()
      }}
      className={cn(
        "inline-flex items-center rounded-full bg-card bg-linear-to-b from-white/5 to-transparent text-card-foreground shadow-raised",
        s.bar,
        className
      )}
    >
      <LayoutGroup id={groupId}>
        {items.map((item) => {
          const active = item.id === activeId
          return (
            <Toolbar.Button
              key={item.id}
              disabled={item.disabled}
              data-active={active || undefined}
              aria-pressed={activeId !== undefined ? active : undefined}
              onClick={() => {
                if (expandOnHover && !expanded && pointerType.current === "touch") {
                  setExpanded(true)
                  return
                }
                item.onClick?.()
                onAction?.(item)
              }}
              className={cn(
                "relative inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full font-medium whitespace-nowrap text-muted-foreground outline-none transition-colors duration-150 select-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring data-active:text-foreground data-disabled:pointer-events-none data-disabled:opacity-45",
                s.item,
                s.icon
              )}
            >
              {active && (
                <motion.span
                  layoutId="active"
                  aria-hidden
                  transition={reduce ? { duration: 0 } : GLIDE}
                  className="absolute inset-0 rounded-full bg-muted shadow-well"
                />
              )}
              <span className="relative inline-flex items-center justify-center">
                {item.icon}
                {item.badge != null && (
                  <span className="absolute -top-1.5 -right-2 inline-flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-primary px-1 text-[0.6rem] leading-none font-semibold text-primary-foreground tabular-nums shadow-primary">
                    {item.badge}
                  </span>
                )}
              </span>
              <motion.span
                initial={false}
                animate={
                  expanded
                    ? { width: "auto", opacity: 1, marginLeft: 6, filter: "blur(0px)" }
                    : { width: 0, opacity: 0, marginLeft: 0, filter: reduce ? "blur(0px)" : "blur(3px)" }
                }
                transition={reduce ? { duration: 0 } : LABEL}
                className="relative inline-flex items-center gap-1.5 overflow-hidden"
              >
                {item.label}
                {item.shortcut && (
                  <kbd className="inline-flex h-4.5 items-center rounded-md bg-background/60 px-1 font-sans text-[0.65rem] text-muted-foreground shadow-chip">
                    {item.shortcut}
                  </kbd>
                )}
              </motion.span>
            </Toolbar.Button>
          )
        })}
      </LayoutGroup>
    </Toolbar.Root>
  )
}
