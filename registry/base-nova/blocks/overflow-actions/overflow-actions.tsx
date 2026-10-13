"use client"

import * as React from "react"
import { Toolbar } from "@base-ui/react/toolbar"
import { AnimatePresence, motion, useReducedMotion, type Transition } from "motion/react"

import { MoreHorizontalIcon, XIcon } from "@/components/icons"
import { cn } from "@/lib/utils"

export type OverflowActionItem = {
  id: string
  label: React.ReactNode
  icon?: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  /** Accessible name when the item is icon-only. */
  ariaLabel?: string
  /** Render without the visible label (needs ariaLabel). */
  iconOnly?: boolean
  destructive?: boolean
}

export type OverflowActionsProps = {
  primaryActions: OverflowActionItem[]
  overflowActions: OverflowActionItem[]
  expanded?: boolean
  defaultExpanded?: boolean
  onExpandedChange?: (expanded: boolean) => void
  onAction?: (item: OverflowActionItem) => void
  /** Fold the extra actions away after one of them runs. */
  collapseOnAction?: boolean
  size?: "sm" | "md"
  openLabel?: string
  closeLabel?: string
  "aria-label"?: string
  className?: string
}

// Softer than the usual layout spring so the extra group stays visibly attached to the toggle as it grows.
const SHELL: Transition = { type: "spring", stiffness: 240, damping: 22, mass: 0.85 }

const sizes = {
  sm: { rail: "gap-1 p-1", action: "h-8 min-w-8 gap-1.5 px-3 text-xs [&_svg]:size-3.5", toggle: "size-8 [&_svg]:size-3.5" },
  md: { rail: "gap-1.5 p-1.5", action: "h-9 min-w-9 gap-2 px-3.5 text-sm [&_svg]:size-4", toggle: "size-9 [&_svg]:size-4" },
}

const actionClass =
  "relative inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full font-medium whitespace-nowrap outline-none transition-[background-color,color,box-shadow] duration-150 select-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset data-disabled:pointer-events-none data-disabled:opacity-45"

export function OverflowActions({
  primaryActions,
  overflowActions,
  expanded: expandedProp,
  defaultExpanded = false,
  onExpandedChange,
  onAction,
  collapseOnAction = false,
  size = "md",
  openLabel = "More actions",
  closeLabel = "Fewer actions",
  "aria-label": ariaLabel = "Actions",
  className,
}: OverflowActionsProps) {
  const reduce = useReducedMotion()
  const groupId = React.useId()
  const toggleRef = React.useRef<HTMLButtonElement>(null)
  const [internal, setInternal] = React.useState(defaultExpanded)
  const expanded = expandedProp ?? internal
  const s = sizes[size]

  const setExpanded = (next: boolean) => {
    if (expandedProp === undefined) setInternal(next)
    if (next !== expanded) onExpandedChange?.(next)
  }

  const run = (item: OverflowActionItem, fromOverflow: boolean) => {
    item.onClick?.()
    onAction?.(item)
    if (fromOverflow && collapseOnAction) {
      setExpanded(false)
      toggleRef.current?.focus()
    }
  }

  const renderAction = (item: OverflowActionItem, fromOverflow: boolean) => (
    <Toolbar.Button
      key={item.id}
      disabled={item.disabled}
      aria-label={item.ariaLabel}
      onClick={() => run(item, fromOverflow)}
      className={cn(
        actionClass,
        s.action,
        item.iconOnly && "px-0",
        item.destructive
          ? "text-destructive hover:bg-destructive/10"
          : fromOverflow
            ? "text-muted-foreground hover:bg-muted hover:text-foreground"
            : "bg-secondary bg-linear-to-b from-white/5 to-transparent text-secondary-foreground shadow-raised hover:shadow-raised-hover active:shadow-pressed"
      )}
    >
      {item.icon}
      {!item.iconOnly && item.label}
    </Toolbar.Button>
  )

  return (
    <Toolbar.Root
      aria-label={ariaLabel}
      data-slot="overflow-actions"
      data-expanded={expanded || undefined}
      onKeyDown={(e) => {
        if (e.key === "Escape" && expanded) {
          e.stopPropagation()
          setExpanded(false)
          toggleRef.current?.focus()
        }
      }}
      className={cn(
        "inline-flex max-w-full items-center rounded-full bg-card bg-linear-to-b from-white/5 to-transparent text-card-foreground shadow-raised",
        s.rail,
        className
      )}
    >
      {primaryActions.map((item) => renderAction(item, false))}

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="overflow"
            id={groupId}
            role="group"
            aria-label="Extra actions"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "auto", opacity: 1 }}
            exit={{ width: 0, opacity: 0, transition: reduce ? { duration: 0 } : { ...SHELL, stiffness: 320, damping: 32 } }}
            transition={reduce ? { duration: 0 } : SHELL}
            className="flex shrink-0 items-center overflow-hidden"
          >
            <span aria-hidden className="mx-1 h-5 w-px shrink-0 bg-border" />
            {overflowActions.map((item, i) => (
              <motion.span
                key={item.id}
                className="inline-flex shrink-0"
                initial={reduce ? false : { opacity: 0, x: -6, filter: "blur(4px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(4px)" }}
                transition={reduce ? { duration: 0 } : { duration: 0.22, ease: [0.22, 1, 0.36, 1], delay: 0.04 + i * 0.035 }}
              >
                {renderAction(item, true)}
              </motion.span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <Toolbar.Button
        ref={toggleRef}
        aria-expanded={expanded}
        aria-controls={expanded ? groupId : undefined}
        aria-label={expanded ? closeLabel : openLabel}
        onClick={() => setExpanded(!expanded)}
        className={cn(
          actionClass,
          s.toggle,
          "text-muted-foreground hover:bg-muted hover:text-foreground",
          expanded && "bg-muted text-foreground shadow-well"
        )}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={expanded ? "close" : "more"}
            initial={reduce ? { opacity: 0 } : { opacity: 0, rotate: -90, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, rotate: 90, scale: 0.6 }}
            transition={reduce ? { duration: 0.1 } : { type: "spring", stiffness: 500, damping: 30 }}
            className="inline-flex"
          >
            {expanded ? <XIcon /> : <MoreHorizontalIcon />}
          </motion.span>
        </AnimatePresence>
      </Toolbar.Button>
    </Toolbar.Root>
  )
}
