import type * as React from "react"

import {
  BoltIcon,
  BotIcon,
  ChartIcon,
  CopyIcon,
  EditIcon,
  FileIcon,
  GridIcon,
  HomeIcon,
  MonitorIcon,
  NavigationIcon,
  ServerIcon,
  ShapesIcon,
  SparklesIcon,
  TerminalSquareIcon,
} from "@/components/icons"

type IconComponent = React.ComponentType<{ className?: string; size?: number }>

/**
 * One icon per docs category (sidebar rail, command palette).
 * They render side by side, so all of them are solid puff shapes of the same
 * optical weight; no outlined ring or open line glyph belongs in this set.
 */
export const categoryIcons: Record<string, IconComponent> = {
  Templates: MonitorIcon,
  Foundations: SparklesIcon,
  Forms: EditIcon,
  Overlays: CopyIcon,
  Display: ShapesIcon,
  Navigation: NavigationIcon,
  Text: FileIcon,
  Motion: BoltIcon,
  Data: ServerIcon,
  Agents: BotIcon,
  Charts: ChartIcon,
  Blocks: GridIcon,
}

export const ComponentsIcon: IconComponent = HomeIcon
export const InstallIcon: IconComponent = TerminalSquareIcon

export const categorySlug = (category: string) => category.toLowerCase().replace(/\s+/g, "-")
