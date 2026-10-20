import { ArrowUpIcon } from "@paneui/ui/icons"
import { ScrollTo } from "@paneui/ui/components/scroll-to"

export default function ScrollToWindow() {
  return (
    <ScrollTo to={0} variant="ghost" size="sm">
      <ArrowUpIcon data-icon="inline-start" />
      Back to top of page
    </ScrollTo>
  )
}
