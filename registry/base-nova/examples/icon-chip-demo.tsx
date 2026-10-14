import { BellIcon, BotIcon, QinyangLogoIcon, ShieldIcon, SparklesIcon, TerminalSquareIcon, ThumbsUpIcon } from "@/components/icons"
import { IconChip } from "@/registry/base-nova/ui/icon-chip"

const rows = [
  { icon: TerminalSquareIcon, title: "Deploy started", body: "web-app@a41f2c on production", tone: "neutral" },
  { icon: SparklesIcon, title: "Summary ready", body: "3 action items from standup", tone: "primary" },
  { icon: ThumbsUpIcon, title: "Checks passed", body: "142 tests in 48s", tone: "success" },
  { icon: BellIcon, title: "Quota at 92%", body: "Raise the limit before Friday", tone: "warning" },
] as const

// One list, one family: every row icon here is a solid puff shape.
export default function IconChipDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <div className="flex items-end justify-center gap-3">
        <IconChip size="sm"><BellIcon /></IconChip>
        <IconChip><BotIcon /></IconChip>
        <IconChip size="lg"><ShieldIcon /></IconChip>
        <IconChip size="lg" tone="solid"><QinyangLogoIcon /></IconChip>
      </div>
      <ul className="flex flex-col gap-1 frame-2xl frame-p-2 bg-card shadow-surface">
        {rows.map(({ icon: Icon, title, body, tone }) => (
          <li key={title} className="flex items-center gap-3 rounded-inner px-2 py-2">
            <IconChip tone={tone}><Icon /></IconChip>
            <div className="min-w-0">
              <p className="text-sm font-medium">{title}</p>
              <p className="truncate text-xs text-muted-foreground">{body}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
