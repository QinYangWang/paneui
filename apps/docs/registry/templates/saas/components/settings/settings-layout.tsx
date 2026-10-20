"use client"

import * as React from "react"

import { BellIcon, CreditCardIcon, GridIcon, PaletteIcon, ShieldIcon, UserIcon, UsersIcon } from "@paneui/ui/icons"
import { PageHeader, PageHeaderContent, PageHeaderDescription, PageHeaderTitle } from "@paneui/ui/components/page-header"
import { SettingsNav, SettingsNavItem } from "@paneui/ui/components/settings-section"

import { AppLink, routes, useRoute } from "../../lib/routes"

const pages = [
  { href: routes.settings, label: "Profile", icon: <UserIcon /> },
  { href: routes.settingsAccount, label: "Account", icon: <ShieldIcon /> },
  { href: routes.settingsBilling, label: "Billing", icon: <CreditCardIcon /> },
  { href: routes.settingsTeam, label: "Team", icon: <UsersIcon /> },
  { href: routes.settingsIntegrations, label: "Integrations", icon: <GridIcon /> },
  { href: routes.settingsNotifications, label: "Notifications", icon: <BellIcon /> },
  { href: routes.settingsAppearance, label: "Appearance", icon: <PaletteIcon /> },
]

/** Settings frame: page title, the sub-nav on the left (a strip on phones), the page on the right. */
export function SettingsLayout({ children }: { children: React.ReactNode }) {
  const route = useRoute()
  return (
    <>
      <PageHeader>
        <PageHeaderContent>
          <PageHeaderTitle>Settings</PageHeaderTitle>
          <PageHeaderDescription>Your profile, workspace, billing and preferences.</PageHeaderDescription>
        </PageHeaderContent>
      </PageHeader>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-[12rem_minmax(0,1fr)] lg:gap-10">
        <SettingsNav aria-label="Settings" className="md:sticky md:top-20 md:self-start">
          {pages.map((p) => (
            <SettingsNavItem key={p.href} icon={p.icon} isActive={route === p.href} render={<AppLink href={p.href} />}>
              {p.label}
            </SettingsNavItem>
          ))}
        </SettingsNav>
        <div className="flex max-w-3xl min-w-0 flex-col gap-10">{children}</div>
      </div>
    </>
  )
}
