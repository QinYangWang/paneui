"use client"

import * as React from "react"
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react"

import { cn } from "@/lib/utils"
import { useSmoothScrollContainer } from "@/registry/base-nova/ui/smooth-scroll"

const driftSpring = { stiffness: 160, damping: 32, mass: 0.4 }

type ParallaxProps = Omit<React.ComponentProps<typeof motion.div>, "ref" | "style" | "children"> & {
  children?: React.ReactNode
  style?: React.CSSProperties
  /**
   * Drift per px scrolled while the element crosses the viewport. Positive
   * values lag behind the scroll (reads as farther away), negative values run
   * ahead (closer). 0.1–0.4 reads best. The element sits in its normal spot
   * when centred.
   */
  speed?: number
  axis?: "x" | "y"
  /**
   * Scroll container. Defaults to the nearest contained SmoothScroll, then
   * the window.
   */
  container?: React.RefObject<HTMLElement | null>
  /** Spring-smooth the drift. Off automatically under reduced motion. */
  spring?: boolean
}

function Parallax({
  speed = 0.2,
  axis = "y",
  container,
  spring = true,
  className,
  style,
  children,
  ...props
}: ParallaxProps) {
  const reduce = useReducedMotion() ?? false
  const contextContainer = useSmoothScrollContainer()
  const scrollContainer = container ?? contextContainer ?? undefined
  const ref = React.useRef<HTMLDivElement>(null)
  const travel = useMotionValue(0)
  const speedRef = React.useRef(speed)
  speedRef.current = speed

  // Total distance scrolled while the element crosses the viewport.
  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    const measure = () => {
      const viewport = scrollContainer?.current?.clientHeight ?? window.innerHeight
      travel.set(viewport + el.offsetHeight)
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    if (scrollContainer?.current) observer.observe(scrollContainer.current)
    window.addEventListener("resize", measure)
    return () => {
      observer.disconnect()
      window.removeEventListener("resize", measure)
    }
  }, [scrollContainer, travel])

  const { scrollYProgress } = useScroll({
    target: ref,
    container: scrollContainer,
    offset: ["start end", "end start"],
  })
  const drift = useTransform([scrollYProgress, travel], ([p, t]: number[]) => (p - 0.5) * t * speedRef.current)
  const smoothed = useSpring(drift, driftSpring)
  const value = spring ? smoothed : drift

  return (
    <motion.div
      ref={ref}
      data-slot="parallax"
      style={{ ...style, ...(reduce ? {} : axis === "x" ? { x: value } : { y: value }) }}
      className={cn("will-change-transform", className)}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export { Parallax, type ParallaxProps }
