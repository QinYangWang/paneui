import { CalendarDaysIcon, ChartIcon, HomeIcon, InboxIcon, SettingsIcon } from "@paneui/ui/icons"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarInset,
  SidebarItem,
  SidebarMenu,
  SidebarProvider,
  SidebarTrigger,
} from "@paneui/ui/components/animated-sidebar"

export default function AnimatedSidebarCollapsed() {
  return (
    <SidebarProvider defaultOpen={false} shortcut={null} className="h-80 w-full max-w-xl gap-3">
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              <SidebarItem icon={<HomeIcon />} label="Home" />
              <SidebarItem icon={<InboxIcon />} label="Inbox" badge={4} isActive />
              <SidebarItem icon={<CalendarDaysIcon />} label="Calendar" />
              <SidebarItem icon={<ChartIcon />} label="Reports" tooltip="Weekly reports" />
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarItem icon={<SettingsIcon />} label="Settings" />
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="items-start gap-2 rounded-2xl bg-muted/50 p-3 shadow-well">
        <SidebarTrigger />
        <p className="text-sm text-muted-foreground">Starts as an icon rail. Hover an icon for its tooltip.</p>
      </SidebarInset>
    </SidebarProvider>
  )
}
