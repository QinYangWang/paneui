"use client"

import * as React from "react"
import Link from "next/link"

import { ChevronDownIcon, ChevronRightIcon, SearchIcon } from "@/components/icons"
import { Badge } from "@/registry/base-nova/ui/badge"
import { Kbd } from "@/registry/base-nova/ui/kbd"
import { cn } from "@/lib/utils"

import { COMPONENTS_HREF, COMPONENTS_TITLE, GUIDE_PAGES } from "./docs-pages"
import { isNew, WHATS_NEW } from "./whats-new"

export type NavGroup = { category: string; items: { name: string; title: string; description: string }[] }

/** Strip basePath-independent trailing slash so "/docs/button/" and "/docs/button" match. */
export function normalizePath(pathname: string | null) {
  if (!pathname || pathname === "/") return "/"
  return pathname.replace(/\/+$/, "")
}

const COLLAPSED_KEY = "docs-nav-collapsed"

/** Collapsed sections and groups, remembered across pages and visits. */
function useCollapsed() {
  const [collapsed, setCollapsed] = React.useState<Set<string>>(() => new Set())
  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(COLLAPSED_KEY)
      if (raw) setCollapsed(new Set(JSON.parse(raw) as string[]))
    } catch {
      // storage can be unavailable (private mode)
    }
  }, [])
  const toggle = React.useCallback((id: string) => {
    setCollapsed((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      try {
        localStorage.setItem(COLLAPSED_KEY, JSON.stringify([...next]))
      } catch {
        // storage can be unavailable (private mode)
      }
      return next
    })
  }, [])
  return [collapsed, toggle] as const
}

/** One link row: compact, text only; the current page gets a fill and an indicator line. */
function NavLink({ href, active, children, badge }: { href: string; active: boolean; children: React.ReactNode; badge?: React.ReactNode }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "group/nav relative flex h-7 min-w-0 items-center gap-2 rounded-md ps-2.5 pe-2 text-ui text-muted-foreground outline-none transition-colors duration-150",
        "hover:bg-secondary hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50",
        "aria-[current=page]:bg-secondary aria-[current=page]:font-medium aria-[current=page]:text-foreground",
      )}
    >
      {/* Indicator on the section's guide line, outside the fill. */}
      <span
        aria-hidden
        className="absolute inset-y-1.5 -start-2.5 w-0.5 rounded-full bg-transparent group-aria-[current=page]/nav:bg-foreground"
      />
      <span className="min-w-0 flex-1 truncate">{children}</span>
      {badge}
    </Link>
  )
}

/** Collapsible section or group header with a count and a chevron. */
function NavToggle({
  id,
  label,
  count,
  open,
  onToggle,
  level,
}: {
  id: string
  label: string
  count?: number
  open: boolean
  onToggle: (id: string) => void
  level: "section" | "group"
}) {
  const Chevron = open ? ChevronDownIcon : ChevronRightIcon
  return (
    <button
      type="button"
      aria-expanded={open}
      onClick={() => onToggle(id)}
      className={cn(
        "flex h-7 w-full cursor-pointer items-center gap-1.5 rounded-md px-2 text-start outline-none transition-colors duration-150 hover:bg-secondary focus-visible:ring-2 focus-visible:ring-ring/50",
        level === "section" ? "text-ui font-semibold text-foreground" : "text-ui font-medium text-foreground/88",
      )}
    >
      {level === "group" && <Chevron aria-hidden className="size-3 shrink-0 text-muted-foreground" />}
      <span className="truncate">{label}</span>
      {count !== undefined && <span className="text-ui-xs font-normal text-muted-foreground tabular-nums">{count}</span>}
      {level === "section" && <Chevron aria-hidden className="ms-auto size-3.5 shrink-0 text-muted-foreground" />}
    </button>
  )
}

/** Indented list on a hairline guide (the active row's indicator sits on it). */
function NavList({ children }: { children: React.ReactNode }) {
  return <ul className="ms-3.5 flex flex-col gap-px border-s border-border ps-2">{children}</ul>
}

/**
 * Docs navigation: a search field, then collapsible Docs / Components / Templates sections with
 * nested category groups, and a pinned "What's new" link to the changelog.
 */
export function DocsNav({
  groups,
  pathname,
  onSearch,
  searchShortcut,
  className,
}: {
  groups: NavGroup[]
  pathname: string
  onSearch: () => void
  searchShortcut: string
  className?: string
}) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [collapsed, toggle] = useCollapsed()
  const open = (id: string) => !collapsed.has(id)

  // Bring the current page into view once, so deep links don't land on a scrolled-away item.
  React.useEffect(() => {
    const box = ref.current
    const el = box?.querySelector<HTMLElement>('[aria-current="page"]')
    if (!box || !el) return
    const top = el.getBoundingClientRect().top - box.getBoundingClientRect().top + box.scrollTop
    if (top > box.clientHeight - 80) box.scrollTop = Math.max(0, top - box.clientHeight / 2 + el.offsetHeight / 2)
  }, [])

  const templates = groups.filter((g) => g.category === "Templates").flatMap((g) => g.items)
  const components = groups.filter((g) => g.category !== "Templates")
  const componentCount = components.reduce((n, g) => n + g.items.length, 0)
  const newBadge = (name: string) =>
    isNew(name) ? (
      <Badge variant="success" size="sm">
        New
      </Badge>
    ) : undefined

  return (
    <div data-slot="docs-nav" className={cn("flex min-h-0 flex-1 flex-col", className)}>
      <div className="shrink-0 px-3 pt-3 pb-2">
        <button
          type="button"
          onClick={onSearch}
          aria-label="Search docs"
          className="flex h-8 w-full cursor-pointer items-center gap-2 rounded-lg bg-background px-2.5 text-ui text-muted-foreground shadow-well outline-none transition-colors duration-150 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50 dark:bg-input/32"
        >
          <SearchIcon className="size-3.5 shrink-0" />
          <span className="flex-1 text-start">Search</span>
          <Kbd size="sm">{searchShortcut}</Kbd>
        </button>
      </div>

      <nav ref={ref} aria-label="Docs" className="scrollbar-hover min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 pb-4">
        <div className="flex flex-col gap-3">
          <section className="flex flex-col gap-px">
            <NavToggle id="docs" label="Docs" open={open("docs")} onToggle={toggle} level="section" />
            {open("docs") && (
              <NavList>
                {GUIDE_PAGES.map((p) => (
                  <li key={p.href}>
                    <NavLink href={p.href} active={pathname === p.href}>
                      {p.title}
                    </NavLink>
                  </li>
                ))}
              </NavList>
            )}
          </section>

          <section className="flex flex-col gap-px">
            <NavToggle id="components" label="Components" count={componentCount} open={open("components")} onToggle={toggle} level="section" />
            {open("components") && (
              <div className="flex flex-col gap-px">
                <NavList>
                  <li>
                    <NavLink href={COMPONENTS_HREF} active={pathname === COMPONENTS_HREF}>
                      {COMPONENTS_TITLE}
                    </NavLink>
                  </li>
                </NavList>
                {components.map((g) => {
                  const id = `group:${g.category}`
                  const hasActive = g.items.some((i) => pathname === `/docs/${i.name}`)
                  // A group holding the current page always shows it.
                  const isOpen = open(id) || hasActive
                  return (
                    <div key={g.category} className="flex flex-col gap-px">
                      <NavToggle id={id} label={g.category} count={g.items.length} open={isOpen} onToggle={toggle} level="group" />
                      {isOpen && (
                        <NavList>
                          {g.items.map((i) => (
                            <li key={i.name}>
                              <NavLink href={`/docs/${i.name}`} active={pathname === `/docs/${i.name}`} badge={newBadge(i.name)}>
                                {i.title}
                              </NavLink>
                            </li>
                          ))}
                        </NavList>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </section>

          {templates.length > 0 && (
            <section className="flex flex-col gap-px">
              <NavToggle id="templates" label="Templates" count={templates.length} open={open("templates")} onToggle={toggle} level="section" />
              {open("templates") && (
                <NavList>
                  {templates.map((i) => (
                    <li key={i.name}>
                      <NavLink href={`/docs/${i.name}`} active={pathname === `/docs/${i.name}`} badge={newBadge(i.name)}>
                        {i.title}
                      </NavLink>
                    </li>
                  ))}
                </NavList>
              )}
            </section>
          )}
        </div>
      </nav>

      <div className="shrink-0 border-t border-border p-2">
        <Link
          href={WHATS_NEW.href}
          className="flex h-8 items-center gap-2 rounded-lg px-2.5 text-ui font-medium outline-none transition-colors duration-150 hover:bg-secondary focus-visible:ring-2 focus-visible:ring-ring/50"
        >
          <span aria-hidden className="size-1.5 rounded-full bg-success" />
          What&apos;s new
          <span className="ms-auto text-ui-xs font-normal text-muted-foreground tabular-nums">{WHATS_NEW.items.length} new</span>
          <ChevronRightIcon aria-hidden className="size-3.5 text-muted-foreground" />
        </Link>
      </div>
    </div>
  )
}
