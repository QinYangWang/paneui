"use client"

import * as React from "react"
import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

type MetallicButtonSize = "sm" | "default" | "lg" | "icon"

type MetallicButtonProps = ButtonPrimitive.Props & {
  size?: MetallicButtonSize
  /** Stop the traveling reflection; the chrome rim stays. */
  paused?: boolean
  /** Seconds between idle reflection passes. Hovering sends one straight away. */
  interval?: number
}

const SIZES: Record<MetallicButtonSize, string> = {
  sm: "h-8 gap-1.5 px-3.5 text-[0.8rem] [&_svg:not([class*='size-'])]:size-3.5",
  default: "h-9 gap-1.5 px-4",
  lg: "h-11 gap-2 px-6 text-[0.95rem]",
  icon: "size-9",
}

// Chrome is mixed from the theme's own foreground/background, so the rim reads as
// polished steel on a light page and as dark gunmetal on a dark one.
const RIM =
  "linear-gradient(110deg," +
  "color-mix(in oklch,var(--foreground) 55%,var(--background)) 0%," +
  "color-mix(in oklch,var(--foreground) 12%,var(--background)) 18%," +
  "white 30%," +
  "color-mix(in oklch,var(--foreground) 45%,var(--background)) 44%," +
  "color-mix(in oklch,var(--foreground) 80%,var(--background)) 54%," +
  "color-mix(in oklch,var(--foreground) 20%,var(--background)) 68%," +
  "white 78%," +
  "color-mix(in oklch,var(--foreground) 50%,var(--background)) 90%," +
  "color-mix(in oklch,var(--foreground) 65%,var(--background)) 100%)"

function MetallicButton({
  size = "default",
  paused = false,
  interval = 4,
  className,
  children,
  onPointerEnter,
  ...props
}: MetallicButtonProps) {
  const reduce = useReducedMotion()
  const still = paused || Boolean(reduce)
  const [pass, setPass] = React.useState(0)

  return (
    <ButtonPrimitive
      data-slot="button-metallic"
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") setPass((n) => n + 1)
        onPointerEnter?.(event)
      }}
      className={cn(
        "group/metal relative isolate inline-flex shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-full text-sm font-medium whitespace-nowrap text-foreground outline-none select-none",
        "shadow-[0_1px_2px_rgb(0_0_0/0.18),0_4px_12px_-4px_rgb(0_0_0/0.25)] transition-[transform,box-shadow] duration-150",
        "focus-visible:ring-3 focus-visible:ring-ring active:translate-y-px active:shadow-[0_1px_1px_rgb(0_0_0/0.2)]",
        "disabled:pointer-events-none disabled:opacity-50",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        SIZES[size],
        className
      )}
      {...props}
    >
      {/* Chrome rim: a wide brushed gradient that drifts slowly behind the face. */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -left-1/4 -z-30 w-[150%]"
        style={{ backgroundImage: RIM }}
        animate={still ? { x: "0%" } : { x: ["0%", "12%", "0%"] }}
        transition={still ? { duration: 0 } : { duration: 9, ease: "easeInOut", repeat: Infinity }}
      />
      {/* Face: the neutral surface, inset by the rim width, with a soft top highlight. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-[2px] -z-20 rounded-[inherit] bg-card bg-linear-to-b from-white/10 to-black/[0.03] shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-1px_0_rgb(0_0_0/0.08)] transition-colors group-hover/metal:bg-secondary group-active/metal:from-black/[0.04] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.1),inset_0_-1px_0_rgb(0_0_0/0.35)]"
      />
      {/* Reflection: a skewed band of light that travels across rim and face. */}
      {!still && (
        <motion.span
          key={pass}
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 -z-10 w-1/3 -skew-x-[18deg] bg-linear-to-r from-transparent via-white/45 to-transparent mix-blend-soft-light dark:via-white/25 dark:mix-blend-normal"
          initial={{ x: "-150%" }}
          animate={{ x: "400%" }}
          transition={{
            duration: 1.3,
            ease: [0.45, 0, 0.55, 1],
            repeat: Infinity,
            repeatDelay: interval,
          }}
        />
      )}
      {children}
    </ButtonPrimitive>
  )
}

export { MetallicButton, type MetallicButtonProps }
