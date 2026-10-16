import { ApertureIcon, AsteriskIcon, BotIcon, SparklesIcon } from "@/components/icons"
import { cn } from "@/lib/utils"

import type { AgentProvider } from "./agents"

const TONE: Record<AgentProvider, string> = {
  codex: "text-foreground",
  claude: "text-chart-5",
  gemini: "text-chart-1",
  custom: "text-muted-foreground",
}

/** Glyph for an agent provider (stand-ins, not the vendors' logos). */
export function ProviderIcon({ provider, className }: { provider: string | undefined; className?: string }) {
  const p = (provider ?? "custom") as AgentProvider
  const Icon = p === "codex" ? ApertureIcon : p === "claude" ? AsteriskIcon : p === "gemini" ? SparklesIcon : BotIcon
  return <Icon className={cn(TONE[p] ?? TONE.custom, className)} />
}
