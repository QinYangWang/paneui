"use client"

import * as React from "react"
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react"

import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/registry/base-nova/ui/tooltip"

type DockContextValue = {
  mouseX: MotionValue<number>
  size: number
  magnification: number
  distance: number
  reduce: boolean
  pillId: string
  side: "top" | "bottom"
}

const DockContext = React.createContext<DockContextValue | null>(null)

function useDock() {
  const ctx = React.useContext(DockContext)
  if (!ctx) throw new Error("DockItem must be used within <Dock>")
  return ctx
}

type DockProps = React.ComponentProps<"div"> & {
  /** Resting item size in px. */
  size?: number
  /** Item size in px directly under the pointer. */
  magnification?: number
  /** Pointer distance in px over which neighbours grow. */
  distance?: number
  /** Which side tooltips open on. */
  tooltipSide?: "top" | "bottom"
}

/**
 * macOS-style dock. Items magnify toward the pointer, the active item carries a
 * gliding raised pill, and every item has a tooltip. Renders as a toolbar.
 */
function Dock({
  size = 44,
  magnification = 64,
  distance = 140,
  tooltipSide = "top",
  className,
  style,
  children,
  onMouseMove,
  onMouseLeave,
  "aria-label": ariaLabel = "Dock",
  ...props
}: DockProps) {
  const mouseX = useMotionValue(Infinity)
  const reduce = useReducedMotion() ?? false
  const pillId = React.useId()
  const ctx = React.useMemo(
    () => ({ mouseX, size, magnification, distance, reduce, pillId, side: tooltipSide }),
    [mouseX, size, magnification, distance, reduce, pillId, tooltipSide]
  )

  return (
    <DockContext.Provider value={ctx}>
      <TooltipProvider delay={120} closeDelay={0}>
        <div
          data-slot="dock"
          role="toolbar"
          aria-orientation="horizontal"
          aria-label={ariaLabel}
          onMouseMove={(e) => {
            mouseX.set(e.clientX)
            onMouseMove?.(e)
          }}
          onMouseLeave={(e) => {
            mouseX.set(Infinity)
            onMouseLeave?.(e)
          }}
          style={{ height: size + 16, ...style }}
          className={cn(
            "inline-flex w-fit items-end gap-1.5 rounded-[1.375rem] bg-popover/85 bg-linear-to-b from-white/6 to-transparent px-2 pb-2 text-popover-foreground shadow-surface backdrop-blur-xl",
            className
          )}
          {...props}
        >
          {children}
        </div>
      </TooltipProvider>
    </DockContext.Provider>
  )
}

/** Visually groups items; separate groups with DockSeparator. */
function DockGroup({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="dock-group" role="group" className={cn("flex items-end gap-1.5", className)} {...props} />
}

function DockSeparator({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dock-separator"
      role="separator"
      aria-orientation="vertical"
      className={cn("mx-0.5 mb-1.5 h-7 w-px shrink-0 self-end rounded-full bg-border", className)}
      {...props}
    />
  )
}

type DockItemProps = Omit<React.ComponentProps<"button">, "children" | "style"> & {
  /** Tooltip text and accessible name. */
  label: string
  /** Marks the item with the gliding pill and an indicator dot. */
  active?: boolean
  /** Optional element rendered instead of a <button> (e.g. <a href> or a router Link). */
  render?: React.ReactElement
  /** Usually an icon; it scales with the item. */
  children: React.ReactNode
}

function DockItem({ label, active, className, children, render, ...props }: DockItemProps) {
  const { mouseX, size, magnification, distance, reduce, pillId, side } = useDock()
  const ref = React.useRef<HTMLDivElement>(null)

  const offset = useTransform(mouseX, (x) => {
    const el = ref.current
    if (!el || !Number.isFinite(x)) return distance * 2
    const rect = el.getBoundingClientRect()
    return x - (rect.left + rect.width / 2)
  })
  const target = useTransform(offset, [-distance, 0, distance], [size, magnification, size], { clamp: true })
  const spring = useSpring(target, { mass: 0.12, stiffness: 180, damping: 14 })
  const width = reduce ? size : spring

  return (
    <motion.div
      ref={ref}
      data-slot="dock-item-wrapper"
      style={{ width, height: width }}
      className="relative shrink-0"
    >
      <Tooltip>
        <TooltipTrigger
          data-slot="dock-item"
          data-active={active ? "" : undefined}
          aria-label={label}
          aria-current={active ? "page" : undefined}
          render={render}
          className={cn(
            "group/dock-item relative isolate flex size-full cursor-pointer items-center justify-center rounded-[32%] text-foreground/80 transition-[background-color,color,box-shadow] duration-150 outline-none select-none hover:bg-muted/70 hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring active:shadow-pressed disabled:pointer-events-none disabled:opacity-50 data-active:text-foreground [&_svg]:size-[46%] [&_svg]:shrink-0",
            className
          )}
          {...props}
        >
          {active && (
            <motion.span
              aria-hidden
              layoutId={pillId}
              transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 32, mass: 0.6 }}
              className="absolute inset-0 -z-10 rounded-[32%] bg-secondary bg-linear-to-b from-white/8 to-transparent shadow-raised"
            />
          )}
          {children}
        </TooltipTrigger>
        <TooltipContent side={side} sideOffset={10}>
          {label}
        </TooltipContent>
      </Tooltip>
      {active && (
        <motion.span
          aria-hidden
          layoutId={`${pillId}-dot`}
          transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 32, mass: 0.6 }}
          className="absolute inset-x-0 -bottom-1.5 mx-auto size-1 rounded-full bg-primary"
        />
      )}
    </motion.div>
  )
}

export { Dock, DockGroup, DockItem, DockSeparator }
export type { DockProps, DockItemProps }
