"use client"

import * as React from "react"
import {
  siDiscord,
  siFigma,
  siGithub,
  siGitlab,
  siGoogledrive,
  siJira,
  siLinear,
  siNotion,
  siSentry,
  siStripe,
  siVercel,
  siZapier,
} from "simple-icons"

import { SearchIcon } from "@paneui/ui/icons"
import { Badge } from "@paneui/ui/components/badge"
import { BrandIcon, type BrandIconData } from "@paneui/ui/components/brand-icon"
import { Button } from "@paneui/ui/components/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@paneui/ui/components/card"
import { EmptyState, EmptyStateDescription, EmptyStateTitle } from "@paneui/ui/components/empty-state"
import { IconChip } from "@paneui/ui/components/icon-chip"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@paneui/ui/components/input-group"
import { SegmentedControl, SegmentedControlItem } from "@paneui/ui/components/segmented-control"
import {
  SettingsSection,
  SettingsSectionDescription,
  SettingsSectionHeader,
  SettingsSectionTitle,
} from "@paneui/ui/components/settings-section"
import { useToast } from "@paneui/ui/components/toast"

type Kind = "code" | "alerts" | "docs" | "billing"
type Integration = { id: string; icon: BrandIconData; kind: Kind; description: string }

const INTEGRATIONS: Integration[] = [
  { id: "github", icon: siGithub, kind: "code", description: "Open pull requests from agent runs and post checks." },
  { id: "gitlab", icon: siGitlab, kind: "code", description: "Mirror runs to merge requests and pipelines." },
  { id: "vercel", icon: siVercel, kind: "code", description: "Run agents against every preview deployment." },
  { id: "linear", icon: siLinear, kind: "docs", description: "Turn issues into tasks and close them when runs land." },
  { id: "jira", icon: siJira, kind: "docs", description: "Sync task status with your boards." },
  { id: "notion", icon: siNotion, kind: "docs", description: "Publish run summaries to a database." },
  { id: "figma", icon: siFigma, kind: "docs", description: "Attach frames to tasks as context." },
  { id: "google-drive", icon: siGoogledrive, kind: "docs", description: "Read specs and briefs from shared folders." },
  { id: "sentry", icon: siSentry, kind: "alerts", description: "Send new errors to triage automatically." },
  { id: "discord", icon: siDiscord, kind: "alerts", description: "Post run results to a channel." },
  { id: "zapier", icon: siZapier, kind: "alerts", description: "Trigger runs from any app you already use." },
  { id: "stripe", icon: siStripe, kind: "billing", description: "Pass usage to invoices for your own customers." },
]

const KINDS: { value: "all" | Kind; label: string }[] = [
  { value: "all", label: "All" },
  { value: "code", label: "Code" },
  { value: "docs", label: "Planning" },
  { value: "alerts", label: "Alerts" },
  { value: "billing", label: "Billing" },
]

/** `/dashboard/settings/integrations` */
export function IntegrationsSettings() {
  const toast = useToast()
  const [connected, setConnected] = React.useState<Set<string>>(() => new Set(["github", "linear", "sentry"]))
  const [kind, setKind] = React.useState<"all" | Kind>("all")
  const [query, setQuery] = React.useState("")
  const q = query.trim().toLowerCase()
  const shown = INTEGRATIONS.filter(
    (i) => (kind === "all" || i.kind === kind) && (!q || i.icon.title.toLowerCase().includes(q) || i.description.toLowerCase().includes(q))
  )

  const toggle = (i: Integration) => {
    const on = connected.has(i.id)
    setConnected((s) => {
      const next = new Set(s)
      if (on) next.delete(i.id)
      else next.add(i.id)
      return next
    })
    toast.add(on ? { title: `${i.icon.title} disconnected` } : { title: `${i.icon.title} connected`, type: "success" })
  }

  return (
    <SettingsSection>
      <SettingsSectionHeader>
        <SettingsSectionTitle>Integrations</SettingsSectionTitle>
        <SettingsSectionDescription>Connect the tools your team already works in.</SettingsSectionDescription>
      </SettingsSectionHeader>
      <div className="flex flex-wrap items-center gap-3">
        <InputGroup size="sm" className="min-w-48 flex-1 sm:max-w-64">
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
          <InputGroupInput value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search integrations" aria-label="Search integrations" />
        </InputGroup>
        <SegmentedControl size="sm" value={kind} onValueChange={(v) => setKind(v as "all" | Kind)} aria-label="Category">
          {KINDS.map((k) => (
            <SegmentedControlItem key={k.value} value={k.value}>
              {k.label}
            </SegmentedControlItem>
          ))}
        </SegmentedControl>
      </div>
      {shown.length ? (
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {shown.map((i) => {
            const on = connected.has(i.id)
            return (
              <li key={i.id} className="flex">
                <Card className="w-full">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <IconChip>
                        <BrandIcon icon={i.icon} color="brand" />
                      </IconChip>
                      <CardTitle className="flex-1">{i.icon.title}</CardTitle>
                      {on && (
                        <Badge size="sm" variant="success">
                          Connected
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <CardDescription className="text-pretty">{i.description}</CardDescription>
                  </CardContent>
                  <CardFooter>
                    <Button size="sm" variant={on ? "ghost" : "outline"} onClick={() => toggle(i)}>
                      {on ? "Disconnect" : "Connect"}
                    </Button>
                  </CardFooter>
                </Card>
              </li>
            )
          })}
        </ul>
      ) : (
        <EmptyState variant="outline">
          <EmptyStateTitle>No integrations found</EmptyStateTitle>
          <EmptyStateDescription>Try another name or category.</EmptyStateDescription>
        </EmptyState>
      )}
    </SettingsSection>
  )
}
