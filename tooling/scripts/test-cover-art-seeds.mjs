// Seed check for CoverArt: named slugs and neighbouring slugs must get different covers.
// Run: node scripts/test-cover-art-seeds.mjs
import { readFileSync } from "node:fs"
import path from "node:path"
import ts from "typescript"

const file = path.join(process.cwd(), "packages/ui/src/components/cover-art.tsx")
const { outputText } = ts.transpileModule(readFileSync(file, "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX },
})
const mod = { exports: {} }
const stubs = { "@paneui/ui/lib/utils": { cn: (...a) => a.filter(Boolean).join(" ") }, "react": { useId: () => "cover-label" }, "react/jsx-runtime": { jsx: (type, props) => ({ type, props }), jsxs: (type, props) => ({ type, props }), Fragment: "fragment" } }
new Function("module", "exports", "require", outputText)(mod, mod.exports, (id) => stubs[id] ?? {})
const { CoverArt, coverArtStyle, coverArtVariant } = mod.exports

let failed = 0
const check = (name, ok, detail = "") => {
  console.log(`${ok ? "ok  " : "FAIL"} ${name}${detail ? `  ${detail}` : ""}`)
  if (!ok) failed++
}
check("no variant or seed draws sky", CoverArt({}).props["data-variant"] === "sky")
check("explicit sky wins over seed", CoverArt({ variant: "sky", seed: "post" }).props["data-variant"] === "sky")
check("explicit zero wins over seed", CoverArt({ variant: 0, seed: "post" }).props["data-variant"] === 0)
check("empty seed still selects geometric art", typeof CoverArt({ seed: "" }).props["data-variant"] === "number")
check("seed mapping stays compatible", JSON.stringify(coverArtStyle("plain-text")) === JSON.stringify({ variant: 1, mirror: "none", ramp: 0, pattern: 50827 }))
const key = (s) => `${s.variant}/${s.mirror}/${s.ramp}`

// The slugs that used to collide on one composition.
const named = ["plain-text", "small-websites", "summer-reading"]
const namedStyles = named.map(coverArtStyle)
named.forEach((s, i) => console.log(`     ${s.padEnd(16)} ${key(namedStyles[i])}`))
check("named slugs get different compositions", new Set(namedStyles.map((s) => s.variant)).size === named.length)
check("named slugs get different combos", new Set(namedStyles.map(key)).size === named.length)

// 20 slugs from a fixed pseudo-random generator, so the run is repeatable.
let x = 0x2545f491
const rand = () => ((x = (Math.imul(x ^ (x >>> 15), 0x2c1b3c6d) + 0x6d2b79f5) >>> 0), x)
const words = ["notes", "on", "type", "grid", "colour", "motion", "small", "tools", "reading", "desk", "light", "paper", "winter", "code", "field", "garden", "sound", "maps", "letters", "habits"]
const slugs = Array.from({ length: 20 }, () => `${words[rand() % words.length]}-${words[rand() % words.length]}-${rand() % 100}`)
const list = [...named, ...slugs]
const styles = list.map(coverArtStyle)
for (let i = 1; i < list.length; i++) {
  const a = styles[i - 1], b = styles[i]
  check(`neighbours ${list[i - 1]} / ${list[i]}`, key(a) !== key(b), `${key(a)} vs ${key(b)}`)
}

// Stable: same seed, same answer; coverArtVariant agrees with coverArtStyle.
check("same seed is stable", list.every((s) => key(coverArtStyle(s)) === key(coverArtStyle(s))))
check("coverArtVariant matches coverArtStyle", list.every((s) => coverArtVariant(s) === coverArtStyle(s).variant))
check("all eight compositions reachable", new Set(Array.from({ length: 400 }, (_, i) => coverArtVariant(`post-${i}`))).size === 8)

console.log(failed ? `\n${failed} failed` : "\nall passed")
process.exit(failed ? 1 : 0)
