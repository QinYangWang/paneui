import { DownloadIcon, EditIcon, LinkIcon, MoreVerticalIcon, TrashIcon } from "@/components/icons"
import { Button } from "@/registry/base-nova/ui/button"
import { Menu, MenuContent, MenuItem, MenuSeparator, MenuShortcut, MenuTrigger } from "@/registry/base-nova/ui/menu"

export default function MenuDisabledAndDestructive() {
  return (
    <Menu>
      <MenuTrigger render={<Button variant="secondary" size="icon" aria-label="Invoice actions" />}>
        <MoreVerticalIcon />
      </MenuTrigger>
      <MenuContent align="end">
        <MenuItem>
          <DownloadIcon />
          Download PDF
          <MenuShortcut>⌘D</MenuShortcut>
        </MenuItem>
        <MenuItem>
          <LinkIcon />
          Copy payment link
        </MenuItem>
        <MenuItem disabled>
          <EditIcon />
          Edit (already paid)
        </MenuItem>
        <MenuSeparator />
        <MenuItem variant="destructive">
          <TrashIcon />
          Void invoice
        </MenuItem>
      </MenuContent>
    </Menu>
  )
}
