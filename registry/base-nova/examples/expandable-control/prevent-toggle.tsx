"use client"

import * as React from "react"

import { BellIcon } from "@/components/icons"
import { ExpandableButton } from "@/registry/base-nova/ui/expandable-control"
import { Switch } from "@/registry/base-nova/ui/switch"

export default function ExpandableControlPreventToggle() {
  const [allowed, setAllowed] = React.useState(false)
  return (
    <div className="flex flex-col items-center gap-4">
      <ExpandableButton
        icon={<BellIcon />}
        label="Alerts paused"
        onClick={(event) => {
          if (!allowed) event.preventDefault()
        }}
      />
      <label className="flex items-center gap-2 text-sm">
        <Switch checked={allowed} onCheckedChange={setAllowed} />
        Allow pausing alerts
      </label>
    </div>
  )
}
