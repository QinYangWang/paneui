"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export type TocEntry = { id: string; title: string; depth?: 1 | 2 }

/** Sticky "On this page" rail; highlights the section nearest the top. */
export function DocToc({ entries }: { entries: TocEntry[] }) {
  const [active, setActive] = React.useState(entries[0]?.id)
  React.useEffect(() => {
    const els = entries.map((e) => document.getElementById(e.id)).filter((e): e is HTMLElement => !!e)
    const onScroll = () => {
      let current = els[0]?.id
      for (const el of els) if (el.getBoundingClientRect().top < 120) current = el.id
      setActive(current)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [entries])
  return (
    <nav aria-label="On this page" className="flex flex-col gap-1 text-sm">
      <p className="mb-1 font-medium text-foreground">On this page</p>
      {entries.map((e) => (
        <a
          key={e.id}
          href={`#${e.id}`}
          aria-current={active === e.id ? "location" : undefined}
          className={cn(
            "py-0.5 text-muted-foreground transition-colors duration-150 hover:text-foreground aria-[current=location]:text-foreground",
            e.depth === 2 && "pl-3",
          )}
        >
          {e.title}
        </a>
      ))}
    </nav>
  )
}
