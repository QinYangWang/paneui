import { BellIcon, BoltIcon, ShieldIcon, SparklesIcon, ThumbsUpIcon, WarningIcon } from "@paneui/ui/icons"
import { IconChip } from "@paneui/ui/components/icon-chip"

export default function IconChipTones() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <IconChip tone="neutral">
        <BellIcon />
      </IconChip>
      <IconChip tone="primary">
        <SparklesIcon />
      </IconChip>
      <IconChip tone="success">
        <ThumbsUpIcon />
      </IconChip>
      <IconChip tone="warning">
        <WarningIcon />
      </IconChip>
      <IconChip tone="destructive">
        <ShieldIcon />
      </IconChip>
      <IconChip tone="solid">
        <BoltIcon />
      </IconChip>
    </div>
  )
}
