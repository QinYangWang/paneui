"use client"

import * as React from "react"

import { NotionEditor } from "@/registry/base-nova/blocks/notion-editor/notion-editor"

export default function NotionEditorControlledMdx() {
  const [mdx, setMdx] = React.useState("# Draft\n\nEdit on the left, the MDX updates on the right.\n\n- [ ] try a **bold** word\n")
  return (
    <div className="grid w-full max-w-4xl gap-3 md:grid-cols-2">
      <NotionEditor value={mdx} onChange={setMdx} className="h-80" contentClassName="py-6" />
      <pre className="h-80 overflow-auto rounded-xl bg-code p-4 font-mono text-xs leading-relaxed whitespace-pre-wrap shadow-raised">{mdx}</pre>
    </div>
  )
}
