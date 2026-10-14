"use client"

import * as React from "react"
import { useVirtualizer } from "@tanstack/react-virtual"
import { motion, useReducedMotion } from "motion/react"

import { AlertCircleIcon, GridIcon, RefreshIcon } from "@/components/icons"
import { cn } from "@/lib/utils"

export type InfiniteMasonryKey = string | number | bigint

export interface InfiniteMasonryProps<T> {
  items: readonly T[]
  getItemKey: (item: T, index: number) => InfiniteMasonryKey
  renderItem: (item: T, index: number) => React.ReactNode
  /** Called when the viewport nears the end. Return a promise to block repeat calls until it settles. */
  onLoadMore: () => void | Promise<void>
  hasMore: boolean
  loading?: boolean
  /** When set, a retry card replaces the loading tail. */
  error?: React.ReactNode
  onRetry?: () => void
  /** Height guess before an item is measured. */
  estimateSize?: (item: T, index: number) => number
  renderLoadingItem?: (index: number) => React.ReactNode
  emptyState?: React.ReactNode
  endState?: React.ReactNode
  minColumnWidth?: number
  maxColumns?: number
  gap?: number
  /** Extra rows rendered above/below the viewport. */
  overscan?: number
  /** Load more when this many items remain below the last visible one. */
  prefetch?: number
  animateItems?: boolean
  "aria-label"?: string
  className?: string
  itemClassName?: string
}

function useColumns(ref: React.RefObject<HTMLDivElement | null>, min: number, max: number, gap: number) {
  const [state, setState] = React.useState({ columns: 1, width: 0 })
  React.useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const measure = (width: number) => {
      const columns = Math.min(max, Math.max(1, Math.floor((width + gap) / (min + gap))))
      setState((s) => (s.columns === columns && s.width === width ? s : { columns, width }))
    }
    measure(el.clientWidth)
    const ro = new ResizeObserver(([entry]) => measure(entry.contentRect.width))
    ro.observe(el)
    return () => ro.disconnect()
  }, [ref, min, max, gap])
  return state
}

function DefaultLoadingItem({ index }: { index: number }) {
  return (
    <div
      aria-hidden
      className="relative overflow-hidden rounded-2xl bg-muted shadow-well"
      style={{ height: 150 + (index % 3) * 46 }}
    >
      <div className="absolute inset-0 -translate-x-full animate-[masonry-sheen_1.4s_ease-in-out_infinite] bg-linear-to-r from-transparent via-foreground/5 to-transparent" />
    </div>
  )
}

function DefaultEmpty() {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center gap-2 px-6 text-center">
      <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-muted text-muted-foreground shadow-well">
        <GridIcon size={20} />
      </span>
      <p className="text-sm font-medium">Nothing here yet</p>
      <p className="max-w-xs text-xs text-muted-foreground">New items show up as soon as they’re published.</p>
    </div>
  )
}

function Reveal({
  itemKey,
  seen,
  animate,
  delay,
  children,
}: {
  itemKey: InfiniteMasonryKey
  seen: React.RefObject<Set<InfiniteMasonryKey>>
  animate: boolean
  delay: number
  children: React.ReactNode
}) {
  // Decide once per mount: re-mounts from virtualization must not replay the entrance.
  const [play] = React.useState(() => animate && !seen.current.has(itemKey))
  React.useEffect(() => {
    seen.current.add(itemKey)
  }, [itemKey, seen])
  return (
    <motion.div
      initial={play ? { opacity: 0, y: 16, scale: 0.98 } : false}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 340, damping: 30, delay }}
    >
      {children}
    </motion.div>
  )
}

export function InfiniteMasonry<T>({
  items,
  getItemKey,
  renderItem,
  onLoadMore,
  hasMore,
  loading = false,
  error,
  onRetry,
  estimateSize = () => 240,
  renderLoadingItem = (i) => <DefaultLoadingItem index={i} />,
  emptyState = <DefaultEmpty />,
  endState,
  minColumnWidth = 200,
  maxColumns = 4,
  gap = 12,
  overscan = 3,
  prefetch = 6,
  animateItems = true,
  "aria-label": ariaLabel = "Feed",
  className,
  itemClassName,
}: InfiniteMasonryProps<T>) {
  const reduce = useReducedMotion()
  const scrollRef = React.useRef<HTMLDivElement>(null)
  const contentRef = React.useRef<HTMLDivElement>(null)
  const { columns, width } = useColumns(contentRef, minColumnWidth, maxColumns, gap)
  const loadRef = React.useRef(onLoadMore)
  loadRef.current = onLoadMore
  const pending = React.useRef(false)
  const seen = React.useRef(new Set<InfiniteMasonryKey>())
  const initialCount = React.useRef(items.length)

  const hasError = error !== undefined && error !== null && error !== false
  const tail = hasError ? 1 : loading ? columns : 0
  const count = items.length + tail

  const virtualizer = useVirtualizer({
    count,
    getScrollElement: () => scrollRef.current,
    getItemKey: (i) => (i < items.length ? getItemKey(items[i], i) : `__tail-${i - items.length}`),
    estimateSize: (i) => (i < items.length ? estimateSize(items[i], i) : 150 + ((i - items.length) % 3) * 46),
    gap,
    lanes: columns,
    overscan,
  })

  // Lane count changes invalidate cached positions.
  React.useLayoutEffect(() => {
    virtualizer.measure()
  }, [columns, virtualizer])

  const virtualItems = virtualizer.getVirtualItems()
  const viewportEnd = (virtualizer.scrollOffset ?? 0) + (virtualizer.scrollRect?.height ?? 0)
  let lastVisible = -1
  for (const v of virtualItems) if (v.start < viewportEnd && v.index > lastVisible) lastVisible = v.index

  React.useEffect(() => {
    if (hasError || loading || !hasMore || pending.current) return
    if (lastVisible < Math.max(0, items.length - prefetch)) return
    pending.current = true
    Promise.resolve(loadRef.current()).finally(() => {
      pending.current = false
    })
  }, [hasError, loading, hasMore, lastVisible, items.length, prefetch])

  React.useEffect(() => {
    if (!loading) pending.current = false
  }, [loading])

  if (items.length === 0 && !hasMore && !loading && !hasError) {
    return (
      <section
        aria-label={ariaLabel}
        data-slot="infinite-masonry"
        className={cn("w-full rounded-3xl bg-card shadow-raised", className)}
      >
        {emptyState}
      </section>
    )
  }

  const colWidth = columns > 0 ? Math.max(0, (width - gap * (columns - 1)) / columns) : 0

  return (
    <section
      ref={scrollRef}
      aria-label={ariaLabel}
      aria-busy={loading}
      data-slot="infinite-masonry"
      tabIndex={0}
      className={cn(
        "w-full overflow-y-auto overscroll-contain rounded-3xl bg-muted/50 p-3 shadow-well outline-none [overflow-anchor:none] [scrollbar-gutter:stable] focus-visible:ring-3 focus-visible:ring-ring",
        className
      )}
    >
      <div ref={contentRef} role="list" className="relative w-full" style={{ height: virtualizer.getTotalSize() }}>
        {width > 0 &&
          virtualItems.map((v) => {
            const isTail = v.index >= items.length
            const tailIndex = v.index - items.length
            let content: React.ReactNode
            if (isTail) {
              content = hasError ? (
                <div className="flex min-h-36 flex-col items-start justify-center gap-2 rounded-2xl bg-destructive/6 p-4 shadow-well">
                  <span className="flex items-center gap-2 text-sm font-medium text-destructive">
                    <AlertCircleIcon size={16} />
                    Couldn’t load more
                  </span>
                  <span className="text-xs text-muted-foreground">{error}</span>
                  {onRetry && (
                    <button
                      type="button"
                      onClick={onRetry}
                      className="mt-1 inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-lg bg-secondary px-3.5 text-[0.8rem] font-medium text-secondary-foreground shadow-raised transition-[box-shadow,background-color,scale] duration-150 ease-out outline-none hover:bg-accent hover:shadow-raised-hover focus-visible:ring-3 focus-visible:ring-ring active:scale-96"
                    >
                      <RefreshIcon size={14} />
                      Try again
                    </button>
                  )}
                </div>
              ) : (
                renderLoadingItem(tailIndex)
              )
            } else {
              content = (
                <Reveal
                  itemKey={v.key}
                  seen={seen}
                  animate={animateItems && !reduce && v.index >= initialCount.current}
                  delay={Math.min(v.lane, 3) * 0.04}
                >
                  {renderItem(items[v.index], v.index)}
                </Reveal>
              )
            }
            return (
              <div
                key={v.key}
                ref={virtualizer.measureElement}
                data-index={v.index}
                role={isTail ? undefined : "listitem"}
                aria-hidden={isTail && !hasError ? true : undefined}
                className={cn("absolute top-0 left-0", !isTail && itemClassName)}
                style={{
                  width: colWidth,
                  transform: `translate3d(${v.lane * (colWidth + gap)}px, ${v.start}px, 0)`,
                }}
              >
                {content}
              </div>
            )
          })}
      </div>
      {!hasMore && !loading && !hasError && items.length > 0 && (
        <div className="pt-4 pb-1 text-center text-xs text-muted-foreground">{endState ?? "You’ve reached the end"}</div>
      )}
      <style>{`@keyframes masonry-sheen{to{transform:translateX(100%)}}`}</style>
      <span aria-live="polite" className="sr-only">
        {loading ? "Loading more" : ""}
      </span>
    </section>
  )
}
