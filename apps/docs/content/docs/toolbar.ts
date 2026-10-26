import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Groups related actions into one keyboard-navigable bar.", "zh": "集中相关操作并支持键盘导航。"},
  baseUi: { name: "Toolbar", href: "https://base-ui.com/react/components/toolbar" },
  usage: {
    imports: `import { Toolbar, ToolbarButton, ToolbarSeparator, ToolbarToggle } from "@/components/ui/toolbar"`,
    code: `<Toolbar variant="floating" aria-label="Format">
  <ToolbarToggle aria-label="Bold" pressed={bold} onPressedChange={setBold}>
    <BoldIcon />
  </ToolbarToggle>
  <ToolbarSeparator />
  <ToolbarButton aria-label="Link"><LinkIcon /></ToolbarButton>
</Toolbar>`,
  },
  composition: `Toolbar
├── ToolbarGroup
│   ├── ToolbarButton
│   └── ToolbarToggle
├── ToolbarSeparator
├── ToolbarLink
└── ToolbarInput`,
  examples: [
    { id: "document-bar", title: { en: "Document Bar", zh: "文档工具栏" },  },
    { id: "inset", title: { en: "Inset", zh: "内嵌" },  },
  ],
  notes: [
    { title: "Keyboard", body: { en: "The toolbar is one tab stop. Arrow keys move between items (looping) and `Home` / `End` jump to the ends. Menu and popover triggers join the loop with `render={<ToolbarButton />}`.", zh: "工具栏是一个 Tab 停靠点。方向键在各项之间移动（循环），`Home` / `End` 跳到两端。菜单和弹出层的触发器通过 `render={<ToolbarButton />}` 加入循环。" } },
    { title: "Radii", body: { en: "`floating` is `rounded-xl` with `p-1`, so its 28px items take `rounded-inner` (10px). The plain variant falls back to `rounded-lg` items.", zh: "`floating` 使用 `rounded-xl` 加 `p-1`，因此其 28px 的项采用 `rounded-inner`（10px）。普通变体的项回退为 `rounded-lg`。" } },
  ],
  api: [
    { name: "Toolbar", extends: "Toolbar.Root", extendsHref: "https://base-ui.com/react/components/toolbar#api-reference", props: [{ name: "variant", type: `"default" | "floating" | "inset"`, default: `"default"`, description: { en: "`floating` is the popover surface for selection bubbles; `inset` sits in a well.", zh: "`floating` 是用于选择气泡的弹出层表面；`inset` 位于凹槽内。" } }] },
    { name: "ToolbarButton", extends: "Toolbar.Button", extendsHref: "https://base-ui.com/react/components/toolbar#api-reference", props: [{ name: "size", type: `"icon" | "label"`, default: `"icon"`, description: { en: "`icon` is a 28px square; `label` adds padding for text.", zh: "`icon` 是 28px 的方形；`label` 为文本增加内边距。" } }], dataAttributes: [{ name: "data-pressed", description: { en: "Set it yourself for a toggled look on a non-toggle (an active link).", zh: "在非切换项（如激活的链接）上自行设置，以获得切换态外观。" } }] },
    { name: "ToolbarToggle", description: { en: "A toggle inside the toolbar.", zh: "工具栏内的切换按钮。" }, extends: "Toolbar.Button", extendsHref: "https://base-ui.com/react/components/toolbar#api-reference", props: [
      { name: "pressed", type: "boolean", description: { en: "Controlled pressed state.", zh: "受控的按下状态。" } },
      { name: "defaultPressed", type: "boolean", description: { en: "Uncontrolled initial state.", zh: "非受控的初始状态。" } },
      { name: "onPressedChange", type: "(pressed: boolean) => void", description: { en: "Called when toggled.", zh: "切换时调用。" } },
      { name: "size", type: `"icon" | "label"`, default: `"icon"`, description: { en: "As on ToolbarButton.", zh: "同 ToolbarButton。" } },
    ] },
    { name: "ToolbarSeparator", extends: "Toolbar.Separator", extendsHref: "https://base-ui.com/react/components/toolbar#api-reference", props: [] },
    { name: "ToolbarGroup", extends: "Toolbar.Group", extendsHref: "https://base-ui.com/react/components/toolbar#api-reference", props: [] },
    { name: "ToolbarInput", extends: "Toolbar.Input", extendsHref: "https://base-ui.com/react/components/toolbar#api-reference", props: [] },
    { name: "ToolbarLink", extends: "Toolbar.Link", extendsHref: "https://base-ui.com/react/components/toolbar#api-reference", props: [] },
  ],
} satisfies ComponentDoc
