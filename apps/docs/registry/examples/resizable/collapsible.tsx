"use client"

import * as React from "react"

import { SidebarIcon } from "@paneui/ui/icons"
import { Button } from "@paneui/ui/components/button"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  type ResizablePanelGroupHandle,
} from "@paneui/ui/components/resizable"

export default function ResizableCollapsible() {
  const group = React.useRef<ResizablePanelGroupHandle>(null)
  const [open, setOpen] = React.useState(true)
  return (
    <div className="flex w-full max-w-2xl flex-col gap-2">
      <Button variant="secondary" size="sm" className="self-start" onClick={() => group.current?.toggle("sidebar")}>
        <SidebarIcon data-icon="inline-start" />
        {open ? "Hide" : "Show"} sidebar
      </Button>
      <div className="h-56 overflow-hidden rounded-xl bg-card shadow-raised">
        <ResizablePanelGroup handleRef={group}>
          <ResizablePanel id="sidebar" defaultSize="200px" minSize="160px" maxSize="320px" collapsible onCollapsedChange={(c) => setOpen(!c)}>
            <div className="h-full bg-shell p-3 text-ui text-muted-foreground">Sidebar</div>
          </ResizablePanel>
          <ResizableHandle variant="hidden" />
          <ResizablePanel id="main">
            <div className="flex h-full items-center justify-center p-3 text-center text-ui text-pretty text-muted-foreground">
              Drag the edge past the minimum to collapse it, or press Enter on the focused divider.
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  )
}
