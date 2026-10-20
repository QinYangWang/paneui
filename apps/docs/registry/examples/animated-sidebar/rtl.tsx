"use client"

import * as React from "react"
import { DirectionProvider } from "@base-ui/react/direction-provider"
import { ChartIcon, FolderIcon, HomeIcon, InboxIcon, SettingsIcon } from "@paneui/ui/icons"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarInset,
  SidebarItem,
  SidebarMenu,
  SidebarProvider,
  SidebarSub,
  SidebarSubItem,
  SidebarTrigger,
} from "@paneui/ui/components/animated-sidebar"

const projects = ["أطلس", "منارة", "مذنّب"]

export default function AnimatedSidebarRtl() {
  const [active, setActive] = React.useState("project:منارة")
  return (
    <DirectionProvider direction="rtl">
      <div dir="rtl" className="w-full max-w-2xl">
        {/* `side="left"` is the start side, so in right-to-left the sidebar sits on the right. */}
        <SidebarProvider shortcut={null} className="h-96 w-full gap-3">
          <Sidebar>
            <SidebarContent>
              <SidebarGroup>
                <SidebarMenu>
                  <SidebarItem icon={<HomeIcon />} label="الرئيسية" isActive={active === "home"} onClick={() => setActive("home")} />
                  <SidebarItem icon={<InboxIcon />} label="الوارد" badge={8} isActive={active === "inbox"} onClick={() => setActive("inbox")} />
                </SidebarMenu>
              </SidebarGroup>
              <SidebarGroup>
                <SidebarGroupLabel>مساحة العمل</SidebarGroupLabel>
                <SidebarMenu>
                  <SidebarItem icon={<FolderIcon />} label="المشاريع" defaultOpen>
                    <SidebarSub>
                      {projects.map((p) => (
                        <SidebarSubItem key={p} isActive={active === `project:${p}`} onClick={() => setActive(`project:${p}`)}>
                          {p}
                        </SidebarSubItem>
                      ))}
                    </SidebarSub>
                  </SidebarItem>
                  <SidebarItem icon={<ChartIcon />} label="التحليلات" isActive={active === "insights"} onClick={() => setActive("insights")} />
                </SidebarMenu>
              </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
              <SidebarMenu>
                <SidebarItem icon={<SettingsIcon />} label="الإعدادات" isActive={active === "settings"} onClick={() => setActive("settings")} />
              </SidebarMenu>
            </SidebarFooter>
          </Sidebar>
          <SidebarInset className="gap-3 rounded-2xl bg-muted/50 p-3 shadow-well">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
              <span className="text-sm font-medium">{active.startsWith("project:") ? active.slice(8) : "لوحة التحكم"}</span>
            </div>
            <div className="grid flex-1 grid-cols-2 gap-3">
              <div className="rounded-xs bg-card shadow-raised" />
              <div className="rounded-xs bg-card shadow-raised" />
            </div>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </DirectionProvider>
  )
}
