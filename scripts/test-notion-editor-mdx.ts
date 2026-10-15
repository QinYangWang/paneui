// Round-trip test for the block editor's MDX helpers (notion-editor block).
// Run: esbuild scripts/test-notion-editor-mdx.ts --bundle --platform=node --outfile=/tmp/t.cjs && node /tmp/t.cjs
import { readFileSync } from "node:fs"
import path from "node:path"
import { getSchema } from "@tiptap/core"
import { Node as PMNode } from "@tiptap/pm/model"

import { notionExtensions } from "@/registry/base-nova/blocks/notion-editor/extensions"
import { formatMDX, fromMDX, toMDX } from "@/registry/base-nova/blocks/notion-editor/mdx"

const file = process.argv[2] ?? path.join(process.cwd(), "scripts/fixtures/notion-editor-sample.mdx")
const source = readFileSync(file, "utf8")
const schema = getSchema(notionExtensions())

let failed = 0
function check(name: string, ok: boolean, detail?: string) {
  console.log(`${ok ? "ok  " : "FAIL"} ${name}`)
  if (!ok) {
    failed++
    if (detail) console.log(detail)
  }
}

function diff(a: string, b: string) {
  const al = a.split("\n"), bl = b.split("\n")
  const out: string[] = []
  for (let i = 0; i < Math.max(al.length, bl.length); i++) if (al[i] !== bl[i]) out.push(`  line ${i + 1}\n    want: ${JSON.stringify(al[i])}\n    got:  ${JSON.stringify(bl[i])}`)
  return out.slice(0, 12).join("\n")
}

const json = fromMDX(source)
let doc: PMNode | null = null
try {
  doc = PMNode.fromJSON(schema, json)
  doc.check()
  check("fromMDX output is a valid editor document", true)
} catch (e) {
  check("fromMDX output is a valid editor document", false, String(e))
}

// every block type the editor supports appears in the sample
const seen = new Set<string>()
doc?.descendants((n) => {
  seen.add(n.type.name)
  n.marks.forEach((m) => seen.add("mark:" + m.type.name))
})
const expected = [
  "heading", "paragraph", "bulletList", "orderedList", "listItem", "taskList", "taskItem", "blockquote", "callout",
  "details", "detailsSummary", "detailsContent", "codeBlock", "horizontalRule", "image", "table", "tableRow",
  "tableHeader", "tableCell", "mdxBlock", "mdxInline", "hardBreak",
  "mark:bold", "mark:italic", "mark:underline", "mark:strike", "mark:code", "mark:link", "mark:highlight", "mark:textStyle",
]
const missing = expected.filter((t) => !seen.has(t))
check(`sample covers every node and mark (${expected.length})`, missing.length === 0, "  missing: " + missing.join(", "))

const canonical = formatMDX(source)
const out = toMDX(doc ? doc.toJSON() : json)
check("toMDX(fromMDX(source)) === formatMDX(source)", out === canonical, diff(canonical, out))
const again = toMDX(fromMDX(out))
check("second round trip is stable", again === out, diff(out, again))

const callout = json.content?.find((n) => n.type === "callout")
check("<Callout> maps to a callout node with attrs", callout?.attrs?.type === "warning" && callout?.attrs?.icon === "💡")
const raw = json.content?.filter((n) => n.type === "mdxBlock").map((n) => String(n.attrs?.source))
check("unknown JSX, ESM and expressions stay raw", !!raw?.some((s) => s.startsWith("<Tabs>")) && !!raw?.some((s) => s.startsWith("import")) && !!raw?.some((s) => s.startsWith("{/*")), JSON.stringify(raw))

if (process.env.SHOW) console.log("\n" + out)
console.log(failed ? `\n${failed} check(s) failed` : "\nall checks passed")
process.exit(failed ? 1 : 0)
