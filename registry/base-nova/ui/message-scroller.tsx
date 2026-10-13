"use client"

import * as React from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"

import { ArrowDownIcon } from "@/components/icons"
import { cn } from "@/lib/utils"

type MessageScrollerContextValue = {
  /** True while the viewport is pinned to the newest content. */
  atLiveEdge: boolean
  /** Scroll to the newest content and re-attach following. */
  scrollToLatest: (behavior?: ScrollBehavior) => void
}

const MessageScrollerContext = React.createContext<MessageScrollerContextValue | null>(null)

/** Read the nearest `MessageScroller`'s live-edge state, e.g. for a custom pill. */
function useMessageScroller() {
  const ctx = React.useContext(MessageScrollerContext)
  if (!ctx) throw new Error("useMessageScroller must be used inside <MessageScroller>")
  return ctx
}

type MessageScrollerProps = Omit<React.ComponentProps<"div">, "onScroll"> & {
  /** Distance from the bottom (px) still treated as "at the live edge". */
  threshold?: number
  /** Start at the bottom on mount. Defaults to true. */
  startAtEnd?: boolean
  /** Follow new content while at the live edge. Defaults to true. */
  follow?: boolean
  /** Show the floating "jump to latest" pill when released. Defaults to true. */
  showJumpButton?: boolean
  /** Pill label when there is nothing new below. */
  jumpLabel?: string
  /** Pill label once content arrived below the reader. */
  newLabel?: string
  /** Classes for the scrolling viewport (the root wraps it). */
  viewportClassName?: string
  /** Classes for the content column inside the viewport. */
  contentClassName?: string
  onLiveEdgeChange?: (atLiveEdge: boolean) => void
}

/**
 * Conversation viewport that stays pinned to the live edge while output
 * streams in, lets go as soon as the reader scrolls up, and offers a
 * "jump to latest" pill to re-attach.
 */
function MessageScroller({
  threshold = 48,
  startAtEnd = true,
  follow = true,
  showJumpButton = true,
  jumpLabel = "Jump to latest",
  newLabel = "New messages",
  viewportClassName,
  contentClassName,
  onLiveEdgeChange,
  className,
  children,
  ...props
}: MessageScrollerProps) {
  const reduce = useReducedMotion() ?? false
  const viewportRef = React.useRef<HTMLDivElement>(null)
  const contentRef = React.useRef<HTMLDivElement>(null)

  const stuck = React.useRef(startAtEnd)
  const lastTop = React.useRef(0)
  const programmatic = React.useRef(false)
  const raf = React.useRef<number | null>(null)
  const [atLiveEdge, setAtLiveEdge] = React.useState(startAtEnd)
  const [hasNew, setHasNew] = React.useState(false)

  const followRef = React.useRef(follow)
  const reduceRef = React.useRef(reduce)
  const onChangeRef = React.useRef(onLiveEdgeChange)
  React.useEffect(() => {
    followRef.current = follow
    reduceRef.current = reduce
    onChangeRef.current = onLiveEdgeChange
  })

  const setStuck = React.useCallback((next: boolean) => {
    if (stuck.current === next) return
    stuck.current = next
    setAtLiveEdge(next)
    if (next) setHasNew(false)
    onChangeRef.current?.(next)
  }, [])

  const distance = () => {
    const el = viewportRef.current
    return el ? el.scrollHeight - el.scrollTop - el.clientHeight : 0
  }

  const stop = () => {
    if (raf.current !== null) cancelAnimationFrame(raf.current)
    raf.current = null
    programmatic.current = false
  }

  /** Ease the viewport toward the bottom; follows a moving target while streaming. */
  const glide = React.useCallback((instant = false) => {
    const el = viewportRef.current
    if (!el) return
    if (instant || reduceRef.current) {
      stop()
      el.scrollTop = el.scrollHeight
      lastTop.current = el.scrollTop
      return
    }
    if (raf.current !== null) return
    programmatic.current = true
    const step = () => {
      const max = el.scrollHeight - el.clientHeight
      const gap = max - el.scrollTop
      if (gap <= 0.5) {
        el.scrollTop = max
        lastTop.current = el.scrollTop
        stop()
        return
      }
      el.scrollTop += Math.max(1, gap * 0.22)
      lastTop.current = el.scrollTop
      raf.current = requestAnimationFrame(step)
    }
    raf.current = requestAnimationFrame(step)
  }, [])

  const scrollToLatest = React.useCallback(
    (behavior: ScrollBehavior = "smooth") => {
      setStuck(true)
      glide(behavior !== "smooth")
    },
    [glide, setStuck]
  )

  // Release on clear reader intent, before the glide loop can fight it.
  const release = () => {
    stop()
    if (distance() > 1) setStuck(false)
  }

  const handleScroll = () => {
    const el = viewportRef.current
    if (!el) return
    const top = el.scrollTop
    const d = distance()
    if (top < lastTop.current - 1 && d > threshold && !programmatic.current) setStuck(false)
    else if (d <= threshold) setStuck(true)
    if (d <= 1) setHasNew(false)
    lastTop.current = top
  }

  const handleWheel = (e: React.WheelEvent) => {
    if (e.deltaY < 0) release()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (["ArrowUp", "PageUp", "Home"].includes(e.key) || (e.key === " " && e.shiftKey)) release()
    if (e.key === "End") {
      e.preventDefault()
      scrollToLatest()
    }
  }

  const touchY = React.useRef<number | null>(null)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchY.current = e.touches[0]?.clientY ?? null
  }
  const handleTouchMove = (e: React.TouchEvent) => {
    const y = e.touches[0]?.clientY
    if (touchY.current !== null && y !== undefined && y - touchY.current > 4) release()
  }

  // Follow growth (streamed tokens, new rows, images loading) at the live edge.
  React.useLayoutEffect(() => {
    const content = contentRef.current
    const el = viewportRef.current
    if (!content || !el) return
    if (startAtEnd) {
      el.scrollTop = el.scrollHeight
      lastTop.current = el.scrollTop
    }
    let lastHeight = content.offsetHeight
    const ro = new ResizeObserver(() => {
      const h = content.offsetHeight
      const grew = h > lastHeight
      lastHeight = h
      if (stuck.current && followRef.current) glide()
      else if (grew && distance() > threshold) setHasNew(true)
    })
    ro.observe(content)
    ro.observe(el)
    return () => {
      ro.disconnect()
      stop()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [glide, startAtEnd, threshold])

  const ctx = React.useMemo(() => ({ atLiveEdge, scrollToLatest }), [atLiveEdge, scrollToLatest])
  const showPill = showJumpButton && !atLiveEdge

  return (
    <MessageScrollerContext.Provider value={ctx}>
      <div
        data-slot="message-scroller"
        data-live-edge={atLiveEdge || undefined}
        className={cn("relative flex min-h-0 flex-col", className)}
        {...props}
      >
        <div
          ref={viewportRef}
          data-slot="message-scroller-viewport"
          tabIndex={0}
          onScroll={handleScroll}
          onWheel={handleWheel}
          onKeyDown={handleKeyDown}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onPointerDown={(e) => {
            // Grabbing the scrollbar hands control to the reader.
            if (e.target === e.currentTarget) stop()
          }}
          className={cn(
            "min-h-0 flex-1 overflow-y-auto overscroll-contain scrollbar-thin outline-none [overflow-anchor:none] focus-visible:ring-3 focus-visible:ring-ring focus-visible:ring-inset",
            viewportClassName
          )}
        >
          <div
            ref={contentRef}
            role="log"
            aria-live="polite"
            aria-relevant="additions"
            data-slot="message-scroller-content"
            className={cn("flex flex-col p-4", contentClassName)}
          >
            {children}
          </div>
        </div>

        <AnimatePresence>
          {showPill && (
            <motion.button
              key="jump"
              type="button"
              data-slot="message-scroller-jump"
              data-new={hasNew || undefined}
              onClick={() => scrollToLatest()}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.9, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.92, filter: "blur(4px)" }}
              transition={reduce ? { duration: 0.12 } : { type: "spring", stiffness: 520, damping: 34 }}
              className={cn(
                "absolute bottom-3 left-1/2 z-10 inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-full bg-popover bg-linear-to-b from-white/6 to-transparent pr-3.5 pl-2.5 text-xs font-medium text-popover-foreground shadow-surface outline-none select-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring active:shadow-pressed",
                hasNew && "bg-primary text-primary-foreground shadow-primary hover:text-primary-foreground"
              )}
              style={{ x: "-50%" }}
            >
              <ArrowDownIcon className="size-3.5" />
              {hasNew ? newLabel : jumpLabel}
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </MessageScrollerContext.Provider>
  )
}

export { MessageScroller, useMessageScroller, type MessageScrollerProps }
