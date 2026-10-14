import { BookmarkIcon, FileIcon, FolderIcon, GlobeIcon, LockIcon } from "@/components/icons"
import { BounceSidebar, type BounceSidebarItem } from "@/registry/base-nova/ui/bounce-sidebar"

const items: BounceSidebarItem[] = [
  { id: "getting-started", label: "Getting started", icon: <FileIcon />, href: "#getting-started" },
  { id: "guides", label: "Guides", icon: <FolderIcon />, href: "#guides", meta: 14 },
  { id: "saved", label: "Saved", icon: <BookmarkIcon />, href: "#saved", meta: 3 },
  { id: "community", label: "Community", icon: <GlobeIcon />, href: "https://github.com", target: "_blank" },
  { id: "enterprise", label: "Enterprise", icon: <LockIcon />, href: "#enterprise", disabled: true },
]

export default function BounceSidebarLinks() {
  return (
    <div className="rounded-2xl bg-card p-2 shadow-surface">
      <BounceSidebar items={items} defaultValue="guides" label="Docs" />
    </div>
  )
}
