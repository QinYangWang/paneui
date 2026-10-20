"use client"

import * as React from "react"
import { motion, useReducedMotion, useSpring } from "motion/react"

import { cn } from "@paneui/ui/lib/utils"

type MagneticProps = Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> & {
  children: React.ReactNode
  /** How far the content follows the cursor, as a fraction of the cursor's offset from centre. */
  strength?: number
  /** Extra pull zone around the element, in px. The pull starts this far outside its edges. */
  range?: number
  /** Turns the effect off (the content sits still). */
  disabled?: boolean
  /** Spring used for the follow and the snap back. */
  spring?: { stiffness?: number; damping?: number; mass?: number }
}

const DEFAULT_SPRING = { stiffness: 220, damping: 16, mass: 0.35 }

/**
 * Wraps any element so it leans toward the cursor while the cursor is near, then
 * springs home. Only fine pointers (mouse, trackpad) get the effect, and it is off
 * under prefers-reduced-motion.
 */
function Magnetic({
  children,
  strength = 0.3,
  range = 24,
  disabled = false,
  spring = DEFAULT_SPRING,
  className,
  ...props
}: MagneticProps) {
  const reduce = useReducedMotion()
  const anchorRef = React.useRef<HTMLSpanElement>(null)
  const x = useSpring(0, { ...DEFAULT_SPRING, ...spring })
  const y = useSpring(0, { ...DEFAULT_SPRING, ...spring })

  React.useEffect(() => {
    const anchor = anchorRef.current
    if (!anchor || disabled || reduce) return
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)")
    if (!fine.matches) return

    let frame = 0
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" && event.pointerType !== "pen") return
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        // The anchor never moves (only its child does), so its rect is a stable reference.
        const rect = anchor.getBoundingClientRect()
        const inside =
          event.clientX >= rect.left - range &&
          event.clientX <= rect.right + range &&
          event.clientY >= rect.top - range &&
          event.clientY <= rect.bottom + range
        if (inside) {
          x.set((event.clientX - (rect.left + rect.width / 2)) * strength)
          y.set((event.clientY - (rect.top + rect.height / 2)) * strength)
        } else {
          x.set(0)
          y.set(0)
        }
      })
    }
    const reset = () => {
      x.set(0)
      y.set(0)
    }
    window.addEventListener("pointermove", onMove, { passive: true })
    document.addEventListener("pointerleave", reset)
    window.addEventListener("blur", reset)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("pointermove", onMove)
      document.removeEventListener("pointerleave", reset)
      window.removeEventListener("blur", reset)
      reset()
    }
  }, [disabled, reduce, range, strength, x, y])

  return (
    <span
      ref={anchorRef}
      data-slot="magnetic"
      className={cn("inline-flex", className)}
      {...props}
    >
      <motion.span style={{ x, y }} className="inline-flex will-change-transform">
        {children}
      </motion.span>
    </span>
  )
}

export { Magnetic, type MagneticProps }
