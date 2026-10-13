"use client"

import * as React from "react"
import { AnimatePresence, motion, useReducedMotion, type Transition } from "motion/react"

import { ClockIcon, SearchIcon, XIcon } from "@/components/icons"
import { cn } from "@/lib/utils"

type MorphingSearchChipsProps = {
  /** Terms applied as chips inside the bar. */
  chips?: string[]
  defaultChips?: string[]
  onChipsChange?: (chips: string[]) => void
  /** Recent searches, newest first. */
  recents?: string[]
  defaultRecents?: string[]
  onRecentsChange?: (recents: string[]) => void
  /** Persist uncontrolled recents in localStorage under this key. */
  storageKey?: string
  /** How many recent searches to keep. Default 6. */
  maxRecents?: number
  /** Terms offered while typing (filtered by substring). */
  suggestions?: string[]
  /** How many suggestions to list. Default 5. */
  maxSuggestions?: number
  /** Most chips allowed at once. */
  maxChips?: number
  /** Called with the chips whenever a term is added or Enter is pressed on an empty field. */
  onSearch?: (chips: string[]) => void
  placeholder?: string
  /** Which way the panel unfolds. "top" suits a bar docked at the bottom. Default "top". */
  side?: "top" | "bottom"
  /** Bar width at rest and while focused, in px. */
  collapsedWidth?: number
  expandedWidth?: number
  /** Shown when the field is empty and there are no recent searches. */
  emptyState?: React.ReactNode
  className?: string
}

type Row = { id: string; label: string; kind: "query" | "recent" | "suggestion" }

const GROW: Transition = { type: "spring", duration: 0.5, bounce: 0.22 }
const UNFOLD: Transition = { type: "spring", duration: 0.45, bounce: 0.1 }

const norm = (term: string) => term.trim().replace(/\s+/g, " ")
const has = (list: string[], term: string) => list.some((t) => t.toLowerCase() === term.toLowerCase())

function useControllable<T>(value: T | undefined, defaultValue: T, onChange?: (value: T) => void) {
  const [inner, setInner] = React.useState(defaultValue)
  const current = value !== undefined ? value : inner
  const set = React.useCallback(
    (next: T) => {
      if (value === undefined) setInner(next)
      onChange?.(next)
    },
    [onChange, value]
  )
  return [current, set, setInner] as const
}

/**
 * Docked search bar that springs wider on focus and unfolds a recent-searches panel out
 * of its own edge. Picked terms become removable chips in the bar; suggestions filter
 * as you type. Keyboard: ↑/↓ move, Enter adds, Backspace on an empty field removes the
 * last chip, Escape clears then closes.
 */
function MorphingSearchChips({
  chips: chipsProp,
  defaultChips = [],
  onChipsChange,
  recents: recentsProp,
  defaultRecents = [],
  onRecentsChange,
  storageKey,
  maxRecents = 6,
  suggestions = [],
  maxSuggestions = 5,
  maxChips,
  onSearch,
  placeholder = "Search",
  side = "top",
  collapsedWidth = 280,
  expandedWidth = 420,
  emptyState = "Your recent searches will show up here.",
  className,
}: MorphingSearchChipsProps) {
  const reduceMotion = useReducedMotion()
  const uid = React.useId()
  const surfaceRef = React.useRef<HTMLDivElement>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const [chips, setChips] = useControllable(chipsProp, defaultChips, onChipsChange)
  const [recents, setRecents, setInnerRecents] = useControllable(recentsProp, defaultRecents, onRecentsChange)
  const [query, setQuery] = React.useState("")
  const [focused, setFocused] = React.useState(false)
  const [cursor, setCursor] = React.useState(-1)

  // Load / save uncontrolled recents. Saving waits for the render that carries the
  // loaded list, so the mount pass never overwrites what is stored.
  const [hydrated, setHydrated] = React.useState(false)
  React.useEffect(() => {
    if (!storageKey || recentsProp !== undefined || !hydrated) return
    try {
      localStorage.setItem(storageKey, JSON.stringify(recents))
    } catch {
      // storage unavailable
    }
  }, [recents, storageKey, recentsProp, hydrated])

  React.useEffect(() => {
    if (!storageKey || recentsProp !== undefined) return
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) ?? "null")
      if (Array.isArray(saved)) setInnerRecents(saved.filter((t): t is string => typeof t === "string"))
    } catch {
      // ignore malformed storage
    }
    setHydrated(true)
  }, [storageKey, recentsProp, setInnerRecents])

  const q = norm(query)
  const rows: Row[] = React.useMemo(() => {
    if (!q) return recents.filter((t) => !has(chips, t)).map((t) => ({ id: `r-${t}`, label: t, kind: "recent" as const }))
    const lower = q.toLowerCase()
    const pool = [...recents, ...suggestions.filter((s) => !has(recents, s))]
    const matches = pool
      .filter((t) => t.toLowerCase().includes(lower) && t.toLowerCase() !== lower && !has(chips, t))
      .sort((a, b) => Number(!a.toLowerCase().startsWith(lower)) - Number(!b.toLowerCase().startsWith(lower)))
      .slice(0, maxSuggestions)
      .map((t) => ({ id: `s-${t}`, label: t, kind: has(recents, t) ? ("recent" as const) : ("suggestion" as const) }))
    return [{ id: "query", label: q, kind: "query" as const }, ...matches]
  }, [q, recents, suggestions, chips, maxSuggestions])

  React.useEffect(() => setCursor(q ? 0 : -1), [q])

  const full = maxChips !== undefined && chips.length >= maxChips
  const optionId = (row: Row) => `${uid}-${row.id.replace(/[^a-zA-Z0-9_-]/g, "_")}`

  const commit = (raw: string) => {
    const term = norm(raw)
    setQuery("")
    if (!term || has(chips, term) || full) return
    const next = [...chips, term]
    setChips(next)
    setRecents([term, ...recents.filter((t) => t.toLowerCase() !== term.toLowerCase())].slice(0, maxRecents))
    onSearch?.(next)
  }

  const removeChip = (term: string) => {
    const next = chips.filter((t) => t !== term)
    setChips(next)
    onSearch?.(next)
    inputRef.current?.focus()
  }

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const n = rows.length
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      if (!n) return
      event.preventDefault()
      // In a panel that opens upwards, ↑ walks into it first.
      const step = (event.key === "ArrowDown") === (side === "bottom") ? 1 : -1
      setCursor((c) => (c < 0 ? (step > 0 ? 0 : n - 1) : (c + step + n) % n))
    } else if (event.key === "Enter") {
      event.preventDefault()
      const row = rows[cursor]
      if (row) commit(row.label)
      else if (q) commit(q)
      else onSearch?.(chips)
    } else if (event.key === "Backspace" && !query && chips.length) {
      event.preventDefault()
      removeChip(chips[chips.length - 1])
    } else if (event.key === "Escape") {
      event.preventDefault()
      if (query) setQuery("")
      else inputRef.current?.blur()
    }
  }

  const keepFocus = (event: React.PointerEvent) => event.preventDefault()
  const t = (tr: Transition) => (reduceMotion ? { duration: 0 } : tr)

  const panel = (
    <AnimatePresence initial={false}>
      {focused && (
        <motion.div
          key="panel"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={t(UNFOLD)}
          className="overflow-hidden"
        >
          <motion.div
            initial={reduceMotion ? false : { y: side === "top" ? 10 : -10, filter: "blur(4px)" }}
            animate={{ y: 0, filter: "blur(0px)" }}
            exit={reduceMotion ? undefined : { y: side === "top" ? 6 : -6, filter: "blur(4px)" }}
            transition={t(UNFOLD)}
            className={cn("px-3", side === "top" ? "pt-3 pb-1" : "pt-1 pb-3")}
            onPointerDown={keepFocus}
          >
            {!q ? (
              <>
                <div className="mb-2 flex items-center justify-between px-0.5">
                  <span className="text-[0.7rem] font-medium tracking-wide text-muted-foreground uppercase">Recent</span>
                  {recents.length > 0 && (
                    <button
                      type="button"
                      tabIndex={-1}
                      onClick={() => setRecents([])}
                      className="cursor-pointer rounded-full px-2 py-0.5 text-[0.7rem] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      Clear
                    </button>
                  )}
                </div>
                {rows.length ? (
                  <div id={`${uid}-list`} role="listbox" aria-label="Recent searches" className="flex flex-wrap gap-1.5 pb-1">
                    {rows.map((row, i) => (
                      <motion.div
                        key={row.id}
                        id={optionId(row)}
                        role="option"
                        aria-selected={i === cursor}
                        data-active={i === cursor || undefined}
                        initial={reduceMotion ? false : { opacity: 0, scale: 0.85, y: side === "top" ? 6 : -6 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={reduceMotion ? { duration: 0 } : { ...UNFOLD, delay: Math.min(i, 8) * 0.025 }}
                        onPointerMove={() => i !== cursor && setCursor(i)}
                        onClick={() => commit(row.label)}
                        className="inline-flex h-7 cursor-pointer items-center gap-1.5 rounded-full bg-secondary bg-linear-to-b from-white/6 to-transparent px-2.5 text-xs text-secondary-foreground shadow-chip transition-shadow data-active:shadow-raised-hover data-active:ring-2 data-active:ring-ring/50"
                      >
                        <ClockIcon size={12} className="text-muted-foreground" />
                        {row.label}
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <p className="px-0.5 pb-2 text-xs text-muted-foreground">{emptyState}</p>
                )}
              </>
            ) : (
              <div id={`${uid}-list`} role="listbox" aria-label="Suggestions" className="flex flex-col gap-0.5">
                {rows.map((row, i) => (
                  <div
                    key={row.id}
                    id={optionId(row)}
                    role="option"
                    aria-selected={i === cursor}
                    data-active={i === cursor || undefined}
                    onPointerMove={() => i !== cursor && setCursor(i)}
                    onClick={() => commit(row.label)}
                    className="flex h-8 cursor-pointer items-center gap-2 rounded-xl px-2 text-sm text-muted-foreground transition-colors data-active:bg-muted data-active:text-foreground"
                  >
                    {row.kind === "recent" ? <ClockIcon size={14} /> : <SearchIcon size={14} />}
                    <span className="min-w-0 flex-1 truncate">
                      {row.kind === "query" ? (
                        <>
                          Add <span className="font-medium text-foreground">“{row.label}”</span>
                        </>
                      ) : (
                        row.label
                      )}
                    </span>
                    {i === cursor && <kbd className="font-sans text-[0.7rem] text-muted-foreground">↵</kbd>}
                  </div>
                ))}
              </div>
            )}
            {full && <p className="px-0.5 pt-1 text-[0.7rem] text-warning">Up to {maxChips} terms.</p>}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  const bar = (
    <div className="flex min-h-12 flex-wrap items-center gap-1.5 px-3 py-2" onPointerDown={(e) => e.target === e.currentTarget && keepFocus(e)}>
      <span
        aria-hidden
        className={cn("flex shrink-0 transition-colors duration-200", focused ? "text-foreground" : "text-muted-foreground")}
        onClick={() => inputRef.current?.focus()}
      >
        <SearchIcon size={17} />
      </span>
      <AnimatePresence initial={false} mode="popLayout">
        {chips.map((chip) => (
          <motion.span
            key={chip}
            layout={!reduceMotion}
            initial={reduceMotion ? false : { opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.6 }}
            transition={t(GROW)}
            className="inline-flex h-7 max-w-40 items-center gap-1 rounded-full bg-primary/12 pr-1 pl-2.5 text-xs font-medium text-foreground shadow-[inset_0_0_0_1px_color-mix(in_oklch,var(--primary),transparent_70%)]"
          >
            <span className="truncate">{chip}</span>
            <button
              type="button"
              aria-label={`Remove ${chip}`}
              onClick={() => removeChip(chip)}
              className="flex size-5 cursor-pointer items-center justify-center rounded-full text-muted-foreground transition-colors outline-none hover:bg-primary/15 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
            >
              <XIcon size={11} />
            </button>
          </motion.span>
        ))}
      </AnimatePresence>
      <input
        ref={inputRef}
        role="combobox"
        aria-expanded={focused}
        aria-controls={focused && rows.length ? `${uid}-list` : undefined}
        aria-autocomplete="list"
        aria-activedescendant={focused && rows[cursor] ? optionId(rows[cursor]) : undefined}
        aria-label={placeholder}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={onKeyDown}
        placeholder={chips.length ? "" : placeholder}
        autoComplete="off"
        spellCheck={false}
        enterKeyHint="search"
        className="h-8 min-w-16 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
      />
      <AnimatePresence initial={false}>
        {(query || chips.length > 0) && (
          <motion.button
            key="clear"
            type="button"
            aria-label="Clear all"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={t(GROW)}
            onClick={() => {
              setQuery("")
              if (chips.length) {
                setChips([])
                onSearch?.([])
              }
              inputRef.current?.focus()
            }}
            className="flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring"
          >
            <XIcon size={12} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )

  return (
    <div
      data-slot="morphing-search-chips"
      data-focused={focused || undefined}
      className={cn("relative h-12 w-full", className)}
      style={{ maxWidth: expandedWidth }}
    >
      <motion.div
        ref={surfaceRef}
        role="search"
        initial={false}
        animate={{ width: focused ? expandedWidth : collapsedWidth }}
        transition={t(GROW)}
        onFocus={() => setFocused(true)}
        onBlur={(event) => {
          if (!surfaceRef.current?.contains(event.relatedTarget as Node | null)) {
            setFocused(false)
            setCursor(-1)
          }
        }}
        style={{ borderRadius: 24 }}
        className={cn(
          "absolute inset-x-0 z-40 mx-auto flex max-w-full flex-col overflow-hidden bg-popover text-popover-foreground shadow-surface",
          side === "top" ? "bottom-0" : "top-0"
        )}
      >
        {side === "top" ? (
          <>
            {panel}
            {bar}
          </>
        ) : (
          <>
            {bar}
            {panel}
          </>
        )}
      </motion.div>
    </div>
  )
}

export { MorphingSearchChips }
export type { MorphingSearchChipsProps }
