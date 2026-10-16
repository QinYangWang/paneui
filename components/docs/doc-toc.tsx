import type { OutlineItem } from "@/registry/base-nova/ui/outline"

/** An outline entry as the docs pages write it: depth 1 for an h2, 2 for an h3. */
export type TocEntry = { id: string; title: string; depth?: 1 | 2 }

/** The docs entries in the Outline component's shape (h2 = 2, h3 = 3). */
export function toOutline(entries: TocEntry[]): OutlineItem[] {
  return entries.map((e) => ({ id: e.id, title: e.title, depth: e.depth === 2 ? 3 : 2 }))
}
