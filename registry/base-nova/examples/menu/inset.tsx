import { CheckIcon } from "@/components/icons"
import { Button } from "@/registry/base-nova/ui/button"
import { Menu, MenuContent, MenuGroup, MenuItem, MenuLabel, MenuSeparator, MenuTrigger } from "@/registry/base-nova/ui/menu"

export default function MenuInset() {
  return (
    <Menu>
      <MenuTrigger render={<Button variant="secondary" />}>Workspace</MenuTrigger>
      <MenuContent>
        <MenuGroup>
          <MenuLabel inset>Switch workspace</MenuLabel>
          <MenuItem>
            <CheckIcon />
            Taimatsu
          </MenuItem>
          <MenuItem inset>Novon</MenuItem>
          <MenuItem inset>Personal</MenuItem>
        </MenuGroup>
        <MenuSeparator />
        <MenuItem inset>Create workspace…</MenuItem>
      </MenuContent>
    </Menu>
  )
}
