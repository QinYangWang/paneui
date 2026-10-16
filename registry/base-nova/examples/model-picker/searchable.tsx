"use client"

import * as React from "react"

import { ModelPicker, type ModelOption } from "@/registry/base-nova/ui/model-picker"

const PROVIDERS = ["Anthropic", "Google", "Meta", "Mistral", "OpenAI", "Qwen"]
const SIZES = ["Mini", "Small", "Medium", "Large", "Max", "Turbo", "Vision", "Coder"]

// A long catalogue, the shape a model router returns.
const MODELS: ModelOption[] = PROVIDERS.flatMap((provider) =>
  SIZES.map((size, i) => ({
    id: `${provider.toLowerCase()}/${size.toLowerCase()}-${i + 2}`,
    name: `${provider} ${size} ${i + 2}`,
    provider,
  }))
)

export default function ModelPickerSearchable() {
  const [model, setModel] = React.useState("openai/large-5")
  return <ModelPicker models={MODELS} value={model} onValueChange={setModel} side="bottom" searchable maxPerGroup={3} searchPlaceholder="Search models" />
}
