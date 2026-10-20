"use client"

import { Treemap, type TreemapNode } from "@paneui/ui/components/treemap"

const DATA: TreemapNode[] = [
  {
    id: "apps",
    label: "Apps",
    children: [
      { id: "photos", label: "Photos", value: 48 },
      { id: "messages", label: "Messages", value: 21 },
      { id: "music", label: "Music", value: 12 },
    ],
  },
  {
    id: "system",
    label: "System",
    children: [
      { id: "ios", label: "iOS", value: 14 },
      { id: "cache", label: "Cache", value: 6 },
    ],
  },
  { id: "free", label: "Free", value: 27 },
]

const gb = (v: number) => `${v} GB`

export default function TreemapSpacing() {
  return (
    <div className="grid w-full max-w-xl gap-6">
      <Treemap data={DATA} label="Storage, tight" formatValue={gb} gap={1} groupPadding={0} radius={4} height={200} showLegend={false} />
      <Treemap data={DATA} label="Storage, airy" formatValue={gb} gap={6} groupPadding={6} radius={14} height={200} />
    </div>
  )
}
