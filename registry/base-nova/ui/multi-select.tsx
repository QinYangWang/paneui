"use client"

import * as React from "react"
import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"

import { CheckIcon, ChevronsUpDownIcon, XIcon } from "@/components/icons"
import { cn } from "@/lib/utils"
import {
  ComboboxCollection,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
} from "@/registry/base-nova/ui/combobox"

const MultiSelectAnchorContext = React.createContext<React.RefObject<HTMLDivElement | null> | null>(null)

const CHIP_SPRING = { type: "spring", stiffness: 520, damping: 34, mass: 0.6 } as const

type MultiSelectProps<Value> = Omit<ComboboxPrimitive.Root.Props<Value, true>, "multiple">

/** Combobox in multiple mode: picks stay open-ended and show as chips. */
function MultiSelect<Value>(props: MultiSelectProps<Value>) {
  const anchorRef = React.useRef<HTMLDivElement | null>(null)
  return (
    <MultiSelectAnchorContext.Provider value={anchorRef}>
      <ComboboxPrimitive.Root<Value, true> multiple {...props} />
    </MultiSelectAnchorContext.Provider>
  )
}

function defaultChipLabel(value: unknown): React.ReactNode {
  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>
    if ("label" in record) return String(record.label)
    if ("value" in record) return String(record.value)
  }
  return String(value)
}

function chipKey(value: unknown, index: number): React.Key {
  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>
    if ("value" in record) return String(record.value)
    if ("id" in record) return String(record.id)
    return index
  }
  return String(value)
}

/**
 * Inset well holding the chosen values as removable raised chips, with the
 * search input trailing them. Backspace in an empty input removes the last chip.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- chip values are the Combobox item type; callers annotate their own callbacks
type ChipValue = any

function MultiSelectTrigger({
  className,
  placeholder = "Select…",
  renderChip = defaultChipLabel,
  getKey = chipKey,
  ...props
}: Omit<ComboboxPrimitive.Chips.Props, "children"> & {
  placeholder?: string
  renderChip?: (value: ChipValue) => React.ReactNode
  getKey?: (value: ChipValue, index: number) => React.Key
}) {
  const anchorRef = React.useContext(MultiSelectAnchorContext)
  const reduce = useReducedMotion()

  return (
    <ComboboxPrimitive.Chips
      ref={anchorRef}
      data-slot="multi-select-trigger"
      className={cn(
        "relative flex min-h-9 w-full min-w-56 flex-wrap items-center gap-1 rounded-[1.125rem] bg-muted/60 py-1 pr-8 pl-1 shadow-well transition-[box-shadow,background-color] focus-within:bg-background focus-within:ring-3 focus-within:ring-ring",
        className
      )}
      {...props}
    >
      <ComboboxPrimitive.Value>
        {(selected: unknown[]) => (
          <>
            <AnimatePresence initial={false} mode="popLayout">
              {selected.map((value, index) => (
                <motion.div
                  key={getKey(value, index)}
                  layout={!reduce}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.6 }}
                  transition={reduce ? { duration: 0.12 } : CHIP_SPRING}
                  className="flex"
                >
                  <ComboboxPrimitive.Chip
                    data-slot="multi-select-chip"
                    className="flex h-7 max-w-48 items-center gap-1 rounded-full bg-secondary bg-linear-to-b from-white/6 to-transparent pr-1 pl-2.5 text-xs font-medium shadow-raised outline-none focus-visible:ring-3 focus-visible:ring-ring data-disabled:opacity-50"
                  >
                    <span className="truncate">{renderChip(value)}</span>
                    <ComboboxPrimitive.ChipRemove
                      aria-label="Remove"
                      className="flex size-5 shrink-0 cursor-pointer items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      <XIcon size={12} />
                    </ComboboxPrimitive.ChipRemove>
                  </ComboboxPrimitive.Chip>
                </motion.div>
              ))}
            </AnimatePresence>
            <ComboboxPrimitive.Input
              data-slot="multi-select-input"
              placeholder={selected.length ? undefined : placeholder}
              className="h-7 min-w-16 flex-1 bg-transparent px-2 text-base outline-none placeholder:text-muted-foreground md:text-sm"
            />
          </>
        )}
      </ComboboxPrimitive.Value>
      <ComboboxPrimitive.Trigger
        aria-label="Show options"
        className="absolute top-1.5 right-1.5 flex size-6 cursor-pointer items-center justify-center rounded-full text-muted-foreground transition-colors outline-none hover:bg-secondary hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring"
      >
        <ChevronsUpDownIcon size={16} />
      </ComboboxPrimitive.Trigger>
    </ComboboxPrimitive.Chips>
  )
}

function MultiSelectContent({
  className,
  children,
  side = "bottom",
  sideOffset = 6,
  align = "start",
  ...props
}: ComboboxPrimitive.Popup.Props & Pick<ComboboxPrimitive.Positioner.Props, "side" | "sideOffset" | "align">) {
  const anchorRef = React.useContext(MultiSelectAnchorContext)
  return (
    <ComboboxPrimitive.Portal>
      <ComboboxPrimitive.Positioner
        className="z-50 outline-none"
        side={side}
        sideOffset={sideOffset}
        align={align}
        anchor={anchorRef ?? undefined}
      >
        <ComboboxPrimitive.Popup
          data-slot="multi-select-content"
          className={cn(
            "relative flex max-h-[min(var(--available-height),22rem)] w-(--anchor-width) min-w-48 origin-(--transform-origin) flex-col overflow-hidden rounded-2xl bg-popover text-popover-foreground shadow-surface transition-[opacity,scale] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0",
            className
          )}
          {...props}
        >
          {children}
        </ComboboxPrimitive.Popup>
      </ComboboxPrimitive.Positioner>
    </ComboboxPrimitive.Portal>
  )
}

/** Option row with a checkbox-style tick that fills when the value is chosen. */
function MultiSelectItem({ className, children, ...props }: ComboboxPrimitive.Item.Props) {
  return (
    <ComboboxPrimitive.Item
      data-slot="multi-select-item"
      className={cn(
        "group/item relative flex h-8 cursor-default items-center gap-2.5 rounded-xl px-2.5 text-sm outline-none select-none transition-[background-color,box-shadow] duration-150 data-disabled:pointer-events-none data-disabled:opacity-50 data-highlighted:bg-secondary data-highlighted:shadow-raised",
        className
      )}
      {...props}
    >
      <span
        aria-hidden
        className="flex size-4 shrink-0 items-center justify-center rounded-[5px] bg-muted shadow-well transition-[background-color,box-shadow] duration-150 group-data-selected/item:bg-primary group-data-selected/item:shadow-primary"
      >
        <CheckIcon
          size={12}
          className="scale-50 text-primary-foreground opacity-0 transition-[opacity,scale] duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-data-selected/item:scale-100 group-data-selected/item:opacity-100"
        />
      </span>
      <span className="flex flex-1 items-center gap-2 truncate [&_svg]:size-4 [&_svg]:shrink-0">{children}</span>
    </ComboboxPrimitive.Item>
  )
}

const MultiSelectList = ComboboxList
const MultiSelectGroup = ComboboxGroup
const MultiSelectLabel = ComboboxLabel
const MultiSelectSeparator = ComboboxSeparator
const MultiSelectEmpty = ComboboxEmpty
const MultiSelectCollection = ComboboxCollection

export {
  MultiSelect,
  MultiSelectTrigger,
  MultiSelectContent,
  MultiSelectList,
  MultiSelectItem,
  MultiSelectGroup,
  MultiSelectLabel,
  MultiSelectSeparator,
  MultiSelectEmpty,
  MultiSelectCollection,
}
