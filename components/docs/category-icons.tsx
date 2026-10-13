import type * as React from "react"

import {
  BoltIcon,
  BotIcon,
  ChartIcon,
  CopyIcon,
  DatabaseIcon,
  EditIcon,
  EyeIcon,
  FileIcon,
  GridIcon,
  HomeIcon,
  SidebarIcon,
  SparklesIcon,
  TerminalIcon,
} from "@/components/icons"

type IconComponent = React.ComponentType<{ className?: string; size?: number }>

/** One icon per docs category (sidebar rail, command palette, gallery headings). */
export const categoryIcons: Record<string, IconComponent> = {
  Foundations: SparklesIcon,
  Forms: EditIcon,
  Overlays: CopyIcon,
  Display: EyeIcon,
  Navigation: SidebarIcon,
  Text: FileIcon,
  Motion: BoltIcon,
  Data: DatabaseIcon,
  Agents: BotIcon,
  Charts: ChartIcon,
  Blocks: GridIcon,
}

export const GalleryIcon: IconComponent = HomeIcon
export const InstallIcon: IconComponent = TerminalIcon

export const categorySlug = (category: string) => category.toLowerCase().replace(/\s+/g, "-")
