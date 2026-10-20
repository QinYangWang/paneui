"use client"

import * as React from "react"
import { siGithub, siLinear, siNotion, siSentry } from "simple-icons"

import { BrandIcon } from "@paneui/ui/components/brand-icon"
import { IconChip } from "@paneui/ui/components/icon-chip"
import { Switch } from "@paneui/ui/components/switch"

const APPS = [
  { icon: siGithub, detail: "Open pull requests from agent runs" },
  { icon: siLinear, detail: "Turn issues into tasks" },
  { icon: siSentry, detail: "Send new errors to triage" },
  { icon: siNotion, detail: "Publish run summaries" },
]

export default function BrandIconIntegrations() {
  const [on, setOn] = React.useState<Record<string, boolean>>({ GitHub: true, Linear: true })
  return (
    <ul className="flex w-full max-w-md flex-col divide-y divide-border rounded-xl bg-card shadow-raised">
      {APPS.map(({ icon, detail }) => (
        <li key={icon.slug} className="flex items-center gap-3 px-4 py-3">
          <IconChip>
            <BrandIcon icon={icon} color="brand" />
          </IconChip>
          <div className="flex min-w-0 flex-1 flex-col">
            <span className="text-ui font-medium">{icon.title}</span>
            <span className="truncate text-ui-sm text-muted-foreground">{detail}</span>
          </div>
          <Switch
            checked={!!on[icon.title]}
            onCheckedChange={(v) => setOn((s) => ({ ...s, [icon.title]: v }))}
            aria-label={`Connect ${icon.title}`}
          />
        </li>
      ))}
    </ul>
  )
}
