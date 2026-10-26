"use client"

import { useT } from "@/lib/site-locale"
import { CalendarDaysIcon, ChartIcon, HomeIcon, InboxIcon, SettingsIcon } from "@paneui/ui/icons"
import { SidebarNav, SidebarNavContent, SidebarNavLink, SidebarNavList, SidebarNavSection } from "@paneui/ui/components/sidebar-nav"

const pages = [
  { label: "Overview", icon: <HomeIcon /> },
  { label: "Inbox", icon: <InboxIcon />, active: true },
  { label: "Calendar", icon: <CalendarDaysIcon /> },
  { label: "Reports", icon: <ChartIcon /> },
]

export default function SidebarNavFill() {
  const t = useT()
  const labels: Record<string, string> = { Overview: "概览", Inbox: "收件箱", Calendar: "日历", Reports: "报告" }
  return (
    <div className="flex h-72 w-60 flex-col overflow-hidden rounded-xl bg-background shadow-raised">
      <SidebarNav variant="fill">
        <SidebarNavContent aria-label={t({ en: "Workspace", zh: "工作区" })} className="pt-3">
          <SidebarNavSection label={t({ en: "Workspace", zh: "工作区" })} collapsible={false}>
            <SidebarNavList>
              {pages.map((p) => (
                <SidebarNavLink key={t({ en: p.label, zh: labels[p.label] })} href="#" icon={p.icon} active={p.active}>
                  {t({ en: p.label, zh: labels[p.label] })}
                </SidebarNavLink>
              ))}
            </SidebarNavList>
          </SidebarNavSection>
          <SidebarNavSection label={t({ en: "Account", zh: "账户" })} collapsible={false}>
            <SidebarNavList>
              <SidebarNavLink href="#" icon={<SettingsIcon />}>
                {t({ en: "Settings", zh: "设置" })}
              </SidebarNavLink>
            </SidebarNavList>
          </SidebarNavSection>
        </SidebarNavContent>
      </SidebarNav>
    </div>
  )
}
