"use client"

import { CloudIcon, MoonIcon, SunIcon } from "@paneui/ui/icons"
import { ActionSwapBlurButton } from "@paneui/ui/components/action-swap-blur"

export default function ActionSwapBlurCycle() {
  return (
    <ActionSwapBlurButton
      variant="secondary"
      items={[
        { value: "light", label: "Light", icon: <SunIcon /> },
        { value: "dark", label: "Dark", icon: <MoonIcon /> },
        { value: "system", label: "Match system", icon: <CloudIcon /> },
      ]}
    />
  )
}
