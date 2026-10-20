import { CheckIcon } from "@paneui/ui/icons"
import { Button } from "@paneui/ui/components/button"
import { Menu, MenuContent, MenuGroup, MenuItem, MenuLabel, MenuSeparator, MenuTrigger } from "@paneui/ui/components/menu"

export default function MenuInset() {
  return (
    <Menu>
      <MenuTrigger render={<Button variant="secondary" />}>Workspace</MenuTrigger>
      <MenuContent>
        <MenuGroup>
          <MenuLabel inset>Switch workspace</MenuLabel>
          <MenuItem>
            <CheckIcon />
            paneui
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
