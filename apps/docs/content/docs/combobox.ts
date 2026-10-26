import type { ComponentDoc } from "@/lib/doc-types"

const BASE = "https://base-ui.com/react/components/combobox"

export default {
  summary: {"en": "Picks one option from a long list by typing to filter.", "zh": "通过搜索从长列表中选择一项。"},
  baseUi: { name: "Combobox", href: BASE },
  usage: {
    imports: `import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from "@/components/ui/combobox"`,
    code: `<Combobox items={cities}>
  <ComboboxInput placeholder="Search cities" />
  <ComboboxContent>
    <ComboboxEmpty>No city found.</ComboboxEmpty>
    <ComboboxList>
      {(city: string) => (
        <ComboboxItem key={city} value={city}>
          {city}
        </ComboboxItem>
      )}
    </ComboboxList>
  </ComboboxContent>
</Combobox>`,
  },
  composition: `Combobox
├── ComboboxInput            (or ComboboxTrigger > ComboboxValue)
└── ComboboxContent
    ├── ComboboxSearch       (with ComboboxTrigger)
    ├── ComboboxEmpty
    └── ComboboxList
        ├── ComboboxItem
        └── ComboboxGroup
            ├── ComboboxLabel
            ├── ComboboxCollection
            │   └── ComboboxItem
            └── ComboboxSeparator`,
  examples: [
    {
      id: "popup-search",
      title: { en: "Search In Popup", zh: "在浮层中搜索" },
    },
    {
      id: "sizes",
      title: { en: "Sizes", zh: "尺寸" },
    },
    {
      id: "input-options",
      title: { en: "Input Options", zh: "输入选项" },
      description: { en: "Turn off controls a field doesn't need, like the clear button when a choice is required.", zh: "必选字段通常无需清除按钮。" },
    },
    {
      id: "controlled",
      title: { en: "Controlled", zh: "受控" },
    },
    {
      id: "disabled",
      title: { en: "Disabled", zh: "禁用" },
    },
    {
      id: "rtl",
      title: { en: "RTL", zh: "从右到左" },
    },
  ],
  notes: [
    {
      title: "Keyboard",
      body: { en: "Typing filters the list; `ArrowUp` / `ArrowDown` move the highlight, `Enter` picks it and `Escape` closes the popup (standard combobox behaviour).", zh: "输入会过滤列表；`ArrowUp` / `ArrowDown` 移动高亮，`Enter` 选取，`Escape` 关闭弹出层（标准 combobox 行为）。" },
    },
    {
      title: "Related",
      body: { en: "[Multi Select](/docs/multi-select) is the same primitive in `multiple` mode, with chips.", zh: "[Multi Select](/docs/multi-select) 是 `multiple` 模式下的同一原语，带 chips。" },
    },
  ],
  api: [
    {
      name: "Combobox",
      description: { en: "Re-export of the primitive root, taking `items`, `value`, `defaultValue`, `onValueChange`, `filter`, `disabled` and its other props.", zh: "原语根的重新导出，接收 `items`、`value`、`defaultValue`、`onValueChange`、`filter`、`disabled` 及其其他属性。" },
      extends: "Combobox.Root",
      extendsHref: `${BASE}#root`,
      props: [],
    },
    {
      name: "ComboboxInput",
      description: { en: "Search input in an inset well with optional search icon, clear and chevron buttons.", zh: "内嵌槽中的搜索输入框，带可选的搜索图标、清除和箭头按钮。" },
      extends: "Combobox.Input",
      extendsHref: `${BASE}#input`,
      props: [
        { name: "size", type: `"xs" | "sm" | "default" | "lg"`, default: `"default"`, description: { en: "Height 24 / 28 / 32 / 36px. Defaults to the `Combobox` size, then a sized `Field`.", zh: "高度 24 / 28 / 32 / 36px。默认取 `Combobox` 的尺寸，然后是设置尺寸的 `Field`。" } },
        { name: "showSearchIcon", type: "boolean", default: "true", description: { en: "Show the leading search icon.", zh: "显示前导搜索图标。" } },
        {
          name: "showClear",
          type: "boolean",
          default: "true",
          description: { en: "Render a clear button, shown once something is chosen.", zh: "渲染清除按钮，选择内容后显示。" },
        },
        { name: "showTrigger", type: "boolean", default: "true", description: { en: "Render the chevron that opens the list.", zh: "渲染打开列表的箭头。" } },
      ],
      dataAttributes: [
        { name: "data-size", description: { en: "On the input group, the `size` value.", zh: "在输入组上，即 `size` 值。" } },
        { name: "data-disabled", description: { en: "On the input group while disabled.", zh: "禁用时作用于输入组。" } },
      ],
    },
    {
      name: "ComboboxTrigger",
      description: { en: "Raised button showing the chosen value, like `SelectTrigger`. Put `ComboboxValue` inside.", zh: "显示所选值的凸起按钮，类似 `SelectTrigger`。将 `ComboboxValue` 放在里面。" },
      extends: "Combobox.Trigger",
      extendsHref: `${BASE}#trigger`,
      props: [{ name: "size", type: `"xs" | "sm" | "default" | "lg"`, default: `"default"`, description: { en: "Height 24 / 28 / 32 / 36px. Defaults to the `Combobox` size, then a sized `Field`.", zh: "高度 24 / 28 / 32 / 36px。默认取 `Combobox` 的尺寸，然后是设置尺寸的 `Field`。" } }],
      dataAttributes: [{ name: "data-popup-open", description: { en: "Present while the list is open.", zh: "列表打开时存在。" } }],
    },
    {
      name: "ComboboxValue",
      description: { en: "Re-export. Renders the selected value, or `placeholder` when empty.", zh: "重新导出。渲染选中的值，为空时渲染 `placeholder`。" },
      extends: "Combobox.Value",
      extendsHref: `${BASE}#value`,
      props: [],
    },
    {
      name: "ComboboxSearch",
      description: { en: "Search field styled for the top of the popup.", zh: "为弹出层顶部设计的搜索字段。" },
      extends: "Combobox.Input",
      extendsHref: `${BASE}#input`,
      props: [],
    },
    {
      name: "ComboboxContent",
      description: { en: "Portal, positioner and popup in one. As wide as its anchor.", zh: "门户、定位器和弹出层三合一。宽度与锚点一致。" },
      extends: "Combobox.Popup",
      extendsHref: `${BASE}#popup`,
      props: [
        { name: "side", type: `"top" | "bottom" | "left" | "right" | "inline-start" | "inline-end"`, default: `"bottom"`, description: { en: "Side of the anchor to place the popup on.", zh: "弹出层放置在锚点的哪一侧。" } },
        { name: "sideOffset", type: "number", default: "6", description: { en: "Gap from the anchor in px.", zh: "与锚点的间距，单位 px。" } },
        { name: "align", type: `"start" | "center" | "end"`, default: `"start"`, description: { en: "Alignment against the anchor.", zh: "相对于锚点的对齐方式。" } },
        { name: "anchor", type: "Element | RefObject<Element> | VirtualElement | null", description: { en: "Position against another element.", zh: "相对于另一个元素定位。" } },
      ],
    },
    {
      name: "ComboboxList",
      description: { en: "Scrollable list. Takes a render function called per item (or group).", zh: "可滚动列表。接受一个按项（或组）调用的渲染函数。" },
      extends: "Combobox.List",
      extendsHref: `${BASE}#list`,
      props: [],
    },
    {
      name: "ComboboxItem",
      description: { en: "Option row with a check indicator on the right when selected.", zh: "选中时右侧显示勾选指示器的选项行。" },
      extends: "Combobox.Item",
      extendsHref: `${BASE}#item`,
      props: [],
      dataAttributes: [
        { name: "data-highlighted", description: { en: "Present on the keyboard / pointer highlighted item.", zh: "在键盘/指针高亮的项上存在。" } },
        { name: "data-disabled", description: { en: "Present when the item is disabled.", zh: "项被禁用时存在。" } },
      ],
    },
    { name: "ComboboxGroup", extends: "Combobox.Group", extendsHref: `${BASE}#group`, props: [] },
    { name: "ComboboxLabel", extends: "Combobox.GroupLabel", extendsHref: `${BASE}#group-label`, props: [] },
    { name: "ComboboxSeparator", extends: "Combobox.Separator", extendsHref: `${BASE}#separator`, props: [] },
    {
      name: "ComboboxEmpty",
      description: { en: "Shown only when the filter leaves nothing to pick.", zh: "仅在过滤后没有可选项时显示。" },
      extends: "Combobox.Empty",
      extendsHref: `${BASE}#empty`,
      props: [],
    },
    {
      name: "ComboboxCollection",
      description: { en: "Re-export. Renders a group's `items` with a render function.", zh: "重新导出。使用渲染函数渲染组的 `items`。" },
      extends: "Combobox.Collection",
      extendsHref: `${BASE}#collection`,
      props: [],
    },
    {
      name: "useComboboxFilter",
      description: { en: "Re-export of `Combobox.useFilter`, returning locale-aware `contains`, `startsWith` and `endsWith` matchers for `filter`.", zh: "重新导出 `Combobox.useFilter`，返回感知区域设置的 `contains`、`startsWith` 和 `endsWith` 匹配器，用于 `filter`。" },
      extends: "Combobox.useFilter",
      extendsHref: BASE,
      props: [],
    },
  ],
} satisfies ComponentDoc
