import { AsciiSpinner } from "@/registry/base-nova/ui/reasoning-text"

export default function ReasoningTextAsciiSpinner() {
  return (
    <div className="flex flex-col gap-2 font-mono text-sm text-muted-foreground">
      <span className="inline-flex items-center gap-2">
        <AsciiSpinner kind="dots" /> pnpm install
      </span>
      <span className="inline-flex items-center gap-2">
        <AsciiSpinner kind="line" interval={120} /> next build
      </span>
      <span className="inline-flex items-center gap-2">
        <AsciiSpinner kind="star" interval={160} /> vitest run
      </span>
    </div>
  )
}
