"use client"

import * as React from "react"

import { BumpChart, type BumpSeries } from "@/registry/base-nova/ui/bump-chart"
import { Tabs, TabsList, TabsTab } from "@/registry/base-nova/ui/tabs"

const periods = ["Q1 '25", "Q2 '25", "Q3 '25", "Q4 '25", "Q1 '26", "Q2 '26", "Q3 '26"]

const data: Record<"downloads" | "stars", BumpSeries[]> = {
  downloads: [
    { id: "vite", name: "Vite", ranks: [2, 2, 1, 1, 1, 1, 1] },
    { id: "next", name: "Next.js", ranks: [1, 1, 2, 2, 3, 2, 2] },
    { id: "astro", name: "Astro", ranks: [5, 4, 4, 3, 2, 3, 3] },
    { id: "remix", name: "React Router", ranks: [3, 3, 3, 4, 4, 5, 4] },
    { id: "nuxt", name: "Nuxt", ranks: [4, 5, 5, 5, 5, 4, 5] },
    { id: "svelte", name: "SvelteKit", ranks: [6, 6, 6, 6, 6, 6, 6] },
  ],
  stars: [
    { id: "vite", name: "Vite", ranks: [3, 2, 2, 2, 1, 1, 2] },
    { id: "next", name: "Next.js", ranks: [1, 1, 1, 1, 2, 2, 1] },
    { id: "astro", name: "Astro", ranks: [4, 4, 3, 3, 3, 3, 3] },
    { id: "remix", name: "React Router", ranks: [6, 6, 6, 5, 5, 6, 6] },
    { id: "nuxt", name: "Nuxt", ranks: [5, 5, 5, 6, 6, 5, 5] },
    { id: "svelte", name: "SvelteKit", ranks: [2, 3, 4, 4, 4, 4, 4] },
  ],
}

export default function BumpChartDemo() {
  const [metric, setMetric] = React.useState<"downloads" | "stars">("downloads")
  return (
    <div className="w-full max-w-2xl space-y-3">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-sm font-medium">Framework rankings</div>
          <div className="text-xs text-muted-foreground">Rank by quarter · click a line to pin it</div>
        </div>
        <Tabs value={metric} onValueChange={(v) => setMetric(v as "downloads" | "stars")}>
          <TabsList>
            <TabsTab value="downloads">Downloads</TabsTab>
            <TabsTab value="stars">Stars</TabsTab>
          </TabsList>
        </Tabs>
      </div>
      <BumpChart series={data[metric]} periods={periods} label={`Framework rankings by ${metric}`} />
    </div>
  )
}
