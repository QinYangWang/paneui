import type { ComponentDoc } from "@/lib/doc-types"

const BASE = "https://base-ui.com/react/components/combobox"

export default {
  summary: {"en": "Searchable picker for choosing several options at once.", "zh": "搜索并选择多个选项。"},
  baseUi: { name: "Combobox", href: BASE },
  usage: {
    imports: `import { MultiSelect, MultiSelectContent, MultiSelectEmpty, MultiSelectItem, MultiSelectList, MultiSelectTrigger } from "@/components/ui/multi-select"`,
    code: `<MultiSelect items={labels}>
  <MultiSelectTrigger placeholder="Add labels" />
  <MultiSelectContent>
    <MultiSelectEmpty>No labels found.</MultiSelectEmpty>
    <MultiSelectList>
      {(label: string) => (
        <MultiSelectItem key={label} value={label}>
          {label}
        </MultiSelectItem>
      )}
    </MultiSelectList>
  </MultiSelectContent>
</MultiSelect>`,
  },
  composition: `MultiSelect
├── MultiSelectTrigger
└── MultiSelectContent
    ├── MultiSelectEmpty
    └── MultiSelectList
        ├── MultiSelectItem
        └── MultiSelectGroup
            ├── MultiSelectLabel
            ├── MultiSelectCollection
            │   └── MultiSelectItem
            └── MultiSelectSeparator`,
  examples: [
    {
      id: "groups",
      title: { en: "Groups", zh: "分组" },
      description: { en: "Use when the options fall into categories.", zh: "适用于按类别组织的选项。" },
    },
    {
      id: "objects",
      title: { en: "Object Values", zh: "对象值" },
    },
    {
      id: "controlled",
      title: { en: "Controlled", zh: "受控" },
      description: { en: "Use when other UI sets or reads the selection.", zh: "适用于选择值与其他界面联动的场景。" },
    },
    { id: "sizes", title: { en: "Sizes", zh: "尺寸" } },
  ],
  notes: [
    {
      title: "Keyboard",
      body: { en: "Typing filters; `Enter` toggles the highlighted option and keeps the list open. `Backspace` in an empty input removes the last chip.", zh: "输入即过滤；`Enter` 切换高亮选项并保持列表打开。空输入时按 `Backspace` 移除最后一个 chip。" },
    },
    {
      title: "Motion",
      body: { en: "Chips use a 520 / 34 / 0.6 spring. With reduced motion they only fade.", zh: "chip 使用 520 / 34 / 0.6 的弹簧动画。启用减少动态效果时仅淡入淡出。" },
    },
    {
      title: "Related",
      body: { en: "See also [Combobox](/docs/combobox).", zh: "另见 [Combobox](/docs/combobox)。" },
    },
  ],
  api: [
    {
      name: "MultiSelect",
      description: { en: "`Combobox.Root` with `multiple` always on.", zh: "`Combobox.Root`，始终启用 `multiple`。" },
      extends: "Combobox.Root",
      extendsHref: `${BASE}#root`,
      props: [
        { name: "size", type: `"sm" | "default" | "lg"`, description: { en: "Sizes the well (28, 32 or 36px for one row of chips), its chips and the option rows. Inside a sized `Field` it takes the field's size (`xs` maps to `sm`).", zh: "设置输入区的大小（一行 chip 为 28、32 或 36px），以及 chip 和选项行的大小。在设置了尺寸的 `Field` 内，它采用字段的尺寸（`xs` 映射到 `sm`）。" } },
        { name: "value", type: "Value[]", description: { en: "Controlled selected values.", zh: "受控的选中值。" } },
        { name: "defaultValue", type: "Value[]", description: { en: "Initially selected values.", zh: "初始选中值。" } },
        { name: "onValueChange", type: "(value: Value[], details) => void", description: { en: "Called when the selection changes.", zh: "选中值变化时调用。" } },
      ],
    },
    {
      name: "MultiSelectTrigger",
      description: { en: "Holds the chips and the search input. The popup anchors to it.", zh: "容纳 chip 和搜索输入。弹窗锚定到它。" },
      extends: "Combobox.Chips",
      extendsHref: `${BASE}#chips`,
      props: [
        { name: "size", type: `"sm" | "default" | "lg"`, description: { en: "Overrides the root size for the well only.", zh: "仅覆盖输入区的根尺寸。" } },
        { name: "placeholder", type: "string", default: `"Select…"`, description: { en: "Input placeholder while nothing is selected.", zh: "未选中任何项时输入框的占位符。" } },
        {
          name: "renderChip",
          type: "(value) => ReactNode",
          default: "value.label ?? value.value ?? String(value)",
          description: { en: "Chip content for a selected value.", zh: "选中值的 chip 内容。" },
        },
        {
          name: "getKey",
          type: "(value, index: number) => Key",
          default: "value.value ?? value.id ?? index (strings: the value)",
          description: { en: "React key for each chip.", zh: "每个 chip 的 React key。" },
        },
      ],
      dataAttributes: [{ name: "data-size", description: { en: "The resolved size.", zh: "解析后的尺寸。" } }],
    },
    {
      name: "MultiSelectContent",
      description: { en: "Portal, positioner and popup, anchored to the trigger.", zh: "Portal、positioner 和 popup，锚定到触发器。" },
      extends: "Combobox.Popup",
      extendsHref: `${BASE}#popup`,
      props: [
        { name: "side", type: `"top" | "bottom" | "left" | "right" | "inline-start" | "inline-end"`, default: `"bottom"`, description: { en: "Side of the trigger to place the popup on.", zh: "弹窗放置在触发器的哪一侧。" } },
        { name: "sideOffset", type: "number", default: "6", description: { en: "Gap from the trigger in px.", zh: "与触发器的间距，单位为 px。" } },
        { name: "align", type: `"start" | "center" | "end"`, default: `"start"`, description: { en: "Alignment against the trigger.", zh: "相对触发器的对齐方式。" } },
      ],
    },
    {
      name: "MultiSelectItem",
      description: { en: "Option row with a tick that fills when chosen.", zh: "带勾选标记的选项行，选中时填充。" },
      extends: "Combobox.Item",
      extendsHref: `${BASE}#item`,
      props: [],
      dataAttributes: [
        { name: "data-selected", description: { en: "Present when the value is chosen (fills the tick).", zh: "值被选中时存在（填充勾选标记）。" } },
        { name: "data-highlighted", description: { en: "Present on the highlighted item.", zh: "在高亮项上存在。" } },
      ],
    },
    {
      name: "MultiSelectList",
      description: { en: "Alias of `ComboboxList`.", zh: "`ComboboxList` 的别名。" },
      extends: "Combobox.List",
      extendsHref: `${BASE}#list`,
      props: [],
    },
    { name: "MultiSelectGroup", description: { en: "Alias of `ComboboxGroup`.", zh: "`ComboboxGroup` 的别名。" }, extends: "Combobox.Group", extendsHref: `${BASE}#group`, props: [] },
    { name: "MultiSelectLabel", description: { en: "Alias of `ComboboxLabel`.", zh: "`ComboboxLabel` 的别名。" }, extends: "Combobox.GroupLabel", extendsHref: `${BASE}#group-label`, props: [] },
    { name: "MultiSelectSeparator", description: { en: "Alias of `ComboboxSeparator`.", zh: "`ComboboxSeparator` 的别名。" }, extends: "Combobox.Separator", extendsHref: `${BASE}#separator`, props: [] },
    { name: "MultiSelectEmpty", description: { en: "Alias of `ComboboxEmpty`.", zh: "`ComboboxEmpty` 的别名。" }, extends: "Combobox.Empty", extendsHref: `${BASE}#empty`, props: [] },
    { name: "MultiSelectCollection", description: { en: "Alias of `ComboboxCollection`.", zh: "`ComboboxCollection` 的别名。" }, extends: "Combobox.Collection", extendsHref: `${BASE}#collection`, props: [] },
  ],
} satisfies ComponentDoc
