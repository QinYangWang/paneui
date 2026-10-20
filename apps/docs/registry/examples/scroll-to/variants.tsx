import { ArrowDownIcon } from "@paneui/ui/icons"
import { ScrollTo } from "@paneui/ui/components/scroll-to"
import { SmoothScroll } from "@paneui/ui/components/smooth-scroll"

export default function ScrollToVariants() {
  return (
    <SmoothScroll className="h-72 w-full max-w-md rounded-2xl bg-muted shadow-well">
      <div className="flex flex-wrap items-center gap-2 p-4">
        <ScrollTo to="#scroll-to-variants-pricing" offset={-16}>
          Secondary
        </ScrollTo>
        <ScrollTo to="#scroll-to-variants-pricing" offset={-16} variant="default">
          See pricing
        </ScrollTo>
        <ScrollTo to="#scroll-to-variants-pricing" offset={-16} variant="ghost" size="sm">
          Ghost <ArrowDownIcon data-icon="inline-end" />
        </ScrollTo>
        <ScrollTo to="#scroll-to-variants-pricing" offset={-16} variant="outline" size="icon" aria-label="Jump to pricing">
          <ArrowDownIcon />
        </ScrollTo>
      </div>
      <div className="h-96" />
      <section id="scroll-to-variants-pricing" className="m-4 rounded-xl bg-card p-5 shadow-raised">
        <h3 className="text-balance text-base font-semibold">Pricing</h3>
        <p className="mt-1 text-sm text-muted-foreground">Free for one person. $8 a month for households of up to five.</p>
      </section>
    </SmoothScroll>
  )
}
