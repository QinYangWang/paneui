"use client"

import * as React from "react"

import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon } from "@/components/icons"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/base-nova/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/base-nova/ui/select"
import { useLocale } from "@/registry/base-nova/ui/locale-provider"

/*
 * Page controls for a list or table.
 *
 *   <Pagination page={page} pageCount={12} onPageChange={setPage} />
 *
 * Shows prev / next and a window of page numbers with ellipses
 * (1 … 4 5 6 … 12). Compose the parts yourself for a different layout:
 * PaginationSummary ("21–30 of 248") and PaginationPageSize (rows per page).
 *
 * `size` steps the buttons along the Button scale: sm uses 24px buttons, default 28px
 * (the toolbar size), lg 32px.
 */

type PaginationSize = "sm" | "default" | "lg"

const paginationSizes = {
  sm: { button: "icon-xs", gap: "size-6", trigger: "xs" },
  default: { button: "icon-sm", gap: "size-7", trigger: "sm" },
  lg: { button: "icon", gap: "size-8", trigger: "default" },
} as const satisfies Record<PaginationSize, { button: string; gap: string; trigger: string }>

/** Page numbers to show: first, last, `siblings` around the current page, "…" for gaps. */
function getPageRange(page: number, pageCount: number, siblings = 1): (number | "ellipsis")[] {
  const total = siblings * 2 + 5
  if (pageCount <= total) return Array.from({ length: pageCount }, (_, i) => i + 1)
  const left = Math.max(page - siblings, 2)
  const right = Math.min(page + siblings, pageCount - 1)
  const showLeft = left > 3
  const showRight = right < pageCount - 2
  if (!showLeft) {
    const count = 3 + siblings * 2
    return [...Array.from({ length: count }, (_, i) => i + 1), "ellipsis", pageCount]
  }
  if (!showRight) {
    const count = 3 + siblings * 2
    return [1, "ellipsis", ...Array.from({ length: count }, (_, i) => pageCount - count + i + 1)]
  }
  return [1, "ellipsis", ...Array.from({ length: right - left + 1 }, (_, i) => left + i), "ellipsis", pageCount]
}

type PaginationProps = Omit<React.ComponentProps<"nav">, "children"> & {
  /** 1-based current page. */
  page: number
  pageCount: number
  onPageChange: (page: number) => void
  /** Pages either side of the current one. Default 1. */
  siblings?: number
  /** Hide the number buttons (prev / next and "Page 2 of 9" only), e.g. on phones. */
  compact?: boolean
  size?: PaginationSize
}

function Pagination({ page, pageCount, onPageChange, siblings = 1, compact = false, size = "default", className, ...props }: PaginationProps) {
  const { labels } = useLocale()
  const dims = paginationSizes[size]
  const count = Math.max(1, pageCount)
  const current = Math.min(Math.max(1, page), count)
  const go = (p: number) => onPageChange(Math.min(Math.max(1, p), count))
  return (
    <nav data-slot="pagination" data-size={size} aria-label={labels.pagination} className={cn("flex items-center gap-1", className)} {...props}>
      <Button variant="ghost" size={dims.button} aria-label={labels.previousPage} disabled={current <= 1} onClick={() => go(current - 1)}>
        <ChevronLeftIcon className="rtl:rotate-180" />
      </Button>
      {compact ? (
        <span className={cn("px-2 text-muted-foreground tabular-nums", size === "sm" ? "text-ui-xs" : "text-ui")} aria-live="polite">
          {labels.pageOf(current, count)}
        </span>
      ) : (
        <ul className="flex items-center gap-0.5">
          {getPageRange(current, count, siblings).map((p, i) =>
            p === "ellipsis" ? (
              <li key={`e${i}`} aria-hidden className={cn("grid place-items-center text-muted-foreground [&_svg]:size-3.5", dims.gap)}>
                <MoreHorizontalIcon />
              </li>
            ) : (
              <li key={p}>
                <Button
                  variant="ghost"
                  size={dims.button}
                  aria-label={labels.page(p)}
                  aria-current={p === current ? "page" : undefined}
                  onClick={() => go(p)}
                  // The current page reads as selected: the row-active fill from the sidebar.
                  className={cn(
                    "w-auto tabular-nums aria-[current=page]:bg-foreground/6",
                    size === "sm" ? "min-w-6 px-1 text-ui-xs" : size === "lg" ? "min-w-8 px-2 text-ui" : "min-w-7 px-1.5 text-ui"
                  )}
                >
                  {p}
                </Button>
              </li>
            )
          )}
        </ul>
      )}
      <Button variant="ghost" size={dims.button} aria-label={labels.nextPage} disabled={current >= count} onClick={() => go(current + 1)}>
        <ChevronRightIcon className="rtl:rotate-180" />
      </Button>
    </nav>
  )
}

/** "21–30 of 248 results". */
function PaginationSummary({
  page,
  pageSize,
  total,
  noun = "results",
  className,
  ...props
}: Omit<React.ComponentProps<"p">, "children"> & { page: number; pageSize: number; total: number; noun?: string }) {
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1
  const to = Math.min(total, page * pageSize)
  const nf = new Intl.NumberFormat("en-US")
  return (
    <p data-slot="pagination-summary" className={cn("text-ui text-muted-foreground tabular-nums", className)} {...props}>
      {total === 0 ? `No ${noun}` : `${nf.format(from)}–${nf.format(to)} of ${nf.format(total)} ${noun}`}
    </p>
  )
}

/** Rows-per-page select. */
function PaginationPageSize({
  value,
  onValueChange,
  options = [10, 20, 50],
  label: labelProp,
  size = "default",
  className,
}: {
  value: number
  onValueChange: (size: number) => void
  options?: number[]
  label?: string
  /** Matches Pagination's `size`. */
  size?: PaginationSize
  className?: string
}) {
  const { labels } = useLocale()
  const label = labelProp ?? labels.rowsPerPage
  const id = React.useId()
  return (
    <div
      data-slot="pagination-page-size"
      data-size={size}
      className={cn("flex items-center gap-2 text-muted-foreground", size === "sm" ? "text-ui-xs" : "text-ui", className)}
    >
      <span id={id} className="whitespace-nowrap">
        {label}
      </span>
      <Select value={value} onValueChange={(v) => v != null && onValueChange(Number(v))}>
        <SelectTrigger size={paginationSizes[size].trigger} aria-labelledby={id} className="w-18 min-w-0">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((o) => (
            <SelectItem key={o} value={o}>
              {o}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export { Pagination, PaginationSummary, PaginationPageSize, getPageRange }
export type { PaginationProps, PaginationSize }
