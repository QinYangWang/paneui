import { ThemeToggle } from "@/registry/base-nova/ui/theme-toggle"

export default function ThemeToggleSlowReveal() {
  return (
    <div className="flex items-center gap-6 text-sm text-muted-foreground">
      <div className="flex items-center gap-3">
        <ThemeToggle duration={300} />
        300ms
      </div>
      <div className="flex items-center gap-3">
        <ThemeToggle duration={1200} />
        1200ms
      </div>
    </div>
  )
}
