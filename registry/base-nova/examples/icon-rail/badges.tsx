import { InboxIcon, BellIcon, ChatIcon } from "@/components/icons"
import { IconRail, IconRailItem, IconRailSeparator } from "@/registry/base-nova/ui/icon-rail"
import { TooltipProvider } from "@/registry/base-nova/ui/tooltip"

export default function IconRailBadges() {
  return (
    <TooltipProvider>
      <div className="overflow-hidden frame-2xl frame-inset-2 bg-shell shadow-raised">
        <IconRail aria-label="Notifications" className="h-auto">
          <IconRailItem label="Inbox" icon={<InboxIcon />} badge={12} />
          <IconRailItem label="Messages" icon={<ChatIcon />} badge />
          <IconRailSeparator />
          <IconRailItem label="Alerts" icon={<BellIcon />} badge={140} active />
        </IconRail>
      </div>
    </TooltipProvider>
  )
}
