"use client"

import * as React from "react"

import { BellIcon, CreditCardIcon, PaletteIcon, UserIcon } from "@paneui/ui/icons"
import { SettingsNav, SettingsNavItem } from "@paneui/ui/components/settings-section"

const pages = [
  { id: "profile", label: "Profile", icon: <UserIcon /> },
  { id: "billing", label: "Billing", icon: <CreditCardIcon /> },
  { id: "notifications", label: "Notifications", icon: <BellIcon /> },
  { id: "appearance", label: "Appearance", icon: <PaletteIcon /> },
]

export default function SettingsNavExample() {
  const [active, setActive] = React.useState("billing")
  return (
    <SettingsNav aria-label="Settings" className="w-48">
      {pages.map((p) => (
        <SettingsNavItem
          key={p.id}
          icon={p.icon}
          isActive={active === p.id}
          href={`#${p.id}`}
          onClick={(e: React.MouseEvent) => {
            e.preventDefault()
            setActive(p.id)
          }}
        >
          {p.label}
        </SettingsNavItem>
      ))}
    </SettingsNav>
  )
}
