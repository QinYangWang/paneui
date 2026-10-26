import type { ComponentDoc } from "@/lib/doc-types"

const BASE = "https://base-ui.com/react/components/select"

export default {
  summary: {"en": "Select whose trigger unfolds into its option list.", "zh": "将选择控件展开为选项列表。"},
  baseUi: { name: "Select", href: BASE },
  usage: {
    imports: `import { MorphSelect, MorphSelectContent, MorphSelectItem, MorphSelectTrigger, MorphSelectValue } from "@/components/ui/select-morph"`,
    code: `<MorphSelect items={items} defaultValue="tpe">
  <MorphSelectTrigger>
    <MorphSelectValue />
  </MorphSelectTrigger>
  <MorphSelectContent>
    <MorphSelectItem value="tpe">Taipei</MorphSelectItem>
    <MorphSelectItem value="tyo">Tokyo</MorphSelectItem>
  </MorphSelectContent>
</MorphSelect>`,
  },
  composition: `MorphSelect
├── MorphSelectTrigger
│   └── MorphSelectValue
└── MorphSelectContent
    ├── MorphSelectItem
    ├── MorphSelectSeparator
    └── MorphSelectGroup
        ├── MorphSelectLabel
        └── MorphSelectItem`,
  examples: [
    {
      id: "placeholder",
      title: { en: "Placeholder", zh: "占位内容" },
    },
    {
      id: "with-icons",
      title: { en: "With Icons", zh: "带图标" },
    },
    {
      id: "disabled",
      title: { en: "Disabled", zh: "禁用" },
    },
    {
      id: "controlled",
      title: { en: "Controlled", zh: "受控" },
      description: { en: "Use when other UI sets the value or opens the popup.", zh: "适用于选择值或展开状态与其他界面联动的场景。" },
    },
  ],
  notes: [
    {
      title: "Motion",
      body: { en: "The popup grows from the trigger's size to its content height over 450ms. With reduced motion it cross-fades at full size.", zh: "弹出层在 450ms 内从触发器的尺寸增长到内容高度。在减少动态效果下，它以完整尺寸交叉淡化。" },
    },
    {
      title: "Keyboard",
      body: { en: "Space, Enter and the arrow keys open it, arrows move between options, typing jumps to a match, Enter selects and Escape closes.", zh: "Space、Enter 和方向键可打开它，方向键在选项间移动，输入会跳转到匹配项，Enter 选择，Escape 关闭。" },
    },
    {
      title: "Related",
      body: { en: "See also [Popover Morph](/docs/popover-morph), [Morphing Modal](/docs/morphing-modal), [Morphing Search](/docs/morphing-search) and [Morphing Tabs](/docs/morphing-tabs).", zh: "另见 [Popover Morph](/docs/popover-morph)、[Morphing Modal](/docs/morphing-modal)、[Morphing Search](/docs/morphing-search) 和 [Morphing Tabs](/docs/morphing-tabs)。" },
    },
  ],
  api: [
    {
      name: "MorphSelect",
      description: { en: "`Select.Root`, re-exported unchanged.", zh: "`Select.Root`，原样重新导出。" },
      extends: "Select.Root",
      extendsHref: `${BASE}#root`,
      props: [],
    },
    {
      name: "MorphSelectTrigger",
      description: { en: "The raised 40px trigger the popup grows out of. Renders a chevron after its children.", zh: "弹出层从中增长出来的 40px 凸起触发器。在其子元素之后渲染一个 chevron。" },
      extends: "Select.Trigger",
      extendsHref: `${BASE}#trigger`,
      props: [],
    },
    {
      name: "MorphSelectValue",
      description: { en: "The selected label, truncated; muted while showing the placeholder.", zh: "选中的标签，截断显示；显示占位符时使用弱化样式。" },
      extends: "Select.Value",
      extendsHref: `${BASE}#value`,
      props: [],
    },
    {
      name: "MorphSelectContent",
      description: { en: "Portal, positioner and popup laid over the trigger, with a mirrored header row and a scrollable list (max 18rem).", zh: "Portal、positioner 和弹出层覆盖在触发器上，带有镜像的头部行和可滚动列表（最大 18rem）。" },
      extends: "Select.Popup",
      extendsHref: `${BASE}#popup`,
      props: [
        {
          name: "header",
          type: "ReactNode",
          default: "the current value",
          description: { en: "What the mirrored first row shows. Match it to your trigger's content.", zh: "镜像的第一行显示的内容。使其与触发器的内容匹配。" },
        },
      ],
      dataAttributes: [
        { name: "data-side", description: { en: "`bottom` or `top` (after a collision flip); on `top` the box grows upward.", zh: "`bottom` 或 `top`（碰撞翻转后）；为 `top` 时盒子向上增长。" } },
        { name: "data-starting-style / data-ending-style", description: { en: "Present while the morph opens or closes.", zh: "在变形打开或关闭期间存在。" } },
      ],
    },
    {
      name: "MorphSelectItem",
      description: { en: "An option row with a check indicator on the right.", zh: "右侧带勾选指示器的选项行。" },
      extends: "Select.Item",
      extendsHref: `${BASE}#item`,
      props: [],
      dataAttributes: [
        { name: "data-highlighted", description: { en: "Present on the keyboard or pointer highlighted row.", zh: "在键盘或指针高亮的行上存在。" } },
        { name: "data-selected", description: { en: "Present on the selected row.", zh: "在选中的行上存在。" } },
      ],
    },
    {
      name: "MorphSelectGroup",
      extends: "Select.Group",
      extendsHref: `${BASE}#group`,
      props: [],
    },
    {
      name: "MorphSelectLabel",
      description: { en: "Small muted heading for a group.", zh: "分组的小号弱化标题。" },
      extends: "Select.GroupLabel",
      extendsHref: `${BASE}#grouplabel`,
      props: [],
    },
    {
      name: "MorphSelectSeparator",
      extends: "Select.Separator",
      extendsHref: `${BASE}#separator`,
      props: [],
    },
  ],
} satisfies ComponentDoc
