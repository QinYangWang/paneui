"use client"

import * as React from "react"

import { BracesIcon, FileIcon, TerminalIcon } from "@paneui/ui/icons"
import { SidebarNav, SidebarNavContent, SidebarNavLink, SidebarNavList, SidebarNavSection } from "@paneui/ui/components/sidebar-nav"

/** Rows and group labels without an icon start where the icon rows' text starts. */
export default function SidebarNavIconGroups() {
  const [current, setCurrent] = React.useState("#api-client")
  const go = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    setCurrent(href)
  }
  const link = (href: string, label: string, icon?: React.ReactNode) => (
    <SidebarNavLink href={href} icon={icon} onClick={go(href)} active={current === href}>
      {label}
    </SidebarNavLink>
  )
  return (
    <div className="flex h-72 w-60 flex-col overflow-hidden rounded-xl bg-background shadow-raised">
      <SidebarNav>
        <SidebarNavContent aria-label="Reference" className="pt-3">
          <SidebarNavSection label="Reference">
            <SidebarNavList>{link("#cli", "CLI", <TerminalIcon />)}</SidebarNavList>
            <SidebarNavSection
              level="group"
              label="API"
              icon={<BracesIcon />}
              labelRender={<a href="#api" onClick={go("#api")} />}
              active={current === "#api"}
            >
              <SidebarNavList>
                {link("#api-client", "Client")}
                {link("#api-server", "Server")}
              </SidebarNavList>
            </SidebarNavSection>
            <SidebarNavSection level="group" label="Guides" labelRender={<a href="#guides" onClick={go("#guides")} />} active={current === "#guides"}>
              <SidebarNavList>{link("#guides-deploy", "Deploy")}</SidebarNavList>
            </SidebarNavSection>
            <SidebarNavList>{link("#output", "Output", <FileIcon />)}</SidebarNavList>
          </SidebarNavSection>
        </SidebarNavContent>
      </SidebarNav>
    </div>
  )
}
