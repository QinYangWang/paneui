"use client"

import { ClockIcon, SettingsIcon } from "@/components/icons"
import { Collapsible, CollapsiblePanel, CollapsibleTrigger } from "@/registry/base-nova/ui/collapsible"
import { Switch } from "@/registry/base-nova/ui/switch"
import { Label } from "@/registry/base-nova/ui/label"

export default function CollapsibleDemo() {
  return (
    <Collapsible className="w-full max-w-sm rounded-2xl bg-card p-1 shadow-raised">
      <CollapsibleTrigger className="w-full">
        <SettingsIcon className="text-muted-foreground" />
        Advanced settings
      </CollapsibleTrigger>
      <CollapsiblePanel>
        <div className="flex flex-col gap-3 px-3 pt-2 pb-2.5">
          <Label className="gap-3">
            <Switch defaultChecked />
            Retry failed tasks automatically
          </Label>
          <Label className="gap-3">
            <Switch />
            Run on battery power
          </Label>
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <ClockIcon className="size-3.5" />
            Changes apply to the next scheduled run.
          </p>
        </div>
      </CollapsiblePanel>
    </Collapsible>
  )
}
