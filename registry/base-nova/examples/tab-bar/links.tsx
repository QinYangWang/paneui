"use client"

import { BellIcon, HomeIcon, InboxIcon, UserIcon } from "@/components/icons"
import { TabBar, TabBarItem } from "@/registry/base-nova/ui/tab-bar"

export default function TabBarLinks() {
  return (
    <div className="w-80 overflow-hidden rounded-3xl shadow-raised">
      <TabBar>
        <TabBarItem icon={<HomeIcon />} label="Home" active render={<a href="#home" />} />
        <TabBarItem icon={<InboxIcon />} label="Inbox" badge render={<a href="#inbox" />} />
        <TabBarItem icon={<BellIcon />} label="Alerts" badge={128} render={<a href="#alerts" />} />
        <TabBarItem icon={<UserIcon />} label="Profile" render={<a href="#profile" />} />
      </TabBar>
    </div>
  )
}
