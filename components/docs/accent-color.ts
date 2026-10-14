/**
 * Accent colour model for the docs: the preset values (mirroring the
 * `html[data-accent]` blocks in app/globals.css), OKLCH maths to derive a
 * light + dark accent from any picked colour, and the CSS a user takes home.
 * Pure and client-safe.
 *
 * An accent is exactly three variables per mode: `--primary`,
 * `--primary-foreground` and an opaque `--ring` (used at /50).
 */

export type AccentVars = { primary: string; foreground: string; ring: string }
export type AccentTheme = { light: AccentVars; dark: AccentVars }
export type PresetAccent = "neutral" | "blue" | "green" | "orange" | "rose" | "violet"

/** Mirrors app/globals.css (`:root`/`.dark` for neutral, `html[data-accent]` for the rest). */
export const PRESET_THEMES: Record<PresetAccent, AccentTheme> = {
  neutral: {
    light: { primary: "oklch(0.205 0 0)", foreground: "oklch(1 0 0)", ring: "oklch(0.708 0 0)" },
    dark: { primary: "oklch(0.97 0 0)", foreground: "oklch(0.205 0 0)", ring: "oklch(0.556 0 0)" },
  },
  blue: {
    light: { primary: "oklch(0.57 0.15 258)", foreground: "oklch(1 0 0)", ring: "oklch(0.57 0.15 258)" },
    dark: { primary: "oklch(0.6 0.145 256)", foreground: "oklch(1 0 0)", ring: "oklch(0.6 0.145 256)" },
  },
  green: {
    light: { primary: "oklch(0.56 0.13 155)", foreground: "oklch(1 0 0)", ring: "oklch(0.56 0.13 155)" },
    dark: { primary: "oklch(0.64 0.14 155)", foreground: "oklch(0.2 0.03 155)", ring: "oklch(0.64 0.14 155)" },
  },
  orange: {
    light: { primary: "oklch(0.62 0.17 45)", foreground: "oklch(1 0 0)", ring: "oklch(0.62 0.17 45)" },
    dark: { primary: "oklch(0.7 0.16 52)", foreground: "oklch(0.2 0.04 52)", ring: "oklch(0.7 0.16 52)" },
  },
  rose: {
    light: { primary: "oklch(0.58 0.19 12)", foreground: "oklch(1 0 0)", ring: "oklch(0.58 0.19 12)" },
    dark: { primary: "oklch(0.65 0.18 12)", foreground: "oklch(1 0 0)", ring: "oklch(0.65 0.18 12)" },
  },
  violet: {
    light: { primary: "oklch(0.55 0.18 290)", foreground: "oklch(1 0 0)", ring: "oklch(0.55 0.18 290)" },
    dark: { primary: "oklch(0.64 0.16 290)", foreground: "oklch(1 0 0)", ring: "oklch(0.64 0.16 290)" },
  },
}

/** Display names for the presets. */
export const PRESET_LABELS: Record<PresetAccent, string> = {
  neutral: "Neutral",
  blue: "Blue",
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

const BG_LIGHT: Oklch = { l: 0.9911, c: 0, h: 0 } // --background, light
const BG_DARK: Oklch = { l: 0.1638, c: 0, h: 0 } // --background, dark
const WHITE: Oklch = { l: 1, c: 0, h: 0 }

/**
 * White text unless a dark tint of the hue reads clearly better. White is favoured on saturated
 * fills; the 1.6 bias reproduces every preset's choice in app/globals.css.
 */
function pickForeground(fill: Oklch): Oklch {
  const dark: Oklch = { l: 0.2, c: Math.min(fill.c, 0.04), h: fill.h }
  if (fill.c < 0.03) return contrast(fill, WHITE) >= contrast(fill, dark) ? WHITE : { l: 0.205, c: 0, h: 0 }
  return contrast(fill, WHITE) * 1.6 >= contrast(fill, dark) ? WHITE : dark
}

/** Darken (light mode) or lighten (dark mode) until the fill reaches 3:1 against the page, the WCAG minimum for controls. */
function ensureContrast(c: Oklch, bg: Oklch, step: number): Oklch {
  let out = fitGamut(c)
  for (let i = 0; i < 40 && contrast(out, bg) < 3; i++) out = fitGamut({ ...out, l: clamp(out.l + step, 0, 1) })
  return out
}

/**
 * Derive both modes from one picked colour.
 * Light keeps the colour as picked (only darkened if it would fall under 3:1 on the page).
 * Dark lifts it +0.06 L (at least 0.62) with 5% less chroma, like the presets; a near-grey pick
 * mirrors the neutral theme instead (dark ink in light, near-white in dark).
 */
export function deriveAccent(hex: string): AccentTheme | null {
  const base = hexToOklch(hex)
  if (!base) return null
  const light = ensureContrast(base, BG_LIGHT, -0.01)
  const grey = base.c < 0.03
  const darkSeed: Oklch = grey
    ? { l: clamp(1.175 - base.l, 0.62, 0.97), c: base.c, h: base.h }
    : { l: clamp(base.l + 0.06, 0.62, 0.86), c: base.c * 0.95, h: base.h }
  const dark = ensureContrast(darkSeed, BG_DARK, 0.01)
  const vars = (fill: Oklch): AccentVars => ({ primary: fmt(fill), foreground: fmt(pickForeground(fill)), ring: fmt(fill) })
  return { light: vars(light), dark: vars(dark) }
}

/* ─────────────────────────── CSS output ─────────────────────────── */

const declarations = (v: AccentVars, indent = "") =>
  [`--primary: ${v.primary};`, `--primary-foreground: ${v.foreground};`, `--ring: ${v.ring};`].map((d) => indent + d)

/** The overrides a user pastes after the theme variables: exactly what this page applies. */
export function themeCss(theme: AccentTheme, label: string): string {
  return [
    `/* qinyang/ui accent: ${label} */`,
    "/* Paste after the theme variables in globals.css. */",
    ":root {",
    ...declarations(theme.light, "  "),
    "}",
    "",
    ".dark {",
    ...declarations(theme.dark, "  "),
    "}",
  ].join("\n")
}

/** Runtime stylesheet for a custom accent, keyed on `data-accent="custom"` like the preset blocks. */
export function customAccentStyle(theme: AccentTheme): string {
  const one = (v: AccentVars) => `--primary:${v.primary};--primary-foreground:${v.foreground};--ring:${v.ring}`
  return `html[data-accent="custom"]{${one(theme.light)}}html[data-accent="custom"].dark{${one(theme.dark)}}`
}
