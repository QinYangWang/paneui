import { CopyIcon, EditIcon, LinkIcon, TrashIcon } from "@paneui/ui/icons"
import { SharedLayoutBg, SharedLayoutBgItem } from "@paneui/ui/components/shared-layout-bg"

const actions = [
  { label: "Rename", icon: EditIcon },
  { label: "Duplicate", icon: CopyIcon },
  { label: "Copy link", icon: LinkIcon, disabled: true },
  { label: "Delete", icon: TrashIcon },
]

export default function SharedLayoutBgDisabled() {
  return (
    <div role="menu" aria-label="File actions" className="w-full max-w-52 frame-xl frame-p-1 bg-popover shadow-surface">
      <SharedLayoutBg pillClassName="rounded-inner">
        {actions.map(({ label, icon: Icon, disabled }) => (
          <SharedLayoutBgItem
            key={label}
            role="menuitem"
            tabIndex={disabled ? -1 : 0}
            disabled={disabled}
            className="h-8 gap-2 px-2.5 text-sm outline-none"
          >
            <Icon size={16} className="text-muted-foreground" />
            {label}
          </SharedLayoutBgItem>
        ))}
      </SharedLayoutBg>
    </div>
  )
}
