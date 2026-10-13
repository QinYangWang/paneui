"use client"

import * as React from "react"

import { MorphingSearchChips } from "@/registry/base-nova/blocks/morphing-search-chips/morphing-search-chips"

const suggestions = [
  "Tokyo",
  "Taipei",
  "Toronto",
  "Lisbon",
  "Seoul",
  "Kyoto",
  "Hiking",
  "Hot springs",
  "Night markets",
  "Under $150",
  "Pet friendly",
  "Ocean view",
]

export default function MorphingSearchChipsDemo() {
  const [terms, setTerms] = React.useState<string[]>([])
  return (
    <div className="flex min-h-80 w-full flex-col items-center justify-end gap-4">
      <p className="text-sm text-muted-foreground">
        {terms.length ? `Searching stays for ${terms.join(" · ")}` : "Focus the bar to see recent searches."}
      </p>
      <MorphingSearchChips
        defaultRecents={["Kyoto", "Ocean view", "Night markets"]}
        suggestions={suggestions}
        maxChips={4}
        placeholder="Search stays"
        onSearch={setTerms}
      />
    </div>
  )
}
