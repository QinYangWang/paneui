"use client"

import * as React from "react"

import { DownloadIcon, PlusIcon } from "@/components/icons"
import { Sidebar, SidebarProvider } from "@/registry/base-nova/ui/animated-sidebar"
import { Button } from "@/registry/base-nova/ui/button"
import { Drawer, DrawerContent, DrawerTitle } from "@/registry/base-nova/ui/drawer"
import { Tabs, TabsList, TabsTab } from "@/registry/base-nova/ui/tabs"

import { AppNav, NAV_TITLES } from "./parts/app-sidebar"
import { kpis } from "./parts/data"
import { SettingsDrawer } from "./parts/settings-drawer"
import { TopBar } from "./parts/top-bar"
import { ActivityCard, InvoicesCard, KpiCard, RevenueCard } from "./parts/widgets"

/**
 * SaaS console: collapsible sidebar, top bar with ⌘K search, breadcrumb and
 * account menu, KPI cards, revenue chart, activity feed, invoices table and a
 * settings drawer.
 */
export function SaasDashboard() {
  const [active, setActive] = React.useState("overview")
  const [navOpen, setNavOpen] = React.useState(false)
  const [settingsOpen, setSettingsOpen] = React.useState(false)
  const [range, setRange] = React.useState("30d")

  const navigate = React.useCallback((id: string) => {
    setActive(id)
    setNavOpen(false)
  }, [])
  const openSettings = React.useCallback(() => setSettingsOpen(true), [])

  const section = active.startsWith("agents:") ? "Agents" : "Console"
  const title = NAV_TITLES[active] ?? "Overview"

  return (
    <SidebarProvider className="min-h-svh bg-background">
      <Sidebar variant="sidebar" aria-label="Console" className="sticky top-0 h-svh self-start max-lg:hidden">
        <AppNav active={active} onNavigate={navigate} />
      </Sidebar>

      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar section={section} page={title} onNavigate={navigate} onOpenNav={() => setNavOpen(true)} onOpenSettings={openSettings} />

        <main className="mx-auto flex w-full max-w-page flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
              <p className="text-sm text-muted-foreground">Billing and agent usage across 158 workspaces.</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Tabs value={range} onValueChange={(v) => setRange(String(v))}>
                <TabsList aria-label="Date range">
                  <TabsTab value="7d">7d</TabsTab>
                  <TabsTab value="30d">30d</TabsTab>
                  <TabsTab value="90d">90d</TabsTab>
                </TabsList>
              </Tabs>
              <Button variant="secondary" size="sm">
                <DownloadIcon data-icon="inline-start" />
                Export
              </Button>
              <Button size="sm">
                <PlusIcon data-icon="inline-start" />
                New project
              </Button>
            </div>
          </div>

          <section aria-label="Key metrics" className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {kpis.map((k) => (
              <KpiCard key={k.id} kpi={k} />
            ))}
          </section>

          <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
            <div className="min-w-0 xl:col-span-2">
              <RevenueCard />
            </div>
            <ActivityCard />
          </div>

          <InvoicesCard />
        </main>
      </div>

      <Drawer side="left" open={navOpen} onOpenChange={setNavOpen}>
        <DrawerContent className="w-72">
          <DrawerTitle className="sr-only">Navigation</DrawerTitle>
          <SidebarProvider shortcut={null} className="min-h-0 flex-1 [--sidebar-width:100%]">
            {/* eslint-disable-next-line shadcn/no-restyle -- sidebar embedded in the mobile drawer: the drawer is the surface */}
            <Sidebar variant="sidebar" collapsible="none" aria-label="Console" panelClassName="border-r-0 bg-transparent">
              <AppNav active={active} onNavigate={navigate} />
            </Sidebar>
          </SidebarProvider>
        </DrawerContent>
      </Drawer>

      <SettingsDrawer open={settingsOpen} onOpenChange={setSettingsOpen} />
    </SidebarProvider>
  )
}
