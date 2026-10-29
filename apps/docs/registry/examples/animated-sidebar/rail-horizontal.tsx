import { BellIcon, FolderIcon, HomeIcon, InboxIcon, SettingsIcon } from "@paneui/ui/icons"
import { SidebarRail, SidebarRailGroup, SidebarRailItem, SidebarRailSpacer } from "@paneui/ui/components/animated-sidebar"
import { TooltipProvider } from "@paneui/ui/components/tooltip"

export default function AnimatedSidebarRailHorizontal() {
  return (
    <TooltipProvider>
      <div className="w-full max-w-xs overflow-hidden frame-2xl frame-inset-2 bg-shell shadow-raised">
        <SidebarRail aria-label="App" orientation="horizontal">
          <SidebarRailGroup>
            <SidebarRailItem label="Home" icon={<HomeIcon />} active />
            <SidebarRailItem label="Inbox" icon={<InboxIcon />} badge={3} />
            <SidebarRailItem label="Projects" icon={<FolderIcon />} />
          </SidebarRailGroup>
          <SidebarRailSpacer />
          <SidebarRailGroup>
            <SidebarRailItem label="Alerts" icon={<BellIcon />} badge />
            <SidebarRailItem label="Settings" icon={<SettingsIcon />} />
          </SidebarRailGroup>
        </SidebarRail>
      </div>
    </TooltipProvider>
  )
}
