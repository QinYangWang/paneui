"use client"

import * as React from "react"

import { FileTree, FileTreeFile, FileTreeFolder } from "@paneui/ui/components/file-tree"

const Dot = ({ className }: { className: string }) => <span className={`block size-1.5 rounded-full ${className}`} />

export default function FileTreeDemo() {
  const [value, setValue] = React.useState<string | null>("components/ui/button.tsx")
  return (
    <div className="flex w-72 flex-col gap-2">
      <div className="frame-xl frame-p-2 bg-card shadow-surface">
        <FileTree
          label="Project files"
          value={value}
          onValueChange={setValue}
          defaultExpanded={["app", "components", "components/ui"]}
        >
          <FileTreeFolder name="app">
            <FileTreeFile name="layout.tsx" />
            <FileTreeFile name="page.tsx" meta={<Dot className="bg-warning" />} />
            <FileTreeFile name="globals.css" />
          </FileTreeFolder>
          <FileTreeFolder name="components">
            <FileTreeFolder name="ui">
              <FileTreeFile name="button.tsx" />
              <FileTreeFile name="tabs.tsx" meta={<Dot className="bg-success" />} />
              <FileTreeFile name="tooltip.tsx" />
            </FileTreeFolder>
            <FileTreeFile name="icons.tsx" />
          </FileTreeFolder>
          <FileTreeFolder name="lib">
            <FileTreeFile name="utils.ts" />
          </FileTreeFolder>
          <FileTreeFile name="package.json" />
          <FileTreeFile name=".env" disabled />
        </FileTree>
      </div>
      <p className="px-2 text-xs text-muted-foreground">
        Selected: <span className="font-medium text-foreground">{value ?? "none"}</span>
      </p>
    </div>
  )
}
