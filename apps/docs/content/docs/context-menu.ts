import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Opens actions for an item on right-click or long-press.", "zh": "通过右键或长按打开操作菜单。"},
  baseUi: {
    name: "Context Menu",
    href: "https://base-ui.com/react/components/context-menu",
  },
  usage: {
    imports: `import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu"`,
    code: `<ContextMenu>
  <ContextMenuTrigger>Right-click here</ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>Rename</ContextMenuItem>
    <ContextMenuItem variant="destructive">Delete</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`,
  },
  composition: `ContextMenu
├── ContextMenuTrigger
└── ContextMenuContent
    ├── ContextMenuGroup
    │   ├── ContextMenuLabel
    │   └── ContextMenuItem
    │       └── ContextMenuShortcut
    ├── ContextMenuSeparator
    ├── ContextMenuCheckboxItem
    ├── ContextMenuRadioGroup
    │   └── ContextMenuRadioItem
    └── ContextMenuSub
        ├── ContextMenuSubTrigger
        └── ContextMenuSubContent`,
  examples: [
    {
      id: "basic",
      title: { en: "Basic", zh: "基础" },
    },
    {
      id: "checkboxes",
      title: { en: "Checkboxes", zh: "复选项" },
      description: { en: "Use checkbox items for toggles; the menu stays open so several can change.", zh: "适用于一次调整多个开关的场景。" },
    },
    {
      id: "radio-group",
      title: { en: "Radio Group", zh: "单选组" },
      description: { en: "Use a radio group when the reader picks one option, like a sort order.", zh: "适用于排序方式等互斥选项。" },
    },
    {
      id: "inset",
      title: { en: "Inset", zh: "内嵌" },
    },
  ],
  notes: [
    {
      title: "Motion",
      body: { en: "The menu grows out of the exact point that was clicked. With reduced motion it fades without scaling.", zh: "菜单从点击的确切点展开。在减少动态效果下，淡入但不缩放。" },
    },
    {
      title: "Keyboard",
      body: { en: "Opens on right-click or long-press. Arrow keys move between items, Enter selects, Arrow Right opens a submenu and Esc closes.", zh: "右键单击或长按打开。方向键在项之间移动，Enter 选择，Arrow Right 打开子菜单，Esc 关闭。" },
    },
    {
      title: "Related",
      body: { en: "The items are shared with [Menu](/docs/menu), so both menus always look the same.", zh: "项与 [Menu](/docs/menu) 共享，因此两个菜单外观始终一致。" },
    },
  ],
  api: [
    {
      name: "ContextMenu",
      extends: "ContextMenu.Root",
      extendsHref: "https://base-ui.com/react/components/context-menu#root",
      props: [],
    },
    {
      name: "ContextMenuTrigger",
      description: { en: "The area that opens the menu. Unstyled apart from disabling text selection and the iOS callout.", zh: "打开菜单的区域。除了禁用文本选择和 iOS 标注外无样式。" },
      extends: "ContextMenu.Trigger",
      extendsHref: "https://base-ui.com/react/components/context-menu#trigger",
      props: [],
    },
    {
      name: "ContextMenuContent",
      description: { en: "The popup, already wrapped in a portal and positioner.", zh: "弹出层，已包裹在门户和定位器中。" },
      extends: "ContextMenu.Popup",
      extendsHref: "https://base-ui.com/react/components/context-menu#popup",
      props: [
        {
          name: "side",
          type: `"top" | "right" | "bottom" | "left" | "inline-start" | "inline-end"`,
          description: { en: "Side of the pointer it opens on.", zh: "在指针的哪一侧打开。" },
        },
        { name: "sideOffset", type: "number", default: "4", description: { en: "Gap to the pointer in px.", zh: "与指针的间距（px）。" } },
        { name: "align", type: `"start" | "center" | "end"`, default: `"start"`, description: { en: "Alignment against the pointer.", zh: "相对于指针的对齐方式。" } },
        { name: "alignOffset", type: "number", default: "4", description: { en: "Shift along the alignment axis in px.", zh: "沿对齐轴偏移（px）。" } },
      ],
    },
    {
      name: "ContextMenuItem",
      extends: "ContextMenu.Item",
      extendsHref: "https://base-ui.com/react/components/context-menu#item",
      props: [
        {
          name: "variant",
          type: `"default" | "destructive"`,
          default: `"default"`,
          description: { en: "`destructive` tints the text, icon and highlight.", zh: "`destructive` 为文本、图标和高亮着色。" },
        },
        { name: "inset", type: "boolean", default: "false", description: { en: "Indent to line up with checkbox and radio items.", zh: "缩进以与复选框和单选项对齐。" } },
      ],
      dataAttributes: [{ name: "data-highlighted", description: { en: "Present on the item under the pointer or keyboard focus.", zh: "在指针或键盘焦点下的项上存在。" } }],
    },
    {
      name: "ContextMenuCheckboxItem",
      description: { en: "Item with a check mark on the left.", zh: "左侧带勾选标记的项。" },
      extends: "ContextMenu.CheckboxItem",
      extendsHref: "https://base-ui.com/react/components/context-menu#checkboxitem",
      props: [],
    },
    {
      name: "ContextMenuRadioGroup",
      extends: "ContextMenu.RadioGroup",
      extendsHref: "https://base-ui.com/react/components/context-menu#radiogroup",
      props: [],
    },
    {
      name: "ContextMenuRadioItem",
      description: { en: "Item with a primary dot on the left when selected.", zh: "选中时左侧带主色圆点的项。" },
      extends: "ContextMenu.RadioItem",
      extendsHref: "https://base-ui.com/react/components/context-menu#radioitem",
      props: [],
    },
    {
      name: "ContextMenuGroup",
      extends: "ContextMenu.Group",
      extendsHref: "https://base-ui.com/react/components/context-menu#group",
      props: [],
    },
    {
      name: "ContextMenuLabel",
      description: { en: "Small muted heading for a group. Place it inside a `ContextMenuGroup`.", zh: "组的次要小标题。放在 `ContextMenuGroup` 内。" },
      extends: "ContextMenu.GroupLabel",
      extendsHref: "https://base-ui.com/react/components/context-menu#grouplabel",
      props: [{ name: "inset", type: "boolean", default: "false", description: { en: "Indent to line up with checkbox and radio items.", zh: "缩进以与复选框和单选项对齐。" } }],
    },
    {
      name: "ContextMenuSeparator",
      extends: "ContextMenu.Separator",
      extendsHref: "https://base-ui.com/react/components/context-menu#separator",
      props: [],
    },
    {
      name: "ContextMenuShortcut",
      description: { en: "Right-aligned monospace hint, e.g. `⌘D`. Visual only.", zh: "右对齐的等宽提示，例如 `⌘D`。仅视觉。" },
      extends: "span",
      props: [],
    },
    {
      name: "ContextMenuSub",
      extends: "ContextMenu.SubmenuRoot",
      extendsHref: "https://base-ui.com/react/components/context-menu#submenuroot",
      props: [],
    },
    {
      name: "ContextMenuSubTrigger",
      description: { en: "Item with a trailing chevron that opens the submenu.", zh: "带尾部箭头、打开子菜单的项。" },
      extends: "ContextMenu.SubmenuTrigger",
      extendsHref: "https://base-ui.com/react/components/context-menu#submenutrigger",
      props: [],
      dataAttributes: [{ name: "data-popup-open", description: { en: "Present while its submenu is open.", zh: "子菜单打开时存在。" } }],
    },
    {
      name: "ContextMenuSubContent",
      description: { en: "The submenu popup. Opens to the right by default; takes the same props as `MenuContent`.", zh: "子菜单弹出层。默认向右打开；接受与 `MenuContent` 相同的 props。" },
      extends: "Menu.Popup",
      extendsHref: "https://base-ui.com/react/components/menu#popup",
      props: [],
    },
  ],
} satisfies ComponentDoc
