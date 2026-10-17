"use client"

import * as React from "react"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"
import {
  ChartDataTable,
  ChartLegend,
  ChartLegendItem,
  ChartTooltip,
  ChartTooltipRow,
  ChartTooltipTitle,
  chartAlpha,
  chartColor,
  formatNumber,
  formatPercent,
  onFill,
  useActiveId,
  useChartId,
  useChartSize,
  useChartTransition,
} from "@/registry/base-nova/ui/chart-utils"

type TreemapNode = {
  id: string
  label: string
  /** Leaf value. Ignored when `children` is given (the group sums its children). */
  value?: number
  children?: TreemapNode[]
  /** Overrides the palette colour (groups pass theirs down to children). */
  color?: string
  description?: string
}

type TreemapTile = {
  id: string
  label: string
  value: number
  /** Share of the whole chart. */
  share: number
  /** Share of the parent group (equals `share` for top-level leaves). */
  groupShare: number
  group?: { id: string; label: string }
  color: string
  description?: string
  x: number
  y: number
  width: number
  height: number
}

type Rect = { x: number; y: number; w: number; h: number }

/** Squarified treemap (Bruls, Huizing, van Wijk): keeps tiles close to square. */
function squarify(values: readonly number[], rect: Rect): Rect[] {
  const out: Rect[] = new Array(values.length)
  const total = values.reduce((a, b) => a + b, 0)
  if (total <= 0 || rect.w <= 0 || rect.h <= 0) {
    values.forEach((_, i) => (out[i] = { x: rect.x, y: rect.y, w: 0, h: 0 }))
    return out
  }
  const scale = (rect.w * rect.h) / total
  const order = values
    .map((v, i) => ({ i, a: Math.max(0, v) * scale }))
    .sort((a, b) => b.a - a.a)

  let { x, y, w, h } = rect
  let row: { i: number; a: number }[] = []

  const worst = (r: { a: number }[], side: number) => {
    let s = 0
    let max = 0
    let min = Infinity
    for (const { a } of r) {
      s += a
      if (a > max) max = a
      if (a < min) min = a
    }
    if (s === 0 || min === 0) return Infinity
    const s2 = s * s
    const side2 = side * side
    return Math.max((side2 * max) / s2, s2 / (side2 * min))
  }

  const flush = () => {
    const s = row.reduce((acc, r) => acc + r.a, 0)
    if (w >= h) {
      const colW = h > 0 ? s / h : 0
      let cy = y
      for (const r of row) {
        const rh = colW > 0 ? r.a / colW : 0
        out[r.i] = { x, y: cy, w: colW, h: rh }
        cy += rh
      }
      x += colW
      w -= colW
    } else {
      const rowH = w > 0 ? s / w : 0
      let cx = x
      for (const r of row) {
        const rw = rowH > 0 ? r.a / rowH : 0
        out[r.i] = { x: cx, y, w: rw, h: rowH }
        cx += rw
      }
      y += rowH
      h -= rowH
    }
    row = []
  }

  let k = 0
  while (k < order.length) {
    const item = order[k]
    const side = Math.min(w, h)
    if (row.length === 0 || worst([...row, item], side) <= worst(row, side)) {
      row.push(item)
      k++
    } else flush()
  }
  if (row.length) flush()
  return out
}

function nodeValue(node: TreemapNode): number {
  if (node.children?.length) return node.children.reduce((a, c) => a + nodeValue(c), 0)
  return Number.isFinite(node.value) ? Math.max(0, node.value as number) : 0
}

function layoutTiles(
  data: readonly TreemapNode[],
  width: number,
  height: number,
  gap: number,
  groupPadding: number
): TreemapTile[] {
  const total = data.reduce((a, n) => a + nodeValue(n), 0) || 1
  const tiles: TreemapTile[] = []
  const tops = squarify(
    data.map(nodeValue),
    { x: 0, y: 0, w: width, h: height }
  )
  data.forEach((node, i) => {
    const r = tops[i]
    const color = node.color ?? chartColor(i)
    const v = nodeValue(node)
    if (node.children?.length) {
      const inner = {
        x: r.x + groupPadding,
        y: r.y + groupPadding,
        w: Math.max(0, r.w - groupPadding * 2),
        h: Math.max(0, r.h - groupPadding * 2),
      }
      const kids = squarify(node.children.map(nodeValue), inner)
      node.children.forEach((child, j) => {
        const kr = kids[j]
        const cv = nodeValue(child)
        // Children shade slightly darker than the group colour so siblings separate.
        const mix = 100 - (j % 4) * 9
        tiles.push({
          id: child.id,
          label: child.label,
          value: cv,
          share: cv / total,
          groupShare: v ? cv / v : 0,
          group: { id: node.id, label: node.label },
          color: child.color ?? `color-mix(in oklch, ${color} ${mix}%, black)`,
          description: child.description,
          x: kr.x + gap / 2,
          y: kr.y + gap / 2,
          width: Math.max(0, kr.w - gap),
          height: Math.max(0, kr.h - gap),
        })
      })
    } else {
      tiles.push({
        id: node.id,
        label: node.label,
        value: v,
        share: v / total,
        groupShare: v / total,
        color,
        description: node.description,
        x: r.x + gap / 2,
        y: r.y + gap / 2,
        width: Math.max(0, r.w - gap),
        height: Math.max(0, r.h - gap),
      })
    }
  })
  return tiles
}

type TreemapProps = Omit<React.ComponentProps<"section">, "children"> & {
  data: readonly TreemapNode[]
  /** Accessible name for the chart. */
  label?: string
  height?: number
  formatValue?: (value: number) => string
  /** Space between tiles in px. */
  gap?: number
  /** Inset of child tiles inside a group, in px. */
  groupPadding?: number
  radius?: number
  showLegend?: boolean
  activeId?: string | null
  defaultActiveId?: string | null
  onActiveChange?: (id: string | null) => void
}

function Treemap({
  data,
  label = "Treemap",
  height = 320,
  formatValue = formatNumber,
  gap = 3,
  groupPadding = 3,
  radius = 10,
  showLegend = true,
  activeId: activeIdProp,
  defaultActiveId,
  onActiveChange,
  className,
  ...props
}: TreemapProps) {
  const [ref, size] = useChartSize<HTMLDivElement>()
  const [activeId, setActiveId] = useActiveId(activeIdProp, defaultActiveId, onActiveChange)
  const [legendGroup, setLegendGroup] = React.useState<string | null>(null)
  const [pointer, setPointer] = React.useState<{ x: number; y: number } | null>(null)
  const transition = useChartTransition()
  const clipBase = useChartId("treemap-clip")

  const width = size.width
  const tiles = React.useMemo(
    () => (width > 0 ? layoutTiles(data, width, height, gap, groupPadding) : []),
    [data, width, height, gap, groupPadding]
  )
  const total = React.useMemo(() => data.reduce((a, n) => a + nodeValue(n), 0), [data])
  const active = tiles.find((t) => t.id === activeId) ?? null
  const focusGroup = legendGroup ?? active?.group?.id ?? null

  const isDim = (t: TreemapTile) => {
    if (legendGroup) return (t.group?.id ?? t.id) !== legendGroup
    if (active) return t.id !== active.id
    return false
  }

  const anchor = pointer ?? (active ? { x: active.x + active.width / 2, y: active.y } : { x: 0, y: 0 })

  const onKeyDown = (e: React.KeyboardEvent, index: number) => {
    const keys = ["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp", "Home", "End"]
    if (!keys.includes(e.key)) return
    e.preventDefault()
    let next = index
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (index + 1) % tiles.length
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (index - 1 + tiles.length) % tiles.length
    if (e.key === "Home") next = 0
    if (e.key === "End") next = tiles.length - 1
    const svg = (e.currentTarget as SVGElement).ownerSVGElement
    svg?.querySelector<SVGGElement>(`[data-index="${next}"]`)?.focus()
  }

  return (
    <section
      data-slot="treemap"
      className={cn("w-full min-w-0 space-y-4", className)}
      {...props}
      aria-label={props["aria-label"] ?? label}
    >
      <div
        ref={ref}
        className="relative w-full overflow-visible"
        style={{ height }}
        onPointerLeave={() => {
          setPointer(null)
          setActiveId(null)
        }}
      >
        {width > 0 && (
          <svg
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            className="block overflow-visible"
            role="group"
            aria-label={`${label}: ${tiles.length} items`}
          >
            <defs>
              {tiles.map((t) => (
                <clipPath key={t.id} id={`${clipBase}-${t.id}`}>
                  <motion.rect
                    initial={false}
                    animate={{ x: t.x, y: t.y, width: t.width, height: t.height }}
                    transition={transition}
                    rx={Math.min(radius, t.width / 2, t.height / 2)}
                  />
                </clipPath>
              ))}
            </defs>
            {tiles.map((t, i) => {
              const dim = isDim(t)
              const showLabel = t.width > 56 && t.height > 34
              const showValue = t.width > 64 && t.height > 52
              const r = Math.min(radius, t.width / 2, t.height / 2)
              return (
                <g
                  key={t.id}
                  data-index={i}
                  tabIndex={0}
                  role="img"
                  aria-label={`${t.group ? `${t.group.label} / ` : ""}${t.label}: ${formatValue(t.value)}, ${formatPercent(t.share)} of total`}
                  className="cursor-default outline-none [&:focus-visible>rect:last-of-type]:stroke-ring"
                  onPointerMove={(e) => {
                    const box = ref.current?.getBoundingClientRect()
                    if (box) setPointer({ x: e.clientX - box.left, y: e.clientY - box.top })
                    if (activeId !== t.id) setActiveId(t.id)
                  }}
                  onFocus={() => {
                    setPointer(null)
                    setActiveId(t.id)
                  }}
                  onBlur={() => setActiveId(null)}
                  onKeyDown={(e) => onKeyDown(e, i)}
                >
                  <motion.rect
                    initial={{ opacity: 0, x: t.x, y: t.y, width: t.width, height: t.height }}
                    animate={{
                      opacity: dim ? 0.35 : 1,
                      x: t.x,
                      y: t.y,
                      width: t.width,
                      height: t.height,
                    }}
                    transition={transition}
                    rx={r}
                    style={{ fill: t.color }}
                  />
                  {/* top highlight + hairline to keep the skeuomorphic chip feel */}
                  <motion.rect
                    initial={false}
                    animate={{ x: t.x, y: t.y, width: t.width, height: t.height }}
                    transition={transition}
                    rx={r}
                    className="pointer-events-none"
                    style={{ fill: "transparent" }}
                    stroke={chartAlpha("var(--foreground)", activeId === t.id ? 28 : 8)}
                    strokeWidth={activeId === t.id ? 1.5 : 1}
                  />
                  <g clipPath={`url(#${clipBase}-${t.id})`} className="pointer-events-none">
                    <motion.text
                      initial={false}
                      animate={{ x: t.x + 10, y: t.y + 20, opacity: showLabel ? (dim ? 0.5 : 1) : 0 }}
                      transition={transition}
                      className="fill-white text-ui-sm font-medium"
                      style={{ fill: onFill(t.color) }}
                    >
                      {t.label}
                    </motion.text>
                    <motion.text
                      initial={false}
                      animate={{ x: t.x + 10, y: t.y + 36, opacity: showValue ? (dim ? 0.4 : 0.85) : 0 }}
                      transition={transition}
                      className="fill-white text-ui-xs tabular-nums"
                      style={{ fill: onFill(t.color) }}
                    >
                      {formatPercent(t.share)}
                    </motion.text>
                  </g>
                </g>
              )
            })}
          </svg>
        )}

        <ChartTooltip open={!!active && !legendGroup} x={anchor.x} y={anchor.y} bounds={{ width, height }}>
          {active && (
            <>
              <ChartTooltipTitle>
                {active.group && (
                  <span className="font-normal text-muted-foreground">{active.group.label} / </span>
                )}
                {active.label}
              </ChartTooltipTitle>
              <ChartTooltipRow color={active.color} label="Value" value={formatValue(active.value)} />
              <ChartTooltipRow label="Share of total" value={formatPercent(active.share)} />
              {active.group && (
                <ChartTooltipRow
                  label={`Share of ${active.group.label}`}
                  value={formatPercent(active.groupShare)}
                />
              )}
              {active.description && (
                <p className="mt-1.5 text-muted-foreground">{active.description}</p>
              )}
            </>
          )}
        </ChartTooltip>
      </div>

      {showLegend && (
        <ChartLegend aria-label={`${label} legend`}>
          {data.map((node, i) => {
            const v = nodeValue(node)
            return (
              <ChartLegendItem
                key={node.id}
                color={node.color ?? chartColor(i)}
                highlighted={focusGroup === node.id || activeId === node.id}
                value={formatPercent(total ? v / total : 0, 0)}
                onPointerEnter={() => setLegendGroup(node.id)}
                onPointerLeave={() => setLegendGroup(null)}
                onFocus={() => setLegendGroup(node.id)}
                onBlur={() => setLegendGroup(null)}
              >
                {node.label}
              </ChartLegendItem>
            )
          })}
        </ChartLegend>
      )}

      <ChartDataTable
        caption={`${label} data`}
        columns={["Item", "Value", "Share of total"]}
        rows={tiles.map((t) => [
          t.group ? `${t.group.label} / ${t.label}` : t.label,
          formatValue(t.value),
          formatPercent(t.share),
        ])}
      />
    </section>
  )
}

export { Treemap, squarify, type TreemapProps, type TreemapNode, type TreemapTile }
