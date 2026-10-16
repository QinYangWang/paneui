"use client"

import * as React from "react"

import { ArrowUpIcon } from "@/components/icons"
import { cn } from "@/lib/utils"
import { OverflowHint, OverflowHintContent, OverflowHintTrigger } from "@/registry/base-nova/ui/overflow-hint"
import { ScrollArea } from "@/registry/base-nova/ui/scroll-area"

export type TocEntry = { id: string; title: string; depth?: 1 | 2 }

/** A heading counts as current once its top passes this line (header plus a little air). */
const ACTIVE_LINE = 112

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches

/** The id of the section being read: the last heading above the line, or the last one at the page end. */
function useActiveId(entries: TocEntry[]) {
  const [active, setActive] = React.useState(entries[0]?.id)
  React.useEffect(() => {
    const els = entries.map((e) => document.getElementById(e.id)).filter((e): e is HTMLElement => !!e)
    let frame = 0
    const update = () => {
      frame = 0
      const atEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
      let current = els[0]?.id
      if (atEnd && els.length) current = els[els.length - 1].id
      else for (const el of els) if (el.getBoundingClientRect().top < ACTIVE_LINE) current = el.id
      setActive(current)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [entries])
  return [active, setActive] as const
}

/**
 * Sticky "On this page" outline. It never grows past the viewport: the list scrolls in its own
 * thin area with fades at the cut edges and keeps the current section in view. One indicator
 * slides along the rail to the current entry; long titles stay on one line and show in full on
 * hover. "Back to top" sits under the list and appears once the page has scrolled.
 */
export function DocToc({ entries }: { entries: TocEntry[] }) {
  const [active, setActive] = useActiveId(entries)
  const viewportRef = React.useRef<HTMLDivElement>(null)
  const listRef = React.useRef<HTMLUListElement>(null)
  const [bar, setBar] = React.useState<{ top: number; height: number } | null>(null)
  const [scrolled, setScrolled] = React.useState(false)

  // Indicator position and keeping the current entry inside the scroll area.
  React.useLayoutEffect(() => {
    const list = listRef.current
    const link = list?.querySelector<HTMLElement>(`[data-toc-id="${CSS.escape(active ?? "")}"]`)
    if (!list || !link) return setBar(null)
    const place = () => setBar({ top: link.offsetTop, height: link.offsetHeight })
    place()
    const vp = viewportRef.current
    if (vp) {
      const pad = 24
      const top = link.offsetTop
      const bottom = top + link.offsetHeight
      if (top - pad < vp.scrollTop || bottom + pad > vp.scrollTop + vp.clientHeight) {
        const target = Math.max(0, top - vp.clientHeight / 3)
        vp.scrollTo({ top: target, behavior: reducedMotion() ? "auto" : "smooth" })
      }
    }
    const ro = new ResizeObserver(place)
    ro.observe(list)
    return () => ro.disconnect()
  }, [active])

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 320)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <nav
      aria-label="On this page"
      // The sticky rail starts 5rem down (header plus gap) and keeps 1.5rem clear at the bottom.
      style={{ maxHeight: "calc(100svh - 6.5rem)" }}
      className="flex min-h-0 flex-col gap-3 text-ui"
    >
      <p className="shrink-0 font-medium text-foreground">On this page</p>
      <ScrollArea fade viewportRef={viewportRef} className="-ms-1 flex min-h-0 flex-1 flex-col" viewportClassName="min-h-0 flex-1 ps-1 pe-3">
        <ul ref={listRef} className="relative flex flex-col border-s border-border py-0.5">
          {bar && (
            <li
              aria-hidden
              style={{ "--bar-top": `${bar.top}px`, "--bar-h": `${bar.height}px` } as React.CSSProperties}
              className="pointer-events-none absolute -start-px top-0 h-(--bar-h) w-0.5 translate-y-(--bar-top) rounded-full bg-foreground transition-[translate,height] duration-300 ease-out motion-reduce:transition-none"
            />
          )}
          {entries.map((e) => (
            <li key={e.id}>
              <a
                href={`#${e.id}`}
                data-toc-id={e.id}
                data-depth={e.depth ?? 1}
                aria-current={active === e.id ? "location" : undefined}
                onClick={() => setActive(e.id)}
                className={cn(
                  "block rounded-sm py-1 ps-3 text-muted-foreground transition-colors duration-150 outline-none hover:text-foreground focus-visible:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-inset aria-[current=location]:text-foreground",
                  e.depth === 2 && "ps-6 text-ui-sm",
                )}
              >
                <OverflowHint>
                  <OverflowHintTrigger>{e.title}</OverflowHintTrigger>
                  <OverflowHintContent side="left" sideOffset={16}>
                    {e.title}
                  </OverflowHintContent>
                </OverflowHint>
              </a>
            </li>
          ))}
        </ul>
      </ScrollArea>
      <div className="shrink-0 border-t border-border pt-3">
        <a
          href="#top"
          inert={!scrolled}
          aria-hidden={!scrolled}
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: reducedMotion() ? "auto" : "smooth" })
          }}
          className={cn(
            "flex w-fit items-center gap-1 rounded-sm text-ui-sm text-muted-foreground transition-[color,opacity] duration-200 outline-none hover:text-foreground focus-visible:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50",
            !scrolled && "opacity-0",
          )}
        >
          Back to top
          <ArrowUpIcon className="size-3" />
        </a>
      </div>
    </nav>
  )
}
