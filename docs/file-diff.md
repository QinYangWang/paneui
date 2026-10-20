# File Diff

> Shows one file's changes as a diff, even while streaming.

Page: https://paneui.dev/docs/file-diff/

## Installation

```bash
npx shadcn@latest add @paneui/file-diff
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/file-diff.json
```

Packages: `@base-ui/react`, `@pierre/diffs`, `motion`.

Registry items it builds on: `@paneui/theme`, `@paneui/icons`, `@paneui/agent-code-block`, `@paneui/collapsible`, `@paneui/loader`.

## Usage

```tsx
import { FileDiff } from "@/components/ui/file-diff"
```

```tsx
<FileDiff filename="lib/slots.ts" diff={diff} />
```

## Examples

### Split View

```tsx
import { FileDiff } from "@/registry/base-nova/ui/file-diff"

const DIFF = `@@ -1,9 +1,10 @@
 export function formatPrice(cents: number, currency = "USD") {
-  const amount = cents / 100
-  return "$" + amount.toFixed(2)
+  return new Intl.NumberFormat("en-US", {
+    style: "currency",
+    currency,
+  }).format(cents / 100)
 }
 
 export function formatNights(n: number) {
-  return n + " nights"
+  return n === 1 ? "1 night" : \`\${n} nights\`
 }
`

export default function FileDiffSplit() {
  return (
    <FileDiff
      filename="lib/format.ts"
      diff={DIFF}
      defaultDiffStyle="split"
      diffStyleToggle
      inlineChanges="word"
      className="w-full max-w-3xl"
    />
  )
}
```

### Two Files

```tsx
import { FileDiff } from "@/registry/base-nova/ui/file-diff"

const BEFORE = `import { z } from "zod"

export const tripSchema = z.object({
  id: z.string(),
  city: z.string(),
  country: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  travellers: z.number().int().min(1),
  budget: z.number().optional(),
  notes: z.string().optional(),
  tags: z.array(z.string()).default([]),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export type Trip = z.infer<typeof tripSchema>

export function nights(trip: Pick<Trip, "startDate" | "endDate">) {
  const ms = new Date(trip.endDate).getTime() - new Date(trip.startDate).getTime()
  return Math.round(ms / 86_400_000)
}

export function isUpcoming(trip: Trip, now = new Date()) {
  return new Date(trip.startDate) > now
}

export function byStartDate(a: Trip, b: Trip) {
  return new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
}

export const emptyTrip = { travellers: 1, tags: [] }
`

const AFTER = `import { z } from "zod"

export const tripSchema = z.object({
  id: z.string().uuid(),
  city: z.string(),
  country: z.string().length(2),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  travellers: z.number().int().min(1),
  budget: z.number().optional(),
  notes: z.string().optional(),
  tags: z.array(z.string()).default([]),
  createdAt: z.string(),
  updatedAt: z.string(),
  archived: z.boolean().default(false),
})

export type Trip = z.infer<typeof tripSchema>

export function nights(trip: Pick<Trip, "startDate" | "endDate">) {
  const ms = new Date(trip.endDate).getTime() - new Date(trip.startDate).getTime()
  return Math.round(ms / 86_400_000)
}

export function isUpcoming(trip: Trip, now = new Date()) {
  return new Date(trip.startDate) > now
}

export function byStartDate(a: Trip, b: Trip) {
  return new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
}

export const emptyTrip = { travellers: 1, tags: [], archived: false }
`

export default function FileDiffTwoFiles() {
  return <FileDiff filename="lib/schema/trip.ts" oldFile={BEFORE} newFile={AFTER} maxHeight={420} className="w-full max-w-xl" />
}
```

### Accept or Reject Changes

```tsx
"use client"

import * as React from "react"
import { diffAcceptRejectHunk, parseDiffFromFile, type DiffLineAnnotation, type FileDiffMetadata } from "@pierre/diffs"

import { Button } from "@/registry/base-nova/ui/button"
import { FileDiff } from "@/registry/base-nova/ui/file-diff"

const BEFORE = `export const limits = {
  maxGuests: 8,
  holdSeconds: 120,
  currency: "USD",
}

export function canBook(guests: number) {
  return guests <= limits.maxGuests
}
`

const AFTER = `export const limits = {
  maxGuests: 10,
  holdSeconds: 300,
  currency: "USD",
}

export function canBook(guests: number, waitlist = false) {
  return waitlist || guests <= limits.maxGuests
}
`

type ChangeNote = { hunk: number; change: number }

/** One annotation under the last line of every unresolved change block. */
function changeAnnotations(diff: FileDiffMetadata): DiffLineAnnotation<ChangeNote>[] {
  const notes: DiffLineAnnotation<ChangeNote>[] = []
  diff.hunks.forEach((h, hunk) => {
    h.hunkContent.forEach((c, change) => {
      if (c.type !== "change") return
      if (c.additions > 0) {
        const lineNumber = h.additionStart + (c.additionLineIndex - h.additionLineIndex) + c.additions - 1
        notes.push({ side: "additions", lineNumber, metadata: { hunk, change } })
      } else {
        const lineNumber = h.deletionStart + (c.deletionLineIndex - h.deletionLineIndex) + c.deletions - 1
        notes.push({ side: "deletions", lineNumber, metadata: { hunk, change } })
      }
    })
  })
  return notes
}

export default function FileDiffAcceptReject() {
  const initial = React.useMemo(
    () => parseDiffFromFile({ name: "lib/limits.ts", contents: BEFORE }, { name: "lib/limits.ts", contents: AFTER }),
    []
  )
  const [diff, setDiff] = React.useState(initial)
  const annotations = React.useMemo(() => changeAnnotations(diff), [diff])

  return (
    <div className="flex w-full max-w-xl flex-col gap-3">
      <FileDiff
        filename="lib/limits.ts"
        fileDiff={diff}
        lineAnnotations={annotations}
        renderAnnotation={(a) => (
          <div className="flex justify-end gap-1.5 px-2 py-1.5 font-sans">
            <Button size="xs" variant="ghost" onClick={() => setDiff((d) => diffAcceptRejectHunk(d, a.metadata.hunk, { type: "reject", changeIndex: a.metadata.change }))}>
              Reject
            </Button>
            <Button size="xs" onClick={() => setDiff((d) => diffAcceptRejectHunk(d, a.metadata.hunk, { type: "accept", changeIndex: a.metadata.change }))}>
              Accept
            </Button>
          </div>
        )}
      />
      <Button size="sm" variant="secondary" className="self-end" onClick={() => setDiff(initial)} disabled={diff === initial}>
        Reset
      </Button>
    </div>
  )
}
```

### Collapse on Complete

```tsx
"use client"

import * as React from "react"

import { Button } from "@/registry/base-nova/ui/button"
import { FileDiff, parseUnifiedDiff, type FileDiffLine } from "@/registry/base-nova/ui/file-diff"

const ALL = parseUnifiedDiff(`@@ -1,4 +1,5 @@
 export const config = {
-  retries: 2,
+  retries: 3,
+  backoffMs: 500,
   timeoutMs: 10_000,
 }
`)

export default function FileDiffCollapseOnComplete() {
  const [lines, setLines] = React.useState<FileDiffLine[]>(ALL)
  const [streaming, setStreaming] = React.useState(false)
  const timer = React.useRef<number | undefined>(undefined)

  React.useEffect(() => () => window.clearInterval(timer.current), [])

  const run = () => {
    let i = 0
    setLines([])
    setStreaming(true)
    timer.current = window.setInterval(() => {
      i += 1
      setLines(ALL.slice(0, i))
      if (i >= ALL.length) {
        window.clearInterval(timer.current)
        setStreaming(false)
      }
    }, 220)
  }

  return (
    <div className="flex w-full max-w-xl flex-col gap-3">
      <FileDiff filename="lib/http/config.ts" lines={lines} status={streaming ? "streaming" : "complete"} collapseOnComplete />
      <Button size="sm" variant="secondary" className="self-end" onClick={run} disabled={streaming}>
        {streaming ? "Applying…" : "Apply edit"}
      </Button>
    </div>
  )
}
```

### Controlled

```tsx
"use client"

import * as React from "react"

import { Button } from "@/registry/base-nova/ui/button"
import { FileDiff } from "@/registry/base-nova/ui/file-diff"

const FILES = [
  { filename: "app/layout.tsx", diff: '@@ -3,3 +3,3 @@\n export const metadata = {\n-  title: "Trips",\n+  title: "Trips · Planner",\n }\n' },
  { filename: "styles/globals.css", diff: "@@ -10,2 +10,3 @@\n body {\n+  text-rendering: optimizeLegibility;\n }\n" },
]

export default function FileDiffControlled() {
  const [open, setOpen] = React.useState<Record<string, boolean>>({})
  const allOpen = FILES.every((f) => open[f.filename])
  return (
    <div className="flex w-full max-w-xl flex-col gap-3">
      <Button
        size="sm"
        variant="secondary"
        className="self-end"
        onClick={() => setOpen(Object.fromEntries(FILES.map((f) => [f.filename, !allOpen])))}
      >
        {allOpen ? "Collapse all" : "Expand all"}
      </Button>
      {FILES.map((f) => (
        <FileDiff
          key={f.filename}
          filename={f.filename}
          diff={f.diff}
          open={open[f.filename] ?? false}
          onOpenChange={(next) => setOpen((o) => ({ ...o, [f.filename]: next }))}
        />
      ))}
    </div>
  )
}
```

### Without Line Numbers or Copy

```tsx
import { FileDiff } from "@/registry/base-nova/ui/file-diff"

const DIFF = `@@ -1,6 +1,6 @@
 # Packing list
 - Passport
-- One adapter
+- Two adapters
 - Rain jacket
 - Walking shoes
 - Camera charger
`

export default function FileDiffPlain() {
  return <FileDiff filename="notes/packing.md" diff={DIFF} showLineNumbers={false} copyable={false} maxHeight={160} className="w-full max-w-xl" />
}
```

### Pre-parsed Lines

```tsx
import { FileDiff, type FileDiffLine } from "@/registry/base-nova/ui/file-diff"

const LINES: FileDiffLine[] = [
  { type: "hunk", content: "@@ -1,3 +1,4 @@" },
  { type: "context", content: "FROM node:22-alpine", oldLine: 1, newLine: 1 },
  { type: "context", content: "WORKDIR /app", oldLine: 2, newLine: 2 },
  { type: "removed", content: "RUN npm install", oldLine: 3 },
  { type: "added", content: "RUN corepack enable", newLine: 3 },
  { type: "added", content: "RUN pnpm install --frozen-lockfile", newLine: 4 },
]

export default function FileDiffPreParsed() {
  return <FileDiff filename="Dockerfile" language="docker" lines={LINES} className="w-full max-w-xl" />
}
```

## Renderer

The bundled diff renderer draws the rows inside a shadow root, themed with this library's tokens (`--code` surface, 12px `font-mono`, `success` / `destructive` for changes); light and dark syntax colours follow the `html.dark` class. It loads on demand in the browser (about 200 KB gzipped, with grammars per language). During static export and until it arrives, plain unhighlighted rows show.

## Motion

While `status` is `streaming`, the newest row slides in with a primary flash and the view follows the end. Under reduced motion rows appear without movement and the chevron stops rotating.

## Accessibility

The header is a collapsible trigger and reads out "N additions, N deletions". The rows sit in a region labelled "Changes to {filename}"; the Unified / Split switch is a radio group.

## API Reference

Built on [the Collapsible primitive](https://base-ui.com/react/components/collapsible#api-reference). Only the props this library adds or changes are listed; everything else passes through.

### FileDiff

Disclosure for one file change with live +/− counts, rendering a unified or split diff. Also accepts every prop of [Collapsible.Root](https://base-ui.com/react/components/collapsible#root).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `filename` (required) | `string` | — | File path in the header; the directory part is dimmed. Also infers the language. |
| `diff` | `string` | `""` | Unified diff text for one file. Ignored when `lines`, `oldFile`/`newFile` or `fileDiff` are given. |
| `lines` | `FileDiffLine[]` | — | Pre-parsed rows, e.g. appended one by one while an agent streams. |
| `oldFile` | `string \| null` | — | Old contents for a two-file diff (`null` when the file is new). Unchanged regions become expandable. |
| `newFile` | `string \| null` | — | New contents for a two-file diff (`null` when the file was deleted). |
| `fileDiff` | `FileDiffMetadata` | — | An already parsed diff (from `parseDiffFromFile`, `parsePatchFiles` or `diffAcceptRejectHunk`). Wins over every other source. |
| `language` | `string` | — | Syntax language id, inferred from `filename` when omitted. |
| `status` | `"streaming" \| "complete"` | `"complete"` | `streaming` shows a spinner, flashes new rows in and follows the end. |
| `open` | `boolean` | — | Controlled open state. |
| `defaultOpen` | `boolean` | `true` | Initial open state when uncontrolled. |
| `onOpenChange` | `(open: boolean) => void` | — | Called when the disclosure opens or closes. |
| `collapseOnComplete` | `boolean` | `false` | Fold the diff away when `status` goes from `streaming` to `complete`; it reopens when streaming starts again. |
| `diffStyle` | `"unified" \| "split"` | — | Controlled layout. |
| `defaultDiffStyle` | `"unified" \| "split"` | `"unified"` | Initial layout when uncontrolled. |
| `onDiffStyleChange` | `(style: "unified" \| "split") => void` | — | Called when the header switch changes the layout. |
| `diffStyleToggle` | `boolean` | `false` | Show the Unified / Split switch in the header. |
| `inlineChanges` | `boolean \| "word-alt" \| "word" \| "word-line" \| "char"` | `true` | Highlight the changed part of each modified line. `true` is `"word-alt"`; `false` turns it off. |
| `indicators` | `"bars" \| "classic" \| "none"` | `"bars"` | Mark changed lines with a coloured bar, with `+`/`-` signs, or by background only. |
| `wrap` | `boolean` | `false` | Wrap long lines instead of scrolling sideways. |
| `maxHeight` | `number` | `320` | Max height of the rows area in px. |
| `showLineNumbers` | `boolean` | `true` | Show line numbers. |
| `copyable` | `boolean` | `true` | Show a button that copies the new file contents. |
| `lineAnnotations` | `DiffLineAnnotation<A>[]` | — | Rows of your own UI pinned under diff lines, each `{ side: "additions" \| "deletions", lineNumber, metadata }`. |
| `renderAnnotation` | `(annotation: DiffLineAnnotation<A>) => ReactNode` | — | Renders each annotation (comments, accept/reject buttons…). |
| `options` | `FileDiffOptions` | — | Extra renderer options merged over the defaults, e.g. `hunkSeparators`, `expandUnchanged`, `enableLineSelection`. |
| `variant` | `"card" \| "row"` | `"card"` | `row` drops the card surface and moves the chevron to the end, for lists of files such as `EditedFilesCard`. |
| `actions` | `ReactNode` | — | Extra header controls before the copy button (reveal in folder, open in editor). |

| Data attribute | Description |
| --- | --- |
| `data-status` | `streaming` or `complete`. |
| `data-diff-style` | `unified` or `split`. |

### parseUnifiedDiff

`(diff: string) => FileDiffLine[]`. Parses one file's `git diff` output; file headers are dropped.

### FileDiffLine

One row of a diff.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `type` (required) | `"added" \| "removed" \| "context" \| "hunk"` | — | Row kind. |
| `content` (required) | `string` | — | Line text without the leading sign; the full `@@` header for hunks. |
| `oldLine` | `number` | — | Line number in the old file. |
| `newLine` | `number` | — | Line number in the new file. |
