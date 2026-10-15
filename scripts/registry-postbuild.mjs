#!/usr/bin/env node
/**
 * Post-process `shadcn build` output (run as `pnpm registry:build`).
 *
 * 1. Absolute dependency URLs, so every item installs with no registry config. Items list their siblings as `@qinyang/<name>` in registryDependencies. That only
 * resolves when the user has added the namespace to components.json, which breaks the
 * one-command template install (`shadcn init <url>` into a fresh app). This rewrites each
 * `@qinyang/<name>` in public/r/*.json to the absolute item URL
 * `${SITE_URL}/r/<name>.json`, which the CLI fetches directly. Users who did register
 * the namespace are unaffected (same files, fetched by URL).
 *
 * SITE_URL defaults to registry.json's homepage; CI sets it to the Pages URL. For a
 * local CLI test, point it at a local static server: SITE_URL=http://127.0.0.1:8761.
 *
 * 2. Strip `eslint-disable` comments for this repo's own lint rules (`shadcn/*`, `qinyang/*`)
 * from shipped file contents: those plugins do not exist in the user's app, and Next 15's
 * build-time lint fails on "Definition for rule … was not found".
 */
import fs from "node:fs"
import path from "node:path"

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..")
const registry = JSON.parse(fs.readFileSync(path.join(root, "registry.json"), "utf8"))
const ns = `@${registry.name}/`
const base = (process.env.SITE_URL || registry.homepage).replace(/\/$/, "")
const dir = path.join(root, "public/r")

const OWN_RULE_COMMENT = /^[ \t]*(?:\/\/|\{?\/\*) eslint-disable(?:-next-line|-line)? (?:shadcn|qinyang)\/[^\n]*\n/gm
const stripOwnRules = (content) => content.replace(OWN_RULE_COMMENT, "")

const rewrite = (dep) => (typeof dep === "string" && dep.startsWith(ns) ? `${base}/r/${dep.slice(ns.length)}.json` : dep)

let changed = 0
for (const file of fs.readdirSync(dir)) {
  if (!file.endsWith(".json") || file === "registry.json") continue
  const p = path.join(dir, file)
  const item = JSON.parse(fs.readFileSync(p, "utf8"))
  const before = JSON.stringify(item)
  if (Array.isArray(item.registryDependencies)) item.registryDependencies = item.registryDependencies.map(rewrite)
  for (const f of item.files ?? []) if (typeof f.content === "string") f.content = stripOwnRules(f.content)
  if (JSON.stringify(item) !== before) {
    fs.writeFileSync(p, JSON.stringify(item, null, 2))
    changed++
  }
}
console.log(`registry-postbuild: ${changed} items rewritten (dependencies → ${base}/r/<name>.json, own lint rules stripped)`)

// 3. public/llms.txt: an index of the items with their one-line descriptions, for agents.
{
  const order = ["Foundations", "Forms", "Overlays", "Display", "Navigation", "Text", "Motion", "Data", "Agents", "Charts", "Blocks", "Templates"]
  const docsDir = path.join(root, "content/docs")
  const visible = registry.items.filter((i) => !i.meta?.hidden)
  const byCat = new Map()
  for (const item of visible) {
    const cat = item.meta?.category ?? "Other"
    if (!byCat.has(cat)) byCat.set(cat, [])
    byCat.get(cat).push(item)
  }
  const cats = [...byCat.keys()].sort((a, b) => (order.indexOf(a) + 1 || 99) - (order.indexOf(b) + 1 || 99))
  const lines = [
    `# ${registry.name}/ui`,
    "",
    `> ${registry.description ?? "A shadcn registry of desktop-density components, agent interfaces and page templates."}`,
    "",
    `Install any item with \`npx shadcn@latest add ${base}/r/<name>.json\`, or add \`"@${registry.name}": "${base}/r/{name}.json"\` to \`registries\` in components.json and run \`npx shadcn@latest add @${registry.name}/<name>\`.`,
    "",
    `- [Registry index](${base}/r/registry.json)`,
    `- [Docs](${base}/docs/)`,
    "",
  ]
  for (const cat of cats) {
    lines.push(`## ${cat}`, "")
    for (const item of byCat.get(cat).sort((a, b) => a.name.localeCompare(b.name))) {
      const hasDocs = fs.existsSync(path.join(docsDir, `${item.name}.ts`)) || cat === "Templates" || cat === "Blocks"
      const link = hasDocs ? `${base}/docs/${item.name}/` : `${base}/r/${item.name}.json`
      lines.push(`- [${item.title ?? item.name}](${link}): ${item.description ?? ""} JSON: ${base}/r/${item.name}.json`)
    }
    lines.push("")
  }
  fs.writeFileSync(path.join(root, "public/llms.txt"), lines.join("\n"))
  console.log(`registry-postbuild: public/llms.txt (${visible.length} items)`)
}
