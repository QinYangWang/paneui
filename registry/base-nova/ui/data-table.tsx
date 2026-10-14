"use client"

import * as React from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"

import { FilterIcon, MoreHorizontalIcon, SearchIcon, SlidersIcon, XIcon } from "@/components/icons"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/base-nova/ui/button"
import {
  EmptyState,
  EmptyStateActions,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateTitle,
} from "@/registry/base-nova/ui/empty-state"
import { Input } from "@/registry/base-nova/ui/input"
import { Menu, MenuCheckboxItem, MenuContent, MenuGroup, MenuItem, MenuLabel, MenuSeparator, MenuTrigger } from "@/registry/base-nova/ui/menu"
import { Pagination, PaginationPageSize, PaginationSummary } from "@/registry/base-nova/ui/pagination"
import { Table, type SortState, type TableColumn, type TableRowContext } from "@/registry/base-nova/ui/table"

/*
 * A table with the toolbar and footer most admin pages need, on top of <Table>:
 * search, faceted filters, column visibility, sorting, row selection with bulk
 * actions, pagination and empty / no-results states.
 *
 *   <DataTable
 *     data={customers}
 *     columns={columns}
 *     getRowId={(c) => c.id}
 *     filters={[{ key: "status", label: "Status", options: [{ value: "active", label: "Active" }] }]}
 *     selectable
 *     bulkActions={(rows, clear) => <Button size="sm" onClick={clear}>Export {rows.length}</Button>}
 *     onRowClick={({ row }) => open(row)}
 *   />
 *
 * Everything runs client-side on `data` (filter → search → sort → page). For
 * server data, page and filter on the server and render <Table> directly.
 */

type DataTableColumn<T> = TableColumn<T> & {
  /** Name in the column menu when `header` is not a string. */
  label?: string
  /** Show in the column visibility menu. Default true for columns with a label or string header. */
  hideable?: boolean
}

type DataTableFilterOption = { value: string; label: string; icon?: React.ReactNode }

type DataTableFilter<T> = {
  /** Column key (or any id) — the row value is read with `accessor` or `row[key]`. */
  key: string
  label: string
  options: readonly DataTableFilterOption[]
  accessor?: (row: T) => string | readonly string[]
}

type DataTableProps<T> = {
  data: readonly T[]
  columns: readonly DataTableColumn<T>[]
  getRowId: (row: T, index: number) => string
  "aria-label"?: string
  /** Text the search box matches against. Default: every string / number field of the row. `false` hides search. */
  searchText?: ((row: T) => string) | false
  searchPlaceholder?: string
  filters?: readonly DataTableFilter<T>[]
  defaultSort?: SortState
  defaultHiddenColumns?: readonly string[]
  defaultPageSize?: number
  pageSizeOptions?: number[]
  selectable?: boolean
  selectedRowIds?: readonly string[]
  onSelectionChange?: (ids: string[]) => void
  /** Shown in a bar above the table while rows are selected. */
  bulkActions?: (rows: T[], clear: () => void) => React.ReactNode
  /** Extra controls at the end of the toolbar (export, add). */
  toolbar?: React.ReactNode
  /** Shown when `data` itself is empty. Filtered-to-nothing gets a built-in "No results". */
  emptyState?: React.ReactNode
  /** Noun for the footer ("customers"). Default "rows". */
  noun?: string
  rowHeight?: number
  onRowClick?: (ctx: TableRowContext<T>, event: React.MouseEvent<HTMLDivElement>) => void
  rowClassName?: (ctx: TableRowContext<T>) => string | undefined
  className?: string
}

const HEADER = 40
const EMPTY_HEIGHT = 280

function defaultSearchText(row: unknown) {
  if (!row || typeof row !== "object") return String(row ?? "")
  return Object.values(row as Record<string, unknown>)
    .filter((v) => typeof v === "string" || typeof v === "number")
    .join(" ")
}

function readFilterValue<T>(row: T, filter: DataTableFilter<T>): readonly string[] {
  const v = filter.accessor ? filter.accessor(row) : (row as Record<string, unknown>)[filter.key]
  if (Array.isArray(v)) return v.map(String)
  return v == null ? [] : [String(v)]
}

function DataTable<T>({
  data,
  columns,
  getRowId,
  "aria-label": ariaLabel,
  searchText,
  searchPlaceholder = "Search…",
  filters = [],
  defaultSort = null,
  defaultHiddenColumns = [],
  defaultPageSize = 10,
  pageSizeOptions = [10, 20, 50],
  selectable = false,
  selectedRowIds,
  onSelectionChange,
  bulkActions,
  toolbar,
  emptyState,
  noun = "rows",
  rowHeight = 48,
  onRowClick,
  rowClassName,
  className,
}: DataTableProps<T>) {
  const reduce = useReducedMotion()
  const [query, setQuery] = React.useState("")
  const [active, setActive] = React.useState<Record<string, string[]>>({})
  const [sort, setSort] = React.useState<SortState>(defaultSort)
  const [hidden, setHidden] = React.useState<string[]>(() => [...defaultHiddenColumns])
  const [page, setPage] = React.useState(1)
  const [pageSize, setPageSize] = React.useState(defaultPageSize)
  const [innerSelected, setInnerSelected] = React.useState<string[]>([])
  const selected = React.useMemo(() => (selectedRowIds ? [...selectedRowIds] : innerSelected), [selectedRowIds, innerSelected])
  const setSelected = (ids: string[]) => {
    if (!selectedRowIds) setInnerSelected(ids)
    onSelectionChange?.(ids)
  }

  /* pipeline: filter → search → sort → page -------------------------------- */
  const ids = React.useMemo(() => data.map((r, i) => getRowId(r, i)), [data, getRowId])
  const idOf = React.useMemo(() => {
    const m = new Map<T, string>()
    data.forEach((r, i) => m.set(r, ids[i]))
    return (r: T) => m.get(r) ?? ""
  }, [data, ids])
  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    const text = searchText === false ? null : (searchText ?? defaultSearchText)
    return data.filter((row) => {
      for (const f of filters) {
        const want = active[f.key]
        if (want?.length && !readFilterValue(row, f).some((v) => want.includes(v))) return false
      }
      if (q && text && !text(row).toLowerCase().includes(q)) return false
      return true
    })
  }, [data, filters, active, query, searchText])

  const sorted = React.useMemo(() => {
    if (!sort) return filtered
    const col = columns.find((c) => c.key === sort.key)
    if (!col) return filtered
    const read = col.sortValue ?? col.accessor ?? ((r: T) => (r as Record<string, unknown>)[col.key])
    const dir = sort.direction === "asc" ? 1 : -1
    const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: "base" })
    return [...filtered].sort((a, b) => {
      const x = read(a) as unknown
      const y = read(b) as unknown
      if (x == null || y == null) return x == null ? (y == null ? 0 : 1) : -1
      if (typeof x === "number" && typeof y === "number") return (x - y) * dir
      if (x instanceof Date && y instanceof Date) return (x.getTime() - y.getTime()) * dir
      return collator.compare(String(x), String(y)) * dir
    })
  }, [filtered, sort, columns])

  const pageCount = Math.max(1, Math.ceil(sorted.length / pageSize))
  const current = Math.min(page, pageCount)
  const pageRows = React.useMemo(() => sorted.slice((current - 1) * pageSize, current * pageSize), [sorted, current, pageSize])

  const visibleColumns = React.useMemo(() => columns.filter((c) => !hidden.includes(c.key)), [columns, hidden])
  const hideableColumns = columns.filter((c) => c.hideable ?? (!!c.label || typeof c.header === "string"))
  const filtering = query.trim() !== "" || Object.values(active).some((v) => v.length > 0)

  const resetFilters = () => {
    setQuery("")
    setActive({})
    setPage(1)
  }

  /* selection keeps rows on other pages ------------------------------------ */
  const pageIds = React.useMemo(() => new Set(pageRows.map(idOf)), [pageRows, idOf])
  const onTableSelection = (next: string[]) => setSelected([...selected.filter((id) => !pageIds.has(id)), ...next])
  const selectedRows = React.useMemo(() => {
    const set = new Set(selected)
    return data.filter((_, i) => set.has(ids[i]))
  }, [data, ids, selected])

  const isEmpty = data.length === 0
  const height = HEADER + (pageRows.length ? pageRows.length * rowHeight : EMPTY_HEIGHT)

  const empty = isEmpty
    ? (emptyState ?? (
        <EmptyState size="sm">
          <EmptyStateTitle>No {noun} yet</EmptyStateTitle>
        </EmptyState>
      ))
    : (
        <EmptyState size="sm">
          <EmptyStateIcon>
            <SearchIcon />
          </EmptyStateIcon>
          <EmptyStateTitle>No matching {noun}</EmptyStateTitle>
          <EmptyStateDescription>Try a different search or remove a filter.</EmptyStateDescription>
          <EmptyStateActions>
            <Button variant="secondary" size="sm" onClick={resetFilters}>
              Clear filters
            </Button>
          </EmptyStateActions>
        </EmptyState>
      )

  return (
    <div data-slot="data-table" className={cn("flex min-w-0 flex-col gap-3", className)}>
      {/* Toolbar ------------------------------------------------------------ */}
      <div data-slot="data-table-toolbar" className="flex flex-wrap items-center gap-2">
        {searchText !== false && (
          <div className="relative w-full sm:w-64">
            <SearchIcon aria-hidden className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setPage(1)
              }}
              placeholder={searchPlaceholder}
              aria-label={searchPlaceholder.replace(/…$/, "")}
              className="pl-8"
            />
          </div>
        )}
        {filters.map((f) => (
          <DataTableFacet
            key={f.key}
            filter={f}
            data={data}
            value={active[f.key] ?? []}
            onValueChange={(v) => {
              setActive((a) => ({ ...a, [f.key]: v }))
              setPage(1)
            }}
          />
        ))}
        {filtering && (
          <Button variant="ghost" size="sm" onClick={resetFilters}>
            Reset
            <XIcon data-icon="inline-end" />
          </Button>
        )}
        <div className="ml-auto flex items-center gap-2">
          {toolbar}
          {hideableColumns.length > 0 && (
            <Menu>
              <MenuTrigger render={<Button variant="outline" size="sm" />}>
                <SlidersIcon data-icon="inline-start" />
                View
              </MenuTrigger>
              <MenuContent align="end" className="w-48">
                <MenuGroup>
                  <MenuLabel>Columns</MenuLabel>
                  {hideableColumns.map((c) => (
                    <MenuCheckboxItem
                      key={c.key}
                      checked={!hidden.includes(c.key)}
                      onCheckedChange={(on) => setHidden((h) => (on ? h.filter((k) => k !== c.key) : [...h, c.key]))}
                      // keep the menu open while toggling several columns
                      closeOnClick={false}
                    >
                      {c.label ?? (typeof c.header === "string" ? c.header : c.key)}
                    </MenuCheckboxItem>
                  ))}
                </MenuGroup>
              </MenuContent>
            </Menu>
          )}
        </div>
      </div>

      {/* Selection bar ------------------------------------------------------ */}
      <AnimatePresence initial={false}>
        {selectable && selected.length > 0 && (
          <motion.div
            key="bulk"
            data-slot="data-table-selection"
            initial={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ type: "spring", stiffness: 460, damping: 40, mass: 0.6 }}
            className="overflow-hidden"
          >
            <div className="flex min-h-10 flex-wrap items-center gap-2 rounded-xl bg-primary/8 px-3 py-1.5 text-ui">
              <span className="font-medium tabular-nums">{selected.length} selected</span>
              <Button variant="ghost" size="xs" onClick={() => setSelected([])}>
                Clear
              </Button>
              <div className="ml-auto flex flex-wrap items-center gap-2">{bulkActions?.(selectedRows, () => setSelected([]))}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Table -------------------------------------------------------------- */}
      <Table
        aria-label={ariaLabel}
        data={pageRows}
        columns={visibleColumns}
        getRowId={idOf}
        sort={sort}
        onSortChange={(s) => {
          setSort(s)
          setPage(1)
        }}
        selectable={selectable}
        selectedRowIds={selectable ? selected.filter((id) => pageIds.has(id)) : undefined}
        onSelectionChange={selectable ? onTableSelection : undefined}
        rowHeight={rowHeight}
        headerHeight={HEADER}
        height={height}
        emptyState={empty}
        onRowClick={onRowClick}
        rowClassName={rowClassName}
      />

      {/* Footer ------------------------------------------------------------- */}
      {!isEmpty && (
        <div data-slot="data-table-footer" className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 px-1">
          <PaginationSummary page={current} pageSize={pageSize} total={sorted.length} noun={noun} />
          <div className="flex flex-wrap items-center gap-4">
            <PaginationPageSize
              value={pageSize}
              options={pageSizeOptions}
              onValueChange={(s) => {
                setPageSize(s)
                setPage(1)
              }}
              className="max-sm:hidden"
            />
            <Pagination page={current} pageCount={pageCount} onPageChange={setPage} />
          </div>
        </div>
      )}
    </div>
  )
}

/** Multi-select filter button with counts per option. */
function DataTableFacet<T>({
  filter,
  data,
  value,
  onValueChange,
}: {
  filter: DataTableFilter<T>
  data: readonly T[]
  value: string[]
  onValueChange: (value: string[]) => void
}) {
  const counts = React.useMemo(() => {
    const m = new Map<string, number>()
    for (const row of data) for (const v of readFilterValue(row, filter)) m.set(v, (m.get(v) ?? 0) + 1)
    return m
  }, [data, filter])
  return (
    <Menu>
      <MenuTrigger
        render={<Button variant="outline" size="sm" />}
        aria-label={value.length ? `${filter.label}: ${value.length} selected` : `Filter by ${filter.label}`}
      >
        <FilterIcon data-icon="inline-start" />
        {filter.label}
        {value.length > 0 && (
          <span className="-mr-0.5 rounded-full bg-primary/14 px-1.5 text-ui-xs leading-4.5 font-medium text-primary tabular-nums">
            {value.length}
          </span>
        )}
      </MenuTrigger>
      <MenuContent className="w-52">
        <MenuGroup>
          <MenuLabel>{filter.label}</MenuLabel>
          {filter.options.map((o) => (
            <MenuCheckboxItem
              key={o.value}
              checked={value.includes(o.value)}
              closeOnClick={false}
              onCheckedChange={(on) => onValueChange(on ? [...value, o.value] : value.filter((v) => v !== o.value))}
            >
              {o.icon}
              <span className="flex-1 truncate">{o.label}</span>
              <span className="text-ui-xs text-muted-foreground tabular-nums">{counts.get(o.value) ?? 0}</span>
            </MenuCheckboxItem>
          ))}
        </MenuGroup>
        {value.length > 0 && (
          <>
            <MenuSeparator />
            <MenuItem onClick={() => onValueChange([])}>Clear filter</MenuItem>
          </>
        )}
      </MenuContent>
    </Menu>
  )
}

/** "⋯" menu for a row's actions. Put `MenuItem`s inside; clicks don't reach `onRowClick`. */
function DataTableRowActions({ label = "Row actions", children }: { label?: string; children: React.ReactNode }) {
  return (
    // only stops the row's click handler; the button inside is the control
    <div className="flex justify-end" onClick={(e) => e.stopPropagation()}>
      <Menu>
        <MenuTrigger render={<Button variant="ghost" size="icon-xs" aria-label={label} />}>
          <MoreHorizontalIcon />
        </MenuTrigger>
        <MenuContent align="end" className="w-44">
          {children}
        </MenuContent>
      </Menu>
    </div>
  )
}

export { DataTable, DataTableRowActions }
export type { DataTableColumn, DataTableFilter, DataTableFilterOption, DataTableProps }
