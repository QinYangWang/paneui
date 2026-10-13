// Renders every *Icon export of components/icons.tsx to a contact sheet (48px + 14px each).
// Usage: see .agents/skills or project docs — `node scripts/icon-sheet.cjs [out.png] [filter]`
import * as React from "react"
import { renderToStaticMarkup } from "react-dom/server"
import { writeFileSync } from "node:fs"

import * as I from "../components/icons"

const out = process.argv[2] ?? "/workspace/work/iconrender/sheet.png"
const filter = process.argv[3]?.split(",")
const names = Object.keys(I).filter((k) => k.endsWith("Icon") && (!filter || filter.some((f) => k.toLowerCase().includes(f.toLowerCase()))))
const cols = Math.min(10, names.length), cell = 72, rowH = 112
let body = ""
names.forEach((n, i) => {
  const C = (I as Record<string, React.ComponentType<{ size?: number }>>)[n]
  const x = (i % cols) * cell, y = Math.floor(i / cols) * rowH
  body += renderToStaticMarkup(<C size={48} />).replace("<svg", `<svg x="${x + 12}" y="${y + 10}"`)
  body += renderToStaticMarkup(<C size={14} />).replace("<svg", `<svg x="${x + 12}" y="${y + 66}"`)
  body += renderToStaticMarkup(<C size={18} />).replace("<svg", `<svg x="${x + 34}" y="${y + 64}"`)
  body += `<text x="${x + 6}" y="${y + 102}" font-family="sans-serif" font-size="9" fill="#888">${n.replace("Icon", "")}</text>`
})
const W = cols * cell, H = Math.ceil(names.length / cols) * rowH
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><rect width="100%" height="100%" fill="#1c1d20"/><g color="#ececec">${body}</g></svg>`
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { Resvg } = require("@resvg/resvg-js")
writeFileSync(out, new Resvg(svg, { fitTo: { mode: "zoom", value: 2 }, font: { loadSystemFonts: true } }).render().asPng())
console.log(`${names.length} icons -> ${out}`)
