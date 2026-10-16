import { LogOutIcon, SettingsIcon, UserIcon } from "@/components/icons"
import { MenuGroup, MenuItem, MenuSeparator } from "@/registry/base-nova/ui/menu"
import { UserMenu } from "@/registry/base-nova/ui/user-menu"

export default function UserMenuDemo() {
  return (
    <div className="w-60 rounded-3xl bg-shell p-2">
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
          <LogOutIcon />
          Sign out
        </MenuItem>
      </UserMenu>
    </div>
  )
}
