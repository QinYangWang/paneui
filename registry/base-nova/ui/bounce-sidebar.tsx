"use client"

import * as React from "react"
import { arc, useAnimate, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

/*
 * A vertical nav whose active marker is a small raised dot. When the
 * destination changes the dot hops to the new row along a curved spring path
 * (motion `arc()`), bulging out into its own gutter, away from the labels.
 * Short hops are quick and tight; long jumps get a slightly softer, heavier
 * spring so they read as a leap rather than a teleport.
 */

type BounceSidebarItem = {
  id: string
  label: React.ReactNode
  icon?: React.ReactNode
  /** Optional trailing content (count, kbd, badge). */
  meta?: React.ReactNode
  href?: string
  target?: React.HTMLAttributeAnchorTarget
  rel?: string
  disabled?: boolean
}

type BounceSidebarProps = Omit<React.ComponentProps<"nav">, "onChange"> & {
  items: BounceSidebarItem[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  /** Accessible name of the navigation landmark. */
  label?: string
  /** Show the faint inset track the dot travels along. */
  track?: boolean
  itemClassName?: string
  dotClassName?: string
}

const DOT = 8
const HOP = { type: "spring", stiffness: 300, damping: 19, mass: 0.32 } as const
// arc() bends in proportion to distance; cap the bulge so a long jump peaks
// at ~16px instead of swinging out of the sidebar.
const MAX_STRENGTH = 0.28
const MAX_BULGE = 34

function BounceSidebar({
  items,
  value,
  defaultValue,
  onValueChange,
  label = "Sidebar",
  track = true,
  className,
  itemClassName,
  dotClassName,
  ...props
}: BounceSidebarProps) {
  const reduce = useReducedMotion() ?? false
  const [internal, setInternal] = React.useState(defaultValue ?? items[0]?.id ?? "")
  const requested = value ?? internal
  const selected = items.some((i) => i.id === requested) ? requested : (items[0]?.id ?? "")

  const listRef = React.useRef<HTMLUListElement>(null)
  const rows = React.useRef(new Map<string, HTMLLIElement>())
  const placed = React.useRef(false)
  const lastY = React.useRef(0)
  const lastId = React.useRef(selected)
  const [dot, animate] = useAnimate<HTMLSpanElement>()
  // One arc per direction, kept for the component's life so its continuity
  // closure survives re-renders (a fresh arc() has no memory).
  const paths = React.useRef<Record<string, ReturnType<typeof arc>>>({})

  const targetY = React.useCallback((id: string) => {
    const row = rows.current.get(id)
    return row ? row.offsetTop + (row.offsetHeight - DOT) / 2 : null
  }, [])

  const snap = React.useCallback(() => {
    const y = targetY(lastId.current)
    if (y === null || !dot.current) return
    animate(dot.current, { x: 0, y, opacity: 1 }, { duration: 0 })
    lastY.current = y
    placed.current = true
  }, [animate, dot, targetY])

  React.useLayoutEffect(() => {
    const y = targetY(selected)
    if (y === null || !dot.current) return
    const moved = lastId.current !== selected
    lastId.current = selected
    if (!placed.current || !moved || reduce) {
      snap()
      return
    }
    const distance = y - lastY.current
    const travel = Math.abs(distance)
    const long = Math.min(1, Math.max(0, (travel - 48) / 140))
    const strength = Math.min(MAX_STRENGTH, MAX_BULGE / Math.max(travel, 1))
    // relative to the direction of travel: both directions bulge to screen-left
    const direction = distance > 0 ? "ccw" : "cw"
    const key = `${direction}-${strength.toFixed(3)}`
    paths.current[key] ??= arc({ strength, direction })
    lastY.current = y
    animate(
      dot.current,
      { x: 0, y },
      {
        ...HOP,
        stiffness: HOP.stiffness - 70 * long,
        damping: HOP.damping + 1.5 * long,
        mass: HOP.mass + 0.18 * long,
        path: paths.current[key],
      }
    )
  }, [animate, dot, reduce, selected, snap, targetY])

  React.useLayoutEffect(() => {
    const list = listRef.current
    if (!list || typeof ResizeObserver === "undefined") return
    const ro = new ResizeObserver(snap)
    ro.observe(list)
    return () => ro.disconnect()
  }, [snap])

  const select = (id: string) => {
    if (value === undefined) setInternal(id)
    onValueChange?.(id)
  }

  return (
    <nav data-slot="bounce-sidebar" aria-label={label} className={cn("relative w-56", className)} {...props}>
      <ul ref={listRef} className="relative flex list-none flex-col gap-0.5 pl-7">
        <li aria-hidden role="presentation" className="pointer-events-none absolute inset-y-0 left-0 w-7">
          {track && (
            <span
              data-slot="bounce-sidebar-track"
              className="absolute inset-y-2 left-[13px] w-0.5 rounded-full bg-muted shadow-well"
            />
          )}
          <span
            ref={dot}
            data-slot="bounce-sidebar-dot"
            style={{ width: DOT, height: DOT, opacity: 0 }}
            className={cn(
              "absolute top-0 left-[10px] rounded-full bg-primary shadow-primary",
              dotClassName
            )}
          />
        </li>

        {items.map((item) => {
          const active = item.id === selected
          const content = (
            <>
              {item.icon && (
                <span aria-hidden className="grid shrink-0 place-items-center [&_svg]:size-4">
                  {item.icon}
                </span>
              )}
              <span className="min-w-0 flex-1 truncate">{item.label}</span>
              {item.meta != null && (
                <span className="shrink-0 text-xs text-muted-foreground tabular-nums">{item.meta}</span>
              )}
            </>
          )
          const cls = cn(
            "flex min-h-9 w-full cursor-pointer items-center gap-2.5 rounded-xl px-2.5 text-left text-sm font-medium outline-none select-none",
            "transition-[color,background-color] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)]",
            "hover:bg-muted/60 focus-visible:ring-3 focus-visible:ring-ring",
            active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
            item.disabled && "pointer-events-none opacity-45",
            itemClassName
          )

          return (
            <li
              key={item.id}
              ref={(node) => {
                if (node) rows.current.set(item.id, node)
                else rows.current.delete(item.id)
              }}
            >
              {item.href ? (
                <a
                  data-slot="bounce-sidebar-item"
                  data-active={active || undefined}
                  href={item.href}
                  target={item.target}
                  rel={item.rel ?? (item.target === "_blank" ? "noreferrer noopener" : undefined)}
                  aria-current={active ? "page" : undefined}
                  aria-disabled={item.disabled || undefined}
                  tabIndex={item.disabled ? -1 : undefined}
                  onClick={(e) => {
                    if (item.disabled) return e.preventDefault()
                    select(item.id)
                  }}
                  className={cls}
                >
                  {content}
                </a>
              ) : (
                <button
                  type="button"
                  data-slot="bounce-sidebar-item"
                  data-active={active || undefined}
                  disabled={item.disabled}
                  aria-current={active ? "page" : undefined}
                  onClick={() => select(item.id)}
                  className={cls}
                >
                  {content}
                </button>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export { BounceSidebar }
export type { BounceSidebarItem, BounceSidebarProps }
