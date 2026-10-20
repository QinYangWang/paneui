import { BellIcon, ChatIcon, FileIcon, UsersIcon } from "@paneui/ui/icons"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarInset,
  SidebarItem,
  SidebarMenu,
  SidebarProvider,
  SidebarTrigger,
} from "@paneui/ui/components/animated-sidebar"

export default function AnimatedSidebarFlushRight() {
  return (
    <SidebarProvider shortcut={null} className="h-80 w-full max-w-xl overflow-hidden rounded-2xl bg-background shadow-raised">
      <Sidebar side="right" variant="sidebar">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Details</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarItem icon={<UsersIcon />} label="People" badge={6} isActive />
              <SidebarItem icon={<ChatIcon />} label="Comments" badge={12} />
              <SidebarItem icon={<FileIcon />} label="Files" />
              <SidebarItem icon={<BellIcon />} label="Activity" />
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset className="gap-2 p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Q4 launch plan</span>
          <SidebarTrigger />
        </div>
        <p className="text-sm text-pretty text-muted-foreground">
          The panel sits on the right, flush with a hairline edge instead of a floating card.
        </p>
      </SidebarInset>
    </SidebarProvider>
  )
}
