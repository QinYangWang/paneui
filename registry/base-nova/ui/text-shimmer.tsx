import * as React from "react"

import { cn } from "@/lib/utils"

type TextShimmerTag = "span" | "p" | "div" | "h1" | "h2" | "h3" | "h4"

type TextShimmerProps = React.HTMLAttributes<HTMLElement> & {
  as?: TextShimmerTag
  /** Seconds for one sweep. */
  duration?: number
  /** Width of the bright band, as a percentage of the gradient. */
  spread?: number
}

// Shipped with the component (React hoists and dedupes it by href) so an
// installed copy brings its own keyframes and reduced-motion rule.
const SHIMMER_CSS =
  "@keyframes qy-text-shimmer{from{background-position:100% 0}to{background-position:0% 0}}" +
  "@media (prefers-reduced-motion: reduce){[data-slot=text-shimmer]{animation:none!important;background-position:50% 0!important}}"

function TextShimmer({
  as = "span",
  duration = 2.2,
  spread = 14,
  className,
  style,
  ...props
}: TextShimmerProps) {
  const Comp = as as React.ElementType
  return (
    <>
      <style href="qy-text-shimmer" precedence="default">
        {SHIMMER_CSS}
      </style>
      <Comp
        data-slot="text-shimmer"
        className={cn(
          "inline-block bg-size-[250%_100%] bg-clip-text bg-no-repeat text-transparent [-webkit-background-clip:text]",
          "[--shimmer-base:var(--muted-foreground)] [--shimmer-highlight:var(--foreground)]",
          className
        )}
        style={
          {
            backgroundImage: `linear-gradient(100deg, var(--shimmer-base) calc(50% - ${spread}%), var(--shimmer-highlight) 50%, var(--shimmer-base) calc(50% + ${spread}%))`,
            animationName: "qy-text-shimmer",
            animationDuration: `${duration}s`,
            animationTimingFunction: "cubic-bezier(0.45,0,0.55,1)",
            animationIterationCount: "infinite",
            ...style,
          } as React.CSSProperties
        }
        {...props}
      />
    </>
  )
}

export { TextShimmer, type TextShimmerProps }
