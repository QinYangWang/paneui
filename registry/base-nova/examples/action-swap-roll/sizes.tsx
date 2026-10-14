"use client"

import { BookmarkIcon, CheckIcon } from "@/components/icons"
import { ActionSwapRollButton } from "@/registry/base-nova/ui/action-swap-roll"

const ITEMS = [
  { value: "save", label: "Save", icon: <BookmarkIcon /> },
  { value: "saved", label: "Saved", icon: <CheckIcon /> },
]

export default function ActionSwapRollSizes() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <ActionSwapRollButton variant="secondary" size="xs" items={ITEMS} />
      <ActionSwapRollButton variant="secondary" size="sm" items={ITEMS} />
      <ActionSwapRollButton variant="secondary" items={ITEMS} />
      <ActionSwapRollButton variant="secondary" size="lg" items={ITEMS} />
    </div>
  )
}
