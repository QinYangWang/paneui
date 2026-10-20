"use client"

import * as React from "react"

import { MicIcon, MonitorIcon, UsersIcon } from "@paneui/ui/icons"
import { ExpandableButton } from "@paneui/ui/components/expandable-control"

const TOOLS = [
  { id: "mic", icon: <MicIcon />, label: "Microphone on" },
  { id: "screen", icon: <MonitorIcon />, label: "Sharing screen" },
  { id: "people", icon: <UsersIcon />, label: "4 participants" },
]

export default function ExpandableControlControlled() {
  const [active, setActive] = React.useState<string | null>("mic")
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center gap-2">
        {TOOLS.map((tool) => (
          <ExpandableButton
            key={tool.id}
            icon={tool.icon}
            label={tool.label}
            expanded={active === tool.id}
            onExpandedChange={(open) => setActive(open ? tool.id : null)}
          />
        ))}
      </div>
      <p className="text-xs text-muted-foreground">Only one control stays open at a time.</p>
    </div>
  )
}
