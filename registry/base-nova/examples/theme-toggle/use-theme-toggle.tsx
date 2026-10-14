"use client"

import { MonitorIcon, MoonIcon, SunIcon } from "@/components/icons"
import { Button } from "@/registry/base-nova/ui/button"
import { useThemeToggle } from "@/registry/base-nova/ui/theme-toggle"

export default function ThemeToggleUseThemeToggle() {
  const { theme, setTheme } = useThemeToggle()
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex gap-2">
        <Button
          variant={theme === "light" ? "default" : "secondary"}
          onClick={(event) => setTheme("light", { origin: { x: event.clientX, y: event.clientY } })}
        >
          <SunIcon data-icon="inline-start" />
          Light
        </Button>
        <Button
          variant={theme === "dark" ? "default" : "secondary"}
          onClick={(event) => setTheme("dark", { origin: { x: event.clientX, y: event.clientY } })}
        >
          <MoonIcon data-icon="inline-start" />
          Dark
        </Button>
      </div>
      <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <MonitorIcon size={14} />
        Current theme: {theme ?? "…"}
      </p>
    </div>
  )
}
