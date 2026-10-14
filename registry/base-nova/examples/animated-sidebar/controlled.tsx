"use client"

import * as React from "react"

import { FolderIcon, HomeIcon, SearchIcon } from "@/components/icons"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarInset,
  SidebarItem,
  SidebarMenu,
  SidebarProvider,
  SidebarSub,
  SidebarSubItem,
} from "@/registry/base-nova/ui/animated-sidebar"
import { Button } from "@/registry/base-nova/ui/button"

const FOLDERS = ["Receipts", "Contracts", "Travel"]

export default function AnimatedSidebarControlled() {
  const [open, setOpen] = React.useState(true)
  const [foldersOpen, setFoldersOpen] = React.useState(true)
  const [active, setActive] = React.useState("Contracts")

  return (
    <SidebarProvider open={open} onOpenChange={setOpen} shortcut={null} className="h-80 w-full max-w-xl gap-3">
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              <SidebarItem icon={<HomeIcon />} label="Home" isActive={active === "home"} onClick={() => setActive("home")} />
              <SidebarItem icon={<SearchIcon />} label="Search" isActive={active === "search"} onClick={() => setActive("search")} />
              <SidebarItem icon={<FolderIcon />} label="Documents" open={foldersOpen} onOpenChange={setFoldersOpen}>
                <SidebarSub>
                  {FOLDERS.map((f) => (
                    <SidebarSubItem key={f} isActive={active === f} onClick={() => setActive(f)}>
                      {f}
                    </SidebarSubItem>
                  ))}
                </SidebarSub>
              </SidebarItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset className="gap-2 rounded-2xl bg-muted/50 p-3 shadow-well">
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="secondary" onClick={() => setOpen(!open)}>
            {open ? "Collapse to rail" : "Expand sidebar"}
          </Button>
          <Button size="sm" variant="ghost" onClick={() => setFoldersOpen(!foldersOpen)}>
            {foldersOpen ? "Fold Documents" : "Unfold Documents"}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">Fold Documents and the active pill moves onto its parent row.</p>
      </SidebarInset>
    </SidebarProvider>
  )
}
