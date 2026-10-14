import { ArrowUpIcon } from "@/components/icons"
import { ScrollTo } from "@/registry/base-nova/ui/scroll-to"

export default function ScrollToWindow() {
  return (
    <ScrollTo to={0} variant="ghost" size="sm">
      <ArrowUpIcon data-icon="inline-start" />
      Back to top of page
    </ScrollTo>
  )
}
