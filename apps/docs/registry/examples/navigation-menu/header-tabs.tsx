"use client"

import * as React from "react"

import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@paneui/ui/components/navigation-menu"

const sections = ["Docs", "Components", "Templates", "Changelog"]

export default function NavigationMenuHeaderTabs() {
  const [current, setCurrent] = React.useState("Docs")
  return (
    <div className="flex h-12 w-full max-w-xl items-stretch border-b border-border px-2">
      <NavigationMenu aria-label="Sections" className="h-full">
        <NavigationMenuList className="h-full items-stretch gap-1">
          {sections.map((s) => (
            <NavigationMenuItem key={s}>
              <NavigationMenuLink
                variant="tab"
                href="#"
                active={s === current}
                aria-current={s === current ? "page" : undefined}
                onClick={(e) => {
                  e.preventDefault()
                  setCurrent(s)
                }}
              >
                {s}
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}
