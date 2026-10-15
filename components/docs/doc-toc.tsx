"use client"

import * as React from "react"

import { ArrowUpIcon } from "@/components/icons"
import { cn } from "@/lib/utils"

export type TocEntry = { id: string; title: string; depth?: 1 | 2 }

/** Sticky "On this page" rail; the section nearest the top gets the indicator line. */
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
    <nav aria-label="On this page" className="flex flex-col gap-3 text-ui">
      <p className="font-medium text-foreground">On this page</p>
      <ul className="flex flex-col border-s border-border">
        {entries.map((e) => (
          <li key={e.id}>
            <a
              href={`#${e.id}`}
              aria-current={active === e.id ? "location" : undefined}
              className={cn(
                "relative -ms-px block border-s-2 border-transparent py-1 ps-3 text-muted-foreground transition-colors duration-150 outline-none hover:text-foreground focus-visible:text-foreground aria-[current=location]:border-foreground aria-[current=location]:text-foreground",
                e.depth === 2 && "ps-6",
              )}
            >
              {e.title}
            </a>
          </li>
        ))}
      </ul>
      <div className="border-t border-border pt-3">
      <a
        href="#top"
        onClick={(e) => {
          e.preventDefault()
          const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
          window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })
        }}
        className="flex w-fit items-center gap-1 text-ui-sm text-muted-foreground transition-colors duration-150 outline-none hover:text-foreground focus-visible:text-foreground"
      >
        Back to top
        <ArrowUpIcon className="size-3" />
      </a>
      </div>
    </nav>
  )
}
