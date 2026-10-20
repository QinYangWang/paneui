"use client"

import { Treemap, type TreemapNode } from "@paneui/ui/components/treemap"

const DATA: TreemapNode[] = [
  { id: "ts", label: "TypeScript", value: 62 },
  { id: "css", label: "CSS", value: 18 },
  { id: "md", label: "Markdown", value: 11 },
  { id: "json", label: "JSON", value: 6 },
  { id: "sh", label: "Shell", value: 2 },
  { id: "other", label: "Other", value: 1 },
]

export default function TreemapCompact() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-3 rounded-2xl bg-card p-4 shadow-raised">
      <div className="text-sm font-medium">Languages</div>
      <Treemap data={DATA} label="Repository languages" formatValue={(v) => `${v}%`} height={140} gap={2} radius={6} showLegend={false} />
    </div>
  )
}
