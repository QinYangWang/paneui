"use client"

import * as React from "react"

import { CopyIcon, EditIcon, LogOutIcon, MoreHorizontalIcon, SettingsIcon, TrashIcon, UserIcon } from "@/components/icons"
import { Button } from "@/registry/base-nova/ui/button"
import {
  Menu,
  MenuCheckboxItem,
  MenuContent,
  MenuGroup,
  MenuItem,
  MenuLabel,
  MenuRadioGroup,
  MenuRadioItem,
  MenuSeparator,
  MenuShortcut,
  MenuSub,
  MenuSubContent,
  MenuSubTrigger,
  MenuTrigger,
} from "@/registry/base-nova/ui/menu"

export default function MenuDemo() {
  const [notify, setNotify] = React.useState(true)
  const [density, setDensity] = React.useState("comfortable")
  return (
    <div className="flex items-center gap-3">
      <Menu>
        <MenuTrigger render={<Button variant="secondary" />}>
          <UserIcon data-icon="inline-start" />
          Account
        </MenuTrigger>
        <MenuContent className="w-56">
          <MenuGroup>
            <MenuLabel>qinyang@example.com</MenuLabel>
            <MenuItem>
              <UserIcon />
              Profile
              <MenuShortcut>⌘P</MenuShortcut>
            </MenuItem>
            <MenuItem>
              <SettingsIcon />
              Settings
              <MenuShortcut>⌘,</MenuShortcut>
            </MenuItem>
          </MenuGroup>
          <MenuSeparator />
          <MenuCheckboxItem checked={notify} onCheckedChange={setNotify}>
            Notifications
          </MenuCheckboxItem>
          <MenuSub>
            <MenuSubTrigger>Density</MenuSubTrigger>
            <MenuSubContent>
              <MenuRadioGroup value={density} onValueChange={setDensity}>
                <MenuRadioItem value="compact">Compact</MenuRadioItem>
                <MenuRadioItem value="comfortable">Comfortable</MenuRadioItem>
                <MenuRadioItem value="spacious">Spacious</MenuRadioItem>
              </MenuRadioGroup>
            </MenuSubContent>
          </MenuSub>
          <MenuSeparator />
          <MenuItem>
            <LogOutIcon />
            Sign out
          </MenuItem>
        </MenuContent>
      </Menu>

      <Menu>
        <MenuTrigger render={<Button variant="ghost" size="icon" aria-label="More" />}>
          <MoreHorizontalIcon />
        </MenuTrigger>
        <MenuContent align="end">
          <MenuItem>
            <EditIcon />
            Rename
          </MenuItem>
          <MenuItem>
            <CopyIcon />
            Duplicate
          </MenuItem>
          <MenuSeparator />
          <MenuItem variant="destructive">
            <TrashIcon />
            Delete
          </MenuItem>
        </MenuContent>
      </Menu>
    </div>
  )
}
