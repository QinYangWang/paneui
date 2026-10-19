"use client"

import { CheckIcon, CopyIcon, LinkIcon } from "@/components/icons"
import { ActionSwapBlurButton } from "@/registry/base-nova/ui/action-swap-blur"

const INSTALL = "pnpm dlx shadcn@latest add @taimatsu/action-swap-blur"

export default function ActionSwapBlurDemo() {
  const copy = (text: string) => navigator.clipboard?.writeText(text).catch(() => {})
  return (
    <div className="flex flex-col items-start gap-4">
      <div className="flex items-center gap-2 rounded-2xl bg-muted py-1.5 pr-1.5 pl-4 font-mono text-xs text-muted-foreground shadow-well">
        <span className="truncate">{INSTALL}</span>
        <ActionSwapBlurButton
          variant="secondary"
          size="icon-sm"
          resetAfter={1600}
          onClick={() => copy(INSTALL)}
          items={[
            { value: "copy", label: "Copy", icon: <CopyIcon />, ariaLabel: "Copy command" },
            { value: "copied", label: "Copied", icon: <CheckIcon className="text-success" />, ariaLabel: "Copied" },
          ]}
        />
      </div>
      <ActionSwapBlurButton
        variant="secondary"
        resetAfter={1800}
        onClick={() => copy("https://qinyang.wang/ui")}
        items={[
          { value: "copy", label: "Copy link", icon: <LinkIcon /> },
          { value: "copied", label: "Link copied", icon: <CheckIcon /> },
        ]}
      />
    </div>
  )
}
