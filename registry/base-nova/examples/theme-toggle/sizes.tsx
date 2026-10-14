import { ThemeToggle } from "@/registry/base-nova/ui/theme-toggle"

export default function ThemeToggleSizes() {
  return (
    <div className="flex items-center gap-3">
      <ThemeToggle iconSize={14} className="size-8" />
      <ThemeToggle />
      <ThemeToggle iconSize={20} className="size-11" />
    </div>
  )
}
