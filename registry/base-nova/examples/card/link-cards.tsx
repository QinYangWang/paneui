import { ArrowLeftIcon, ArrowRightIcon } from "@/components/icons"
import { Card } from "@/registry/base-nova/ui/card"

export default function CardLinkCards() {
  return (
    <nav aria-label="Pagination" className="grid w-full max-w-xl grid-cols-1 gap-3 sm:grid-cols-2">
      <Card interactive size="sm" render={<a href="#" rel="prev" />} className="gap-1 px-4">
        <span className="flex items-center gap-1 text-ui-sm text-muted-foreground">
          <ArrowLeftIcon className="size-3.5 rtl:-scale-x-100" />
          Previous
        </span>
        <span className="text-ui-lg font-medium">Installation</span>
      </Card>
      <Card interactive size="sm" render={<a href="#" rel="next" />} className="items-end gap-1 px-4 text-end">
        <span className="flex items-center gap-1 text-ui-sm text-muted-foreground">
          Next
          <ArrowRightIcon className="size-3.5 rtl:-scale-x-100" />
        </span>
        <span className="text-ui-lg font-medium">Theming</span>
      </Card>
    </nav>
  )
}
