"use client"

import * as React from "react"
import {
  animate,
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type AnimationPlaybackControls,
} from "motion/react"

import { cn } from "@/lib/utils"

type HoldPhase = "idle" | "holding" | "complete"

type HoldActionButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "children" | "onClick"
> & {
  children: React.ReactNode
  /** Which way the liquid rises: bottom→top or left→right. */
  orientation?: "vertical" | "horizontal"
  /** Fill colour. */
  tone?: "primary" | "destructive" | "success"
  holdingLabel?: React.ReactNode
  completeLabel?: React.ReactNode
  /** Milliseconds the hold must last. */
  holdDuration?: number
  /** Milliseconds the completed state shows before the button drains and resets. Pass null to stay complete. */
  resetDelay?: number | null
  onHoldComplete?: () => void
  /** Screen-reader instruction for how to use the control. */
  hint?: string
}

const TONES = {
  primary: { fill: "bg-primary text-primary-foreground", wave: "text-primary" },
  destructive: { fill: "bg-destructive text-white", wave: "text-destructive" },
  success: { fill: "bg-success text-white", wave: "text-success" },
}

// Two identical periods of a gentle sine, so translating by half loops seamlessly.
// Vertical: liquid below the line. Horizontal: liquid left of the line.
const WAVE_X = "M0 6 Q12.5 0 25 6 T50 6 T75 6 T100 6 T125 6 T150 6 T175 6 T200 6 V12 H0 Z"
const WAVE_Y = "M6 0 Q12 12.5 6 25 T6 50 T6 75 T6 100 T6 125 T6 150 T6 175 T6 200 H0 V0 Z"
// The wave strip is 10px; its first ~5px (behind the crest line) are always solid.
const WAVE_OVERLAP = 3

function HoldActionButton({
  children,
  orientation = "vertical",
  tone = "primary",
  holdingLabel = "Keep holding",
  completeLabel = "Done",
  holdDuration = 1500,
  resetDelay = 1800,
  onHoldComplete,
  hint = "Press and hold to confirm",
  disabled,
  className,
  onKeyDown,
  onKeyUp,
  onBlur,
  onPointerDown,
  onPointerUp,
  onPointerMove,
  onPointerCancel,
  ...props
}: HoldActionButtonProps) {
  const reduce = useReducedMotion()
  const hintId = React.useId()
  const vertical = orientation === "vertical"
  const progress = useMotionValue(0)
  const [phase, setPhase] = React.useState<HoldPhase>("idle")
  const phaseRef = React.useRef<HoldPhase>("idle")
  const controls = React.useRef<AnimationPlaybackControls | null>(null)
  const resetTimer = React.useRef<number | undefined>(undefined)
  const onCompleteRef = React.useRef(onHoldComplete)
  onCompleteRef.current = onHoldComplete

  const go = React.useCallback((next: HoldPhase) => {
    phaseRef.current = next
    setPhase(next)
  }, [])

  const drain = React.useCallback(() => {
    controls.current?.stop()
    controls.current = animate(
      progress,
      0,
      reduce ? { duration: 0.2 } : { type: "spring", stiffness: 260, damping: 30 }
    )
  }, [progress, reduce])

  const start = () => {
    if (disabled || phaseRef.current !== "idle") return
    go("holding")
    controls.current?.stop()
    controls.current = animate(progress, 1, {
      duration: (holdDuration / 1000) * (1 - progress.get()),
      ease: "linear",
      onComplete: () => {
        if (phaseRef.current !== "holding") return
        go("complete")
        navigator.vibrate?.(12)
        onCompleteRef.current?.()
        if (resetDelay !== null) {
          resetTimer.current = window.setTimeout(() => {
            go("idle")
            drain()
          }, resetDelay)
        }
      },
    })
  }

  const cancel = () => {
    if (phaseRef.current !== "holding") return
    go("idle")
    drain()
  }

  React.useEffect(
    () => () => {
      controls.current?.stop()
      window.clearTimeout(resetTimer.current)
    },
    []
  )

  // The liquid's clip edge and the wave's trailing edge land on fractional
  // pixels every frame; two anti-aliased edges meeting there let the light face
  // show through as a flickering hairline. Run the liquid WAVE_OVERLAP px past
  // the edge, under the wave's always-solid band, so there is no seam to see.
  const clip = useTransform(progress, (p) => {
    if (p <= 0) return vertical ? "inset(100% 0 0 0)" : "inset(0 100% 0 0)"
    const at = `calc(${(1 - p) * 100}% - ${WAVE_OVERLAP}px)`
    return vertical ? `inset(${at} 0 0 0)` : `inset(0 ${at} 0 0)`
  })
  const edge = useTransform(progress, (p) => `${p * 100}%`)
  const waveOpacity = useTransform(progress, [0, 0.02, 0.97, 1], [0, 1, 1, 0])

  const label = phase === "holding" ? holdingLabel : phase === "complete" ? completeLabel : children
  const labelLayer = (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.span
        key={phase}
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8, filter: "blur(4px)" }}
        transition={{ type: "spring", stiffness: 420, damping: 32 }}
        className="inline-flex items-center gap-2 whitespace-nowrap [&_svg]:size-4.5 [&_svg]:shrink-0"
      >
        {label}
      </motion.span>
    </AnimatePresence>
  )

  return (
    <button
      type="button"
      data-slot="hold-action-button"
      data-phase={phase}
      data-orientation={orientation}
      disabled={disabled}
      aria-describedby={hintId}
      onPointerDown={(event) => {
        onPointerDown?.(event)
        if (event.button !== 0) return
        start()
        try {
          event.currentTarget.setPointerCapture(event.pointerId)
        } catch {}
      }}
      onPointerMove={(event) => {
        onPointerMove?.(event)
        if (phaseRef.current !== "holding") return
        const r = event.currentTarget.getBoundingClientRect()
        if (
          event.clientX < r.left ||
          event.clientX > r.right ||
          event.clientY < r.top ||
          event.clientY > r.bottom
        )
          cancel()
      }}
      onPointerUp={(event) => {
        onPointerUp?.(event)
        cancel()
      }}
      onPointerCancel={(event) => {
        onPointerCancel?.(event)
        cancel()
      }}
      onKeyDown={(event) => {
        onKeyDown?.(event)
        if ((event.key === " " || event.key === "Enter") && !event.repeat) {
          event.preventDefault()
          start()
        }
      }}
      onKeyUp={(event) => {
        onKeyUp?.(event)
        if (event.key === " " || event.key === "Enter") {
          event.preventDefault()
          cancel()
        }
      }}
      onBlur={(event) => {
        onBlur?.(event)
        cancel()
      }}
      onContextMenu={(event) => event.preventDefault()}
      className={cn(
        "group/hold relative isolate inline-grid h-14 min-w-64 cursor-pointer touch-none place-items-center overflow-hidden rounded-2xl bg-secondary px-6 text-[0.95rem] font-medium text-secondary-foreground shadow-raised outline-none select-none [-webkit-touch-callout:none]",
        "transition-[box-shadow,transform] duration-150 hover:shadow-raised-hover focus-visible:ring-3 focus-visible:ring-ring data-[phase=holding]:scale-[0.985] motion-reduce:data-[phase=holding]:scale-100",
        "disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...props}
    >
      {labelLayer}

      {/* Liquid: a filled copy of the face, revealed by a clip that follows progress. */}
      <motion.span
        aria-hidden
        style={{ clipPath: clip }}
        className={cn(
          "pointer-events-none absolute inset-0 grid place-items-center",
          TONES[tone].fill
        )}
      >
        {labelLayer}
      </motion.span>

      {/* Wave riding the liquid's leading edge. */}
      <motion.span
        aria-hidden
        style={
          vertical
            ? { bottom: edge, opacity: waveOpacity }
            : { left: edge, opacity: waveOpacity }
        }
        className={cn(
          "pointer-events-none absolute overflow-hidden",
          vertical ? "inset-x-0 h-2.5" : "inset-y-0 w-2.5",
          TONES[tone].wave
        )}
      >
        <motion.svg
          viewBox={vertical ? "0 0 200 12" : "0 0 12 200"}
          preserveAspectRatio="none"
          className={cn(
            "absolute top-0 left-0 fill-current",
            vertical ? "h-full w-[200%]" : "h-[200%] w-full"
          )}
          animate={reduce ? undefined : vertical ? { x: ["0%", "-50%"] } : { y: ["0%", "-50%"] }}
          transition={{ duration: 1.1, ease: "linear", repeat: Infinity }}
        >
          <path d={vertical ? WAVE_X : WAVE_Y} />
        </motion.svg>
      </motion.span>

      {/* One sheen over face, liquid and wave alike, so the wave (a plain fill)
          and the liquid behind it are exactly the same colour: no band at the edge. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] bg-linear-to-b from-white/8 to-transparent"
      />

      <span id={hintId} className="sr-only">
        {hint}
      </span>
      <span className="sr-only" aria-live="polite">
        {phase === "complete" ? completeLabel : ""}
      </span>
    </button>
  )
}

export { HoldActionButton, type HoldActionButtonProps }
