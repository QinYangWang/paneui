import fs from "node:fs"
import assert from "node:assert/strict"
import { parse } from "./color.mjs"
const css = fs.readFileSync(process.argv[2] ?? new URL("../../packages/tokens/styles/theme-paper.css", import.meta.url), "utf8")
const linear = (v) => v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4
const luminance = (value) => {
  const { r, g, b } = parse(value)
  return .2126 * linear(r) + .7152 * linear(g) + .0722 * linear(b)
}
const results = []
for (const [, selector, body] of css.replace(/\/\*[\s\S]*?\*\//g, "").matchAll(/([^{}]+)\{([^{}]+)\}/g)) {
  const values = Object.fromEntries([...body.matchAll(/--([\w-]+):\s*([^;]+);/g)].map((m) => [m[1], m[2]]))
  for (const role of ["primary", "destructive", "success", "warning"]) {
    if (!values[role] || values[role] === "inherit") continue
    for (const state of [role, `${role}-hover`, `${role}-active`]) {
      if (!values[state]) continue
      const a = luminance(values[state]), b = luminance(values[`${role}-foreground`])
      const ratio = (Math.max(a, b) + .05) / (Math.min(a, b) + .05)
      assert(ratio >= 4.5, `${selector.trim()} ${state}: ${ratio.toFixed(2)}`)
      results.push({ mode: selector.includes(".dark") ? "dark" : "light", accent: selector.match(/data-accent="([^"]+)"/)?.[1] ?? "blue", state, contrast: Number(ratio.toFixed(2)) })
    }
  }
}
assert(results.length >= 40, "Expected all accent and status solids")
console.log(JSON.stringify(results, null, 2))
console.log(`All ${results.length} solid states pass AA; minimum ${Math.min(...results.map((r) => r.contrast))}:1`)
