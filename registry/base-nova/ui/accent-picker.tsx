"use client"

import * as React from "react"
import { Radio as RadioPrimitive } from "@base-ui/react/radio"
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group"

import { CheckIcon } from "@/components/icons"
import { cn } from "@/lib/utils"

/*
 * Accent colour picker for an app's appearance settings. Switches the
 * `--accent-50…950` ramp the theme's `primary` and `ring` read, by setting
 * `data-accent` on <html> (blue, the default, has no attribute), and remembers
 * the pick in localStorage["accent"].
 *
 * The preset ramps ship inside this file (the same values as the
 * `html[data-accent]` blocks in the qinyang/ui theme), injected once as a
 * <style>, so it works in any app that installed @qinyang/theme.
 *
 *   <AccentPicker />                              ← self-contained
 *   const [accent, setAccent] = useAccent()       ← your own control
 */

const ACCENTS = ["blue", "neutral", "green", "orange", "rose", "violet"] as const
type Accent = (typeof ACCENTS)[number]

const ACCENT_LABELS: Record<Accent, string> = {
  blue: "Blue",
  neutral: "Neutral",
  green: "Green",
  orange: "Orange",
  rose: "Rose",
  violet: "Violet",
}

/** Each preset's light-mode primary (neutral follows the foreground). */
const SWATCH: Record<Accent, string> = {
  blue: "oklch(54.6% 0.245 262.881)",
  neutral: "var(--foreground)",
  green: "oklch(52.7% 0.154 150.069)",
  orange: "oklch(55.3% 0.195 38.402)",
  rose: "oklch(58.6% 0.253 17.585)",
  violet: "oklch(54.1% 0.281 293.009)",
}

const STORAGE_KEY = "accent"
const STYLE_ID = "qy-accent-presets"
/** Same-tab broadcast so every picker (and the qinyang/ui docs header) stays in step. */
const ACCENT_CHANGE_EVENT = "qy-accent-change"
const PRESETS_CSS = `html[data-accent="neutral"] { --accent-50: oklch(98.5% 0 0); --accent-100: oklch(97.6% 0 0); --accent-200: oklch(94% 0 0); --accent-300: oklch(87% 0 0); --accent-400: oklch(70.8% 0 0); --accent-500: oklch(55.6% 0 0); --accent-600: oklch(43.9% 0 0); --accent-700: oklch(37.1% 0 0); --accent-800: oklch(26.9% 0 0); --accent-900: oklch(20.5% 0 0); --accent-950: oklch(14.5% 0 0); --primary: var(--accent-900); --primary-foreground: oklch(100% 0 0); --ring: var(--accent-400); } html[data-accent="neutral"].dark { --primary: var(--accent-100); --primary-foreground: var(--accent-900); --ring: var(--accent-500); } html[data-accent="green"] { --accent-50: oklch(98.2% 0.018 155.826); --accent-100: oklch(96.2% 0.044 156.743); --accent-200: oklch(92.5% 0.084 155.995); --accent-300: oklch(87.1% 0.150 154.449); --accent-400: oklch(79.2% 0.209 151.711); --accent-500: oklch(72.3% 0.219 149.579); --accent-600: oklch(62.7% 0.194 149.214); --accent-700: oklch(52.7% 0.154 150.069); --accent-800: oklch(44.8% 0.119 151.328); --accent-900: oklch(39.3% 0.095 152.535); --accent-950: oklch(26.6% 0.065 152.934); --primary: var(--accent-700); } html[data-accent="orange"] { --accent-50: oklch(98% 0.016 73.684); --accent-100: oklch(95.4% 0.038 75.164); --accent-200: oklch(90.1% 0.076 70.697); --accent-300: oklch(83.7% 0.128 66.290); --accent-400: oklch(75% 0.183 55.934); --accent-500: oklch(70.5% 0.213 47.604); --accent-600: oklch(64.6% 0.222 41.116); --accent-700: oklch(55.3% 0.195 38.402); --accent-800: oklch(47% 0.157 37.304); --accent-900: oklch(40.8% 0.123 38.172); --accent-950: oklch(26.6% 0.079 36.259); --primary: var(--accent-700); } html[data-accent="rose"] { --accent-50: oklch(96.9% 0.015 12.422); --accent-100: oklch(94.1% 0.030 12.580); --accent-200: oklch(89.2% 0.058 10.001); --accent-300: oklch(81% 0.117 11.638); --accent-400: oklch(71.2% 0.194 13.428); --accent-500: oklch(64.5% 0.246 16.439); --accent-600: oklch(58.6% 0.253 17.585); --accent-700: oklch(51.4% 0.222 16.935); --accent-800: oklch(45.5% 0.188 13.697); --accent-900: oklch(41% 0.159 10.272); --accent-950: oklch(27.1% 0.105 12.094); } html[data-accent="violet"] { --accent-50: oklch(96.9% 0.016 293.756); --accent-100: oklch(94.3% 0.029 294.588); --accent-200: oklch(89.4% 0.057 293.283); --accent-300: oklch(81.1% 0.111 293.571); --accent-400: oklch(70.2% 0.183 293.541); --accent-500: oklch(60.6% 0.250 292.717); --accent-600: oklch(54.1% 0.281 293.009); --accent-700: oklch(49.1% 0.270 292.581); --accent-800: oklch(43.2% 0.232 292.759); --accent-900: oklch(38% 0.189 293.745); --accent-950: oklch(28.3% 0.141 291.089); }`

const isAccent = (v: unknown): v is Accent => typeof v === "string" && (ACCENTS as readonly string[]).includes(v)

function ensurePresets() {
  if (document.getElementById(STYLE_ID)) return
  const style = document.createElement("style")
  style.id = STYLE_ID
  style.textContent = PRESETS_CSS
  document.head.appendChild(style)
}

function readAccent(): Accent {
  const attr = document.documentElement.getAttribute("data-accent")
  if (isAccent(attr)) return attr
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (isAccent(stored)) return stored
  } catch {
    // storage can be unavailable (private mode, sandboxed iframes)
  }
  return "blue"
}

function applyAccent(accent: Accent) {
  ensurePresets()
  const root = document.documentElement
  if (accent === "blue") root.removeAttribute("data-accent")
  else root.setAttribute("data-accent", accent)
  try {
    localStorage.setItem(STORAGE_KEY, accent)
  } catch {
    // ignore
  }
  window.dispatchEvent(new CustomEvent(ACCENT_CHANGE_EVENT))
}

/** Current accent and a setter. Re-applies the stored accent on mount. */
function useAccent(): [Accent, (accent: Accent) => void] {
  const [accent, setState] = React.useState<Accent>("blue")
  React.useEffect(() => {
    ensurePresets()
    const sync = () => setState(readAccent())
    const stored = readAccent()
    if (stored !== "blue" && !document.documentElement.hasAttribute("data-accent")) {
      document.documentElement.setAttribute("data-accent", stored)
    }
    sync()
    const mo = new MutationObserver(sync)
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-accent"] })
    window.addEventListener(ACCENT_CHANGE_EVENT, sync)
    return () => {
      mo.disconnect()
      window.removeEventListener(ACCENT_CHANGE_EVENT, sync)
    }
  }, [])
  const set = React.useCallback((next: Accent) => {
    setState(next)
    applyAccent(next)
  }, [])
  return [accent, set]
}

const ACCENT_SCRIPT = `(function(){try{var a=localStorage.getItem("${STORAGE_KEY}");if(a&&a!=="blue"&&${JSON.stringify(ACCENTS)}.indexOf(a)>-1)document.documentElement.setAttribute("data-accent",a)}catch(e){}})()`

/**
 * The preset ramps as a <style> plus a tiny pre-paint script that applies the stored
 * accent before first paint. Render once near the top of your root layout's <body>
 * (or <head>) so a reload never flashes the default blue.
 */
function AccentPresets() {
  return (
    <>
      <style id={STYLE_ID} dangerouslySetInnerHTML={{ __html: PRESETS_CSS }} />
      <script dangerouslySetInnerHTML={{ __html: ACCENT_SCRIPT }} />
    </>
  )
}

type AccentPickerProps = Omit<RadioGroupPrimitive.Props<string>, "value" | "defaultValue" | "onValueChange" | "children"> & {
  /** Presets to offer, in order. Default all six. */
  accents?: readonly Accent[]
  /** Show the name under each swatch. */
  showLabels?: boolean
}

function AccentPicker({ accents = ACCENTS, showLabels = false, className, ...props }: AccentPickerProps) {
  const [accent, setAccent] = useAccent()
  return (
    <RadioGroupPrimitive
      data-slot="accent-picker"
      aria-label="Accent colour"
      value={accent}
      onValueChange={(v) => isAccent(v) && setAccent(v)}
      className={cn("flex flex-wrap items-start gap-3", className)}
      {...props}
    >
      {accents.map((a) => (
        <label key={a} className="flex cursor-pointer flex-col items-center gap-1.5 text-ui-sm text-muted-foreground has-data-checked:text-foreground">
          <RadioPrimitive.Root
            value={a}
            aria-label={ACCENT_LABELS[a]}
            style={{ "--swatch": SWATCH[a] } as React.CSSProperties}
            className="relative grid size-7 cursor-pointer place-items-center rounded-full bg-(--swatch) text-background outline-none ring-offset-2 ring-offset-background transition-[box-shadow] duration-150 after:absolute after:inset-0 after:rounded-full after:ring-1 after:ring-foreground/10 after:ring-inset focus-visible:ring-2 focus-visible:ring-ring/50 data-checked:ring-2 data-checked:ring-foreground/30"
          >
            <RadioPrimitive.Indicator className="flex transition-[opacity,scale] duration-150 data-ending-style:scale-50 data-ending-style:opacity-0 data-starting-style:scale-50 data-starting-style:opacity-0 [&_svg]:size-3.5">
              <CheckIcon className={a === "neutral" ? "text-background" : "text-white"} />
            </RadioPrimitive.Indicator>
          </RadioPrimitive.Root>
          {showLabels && <span>{ACCENT_LABELS[a]}</span>}
        </label>
      ))}
    </RadioGroupPrimitive>
  )
}

export { AccentPicker, AccentPresets, useAccent, ACCENTS, ACCENT_LABELS, ACCENT_CHANGE_EVENT }
export type { Accent, AccentPickerProps }
