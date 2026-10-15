import type { ComponentDoc } from "@/lib/doc-types"

export default {
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
  examples: [{ id: "plain", title: "Plain", description: "Use `variant=\"plain\"` when the list sits in the page instead of a popup; with `tabIndex={0}` it handles arrow keys itself." }],
  notes: [
    { title: "Why not Menu", body: "`Menu` moves focus into its popup. Slash menus, mention pickers and autocomplete need focus to stay in the text, so `MenuList` tracks a highlighted value and exposes it with `aria-activedescendant`. The block and email editors use it for `/` and `{{`." },
    { title: "Keyboard", body: "`ref.current.onKeyDown(event)` handles `ArrowUp` / `ArrowDown` (looping), `Home` / `End`, and `Enter` / `Tab` (clicks the highlighted item); it returns true when it used the key. The highlight resets to the first item when the list changes under it." },
  ],
  api: [
    { name: "MenuList", extends: "div", props: [
      { name: "ref", type: "React.Ref<MenuListHandle>", description: "`{ onKeyDown(event): boolean, move(delta), select(): boolean }`." },
      { name: "variant", type: `"popup" | "plain"`, default: `"popup"`, description: "`popup` is the menu surface (`rounded-xl`, `p-1`, max-height 320px, scrolls)." },
      { name: "activeValue", type: "string", description: "Controlled highlighted item." },
      { name: "defaultActiveValue", type: "string", description: "Initial highlight (else the first item)." },
      { name: "onActiveValueChange", type: "(value: string) => void", description: "Called as the highlight moves." },
      { name: "loop", type: "boolean", default: "true", description: "Wrap from the last item to the first." },
    ] },
    { name: "MenuListItem", extends: "div", props: [
      { name: "value", type: "string", required: true, description: "Unique value for the highlight." },
      { name: "onSelect", type: "() => void", description: "Called on click or Enter." },
      { name: "disabled", type: "boolean", description: "Skipped by the keyboard, dimmed." },
    ], dataAttributes: [{ name: "data-highlighted", description: "Present on the highlighted item." }] },
    { name: "MenuListItemText", extends: "span", props: [
      { name: "title", type: "React.ReactNode", required: true, description: "The item label." },
      { name: "description", type: "React.ReactNode", description: "A muted second line." },
    ] },
  ],
} satisfies ComponentDoc
