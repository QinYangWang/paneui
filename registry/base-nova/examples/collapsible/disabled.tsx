import { Collapsible, CollapsiblePanel, CollapsibleTrigger } from "@/registry/base-nova/ui/collapsible"

export default function CollapsibleDisabled() {
  return (
    <Collapsible disabled className="w-full max-w-sm">
      <CollapsibleTrigger className="w-full">Developer options (admins only)</CollapsibleTrigger>
      <CollapsiblePanel>
        <p className="px-3 pt-2 text-sm text-muted-foreground">API keys and webhooks.</p>
      </CollapsiblePanel>
    </Collapsible>
  )
}
