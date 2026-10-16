"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * A keyboard-navigable list that does not take focus: the highlight is driven by a
 * value and `aria-activedescendant`, so focus can stay in an editor or input while
 * arrow keys move the highlight (slash menus, mention pickers, autocomplete).
 * Forward key events through the ref handle (`ref.current.onKeyDown(event)` returns
 * true when it handled the key), or focus the list itself and it handles them.
 */
type MenuListHandle = {
  /** Handles ArrowUp/ArrowDown/Home/End/Enter/Tab. Returns true when the key was used. */
  onKeyDown: (event: KeyboardEvent | React.KeyboardEvent) => boolean
  /** Moves the highlight by `delta` enabled items. */
  move: (delta: number) => void
  /** Activates the highlighted item (same as clicking it). Returns false when nothing is highlighted. */
  select: () => boolean
}

type MenuListContextValue = {
  id: string
  active: string | undefined
  setActive: (value: string) => void
}

const MenuListContext = React.createContext<MenuListContextValue | null>(null)

function useMenuListContext() {
  const ctx = React.useContext(MenuListContext)
  if (!ctx) throw new Error("MenuList parts must be used inside <MenuList>")
  return ctx
}

const menuListVariants = cva("flex flex-col outline-none", {
  variants: {
    variant: {
      popup:
        "frame-xl frame-p-1 max-h-80 overflow-y-auto overscroll-contain bg-popover text-popover-foreground shadow-surface",
      plain: "",
    },
  },
  defaultVariants: { variant: "popup" },
})

function itemsOf(root: HTMLElement | null) {
  if (!root) return []
  return Array.from(root.querySelectorAll<HTMLElement>('[data-slot="menu-list-item"]:not([data-disabled])'))
}

type MenuListProps = Omit<React.ComponentProps<"div">, "ref"> &
  VariantProps<typeof menuListVariants> & {
    ref?: React.Ref<MenuListHandle>
    /** Highlighted item value (controlled). */
    activeValue?: string
    defaultActiveValue?: string
    onActiveValueChange?: (value: string) => void
    /** Wrap from the last item to the first. Default true. */
    loop?: boolean
  }

function MenuList({
  ref,
  className,
  variant,
  activeValue,
  defaultActiveValue,
  onActiveValueChange,
  loop = true,
  children,
  onKeyDown,
  ...props
}: MenuListProps) {
  const id = React.useId()
  const rootRef = React.useRef<HTMLDivElement>(null)
  const [uncontrolled, setUncontrolled] = React.useState(defaultActiveValue)
  const active = activeValue ?? uncontrolled

  const setActive = React.useCallback(
    (value: string) => {
      setUncontrolled(value)
      onActiveValueChange?.(value)
    },
    [onActiveValueChange]
  )

  // Keep a highlight on an item that exists (first one when the list changes under it).
  React.useLayoutEffect(() => {
    const items = itemsOf(rootRef.current)
    if (items.length === 0) return
    if (!items.some((el) => el.dataset.value === active)) setActive(items[0].dataset.value ?? "")
  })

  React.useEffect(() => {
    const el = rootRef.current?.querySelector<HTMLElement>('[data-slot="menu-list-item"][data-highlighted]')
    el?.scrollIntoView({ block: "nearest" })
  }, [active])

  const move = React.useCallback(
    (delta: number) => {
      const items = itemsOf(rootRef.current)
      if (items.length === 0) return
      const i = items.findIndex((el) => el.dataset.value === active)
      let next = i + delta
      if (i === -1) next = delta > 0 ? 0 : items.length - 1
      else if (loop) next = (next + items.length) % items.length
      else next = Math.max(0, Math.min(items.length - 1, next))
      setActive(items[next].dataset.value ?? "")
    },
    [active, loop, setActive]
  )

  const select = React.useCallback(() => {
    const el = itemsOf(rootRef.current).find((item) => item.dataset.value === active)
    if (!el) return false
    el.click()
    return true
  }, [active])

  const handleKey = React.useCallback(
    (event: KeyboardEvent | React.KeyboardEvent) => {
      const items = itemsOf(rootRef.current)
      switch (event.key) {
        case "ArrowDown":
          move(1)
          return true
        case "ArrowUp":
          move(-1)
          return true
        case "Home":
          if (items[0]) setActive(items[0].dataset.value ?? "")
          return items.length > 0
        case "End":
          if (items.length) setActive(items[items.length - 1].dataset.value ?? "")
          return items.length > 0
        case "Enter":
        case "Tab":
          return select()
        default:
          return false
      }
    },
    [move, select, setActive]
  )

  React.useImperativeHandle(ref, () => ({ onKeyDown: handleKey, move, select }), [handleKey, move, select])

  const ctx = React.useMemo(() => ({ id, active, setActive }), [id, active, setActive])

  return (
    <MenuListContext.Provider value={ctx}>
      <div
        ref={rootRef}
        role="listbox"
        data-slot="menu-list"
        aria-activedescendant={active ? `${id}-${active}` : undefined}
        className={cn(menuListVariants({ variant }), className)}
        onKeyDown={(event) => {
          onKeyDown?.(event)
          if (!event.defaultPrevented && handleKey(event)) event.preventDefault()
        }}
        {...props}
      >
        {children}
      </div>
    </MenuListContext.Provider>
  )
}

function MenuListGroup({ className, ...props }: React.ComponentProps<"div">) {
  return <div role="group" data-slot="menu-list-group" className={cn("flex flex-col", className)} {...props} />
}

function MenuListLabel({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="menu-list-label"
      className={cn("px-2 pt-1.5 pb-1 text-ui-xs font-medium text-muted-foreground", className)}
      {...props}
    />
  )
}

type MenuListItemProps = Omit<React.ComponentProps<"div">, "onSelect"> & {
  /** Unique value, used for the highlight. */
  value: string
  onSelect?: () => void
  disabled?: boolean
}

function MenuListItem({ className, value, onSelect, disabled, onClick, onMouseMove, ...props }: MenuListItemProps) {
  const { id, active, setActive } = useMenuListContext()
  const highlighted = active === value
  return (
    <div
      id={`${id}-${value}`}
      role="option"
      aria-selected={highlighted}
      aria-disabled={disabled || undefined}
      data-slot="menu-list-item"
      data-value={value}
      data-highlighted={highlighted ? "" : undefined}
      data-disabled={disabled ? "" : undefined}
      // Keep focus where it is (the editor): a pointer press must not blur it.
      onMouseDown={(e) => e.preventDefault()}
      onMouseMove={(e) => {
        onMouseMove?.(e)
        if (!highlighted && !disabled) setActive(value)
      }}
      onClick={(e) => {
        onClick?.(e)
        if (!disabled && !e.defaultPrevented) onSelect?.()
      }}
      className={cn(
        "relative flex min-h-6.5 cursor-default items-center gap-2 rounded-inner px-2 py-px text-ui outline-none select-none transition-colors duration-150 data-disabled:pointer-events-none data-disabled:opacity-64 data-highlighted:bg-secondary [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-muted-foreground data-highlighted:[&_svg]:text-foreground",
        className
      )}
      {...props}
    />
  )
}

function MenuListItemText({
  className,
  title,
  description,
  ...props
}: Omit<React.ComponentProps<"span">, "title"> & { title: React.ReactNode; description?: React.ReactNode }) {
  return (
    <span data-slot="menu-list-item-text" className={cn("flex min-w-0 flex-1 flex-col py-1", className)} {...props}>
      <span className="truncate">{title}</span>
      {description && <span className="truncate text-ui-xs text-muted-foreground">{description}</span>}
    </span>
  )
}

function MenuListShortcut({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="menu-list-shortcut"
      // design-check-ignore tracking -- shortcut glyphs are spaced wide (rule 11 allows it)
      className={cn("ml-auto pl-4 font-sans text-ui-xs tracking-widest text-muted-foreground/72", className)}
      {...props}
    />
  )
}

function MenuListSeparator({ className, ...props }: React.ComponentProps<"div">) {
  return <div role="separator" data-slot="menu-list-separator" className={cn("mx-2 my-1 h-px shrink-0 bg-border", className)} {...props} />
}

function MenuListEmpty({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="menu-list-empty" className={cn("px-2 py-3 text-center text-ui text-muted-foreground", className)} {...props} />
  )
}

export {
  MenuList,
  MenuListGroup,
  MenuListLabel,
  MenuListItem,
  MenuListItemText,
  MenuListShortcut,
  MenuListSeparator,
  MenuListEmpty,
  menuListVariants,
}
export type { MenuListHandle, MenuListProps, MenuListItemProps }
