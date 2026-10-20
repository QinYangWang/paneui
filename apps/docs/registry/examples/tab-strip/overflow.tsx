"use client"

import * as React from "react"

import { FileIcon } from "@paneui/ui/icons"
import { TabStrip, TabStripItem } from "@paneui/ui/components/tab-strip"

const FILES = ["page.tsx", "layout.tsx", "globals.css", "utils.ts", "button.tsx", "dialog.tsx", "menu.tsx", "tabs.tsx"]

export default function TabStripOverflow() {
  const [tab, setTab] = React.useState("page.tsx")
  return (
    <div className="w-full max-w-sm frame-2xl frame-inset-1.75 bg-shell p-1.5">
      <TabStrip value={tab} onValueChange={setTab} aria-label="Open files">
        {FILES.map((f, i) => (
          <TabStripItem key={f} value={f} icon={<FileIcon />} indicator={i === 2}>
            {f}
          </TabStripItem>
        ))}
      </TabStrip>
    </div>
  )
}
