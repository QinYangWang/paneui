"use client"

import { CalendarDaysIcon, ChartIcon, HomeIcon, InboxIcon, SettingsIcon } from "@paneui/ui/icons"
import { PreviewRail, type PreviewRailItem } from "@paneui/ui/components/preview-rail"

const items: PreviewRailItem[] = [
  { id: "home", label: "Home", icon: <HomeIcon />, description: "Today at a glance." },
  { id: "inbox", label: "Inbox", icon: <InboxIcon />, description: "12 unread · 3 need a reply" },
  { id: "calendar", label: "Calendar", icon: <CalendarDaysIcon />, description: "Next: design review at 3pm" },
  { id: "reports", label: "Reports", icon: <ChartIcon />, description: "Spending is down 8% this month" },
  { id: "settings", label: "Settings", icon: <SettingsIcon />, description: "Account, notifications, billing" },
  { id: "archive", label: "Archive", description: "Older than 90 days", disabled: true },
]

export default function PreviewRailRenderPreview() {
  return (
    <div className="flex w-full max-w-md gap-10">
      <PreviewRail items={items} defaultValue="inbox" label="Default preview" />
      <PreviewRail
        items={items}
        defaultValue="inbox"
        label="Custom preview"
        renderPreview={(item) =>
          item.id === "settings" ? null : (
            <p className="text-sm">
              <span className="font-medium">{item.label}</span>
              <span className="text-muted-foreground"> — {item.description}</span>
            </p>
          )
        }
      />
    </div>
  )
}
