import "server-only"

import fs from "node:fs"
import path from "node:path"

import registry from "@/registry.json"

export type Category = "Foundations" | "Components" | "Blocks"

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

const ORDER: Category[] = ["Foundations", "Components", "Blocks"]

function categoryOf(type: string): Category {
  if (type === "registry:block") return "Blocks"
  if (type === "registry:ui") return "Components"
  return "Foundations"
}

export const REGISTRY_NAME = registry.name
export const REGISTRY_URL = `${registry.homepage}/r/{name}.json`

export function getItems(): DocItem[] {
  return registry.items
    .map((item) => {
      const i = item as typeof item & { dependencies?: string[]; registryDependencies?: string[]; files?: { path: string }[] }
      return {
        name: i.name,
        title: i.title ?? i.name,
        description: i.description ?? "",
        type: i.type,
        category: categoryOf(i.type),
        dependencies: i.dependencies ?? [],
        registryDependencies: i.registryDependencies ?? [],
        files: i.name === "theme" ? ["app/globals.css"] : (i.files ?? []).map((f) => f.path),
      }
    })
    .sort((a, b) => ORDER.indexOf(a.category) - ORDER.indexOf(b.category))
}

export function getGroups() {
  const items = getItems()
  return ORDER.map((category) => ({ category, items: items.filter((i) => i.category === category) }))
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
