import { LogOutIcon } from "@/components/icons"
import { MenuItem } from "@/registry/base-nova/ui/menu"
import { UserMenu } from "@/registry/base-nova/ui/user-menu"

export default function UserMenuCompact() {
  return (
    <UserMenu name="Kenji Sato" email="kenji@northwind.dev" variant="compact" side="bottom" align="end">
      <MenuItem variant="destructive">
        <LogOutIcon className="rtl:-scale-x-100" />
        Sign out
      </MenuItem>
    </UserMenu>
  )
}
