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
