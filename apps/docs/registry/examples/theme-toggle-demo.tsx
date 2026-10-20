import { ThemeToggle } from "@paneui/ui/components/theme-toggle"

export default function ThemeToggleDemo() {
  return (
    <div className="flex items-center gap-3 text-sm text-muted-foreground">
      <ThemeToggle />
      Click to repaint the page from the cursor
    </div>
  )
}
