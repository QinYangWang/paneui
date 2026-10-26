import type { ComponentDoc } from "@/lib/doc-types"

const variant = {
  name: "variant",
  type: `"default" | "outline" | "tile"`,
  default: `"default"`,
  description: { en: "`default` fills only the pressed item; `outline` frames every item, for settings panels; `tile` stacks a large glyph in `ToggleGroupItemIcon` over its label and raises the pressed one.", zh: "`default` 只填充按下项；`outline` 为每个条目加边框，适用于设置面板；`tile` 在标签上方于 `ToggleGroupItemIcon` 中堆叠大图标，并抬高按下项。" },
}
const size = {
  name: "size",
  type: `"xs" | "sm" | "default" | "lg"`,
  default: `"default"`,
  description: { en: "Height 24 / 28 / 32 / 36px, matching the button sizes.", zh: "高度 24 / 28 / 32 / 36px，与按钮尺寸对应。" },
}

export default {
  summary: {"en": "Turns formatting or view options on and off.", "zh": "切换格式或视图选项。"},
  baseUi: { name: "Toggle Group", href: "https://base-ui.com/react/components/toggle-group" },
  usage: {
    imports: `import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"`,
    code: `<ToggleGroup multiple defaultValue={["bold"]} aria-label="Text style">
  <ToggleGroupItem value="bold" aria-label="Bold"><BoldIcon /></ToggleGroupItem>
  <ToggleGroupItem value="italic" aria-label="Italic"><ItalicIcon /></ToggleGroupItem>
</ToggleGroup>`,
  },
  composition: `ToggleGroup
└── ToggleGroupItem
    └── ToggleGroupItemIcon (tile)

Toggle`,
  examples: [
    { id: "outline", title: { en: "Outline", zh: "边框" },  },
    { id: "single-toggle", title: { en: "Single Toggle", zh: "单个切换" },  },
    { id: "sizes", title: { en: "Sizes", zh: "尺寸" } },
    { id: "tile", title: { en: "Tile", zh: "图块" }, description: { en: "Use tiles to pick what a large preview below shows.", zh: "用于切换下方大预览的内容。" } },
    {
      id: "rtl",
      title: { en: "RTL", zh: "从右到左" },
    },
  ],
  notes: [
    { title: "One value or many", body: { en: "The value is always an array. Without `multiple` it holds at most one item, so read `value[0]`; to stop the user clearing the choice, ignore empty arrays in `onValueChange`.", zh: "值始终是数组。没有 `multiple` 时最多包含一个条目，因此读取 `value[0]`；若要阻止用户清除选择，在 `onValueChange` 中忽略空数组。" } },
    { title: "When to use something else", body: { en: "For a one-of-few value with a raised thumb (billing cycle, view mode) use `SegmentedControl`. Inside a `Toolbar`, use `ToolbarToggle` so the item joins the toolbar's arrow-key loop.", zh: "对于带滑块的单选值（计费周期、视图模式），使用 `SegmentedControl`。在 `Toolbar` 内使用 `ToolbarToggle`，使条目加入工具栏的方向键循环。" } },
  ],
  api: [
    { name: "ToggleGroup", extends: "ToggleGroup", extendsHref: "https://base-ui.com/react/components/toggle-group#api-reference", props: [variant, size], dataAttributes: [{ name: "data-variant", description: { en: "The group variant.", zh: "组的 variant。" } }, { name: "data-size", description: { en: "The group size.", zh: "组的尺寸。" } }] },
    { name: "ToggleGroupItem", description: { en: "Takes `variant` / `size` from the group unless set.", zh: "若未设置，则从组继承 `variant` / `size`。" }, extends: "Toggle", extendsHref: "https://base-ui.com/react/components/toggle#api-reference", props: [{ name: "value", type: "string", description: { en: "The item's value in the group.", zh: "条目在组中的值。" }, required: true }], dataAttributes: [{ name: "data-pressed", description: { en: "Present when pressed.", zh: "按下时存在。" } }, { name: "data-variant", description: { en: "The resolved variant.", zh: "解析后的 variant。" } }, { name: "data-size", description: { en: "The resolved size.", zh: "解析后的尺寸。" } }] },
    { name: "ToggleGroupItemIcon", description: { en: "The 48px square that holds a `tile` item's glyph (24px). Raised on a card fill while the item is pressed; hidden from assistive tech, so the item's text names it.", zh: "容纳 `tile` 条目图标（24px）的 48px 方块。条目按下时以卡片填充抬高；对辅助技术隐藏，因此由条目的文本命名。" }, extends: "span", props: [] },
    { name: "Toggle", extends: "Toggle", extendsHref: "https://base-ui.com/react/components/toggle#api-reference", props: [variant, size] },
  ],
} satisfies ComponentDoc
