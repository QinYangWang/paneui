"use client"

import { MonitorIcon, MoonIcon, SunIcon } from "@/components/icons"
import { SegmentedControl, SegmentedControlItem } from "@/registry/base-nova/ui/segmented-control"
import { useTheme, type ThemeMode } from "@/registry/base-nova/ui/theme-toggle"

const modes = [
  { value: "light", label: "Light", icon: SunIcon },
  { value: "dark", label: "Dark", icon: MoonIcon },
  { value: "system", label: "System", icon: MonitorIcon },
] as const

export default function ThemeToggleUseTheme() {
  const { theme, resolvedTheme, setTheme } = useTheme()
  return (
    <div className="flex flex-col items-center gap-3">
      <SegmentedControl value={theme ?? "system"} onValueChange={(v) => setTheme(v as ThemeMode)} aria-label="Theme">
        {modes.map(({ value, label, icon: Icon }) => (
          <SegmentedControlItem key={value} value={value}>
            <Icon />
            {label}
          </SegmentedControlItem>
        ))}
      </SegmentedControl>
      <p className="text-sm text-muted-foreground">Showing {resolvedTheme ?? "…"}</p>
    </div>
  )
}
