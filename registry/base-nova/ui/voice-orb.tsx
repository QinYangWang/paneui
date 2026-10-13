"use client"

import * as React from "react"
import { isMotionValue, useReducedMotion, type MotionValue } from "motion/react"

import { cn } from "@/lib/utils"

type VoiceOrbState = "idle" | "listening" | "thinking" | "speaking"

type VoiceOrbProps = Omit<React.ComponentProps<"div">, "children"> & {
  state?: VoiceOrbState
  /** Normalised audio level 0–1. A MotionValue updates without re-rendering. */
  level?: number | MotionValue<number>
  /** Caller-owned analyser; when set its RMS level drives the orb. The orb never opens a microphone. */
  analyser?: AnalyserNode | null
  /** Pigments as hex: base, highlight, deep shadow. */
  colors?: readonly [string, string, string]
  /** Diameter in px. Defaults to filling the element (square). */
  size?: number
  /** Animation speed multiplier. */
  speed?: number
}

const DEFAULT_COLORS = ["#3b82f6", "#a5f3fc", "#312e81"] as const

/** Per-state motion character: breathing, wobble, swirl speed, level gain. */
const STATE_TUNING: Record<VoiceOrbState, { breathe: number; wobble: number; swirl: number; gain: number; glow: number }> = {
  idle: { breathe: 0.025, wobble: 0.012, swirl: 0.25, gain: 0, glow: 0.35 },
  listening: { breathe: 0.02, wobble: 0.02, swirl: 0.45, gain: 0.7, glow: 0.55 },
  thinking: { breathe: 0.035, wobble: 0.03, swirl: 1.6, gain: 0.15, glow: 0.6 },
  speaking: { breathe: 0.015, wobble: 0.025, swirl: 0.7, gain: 1, glow: 0.75 },
}

function hexToRgb(hex: string): [number, number, number] {
  let h = hex.replace("#", "")
  if (h.length === 3) h = h.split("").map((c) => c + c).join("")
  const n = Number.parseInt(h, 16)
  if (Number.isNaN(n) || h.length !== 6) return [59, 130, 246]
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

const rgba = ([r, g, b]: [number, number, number], a: number) => `rgba(${r},${g},${b},${a})`
const mix = (a: [number, number, number], b: [number, number, number], t: number): [number, number, number] => [
  a[0] + (b[0] - a[0]) * t,
  a[1] + (b[1] - a[1]) * t,
  a[2] + (b[2] - a[2]) * t,
]
const clamp01 = (v: number) => (Number.isFinite(v) ? Math.max(0, Math.min(1, v)) : 0)
const lerp = (a: number, b: number, t: number) => a + (b - a) * t

/**
 * Breathing liquid orb for voice interfaces. Its silhouette swells with the
 * audio level, highlights flow inside it, and each state (idle, listening,
 * thinking, speaking) has its own rhythm. Pauses offscreen and holds still
 * under reduced motion.
 */
function VoiceOrb({
  state = "idle",
  level = 0,
  analyser = null,
  colors = DEFAULT_COLORS,
  size,
  speed = 1,
  className,
  style,
  "aria-label": ariaLabel,
  ...props
}: VoiceOrbProps) {
  const reduce = useReducedMotion() ?? false
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const drawRef = React.useRef<(() => void) | null>(null)

  // Everything the frame loop reads lives in a ref so props never restart it.
  const live = React.useRef({ state, level, analyser, colors, speed, reduce })
  React.useLayoutEffect(() => {
    live.current = { state, level, analyser, colors, speed, reduce }
    drawRef.current?.()
  })

  React.useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return

    let raf = 0
    let visible = true
    let last = performance.now()
    let t = Math.random() * 100
    let w = 0
    let h = 0
    let dpr = 1
    let sample: Uint8Array<ArrayBuffer> | null = null
    // Smoothed values so state changes blend instead of snapping.
    const s = { level: 0, breathe: 0, wobble: 0, swirl: 0, glow: 0 }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = Math.max(1, Math.round(rect.width * dpr))
      h = Math.max(1, Math.round(rect.height * dpr))
      canvas.width = w
      canvas.height = h
    }

    const readLevel = () => {
      const cur = live.current
      if (cur.analyser) {
        const a = cur.analyser
        if (!sample || sample.length !== a.fftSize) sample = new Uint8Array(new ArrayBuffer(a.fftSize))
        a.getByteTimeDomainData(sample)
        let sum = 0
        for (let i = 0; i < sample.length; i++) {
          const v = (sample[i] - 128) / 128
          sum += v * v
        }
        return clamp01(Math.sqrt(sum / sample.length) * 3.2)
      }
      return clamp01(isMotionValue(cur.level) ? cur.level.get() : cur.level)
    }

    const frame = (now: number) => {
      const cur = live.current
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      const still = cur.reduce
      if (!still) t += dt * Math.max(0, cur.speed)

      const tune = STATE_TUNING[cur.state] ?? STATE_TUNING.idle
      const k = still ? 1 : 1 - Math.exp(-dt * 6)
      const target = readLevel() * tune.gain
      // Rise fast, fall slower: reads as a voice, not a meter.
      s.level = lerp(s.level, target, still ? 1 : 1 - Math.exp(-dt * (target > s.level ? 18 : 7)))
      s.breathe = lerp(s.breathe, tune.breathe, k)
      s.wobble = lerp(s.wobble, tune.wobble, k)
      s.swirl = lerp(s.swirl, tune.swirl, k)
      s.glow = lerp(s.glow, tune.glow, k)

      draw()
      if (!still && visible) raf = requestAnimationFrame(frame)
      else raf = 0
    }

    const draw = () => {
      const cur = live.current
      const [baseHex, hiHex, deepHex] = cur.colors
      const base = hexToRgb(baseHex)
      const hi = hexToRgb(hiHex)
      const deep = hexToRgb(deepHex)

      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.clearRect(0, 0, w, h)
      const cx = w / 2
      const cy = h / 2
      const R0 = Math.min(w, h) * 0.3
      const lv = s.level
      const breath = Math.sin(t * 1.3) * s.breathe
      // Clamp: a deep breath on a tiny canvas could push the radius below 0 and make createRadialGradient throw.
      const R = Math.max(1, R0 * (1 + breath + lv * 0.12))

      // Silhouette: a circle with a few slow harmonics, louder when the voice is.
      const amp = s.wobble + lv * 0.055
      const shape = (a: number) =>
        1 +
        amp * Math.sin(3 * a + t * 1.7) +
        amp * 0.7 * Math.sin(5 * a - t * 2.3 + 1.3) +
        amp * 0.45 * Math.sin(2 * a + t * 1.1 + 2.1) +
        lv * 0.03 * Math.sin(8 * a + t * 6.5)

      const path = new Path2D()
      const steps = 96
      for (let i = 0; i <= steps; i++) {
        const a = (i / steps) * Math.PI * 2
        const r = R * shape(a)
        const x = cx + Math.cos(a) * r
        const y = cy + Math.sin(a) * r
        if (i === 0) path.moveTo(x, y)
        else path.lineTo(x, y)
      }
      path.closePath()

      // Outer glow.
      const glowR = Math.max(R * 0.6, Math.min(R * (1.55 + lv * 0.25), Math.min(w, h) * 0.5))
      const glow = ctx.createRadialGradient(cx, cy, R * 0.6, cx, cy, glowR)
      glow.addColorStop(0, rgba(base, 0.28 * s.glow + lv * 0.2))
      glow.addColorStop(1, rgba(base, 0))
      ctx.fillStyle = glow
      ctx.beginPath()
      ctx.arc(cx, cy, glowR, 0, Math.PI * 2)
      ctx.fill()

      ctx.save()
      ctx.clip(path)

      // Body: deep at the lower right, base in the middle.
      const body = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.35, R * 0.1, cx, cy, R * 1.25)
      body.addColorStop(0, rgba(mix(base, hi, 0.35), 1))
      body.addColorStop(0.55, rgba(base, 1))
      body.addColorStop(1, rgba(deep, 1))
      ctx.fillStyle = body
      ctx.fillRect(cx - R * 2, cy - R * 2, R * 4, R * 4)

      // Flowing liquid blobs orbiting inside the clip.
      ctx.globalCompositeOperation = "lighter"
      const blobs = 4
      for (let i = 0; i < blobs; i++) {
        const phase = (i / blobs) * Math.PI * 2
        const orbit = R * (0.38 + 0.12 * Math.sin(t * 0.7 + i * 1.9))
        const ang = phase + t * s.swirl * (i % 2 ? -1 : 1) * (0.6 + i * 0.15)
        const bx = cx + Math.cos(ang) * orbit
        const by = cy + Math.sin(ang * 1.1) * orbit * 0.85
        const br = R * (0.55 + 0.15 * Math.sin(t * 1.4 + i) + lv * 0.2)
        const c = i % 2 ? hi : mix(base, hi, 0.5)
        const g = ctx.createRadialGradient(bx, by, 0, bx, by, br)
        g.addColorStop(0, rgba(c, 0.32 + lv * 0.18))
        g.addColorStop(1, rgba(c, 0))
        ctx.fillStyle = g
        ctx.fillRect(bx - br, by - br, br * 2, br * 2)
      }

      // Deep pool sloshing at the bottom.
      ctx.globalCompositeOperation = "multiply"
      const px = cx + Math.sin(t * 0.9) * R * 0.25
      const py = cy + R * (0.55 + Math.cos(t * 1.2) * 0.08)
      const pool = ctx.createRadialGradient(px, py, 0, px, py, R * 0.9)
      pool.addColorStop(0, rgba(deep, 0.55))
      pool.addColorStop(1, rgba(deep, 0))
      ctx.fillStyle = pool
      ctx.fillRect(cx - R * 2, cy - R * 2, R * 4, R * 4)

      // Rim shading for depth.
      ctx.globalCompositeOperation = "source-over"
      const rim = ctx.createRadialGradient(cx, cy, R * 0.72, cx, cy, R * 1.12)
      rim.addColorStop(0, rgba(deep, 0))
      rim.addColorStop(1, rgba(deep, 0.45))
      ctx.fillStyle = rim
      ctx.fillRect(cx - R * 2, cy - R * 2, R * 4, R * 4)

      // Specular highlight, drifting gently.
      const sx = cx - R * (0.34 + Math.sin(t * 0.6) * 0.04)
      const sy = cy - R * (0.42 + Math.cos(t * 0.5) * 0.03)
      const spec = ctx.createRadialGradient(sx, sy, 0, sx, sy, R * 0.45)
      spec.addColorStop(0, "rgba(255,255,255,0.75)")
      spec.addColorStop(0.35, "rgba(255,255,255,0.22)")
      spec.addColorStop(1, "rgba(255,255,255,0)")
      ctx.fillStyle = spec
      ctx.fillRect(cx - R * 2, cy - R * 2, R * 4, R * 4)

      // Fine grain so the gradient reads as material, not a flat fill.
      ctx.globalAlpha = 0.06
      ctx.fillStyle = "#fff"
      const seed = Math.floor(t * 12)
      for (let i = 0; i < 70; i++) {
        const rx = Math.sin(i * 12.9898 + seed * 78.233) * 43758.5453
        const ry = Math.sin(i * 39.3468 + seed * 11.135) * 24634.6345
        const gx = cx + ((rx - Math.floor(rx)) * 2 - 1) * R
        const gy = cy + ((ry - Math.floor(ry)) * 2 - 1) * R
        ctx.fillRect(gx, gy, dpr, dpr)
      }
      ctx.globalAlpha = 1
      ctx.restore()
    }

    const start = () => {
      if (raf || !visible) return
      last = performance.now()
      raf = requestAnimationFrame(frame)
    }
    // Props changed: one frame under reduced motion, or wake the loop.
    drawRef.current = () => start()

    resize()
    start()

    const ro = new ResizeObserver(() => {
      resize()
      start()
    })
    ro.observe(canvas)
    const io = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? true
      if (visible) start()
    })
    io.observe(canvas)
    const onVisibility = () => {
      visible = document.visibilityState === "visible"
      if (visible) start()
    }
    document.addEventListener("visibilitychange", onVisibility)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      document.removeEventListener("visibilitychange", onVisibility)
      drawRef.current = null
    }
  }, [])

  return (
    <div
      role="img"
      aria-label={ariaLabel ?? `Voice assistant ${state}`}
      data-slot="voice-orb"
      data-state={state}
      className={cn("relative aspect-square", size === undefined && "size-40", className)}
      style={size !== undefined ? { width: size, height: size, ...style } : style}
      {...props}
    >
      <canvas ref={canvasRef} aria-hidden className="pointer-events-none absolute -top-[15%] -left-[15%] size-[130%]" />
    </div>
  )
}

export { VoiceOrb, type VoiceOrbProps, type VoiceOrbState }
