import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: { en: "Opens search from a responsive toolbar button.", zh: "通过自适应工具栏按钮打开搜索。" },
  usage: {
    imports: `import { SearchButton } from "@/components/ui/search-button"`,
    code: `<SearchButton label="Search documentation" onClick={openSearch} />`,
  },
  examples: [
    { id: "disabled", title: { en: "Disabled", zh: "禁用" } },
    { id: "rtl", title: { en: "RTL", zh: "从右到左" } },
  ],
  notes: [{ title: "Keyboard", body: { en: "The application opens search on click and registers its shortcut. The hint does not register a listener.", zh: "应用负责在点击时打开搜索并注册快捷键。按键提示不会注册监听器。" } }],
  api: [{ name: "SearchButton", extends: "button", props: [
    { name: "label", type: "string", description: { en: "Visible text and accessible name; defaults to the locale’s search label.", zh: "显示文字与无障碍名称；默认使用当前语言的搜索标签。" } },
    { name: "shortcut", type: "React.ReactNode", default: "⌘K", description: { en: "Shortcut hint; null hides it. Text and hint appear from 640px.", zh: "快捷键提示，设为 null 可隐藏。文字与提示在宽度达到 640px 时显示。" } },
  ] }],
} satisfies ComponentDoc
