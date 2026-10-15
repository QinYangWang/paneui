"use client"

import * as React from "react"

import * as Rounded from "@/components/icons"
import { cn } from "@/lib/utils"
import * as Outline from "@/registry/base-nova/icons/outline/icons"
import * as Puffy from "@/registry/base-nova/icons/puffy/icons"
import { Input } from "@/registry/base-nova/ui/input"
import { SegmentedControl, SegmentedControlItem } from "@/registry/base-nova/ui/segmented-control"

type IconEntry = [string, (p: { size?: number }) => React.ReactElement]
const entries = (set: object) => Object.entries(set).filter(([n]) => n.endsWith("Icon")) as IconEntry[]
const SETS = { rounded: entries(Rounded), puffy: entries(Puffy), outline: entries(Outline) }
type Style = keyof typeof SETS

export function IconGrid() {
  const [q, setQ] = React.useState("")
  const [style, setStyle] = React.useState<Style>("rounded")
  const [copied, setCopied] = React.useState<string | null>(null)
  const all = SETS[style]
  const list = all.filter(([n]) => n.toLowerCase().includes(q.toLowerCase()))
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <Input placeholder={`Search ${all.length} icons…`} value={q} onChange={(e) => setQ(e.target.value)} className="max-w-xs" />
        <SegmentedControl value={style} onValueChange={(v) => setStyle(v as Style)} aria-label="Icon style">
          <SegmentedControlItem value="rounded">Rounded</SegmentedControlItem>
          <SegmentedControlItem value="puffy">Puffy</SegmentedControlItem>
          <SegmentedControlItem value="outline">Outline</SegmentedControlItem>
        </SegmentedControl>
      </div>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-5 lg:grid-cols-6">
        {list.map(([name, Icon]) => (
          <button
            key={name}
            type="button"
            onClick={() => {
              navigator.clipboard.writeText(`<${name} />`)
              setCopied(name)
              setTimeout(() => setCopied(null), 1200)
            }}
            className={cn(
              "flex cursor-pointer flex-col items-center gap-2 rounded-2xl bg-card px-2 pt-5 pb-3 text-foreground shadow-raised transition-[box-shadow,background-color,scale] duration-150 ease-out hover:bg-accent hover:shadow-raised-hover active:scale-96"
            )}
          >
            <Icon size={22} />
            <span className="w-full truncate text-xs text-muted-foreground">
              {copied === name ? "Copied" : name.replace(/Icon$/, "")}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
