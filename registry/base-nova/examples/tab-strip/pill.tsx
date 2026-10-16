"use client"

import * as React from "react"

import { FolderIcon, GlobeIcon, TerminalSquareIcon } from "@/components/icons"
import { TabStrip, TabStripItem } from "@/registry/base-nova/ui/tab-strip"

export default function TabStripPill() {
  const [tab, setTab] = React.useState("terminal")
  return (
    <div className="w-full max-w-md frame-2xl frame-inset-1.75 bg-card p-1.5 shadow-raised">
      <TabStrip variant="pill" value={tab} onValueChange={setTab} aria-label="Panels">
        <TabStripItem value="terminal" icon={<TerminalSquareIcon />}>
          Terminal
        </TabStripItem>
        <TabStripItem value="explorer" icon={<FolderIcon />}>
          Explorer
        </TabStripItem>
        <TabStripItem value="browser" icon={<GlobeIcon />}>
          Browser
        </TabStripItem>
      </TabStrip>
    </div>
  )
}
