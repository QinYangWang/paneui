import { InboxIcon } from "@/components/icons"
import { IconChip } from "@/registry/base-nova/ui/icon-chip"

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
