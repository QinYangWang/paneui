"use client"

import * as React from "react"
import { motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

export type TocItem = { id: string; title: string; depth: 2 | 3 }

/** Tracks which heading is currently being read: the last one above the top 30% of the viewport. */
export function useScrollSpy(ids: string[], offset = 0.3) {
  const [active, setActive] = React.useState(ids[0] ?? "")
  React.useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el)
    if (!els.length) return
    let frame = 0
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const line = window.innerHeight * offset
        let current = els[0].id
        for (const el of els) if (el.getBoundingClientRect().top <= line) current = el.id
        // At the very bottom, the last heading wins even if it never reaches the line.
        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) current = els[els.length - 1].id
        setActive(current)
      })
    }
    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [ids, offset])
  return active
}

export function TableOfContents({ items }: { items: TocItem[] }) {
  const ids = React.useMemo(() => items.map((i) => i.id), [items])
  const active = useScrollSpy(ids)
  const reduce = useReducedMotion()
  return (
    <nav aria-label="On this page" className="flex flex-col gap-3">
      <h2 className="text-xs font-medium tracking-wider text-muted-foreground uppercase">On this page</h2>
      <ul className="relative flex flex-col border-s border-border">
        {items.map((item) => {
          const isActive = item.id === active
          return (
            <li key={item.id} className="relative">
              {isActive && (
                <motion.span
                  layoutId="toc-indicator"
                  aria-hidden
                  className="absolute inset-y-1 -start-px w-0.5 rounded-full bg-primary"
                  transition={reduce ? { duration: 0 } : { type: "spring", duration: 0.35, bounce: 0 }}
                />
              )}
              <a
                href={`#${item.id}`}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "block py-1.5 text-sm text-pretty transition-colors duration-150 outline-none hover:text-foreground focus-visible:text-foreground focus-visible:underline",
                  item.depth === 3 ? "ps-7" : "ps-4",
                  isActive ? "font-medium text-foreground" : "text-muted-foreground"
                )}
              >
                {item.title}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
