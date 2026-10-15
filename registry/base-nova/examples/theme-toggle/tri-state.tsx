import { ThemeToggle } from "@/registry/base-nova/ui/theme-toggle"

export default function ThemeToggleTriState() {
  return (
    <div className="flex items-center gap-3">
      <ThemeToggle modes="tri" />
      <ThemeToggle modes="tri" variant="ghost" />
    </div>
  )
}
