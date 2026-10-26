import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Picks one option from a list.", "zh": "从列表中选择一项。"},
  baseUi: {
    name: "Select",
    href: "https://base-ui.com/react/components/select",
  },
  usage: {
    imports: `import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"`,
    code: `<Select items={fruits} defaultValue="apple">
  <SelectTrigger>
    <SelectValue />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="apple">Apple</SelectItem>
    <SelectItem value="pear">Pear</SelectItem>
  </SelectContent>
</Select>`,
  },
  composition: `Select
├── SelectTrigger
│   └── SelectValue
└── SelectContent
    ├── SelectGroup
    │   ├── SelectLabel
    │   └── SelectItem
    ├── SelectSeparator
    └── SelectItem`,
  examples: [
    {
      id: "placeholder",
      title: { en: "Placeholder", zh: "占位内容" },
    },
    {
      id: "sizes",
      title: { en: "Sizes", zh: "尺寸" },
    },
    {
      id: "with-icons",
      title: { en: "With Icons", zh: "带图标" },
      description: { en: "Use when icons help tell the options apart.", zh: "适用于需要用图标区分选项的场景。" },
    },
    {
      id: "disabled",
      title: { en: "Disabled", zh: "禁用" },
    },
    {
      id: "controlled",
      title: { en: "Controlled", zh: "受控" },
      description: { en: "Use when other UI reacts to the choice.", zh: "适用于选择值与其他界面联动的场景。" },
    },
    {
      id: "rtl",
      title: { en: "RTL", zh: "从右到左" },
    },
  ],
  notes: [
    {
      title: "Positioning",
      body: { en: "By default the popup opens over the trigger with the selected item aligned to it (`alignItemWithTrigger`), like a native select. Set it to `false` to drop the list below instead.", zh: "默认情况下，弹出层在触发器上方打开，选中项与触发器对齐（`alignItemWithTrigger`），类似原生 select。将其设为 `false` 可将列表放在下方。" },
    },
    {
      title: "Keyboard",
      body: { en: "`Space`, `Enter` or the arrow keys open the list. Arrow keys move, typing jumps to a matching item, `Enter` selects and `Esc` closes.", zh: "`Space`、`Enter` 或方向键打开列表。方向键移动，输入会跳转到匹配项，`Enter` 选择，`Esc` 关闭。" },
    },
  ],
  api: [
    {
      name: "Select",
      description: { en: "Re-export of the primitive root.", zh: "重新导出 primitive 根。" },
      extends: "Select.Root",
      extendsHref: "https://base-ui.com/react/components/select#root",
      props: [
        {
          name: "items",
          type: "{ value: any; label: ReactNode }[] | Record<string, ReactNode>",
          description: { en: "Lets `SelectValue` show the label for the current value.", zh: "让 `SelectValue` 显示当前值的标签。" },
        },
        { name: "value", type: "any", description: { en: "Controlled value.", zh: "受控的值。" } },
        { name: "defaultValue", type: "any", description: { en: "Initial value when uncontrolled.", zh: "非受控时的初始值。" } },
        { name: "onValueChange", type: "(value: any, eventDetails) => void", description: { en: "Called when an item is chosen.", zh: "选择某一项时调用。" } },
        { name: "multiple", type: "boolean", default: "false", description: { en: "Allow several values.", zh: "允许多个值。" } },
        { name: "disabled", type: "boolean", default: "false", description: { en: "Disable the whole control.", zh: "禁用整个控件。" } },
      ],
    },
    {
      name: "SelectTrigger",
      description: { en: "Raised button with a trailing up/down chevron. Full width with a 10rem minimum.", zh: "带尾部上/下 chevron 的凸起按钮。全宽，最小 10rem。" },
      extends: "Select.Trigger",
      extendsHref: "https://base-ui.com/react/components/select#trigger",
      props: [
        { name: "size", type: `"xs" | "sm" | "default" | "lg"`, default: `"default"`, description: { en: "Height 24 / 28 / 32 / 36px. Defaults to the `Select` size, then a sized `Field`.", zh: "高度 24 / 28 / 32 / 36px。默认使用 `Select` 的尺寸，然后是已设尺寸的 `Field`。" } },
      ],
      dataAttributes: [
        { name: "data-popup-open", description: { en: "Present while the list is open.", zh: "列表打开时存在。" } },
        { name: "data-size", description: { en: "The resolved size.", zh: "解析后的尺寸。" } },
      ],
    },
    {
      name: "SelectValue",
      description: { en: "Shows the selected label, truncated.", zh: "显示选中的标签，截断显示。" },
      extends: "Select.Value",
      extendsHref: "https://base-ui.com/react/components/select#value",
      props: [
        {
          name: "children",
          type: "ReactNode | (value: any) => ReactNode",
          description: { en: "Custom rendering of the selected value.", zh: "自定义渲染选中的值。" },
        },
      ],
      dataAttributes: [{ name: "data-placeholder", description: { en: "Present when nothing is selected (muted text).", zh: "未选中任何项时存在（弱化文本）。" } }],
    },
    {
      name: "SelectContent",
      description: { en: "Portal, positioner, popup and scrollable list with scroll arrows.", zh: "Portal、positioner、弹出层和带滚动箭头的可滚动列表。" },
      extends: "Select.Popup",
      extendsHref: "https://base-ui.com/react/components/select#popup",
      props: [
        {
          name: "side",
          type: `"top" | "right" | "bottom" | "left" | "inline-start" | "inline-end"`,
          default: `"bottom"`,
          description: { en: "Side to open on when not aligned with the trigger.", zh: "未与触发器对齐时打开的一侧。" },
        },
        { name: "sideOffset", type: "number", default: "6", description: { en: "Gap from the trigger in px.", zh: "与触发器的间距，单位为 px。" } },
        { name: "align", type: `"start" | "center" | "end"`, default: `"center"`, description: { en: "Alignment against the trigger.", zh: "相对触发器的对齐方式。" } },
        {
          name: "alignItemWithTrigger",
          type: "boolean",
          default: "true",
          description: { en: "Overlay the trigger so the selected item sits on top of it.", zh: "将弹出层覆盖在触发器上，使选中项位于其上方。" },
        },
      ],
    },
    {
      name: "SelectItem",
      description: { en: "Option row with a check on the right when selected.", zh: "选中时右侧带勾选的选项行。" },
      extends: "Select.Item",
      extendsHref: "https://base-ui.com/react/components/select#item",
      props: [
        { name: "value", type: "any", description: { en: "Value chosen by this item.", zh: "此项选择的值。" } },
        { name: "disabled", type: "boolean", default: "false", description: { en: "Dim the item and skip it.", zh: "置灰该项并跳过它。" } },
      ],
      dataAttributes: [
        { name: "data-highlighted", description: { en: "Present on the item under the pointer or keyboard focus.", zh: "在指针或键盘焦点下的项上存在。" } },
        { name: "data-selected", description: { en: "Present on the selected item.", zh: "在选中的项上存在。" } },
      ],
    },
    {
      name: "SelectGroup",
      description: { en: "Re-export. Groups items under a `SelectLabel`.", zh: "重新导出。将项分组在 `SelectLabel` 下。" },
      extends: "Select.Group",
      extendsHref: "https://base-ui.com/react/components/select#group",
      props: [],
    },
    {
      name: "SelectLabel",
      description: { en: "Small muted heading for a group.", zh: "分组的小号弱化标题。" },
      extends: "Select.GroupLabel",
      extendsHref: "https://base-ui.com/react/components/select#group-label",
      props: [],
    },
    {
      name: "SelectSeparator",
      extends: "Select.Separator",
      extendsHref: "https://base-ui.com/react/components/select#separator",
      props: [],
    },
  ],
} satisfies ComponentDoc
