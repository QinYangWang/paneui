"use client"

import * as React from "react"

import { Button } from "@/registry/base-nova/ui/button"
import { CitationGroup, Citations, type CitationSource } from "@/registry/base-nova/ui/citations"

const ALL: CitationSource[] = [
  { id: "1", title: "Best ramen in Fukuoka", domain: "timeout.com" },
  { id: "2", title: "Ichiran Tenjin opening hours", domain: "ichiran.com" },
  { id: "3", title: "Hakata tonkotsu, explained", domain: "seriouseats.com" },
  { id: "4", title: "Fukuoka food stalls (yatai) guide", domain: "yokanavi.com" },
]

export default function CitationsStreaming() {
  const [count, setCount] = React.useState(1)
  const sources = ALL.slice(0, count)
  return (
    <div className="flex w-full max-w-lg flex-col gap-3">
      <CitationGroup sources={sources} defaultOpen>
        <Citations />
      </CitationGroup>
      <Button size="sm" variant="secondary" className="self-start" onClick={() => setCount((c) => (c >= ALL.length ? 1 : c + 1))}>
        {count >= ALL.length ? "Reset" : "Read another source"}
      </Button>
    </div>
  )
}
