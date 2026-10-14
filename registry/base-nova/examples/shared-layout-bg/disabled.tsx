import { CopyIcon, EditIcon, LinkIcon, TrashIcon } from "@/components/icons"
import { SharedLayoutBg, SharedLayoutBgItem } from "@/registry/base-nova/ui/shared-layout-bg"

const actions = [
  { label: "Rename", icon: EditIcon },
  { label: "Duplicate", icon: CopyIcon },
  { label: "Copy link", icon: LinkIcon, disabled: true },
  { label: "Delete", icon: TrashIcon },
]

export default function SharedLayoutBgDisabled() {
  return (
    <div role="menu" aria-label="File actions" className="w-full max-w-52 rounded-xl bg-popover p-1 shadow-surface">
      <SharedLayoutBg pillClassName="rounded-md">
        {actions.map(({ label, icon: Icon, disabled }) => (
          <SharedLayoutBgItem
            key={label}
            role="menuitem"
            tabIndex={disabled ? -1 : 0}
            disabled={disabled}
            className="h-8 gap-2 rounded-md px-2.5 text-sm outline-none"
          >
            <Icon size={16} className="text-muted-foreground" />
            {label}
          </SharedLayoutBgItem>
        ))}
      </SharedLayoutBg>
    </div>
  )
}
