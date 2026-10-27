import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Follows your reading position in the page outline.", "zh": "跟随阅读位置显示页面目录。"},
  usage: {
    imports: `import { Outline, OutlinePopover, type OutlineItem } from "@/components/ui/outline"`,
    code: `const items: OutlineItem[] = [
  { id: "installation", title: "Installation", depth: 2 },
  { id: "usage", title: "Usage", depth: 2 },
  { id: "props", title: "Props", depth: 3 },
]

<aside className="sticky top-20 w-48 max-xl:hidden">
  <Outline items={items} />
</aside>
<OutlinePopover items={items} className="xl:hidden" />`,
  },
  composition: `Outline              nav: title, scrolling list with the track, Back to top
OutlinePopover       nav: a button with the current section, the same list in a popover
useActiveHeading     the id of the section being read`,
  examples: [
    { id: "variants", title: { en: "Variants", zh: "变体" }, description: { en: "`section` marks one entry, `range` the entries on screen, `progress` how far the page is read.", zh: "`section` 标记一条，`range` 标记屏幕上的条目，`progress` 标记已读进度。" } },
    { id: "popover", title: { en: "Popover", zh: "浮层" }, description: { en: "Use below the breakpoint where the rail no longer fits, or on full-width pages.", zh: "适用于放不下侧栏目录的窄屏或全宽页面。" } },
    { id: "router-links", title: { en: "Router Links", zh: "路由链接" },  },
    { id: "rtl", title: { en: "RTL", zh: "从右到左" },  },
  ],
  notes: [
    {
      title: "Headings",
      body: { en: "Items point at headings by `id`, so ids from rehype-slug or your own anchors both work. The list renders on the server; the track and the current section are measured after hydration.", zh: "项目通过 `id` 指向标题，因此来自 rehype-slug 或你自己的锚点的 id 都可以。列表在服务器上渲染；轨道和当前部分在水合后测量。" },
    },
    {
      title: "Current section",
      body: { en: "A heading is current once its top passes `activeLine` (px from the top of the viewport) by 8px, and stays current until it moves back 8px, so a heading resting on the line never flickers. Over the last screen of scroll the line slides to the bottom edge, so short sections at the end each light up in turn. A clicked entry holds while the page scrolls to it. Set `activeLine` below your sticky header.", zh: "当标题的顶部超过 `activeLine`（距视口顶部的 px）8px 时，该标题为当前，并保持当前直到它移回 8px，因此停留在该线上的标题永远不会闪烁。在滚动的最后一屏，该线滑到边缘底部，因此末尾的短部分依次亮起。点击的条目在页面滚动到它时保持。将 `activeLine` 设置在你的粘性标题下方。" },
    },
    {
      title: "Track",
      body: { en: "The track lights one entry by default. `variant=\"range\"` lights everything from the current entry down to the last one still on screen, so the lit stretch matches what the page is showing. `variant=\"progress\"` lights a single travelling edge from the top of the list to the bottom, one entry per step.", zh: "轨道默认点亮一个条目。`variant=\"range\"` 从当前条目一直点亮到屏幕上仍可见的最后一条，因此亮起范围与页面显示的内容一致。`variant=\"progress\"` 从列表顶端到底端点亮一条移动的边线，每条一步。" },
    },
    {
      title: "Motion",
      body: { en: "The lit stretch of the track slides between entries over 300ms; under reduced motion it moves without a transition. When the list scrolls, it moves only as far as the current entry needs and without animation, so it never fights the page scroll.", zh: "轨道的亮起部分在条目之间滑动，持续 300ms；在减少动态效果下，它移动时没有过渡。当列表滚动时，它只移动到当前条目所需的距离，并且没有动画，因此它永远不会与页面滚动冲突。" },
    },
  ],
  api: [
    {
      name: "Outline",
      extends: "nav",
      props: [
        { name: "items", type: "readonly OutlineItem[]", required: true, description: { en: "`{ id, title, depth }`, with `depth` 2 for an h2 and 3 for an h3.", zh: "`{ id, title, depth }`，其中 h2 的 `depth` 为 2，h3 的为 3。" } },
        { name: "title", type: "React.ReactNode", default: "`labels.onThisPage`", description: { en: "Heading above the list; `null` hides it. The default comes from the locale.", zh: "列表上方的标题；`null` 隐藏它。默认值来自区域设置。" } },
        { name: "activeLine", type: "number", default: "112", description: { en: "Px from the top of the viewport a heading must pass to become current.", zh: "标题必须超过距视口顶部的 px 才能成为当前。" } },
        { name: "backToTop", type: "boolean", default: "true", description: { en: "Shows the locale's `backToTop` link under the list after 320px of scrolling. The row and its divider fade in together; before that the row keeps its space but shows nothing.", zh: "在滚动 320px 后，在列表下方显示区域设置的 `backToTop` 链接。行及其分隔线一起淡入；在此之前，行保留其空间但不显示任何内容。" } },
        { name: "maxHeight", type: "string", default: `"calc(100svh - 6.5rem)"`, description: { en: "Cap for the outline; the list scrolls inside it.", zh: "大纲的上限；列表在其中滚动。" } },
        { name: "variant", type: `"section" | "range" | "progress"`, default: `"section"`, description: { en: "What the track lights. `section` marks the entry being read, `range` every entry the page is showing, `progress` how far the page is read.", zh: "轨道点亮什么。`section` 标记正在读的条目，`range` 标记页面正在显示的所有条目，`progress` 标记已读进度。" } },
        { name: "renderLink", type: "(props, item) => React.ReactElement", description: { en: "Swap each `<a>` for your own element; spread `props` onto it.", zh: "将每个 `<a>` 替换为你自己的元素；将 `props` 展开到它上面。" } },
      ],
    },
    {
      name: "OutlinePopover",
      extends: "nav",
      description: { en: "The trigger fills the nav, so size it with `className`.", zh: "触发器填充导航，因此使用 `className` 调整大小。" },
      props: [
        { name: "items", type: "readonly OutlineItem[]", required: true, description: { en: "Same as `Outline`.", zh: "与 `Outline` 相同。" } },
        { name: "title", type: "React.ReactNode", default: "`labels.onThisPage`", description: { en: "Button label before the current section. The default comes from the locale.", zh: "当前部分之前的按钮标签。默认值来自区域设置。" } },
        { name: "activeLine", type: "number", default: "112", description: { en: "Same as `Outline`.", zh: "与 `Outline` 相同。" } },
        { name: "variant", type: `"section" | "range" | "progress"`, default: `"section"`, description: { en: "Same as `Outline`.", zh: "与 `Outline` 相同。" } },
        { name: "backToTop", type: "boolean", default: "true", description: { en: "Back to top in the popover once the page has scrolled.", zh: "页面滚动后，在弹出层中返回顶部。" } },
        { name: "renderLink", type: "(props, item) => React.ReactElement", description: { en: "Same as `Outline`.", zh: "与 `Outline` 相同。" } },
      ],
    },
    {
      name: "useActiveHeading",
      description: { en: "`useActiveHeading(ids, { line })` returns the id of the section being read.", zh: "`useActiveHeading(ids, { line })` 返回正在阅读的部分的 id。" },
      props: [
        { name: "ids", type: "readonly string[]", required: true, description: { en: "Heading ids in page order.", zh: "按页面顺序的标题 id。" } },
        { name: "line", type: "number", default: "112", description: { en: "Px from the top of the viewport.", zh: "距视口顶部的 px。" } },
      ],
    },
  ],
} satisfies ComponentDoc
