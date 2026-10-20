import { InboxIcon } from "@paneui/ui/icons"
import { IconChip } from "@paneui/ui/components/icon-chip"

export default function IconChipSizes() {
  return (
    <div className="flex flex-wrap items-end justify-center gap-3">
      <IconChip size="sm">
        <InboxIcon />
      </IconChip>
      <IconChip>
        <InboxIcon />
      </IconChip>
      <IconChip size="lg">
        <InboxIcon />
      </IconChip>
      <IconChip size="xl">
        <InboxIcon />
      </IconChip>
    </div>
  )
}
