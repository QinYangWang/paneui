import { BookmarkIcon, FileIcon, GlobeIcon, LockIcon, StarIcon } from "@/components/icons"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarItem,
  SidebarMenu,
  SidebarProvider,
} from "@/registry/base-nova/ui/animated-sidebar"

export default function AnimatedSidebarStatic() {
  return (
    <SidebarProvider shortcut={null} className="h-72 w-auto">
      <Sidebar collapsible="none">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Library</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarItem icon={<FileIcon />} label="All notes" href="#all-notes" isActive />
              <SidebarItem icon={<StarIcon />} label="Starred" href="#starred" badge={5} />
              <SidebarItem icon={<BookmarkIcon />} label="Reading list" href="#reading-list" />
              <SidebarItem icon={<GlobeIcon />} label="Published" href="#published" />
              <SidebarItem icon={<LockIcon />} label="Private vault" href="#vault" disabled />
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  )
}
