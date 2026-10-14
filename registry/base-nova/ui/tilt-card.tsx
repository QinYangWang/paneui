"use client"

import * as React from "react"
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from "motion/react"

import { cn } from "@/lib/utils"

/*
 * A card that tilts toward the cursor in 3D with a soft glare that follows the
 * pointer. Mouse/pen only (touch has no hover), and switched off entirely under
 * prefers-reduced-motion. Nest TiltCardLayer to lift parts of the content off
 * the surface for a parallax feel.
 */

const TILT_SPRING = { stiffness: 220, damping: 18, mass: 0.4 }

function TiltCard({
  max = 10,
  glare = true,
  scale = 1.02,
  perspective = 900,
  className,
  style,
  children,
  onPointerMove,
  onPointerEnter,
  onPointerLeave,
  ...props
}: Omit<React.ComponentProps<"div">, "style" | "onAnimationStart" | "onDrag" | "onDragStart" | "onDragEnd"> & {
  /** Maximum tilt in degrees at the card's edges. */
  max?: number
  /** Show the cursor-tracked glare. */
  glare?: boolean
  /** Scale while hovered. */
  scale?: number
  /** CSS perspective distance in px. */
  perspective?: number
  style?: React.CSSProperties
}) {
  const reduce = useReducedMotion() ?? false
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const s = useMotionValue(1)
  const px = useMotionValue(50)
  const py = useMotionValue(50)
  const glareOpacity = useMotionValue(0)
  // A motion value (not a literal in the template) so a changed prop applies.
  const perspectiveValue = useMotionValue(perspective)
  React.useEffect(() => {
    perspectiveValue.set(perspective)
  }, [perspective, perspectiveValue])

  const srx = useSpring(rx, TILT_SPRING)
  const sry = useSpring(ry, TILT_SPRING)
  const ss = useSpring(s, TILT_SPRING)
  const sGlare = useSpring(glareOpacity, { stiffness: 200, damping: 30 })

  const transform = useMotionTemplate`perspective(${perspectiveValue}px) rotateX(${srx}deg) rotateY(${sry}deg) scale(${ss})`
  const glareBg = useMotionTemplate`radial-gradient(circle at ${px}% ${py}%, rgb(255 255 255 / 0.55), rgb(255 255 255 / 0.12) 35%, transparent 65%)`

  const track = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType === "touch") return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    ry.set((x - 0.5) * 2 * max)
    rx.set((0.5 - y) * 2 * max)
    px.set(x * 100)
    py.set(y * 100)
  }

  return (
    <motion.div
      data-slot="tilt-card"
      onPointerEnter={(e) => {
        onPointerEnter?.(e)
        if (reduce || e.pointerType === "touch") return
        s.set(scale)
        glareOpacity.set(1)
        track(e)
      }}
      onPointerMove={(e) => {
        onPointerMove?.(e)
        track(e)
      }}
      onPointerLeave={(e) => {
        onPointerLeave?.(e)
        rx.set(0)
        ry.set(0)
        s.set(1)
        glareOpacity.set(0)
      }}
      style={{ ...style, transform: reduce ? undefined : transform, transformStyle: "preserve-3d" }}
      className={cn(
        "relative rounded-2xl bg-card text-card-foreground shadow-raised will-change-transform",
        className
      )}
      {...props}
    >
      {children}
      {glare && !reduce && (
        <motion.div
          aria-hidden
          data-slot="tilt-card-glare"
          style={{ opacity: sGlare }}
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]"
        >
          <motion.div style={{ background: glareBg }} className="absolute inset-0 mix-blend-soft-light" />
        </motion.div>
      )}
    </motion.div>
  )
}

/** Lifts its content toward the viewer inside a TiltCard (parallax depth in px). */
function TiltCardLayer({ depth = 24, className, style, ...props }: React.ComponentProps<"div"> & { depth?: number }) {
  return (
    <div
      data-slot="tilt-card-layer"
      className={cn("[transform-style:preserve-3d]", className)}
      style={{ ...style, transform: `translateZ(${depth}px)` }}
      {...props}
    />
  )
}

export { TiltCard, TiltCardLayer }
