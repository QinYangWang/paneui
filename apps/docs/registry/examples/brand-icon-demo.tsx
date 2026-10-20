"use client"

import * as React from "react"
import {
  siAirtable,
  siAnthropic,
  siApple,
  siAsana,
  siAtlassian,
  siBitbucket,
  siCloudflare,
  siDiscord,
  siDocker,
  siDropbox,
  siFigma,
  siFirebase,
  siGithub,
  siGitlab,
  siGmail,
  siGoogle,
  siGoogledrive,
  siGooglegemini,
  siHubspot,
  siHuggingface,
  siIntercom,
  siJira,
  siLinear,
  siLoom,
  siMailchimp,
  siMedium,
  siMiro,
  siMistralai,
  siMongodb,
  siNetlify,
  siNotion,
  siNpm,
  siOllama,
  siPaypal,
  siPostgresql,
  siRailway,
  siReddit,
  siResend,
  siSentry,
  siShopify,
  siStripe,
  siSupabase,
  siTelegram,
  siTrello,
  siVercel,
  siWhatsapp,
  siX,
  siYoutube,
  siZapier,
  siZoom,
} from "simple-icons"

import { SearchIcon } from "@paneui/ui/icons"
import { BrandIcon } from "@paneui/ui/components/brand-icon"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@paneui/ui/components/input-group"
import { SegmentedControl, SegmentedControlItem } from "@paneui/ui/components/segmented-control"

const BRANDS = [
  siGithub, siGitlab, siBitbucket, siLinear, siJira, siAtlassian, siNotion, siFigma, siMiro, siLoom,
  siVercel, siNetlify, siCloudflare, siRailway, siSupabase, siFirebase, siPostgresql, siMongodb, siDocker, siNpm,
  siStripe, siPaypal, siShopify, siHubspot, siIntercom, siMailchimp, siResend, siSentry, siZapier, siAirtable,
  siAsana, siTrello, siGoogle, siGmail, siGoogledrive, siDropbox, siZoom, siDiscord, siTelegram, siWhatsapp,
  siX, siReddit, siYoutube, siMedium, siApple, siAnthropic, siGooglegemini, siMistralai, siHuggingface, siOllama,
]

export default function BrandIconDemo() {
  const [query, setQuery] = React.useState("")
  const [color, setColor] = React.useState<"current" | "brand">("brand")
  const q = query.trim().toLowerCase()
  const shown = BRANDS.filter((b) => !q || b.title.toLowerCase().includes(q))

  return (
    <div className="flex w-full max-w-2xl flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <InputGroup className="min-w-48 flex-1">
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
          <InputGroupInput value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search brands" aria-label="Search brands" />
        </InputGroup>
        <SegmentedControl value={color} onValueChange={(v) => setColor(v as "current" | "brand")} aria-label="Colour">
          <SegmentedControlItem value="brand">Brand</SegmentedControlItem>
          <SegmentedControlItem value="current">Current</SegmentedControlItem>
        </SegmentedControl>
      </div>
      {shown.length ? (
        <ul className="grid grid-cols-3 gap-2 sm:grid-cols-5">
          {shown.map((b) => (
            <li key={b.slug} className="flex flex-col items-center gap-2 rounded-xl bg-card px-2 py-3 shadow-raised">
              <BrandIcon icon={b} color={color} size={24} />
              <span className="w-full truncate text-center text-ui-xs text-muted-foreground">{b.title}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="py-8 text-center text-sm text-muted-foreground">No brand matches “{query}”.</p>
      )}
    </div>
  )
}
