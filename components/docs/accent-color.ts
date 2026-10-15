/**
 * Accent colour model for the docs: the preset ramps (mirroring `:root` and the
 * `html[data-accent]` blocks in app/globals.css), OKLCH maths to derive a ramp and a
 * light + dark accent from any picked colour, and the CSS a user takes home.
 * Pure and client-safe.
 *
 * An accent is one `--accent-50…950` ramp; `--primary` (white text on the
 * 600 stop, 700 for green and orange), `--primary-foreground` and `--ring` (the 500 stop, used
 * at /50) read it. Blue is the default (no `data-accent`).
 */

export type AccentVars = { primary: string; foreground: string; ring: string }
/** `ramp`: the eleven stops 50…950 (same in both modes). */
export type AccentTheme = { light: AccentVars; dark: AccentVars; ramp?: string[] }
export type PresetAccent = "blue" | "neutral" | "green" | "orange" | "rose" | "violet"

/** The accent with no `data-accent` attribute: its ramp is the one on `:root`. */
export const DEFAULT_ACCENT: PresetAccent = "blue"

export const RAMP_STOPS = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"] as const
const stop = (s: (typeof RAMP_STOPS)[number]) => RAMP_STOPS.indexOf(s)

/** Tailwind's OKLCH ramps (blue-400 is #3392ff, neutral-100/200 #f7f7f7/#ebebeb). Mirrors app/globals.css. */
export const PRESET_RAMPS: Record<PresetAccent, string[]> = {
  blue: [
    "oklch(97% 0.014 254.604)",
    "oklch(93.2% 0.032 255.585)",
    "oklch(88.2% 0.059 254.128)",
    "oklch(80.9% 0.105 251.813)",
    "oklch(66% 0.184 254.753)",
    "oklch(62.3% 0.214 259.815)",
    "oklch(54.6% 0.245 262.881)",
    "oklch(48.8% 0.243 264.376)",
    "oklch(42.4% 0.199 265.638)",
    "oklch(37.9% 0.146 265.522)",
    "oklch(28.2% 0.091 267.935)",
  ],
  neutral: [
    "oklch(98.5% 0 0)",
    "oklch(97.6% 0 0)",
    "oklch(94% 0 0)",
    "oklch(87% 0 0)",
    "oklch(70.8% 0 0)",
    "oklch(55.6% 0 0)",
    "oklch(43.9% 0 0)",
    "oklch(37.1% 0 0)",
    "oklch(26.9% 0 0)",
    "oklch(20.5% 0 0)",
    "oklch(14.5% 0 0)",
  ],
  green: [
    "oklch(98.2% 0.018 155.826)",
    "oklch(96.2% 0.044 156.743)",
    "oklch(92.5% 0.084 155.995)",
    "oklch(87.1% 0.150 154.449)",
    "oklch(79.2% 0.209 151.711)",
    "oklch(72.3% 0.219 149.579)",
    "oklch(62.7% 0.194 149.214)",
    "oklch(52.7% 0.154 150.069)",
    "oklch(44.8% 0.119 151.328)",
    "oklch(39.3% 0.095 152.535)",
    "oklch(26.6% 0.065 152.934)",
  ],
  orange: [
    "oklch(98% 0.016 73.684)",
    "oklch(95.4% 0.038 75.164)",
    "oklch(90.1% 0.076 70.697)",
    "oklch(83.7% 0.128 66.290)",
    "oklch(75% 0.183 55.934)",
    "oklch(70.5% 0.213 47.604)",
    "oklch(64.6% 0.222 41.116)",
    "oklch(55.3% 0.195 38.402)",
    "oklch(47% 0.157 37.304)",
    "oklch(40.8% 0.123 38.172)",
    "oklch(26.6% 0.079 36.259)",
  ],
  rose: [
    "oklch(96.9% 0.015 12.422)",
    "oklch(94.1% 0.030 12.580)",
    "oklch(89.2% 0.058 10.001)",
    "oklch(81% 0.117 11.638)",
    "oklch(71.2% 0.194 13.428)",
    "oklch(64.5% 0.246 16.439)",
    "oklch(58.6% 0.253 17.585)",
    "oklch(51.4% 0.222 16.935)",
    "oklch(45.5% 0.188 13.697)",
    "oklch(41% 0.159 10.272)",
    "oklch(27.1% 0.105 12.094)",
  ],
  violet: [
    "oklch(96.9% 0.016 293.756)",
    "oklch(94.3% 0.029 294.588)",
    "oklch(89.4% 0.057 293.283)",
    "oklch(81.1% 0.111 293.571)",
    "oklch(70.2% 0.183 293.541)",
    "oklch(60.6% 0.250 292.717)",
    "oklch(54.1% 0.281 293.009)",
    "oklch(49.1% 0.270 292.581)",
    "oklch(43.2% 0.232 292.759)",
    "oklch(38% 0.189 293.745)",
    "oklch(28.3% 0.141 291.089)",
  ],
}

const WHITE_CSS = "oklch(100% 0 0)"

/** primary = a ramp stop with white text, ring = 500, the same in both modes. */
function rampTheme(ramp: string[], primaryStop: (typeof RAMP_STOPS)[number] = "600"): AccentTheme {
  const vars: AccentVars = { primary: ramp[stop(primaryStop)], foreground: WHITE_CSS, ring: ramp[stop("500")] }
  return { light: vars, dark: vars, ramp }
}

/** Resolved values of each preset (globals.css writes them as var(--accent-…) references). */
export const PRESET_THEMES: Record<PresetAccent, AccentTheme> = {
  blue: rampTheme(PRESET_RAMPS.blue),
  neutral: {
    light: { primary: PRESET_RAMPS.neutral[stop("900")], foreground: WHITE_CSS, ring: PRESET_RAMPS.neutral[stop("400")] },
    dark: { primary: PRESET_RAMPS.neutral[stop("100")], foreground: PRESET_RAMPS.neutral[stop("900")], ring: PRESET_RAMPS.neutral[stop("500")] },
    ramp: PRESET_RAMPS.neutral,
  },
  green: rampTheme(PRESET_RAMPS.green, "700"),
  orange: rampTheme(PRESET_RAMPS.orange, "700"),
  rose: rampTheme(PRESET_RAMPS.rose),
  violet: rampTheme(PRESET_RAMPS.violet),
}

/** Display names for the presets. */
export const PRESET_LABELS: Record<PresetAccent, string> = {
  blue: "Blue",
  neutral: "Neutral",
  green: "Green",
  orange: "Orange",
  rose: "Rose",
  violet: "Violet",
}

/* ─────────────────────────── OKLCH maths ─────────────────────────── */

type Oklch = { l: number; c: number; h: number }

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n))
const toLinear = (v: number) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)
const toGamma = (v: number) => (v <= 0.0031308 ? 12.92 * v : 1.055 * v ** (1 / 2.4) - 0.055)

function linearToOklch([r, g, b]: [number, number, number]): Oklch {
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b)
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b)
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b)
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s
  const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s
  const B = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s
  const h = (Math.atan2(B, A) * 180) / Math.PI
  return { l: L, c: Math.hypot(A, B), h: h < 0 ? h + 360 : h }
}

function oklchToLinear({ l: L, c, h }: Oklch): [number, number, number] {
  const A = c * Math.cos((h * Math.PI) / 180)
  const B = c * Math.sin((h * Math.PI) / 180)
  const l = (L + 0.3963377774 * A + 0.2158037573 * B) ** 3
  const m = (L - 0.1055613458 * A - 0.0638541728 * B) ** 3
  const s = (L - 0.0894841775 * A - 1.291485548 * B) ** 3
  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ]
}

const inGamut = (rgb: [number, number, number]) => rgb.every((v) => v >= -0.0005 && v <= 1.0005)

/** Lower chroma (keeping lightness and hue) until the colour fits sRGB. */
function fitGamut(c: Oklch): Oklch {
  if (inGamut(oklchToLinear(c))) return c
  let lo = 0
  let hi = c.c
  for (let i = 0; i < 24; i++) {
    const mid = (lo + hi) / 2
    if (inGamut(oklchToLinear({ ...c, c: mid }))) lo = mid
    else hi = mid
  }
  return { ...c, c: lo }
}

/** WCAG relative luminance of an OKLCH colour (via linear sRGB). */
function luminance(c: Oklch) {
  const [r, g, b] = oklchToLinear(fitGamut(c)).map((v) => clamp(v, 0, 1))
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}
const contrast = (a: Oklch, b: Oklch) => {
  const [x, y] = [luminance(a), luminance(b)].sort((p, q) => q - p)
  return (x + 0.05) / (y + 0.05)
}

export function hexToOklch(hex: string): Oklch | null {
  let h = hex.trim().replace(/^#/, "")
  if (!/^([0-9a-f]{3}|[0-9a-f]{6})([0-9a-f]{2})?$/i.test(h) && !/^[0-9a-f]{4}$/i.test(h)) return null
  if (h.length <= 4) h = [...h].map((ch) => ch + ch).join("")
  const n = (i: number) => toLinear(parseInt(h.slice(i, i + 2), 16) / 255)
  return linearToOklch([n(0), n(2), n(4)])
}

export function oklchToHex(c: Oklch): string {
  const rgb = oklchToLinear(fitGamut(c)).map((v) => Math.round(clamp(toGamma(clamp(v, 0, 1)), 0, 1) * 255))
  return `#${rgb.map((v) => v.toString(16).padStart(2, "0")).join("")}`
}

/** Parse `oklch(L C H)` (L as 0–1 or %). Alpha is ignored. */
export function parseOklch(css: string): Oklch | null {
  const m = /oklch\(\s*([\d.]+)(%?)\s+([\d.]+)\s+([\d.]+)/i.exec(css)
  if (!m) return null
  return { l: m[2] ? +m[1] / 100 : +m[1], c: +m[3], h: +m[4] }
}

const fmt = (c: Oklch) => {
  const r = (n: number, d: number) => +n.toFixed(d)
  return c.c < 0.0005 ? `oklch(${r(c.l, 3)} 0 0)` : `oklch(${r(c.l, 3)} ${r(c.c, 3)} ${r(c.h, 1)})`
}

const BG_LIGHT: Oklch = { l: 1, c: 0, h: 0 } // --background, light (white)
const BG_DARK: Oklch = { l: 0.182, c: 0, h: 0 } // --background, dark (#121212)
const WHITE: Oklch = { l: 1, c: 0, h: 0 }

/**
 * White text unless a dark tint of the hue reads clearly better. White is favoured on saturated
 * fills, as on every preset in app/globals.css.
 */
function pickForeground(fill: Oklch): Oklch {
  const dark: Oklch = { l: 0.2, c: Math.min(fill.c, 0.04), h: fill.h }
  if (fill.c < 0.03) return contrast(fill, WHITE) >= contrast(fill, dark) ? WHITE : { l: 0.205, c: 0, h: 0 }
  return contrast(fill, WHITE) * 1.6 >= contrast(fill, dark) ? WHITE : dark
}

/** Darken (step < 0) or lighten until the fill reaches 3:1 against the page, the WCAG minimum for controls. */
function ensureContrast(c: Oklch, bg: Oklch, step: number): Oklch {
  let out = fitGamut(c)
  for (let i = 0; i < 40 && contrast(out, bg) < 3; i++) out = fitGamut({ ...out, l: clamp(out.l + step, 0, 1) })
  return out
}

const BLUE_RAMP = PRESET_RAMPS.blue.map((v) => parseOklch(v) as Oklch)
const NEUTRAL_RAMP = PRESET_RAMPS.neutral.map((v) => parseOklch(v) as Oklch)

/**
 * A ramp for any hue: each stop keeps the blue ramp's lightness
 * (so contrast against the page and white text stays where blue's is), takes the picked hue, and
 * scales blue's chroma by how saturated the pick is next to blue-600, fitted to sRGB.
 */
export function deriveRamp(base: Oklch): string[] {
  if (base.c < 0.03) return NEUTRAL_RAMP.map((n) => fmt(fitGamut({ l: n.l, c: base.c * 0.5, h: base.h })))
  const k = clamp(base.c / BLUE_RAMP[stop("600")].c, 0.2, 1.4)
  return BLUE_RAMP.map((b) => fmt(fitGamut({ l: b.l, c: b.c * k, h: base.h })))
}

/**
 * Derive both modes from one picked colour.
 * The primary is the colour as picked, in both modes like the presets (darkened in light mode, or
 * lifted in dark mode, only if it would fall under 3:1 against that page), with white or dark text
 * by contrast; the ring is the derived ramp's 500 stop. A near-grey pick mirrors the neutral
 * preset instead (ramp 900 with white text in light, 100 with dark text in dark).
 */
export function deriveAccent(hex: string): AccentTheme | null {
  const base = hexToOklch(hex)
  if (!base) return null
  const ramp = deriveRamp(base)
  const at = (s: (typeof RAMP_STOPS)[number]) => ramp[stop(s)]
  if (base.c < 0.03) {
    return {
      light: { primary: at("900"), foreground: fmt(WHITE), ring: at("400") },
      dark: { primary: at("100"), foreground: at("900"), ring: at("500") },
      ramp,
    }
  }
  const vars = (fill: Oklch): AccentVars => ({ primary: fmt(fill), foreground: fmt(pickForeground(fill)), ring: at("500") })
  return { light: vars(ensureContrast(base, BG_LIGHT, -0.01)), dark: vars(ensureContrast(base, BG_DARK, 0.01)), ramp }
}

/* ─────────────────────────── CSS output ─────────────────────────── */

const declarations = (v: AccentVars, indent = "") =>
  [`--primary: ${v.primary};`, `--primary-foreground: ${v.foreground};`, `--ring: ${v.ring};`].map((d) => indent + d)

const rampDeclarations = (ramp: string[] | undefined, indent = "") =>
  (ramp ?? []).map((v, i) => `${indent}--accent-${RAMP_STOPS[i]}: ${v};`)

const sameVars = (a: AccentVars, b: AccentVars) => a.primary === b.primary && a.foreground === b.foreground && a.ring === b.ring

/** The overrides a user pastes after the theme variables: exactly what this page applies. */
export function themeCss(theme: AccentTheme, label: string): string {
  const dark = sameVars(theme.light, theme.dark) ? [] : ["", ".dark {", ...declarations(theme.dark, "  "), "}"]
  return [
    `/* qinyang/ui accent: ${label} */`,
    "/* Paste after the theme variables in globals.css. */",
    ":root {",
    ...rampDeclarations(theme.ramp, "  "),
    ...declarations(theme.light, "  "),
    "}",
    ...dark,
  ].join("\n")
}

/** Runtime stylesheet for a custom accent, keyed on `data-accent="custom"` like the preset blocks. */
export function customAccentStyle(theme: AccentTheme): string {
  const one = (v: AccentVars) => `--primary:${v.primary};--primary-foreground:${v.foreground};--ring:${v.ring}`
  const ramp = (theme.ramp ?? []).map((v, i) => `--accent-${RAMP_STOPS[i]}:${v};`).join("")
  return `html[data-accent="custom"]{${ramp}${one(theme.light)}}html[data-accent="custom"].dark{${one(theme.dark)}}`
}
