import { BellIcon, FolderIcon, HomeIcon, SettingsIcon } from "@/components/icons"
import { SharedLayoutBg, SharedLayoutBgItem } from "@/registry/base-nova/ui/shared-layout-bg"

const links = [
  { label: "Overview", icon: HomeIcon, hint: "⌘1" },
  { label: "Projects", icon: FolderIcon, hint: "⌘2" },
  { label: "Notifications", icon: BellIcon, hint: "⌘3" },
  { label: "Settings", icon: SettingsIcon, hint: "⌘," },
]

export default function SharedLayoutBgDemo() {
  return (
    <nav aria-label="Workspace" className="w-full max-w-60">
      <SharedLayoutBg className="gap-0.5">
        {links.map(({ label, icon: Icon, hint }) => (
          <SharedLayoutBgItem
            key={label}
            render={<a href="#" />}
            className="h-9 gap-2.5 rounded-xl px-3 text-sm font-medium text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:text-foreground data-active:text-foreground"
          >
            <Icon size={16} />
            <span className="flex-1">{label}</span>
            <kbd className="font-sans text-xs text-muted-foreground">{hint}</kbd>
          </SharedLayoutBgItem>
        ))}
      </SharedLayoutBg>
    </nav>
  )
}
