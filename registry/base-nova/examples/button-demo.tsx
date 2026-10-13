import { SettingsIcon, SparklesIcon } from "@/components/icons"
import { Button } from "@/registry/base-nova/ui/button"

export default function ButtonDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button>Accept</Button>
      <Button variant="secondary">Alternatives</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Delete</Button>
      <Button variant="secondary">
        <SparklesIcon data-icon="inline-start" />
        Generate
      </Button>
      <Button size="icon" variant="secondary" aria-label="Settings">
        <SettingsIcon />
      </Button>
    </div>
  )
}
