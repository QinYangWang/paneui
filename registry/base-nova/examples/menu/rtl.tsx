"use client"

import * as React from "react"
import { DirectionProvider } from "@base-ui/react/direction-provider"
import { LogOutIcon, SettingsIcon, UserIcon } from "@/components/icons"
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

export default function MenuRtl() {
  const [notify, setNotify] = React.useState(true)
  const [density, setDensity] = React.useState("comfortable")
  return (
    <DirectionProvider direction="rtl">
      <div dir="rtl">
        <Menu>
          <MenuTrigger render={<Button variant="secondary" />}>
            <UserIcon data-icon="inline-start" />
            الحساب
          </MenuTrigger>
          <MenuContent className="w-56">
            <MenuGroup>
              <MenuLabel>qinyang@example.com</MenuLabel>
              <MenuItem>
                <UserIcon />
                الملف الشخصي
                <MenuShortcut>⌘P</MenuShortcut>
              </MenuItem>
              <MenuItem>
                <SettingsIcon />
                الإعدادات
                <MenuShortcut>⌘,</MenuShortcut>
              </MenuItem>
            </MenuGroup>
            <MenuSeparator />
            <MenuCheckboxItem checked={notify} onCheckedChange={setNotify}>
              الإشعارات
            </MenuCheckboxItem>
            <MenuSub>
              <MenuSubTrigger>الكثافة</MenuSubTrigger>
              <MenuSubContent>
                <MenuRadioGroup value={density} onValueChange={setDensity}>
                  <MenuRadioItem value="compact">مضغوطة</MenuRadioItem>
                  <MenuRadioItem value="comfortable">مريحة</MenuRadioItem>
                  <MenuRadioItem value="spacious">واسعة</MenuRadioItem>
                </MenuRadioGroup>
              </MenuSubContent>
            </MenuSub>
            <MenuSeparator />
            <MenuItem>
              <LogOutIcon className="rtl:-scale-x-100" />
              تسجيل الخروج
            </MenuItem>
          </MenuContent>
        </Menu>
      </div>
    </DirectionProvider>
  )
}
