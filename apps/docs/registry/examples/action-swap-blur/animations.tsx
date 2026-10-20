"use client"

import { CheckIcon, CopyIcon } from "@paneui/ui/icons"
import { ActionSwapButton, type ActionSwapAnimation } from "@paneui/ui/components/action-swap-blur"

const ANIMATIONS: ActionSwapAnimation[] = ["blur", "roll", "cascade"]

export default function ActionSwapBlurAnimations() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {ANIMATIONS.map((animation) => (
        <ActionSwapButton
          key={animation}
          animation={animation}
          variant="secondary"
          resetAfter={1600}
          items={[
            { value: "copy", label: `Copy (${animation})`, icon: <CopyIcon /> },
            { value: "copied", label: "Copied", icon: <CheckIcon /> },
          ]}
        />
      ))}
    </div>
  )
}
