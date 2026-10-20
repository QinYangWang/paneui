import { Collapsible, CollapsiblePanel, CollapsibleTrigger } from "@paneui/ui/components/collapsible"

export default function CollapsibleDefaultOpen() {
  return (
    <Collapsible defaultOpen className="w-full max-w-sm">
      <CollapsibleTrigger className="w-full">Shipping details</CollapsibleTrigger>
      <CollapsiblePanel>
        <dl className="grid grid-cols-2 gap-2 px-3 pt-2 text-sm">
          <dt className="text-muted-foreground">Carrier</dt>
          <dd>SF Express</dd>
          <dt className="text-muted-foreground">Tracking</dt>
          <dd className="font-mono text-xs">SF1402387765</dd>
          <dt className="text-muted-foreground">Arrives</dt>
          <dd>Thursday, Oct 16</dd>
        </dl>
      </CollapsiblePanel>
    </Collapsible>
  )
}
