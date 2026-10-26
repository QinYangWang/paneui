"use client"

import * as React from "react"

import { Button } from "@paneui/ui/components/button"
import { FileTree, FileTreeFile, FileTreeFolder } from "@paneui/ui/components/file-tree"

const ALL = ["src", "src/routes", "src/lib", "tests"]

export default function FileTreeControlledExpanded() {
  const [expanded, setExpanded] = React.useState<string[]>(["src"])
  return (
    <div className="flex w-72 flex-col gap-2">
      <div className="flex gap-2">
        <Button size="xs" variant="secondary" onClick={() => setExpanded(ALL)}>
          Expand all
        </Button>
        <Button size="xs" variant="ghost" onClick={() => setExpanded([])}>
          Collapse all
        </Button>
      </div>
      <div>
        <FileTree label="Repository" expanded={expanded} onExpandedChange={setExpanded}>
          <FileTreeFolder value="src" name="src">
            <FileTreeFolder value="src/routes" name="routes">
              <FileTreeFile value="src/routes/index.ts" name="index.ts" />
              <FileTreeFile value="src/routes/auth.ts" name="auth.ts" />
            </FileTreeFolder>
            <FileTreeFolder value="src/lib" name="lib">
              <FileTreeFile value="src/lib/db.ts" name="db.ts" />
            </FileTreeFolder>
            <FileTreeFile value="src/main.ts" name="main.ts" />
          </FileTreeFolder>
          <FileTreeFolder value="tests" name="tests">
            <FileTreeFile value="tests/auth.test.ts" name="auth.test.ts" />
          </FileTreeFolder>
          <FileTreeFile value="README.md" name="README.md" />
        </FileTree>
      </div>
      <p className="px-2 text-xs text-muted-foreground tabular-nums">{expanded.length} folders open</p>
    </div>
  )
}
