"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import { AnimatePresence, motion, type PanInfo, useReducedMotion } from "motion/react"

import { ChevronLeftIcon, ChevronRightIcon, XIcon } from "@/components/icons"
import { cn } from "@/lib/utils"

type LightboxItem = {
  src: string
  alt: string
  /** Smaller image for the grid. Defaults to `src`. */
  thumbnail?: string
  caption?: React.ReactNode
  /** Intrinsic size, used for the open aspect ratio before the image loads. */
  width?: number
  height?: number
}

type Rect = { top: number; left: number; width: number; height: number }

const morph = { type: "spring", stiffness: 260, damping: 30, mass: 0.9 } as const
const ease = [0.22, 1, 0.36, 1] as const
const THUMB_RADIUS = 12
const FRAME_RADIUS = 18

function rectOf(el: Element | null | undefined): Rect | null {
  if (!el) return null
  const r = el.getBoundingClientRect()
  return { top: r.top, left: r.left, width: r.width, height: r.height }
}

/** Largest box of the given aspect that fits the viewport, leaving room for chrome. */
function fitRect(aspect: number, viewport: { width: number; height: number }): Rect {
  const compact = viewport.width < 640
  const padX = compact ? 16 : 72
  const padTop = compact ? 64 : 72
  const padBottom = compact ? 112 : 104
  const maxW = Math.min(1200, viewport.width - padX * 2)
  const maxH = viewport.height - padTop - padBottom
  let width = maxW
  let height = width / aspect
  if (height > maxH) {
    height = maxH
    width = height * aspect
  }
  return {
    width,
    height,
    left: (viewport.width - width) / 2,
    top: padTop + (maxH - height) / 2,
  }
}

type MorphingLightboxProps = Omit<React.ComponentProps<"div">, "children"> & {
  items: LightboxItem[]
  /** Wrap from last to first when navigating. */
  loop?: boolean
  /** Class for each thumbnail button (set its aspect ratio here). */
  thumbnailClassName?: string
  onIndexChange?: (index: number | null) => void
}

function MorphingLightbox({
  items,
  loop = true,
  className,
  thumbnailClassName,
  onIndexChange,
  ...props
}: MorphingLightboxProps) {
  const reduce = useReducedMotion() ?? false
  const titleId = React.useId()
  const thumbs = React.useRef<(HTMLButtonElement | null)[]>([])
  const overlayRef = React.useRef<HTMLDivElement>(null)
  const closeRef = React.useRef<HTMLButtonElement>(null)

  const [mounted, setMounted] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const [index, setIndex] = React.useState(0)
  const [direction, setDirection] = React.useState(0)
  // Index whose thumbnail is "lifted" into the viewer (hidden in the grid).
  const [lifted, setLifted] = React.useState<number | null>(null)
  const [origin, setOrigin] = React.useState<Rect | null>(null)
  const [returnRect, setReturnRect] = React.useState<Rect | null>(null)
  const [viewport, setViewport] = React.useState({ width: 1280, height: 800 })
  const [aspects, setAspects] = React.useState<Record<number, number>>({})

  React.useEffect(() => setMounted(true), [])

  const aspectOf = (i: number) => {
    const item = items[i]
    if (aspects[i]) return aspects[i]
    if (item?.width && item?.height) return item.width / item.height
    return 4 / 3
  }

  const openAt = (i: number) => {
    setViewport({ width: window.innerWidth, height: window.innerHeight })
    setOrigin(rectOf(thumbs.current[i]))
    setIndex(i)
    setDirection(0)
    setLifted(i)
    setOpen(true)
    onIndexChange?.(i)
  }

  const close = React.useCallback(() => {
    setReturnRect(rectOf(thumbs.current[index]))
    setLifted(index)
    setOpen(false)
    onIndexChange?.(null)
  }, [index, onIndexChange])

  const go = React.useCallback(
    (delta: number) => {
      const count = items.length
      let next = index + delta
      if (loop) next = (next + count) % count
      else next = Math.max(0, Math.min(count - 1, next))
      if (next === index) return
      setDirection(delta)
      setIndex(next)
      setLifted(next)
      onIndexChange?.(next)
    },
    [index, items.length, loop, onIndexChange]
  )

  // Keyboard, scroll lock, resize while open.
  React.useEffect(() => {
    if (!open) return
    const html = document.documentElement
    const previous = html.style.overflow
    html.style.overflow = "hidden"
    closeRef.current?.focus({ preventScroll: true })
    const onResize = () => setViewport({ width: window.innerWidth, height: window.innerHeight })
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault()
        close()
      } else if (e.key === "ArrowRight") go(1)
      else if (e.key === "ArrowLeft") go(-1)
      else if (e.key === "Tab") {
        // Keep focus inside the viewer.
        const focusables = overlayRef.current?.querySelectorAll<HTMLElement>("button:not([disabled])")
        if (!focusables?.length) return
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener("keydown", onKey)
    window.addEventListener("resize", onResize)
    return () => {
      html.style.overflow = previous
      window.removeEventListener("keydown", onKey)
      window.removeEventListener("resize", onResize)
    }
  }, [open, close, go])

  const onExitComplete = () => {
    const i = lifted
    setLifted(null)
    if (i !== null) thumbs.current[i]?.focus({ preventScroll: true })
  }

  const onSwipe = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -70 || info.velocity.x < -500) go(1)
    else if (info.offset.x > 70 || info.velocity.x > 500) go(-1)
  }

  const target = fitRect(aspectOf(index), viewport)
  const item = items[index]
  const canPrev = loop || index > 0
  const canNext = loop || index < items.length - 1
  const many = items.length > 1

  const frameVariants = {
    from: () =>
      reduce || !origin
        ? { ...target, opacity: 0, borderRadius: FRAME_RADIUS }
        : { ...origin, opacity: 1, borderRadius: THUMB_RADIUS },
    shown: { ...target, opacity: 1, borderRadius: FRAME_RADIUS },
    back: (rect: Rect | null) =>
      reduce || !rect
        ? { ...target, opacity: 0, borderRadius: FRAME_RADIUS }
        : { ...rect, opacity: 1, borderRadius: THUMB_RADIUS },
  }

  return (
    <>
      <div data-slot="morphing-lightbox" className={cn("grid grid-cols-2 gap-3 sm:grid-cols-3", className)} {...props}>
        {items.map((it, i) => (
          <button
            key={it.src + i}
            ref={(el) => {
              thumbs.current[i] = el
            }}
            type="button"
            aria-label={`Open ${it.alt}`}
            aria-haspopup="dialog"
            onClick={() => openAt(i)}
            data-slot="morphing-lightbox-thumbnail"
            className={cn(
              "group/thumb relative aspect-4/3 cursor-zoom-in overflow-hidden rounded-xl bg-muted shadow-raised outline-none transition-[box-shadow,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:shadow-raised-hover focus-visible:ring-3 focus-visible:ring-ring active:scale-[0.98]",
              lifted === i && "opacity-0",
              thumbnailClassName
            )}
          >
            <img
              src={it.thumbnail ?? it.src}
              alt=""
              draggable={false}
              loading="lazy"
              onLoad={(e) => {
                const img = e.currentTarget
                if (img.naturalWidth && img.naturalHeight && !it.width) {
                  const ratio = img.naturalWidth / img.naturalHeight
                  setAspects((a) => (a[i] === ratio ? a : { ...a, [i]: ratio }))
                }
              }}
              className="size-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/thumb:scale-[1.03]"
            />
          </button>
        ))}
      </div>

      {mounted &&
        createPortal(
          <AnimatePresence custom={returnRect} onExitComplete={onExitComplete}>
            {open && item && (
              <div
                ref={overlayRef}
                key="lightbox"
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                data-slot="morphing-lightbox-viewer"
                className="fixed inset-0 z-50"
              >
                <motion.div
                  aria-hidden
                  onClick={close}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease }}
                  className="absolute inset-0 bg-background/85 backdrop-blur-xl"
                />

                <motion.div
                  custom={returnRect}
                  variants={frameVariants}
                  initial="from"
                  animate="shown"
                  exit="back"
                  transition={reduce ? { duration: 0.18 } : morph}
                  style={{ position: "fixed" }}
                  className="overflow-hidden bg-muted shadow-surface"
                >
                  <AnimatePresence initial={false} custom={direction} mode="popLayout">
                    <motion.div
                      key={index}
                      custom={direction}
                      variants={{
                        enter: (d: number) => ({ opacity: 0, x: reduce ? 0 : d * 48, filter: reduce ? "none" : "blur(6px)" }),
                        center: { opacity: 1, x: 0, filter: "blur(0px)" },
                        leave: (d: number) => ({ opacity: 0, x: reduce ? 0 : d * -48, filter: reduce ? "none" : "blur(6px)" }),
                      }}
                      initial="enter"
                      animate="center"
                      exit="leave"
                      transition={{ duration: 0.32, ease }}
                      drag={many ? "x" : false}
                      dragSnapToOrigin
                      dragElastic={0.2}
                      onDragEnd={onSwipe}
                      className="absolute inset-0 cursor-grab active:cursor-grabbing"
                    >
                      {item.thumbnail && (
                        <img src={item.thumbnail} alt="" aria-hidden draggable={false} className="absolute inset-0 size-full object-cover" />
                      )}
                      <img
                        src={item.src}
                        alt={item.alt}
                        draggable={false}
                        className="absolute inset-0 size-full object-cover select-none"
                      />
                    </motion.div>
                  </AnimatePresence>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.25, delay: reduce ? 0 : 0.12 } }}
                  exit={{ opacity: 0, transition: { duration: 0.12 } }}
                  className="pointer-events-none absolute inset-0"
                >
                  <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
                    <span className="rounded-full bg-card/80 px-3 py-1 text-xs font-medium text-muted-foreground tabular-nums shadow-chip">
                      {index + 1} / {items.length}
                    </span>
                    <ViewerButton ref={closeRef} label="Close" onClick={close}>
                      <XIcon size={16} />
                    </ViewerButton>
                  </div>

                  {many && (
                    <>
                      <ViewerButton
                        label="Previous image"
                        disabled={!canPrev}
                        onClick={() => go(-1)}
                        className="absolute top-1/2 left-3 -translate-y-1/2 max-sm:top-auto max-sm:bottom-6 max-sm:translate-y-0 sm:left-5"
                      >
                        <ChevronLeftIcon size={18} />
                      </ViewerButton>
                      <ViewerButton
                        label="Next image"
                        disabled={!canNext}
                        onClick={() => go(1)}
                        className="absolute top-1/2 right-3 -translate-y-1/2 max-sm:top-auto max-sm:bottom-6 max-sm:translate-y-0 sm:right-5"
                      >
                        <ChevronRightIcon size={18} />
                      </ViewerButton>
                    </>
                  )}

                  <div
                    className="absolute inset-x-16 flex justify-center text-center max-sm:bottom-7"
                    style={{ top: viewport.width < 640 ? undefined : target.top + target.height + 16 }}
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.p
                        key={index}
                        id={titleId}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.2, ease }}
                        className="max-w-xl text-sm text-balance text-foreground"
                      >
                        {item.caption ?? item.alt}
                      </motion.p>
                    </AnimatePresence>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  )
}

function ViewerButton({
  label,
  className,
  children,
  ...props
}: React.ComponentProps<"button"> & { label: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      className={cn(
        "pointer-events-auto inline-flex size-10 cursor-pointer items-center justify-center rounded-full bg-card bg-linear-to-b from-white/6 to-transparent text-foreground shadow-raised transition-[box-shadow,opacity] duration-150 outline-none hover:shadow-raised-hover focus-visible:ring-3 focus-visible:ring-ring active:shadow-pressed disabled:pointer-events-none disabled:opacity-40",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export { MorphingLightbox, type MorphingLightboxProps, type LightboxItem }
