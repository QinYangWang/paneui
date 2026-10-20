import { BellIcon, FolderIcon, HomeIcon, InboxIcon, SettingsIcon } from "@paneui/ui/icons"
import { IconRail, IconRailGroup, IconRailItem, IconRailSpacer } from "@paneui/ui/components/icon-rail"
import { TooltipProvider } from "@paneui/ui/components/tooltip"

export default function IconRailHorizontal() {
  return (
    <TooltipProvider>
      <div className="w-full max-w-xs overflow-hidden frame-2xl frame-inset-2 bg-shell shadow-raised">
        <IconRail aria-label="App" orientation="horizontal">
          <IconRailGroup>
            <IconRailItem label="Home" icon={<HomeIcon />} active />
            <IconRailItem label="Inbox" icon={<InboxIcon />} badge={3} />
            <IconRailItem label="Projects" icon={<FolderIcon />} />
          </IconRailGroup>
          <IconRailSpacer />
          <IconRailGroup>
            <IconRailItem label="Alerts" icon={<BellIcon />} badge />
            <IconRailItem label="Settings" icon={<SettingsIcon />} />
          </IconRailGroup>
        </IconRail>
      </div>
    </TooltipProvider>
  )
}
