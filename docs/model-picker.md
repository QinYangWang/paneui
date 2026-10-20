# Model Picker

> Chooses an agent model.

Page: https://paneui.dev/docs/model-picker/

## Installation

```bash
npx shadcn@latest add @paneui/model-picker
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/model-picker.json
```

Packages: `@base-ui/react`.

Registry items it builds on: `@paneui/theme`, `@paneui/icons`, `@paneui/button`, `@paneui/menu`, `@paneui/locale-provider`, `@paneui/combobox`.

## Usage

```tsx
import { EffortPicker, ModelPicker, ModePicker } from "@/components/ui/model-picker"
```

```tsx
<ModePicker modes={modes} value={mode} onValueChange={setMode} />
<ModelPicker models={models} value={model} onValueChange={setModel} />
<EffortPicker value={effort} onValueChange={setEffort} />
```

## Examples

### Searchable

Use when the list runs past a screen, such as a model router's catalogue.

```tsx
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
```

### Composer Picker

```tsx
"use client"

import * as React from "react"

import { GitBranchIcon } from "@/components/icons"
import { ComposerPicker } from "@/registry/base-nova/ui/model-picker"

export default function ModelPickerComposerPicker() {
  const [branch, setBranch] = React.useState("main")
  return (
    <ComposerPicker
      label="Branch"
      heading="Work on"
      icon={<GitBranchIcon />}
      side="bottom"
      value={branch}
      onValueChange={setBranch}
      options={[
        { value: "main", label: "main", description: "Default branch" },
        { value: "fix/drag", label: "fix/chat-dragging", description: "PR #1526" },
        { value: "new", label: "New worktree…", group: "Worktrees" },
      ]}
    />
  )
}
```

## ACP

Feed `ModePicker` from an agent's `SessionModeState`, `ModelPicker` from a config option with `category: "model"` (grouped options map to `provider`), and `EffortPicker` from `category: "thought_level"`.

## Search

With `searchable` focus stays in the search field: arrow keys move the highlight, Enter picks, Escape closes. Words match the label, value and group in any order. `maxPerGroup` caps each group until you search or press its “Show all” row; the current choice stays visible past the cap.

## Descriptions

Model and effort rows show the name alone; a `description` you pass is kept and shows with `showDescriptions`. `ModePicker` and `ComposerPicker` show descriptions by default, since an access level needs its consequence spelled out.

## Logos

Give each model its vendor's mark with `<BrandIcon color="brand">`. Marks the brand icon package leaves out, such as OpenAI and xAI, ship in `@/lib/brand-marks` with the same shape.

## Testing

Every option carries its value as `data-value`, so tests can pick one without matching its label.

## Tone

A mode with `tone: "warning"` (full access) or `"destructive"` colours the trigger while selected, so a risky setting is visible at a glance.

## API Reference

### ComposerPicker

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `options` (required) | `PickerOption[]` | — | `{ value, label, description?, icon?, group?, tone?, disabled? }`. |
| `value` | `string` | — | Selected value. |
| `onValueChange` | `(value: string) => void` | — | Called on pick. |
| `label` (required) | `string` | — | Accessible name of the trigger. |
| `icon` | `ReactNode` | — | Trigger glyph when the option has none. |
| `heading` | `string` | — | Label above the options. |
| `side` | `"top" \| "bottom"` | `"top"` | Menu side (top suits a composer at the bottom). |
| `align` | `"start" \| "center" \| "end"` | `"start"` | Menu alignment. |
| `footer` | `ReactNode` | — | Menu items under the options; with `searchable`, a plain button or link. |
| `searchable` | `boolean` | `false` | Search field at the top of the list. |
| `searchPlaceholder` | `string` | `"Search"` | Placeholder and accessible name of the search field. |
| `emptyLabel` | `ReactNode` | `"No results"` | Shown when nothing matches. |
| `maxPerGroup` | `number` | — | With `searchable`, options shown per group before “Show all”. |
| `compact` | `boolean` | `false` | Inside an `AgentComposer` toolbar narrower than 28rem (phones, tablets, split panes), show only the glyph and chevron; the label stays the accessible name. `ModePicker` and `EffortPicker` default to `true`. |
| `showDescriptions` | `boolean` | `true` | Show each option's `description` under its name. `ModelPicker` and `EffortPicker` default to `false`. |

### ModelPicker

Preset grouped by `provider`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `models` (required) | `{ id, name, description?, provider?, icon? }[]` | — | Models to offer. |

### EffortPicker

Preset with a bolt glyph.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `levels` | `{ value, label, description? }[]` | `low / medium / high` | Effort levels. |

### ModePicker

Preset with a shield glyph.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `modes` (required) | `{ id, name, description?, icon?, tone? }[]` | — | Modes or access levels. |
