import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import { EffortPicker, ModelPicker, ModePicker } from "@/components/ui/model-picker"`,
    code: `<ModePicker modes={modes} value={mode} onValueChange={setMode} />
<ModelPicker models={models} value={model} onValueChange={setModel} />
<EffortPicker value={effort} onValueChange={setEffort} />`,
  },
  examples: [{ id: "composer-picker", title: "Composer Picker", description: "Use `ComposerPicker` directly for an option list the presets don't cover." }],
  notes: [
    { title: "ACP", body: "Feed `ModePicker` from an agent's `SessionModeState`, `ModelPicker` from a config option with `category: \"model\"` (grouped options map to `provider`), and `EffortPicker` from `category: \"thought_level\"`." },
    { title: "Tone", body: "A mode with `tone: \"warning\"` (full access) or `\"destructive\"` colours the trigger while selected, so a risky setting is visible at a glance." },
  ],
  api: [
    {
      name: "ComposerPicker",
      props: [
        { name: "options", type: "PickerOption[]", required: true, description: "`{ value, label, description?, icon?, group?, tone?, disabled? }`." },
        { name: "value", type: "string", description: "Selected value." },
        { name: "onValueChange", type: "(value: string) => void", description: "Called on pick." },
        { name: "label", type: "string", required: true, description: "Accessible name of the trigger." },
        { name: "icon", type: "ReactNode", description: "Trigger glyph when the option has none." },
        { name: "heading", type: "string", description: "Label above the options." },
        { name: "side", type: `"top" | "bottom"`, default: `"top"`, description: "Menu side (top suits a composer at the bottom)." },
        { name: "align", type: `"start" | "center" | "end"`, default: `"start"`, description: "Menu alignment." },
        { name: "footer", type: "ReactNode", description: "Menu items under the options." },
        { name: "compact", type: "boolean", default: "false", description: "Inside an `AgentComposer` toolbar narrower than 28rem (phones, tablets, split panes), show only the glyph and chevron; the label stays the accessible name. `ModePicker` and `EffortPicker` default to `true`." },
      ],
    },
    { name: "ModelPicker", description: "Preset grouped by `provider`.", props: [{ name: "models", type: "{ id, name, description?, provider?, icon? }[]", required: true, description: "Models to offer." }] },
    { name: "EffortPicker", description: "Preset with a bolt glyph.", props: [{ name: "levels", type: "{ value, label, description? }[]", default: "low / medium / high", description: "Effort levels." }] },
    { name: "ModePicker", description: "Preset with a shield glyph.", props: [{ name: "modes", type: "{ id, name, description?, icon?, tone? }[]", required: true, description: "Modes or access levels." }] },
  ],
} satisfies ComponentDoc
