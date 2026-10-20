#!/usr/bin/env node
/**
 * Lints the Markdown twins written by gen-docs-md.mjs (out/docs/*.md) for conversion artefacts:
 * glued words and numbers, empty links, repeated lines, leftover UI chrome, fragments from flattened
 * widgets, glued inline code, empty table headers and stray whitespace.
 *
 *   node scripts/audit-docs-md.mjs [outDir]        exit 1 when anything is found
 *   node scripts/audit-docs-md.mjs out --json
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..")
const outDir = path.join(root, process.argv.slice(2).find((a) => !a.startsWith("--")) ?? "apps/docs/out")
const json = process.argv.includes("--json")
const dir = path.join(outDir, "docs")
const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md")).sort()

/** Words with an inner capital that are real words, not two labels run together. */
const CAMEL_OK = new Set(
  "GitHub JavaScript TypeScript PostCSS iOS macOS iPhone iPad ChatGPT OpenAI YouTube LinkedIn WebKit ESLint DevTools VSCode VS PayPal WebGL WebGPU IndexedDB localStorage sessionStorage JetBrains NoScript ClipboardItem ResizeObserver IntersectionObserver PostgreSQL MySQL GraphQL OAuth viewBox".split(" "),
)
/** camelCase identifiers written in prose (props, DOM APIs). */
const IDENT = /^(?:on[A-Z]|use[A-Z]|get[A-Z]|set[A-Z]|is[A-Z]|has[A-Z]|default[A-Z]|aria[A-Z]|data[A-Z]|class[A-Z]|offset[A-Z]|scroll[A-Z]|inner[A-Z]|replace[A-Z]|create[A-Z]|request[A-Z]|match[A-Z]|query[A-Z]|local[A-Z]|session[A-Z]|show[A-Z]|max[A-Z]|min[A-Z])/
/** Words ending in digits that are real names. */
const DIGIT_OK = /^(?:h[1-6]|a11y|i18n|l10n|v\d+|x\d+|ss\d+|utf8|base64|sha\d+|md5|oklch|rgb|hsl|p3|es\d+|mp[34]|h264|ipv[46]|cjk)$/i
const CHROME = new Set(
  [
    "copy", "copied", "copy code", "copy page", "preview", "code", "preview code", "on this page", "back to top", "light", "dark",
    "selected", "open in chatgpt", "open in claude", "view as markdown", "copy as markdown", "toggle", "menu", "close", "search",
    "loading", "loading…", "new", "fit", "desktop", "tablet", "mobile", "rtl", "maximize", "monitor", "smartphone", "show code", "hide code",
    "expand", "collapse", "more", "previous", "next", "reset", "default",
  ],
)

const findings = []
const add = (file, line, rule, text) => findings.push({ file, line, rule, text: text.slice(0, 140) })

for (const file of files) {
  const src = fs.readFileSync(path.join(dir, file), "utf8")
  const lines = src.split("\n")
  let fence = null
  let prev = ""
  let paraStart = true
  const seenParas = new Map()
  const sectionRows = new Map()
  lines.forEach((raw, i) => {
    const n = i + 1
    const m = /^(`{3,}|~{3,})/.exec(raw)
    if (fence) {
      if (m && raw.startsWith(fence)) fence = null
      prev = raw
      return
    }
    if (m) {
      fence = m[1]
      paraStart = true
      prev = raw
      return
    }
    if (/[ \t]+$/.test(raw)) add(file, n, "trailing-space", JSON.stringify(raw))
    if (raw === "" && prev === "" && i > 0) add(file, n, "blank-lines", "two blank lines in a row")
    // Prose with code spans and link targets removed.
    const prose = raw.replace(/`[^`]*`/g, "§").replace(/\]\([^)]*\)/g, "]")
    // Inline code run into the next code span or word: "`--card``bg-card`", "`--card`#fff".
    // (a plural "s" after a code span, "`MenuItem`s", is English, not glue)
    if (/\u0003\u0003|\u0003(?!s\b)[#A-Za-z0-9]/.test(raw.replace(/`[^`]+`/g, "\u0003"))) add(file, n, "glued-code", raw)
    // A label run into its description: "shadow-raised Resting controls…", "- `--radius` One base…".
    if (/^(?:[a-z][\w-]*[a-z\d]|- `[^`]+`) [A-Z][a-z]/.test(raw) && !/^- `[^`]+` (?:and|or|to|is|are)\b/.test(raw)) add(file, n, "run-in-label", raw)
    // The same row shown twice in one section (a list for phones and a table for desktop): same first two code spans.
    const codes = /^(?:- |\| )`/.test(raw) ? [...raw.matchAll(/`([^`]+)`/g)].map((m) => m[1]) : []
    if (codes.length >= 2) {
      const kind = raw.startsWith("|") ? "t" : "l"
      const key = codes.slice(0, 2).join("\u0000")
      const other = sectionRows.get(key)
      if (other && other !== kind) add(file, n, "duplicated-rows", raw)
      else sectionRows.set(key, kind)
    }
    if (/\[\s*\]\(/.test(raw) || /\]\(\s*\)/.test(raw)) add(file, n, "empty-link", raw)
    if (/\S {2,}\S/.test(raw.replace(/^\s+/, "")) && !raw.startsWith("|") && !/^\s*[-*\d]/.test(raw)) add(file, n, "double-space", raw)
    if (/^\s+\S/.test(raw) && !/^\s+([-*]|\d+\.)\s/.test(raw) && !/^ {3}\S/.test(raw)) add(file, n, "leading-space", JSON.stringify(raw))
    // Two labels run together: a lowercase word straight into a capitalised one, or a sentence into the next.
    if (!/^#/.test(raw))
      for (const w of prose.match(/(?<![A-Za-z#])[a-z]{2,}[A-Z][a-z]+/g) ?? []) if (!CAMEL_OK.has(w) && !IDENT.test(w)) add(file, n, "glued-words", `${w} · ${raw}`)
    for (const w of prose.replace(/https?:\/\/\S+/g, "").match(/(?<![A-Za-z._-])[a-z]{2,}[.!?][A-Z][a-z]/g) ?? []) add(file, n, "glued-words", `${w} · ${raw}`)
    for (const w of prose.match(/(?<![\w#-])[A-Za-z]{2,}\d+(?![\w-])/g) ?? []) if (!DIGIT_OK.test(w)) add(file, n, "glued-number", `${w} · ${raw}`)
    for (const w of prose.match(/(?<![\w.-])\d+[A-Z][a-z]+/g) ?? []) add(file, n, "glued-number", `${w} · ${raw}`)
    // Table rows: an empty header cell is a swatch or icon column with nothing to say.
    if (/^\|/.test(raw) && /^\|\s*\|/.test(raw) && lines[i + 1]?.startsWith("| ---")) add(file, n, "empty-header", raw)
    // Paragraph-level checks (a line that starts a paragraph and stands alone).
    const isPara = raw.trim() && paraStart && (lines[i + 1] ?? "") === "" && !/^(#|\||>|[-*] |\d+\. |Page: |!\[)/.test(raw.trim())
    if (isPara) {
      const t = raw.trim()
      if (CHROME.has(t.toLowerCase().replace(/[*_]/g, ""))) add(file, n, "ui-chrome", t)
      else if (!/[.:!?)`…]$|[.:!?]\s|^\*\*.*\*\*$|^_.*_$|^\[.*\)$/.test(t) && t.split(/\s+/).length < 12) add(file, n, "fragment", t)
      const key = t.toLowerCase()
      if (t.length > 24 && !/^Also accepts every prop of/.test(t)) {
        if (seenParas.has(key)) add(file, n, "repeated", `${t} (also line ${seenParas.get(key)})`)
        else seenParas.set(key, n)
      }
    }
    // List items: chrome and duplicates.
    const li = /^\s*(?:[-*]|\d+\.)\s+(.*)$/.exec(raw)
    if (li) {
      if (CHROME.has(li[1].toLowerCase())) add(file, n, "ui-chrome", raw)
      if (/^\d+\.\s+0?\d+\s/.test(raw.trim())) add(file, n, "glued-number", `step number kept · ${raw}`)
    }
    if (raw.trim() && raw === prev && !raw.startsWith("|")) add(file, n, "repeated", raw)
    if (raw.trim() && !raw.startsWith("|") && /\b(\w{3,}) \1\b/i.test(prose) && !/\b(that that|had had)\b/i.test(prose)) add(file, n, "repeated-word", raw)
    if (/^#/.test(raw)) {
      seenParas.clear()
      sectionRows.clear()
    }
    paraStart = raw === ""
    prev = raw
  })
  if (fence) add(file, lines.length, "open-fence", "unclosed code fence")
  if (!src.endsWith("\n") || src.endsWith("\n\n")) add(file, lines.length, "eof", "file should end with exactly one newline")
}

if (json) console.log(JSON.stringify(findings, null, 2))
else {
  const byRule = {}
  for (const f of findings) (byRule[f.rule] ??= []).push(f)
  for (const [rule, list] of Object.entries(byRule)) {
    console.log(`\n${rule} (${list.length})`)
    for (const f of list.slice(0, 400)) console.log(`  ${f.file}:${f.line}  ${f.text}`)
  }
  console.log(`\naudit-docs-md: ${findings.length} finding(s) in ${files.length} files`)
}
process.exit(findings.length ? 1 : 0)
