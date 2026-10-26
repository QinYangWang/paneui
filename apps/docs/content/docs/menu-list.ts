import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Keyboard-driven option list that leaves focus in the text field.", "zh": "选择选项并保持输入框焦点。"},
  usage: {
    imports: `import { MenuList, MenuListItem, type MenuListHandle } from "@/components/ui/menu-list"`,
    code: `const list = React.useRef<MenuListHandle>(null)

<Input onKeyDown={(e) => list.current?.onKeyDown(e) && e.preventDefault()} />
<MenuList ref={list} aria-label="Blocks">
  <MenuListItem value="text" onSelect={() => insert("text")}>Text</MenuListItem>
  <MenuListItem value="h1" onSelect={() => insert("h1")}>Heading 1</MenuListItem>
</MenuList>`,
  },
  composition: `MenuList
├── MenuListGroup
│   ├── MenuListLabel
│   └── MenuListItem
│       ├── MenuListItemText
│       └── MenuListShortcut
├── MenuListSeparator
└── MenuListEmpty`,
  examples: [{ id: "plain", title: { en: "Plain", zh: "纯文本" },  }],
  notes: [
    { title: "Why not Menu", body: { en: "`Menu` moves focus into its popup. Slash menus, mention pickers and autocomplete need focus to stay in the text, so `MenuList` tracks a highlighted value and exposes it with `aria-activedescendant`. The block and email editors use it for `/` and `{{`.", zh: "`Menu` 会把焦点移入其弹出层。斜杠菜单、提及选择器和自动补全需要焦点留在文本中，因此 `MenuList` 跟踪高亮项，并通过 `aria-activedescendant` 对外暴露。块编辑器和邮件编辑器用它处理 `/` 和 `{{`。" } },
    { title: "Keyboard", body: { en: "`ref.current.onKeyDown(event)` handles `ArrowUp` / `ArrowDown` (looping), `Home` / `End`, and `Enter` / `Tab` (clicks the highlighted item); it returns true when it used the key. The highlight resets to the first item when the list changes under it.", zh: "`ref.current.onKeyDown(event)` 处理 `ArrowUp` / `ArrowDown`（循环）、`Home` / `End` 以及 `Enter` / `Tab`（点击高亮项）；使用该按键时返回 true。列表在其下方变化时，高亮会重置到第一项。" } },
  ],
  api: [
    { name: "MenuList", extends: "div", props: [
      { name: "ref", type: "React.Ref<MenuListHandle>", description: { en: "`{ onKeyDown(event): boolean, move(delta), select(): boolean }`.", zh: "`{ onKeyDown(event): boolean, move(delta), select(): boolean }`。" } },
      { name: "variant", type: `"popup" | "plain"`, default: `"popup"`, description: { en: "`popup` is the menu surface (`rounded-xl`, `p-1`, max-height 320px, scrolls).", zh: "`popup` 是菜单表面（`rounded-xl`、`p-1`、最大高度 320px、可滚动）。" } },
      { name: "activeValue", type: "string", description: { en: "Controlled highlighted item.", zh: "初始高亮（否则为第一项）。" } },
      { name: "defaultActiveValue", type: "string", description: { en: "Initial highlight (else the first item).", zh: "初始高亮（否则为第一项）。" } },
      { name: "onActiveValueChange", type: "(value: string) => void", description: { en: "Called as the highlight moves.", zh: "高亮项移动时调用。" } },
      { name: "loop", type: "boolean", default: "true", description: { en: "Wrap from the last item to the first.", zh: "从最后一项回绕到第一项。" } },
    ] },
    { name: "MenuListItem", extends: "div", props: [
      { name: "value", type: "string", required: true, description: { en: "Unique value for the highlight.", zh: "高亮项的唯一值。" } },
      { name: "onSelect", type: "() => void", description: { en: "Called on click or Enter.", zh: "点击或按 Enter 时调用。" } },
      { name: "disabled", type: "boolean", description: { en: "Skipped by the keyboard, dimmed.", zh: "被键盘跳过，置灰。" } },
    ], dataAttributes: [{ name: "data-highlighted", description: { en: "Present on the highlighted item.", zh: "在高亮项上存在。" } }] },
    { name: "MenuListItemText", extends: "span", props: [
      { name: "title", type: "React.ReactNode", required: true, description: { en: "The item label.", zh: "项标签。" } },
      { name: "description", type: "React.ReactNode", description: { en: "A muted second line.", zh: "弱化的第二行文字。" } },
    ] },
  ],
} satisfies ComponentDoc
