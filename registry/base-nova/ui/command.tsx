"use client"

import * as React from "react"
import { useDirection } from "@base-ui/react/direction-provider"
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"

import { SearchIcon } from "@/components/icons"
import { cn } from "@/lib/utils"

/*
 * A searchable list of actions: inline (a picker inside a popover or a panel) or in a dialog
 * (⌘K). Typing filters the items, ↑/↓ move, Enter runs the highlighted one.
 *
 *   <Command>
 *     <CommandInput placeholder="Type a command…" />
 *     <CommandList>
 *       <CommandEmpty>Nothing found.</CommandEmpty>
 *       <CommandGroup heading="Files">
 *         <CommandItem onSelect={…}>New file<CommandShortcut>⌘N</CommandShortcut></CommandItem>
 *       </CommandGroup>
 *     </CommandList>
 *   </Command>
 */

/** Default ranking: prefix 3, substring 2, letters in order 1, no match 0. */
function defaultFilter(value: string, search: string, keywords: string[] = []) {
  const q = search.trim().toLowerCase()
  if (!q) return 1
  let best = 0
  for (const raw of [value, ...keywords]) {
    const t = raw.toLowerCase()
    if (t.startsWith(q)) return 3
    if (t.includes(q)) best = Math.max(best, 2)
    else {
      let i = 0
      for (const ch of t) if (ch === q[i]) i++
      if (i === q.length) best = Math.max(best, 1)
    }
  }
  return best
}

type CommandContextValue = {
  search: string
  setSearch: (s: string) => void
  active: string | null
  setActive: (v: string | null) => void
  filter: (value: string, search: string, keywords?: string[]) => number
  shouldFilter: boolean
  count: number
  listId: string
  rootRef: React.RefObject<HTMLDivElement | null>
}

const CommandContext = React.createContext<CommandContextValue | null>(null)

function useCommand() {
  const ctx = React.useContext(CommandContext)
  if (!ctx) throw new Error("Command parts must be used inside <Command>")
  return ctx
}

const itemSelector = "[data-slot=command-item]:not([data-disabled])"
const valueOf = (el: Element) => el.getAttribute("data-value") ?? ""

type CommandProps = Omit<React.ComponentProps<"div">, "onChange"> & {
  /** Controlled search text. */
  search?: string
  onSearchChange?: (search: string) => void
  /** Ranking used to hide items; return 0 to hide. */
  filter?: (value: string, search: string, keywords?: string[]) => number
  /** Set false when the items are already filtered (server search). */
  shouldFilter?: boolean
  /** Wrap from the last item to the first with the arrow keys. */
  loop?: boolean
}

function Command({
  search: searchProp,
  onSearchChange,
  filter = defaultFilter,
  shouldFilter = true,
  loop = false,
  className,
  onKeyDown,
  ...props
}: CommandProps) {
  const [inner, setInner] = React.useState("")
  const search = searchProp ?? inner
  const setSearch = React.useCallback(
    (s: string) => {
      if (searchProp === undefined) setInner(s)
      onSearchChange?.(s)
    },
    [searchProp, onSearchChange]
  )
  const [active, setActive] = React.useState<string | null>(null)
  const [count, setCount] = React.useState(0)
  const rootRef = React.useRef<HTMLDivElement>(null)
  const listId = React.useId()

  // After every render: keep the highlight on a visible item and count what is shown.
  React.useLayoutEffect(() => {
    const items = Array.from(rootRef.current?.querySelectorAll(itemSelector) ?? [])
    if (items.length !== count) setCount(items.length)
    if (!items.some((el) => valueOf(el) === active)) setActive(items[0] ? valueOf(items[0]) : null)
  })

  // A new search starts at the top.
  React.useLayoutEffect(() => {
    const first = rootRef.current?.querySelector(itemSelector)
    setActive(first ? valueOf(first) : null)
    rootRef.current?.querySelector("[data-slot=command-list]")?.scrollTo({ top: 0 })
  }, [search])

  const move = (step: number | "first" | "last") => {
    const items = Array.from(rootRef.current?.querySelectorAll<HTMLElement>(itemSelector) ?? [])
    if (!items.length) return
    const at = items.findIndex((el) => valueOf(el) === active)
    let next = step === "first" ? 0 : step === "last" ? items.length - 1 : at + step
    if (loop) next = (next + items.length) % items.length
    next = Math.max(0, Math.min(items.length - 1, next))
    setActive(valueOf(items[next]))
    items[next].scrollIntoView({ block: "nearest" })
  }

  const ctx = React.useMemo(
    () => ({ search, setSearch, active, setActive, filter, shouldFilter, count, listId, rootRef }),
    [search, setSearch, active, filter, shouldFilter, count, listId]
  )

  return (
    <CommandContext.Provider value={ctx}>
      <div
        ref={rootRef}
        data-slot="command"
        onKeyDown={(e) => {
          onKeyDown?.(e)
          if (e.defaultPrevented || e.nativeEvent.isComposing) return
          if (e.key === "ArrowDown" || (e.ctrlKey && e.key === "n")) {
            e.preventDefault()
            move(1)
          } else if (e.key === "ArrowUp" || (e.ctrlKey && e.key === "p")) {
            e.preventDefault()
            move(-1)
          } else if (e.key === "Home" && e.target === e.currentTarget) {
            e.preventDefault()
            move("first")
          } else if (e.key === "End" && e.target === e.currentTarget) {
            e.preventDefault()
            move("last")
          } else if (e.key === "Enter") {
            const el = Array.from(rootRef.current?.querySelectorAll<HTMLElement>(itemSelector) ?? []).find((x) => valueOf(x) === active)
            if (el) {
              e.preventDefault()
              el.click()
            }
          }
        }}
        className={cn("frame-xl flex w-full flex-col overflow-hidden bg-popover text-popover-foreground", className)}
        {...props}
      />
    </CommandContext.Provider>
  )
}

function CommandInput({ className, onChange, ...props }: Omit<React.ComponentProps<"input">, "value">) {
  const { search, setSearch, active, listId } = useCommand()
  return (
    <div data-slot="command-input-wrapper" className="flex h-10 shrink-0 items-center gap-2 border-b border-border px-3">
      <SearchIcon className="size-4 shrink-0 text-muted-foreground" />
      <input
        data-slot="command-input"
        role="combobox"
        aria-expanded
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={active ? `${listId}-${encodeURIComponent(active)}` : undefined}
        autoComplete="off"
        spellCheck={false}
        value={search}
        onChange={(e) => {
          onChange?.(e)
          setSearch(e.target.value)
        }}
        className={cn("h-full min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground/72 md:text-ui", className)}
        {...props}
      />
    </div>
  )
}

function CommandList({ className, ...props }: React.ComponentProps<"div">) {
  const { listId } = useCommand()
  return (
    <div
      id={listId}
      role="listbox"
      data-slot="command-list"
      className={cn("frame-inner frame-p-1 max-h-80 scroll-py-1 overflow-y-auto overscroll-contain", className)}
      {...props}
    />
  )
}

/** Shown only when no item matches. */
function CommandEmpty({ className, ...props }: React.ComponentProps<"div">) {
  const { count } = useCommand()
  if (count > 0) return null
  return <div data-slot="command-empty" role="presentation" className={cn("px-3 py-8 text-center text-ui text-muted-foreground", className)} {...props} />
}

/** Items under a heading; hidden while none of them match. */
function CommandGroup({ className, heading, children, ...props }: React.ComponentProps<"div"> & { heading?: React.ReactNode }) {
  const id = React.useId()
  return (
    <div
      role="group"
      data-slot="command-group"
      className={cn("[&:not(:has([data-slot=command-item]))]:hidden not-first:mt-1", className)}
      {...props}
      aria-labelledby={props["aria-labelledby"] ?? (heading ? id : undefined)}
    >
      {heading && (
        <div id={id} data-slot="command-group-heading" className="px-2 pt-1.5 pb-1 text-ui-sm text-muted-foreground">
          {heading}
        </div>
      )}
      {children}
    </div>
  )
}

function CommandSeparator({ className, ...props }: React.ComponentProps<"div">) {
  const { search } = useCommand()
  if (search) return null
  return <div role="separator" data-slot="command-separator" className={cn("mx-2 my-1 h-px bg-border", className)} {...props} />
}

type CommandItemProps = Omit<React.ComponentProps<"div">, "onSelect"> & {
  /** Identity and search text. Defaults to the text content when that is a string. */
  value?: string
  /** Extra words that match this item. */
  keywords?: string[]
  disabled?: boolean
  onSelect?: (value: string) => void
}

function CommandItem({ value: valueProp, keywords, disabled, onSelect, className, children, onClick, ...props }: CommandItemProps) {
  const { search, filter, shouldFilter, active, setActive, listId } = useCommand()
  const value = valueProp ?? textOf(children)
  if (shouldFilter && search && filter(value, search, keywords) <= 0) return null
  const selected = active === value
  return (
    <div
      id={`${listId}-${encodeURIComponent(value)}`}
      role="option"
      aria-selected={selected}
      aria-disabled={disabled || undefined}
      data-slot="command-item"
      data-value={value}
      data-selected={selected || undefined}
      data-disabled={disabled || undefined}
      onPointerMove={() => !disabled && !selected && setActive(value)}
      onPointerDown={(e) => e.preventDefault()}
      onClick={(e) => {
        onClick?.(e)
        if (!disabled && !e.defaultPrevented) onSelect?.(value)
      }}
      className={cn(
        "relative flex min-h-8 cursor-default items-center gap-2 rounded-inner px-2 text-ui outline-none select-none data-selected:bg-secondary data-disabled:pointer-events-none data-disabled:opacity-64 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground data-selected:[&_svg:not([class*='text-'])]:text-foreground",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

function textOf(node: React.ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node)
  if (Array.isArray(node)) return node.map(textOf).filter(Boolean).join(" ").trim()
  if (React.isValidElement<{ children?: React.ReactNode; "data-slot"?: string }>(node)) {
    // Shortcuts are not part of the item's name.
    if (node.type === CommandShortcut) return ""
    return textOf(node.props.children)
  }
  return ""
}

function CommandShortcut({ className, ...props }: React.ComponentProps<"span">) {
  // design-check-ignore tracking -- shortcut glyphs are spaced wide (rule 11 allows it)
  return <span data-slot="command-shortcut" className={cn("ms-auto ps-4 text-ui-xs tracking-widest text-muted-foreground/72", className)} {...props} />
}

type CommandDialogProps = DialogPrimitive.Root.Props & {
  title?: string
  className?: string
  children?: React.ReactNode
  /** Props for the inner Command (filter, loop, search…). */
  commandProps?: Omit<CommandProps, "children">
}

/** The same Command in a centred dialog, for a ⌘K palette. Opening it focuses the input. */
function CommandDialog({ title = "Command palette", className, children, commandProps, ...props }: CommandDialogProps) {
  // Portaled popups leave the DOM subtree that sets `dir`; carry the provider direction over.
  const dir = useDirection() === "rtl" ? "rtl" : undefined
  return (
    <DialogPrimitive.Root {...props}>
      <DialogPrimitive.Portal dir={dir}>
        <DialogPrimitive.Backdrop
          data-slot="command-dialog-backdrop"
          className="fixed inset-0 z-50 bg-black/30 transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0"
        />
        <DialogPrimitive.Popup
          data-slot="command-dialog"
          className={cn(
            "fixed top-[14vh] left-1/2 z-50 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 overflow-hidden rounded-xl shadow-xl outline-none",
            "transition-[opacity,scale] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] data-ending-style:scale-98 data-ending-style:opacity-0 data-starting-style:scale-98 data-starting-style:opacity-0 motion-reduce:data-starting-style:scale-100",
            className
          )}
        >
          <DialogPrimitive.Title className="sr-only">{title}</DialogPrimitive.Title>
          <Command {...commandProps}>{children}</Command>
        </DialogPrimitive.Popup>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}

export {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
  defaultFilter,
  useCommand,
}
export type { CommandDialogProps, CommandItemProps, CommandProps }
