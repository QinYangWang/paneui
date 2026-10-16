import { siClaude, siGooglegemini } from "simple-icons"

import { ApertureIcon, BotIcon } from "@/components/icons"
import { cn } from "@/lib/utils"
import { BrandIcon } from "@/registry/base-nova/ui/brand-icon"

import type { AgentProvider } from "./agents"

/**
 * Mark for an agent provider: the vendor's logo where the brand icon package has one, a
 * neutral glyph from the icon set where it does not (some vendors do not distribute their
 * mark in icon packs) and for custom agents.
 */
export function ProviderIcon({ provider, className }: { provider: string | undefined; className?: string }) {
  const p = (provider ?? "custom") as AgentProvider
  if (p === "claude") return <BrandIcon icon={siClaude} color="brand" className={className} />
  if (p === "gemini") return <BrandIcon icon={siGooglegemini} color="brand" className={className} />
  const Icon = p === "codex" ? ApertureIcon : BotIcon
  return <Icon className={cn(p === "codex" ? "text-foreground" : "text-muted-foreground", className)} />
}
