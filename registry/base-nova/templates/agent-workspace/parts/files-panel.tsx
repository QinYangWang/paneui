"use client"

import * as React from "react"

import { FileDiff } from "@/registry/base-nova/ui/file-diff"
import { FileTree, FileTreeFile, FileTreeFolder } from "@/registry/base-nova/ui/file-tree"

import { diffs } from "./data"

const Changed = ({ kind }: { kind: "M" | "A" }) => (
  <span className={kind === "M" ? "font-mono text-xs text-warning" : "font-mono text-xs text-success"}>{kind}</span>
)

/** Repository tree with changed files marked, and a diff preview of the selection. */
export function FilesPanel() {
  const [file, setFile] = React.useState<string | null>("invoice.ts")
  const preview = file ? diffs[file] : undefined
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4">
      <section aria-label="Repository" className="flex flex-col gap-2">
        <h2 className="px-1 text-xs font-medium tracking-wider text-muted-foreground uppercase">acme/billing</h2>
        <div className="rounded-2xl bg-card p-2 shadow-surface">
          <FileTree
            label="Repository files"
            value={file}
            onValueChange={(v) => setFile(v)}
            defaultExpanded={["packages", "billing", "src", "lib"]}
          >
            <FileTreeFolder value="packages" name="packages">
              <FileTreeFolder value="billing" name="billing">
                <FileTreeFolder value="src" name="src">
                  <FileTreeFolder value="lib" name="lib">
                    <FileTreeFile value="money.ts" name="money.ts" meta={<Changed kind="M" />} />
                  </FileTreeFolder>
                  <FileTreeFile value="invoice.ts" name="invoice.ts" meta={<Changed kind="M" />} />
                  <FileTreeFile value="invoice.test.ts" name="invoice.test.ts" meta={<Changed kind="A" />} />
                  <FileTreeFile value="ledger.ts" name="ledger.ts" />
                </FileTreeFolder>
                <FileTreeFile value="package.json" name="package.json" />
              </FileTreeFolder>
            </FileTreeFolder>
            <FileTreeFile value="turbo.json" name="turbo.json" />
          </FileTree>
        </div>
      </section>
      <section aria-label="Diff preview" className="flex min-h-0 flex-col gap-2">
        <h2 className="px-1 text-xs font-medium tracking-wider text-muted-foreground uppercase">Preview</h2>
        {preview ? (
          <FileDiff key={file} filename={preview.filename} diff={preview.diff} maxHeight={360} />
        ) : (
          <p className="rounded-2xl bg-muted/50 px-4 py-6 text-center text-sm text-pretty text-muted-foreground shadow-well">
            Select a changed file to preview its diff.
          </p>
        )}
      </section>
    </div>
  )
}
