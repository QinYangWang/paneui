#!/usr/bin/env node
/*
 * Writes the sRGB colour map of the og-image item from the theme (app/globals.css), so the card
 * follows every accent preset and both modes without reading CSS at render time.
 *
 * Each role is resolved the way the page resolves it (accent block over .dark over :root), from
 * the sRGB values the theme declares outside its wide-gamut block. Translucent roles are composited
 * over the mode's background, so the card gets opaque hex colours only. oklch() and
 * color(display-p3 …) values are converted to sRGB and clipped to its gamut.
 *
 *   node scripts/gen-og-tokens.mjs           rewrite the map in registry/base-nova/ui/og-image.tsx
 *   node scripts/gen-og-tokens.mjs --check   exit 1 when the map is out of date
 */
import fs from "node:fs"
import path from "node:path"

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..")
const CSS = path.join(root, "app/globals.css")
const TARGET = path.join(root, "registry/base-nova/ui/og-image.tsx")
const START = "/* og-image-tokens:start"
const END = "/* og-image-tokens:end */"

const ACCENTS = ["blue", "neutral", "green", "orange", "rose", "violet"]
const ROLES = {
  background: "background",
  card: "card",
  foreground: "foreground",
  mutedForeground: "muted-foreground",
  border: "border",
  primary: "primary",
  primaryForeground: "primary-foreground",
  primarySubtle: "primary-subtle",
  primaryBorder: "primary-border",
}

const css = fs.readFileSync(CSS, "utf8").replace(/\/\*[\s\S]*?\*\//g, "")

/** Custom properties of every top-level block with exactly this selector (later blocks win). */
function vars(selector) {
  const out = {}
  const re = /(^|\n)([^{}\n@][^{}]*?)\s*\{([^{}]*)\}/g
  let m
  while ((m = re.exec(css))) {
    // top level only: skip blocks inside @supports / @media / @layer
    const before = css.slice(0, m.index + m[1].length)
    const depth = (before.match(/\{/g) ?? []).length - (before.match(/\}/g) ?? []).length
    if (depth !== 0) continue
    const sels = m[2].split(",").map((s) => s.trim())
    if (!sels.includes(selector)) continue
    for (const d of m[3].matchAll(/--([\w-]+)\s*:\s*([^;]+);/g)) out[d[1]] = d[2].trim().replace(/\s+/g, " ")
  }
  return out
}

// ---------- colour parsing ----------

const clamp01 = (x) => Math.min(1, Math.max(0, x))
const toGamma = (x) => (x <= 0.0031308 ? 12.92 * x : 1.055 * x ** (1 / 2.4) - 0.055)
const toLinear = (x) => (x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4)
const num = (s, scale = 1) => (s.endsWith("%") ? (parseFloat(s) / 100) * scale : parseFloat(s))

/** Any theme colour → { r, g, b, a } in sRGB 0..1. */
function parse(value) {
  const v = value.trim().toLowerCase()
  if (v.startsWith("#")) {
    let h = v.slice(1)
    if (h.length === 3 || h.length === 4) h = [...h].map((c) => c + c).join("")
    const n = (i) => parseInt(h.slice(i, i + 2), 16) / 255
    return { r: n(0), g: n(2), b: n(4), a: h.length === 8 ? n(6) : 1 }
  }
  const fn = /^([a-z-]+)\((.*)\)$/.exec(v)
  if (!fn) throw new Error(`unsupported colour ${value}`)
  const [body, alphaPart] = fn[2].split("/").map((s) => s.trim())
  const a = alphaPart === undefined ? 1 : num(alphaPart)
  const parts = body.split(/[\s,]+/).filter(Boolean)
  if (fn[1] === "rgb" || fn[1] === "rgba") {
    const [r, g, b] = parts.slice(0, 3).map((p) => (p.endsWith("%") ? num(p) : parseFloat(p) / 255))
    return { r, g, b, a: parts[3] !== undefined ? num(parts[3]) : a }
  }
  if (fn[1] === "oklch") {
    const L = num(parts[0])
    const C = num(parts[1], 0.4)
    const h = ((parseFloat(parts[2]) || 0) * Math.PI) / 180
    const A = C * Math.cos(h)
    const B = C * Math.sin(h)
    const l = (L + 0.3963377774 * A + 0.2158037573 * B) ** 3
    const m = (L - 0.1055613458 * A - 0.0638541728 * B) ** 3
    const s = (L - 0.0894841775 * A - 1.291485548 * B) ** 3
    const lin = [
      4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
      -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
      -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
    ]
    const [r, g, b] = lin.map((x) => toGamma(clamp01(x)))
    return { r, g, b, a }
  }
  if (fn[1] === "color" && parts[0] === "display-p3") {
    const [pr, pg, pb] = parts.slice(1, 4).map((p) => toLinear(num(p)))
    // linear Display P3 → linear sRGB
    const lin = [
      1.2249401 * pr - 0.2249404 * pg + 0 * pb,
      -0.0420569 * pr + 1.0420571 * pg + 0 * pb,
      -0.0196376 * pr - 0.0786361 * pg + 1.0982735 * pb,
    ]
    const [r, g, b] = lin.map((x) => toGamma(clamp01(x)))
    return { r, g, b, a }
  }
  throw new Error(`unsupported colour ${value}`)
}

const over = (top, base) => ({
  r: top.r * top.a + base.r * (1 - top.a),
  g: top.g * top.a + base.g * (1 - top.a),
  b: top.b * top.a + base.b * (1 - top.a),
  a: 1,
})
const hex = ({ r, g, b }) => "#" + [r, g, b].map((x) => Math.round(clamp01(x) * 255).toString(16).padStart(2, "0")).join("")

// ---------- resolve ----------

const rootVars = vars(":root")
const darkVars = vars(".dark")

function resolve(accent, mode) {
  const scope = {
    ...rootVars,
    ...(mode === "dark" ? darkVars : {}),
    ...(accent === "blue" ? {} : vars(`html[data-accent="${accent}"]`)),
    ...(accent !== "blue" && mode === "dark" ? vars(`html[data-accent="${accent}"].dark`) : {}),
  }
  const get = (name, seen = 0) => {
    const v = scope[name]
    if (!v) throw new Error(`--${name} not found for ${accent}/${mode}`)
    const ref = /^var\(--([\w-]+)\)$/.exec(v)
    return ref && seen < 8 ? get(ref[1], seen + 1) : v
  }
  const background = parse(get("background"))
  const out = {}
  for (const [key, name] of Object.entries(ROLES)) out[key] = hex(over(parse(get(name)), { ...background, a: 1 }))
  return out
}

const map = {}
for (const accent of ACCENTS) map[accent] = { light: resolve(accent, "light"), dark: resolve(accent, "dark") }

const body =
  `${START} (generated by scripts/gen-og-tokens.mjs from the theme; do not edit) */\n` +
  `const OG_IMAGE_TOKENS = ${JSON.stringify(map, null, 2).replace(/"(\w+)":/g, "$1:")} as const satisfies Record<OgImageAccent, Record<OgImageMode, OgImageColors>>\n` +
  END

const src = fs.readFileSync(TARGET, "utf8")
const a = src.indexOf(START)
const b = src.indexOf(END)
if (a < 0 || b < 0) throw new Error(`markers not found in ${path.relative(root, TARGET)}`)
const next = src.slice(0, a) + body + src.slice(b + END.length)
if (process.argv.includes("--check")) {
  if (next !== src) {
    console.error("og-image tokens are out of date: run node scripts/gen-og-tokens.mjs")
    process.exit(1)
  }
  console.log("og-image tokens up to date")
} else {
  if (next !== src) fs.writeFileSync(TARGET, next)
  console.log(`og-image tokens: ${ACCENTS.length} accents × 2 modes${next === src ? " (unchanged)" : " written"}`)
}
