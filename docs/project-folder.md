# Project Folder

> Folder that previews its files and opens into a file view.

Page: https://paneui.dev/docs/project-folder/

## Installation

```bash
npx shadcn@latest add @paneui/project-folder
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/project-folder.json
```

Packages: `@base-ui/react`, `motion`.

Registry items it builds on: `@paneui/theme`, `@paneui/icons`, `@paneui/icon-chip`.

## Usage

```tsx
"use client"

import * as React from "react"

import { ProjectFolder, type ProjectFolderFile } from "@/registry/base-nova/blocks/project-folder/project-folder"

function Doc({ hue, lines = 5 }: { hue: number; lines?: number }) {
  return (
    <span className="flex size-full flex-col gap-1.5 bg-muted p-2.5">
      <span className="h-2 w-3/5 rounded-full" style={{ background: `oklch(0.65 0.14 ${hue})` }} />
      {Array.from({ length: lines }, (_, i) => (
        <span key={i} className="h-1 rounded-full bg-foreground/15" style={{ width: `${92 - ((i * 23) % 40)}%` }} />
      ))}
      <span className="mt-auto h-8 rounded-md" style={{ background: `oklch(0.8 0.08 ${hue} / 0.6)` }} />
    </span>
  )
}

function Art({ hue }: { hue: number }) {
  return (
    <span
      className="block size-full"
      style={{
        backgroundImage: `radial-gradient(circle at 30% 25%, oklch(0.95 0.05 ${hue}), transparent 50%), linear-gradient(150deg, oklch(0.75 0.13 ${hue}), oklch(0.5 0.16 ${(hue + 70) % 360}))`,
      }}
    />
  )
}

function Palette() {
  return (
    <span className="grid size-full grid-rows-4">
      {[25, 70, 160, 250].map((h) => (
        <span key={h} style={{ background: `oklch(0.7 0.14 ${h})` }} />
      ))}
    </span>
  )
}

const files: ProjectFolderFile[] = [
  { id: "brief", name: "Creative brief.pdf", meta: "PDF · 840 KB", content: <Doc hue={250} /> },
  { id: "mood", name: "Moodboard.png", meta: "PNG · 6.1 MB", content: <Art hue={30} /> },
  { id: "palette", name: "Palette v3.ase", meta: "Swatches · 12 KB", content: <Palette /> },
  { id: "hero", name: "Hero shot.jpg", meta: "JPG · 3.8 MB", content: <Art hue={200} /> },
  { id: "deck", name: "Launch deck.key", meta: "Keynote · 22 MB", content: <Doc hue={150} lines={3} /> },
  { id: "type", name: "Type specimen.pdf", meta: "PDF · 1.2 MB", content: <Doc hue={320} lines={6} /> },
  { id: "logo", name: "Logo lockups.svg", meta: "SVG · 64 KB", content: <Art hue={280} /> },
  { id: "invoice", name: "Studio invoice.pdf", meta: "PDF · 96 KB", content: <Doc hue={90} lines={4} /> },
]

export default function ProjectFolderDemo() {
  const [picked, setPicked] = React.useState<string | null>(null)
  return (
    <div className="flex flex-col items-center gap-4 pt-10">
      <ProjectFolder
        title="Spring rebrand"
        description="Updated 2h ago"
        files={files}
        onFileSelect={(f) => setPicked(f.name)}
      />
      <p className="text-xs text-muted-foreground">
        {picked ? `Opened ${picked}` : "Hover to peek, click to open the folder"}
      </p>
    </div>
  )
}
```
