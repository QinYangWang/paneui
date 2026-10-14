"use client"

import * as React from "react"
import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible"
import { motion, useReducedMotion } from "motion/react"

import { ChevronDownIcon, FileIcon } from "@/components/icons"
import { cn } from "@/lib/utils"
import {
  CodeCopyButton,
  CodeLine,
  languageFromFilename,
  useCodeTokens,
} from "@/registry/base-nova/ui/agent-code-block"
import { CollapsiblePanel } from "@/registry/base-nova/ui/collapsible"
import { Loader } from "@/registry/base-nova/ui/loader"

type FileDiffLineType = "added" | "removed" | "context" | "hunk"

type FileDiffLine = {
  type: FileDiffLineType
  content: string
  oldLine?: number
  newLine?: number
}

/**
 * Parse a unified diff (`git diff` output, one file) into rows with old/new
 * line numbers. File headers (`diff --git`, `---`, `+++`, `index`) are dropped.
 */
function parseUnifiedDiff(diff: string): FileDiffLine[] {
  const rows: FileDiffLine[] = []
  let oldNo = 0
  let newNo = 0
  let inHunk = false
  for (const raw of diff.replace(/\r\n/g, "\n").split("\n")) {
    const hunk = /^@@ -(\d+)(?:,\d+)? \+(\d+)(?:,\d+)? @@(.*)$/.exec(raw)
    if (hunk) {
      oldNo = Number(hunk[1])
      newNo = Number(hunk[2])
      inHunk = true
      rows.push({ type: "hunk", content: raw })
      continue
    }
    if (!inHunk) continue
    if (raw.startsWith("\\")) continue // "\ No newline at end of file"
    const sign = raw[0]
    const content = raw.slice(1)
    if (sign === "+") rows.push({ type: "added", content, newLine: newNo++ })
    else if (sign === "-") rows.push({ type: "removed", content, oldLine: oldNo++ })
    else if (sign === " " || raw === "") rows.push({ type: "context", content, oldLine: oldNo++, newLine: newNo++ })
  }
  // A trailing empty context row comes from the diff's final newline.
  const last = rows[rows.length - 1]
  if (last && last.type === "context" && last.content === "" && diff.endsWith("\n")) rows.pop()
  return rows
}

/** Five-block GitHub-style ratio of additions to deletions. */
function DiffStat({ additions, deletions }: { additions: number; deletions: number }) {
  const total = additions + deletions
  const add = total === 0 ? 0 : Math.round((additions / total) * 5)
  const del = total === 0 ? 0 : Math.min(5 - add, Math.round((deletions / total) * 5))
  return (
    <span aria-hidden className="hidden gap-0.5 sm:flex">
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={cn(
            "size-1.5 rounded-[2px] transition-colors duration-300",
            i < add ? "bg-success" : i < add + del ? "bg-destructive" : "bg-muted shadow-well"
          )}
        />
      ))}
    </span>
  )
}

type FileDiffProps = Omit<React.ComponentProps<"div">, "children"> & {
  /** File path shown in the header. The directory part is dimmed. */
  filename: string
  /** Unified diff text. Ignored when `lines` is given. */
  diff?: string
  /** Pre-parsed rows, e.g. appended one by one while an agent streams. */
  lines?: FileDiffLine[]
  /** Shiki language id, inferred from `filename` when omitted. */
  language?: string
  /** `streaming` shows a spinner, animates new rows in and follows the end. */
  status?: "streaming" | "complete"
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  /** Fold the diff away when status flips from streaming to complete. */
  collapseOnComplete?: boolean
  /** Max height of the rows area in px. */
  maxHeight?: number
  showLineNumbers?: boolean
  copyable?: boolean
}

/**
 * Disclosure for one file change: header with path and live +/− counts,
 * expanding to syntax-highlighted unified diff rows with line numbers.
 */
function FileDiff({
  filename,
  diff = "",
  lines: linesProp,
  language,
  status = "complete",
  open: openProp,
  defaultOpen = true,
  onOpenChange,
  collapseOnComplete = false,
  maxHeight = 320,
  showLineNumbers = true,
  copyable = true,
  className,
  ...props
}: FileDiffProps) {
  const reduce = useReducedMotion() ?? false
  const rows = React.useMemo(() => linesProp ?? parseUnifiedDiff(diff), [linesProp, diff])
  const lang = language ?? languageFromFilename(filename)
  const streaming = status === "streaming"

  const [openState, setOpenState] = React.useState(defaultOpen)
  const open = openProp ?? openState
  const setOpen = React.useCallback(
    (next: boolean) => {
      if (openProp === undefined) setOpenState(next)
      onOpenChange?.(next)
    },
    [openProp, onOpenChange]
  )

  // Re-open when streaming starts, optionally fold away when it finishes.
  const prevStatus = React.useRef(status)
  React.useEffect(() => {
    if (prevStatus.current !== status) {
      if (status === "streaming") setOpen(true)
      else if (collapseOnComplete) setOpen(false)
    }
    prevStatus.current = status
  }, [status, collapseOnComplete, setOpen])

  // Highlight code rows as one document so multi-line constructs colour correctly.
  const codeRows = React.useMemo(() => rows.filter((r) => r.type !== "hunk"), [rows])
  const source = React.useMemo(() => codeRows.map((r) => r.content).join("\n"), [codeRows])
  const tokens = useCodeTokens(source, lang)

  const additions = codeRows.filter((r) => r.type === "added").length
  const deletions = codeRows.filter((r) => r.type === "removed").length

  // Rows present on first paint render still; later rows animate in.
  const initialCount = React.useRef(rows.length)

  const viewportRef = React.useRef<HTMLDivElement>(null)
  const pinned = React.useRef(true)
  React.useLayoutEffect(() => {
    const el = viewportRef.current
    if (!el || !streaming || !open || !pinned.current) return
    el.scrollTo({ top: el.scrollHeight, behavior: reduce ? "auto" : "smooth" })
  }, [rows.length, streaming, open, reduce])

  const slash = filename.lastIndexOf("/")
  const dir = slash >= 0 ? filename.slice(0, slash + 1) : ""
  const base = slash >= 0 ? filename.slice(slash + 1) : filename
  const gutter = Math.max(2, String(rows.reduce((m, r) => Math.max(m, r.oldLine ?? 0, r.newLine ?? 0), 0)).length)

  const newText = () =>
    codeRows
      .filter((r) => r.type !== "removed")
      .map((r) => r.content)
      .join("\n")

  let codeIndex = -1

  return (
    <CollapsiblePrimitive.Root
      open={open}
      onOpenChange={setOpen}
      render={<div />}
      data-slot="file-diff"
      data-status={status}
      aria-busy={streaming || undefined}
      className={cn("overflow-hidden rounded-xl bg-code text-ui shadow-raised", className)}
      {...props}
    >
      <div className="flex h-11 items-center gap-1 pr-1.5 pl-1.5">
        <CollapsiblePrimitive.Trigger
          data-slot="file-diff-trigger"
          className="group/trigger flex h-8 min-w-0 flex-1 cursor-pointer items-center gap-2 rounded-md px-2 text-left outline-none select-none hover:bg-muted/70 focus-visible:ring-2 focus-visible:ring-ring/50"
        >
          <ChevronDownIcon
            className={cn(
              "size-4 shrink-0 -rotate-90 text-muted-foreground transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-data-panel-open/trigger:rotate-0 motion-reduce:transition-none"
            )}
          />
          {streaming ? (
            <Loader size="sm" label="Writing changes" className="size-4 text-primary" />
          ) : (
            <FileIcon className="size-4 shrink-0 text-muted-foreground" />
          )}
          <span className="min-w-0 flex-1 truncate font-mono text-ui-sm">
            <span className="text-muted-foreground">{dir}</span>
            <span className="font-medium text-foreground">{base}</span>
          </span>
          <span className="flex shrink-0 items-center gap-1.5 font-mono text-ui-sm tabular-nums">
            {additions > 0 && <span className="text-success">+{additions}</span>}
            {deletions > 0 && <span className="text-destructive">−{deletions}</span>}
            <span className="sr-only">
              {additions} additions, {deletions} deletions
            </span>
            <DiffStat additions={additions} deletions={deletions} />
          </span>
        </CollapsiblePrimitive.Trigger>
        {copyable && <CodeCopyButton value={newText} label="Copy new file contents" />}
      </div>

      <CollapsiblePanel>
        <div
          ref={viewportRef}
          style={{ maxHeight }}
          onScroll={(e) => {
            const el = e.currentTarget
            pinned.current = el.scrollHeight - el.scrollTop - el.clientHeight < 24
          }}
          className="overflow-auto border-t border-border scrollbar-thin"
        >
          <div role="table" aria-label={`Changes to ${filename}`} className="w-max min-w-full py-1 font-mono leading-[1.65]">
            {rows.map((row, i) => {
              if (row.type !== "hunk") codeIndex++
              const animate = i >= initialCount.current && !reduce
              const Row = motion.div
              const motionProps = animate
                ? {
                    initial: { opacity: 0, x: -6, backgroundColor: "color-mix(in oklch, var(--primary) 14%, transparent)" },
                    animate: { opacity: 1, x: 0, backgroundColor: "color-mix(in oklch, var(--primary) 0%, transparent)" },
                    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
                  }
                : { initial: false as const }
              if (row.type === "hunk") {
                return (
                  <Row
                    key={i}
                    role="row"
                    data-type="hunk"
                    className="my-1 flex bg-primary/6 py-0.5 pr-4 text-muted-foreground first:mt-0"
                    {...motionProps}
                  >
                    <span role="cell" className="pl-3 whitespace-pre">
                      {row.content}
                    </span>
                  </Row>
                )
              }
              const added = row.type === "added"
              const removed = row.type === "removed"
              return (
                <Row
                  key={i}
                  role="row"
                  data-type={row.type}
                  className={cn("flex", added && "bg-success/10", removed && "bg-destructive/10")}
                  {...motionProps}
                >
                  {showLineNumbers && (
                    <span
                      role="cell"
                      aria-hidden
                      className={cn(
                        "sticky left-0 flex shrink-0 bg-code text-right text-muted-foreground/60 tabular-nums select-none",
                        added && "bg-[color-mix(in_oklch,var(--code),var(--success)_12%)] text-success/80",
                        removed && "bg-[color-mix(in_oklch,var(--code),var(--destructive)_12%)] text-destructive/80"
                      )}
                    >
                      <span style={{ width: `${gutter + 1.5}ch` }} className="pr-1.5">
                        {row.oldLine ?? ""}
                      </span>
                      <span style={{ width: `${gutter + 1.5}ch` }} className="pr-2">
                        {row.newLine ?? ""}
                      </span>
                    </span>
                  )}
                  <span
                    role="cell"
                    aria-label={added ? "added" : removed ? "removed" : undefined}
                    className={cn(
                      "w-6 shrink-0 text-center select-none",
                      added ? "text-success" : removed ? "text-destructive" : "text-transparent"
                    )}
                  >
                    {added ? "+" : removed ? "−" : " "}
                  </span>
                  <span role="cell" className="flex-1 pr-4 whitespace-pre">
                    <CodeLine text={row.content} tokens={tokens?.[codeIndex]} />
                    {row.content === "" && "\u200b"}
                  </span>
                </Row>
              )
            })}
            {streaming && (
              <div aria-hidden className="flex h-[1.65em] items-center pl-3">
                <span className="h-[1.1em] w-[0.5ch] animate-pulse rounded-[1px] bg-primary/80" />
              </div>
            )}
          </div>
        </div>
      </CollapsiblePanel>
    </CollapsiblePrimitive.Root>
  )
}

export { FileDiff, parseUnifiedDiff, type FileDiffProps, type FileDiffLine, type FileDiffLineType }
