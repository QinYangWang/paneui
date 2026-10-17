import { LogOutIcon, SettingsIcon, UserIcon } from "@/components/icons"
import { MenuGroup, MenuItem, MenuSeparator } from "@/registry/base-nova/ui/menu"
import { UserMenu } from "@/registry/base-nova/ui/user-menu"

export default function UserMenuDemo() {
  return (
    <div className="w-60 frame-3xl frame-p-2 bg-shell">
      <UserMenu name="Dana Chen" email="dana@northwind.dev" side="bottom">
        <MenuGroup>
          <MenuItem>
            <UserIcon />
            Profile
          </MenuItem>
          <MenuItem>
            <SettingsIcon />
            Settings
          </MenuItem>
        </MenuGroup>
        <MenuSeparator />
        <MenuItem variant="destructive">
          <LogOutIcon className="rtl:-scale-x-100" />
          Sign out
        </MenuItem>
      </UserMenu>
    </div>
  )
}
