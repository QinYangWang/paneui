import type { RegistryItem } from "./registry.js"

/** Scores 0 (no match) upward. Name hits beat title hits beat description and category hits. */
export function score(item: RegistryItem, query: string): number {
  const q = query.trim().toLowerCase()
  if (!q) return 1
  const name = item.name.toLowerCase()
  const title = (item.title ?? "").toLowerCase()
  const desc = (item.description ?? "").toLowerCase()
  const cat = (item.meta?.category ?? "").toLowerCase()
  const terms = q.split(/\s+/)
  let total = 0
  for (const t of terms) {
    let s = 0
    if (name === t) s = 100
    else if (name.startsWith(t)) s = 80
    else if (name.split("-").some((part) => part.startsWith(t))) s = 70
    else if (name.includes(t)) s = 60
    else if (title.includes(t)) s = 50
    else if (cat === t) s = 45
    else if (cat.includes(t)) s = 35
    else if (desc.includes(t)) s = 30
    else if (subsequence(name, t)) s = 15 - Math.min(10, name.length - t.length) / 2
    if (s <= 0) return 0
    total += s
  }
  return total
}

function subsequence(haystack: string, needle: string) {
  if (needle.length < 2) return false
  let i = 0
  for (const ch of haystack) if (ch === needle[i] && ++i === needle.length) return true
  return false
}

export function search(items: RegistryItem[], query = "", opts: { all?: boolean; category?: string; type?: string } = {}) {
  return items
    .filter((i) => opts.all || !i.meta?.hidden)
    .filter((i) => !opts.category || (i.meta?.category ?? "").toLowerCase() === opts.category.toLowerCase())
    .filter((i) => !opts.type || i.type === opts.type || i.type === `registry:${opts.type}`)
    .map((item) => ({ item, s: score(item, query) }))
    .filter((r) => r.s > 0)
    .sort((a, b) => b.s - a.s || a.item.name.localeCompare(b.item.name))
    .map((r) => r.item)
}

/** Closest names for a "did you mean" hint. */
export function suggest(items: RegistryItem[], name: string, n = 3) {
  return search(items, name, { all: true })
    .slice(0, n)
    .map((i) => i.name)
}
