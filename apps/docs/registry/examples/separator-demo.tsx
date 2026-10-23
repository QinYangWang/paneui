import { Separator } from "@paneui/ui/components/separator"

export default function SeparatorDemo() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-3 text-ui">
      <div className="flex flex-col gap-1">
        <p className="font-medium">PaneUI</p>
        <p className="text-muted-foreground">Components for desktop-density apps.</p>
      </div>
      <Separator />
      <div className="flex h-4 items-center gap-3 text-muted-foreground">
        <span>Docs</span>
        <Separator orientation="vertical" />
        <span>Components</span>
        <Separator orientation="vertical" />
        <span>Templates</span>
      </div>
    </div>
  )
}
