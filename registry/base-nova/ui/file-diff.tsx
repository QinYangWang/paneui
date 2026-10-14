"use client"

import * as React from "react"
import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible"
import type { DiffLineAnnotation, FileDiffMetadata, LineDiffTypes } from "@pierre/diffs"
import type { FileDiffOptions as PierreFileDiffOptions } from "@pierre/diffs/react"
import { useReducedMotion } from "motion/react"

import { ChevronDownIcon, FileIcon } from "@/components/icons"
import { cn } from "@/lib/utils"
import { CodeCopyButton } from "@/registry/base-nova/ui/agent-code-block"
import { CollapsiblePanel } from "@/registry/base-nova/ui/collapsible"
import { Loader } from "@/registry/base-nova/ui/loader"

/* -------------------------------------------------------------------------- */
/*  Rows (our own unified-diff model, kept for streaming and the API)          */
/* -------------------------------------------------------------------------- */

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

/**
 * Turn rows back into a patch @pierre/diffs can parse. Hunk headers are
 * recounted from the rows that are actually there, so a half-streamed hunk
 * still parses cleanly.
 */
function rowsToPatch(rows: FileDiffLine[], filename: string) {
  const out = [`--- a/${filename}`, `+++ b/${filename}`]
  let i = 0
  while (i < rows.length) {
    let header = rows[i].type === "hunk" ? rows[i].content : "@@ -1 +1 @@"
    if (rows[i].type === "hunk") i++
    const body: FileDiffLine[] = []
    while (i < rows.length && rows[i].type !== "hunk") body.push(rows[i++])
    if (body.length === 0) continue
    const m = /^@@ -(\d+)(?:,\d+)? \+(\d+)(?:,\d+)? @@(.*)$/.exec(header)
    const first = body[0]
    const oldStart = m ? Number(m[1]) : (first.oldLine ?? 1)
    const newStart = m ? Number(m[2]) : (first.newLine ?? 1)
    const oldCount = body.filter((r) => r.type !== "added").length
    const newCount = body.filter((r) => r.type !== "removed").length
    header = `@@ -${oldStart},${oldCount} +${newStart},${newCount} @@${m?.[3] ?? ""}`
    out.push(header)
    for (const r of body) out.push((r.type === "added" ? "+" : r.type === "removed" ? "-" : " ") + r.content)
  }
  return out.join("\n") + "\n"
}

/* -------------------------------------------------------------------------- */
/*  Lazy @pierre/diffs (shiki + jsdiff stay out of the first bundle)          */
/* -------------------------------------------------------------------------- */

type PierreModules = {
  core: typeof import("@pierre/diffs")
  react: typeof import("@pierre/diffs/react")
}

let pierreModules: PierreModules | null = null
let pierrePromise: Promise<PierreModules> | null = null

function loadPierre() {
  pierrePromise ??= Promise.all([import("@pierre/diffs"), import("@pierre/diffs/react")]).then(([core, react]) => {
    pierreModules = { core, react }
    return pierreModules
  })
  return pierrePromise
}

/** The renderer modules, or `null` on the server and until the chunk loads. */
function usePierre() {
  const [mods, setMods] = React.useState<PierreModules | null>(pierreModules)
  React.useEffect(() => {
    if (mods) return
    let alive = true
    loadPierre().then((m) => alive && setMods(m))
    return () => {
      alive = false
    }
  }, [mods])
  return mods
}

/** Follow the docs/theme convention: dark mode is `html.dark`. */
function subscribeHtmlClass(onChange: () => void) {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
  return () => observer.disconnect()
}
function useHtmlDark() {
  return React.useSyncExternalStore(
    subscribeHtmlClass,
    () => document.documentElement.classList.contains("dark"),
    () => false
  )
}

const THEMES = { light: "github-light-default", dark: "github-dark-default" } as const

/* Theme tokens reach into the shadow root as inherited custom properties. */
const HOST_STYLE = {
  "--diffs-font-family": "var(--font-mono)",
  "--diffs-header-font-family": "var(--font-sans)",
  "--diffs-font-size": "12px",
  "--diffs-line-height": "1.65",
  "--diffs-tab-size": "2",
  "--diffs-addition-color-override": "var(--success)",
  "--diffs-deletion-color-override": "var(--destructive)",
  "--diffs-modified-color-override": "var(--primary)",
  "--diffs-gap-inline": "10px",
  "--diffs-gap-block": "4px",
} as React.CSSProperties

/* Paint the code surface with our `--code` token instead of the shiki theme bg. */
const UNSAFE_CSS = /* css */ `
:host, [data-diffs] { --diffs-light-bg: var(--code); --diffs-dark-bg: var(--code); }
pre { background-color: var(--code); }
[data-separator] { font-size: 11px; }
[data-separator=metadata] { height: 24px; font-family: var(--diffs-font-family); }
[data-separator=line-info-basic] { height: 26px; }
`

/*
 * While streaming, the renderer rebuilds its rows on every update, so the
 * last row of each column is always the newest one: flash it in.
 */
const STREAMING_CSS = /* css */ `
@keyframes file-diff-row-in {
  from { opacity: 0; translate: -6px 0; box-shadow: inset 100vw 0 color-mix(in oklch, var(--primary) 14%, transparent); }
}
[data-content] > [data-line]:last-child { animation: file-diff-row-in 0.45s cubic-bezier(0.22, 1, 0.36, 1); }
`

/* -------------------------------------------------------------------------- */
/*  Header pieces                                                             */
/* -------------------------------------------------------------------------- */

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
            "size-1.5 rounded-xs transition-colors duration-300",
            i < add ? "bg-success" : i < add + del ? "bg-destructive" : "bg-muted shadow-well"
          )}
        />
      ))}
    </span>
  )
}

type FileDiffStyle = "unified" | "split"

function DiffStyleToggle({ value, onChange }: { value: FileDiffStyle; onChange: (next: FileDiffStyle) => void }) {
  return (
    <div
      role="radiogroup"
      aria-label="Diff layout"
      data-slot="file-diff-style-toggle"
      className="frame-md frame-p-0.5 flex shrink-0 bg-secondary"
    >
      {(["unified", "split"] as const).map((style) => (
        <button
          key={style}
          type="button"
          role="radio"
          aria-checked={value === style}
          onClick={() => onChange(style)}
          className={cn(
            "h-6 cursor-pointer rounded-inner px-2 text-ui-xs font-medium text-muted-foreground capitalize transition-[background-color,color,box-shadow] duration-150 outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50",
            value === style && "bg-card text-foreground shadow-raised"
          )}
        >
          {style}
        </button>
      ))}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  FileDiff                                                                  */
/* -------------------------------------------------------------------------- */

type FileDiffProps<A = undefined> = Omit<React.ComponentProps<"div">, "children"> & {
  /** File path shown in the header. The directory part is dimmed. */
  filename: string
  /** Unified diff text. Ignored when `lines`, `fileDiff` or `oldFile`/`newFile` are given. */
  diff?: string
  /** Pre-parsed rows, e.g. appended one by one while an agent streams. */
  lines?: FileDiffLine[]
  /** Old file contents for a two-file diff (`null` = file added). Unchanged regions become expandable. */
  oldFile?: string | null
  /** New file contents for a two-file diff (`null` = file deleted). */
  newFile?: string | null
  /** Pre-built `@pierre/diffs` metadata, e.g. after `diffAcceptRejectHunk`. Wins over every other source. */
  fileDiff?: FileDiffMetadata
  /** Shiki language id, inferred from `filename` when omitted. */
  language?: string
  /** `streaming` shows a spinner and follows the end of the diff. */
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
  /** Controlled layout. */
  diffStyle?: FileDiffStyle
  defaultDiffStyle?: FileDiffStyle
  onDiffStyleChange?: (style: FileDiffStyle) => void
  /** Show the Unified / Split switch in the header. */
  diffStyleToggle?: boolean
  /** Word-level highlighting inside changed lines. `true` = `"word-alt"`. */
  inlineChanges?: boolean | Exclude<LineDiffTypes, "none">
  /** How changed lines are marked: `+`/`−` signs, a coloured bar, or background only. */
  indicators?: "classic" | "bars" | "none"
  /** Wrap long lines instead of scrolling sideways. */
  wrap?: boolean
  /** Rows of your own UI pinned under diff lines (comments, accept/reject…). */
  lineAnnotations?: DiffLineAnnotation<A>[]
  renderAnnotation?: (annotation: DiffLineAnnotation<A>) => React.ReactNode
  /** Extra `@pierre/diffs` options, merged over ours. */
  options?: Omit<PierreFileDiffOptions<A, undefined>, "diffStyle" | "themeType">
}

/**
 * Disclosure for one file change: header with path and live +/− counts,
 * expanding to a `@pierre/diffs` view (unified or split, syntax highlighted,
 * word-level changes). The renderer loads lazily on the client.
 */
function FileDiff<A = undefined>({
  filename,
  diff = "",
  lines: linesProp,
  oldFile,
  newFile,
  fileDiff: fileDiffProp,
  language,
  status = "complete",
  open: openProp,
  defaultOpen = true,
  onOpenChange,
  collapseOnComplete = false,
  maxHeight = 320,
  showLineNumbers = true,
  copyable = true,
  diffStyle: diffStyleProp,
  defaultDiffStyle = "unified",
  onDiffStyleChange,
  diffStyleToggle = false,
  inlineChanges = true,
  indicators = "bars",
  wrap = false,
  lineAnnotations,
  renderAnnotation,
  options: optionsProp,
  className,
  style,
  ...props
}: FileDiffProps<A>) {
  const reduce = useReducedMotion() ?? false
  const dark = useHtmlDark()
  const pierre = usePierre()
  const streaming = status === "streaming"
  const twoFile = oldFile !== undefined || newFile !== undefined

  const [openState, setOpenState] = React.useState(defaultOpen)
  const open = openProp ?? openState
  const setOpen = React.useCallback(
    (next: boolean) => {
      if (openProp === undefined) setOpenState(next)
      onOpenChange?.(next)
    },
    [openProp, onOpenChange]
  )

  const [styleState, setStyleState] = React.useState<FileDiffStyle>(defaultDiffStyle)
  const diffStyle = diffStyleProp ?? styleState
  const setDiffStyle = (next: FileDiffStyle) => {
    if (diffStyleProp === undefined) setStyleState(next)
    onDiffStyleChange?.(next)
  }

  // Re-open when streaming starts, optionally fold away when it finishes.
  const prevStatus = React.useRef(status)
  React.useEffect(() => {
    if (prevStatus.current !== status) {
      if (status === "streaming") setOpen(true)
      else if (collapseOnComplete) setOpen(false)
    }
    prevStatus.current = status
  }, [status, collapseOnComplete, setOpen])

  // Our rows exist for text diffs only; they give counts and a fallback view before the renderer loads.
  const rows = React.useMemo(
    () => (fileDiffProp || twoFile ? null : (linesProp ?? parseUnifiedDiff(diff))),
    [fileDiffProp, twoFile, linesProp, diff]
  )

  const metadata = React.useMemo<FileDiffMetadata | null>(() => {
    if (!pierre) return null
    const { core } = pierre
    let meta: FileDiffMetadata | undefined
    if (fileDiffProp) meta = fileDiffProp
    else if (twoFile)
      meta = core.parseDiffFromFile(
        oldFile == null ? null : { name: filename, contents: oldFile },
        newFile == null ? null : { name: filename, contents: newFile }
      )
    else if (rows && rows.some((r) => r.type !== "hunk")) meta = core.processFile(rowsToPatch(rows, filename))
    if (!meta) return null
    meta = { ...meta, name: filename }
    return language ? core.setLanguageOverride(meta, language) : meta
  }, [pierre, fileDiffProp, twoFile, oldFile, newFile, rows, filename, language])

  let additions = 0
  let deletions = 0
  if (rows) {
    for (const r of rows) {
      if (r.type === "added") additions++
      else if (r.type === "removed") deletions++
    }
  } else if (metadata) {
    for (const h of metadata.hunks) {
      additions += h.additionLines
      deletions += h.deletionLines
    }
  }

  const newText = () => {
    if (rows)
      return rows
        .filter((r) => r.type === "added" || r.type === "context")
        .map((r) => r.content)
        .join("\n")
    if (twoFile && !fileDiffProp) return newFile ?? ""
    return (metadata?.additionLines ?? []).join("")
  }

  const options = React.useMemo<PierreFileDiffOptions<A, undefined>>(
    () => ({
      theme: THEMES,
      themeType: dark ? "dark" : "light",
      diffStyle,
      diffIndicators: indicators,
      lineDiffType: inlineChanges === false ? "none" : inlineChanges === true ? "word-alt" : inlineChanges,
      disableLineNumbers: !showLineNumbers,
      overflow: wrap ? "wrap" : "scroll",
      disableFileHeader: true,
      hunkSeparators: twoFile ? "line-info-basic" : "metadata",
      unsafeCSS: streaming && !reduce ? UNSAFE_CSS + STREAMING_CSS : UNSAFE_CSS,
      ...optionsProp,
    }),
    [dark, diffStyle, indicators, inlineChanges, showLineNumbers, wrap, twoFile, streaming, reduce, optionsProp]
  )

  const viewportRef = React.useRef<HTMLDivElement>(null)
  const pinned = React.useRef(true)
  const rowCount = rows?.length ?? 0
  React.useLayoutEffect(() => {
    const el = viewportRef.current
    if (!el || !streaming || !open || !pinned.current) return
    el.scrollTo({ top: el.scrollHeight, behavior: reduce ? "auto" : "smooth" })
  }, [rowCount, streaming, open, reduce, metadata])

  const slash = filename.lastIndexOf("/")
  const dir = slash >= 0 ? filename.slice(0, slash + 1) : ""
  const base = slash >= 0 ? filename.slice(slash + 1) : filename
  const PierreFileDiff = pierre?.react.FileDiff

  return (
    <CollapsiblePrimitive.Root
      open={open}
      onOpenChange={setOpen}
      render={<div />}
      data-slot="file-diff"
      data-status={status}
      data-diff-style={diffStyle}
      aria-busy={streaming || undefined}
      className={cn("overflow-hidden rounded-xl bg-code text-ui shadow-raised", className)}
      style={style}
      {...props}
    >
      <div className="flex h-10 items-center gap-1 pr-1.5 pl-1.5">
        <CollapsiblePrimitive.Trigger
          data-slot="file-diff-trigger"
          className="group/trigger flex h-7 min-w-0 flex-1 cursor-pointer items-center gap-2 rounded-lg px-2 text-left outline-none select-none hover:bg-secondary focus-visible:ring-2 focus-visible:ring-ring/50"
        >
          <ChevronDownIcon className="size-4 shrink-0 -rotate-90 text-muted-foreground transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-data-panel-open/trigger:rotate-0 motion-reduce:transition-none" />
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
        {diffStyleToggle && <DiffStyleToggle value={diffStyle} onChange={setDiffStyle} />}
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
          role="region"
          aria-label={`Changes to ${filename}`}
          className="overflow-auto border-t border-border scrollbar-thin"
        >
          {PierreFileDiff && metadata ? (
            <PierreFileDiff
              fileDiff={metadata}
              options={options}
              lineAnnotations={lineAnnotations}
              renderAnnotation={renderAnnotation}
              style={HOST_STYLE}
              className="block"
            />
          ) : (
            <PlainRows rows={rows} text={twoFile ? (newFile ?? oldFile ?? "") : undefined} />
          )}
          {streaming && (
            <div aria-hidden className="flex h-[1.65em] items-center pl-3 font-mono text-ui-sm">
              <span className="h-[1.1em] w-[0.5ch] animate-pulse rounded-[1px] bg-primary/80" />
            </div>
          )}
        </div>
      </CollapsiblePanel>
    </CollapsiblePrimitive.Root>
  )
}

/** Unhighlighted stand-in shown during SSR / static export and while the renderer chunk loads. */
function PlainRows({ rows, text }: { rows: FileDiffLine[] | null; text?: string }) {
  const lines: FileDiffLine[] = rows ?? (text ?? "").split("\n").map((content) => ({ type: "context" as const, content }))
  return (
    <pre data-slot="file-diff-fallback" className="m-0 py-1 font-mono text-ui-sm leading-[1.65] text-muted-foreground">
      {lines.map((r, i) => (
        <div
          key={i}
          className={cn(
            "pr-4 pl-3 whitespace-pre",
            r.type === "added" && "bg-success/10",
            r.type === "removed" && "bg-destructive/10",
            r.type === "hunk" && "bg-secondary"
          )}
        >
          {r.content || "\u200b"}
        </div>
      ))}
    </pre>
  )
}

export {
  FileDiff,
  parseUnifiedDiff,
  type FileDiffProps,
  type FileDiffLine,
  type FileDiffLineType,
  type FileDiffStyle,
  type FileDiffMetadata,
  type DiffLineAnnotation,
}
