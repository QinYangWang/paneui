"use client"

import { CheckIcon, CopyIcon } from "@/components/icons"
import { ActionSwapCascadeButton } from "@/registry/base-nova/ui/action-swap-cascade"

export default function ActionSwapCascadeCopyReset() {
  return (
    <ActionSwapCascadeButton
      variant="secondary"
      resetAfter={1600}
      onValueChange={(value) => {
        if (value === "copied") void navigator.clipboard?.writeText("pnpm dlx shadcn add @qinyang/button")
      }}
      items={[
        { value: "copy", label: "Copy command", icon: <CopyIcon /> },
        { value: "copied", label: "Copied", icon: <CheckIcon /> },
      ]}
    />
  )
}
