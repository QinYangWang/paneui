"use client"

import * as React from "react"

import { ChartIcon, CodeIcon, FileIcon, TerminalIcon } from "@/components/icons"
import { MorphingTabs, type MorphingTabsItem } from "@/registry/base-nova/blocks/morphing-tabs/morphing-tabs"

const initial: MorphingTabsItem[] = [
  {
    id: "readme",
    label: "README.md",
    icon: <FileIcon />,
    content: (
      <div className="space-y-2 text-sm">
        <p className="font-medium">qinyang/ui</p>
        <p className="text-muted-foreground">Soft, slightly skeuomorphic components built on Base UI and motion.</p>
      </div>
    ),
  },
  {
    id: "button",
    label: "button.tsx",
    icon: <CodeIcon />,
    content: (
      <pre className="overflow-x-auto rounded-xl bg-muted p-3 font-mono text-xs shadow-well">
        {`export function Button(props) {\n  return <ButtonPrimitive data-slot="button" {...props} />\n}`}
      </pre>
    ),
  },
  {
    id: "metrics",
    label: "Metrics",
    icon: <ChartIcon />,
    content: (
      <div className="grid grid-cols-3 gap-3 text-sm">
        {[
          ["Installs", "12.4k"],
          ["Stars", "1,208"],
          ["Issues", "14"],
        ].map(([k, v]) => (
          <div key={k} className="rounded-xl bg-muted p-3 shadow-well">
            <p className="text-xs text-muted-foreground">{k}</p>
            <p className="mt-1 font-medium tabular-nums">{v}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "terminal",
    label: "Terminal",
    icon: <TerminalIcon />,
    content: <p className="font-mono text-xs text-muted-foreground">$ pnpm dlx shadcn add @qinyang/morphing-tabs</p>,
  },
]

export default function MorphingTabsDemo() {
  const [items, setItems] = React.useState(initial)
  return (
    <div className="w-full max-w-lg">
      <MorphingTabs
        items={items}
        aria-label="Open files"
        onClose={(id) => setItems((list) => (list.length > 1 ? list.filter((item) => item.id !== id) : list))}
      />
      <p className="mt-3 text-xs text-muted-foreground">Drag tabs to reorder, or Alt + ←/→ while a tab is focused.</p>
    </div>
  )
}
