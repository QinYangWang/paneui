"use client"

import { BellFilledIcon, BellIcon, HomeFilledIcon, HomeIcon, InboxFilledIcon, InboxIcon, UserFilledIcon, UserIcon } from "@paneui/ui/icons"
import { TabBar, TabBarItem } from "@paneui/ui/components/tab-bar"

export default function TabBarLinks() {
  return (
    <div className="w-80 overflow-hidden rounded-3xl shadow-raised">
      <TabBar>
        <TabBarItem icon={<HomeIcon />} activeIcon={<HomeFilledIcon />} label="Home" active render={<a href="#home" />} />
        <TabBarItem icon={<InboxIcon />} activeIcon={<InboxFilledIcon />} label="Inbox" badge render={<a href="#inbox" />} />
        <TabBarItem icon={<BellIcon />} activeIcon={<BellFilledIcon />} label="Alerts" badge={128} render={<a href="#alerts" />} />
        <TabBarItem icon={<UserIcon />} activeIcon={<UserFilledIcon />} label="Profile" render={<a href="#profile" />} />
      </TabBar>
    </div>
  )
}
