"use client"

import * as React from "react"

import { ArrowUpIcon, ChevronDownIcon } from "@/components/icons"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/base-nova/ui/button"
import { OverflowHint, OverflowHintContent, OverflowHintTrigger } from "@/registry/base-nova/ui/overflow-hint"
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/base-nova/ui/popover"
import { ScrollArea } from "@/registry/base-nova/ui/scroll-area"

export type TocEntry = { id: string; title: string; depth?: 1 | 2 }

/** A heading counts as current once its top passes this line (header, outline bar and a little air). */
const ACTIVE_LINE = 112

/** Where the track runs for each depth (px from the list's start edge), and how long the step between depths is. */
const TRACK_X = { 1: 1, 2: 13 } as const
const STEP = 8

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

function useScrolled(threshold = 320) {
  const [scrolled, setScrolled] = React.useState(false)
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [threshold])
  return scrolled
}

type Track = { d: string; height: number; width: number; active?: { top: number; bottom: number } }

/**
 * The track: one path down the list's start edge that steps in for nested entries and back out,
 * built from the links' measured offsets. Each entry runs straight from its top to its bottom at
 * its depth's x; a change of depth is a short diagonal at the top of the entry that changes it.
 */
function buildTrack(list: HTMLElement, activeId: string | undefined): Track | null {
  const links = [...list.querySelectorAll<HTMLElement>("[data-toc-id]")]
  if (links.length === 0) return null
  let d = ""
  let prevX: number | undefined
  let active: Track["active"]
  links.forEach((link, i) => {
    const x = TRACK_X[link.dataset.depth === "2" ? 2 : 1]
    const top = link.offsetTop
    const bottom = top + link.offsetHeight
    const stepped = i > 0 && x !== prevX
    if (i === 0) d += `M${x} ${top}`
    else if (stepped) d += `L${x} ${top + STEP}`
    d += `L${x} ${bottom}`
    prevX = x
    // The lit stretch is the straight run beside the entry, below its step.
    if (link.dataset.tocId === activeId) active = { top: stepped ? top + STEP : top, bottom }
  })
  return { d, height: list.scrollHeight, width: TRACK_X[2] + 2, active }
}

/** The outline entries over the track; the stretch of track beside the current entry is drawn solid and slides between entries. */
function TocList({
  entries,
  active,
  onSelect,
  hintSide = "left",
  listRef,
}: {
  entries: TocEntry[]
  active: string | undefined
  onSelect: (id: string) => void
  hintSide?: "left" | "bottom"
  listRef?: React.RefObject<HTMLUListElement | null>
}) {
  const ownRef = React.useRef<HTMLUListElement>(null)
  const ref = listRef ?? ownRef
  const [track, setTrack] = React.useState<Track | null>(null)

  React.useLayoutEffect(() => {
    const list = ref.current
    if (!list) return
    const place = () => setTrack(buildTrack(list, active))
    place()
    const ro = new ResizeObserver(place)
    ro.observe(list)
    return () => ro.disconnect()
  }, [active, entries, ref])

  return (
    <ul ref={ref} className="relative flex flex-col py-0.5">
      {track && (
        <li aria-hidden className="pointer-events-none absolute start-0 top-0">
          <svg width={track.width} height={track.height} viewBox={`0 0 ${track.width} ${track.height}`} fill="none" className="overflow-visible">
            <path d={track.d} className="stroke-border" strokeWidth={1} strokeLinejoin="round" />
            <path
              d={track.d}
              className="stroke-foreground transition-[clip-path,opacity] duration-300 ease-out motion-reduce:transition-none"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                clipPath: track.active
                  ? `inset(${track.active.top}px -2px ${Math.max(0, track.height - track.active.bottom)}px -2px)`
                  : `inset(0 -2px ${track.height}px -2px)`,
                opacity: track.active ? 1 : 0,
              }}
            />
          </svg>
        </li>
      )}
      {entries.map((e) => (
        <li key={e.id}>
          <a
            href={`#${e.id}`}
            data-toc-id={e.id}
            data-depth={e.depth ?? 1}
            aria-current={active === e.id ? "location" : undefined}
            onClick={() => onSelect(e.id)}
            className={cn(
              "block rounded-sm py-1 ps-3.5 text-muted-foreground transition-colors duration-150 outline-none hover:text-foreground focus-visible:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-inset aria-[current=location]:text-foreground",
              e.depth === 2 && "ps-6.5 text-ui-sm",
            )}
          >
            <OverflowHint>
              <OverflowHintTrigger>{e.title}</OverflowHintTrigger>
              <OverflowHintContent side={hintSide} sideOffset={16}>
                {e.title}
              </OverflowHintContent>
            </OverflowHint>
          </a>
        </li>
      ))}
    </ul>
  )
}

/** Keeps the current entry inside a scroll viewport, about a third of the way down. */
function useKeepInView(viewportRef: React.RefObject<HTMLDivElement | null>, listRef: React.RefObject<HTMLUListElement | null>, active: string | undefined, enabled = true) {
  React.useLayoutEffect(() => {
    const vp = viewportRef.current
    const link = listRef.current?.querySelector<HTMLElement>(`[data-toc-id="${CSS.escape(active ?? "")}"]`)
    if (!enabled || !vp || !link) return
    const pad = 24
    const top = link.offsetTop
    const bottom = top + link.offsetHeight
    if (top - pad < vp.scrollTop || bottom + pad > vp.scrollTop + vp.clientHeight) {
      vp.scrollTo({ top: Math.max(0, top - vp.clientHeight / 3), behavior: reducedMotion() ? "auto" : "smooth" })
    }
  }, [active, enabled, listRef, viewportRef])
}

function scrollToTop(e: React.MouseEvent) {
  e.preventDefault()
  window.scrollTo({ top: 0, behavior: reducedMotion() ? "auto" : "smooth" })
}

/**
 * Sticky "On this page" outline. It never grows past the viewport: the list scrolls in its own
 * thin area with fades at the cut edges and keeps the current section in view. A track follows
 * the heading depth and lights up beside the current entry; long titles stay on one line and show
 * in full on hover. "Back to top" sits under the list and appears once the page has scrolled.
 */
export function DocToc({ entries }: { entries: TocEntry[] }) {
  const [active, setActive] = useActiveId(entries)
  const viewportRef = React.useRef<HTMLDivElement>(null)
  const listRef = React.useRef<HTMLUListElement>(null)
  const scrolled = useScrolled()
  useKeepInView(viewportRef, listRef, active)

  return (
    <nav
      aria-label="On this page"
      // The sticky rail starts 5rem down (header plus gap) and keeps 1.5rem clear at the bottom.
      style={{ maxHeight: "calc(100svh - 6.5rem)" }}
      className="flex min-h-0 flex-col gap-3 text-ui"
    >
      <p className="shrink-0 font-medium text-foreground">On this page</p>
      <ScrollArea fade viewportRef={viewportRef} className="-ms-1 flex min-h-0 flex-1 flex-col" viewportClassName="min-h-0 flex-1 ps-1 pe-3">
        <TocList entries={entries} active={active} onSelect={setActive} listRef={listRef} />
      </ScrollArea>
      <div className="shrink-0 border-t border-border pt-3">
        <a
          href="#top"
          inert={!scrolled}
          aria-hidden={!scrolled}
          onClick={scrollToTop}
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

/**
 * The outline folded into one button for narrow screens and full-width pages: "On this page" plus
 * the current section, sticky under the header, opening the same list in a popover.
 */
export function DocTocPopover({ entries, narrow, className }: { entries: TocEntry[]; narrow?: boolean; className?: string }) {
  const [active, setActive] = useActiveId(entries)
  const [open, setOpen] = React.useState(false)
  const viewportRef = React.useRef<HTMLDivElement>(null)
  const listRef = React.useRef<HTMLUListElement>(null)
  const scrolled = useScrolled()
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(open), [open])
  useKeepInView(viewportRef, listRef, active, mounted)
  const current = entries.find((e) => e.id === active)

  return (
    <div data-md-skip className={cn("sticky top-12 z-30 -my-4 bg-background py-2", className)}>
      {/* On wide pages the button keeps a reading width instead of spanning the content. */}
      <div className={cn(narrow && "max-w-sm")}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger render={<Button variant="secondary" className="w-full" />}>
          <span className="flex min-w-0 flex-1 items-center gap-2 text-start">
            <span className="shrink-0 text-foreground">On this page</span>
            {scrolled && current && (
              <>
                <span aria-hidden className="shrink-0 text-muted-foreground">
                  ·
                </span>
                <span className="min-w-0 truncate font-normal text-muted-foreground">{current.title}</span>
              </>
            )}
          </span>
          <ChevronDownIcon className="size-3.5 text-muted-foreground transition-transform duration-200 group-aria-expanded/button:rotate-180 motion-reduce:transition-none" />
        </PopoverTrigger>
        <PopoverContent align="start" sideOffset={6} className="w-(--anchor-width) gap-2 p-2">
          <ScrollArea
            fade
            viewportRef={viewportRef}
            className="flex min-h-0 flex-col"
            viewportClassName="ps-1 pe-3 text-ui"
            viewportProps={{ style: { maxHeight: "min(24rem, 60svh)" } }}
          >
            <TocList
              entries={entries}
              active={active}
              hintSide="bottom"
              listRef={listRef}
              onSelect={(id) => {
                setActive(id)
                setOpen(false)
              }}
            />
          </ScrollArea>
          {scrolled && (
            <div className="border-t border-border px-1 pt-2">
              <a
                href="#top"
                onClick={(e) => {
                  setOpen(false)
                  scrollToTop(e)
                }}
                className="flex w-fit items-center gap-1 rounded-sm text-ui-sm text-muted-foreground transition-colors duration-150 outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50"
              >
                Back to top
                <ArrowUpIcon className="size-3" />
              </a>
            </div>
          )}
        </PopoverContent>
      </Popover>
      </div>
    </div>
  )
}
