"use client"

import * as React from "react"

import { ApertureIcon, AsteriskIcon, ShieldIcon } from "@/components/icons"
import { EffortPicker, ModelPicker, ModePicker } from "@/registry/base-nova/ui/model-picker"

const MODELS = [
  { id: "gpt-6.1-sol", name: "GPT-6.1 Sol", description: "Most capable for long tasks", provider: "Codex", icon: <ApertureIcon /> },
  { id: "gpt-6.1-mini", name: "GPT-6.1 Mini", description: "Quick edits", provider: "Codex", icon: <ApertureIcon /> },
  { id: "sonnet-5.5", name: "Sonnet 5.5", description: "Balanced speed and depth", provider: "Claude", icon: <AsteriskIcon /> },
]

const MODES = [
  { id: "ask", name: "Ask first", description: "Ask before edits and commands", icon: <ShieldIcon /> },
  { id: "auto", name: "Auto-edit", description: "Edit freely, ask before commands", icon: <ShieldIcon /> },
  { id: "full", name: "Full access", description: "Never ask", icon: <ShieldIcon />, tone: "warning" as const },
]

export default function ModelPickerDemo() {
  const [mode, setMode] = React.useState("full")
  const [model, setModel] = React.useState("gpt-6.1-sol")
  const [effort, setEffort] = React.useState("high")
  return (
    <div className="flex items-center gap-1 rounded-2xl bg-card p-2 shadow-raised">
      <ModePicker modes={MODES} value={mode} onValueChange={setMode} label="Access" side="bottom" />
      <ModelPicker models={MODELS} value={model} onValueChange={setModel} side="bottom" />
      <EffortPicker value={effort} onValueChange={setEffort} side="bottom" />
    </div>
  )
}
