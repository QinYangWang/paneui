"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

type ResizableDirection = "horizontal" | "vertical"

/** A size is a percentage of the group (`24`) or a pixel string (`"240px"`). */
type ResizableSize = number | `${number}px`

type PanelConfig = {
  id: string
  defaultSize?: ResizableSize
  minSize: ResizableSize
  maxSize: ResizableSize
  collapsible: boolean
  collapsedSize: ResizableSize
  onCollapsedChange?: (collapsed: boolean) => void
}

type ResizablePanelGroupHandle = {
  /** Current sizes in percent, in panel order. */
  getSizes: () => number[]
  setSizes: (sizes: number[]) => void
  collapse: (id: string) => void
  expand: (id: string) => void
  /** Collapse an expanded panel or expand a collapsed one. */
  toggle: (id: string) => void
  isCollapsed: (id: string) => boolean
  /** Back to every panel's `defaultSize`. */
  reset: () => void
}

type GroupContextValue = {
  direction: ResizableDirection
  sizes: number[]
  collapsed: Record<string, boolean>
  dragging: number | null
  panels: PanelConfig[]
  startDrag: (handleIndex: number, event: React.PointerEvent) => void
  nudge: (handleIndex: number, deltaPercent: number) => void
  toggleNear: (handleIndex: number) => void
  reset: () => void
}

const GroupContext = React.createContext<GroupContextValue | null>(null)
const IndexContext = React.createContext<number>(-1)

function useGroup(part: string) {
  const ctx = React.useContext(GroupContext)
  if (!ctx) throw new Error(`${part} must be used inside <ResizablePanelGroup>`)
  return ctx
}

/** The surrounding group's imperative API, for buttons inside the group (a collapse toggle in a header). */
function useResizableGroup() {
  const ctx = useGroup("useResizableGroup")
  return {
    sizes: ctx.sizes,
    isCollapsed: (id: string) => !!ctx.collapsed[id],
    reset: ctx.reset,
  }
}

const PANEL = Symbol.for("qy.resizable.panel")
const HANDLE = Symbol.for("qy.resizable.handle")

type Tagged = { $$resizable?: symbol }

function kindOf(node: React.ReactNode): "panel" | "handle" | null {
  if (!React.isValidElement(node)) return null
  const tag = (node.type as Tagged).$$resizable
  return tag === PANEL ? "panel" : tag === HANDLE ? "handle" : null
}

function readPanel(el: React.ReactElement, index: number): PanelConfig {
  const p = el.props as ResizablePanelProps
  return {
    id: p.id ?? `panel-${index}`,
    defaultSize: p.defaultSize,
    minSize: p.minSize ?? 0,
    maxSize: p.maxSize ?? 100,
    collapsible: !!p.collapsible,
    collapsedSize: p.collapsedSize ?? 0,
    onCollapsedChange: p.onCollapsedChange,
  }
}

function toPercent(size: ResizableSize, groupPx: number) {
  if (typeof size === "number") return size
  const px = parseFloat(size)
  return groupPx > 0 ? (px / groupPx) * 100 : 0
}

function defaultSizes(panels: PanelConfig[], groupPx: number) {
  const known = panels.map((p) => (p.defaultSize === undefined ? null : toPercent(p.defaultSize, groupPx)))
  const used = known.reduce<number>((s, v) => s + (v ?? 0), 0)
  const free = known.filter((v) => v === null).length
  const fill = free > 0 ? Math.max(0, 100 - used) / free : 0
  const sizes = known.map((v) => v ?? fill)
  const total = sizes.reduce((s, v) => s + v, 0) || 1
  return sizes.map((v) => (v / total) * 100)
}

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))
/** Round away float noise: a size like -3e-15 is an invalid flex-grow and would be ignored by the browser. */
const clean = (sizes: number[]) => sizes.map((v) => Math.max(0, Math.round(v * 1000) / 1000))

/* -------------------------------------------------------------------------- */
/*  ResizablePanelGroup                                                       */
/* -------------------------------------------------------------------------- */

type ResizablePanelGroupProps = Omit<React.ComponentProps<"div">, "dir"> & {
  direction?: ResizableDirection
  /** Persists sizes and collapsed state in `localStorage["resizable:<autoSaveId>"]`. */
  autoSaveId?: string
  /** Called with the sizes (percent) whenever a drag, a key press or a collapse settles. */
  onLayout?: (sizes: number[]) => void
  /** Imperative API: collapse / expand / toggle a panel by id, read or set sizes. */
  handleRef?: React.Ref<ResizablePanelGroupHandle>
}

/**
 * Split panes with draggable dividers. Panels size in percent of the group (or
 * pixel strings for mins and defaults), resize live while dragging, collapse
 * past their minimum when `collapsible`, and can persist their layout.
 */
function ResizablePanelGroup({
  direction = "horizontal",
  autoSaveId,
  onLayout,
  handleRef,
  className,
  children,
  ...props
}: ResizablePanelGroupProps) {
  const rootRef = React.useRef<HTMLDivElement>(null)
  const childArray = React.Children.toArray(children)
  const panelEls = childArray.filter((c) => kindOf(c) === "panel") as React.ReactElement[]
  const panels = panelEls.map(readPanel)
  const panelsRef = React.useRef(panels)
  panelsRef.current = panels
  const signature = panels.map((p) => p.id).join("|")

  const groupPx = React.useCallback(() => {
    const el = rootRef.current
    if (!el) return 0
    return direction === "horizontal" ? el.offsetWidth : el.offsetHeight
  }, [direction])

  const [sizes, setSizesRaw] = React.useState<number[]>(() => defaultSizes(panels, 0))
  const setSizesState = React.useCallback((next: number[]) => setSizesRaw(clean(next)), [])
  const [collapsed, setCollapsed] = React.useState<Record<string, boolean>>({})
  const [dragging, setDragging] = React.useState<number | null>(null)
  const sizesRef = React.useRef(sizes)
  sizesRef.current = sizes
  const collapsedRef = React.useRef(collapsed)
  collapsedRef.current = collapsed
  // Size each collapsible panel had before it collapsed, to restore on expand.
  const restoreRef = React.useRef<Record<string, number>>({})
  const storageKey = autoSaveId ? `resizable:${autoSaveId}` : null

  const persist = React.useCallback(
    (next: number[], nextCollapsed: Record<string, boolean>) => {
      onLayout?.(next)
      if (!storageKey) return
      try {
        localStorage.setItem(
          storageKey,
          JSON.stringify({ ids: panelsRef.current.map((p) => p.id), sizes: next, collapsed: nextCollapsed, restore: restoreRef.current })
        )
      } catch {
        /* storage full or blocked */
      }
    },
    [storageKey, onLayout]
  )

  // Measure once mounted: pixel defaults need the group size, then restore any saved layout.
  React.useLayoutEffect(() => {
    const px = groupPx()
    let next = defaultSizes(panelsRef.current, px)
    let nextCollapsed: Record<string, boolean> = {}
    if (storageKey) {
      try {
        const saved = JSON.parse(localStorage.getItem(storageKey) ?? "null") as {
          ids: string[]
          sizes: number[]
          collapsed?: Record<string, boolean>
          restore?: Record<string, number>
        } | null
        if (saved && saved.ids.join("|") === signature && saved.sizes.length === next.length) {
          next = saved.sizes
          nextCollapsed = saved.collapsed ?? {}
          restoreRef.current = saved.restore ?? {}
        }
      } catch {
        /* ignore malformed storage */
      }
    }
    setSizesState(next)
    setCollapsed(nextCollapsed)
    // A restored layout can start with panels collapsed: tell their owners, so toggles that
    // only show while a panel is hidden (an "expand" button) appear after a reload too.
    for (const p of panelsRef.current) {
      if (p.id && nextCollapsed[p.id]) p.onCollapsedChange?.(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- re-run only when the set of panels changes
  }, [signature, storageKey])

  const limits = React.useCallback(
    (i: number) => {
      const p = panelsRef.current[i]
      const px = groupPx()
      return { min: toPercent(p.minSize, px), max: toPercent(p.maxSize, px), collapsed: toPercent(p.collapsedSize, px) }
    },
    [groupPx]
  )

  const setCollapsedFor = React.useCallback((id: string, value: boolean, base: Record<string, boolean>) => {
    if (!!base[id] === value) return base
    panelsRef.current.find((p) => p.id === id)?.onCollapsedChange?.(value)
    return { ...base, [id]: value }
  }, [])

  /** Move the divider after panel `i` so panel i grows by `delta` percent (negative shrinks). */
  const resizePair = React.useCallback(
    (start: number[], i: number, delta: number, startCollapsed: Record<string, boolean>) => {
      const a = limits(i)
      const b = limits(i + 1)
      const pa = panelsRef.current[i]
      const pb = panelsRef.current[i + 1]
      const pair = start[i] + start[i + 1]
      let nextA = start[i] + delta
      let nextCollapsed = startCollapsed
      // Collapse a collapsible panel when it is dragged well past its minimum.
      if (pa.collapsible && nextA < a.min / 2) {
        nextA = a.collapsed
        nextCollapsed = setCollapsedFor(pa.id, true, nextCollapsed)
      } else {
        nextCollapsed = setCollapsedFor(pa.id, false, nextCollapsed)
        nextA = clamp(nextA, a.min, a.max)
      }
      let nextB = pair - nextA
      if (pb.collapsible && nextB < b.min / 2) {
        nextB = b.collapsed
        nextA = pair - nextB
        nextCollapsed = setCollapsedFor(pb.id, true, nextCollapsed)
      } else {
        nextCollapsed = setCollapsedFor(pb.id, false, nextCollapsed)
        if (nextB < b.min || nextB > b.max) {
          nextB = clamp(nextB, b.min, b.max)
          nextA = pair - nextB
        }
      }
      const next = [...start]
      next[i] = nextA
      next[i + 1] = nextB
      return { next, nextCollapsed }
    },
    [limits, setCollapsedFor]
  )

  const startDrag = React.useCallback(
    (handleIndex: number, event: React.PointerEvent) => {
      if (event.button !== 0) return
      event.preventDefault()
      const target = event.currentTarget as HTMLElement
      target.setPointerCapture(event.pointerId)
      const origin = direction === "horizontal" ? event.clientX : event.clientY
      const start = [...sizesRef.current]
      const startCollapsed = collapsedRef.current
      const px = groupPx() || 1
      let latest = { next: start, nextCollapsed: startCollapsed }
      setDragging(handleIndex)
      const move = (e: PointerEvent) => {
        const pos = direction === "horizontal" ? e.clientX : e.clientY
        latest = resizePair(start, handleIndex, ((pos - origin) / px) * 100, startCollapsed)
        setSizesState(latest.next)
        setCollapsed(latest.nextCollapsed)
      }
      const up = () => {
        target.removeEventListener("pointermove", move)
        target.removeEventListener("pointerup", up)
        target.removeEventListener("pointercancel", up)
        setDragging(null)
        persist(latest.next, latest.nextCollapsed)
      }
      target.addEventListener("pointermove", move)
      target.addEventListener("pointerup", up)
      target.addEventListener("pointercancel", up)
    },
    [direction, groupPx, resizePair, persist, setSizesState]
  )

  const nudge = React.useCallback(
    (handleIndex: number, delta: number) => {
      const { next, nextCollapsed } = resizePair(sizesRef.current, handleIndex, delta, collapsedRef.current)
      setSizesState(next)
      setCollapsed(nextCollapsed)
      persist(next, nextCollapsed)
    },
    [resizePair, persist, setSizesState]
  )

  const collapseAt = React.useCallback(
    (i: number, value: boolean) => {
      const p = panelsRef.current[i]
      if (!p || !p.collapsible || !!collapsedRef.current[p.id] === value) return
      const cur = [...sizesRef.current]
      // Give the space to (or take it from) the nearest neighbour.
      const n = i + 1 < cur.length ? i + 1 : i - 1
      if (n < 0) return
      const lim = limits(i)
      let target: number
      if (value) {
        restoreRef.current[p.id] = cur[i]
        target = lim.collapsed
      } else {
        const fallback = p.defaultSize === undefined ? lim.min : toPercent(p.defaultSize, groupPx())
        target = clamp(restoreRef.current[p.id] ?? fallback, lim.min, lim.max)
      }
      const delta = target - cur[i]
      const nLim = limits(n)
      const nTarget = clamp(cur[n] - delta, nLim.min, nLim.max)
      cur[i] += cur[n] - nTarget
      cur[n] = nTarget
      const nextCollapsed = setCollapsedFor(p.id, value, collapsedRef.current)
      setSizesState(cur)
      setCollapsed(nextCollapsed)
      persist(cur, nextCollapsed)
    },
    [limits, groupPx, setCollapsedFor, persist, setSizesState]
  )

  const indexOf = (id: string) => panelsRef.current.findIndex((p) => p.id === id)

  const toggleNear = React.useCallback(
    (handleIndex: number) => {
      // Enter on a divider toggles the collapsible panel next to it, preferring the one before.
      const before = panelsRef.current[handleIndex]
      const target = before?.collapsible ? handleIndex : panelsRef.current[handleIndex + 1]?.collapsible ? handleIndex + 1 : -1
      if (target < 0) return
      collapseAt(target, !collapsedRef.current[panelsRef.current[target].id])
    },
    [collapseAt]
  )

  const reset = React.useCallback(() => {
    const next = defaultSizes(panelsRef.current, groupPx())
    setSizesState(next)
    setCollapsed({})
    persist(next, {})
  }, [groupPx, persist])

  React.useImperativeHandle(
    handleRef,
    () => ({
      getSizes: () => [...sizesRef.current],
      setSizes: (next) => {
        setSizesState(next)
        persist(next, collapsedRef.current)
      },
      collapse: (id) => collapseAt(indexOf(id), true),
      expand: (id) => collapseAt(indexOf(id), false),
      toggle: (id) => collapseAt(indexOf(id), !collapsedRef.current[id]),
      isCollapsed: (id) => !!collapsedRef.current[id],
      reset,
    }),
    [collapseAt, reset, persist]
  )

  const ctx = React.useMemo<GroupContextValue>(
    () => ({ direction, sizes, collapsed, dragging, panels, startDrag, nudge, toggleNear, reset }),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- panels are read through the signature
    [direction, sizes, collapsed, dragging, signature, startDrag, nudge, toggleNear, reset]
  )

  let panelIndex = 0
  let handleIndex = 0
  return (
    <GroupContext.Provider value={ctx}>
      <div
        ref={rootRef}
        data-slot="resizable-panel-group"
        data-direction={direction}
        data-dragging={dragging !== null || undefined}
        className={cn(
          "flex size-full min-h-0 min-w-0 overflow-hidden data-dragging:select-none",
          direction === "vertical" && "flex-col",
          className
        )}
        {...props}
      >
        {childArray.map((child) => {
          const kind = kindOf(child)
          if (kind === "panel") {
            const index = panelIndex++
            return (
              <IndexContext.Provider key={`p${index}`} value={index}>
                {child}
              </IndexContext.Provider>
            )
          }
          if (kind === "handle") {
            const index = handleIndex++
            return (
              <IndexContext.Provider key={`h${index}`} value={index}>
                {child}
              </IndexContext.Provider>
            )
          }
          return child
        })}
      </div>
    </GroupContext.Provider>
  )
}

/* -------------------------------------------------------------------------- */
/*  ResizablePanel                                                            */
/* -------------------------------------------------------------------------- */

type ResizablePanelProps = React.ComponentProps<"div"> & {
  /** Stable id, used by the imperative API and for persisted layouts. */
  id?: string
  /** Initial size; panels without one share the remaining space. */
  defaultSize?: ResizableSize
  minSize?: ResizableSize
  maxSize?: ResizableSize
  /** Dragging well past `minSize` (or calling `collapse`) snaps the panel to `collapsedSize`. */
  collapsible?: boolean
  collapsedSize?: ResizableSize
  onCollapsedChange?: (collapsed: boolean) => void
}

const PANEL_CONFIG_KEYS = ["defaultSize", "minSize", "maxSize", "collapsible", "collapsedSize", "onCollapsedChange"] as const

function ResizablePanel({ id, className, style, ...rest }: ResizablePanelProps) {
  // Sizing props are read by the group from the element; keep them off the DOM node.
  const props: Record<string, unknown> = { ...rest }
  for (const key of PANEL_CONFIG_KEYS) delete props[key]
  const ctx = useGroup("ResizablePanel")
  const index = React.useContext(IndexContext)
  const size = ctx.sizes[index] ?? 0
  const panelId = ctx.panels[index]?.id ?? id
  const isCollapsed = !!(panelId && ctx.collapsed[panelId])
  return (
    <div
      id={id}
      data-slot="resizable-panel"
      data-panel-id={panelId}
      data-collapsed={isCollapsed || undefined}
      className={cn(
        "relative min-h-0 min-w-0 overflow-hidden",
        // Collapsing and expanding ease; dragging follows the pointer exactly.
        ctx.dragging === null &&
          "transition-[flex-grow] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
        className
      )}
      style={{ flexGrow: size, flexShrink: 1, flexBasis: 0, ...style }}
      {...props}
    />
  )
}
;(ResizablePanel as Tagged).$$resizable = PANEL

/* -------------------------------------------------------------------------- */
/*  ResizableHandle                                                           */
/* -------------------------------------------------------------------------- */

type ResizableHandleProps = Omit<React.ComponentProps<"div">, "children"> & {
  /** `line`: 1px hairline (default). `hidden`: no line at rest (a sidebar edge); the guide still shows on hover and drag. */
  variant?: "line" | "hidden"
  /** Show a small grip in the middle of the divider. */
  withHandle?: boolean
  /** Percent moved per arrow key press (Shift = ×5). */
  keyboardStep?: number
}

/**
 * The divider between two panels: a 1px hairline with a wider hit area that
 * lights up while hovered or dragged. Arrow keys move it, Enter collapses the
 * collapsible neighbour, a double click resets the group.
 */
function ResizableHandle({ variant = "line", withHandle = false, keyboardStep = 2, className, ...props }: ResizableHandleProps) {
  const ctx = useGroup("ResizableHandle")
  const index = React.useContext(IndexContext)
  const horizontal = ctx.direction === "horizontal"
  const active = ctx.dragging === index
  const before = ctx.panels[index]
  return (
    <div
      role="separator"
      tabIndex={0}
      aria-orientation={horizontal ? "vertical" : "horizontal"}
      aria-valuenow={Math.round(ctx.sizes[index] ?? 0)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-controls={before?.id}
      data-slot="resizable-handle"
      data-direction={ctx.direction}
      data-active={active || undefined}
      data-variant={variant}
      onPointerDown={(e) => ctx.startDrag(index, e)}
      onDoubleClick={ctx.reset}
      onKeyDown={(e) => {
        const step = e.shiftKey ? keyboardStep * 5 : keyboardStep
        const back = horizontal ? "ArrowLeft" : "ArrowUp"
        const fwd = horizontal ? "ArrowRight" : "ArrowDown"
        if (e.key === back || e.key === fwd) {
          e.preventDefault()
          ctx.nudge(index, e.key === fwd ? step : -step)
        } else if (e.key === "Enter") {
          e.preventDefault()
          ctx.toggleNear(index)
        }
      }}
      className={cn(
        "group/handle relative z-10 flex shrink-0 touch-none items-center justify-center bg-border outline-none select-none data-[variant=hidden]:bg-transparent",
        horizontal ? "w-px cursor-col-resize" : "h-px cursor-row-resize",
        // Wide invisible hit area around the hairline.
        "after:absolute after:content-['']",
        horizontal ? "after:inset-y-0 after:-inset-x-1.5" : "after:inset-x-0 after:-inset-y-1.5",
        // A primary guide shows while hovered (after a beat), focused or dragged.
        "before:absolute before:bg-primary before:opacity-0 before:transition-opacity before:duration-150 before:content-['']",
        horizontal ? "before:inset-y-0 before:-inset-x-px" : "before:inset-x-0 before:-inset-y-px",
        "hover:before:opacity-100 hover:before:delay-150 focus-visible:before:opacity-100 data-active:before:opacity-100 data-active:before:delay-0",
        className
      )}
      {...props}
    >
      {withHandle && (
        <span
          aria-hidden
          className={cn(
            "z-10 rounded-full bg-card shadow-raised",
            horizontal ? "h-6 w-1.5" : "h-1.5 w-6"
          )}
        />
      )}
    </div>
  )
}
;(ResizableHandle as Tagged).$$resizable = HANDLE

export {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
  useResizableGroup,
  type ResizablePanelGroupProps,
  type ResizablePanelProps,
  type ResizableHandleProps,
  type ResizablePanelGroupHandle,
  type ResizableDirection,
  type ResizableSize,
}
