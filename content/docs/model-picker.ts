import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Chooses an agent model.", "zh": "选择助手使用的模型。"},
  usage: {
    imports: `import { EffortPicker, ModelPicker, ModePicker } from "@/components/ui/model-picker"`,
    code: `<ModePicker modes={modes} value={mode} onValueChange={setMode} />
<ModelPicker models={models} value={model} onValueChange={setModel} />
<EffortPicker value={effort} onValueChange={setEffort} />`,
  },
  examples: [
    { id: "searchable", title: { en: "Searchable", zh: "可搜索" }, description: { en: "Use when the list runs past a screen, such as a model router's catalogue.", zh: "适用于选项超过一屏的模型目录。" } },
    { id: "composer-picker", title: { en: "Composer Picker", zh: "输入栏选择器" },  },
  ],
  notes: [
    { title: "ACP", body: "Feed `ModePicker` from an agent's `SessionModeState`, `ModelPicker` from a config option with `category: \"model\"` (grouped options map to `provider`), and `EffortPicker` from `category: \"thought_level\"`." },
    { title: "Search", body: "With `searchable` focus stays in the search field: arrow keys move the highlight, Enter picks, Escape closes. Words match the label, value and group in any order. `maxPerGroup` caps each group until you search or press its “Show all” row; the current choice stays visible past the cap." },
    { title: "Descriptions", body: "Model and effort rows show the name alone; a `description` you pass is kept and shows with `showDescriptions`. `ModePicker` and `ComposerPicker` show descriptions by default, since an access level needs its consequence spelled out." },
    { title: "Logos", body: "Give each model its vendor's mark with `<BrandIcon color=\"brand\">`. Marks the brand icon package leaves out, such as OpenAI and xAI, ship in `@/lib/brand-marks` with the same shape." },
    { title: "Testing", body: "Every option carries its value as `data-value`, so tests can pick one without matching its label." },
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
        { name: "footer", type: "ReactNode", description: "Menu items under the options; with `searchable`, a plain button or link." },
        { name: "searchable", type: "boolean", default: "false", description: "Search field at the top of the list." },
        { name: "searchPlaceholder", type: "string", default: `"Search"`, description: "Placeholder and accessible name of the search field." },
        { name: "emptyLabel", type: "ReactNode", default: `"No results"`, description: "Shown when nothing matches." },
        { name: "maxPerGroup", type: "number", description: "With `searchable`, options shown per group before “Show all”." },
        { name: "compact", type: "boolean", default: "false", description: "Inside an `AgentComposer` toolbar narrower than 28rem (phones, tablets, split panes), show only the glyph and chevron; the label stays the accessible name. `ModePicker` and `EffortPicker` default to `true`." },
        { name: "showDescriptions", type: "boolean", default: "true", description: "Show each option's `description` under its name. `ModelPicker` and `EffortPicker` default to `false`." },
      ],
    },
    { name: "ModelPicker", description: "Preset grouped by `provider`.", props: [{ name: "models", type: "{ id, name, description?, provider?, icon? }[]", required: true, description: "Models to offer." }] },
    { name: "EffortPicker", description: "Preset with a bolt glyph.", props: [{ name: "levels", type: "{ value, label, description? }[]", default: "low / medium / high", description: "Effort levels." }] },
    { name: "ModePicker", description: "Preset with a shield glyph.", props: [{ name: "modes", type: "{ id, name, description?, icon?, tone? }[]", required: true, description: "Modes or access levels." }] },
  ],
} satisfies ComponentDoc
