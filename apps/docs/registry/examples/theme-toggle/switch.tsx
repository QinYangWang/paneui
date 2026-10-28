import { ThemeSwitch } from "@paneui/ui/components/theme-toggle"

export default function ThemeToggleSwitch() {
  return (
    <div className="flex items-center gap-4">
      <ThemeSwitch />
      <ThemeSwitch modes="tri" />
    </div>
  )
}
