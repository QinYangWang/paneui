"use client"

import * as React from "react"

import { WorkspaceSwitcher } from "@/registry/base-nova/ui/workspace-switcher"

const workspaces = [
  { id: "northwind", name: "Northwind", plan: "Team · 24 seats" },
  { id: "labs", name: "Northwind Labs", plan: "Solo" },
  { id: "acme", name: "Acme Robotics", plan: "Enterprise" },
]

export default function WorkspaceSwitcherDemo() {
  const [value, setValue] = React.useState("northwind")
  return (
    <div className="w-60 rounded-2xl bg-shell p-2">
      <WorkspaceSwitcher workspaces={workspaces} value={value} onValueChange={setValue} onCreate={() => {}} />
    </div>
  )
}
