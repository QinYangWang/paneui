"use client"

import * as React from "react"

import { FileTree, FileTreeFile, FileTreeFolder } from "@/registry/base-nova/ui/file-tree"

export default function FileTreeExplicitValues() {
  const [value, setValue] = React.useState<string | null>("doc-42")
  return (
    <div className="flex w-72 flex-col gap-2">
      <div className="frame-xl frame-p-2 bg-card shadow-surface">
        <FileTree label="Documents" value={value} onValueChange={setValue} defaultExpanded={["folder-7"]}>
          <FileTreeFolder value="folder-7" name="Guides">
            <FileTreeFile value="doc-41" name="install.md" />
            <FileTreeFile value="doc-42" name="theming.md" />
          </FileTreeFolder>
          <FileTreeFile value="doc-9" name="changelog.md" />
        </FileTree>
      </div>
      <p className="px-2 text-xs text-muted-foreground">
        Selected id: <span className="font-mono text-foreground">{value ?? "none"}</span>
      </p>
    </div>
  )
}
