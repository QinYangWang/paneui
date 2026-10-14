"use client"

import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible"

import { ChevronDownIcon } from "@/components/icons"
import { cn } from "@/lib/utils"

function Collapsible({ className, ...props }: CollapsiblePrimitive.Root.Props) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" className={cn("flex flex-col", className)} {...props} />
}

/**
 * Trigger row. Shows a chevron that rotates when open; pass `chevron={false}`
 * (or use `render`) for a custom trigger.
 */
function CollapsibleTrigger({
  className,
  children,
  chevron = true,
  ...props
}: CollapsiblePrimitive.Trigger.Props & { chevron?: boolean }) {
  return (
    <CollapsiblePrimitive.Trigger
      data-slot="collapsible-trigger"
      className={cn(
        "group/collapsible-trigger inline-flex h-9 cursor-pointer items-center gap-2 rounded-lg px-3 text-sm font-medium text-foreground transition-[background-color,scale] duration-150 ease-out outline-none select-none hover:bg-accent focus-visible:ring-3 focus-visible:ring-ring active:scale-96 data-disabled:pointer-events-none data-disabled:opacity-50 data-panel-open:bg-muted/60 [&_svg]:size-4 [&_svg]:shrink-0",
        className
      )}
      {...props}
    >
      {children}
      {chevron && (
        <ChevronDownIcon
          data-slot="collapsible-chevron"
          className="ml-auto text-muted-foreground transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-data-panel-open/collapsible-trigger:rotate-180 motion-reduce:transition-none"
        />
      )}
    </CollapsiblePrimitive.Trigger>
  )
}

/** Panel that reveals with a smooth height transition and a soft content fade. */
function CollapsiblePanel({ className, children, ...props }: CollapsiblePrimitive.Panel.Props) {
  return (
    <CollapsiblePrimitive.Panel
      data-slot="collapsible-panel"
      className={cn(
        "group/collapsible-panel h-(--collapsible-panel-height) overflow-hidden transition-[height] duration-350 ease-[cubic-bezier(0.22,1,0.36,1)] data-ending-style:h-0 data-starting-style:h-0 motion-reduce:transition-none",
        className
      )}
      {...props}
    >
      <div
        data-slot="collapsible-content"
        className="transition-[opacity,translate,filter] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-data-ending-style/collapsible-panel:-translate-y-1 group-data-ending-style/collapsible-panel:opacity-0 group-data-ending-style/collapsible-panel:blur-[1px] group-data-starting-style/collapsible-panel:-translate-y-1 group-data-starting-style/collapsible-panel:opacity-0 group-data-starting-style/collapsible-panel:blur-[1px] motion-reduce:transition-none"
      >
        {children}
      </div>
    </CollapsiblePrimitive.Panel>
  )
}

export { Collapsible, CollapsibleTrigger, CollapsiblePanel }
