import { CalendarDaysIcon, ChartIcon, HomeIcon, InboxIcon, SettingsIcon } from "@paneui/ui/icons"
import { SidebarNav, SidebarNavContent, SidebarNavLink, SidebarNavList, SidebarNavSection } from "@paneui/ui/components/sidebar-nav"

const pages = [
  { label: "Overview", icon: <HomeIcon /> },
  { label: "Inbox", icon: <InboxIcon />, active: true },
  { label: "Calendar", icon: <CalendarDaysIcon /> },
  { label: "Reports", icon: <ChartIcon /> },
]

export default function SidebarNavIcons() {
  return (
    <div className="flex h-72 w-60 flex-col overflow-hidden rounded-xl bg-background shadow-raised">
      <SidebarNav>
        <SidebarNavContent aria-label="Workspace" className="pt-3">
          <SidebarNavSection label="Workspace" collapsible={false}>
            <SidebarNavList>
              {pages.map((p) => (
                <SidebarNavLink key={p.label} href="#" icon={p.icon} active={p.active}>
                  {p.label}
                </SidebarNavLink>
              ))}
            </SidebarNavList>
          </SidebarNavSection>
          <SidebarNavSection label="Account" collapsible={false}>
            <SidebarNavList>
              <SidebarNavLink href="#" icon={<SettingsIcon />}>
                Settings
              </SidebarNavLink>
            </SidebarNavList>
          </SidebarNavSection>
        </SidebarNavContent>
      </SidebarNav>
    </div>
  )
}
