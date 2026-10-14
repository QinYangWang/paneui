import { ExpandingArrowButton } from "@/registry/base-nova/ui/expanding-arrow-button"

export default function ExpandingArrowButtonAccents() {
  return (
    <div className="flex flex-col items-center gap-3">
      <ExpandingArrowButton accentClassName="bg-foreground text-background">Read the changelog</ExpandingArrowButton>
      <ExpandingArrowButton accentClassName="bg-warning text-black">Review open issues</ExpandingArrowButton>
      <ExpandingArrowButton accentClassName="bg-destructive text-white">Go to danger zone</ExpandingArrowButton>
      <ExpandingArrowButton labelClassName="tabular-nums">Resolve 12 comments</ExpandingArrowButton>
    </div>
  )
}
