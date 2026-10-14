"use client"

import * as React from "react"

import { CodeIcon, ImageIcon, LockIcon } from "@/components/icons"
import { FileTree, FileTreeFile, FileTreeFolder } from "@/registry/base-nova/ui/file-tree"

export default function FileTreeOpenFile() {
  const [opened, setOpened] = React.useState<string | null>(null)
  return (
    <div className="flex w-72 flex-col gap-2">
      <div className="rounded-2xl bg-card p-2 shadow-surface">
        <FileTree label="Site" defaultExpanded={["public", "pages"]} onOpenFile={(node) => setOpened(node.name)}>
          <FileTreeFolder value="pages" name="pages">
            <FileTreeFile value="index.html" name="index.html" icon={<CodeIcon />} />
            <FileTreeFile value="about.html" name="about.html" icon={<CodeIcon />} />
          </FileTreeFolder>
          <FileTreeFolder value="public" name="public">
            <FileTreeFile value="hero.png" name="hero.png" icon={<ImageIcon />} />
            <FileTreeFile value="logo.svg" name="logo.svg" icon={<ImageIcon />} />
          </FileTreeFolder>
          <FileTreeFile value="secrets" name="secrets.env" icon={<LockIcon />} disabled />
        </FileTree>
      </div>
      <p className="px-2 text-xs text-muted-foreground">
        {opened ? (
          <>
            Opened <span className="font-medium text-foreground">{opened}</span>
          </>
        ) : (
          "Click a file, or focus it and press Enter, to open it."
        )}
      </p>
    </div>
  )
}
