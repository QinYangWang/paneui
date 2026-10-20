"use client"

import { Treemap, type TreemapNode } from "@paneui/ui/components/treemap"

const DATA: TreemapNode[] = [
  { id: "rent", label: "Rent", value: 18000 },
  { id: "groceries", label: "Groceries", value: 4200 },
  { id: "dining", label: "Dining out", value: 3100 },
  { id: "transport", label: "Transport", value: 1400 },
  { id: "utilities", label: "Utilities", value: 1100 },
  { id: "fun", label: "Fun", value: 900 },
]

const hkd = (v: number) => `HK$${v.toLocaleString("en-US")}`

export default function TreemapFlat() {
  return <Treemap data={DATA} label="October spending" formatValue={hkd} height={260} className="max-w-xl" />
}
