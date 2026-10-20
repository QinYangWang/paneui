"use client"

import { ActionSwapBlurButton } from "@paneui/ui/components/action-swap-blur"

export default function ActionSwapBlurTextOnly() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <ActionSwapBlurButton
        items={[
          { value: "subscribe", label: "Subscribe" },
          { value: "subscribed", label: "Subscribed" },
        ]}
      />
      <ActionSwapBlurButton
        variant="outline"
        size="sm"
        items={[
          { value: "monthly", label: "Billed monthly" },
          { value: "yearly", label: "Billed yearly · save 20%" },
        ]}
      />
    </div>
  )
}
