import { SettingsIcon } from "@/components/icons"
import { Button } from "@/registry/base-nova/ui/button"

export default function ButtonIcon() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button variant="secondary" size="icon-xs" aria-label="Settings">
        <SettingsIcon />
      </Button>
      <Button variant="secondary" size="icon-sm" aria-label="Settings">
        <SettingsIcon />
      </Button>
      <Button variant="secondary" size="icon" aria-label="Settings">
        <SettingsIcon />
      </Button>
      <Button variant="secondary" size="icon-lg" aria-label="Settings">
        <SettingsIcon />
      </Button>
    </div>
  )
}
