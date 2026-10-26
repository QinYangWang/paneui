import { SharedLayoutBg, SharedLayoutBgItem } from "@paneui/ui/components/shared-layout-bg"
import { ScrollArea } from "@paneui/ui/components/scroll-area"

const tabs = ["Overview", "Deployments", "Analytics", "Logs", "Settings"]

export default function SharedLayoutBgHorizontal() {
  return (
    <ScrollArea orientation="horizontal" className="max-w-full" viewportProps={{ "aria-label": "Project" }}>
    <nav aria-label="Project" className="w-max">
      <SharedLayoutBg orientation="horizontal" className="gap-1">
        {tabs.map((tab) => (
          <SharedLayoutBgItem
            key={tab}
            render={<a href="#" />}
            className="h-8 rounded-lg px-3 text-sm font-medium text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:text-foreground"
          >
            {tab}
          </SharedLayoutBgItem>
        ))}
      </SharedLayoutBg>
    </nav>
    </ScrollArea>
  )
}
