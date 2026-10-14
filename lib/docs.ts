import "server-only"

import fs from "node:fs"
import path from "node:path"

import registry from "@/registry.json"

export type Category = (typeof ORDER)[number]

export type DocItem = {
  name: string
  title: string
  description: string
  category: Category
  type: string
  dependencies: string[]
  registryDependencies: string[]
  files: string[]
}

export const ORDER = ["Templates", "Foundations", "Forms", "Overlays", "Display", "Navigation", "Text", "Motion", "Data", "Agents", "Charts", "Blocks"] as const

function categoryOf(type: string, meta?: { category?: string }): Category {
  if (meta?.category && (ORDER as readonly string[]).includes(meta.category)) return meta.category as Category
  if (type === "registry:block") return "Blocks"
  if (type === "registry:ui") return "Display"
  return "Foundations"
}

export const REGISTRY_NAME = registry.name
export const SITE_URL = process.env.SITE_URL || registry.homepage
export const REGISTRY_URL = `${SITE_URL}/r/{name}.json`

export function getItems(): DocItem[] {
  return registry.items
    // Accent presets (theme-blue, …) are installable but documented on the Installation page, not as their own pages.
    .filter((item) => !(item as { meta?: { hidden?: boolean } }).meta?.hidden)
    .map((item) => {
      const i = item as typeof item & { dependencies?: string[]; registryDependencies?: string[]; files?: { path: string }[] }
      return {
        name: i.name,
        title: i.title ?? i.name,
        description: i.description ?? "",
        type: i.type,
        category: categoryOf(i.type, (i as { meta?: { category?: string } }).meta),
        dependencies: i.dependencies ?? [],
        registryDependencies: i.registryDependencies ?? [],
        files: i.name === "theme" ? ["app/globals.css"] : (i.files ?? []).map((f) => f.path),
      }
    })
    .sort((a, b) => ORDER.indexOf(a.category) - ORDER.indexOf(b.category))
}

export function getGroups() {
  const items = getItems()
  return ORDER.map((category) => ({ category, items: items.filter((i) => i.category === category) })).filter((g) => g.items.length > 0)
}

export function getItem(name: string) {
  return getItems().find((i) => i.name === name)
}

export function readSource(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), "utf8").trimEnd()
}

export function demoFile(name: string) {
  return `registry/base-nova/examples/${name}-demo.tsx`
}
