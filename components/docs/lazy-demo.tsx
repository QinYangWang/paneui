"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

import { demos } from "./demos"
import { galleryHeights } from "./gallery-heights"

/** Mount a little before the card scrolls in… */
const MOUNT_MARGIN = "200px 0px"
/** …and unmount only once it is well clear, so a card at the edge doesn't thrash. */
const UNMOUNT_MARGIN = "800px 0px"

/**
 * One gallery preview, rendered only while it is near the viewport.
 *
 * The gallery holds ~150 live demos (infinite motion loops, canvases, smooth-scroll
 * instances, timers). Keeping them all mounted kept every loop running and the
 * DOM at ~20k nodes, so the page got steadily slower. Here a demo mounts when it
 * comes within MOUNT_MARGIN of the viewport and unmounts (stopping its loops and
 * observers) once it is beyond UNMOUNT_MARGIN. While unmounted the preview keeps
 * its last measured height — or, before first mount, the measured estimate from
 * gallery-heights — so the layout never jumps.
 */
export function LazyDemo({ name, eager = false, className }: { name: string; eager?: boolean; className?: string }) {
  const Demo = demos[name]
  const ref = React.useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = React.useState(eager)
  const [held, setHeld] = React.useState<number | null>(null)
  const last = React.useRef<number | null>(null)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    const near = new IntersectionObserver(([e]) => e?.isIntersecting && setMounted(true), { rootMargin: MOUNT_MARGIN })
    const far = new IntersectionObserver(([e]) => e && !e.isIntersecting && setMounted(false), { rootMargin: UNMOUNT_MARGIN })
    near.observe(el)
    far.observe(el)
    // A held height is only valid for the width it was measured at.
    const onResize = () => {
      last.current = null
      setHeld(null)
    }
    window.addEventListener("resize", onResize)
    return () => {
      near.disconnect()
      far.disconnect()
      window.removeEventListener("resize", onResize)
    }
  }, [])

  // Track the rendered height while mounted; hold it once unmounted.
  React.useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    if (!mounted) {
      setHeld(last.current)
      return
    }
    setHeld(null)
    const ro = new ResizeObserver(() => {
      last.current = el.getBoundingClientRect().height
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [mounted])

  const estimate = galleryHeights[name]

  return (
    <div
      ref={ref}
      data-slot="gallery-preview"
      data-mounted={mounted || undefined}
      style={
        {
          ...(estimate ? { "--demo-h": `${estimate}px` } : {}),
          ...(held != null && !mounted ? { minHeight: held } : {}),
        } as React.CSSProperties
      }
      className={cn(
        "flex min-h-64 flex-1 items-center justify-center overflow-hidden border-b border-border bg-background/40 p-6 sm:p-8",
        estimate && "xl:min-h-(--demo-h)",
        className
      )}
    >
      {mounted && Demo ? <Demo /> : null}
    </div>
  )
}
