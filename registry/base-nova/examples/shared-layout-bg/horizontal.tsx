import { SharedLayoutBg, SharedLayoutBgItem } from "@/registry/base-nova/ui/shared-layout-bg"

const tabs = ["Overview", "Deployments", "Analytics", "Logs", "Settings"]

export default function SharedLayoutBgHorizontal() {
  return (
    <nav aria-label="Project">
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
  )
}
