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
