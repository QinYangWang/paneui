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
