"use client"

import * as React from "react"

import { FileTree, FileTreeFile, FileTreeFolder } from "@/registry/base-nova/ui/file-tree"

const Dot = ({ className }: { className: string }) => <span className={`block size-1.5 rounded-full ${className}`} />

export default function FileTreeDemo() {
  const [value, setValue] = React.useState<string | null>("button.tsx")
  return (
    <div className="flex w-72 flex-col gap-2">
      <div className="rounded-2xl bg-card bg-linear-to-b from-white/4 to-transparent p-2 shadow-surface">
        <FileTree
          label="Project files"
          value={value}
          onValueChange={setValue}
          defaultExpanded={["app", "components", "ui"]}
        >
          <FileTreeFolder value="app" name="app">
            <FileTreeFile value="layout.tsx" name="layout.tsx" />
            <FileTreeFile value="page.tsx" name="page.tsx" meta={<Dot className="bg-warning" />} />
            <FileTreeFile value="globals.css" name="globals.css" />
          </FileTreeFolder>
          <FileTreeFolder value="components" name="components">
            <FileTreeFolder value="ui" name="ui">
              <FileTreeFile value="button.tsx" name="button.tsx" />
              <FileTreeFile value="tabs.tsx" name="tabs.tsx" meta={<Dot className="bg-success" />} />
              <FileTreeFile value="tooltip.tsx" name="tooltip.tsx" />
            </FileTreeFolder>
            <FileTreeFile value="icons.tsx" name="icons.tsx" />
          </FileTreeFolder>
          <FileTreeFolder value="lib" name="lib">
            <FileTreeFile value="utils.ts" name="utils.ts" />
          </FileTreeFolder>
          <FileTreeFile value="package.json" name="package.json" />
          <FileTreeFile value=".env" name=".env" disabled />
        </FileTree>
      </div>
      <p className="px-2 text-xs text-muted-foreground">
        Selected: <span className="font-medium text-foreground">{value ?? "none"}</span>
      </p>
    </div>
  )
}
