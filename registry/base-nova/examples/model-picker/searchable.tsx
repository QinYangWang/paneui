"use client"

import * as React from "react"
import { siClaude, siDeepseek, siGooglegemini, siMeta, siMistralai, siQwen } from "simple-icons"

import { markOpenai, markXai } from "@/lib/brand-marks"
import { BrandIcon, type BrandIconData } from "@/registry/base-nova/ui/brand-icon"
import { ModelPicker, type ModelOption } from "@/registry/base-nova/ui/model-picker"

const PROVIDERS: [string, BrandIconData][] = [
  ["Anthropic", siClaude],
  ["DeepSeek", siDeepseek],
  ["Google", siGooglegemini],
  ["Meta", siMeta],
  ["Mistral", siMistralai],
  ["OpenAI", markOpenai],
  ["Qwen", siQwen],
  ["xAI", markXai],
]
const SIZES = ["Mini", "Small", "Medium", "Large", "Max", "Turbo", "Vision", "Coder"]

// A long catalogue, the shape a model router returns.
const MODELS: ModelOption[] = PROVIDERS.flatMap(([provider, mark]) =>
  SIZES.map((size, i) => ({
    id: `${provider.toLowerCase()}/${size.toLowerCase()}-${i + 2}`,
    name: `${provider} ${size} ${i + 2}`,
    provider,
    icon: <BrandIcon icon={mark} color="brand" />,
  }))
)

export default function ModelPickerSearchable() {
  const [model, setModel] = React.useState("openai/large-5")
  return <ModelPicker models={MODELS} value={model} onValueChange={setModel} side="bottom" searchable maxPerGroup={3} searchPlaceholder="Search models" />
}
