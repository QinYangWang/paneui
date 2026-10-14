"use client"

import * as React from "react"

import * as Icons from "@/components/icons"
import { cn } from "@/lib/utils"
import { Input } from "@/registry/base-nova/ui/input"

const all = Object.entries(Icons).filter(([n]) => n.endsWith("Icon")) as [string, (p: { size?: number }) => React.ReactElement][]

export function IconGrid() {
  const [q, setQ] = React.useState("")
  const [copied, setCopied] = React.useState<string | null>(null)
  const list = all.filter(([n]) => n.toLowerCase().includes(q.toLowerCase()))
  return (
    <div className="flex flex-col gap-4">
      <Input placeholder={`Search ${all.length} icons…`} value={q} onChange={(e) => setQ(e.target.value)} className="max-w-xs" />
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
              "flex cursor-pointer flex-col items-center gap-2 rounded-2xl bg-card px-2 pt-5 pb-3 text-foreground shadow-chip transition hover:shadow-raised-hover active:shadow-pressed"
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
