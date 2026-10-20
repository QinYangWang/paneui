"use client"

import * as React from "react"

import { MonitorIcon, MoonIcon, SunIcon } from "@paneui/ui/icons"
import { Label } from "@paneui/ui/components/label"
import { MorphSelect, MorphSelectContent, MorphSelectItem, MorphSelectTrigger } from "@paneui/ui/components/select-morph"

const themes = {
  light: { label: "Light", icon: <SunIcon /> },
  dark: { label: "Dark", icon: <MoonIcon /> },
  system: { label: "System", icon: <MonitorIcon /> },
} as const

type Theme = keyof typeof themes

export default function SelectMorphWithIcons() {
  const [theme, setTheme] = React.useState<Theme>("system")
  const current = themes[theme]
  const row = (
    <span className="flex flex-1 items-center gap-2 truncate text-start">
      {current.icon}
      {current.label}
    </span>
  )

  return (
    <div className="flex w-full max-w-56 flex-col gap-2">
      <Label>Appearance</Label>
      <MorphSelect value={theme} onValueChange={(value) => value && setTheme(value as Theme)}>
        <MorphSelectTrigger>{row}</MorphSelectTrigger>
        <MorphSelectContent header={row}>
          {(Object.keys(themes) as Theme[]).map((key) => (
            <MorphSelectItem key={key} value={key}>
              {themes[key].icon}
              {themes[key].label}
            </MorphSelectItem>
          ))}
        </MorphSelectContent>
      </MorphSelect>
    </div>
  )
}
