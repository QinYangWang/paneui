import { CalendarDaysIcon, HomeIcon, InboxIcon, SettingsIcon } from "@paneui/ui/icons"
import { AppShell, AppShellHeader, AppShellMain, AppShellSidebar } from "@paneui/ui/components/app-shell"
import { SidebarContent, SidebarFooter, SidebarGroup, SidebarItem, SidebarMenu } from "@paneui/ui/components/animated-sidebar"

export default function AppShellIconRail() {
  return (
    <AppShell variant="window" defaultOpen={false} shortcut={null} className="h-80 w-full max-w-xl">
      <AppShellHeader>
        <span className="text-ui font-semibold">Inbox</span>
      </AppShellHeader>
      <AppShellSidebar aria-label="Mail">
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              <SidebarItem icon={<HomeIcon />} label="Home" />
              <SidebarItem icon={<InboxIcon />} label="Inbox" isActive />
              <SidebarItem icon={<CalendarDaysIcon />} label="Calendar" />
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarItem icon={<SettingsIcon />} label="Settings" />
          </SidebarMenu>
        </SidebarFooter>
      </AppShellSidebar>
      <AppShellMain>
        <div className="flex flex-col gap-2 p-6">
          {["Quarterly review", "Design sync notes", "Invoice 0142"].map((t) => (
            <div key={t} className="flex h-10 items-center rounded-lg px-3 text-ui hover:bg-secondary">
              {t}
            </div>
          ))}
        </div>
      </AppShellMain>
    </AppShell>
  )
}
