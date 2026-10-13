"use client"

import * as React from "react"
import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react"

import { cn } from "@/lib/utils"

/*
 * A responsive frame locked to a width / height ratio. Changing `ratio` springs
 * the frame to its new shape with a layout animation; AspectRatioImage keeps
 * its own intrinsic proportions at both ends so the cover crop scales smoothly
 * instead of stretching or snapping. Reduced motion jumps straight to the end.
 */

const RATIO_SPRING = { type: "spring", stiffness: 340, damping: 34, mass: 0.7 } as const

const AspectRatioContext = React.createContext<{ ratio: number; animated: boolean } | null>(null)

function AspectRatio({
  ratio = 1,
  animated = true,
  radius = 20,
  className,
  contentClassName,
  style,
  children,
  ...props
}: Omit<HTMLMotionProps<"div">, "children" | "layout"> & {
  /** Width divided by height, e.g. 16 / 9. */
  ratio?: number
  /** Animate ratio changes. Reduced motion always skips the movement. */
  animated?: boolean
  /**
   * Corner radius in px. Set here rather than with a rounded-* class so it stays
   * true while the frame is scaled mid-animation.
   */
  radius?: number
  /** Classes for the content layer (alignment, padding, overlays). */
  contentClassName?: string
  children?: React.ReactNode
}) {
  const reduce = useReducedMotion()
  const enabled = animated && !reduce
  const safeRatio = Number.isFinite(ratio) && ratio > 0 ? ratio : 1
  const ctx = React.useMemo(() => ({ ratio: safeRatio, animated: enabled }), [safeRatio, enabled])

  return (
    <AspectRatioContext.Provider value={ctx}>
      <motion.div
        data-slot="aspect-ratio"
        layout={enabled}
        transition={{ layout: RATIO_SPRING }}
        className={cn("relative w-full min-w-0 overflow-hidden bg-muted shadow-well", className)}
        style={{ ...style, aspectRatio: safeRatio, borderRadius: radius }}
        {...props}
      >
        <div data-slot="aspect-ratio-content" className={cn("absolute inset-0", contentClassName)}>
          {children}
        </div>
      </motion.div>
    </AspectRatioContext.Provider>
  )
}

/**
 * Cover-cropped image for AspectRatio. Pass the source's real pixel size so the
 * crop can be computed without waiting for the image to load.
 */
function AspectRatioImage({
  width,
  height,
  className,
  style,
  draggable = false,
  ...props
}: Omit<HTMLMotionProps<"img">, "layout" | "width" | "height"> & {
  alt: string
  /** Intrinsic width in px. */
  width: number
  /** Intrinsic height in px. */
  height: number
}) {
  const ctx = React.useContext(AspectRatioContext)
  if (!ctx) throw new Error("AspectRatioImage must be used within <AspectRatio>")
  // The frame is wider than the image: fill its width and crop top/bottom; otherwise fill height.
  const fillWidth = ctx.ratio >= width / height

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {/* eslint-disable-next-line @next/next/no-img-element -- registry code runs outside Next too */}
      <motion.img
        data-slot="aspect-ratio-image"
        width={width}
        height={height}
        draggable={draggable}
        layout={ctx.animated}
        transition={{ layout: RATIO_SPRING }}
        className={cn("block max-w-none shrink-0 select-none", className)}
        style={{
          ...style,
          aspectRatio: `${width} / ${height}`,
          width: fillWidth ? "100%" : "auto",
          height: fillWidth ? "auto" : "100%",
        }}
        {...props}
      />
    </div>
  )
}

export { AspectRatio, AspectRatioImage }
