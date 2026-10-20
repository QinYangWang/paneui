"use client"

import { CheckIcon, CopyIcon } from "@paneui/ui/icons"
import { ActionSwapRollButton } from "@paneui/ui/components/action-swap-roll"

export default function ActionSwapRollCopyReset() {
  return (
    <ActionSwapRollButton
      variant="secondary"
      resetAfter={1600}
      onClick={() => navigator.clipboard?.writeText("HARK-2026-OCT").catch(() => {})}
      items={[
        { value: "copy", label: "Copy promo code", icon: <CopyIcon /> },
        { value: "copied", label: "Code copied", icon: <CheckIcon /> },
      ]}
    />
  )
}
