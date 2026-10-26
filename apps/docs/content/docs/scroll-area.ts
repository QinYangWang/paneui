import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Scroll container with thin scrollbars that stay inside its frame.", "zh": "为容器提供滚动区域。"},
  baseUi: {
    name: "Scroll Area",
    href: "https://base-ui.com/react/components/scroll-area",
  },
  usage: {
    imports: `import { ScrollArea } from "@/components/ui/scroll-area"`,
    code: `<ScrollArea className="h-72 rounded-2xl bg-card">
  <List />
</ScrollArea>`,
  },
  composition: `ScrollArea
├── Viewport
├── ScrollBar (vertical)
└── ScrollBar (horizontal)`,
  examples: [
    { id: "both", title: { en: "Both Axes", zh: "双轴" }, description: { en: "Use for grids and schedules wider and taller than their frame.", zh: "适用于超出容器宽高的网格或日程表。" } },
    { id: "sticky-header", title: { en: "Sticky Header", zh: "固定表头" },  },
  ],
  notes: [
    {
      title: "Track placement",
      body: { en: "Each track sits inside the frame, `scrollbarInset` (4px) from its edges, so it never runs past a rounded corner. Where a corner's radius would still clip the thumb's cap, that end moves in until the cap clears the curve by 1px (7px on an 18px corner). Where both bars show, each stops 8px short of the other. The thumb always covers the whole scroll range.", zh: "每条轨道位于框架内，距边缘 `scrollbarInset`（4px），因此不会越过圆角。如果某角的圆角仍会裁掉滑块的端帽，该端会向内移动，直到端帽与曲线间留有 1px（18px 圆角时为 7px）。两条滚动条同时显示时，各自在距对方 8px 处停止。滑块始终覆盖整个滚动范围。" },
    },
    {
      title: "Visibility",
      body: { en: "The 6px bars overlay the content and take no width. They show while the pointer is over the area or it is scrolling, and fade out 300ms after. The hit area is 4px wider on each side than the track.", zh: "6px 的滚动条覆盖在内容之上，不占宽度。指针悬停在该区域或滚动时显示，300ms 后淡出。点击区域比轨道每侧宽 4px。" },
    },
    {
      title: "Height",
      body: { en: "Give the root a fixed height (`h-72`), or leave it auto and put `max-h-*` on `viewportClassName`. A `max-h-*` on the root alone never scrolls.", zh: "给根节点固定高度（`h-72`），或保持自动并在 `viewportClassName` 上设置 `max-h-*`。仅在根节点上设置 `max-h-*` 不会滚动。" },
    },
    {
      title: "Accessibility",
      body: { en: "The viewport joins the tab order only while it can scroll, so keyboard users can scroll it with the arrow keys; it shows the focus ring inset.", zh: "视口仅在可滚动时加入 Tab 顺序，因此键盘用户可用方向键滚动它；它显示内嵌的焦点环。" },
    },
    {
      title: "Overlays",
      body: { en: "The root publishes `--scroll-area-inset`, `--scroll-area-radius-top` and `--scroll-area-radius-bottom`, so content inside can follow the frame's edge. [Scroll Progress](/docs/scroll-progress) uses them for its sticky bar.", zh: "根节点发布 `--scroll-area-inset`、`--scroll-area-radius-top` 和 `--scroll-area-radius-bottom`，使内部内容可沿框架边缘对齐。[Scroll Progress](/docs/scroll-progress) 用它们实现其粘性条。" },
    },
  ],
  api: [
    {
      name: "ScrollArea",
      description: { en: "Root and viewport in one, with its own scrollbars.", zh: "根节点与视口合一，自带滚动条。" },
      extends: "ScrollArea.Root",
      extendsHref: "https://base-ui.com/react/components/scroll-area#root",
      props: [
        { name: "orientation", type: `"vertical" | "horizontal" | "both"`, default: `"vertical"`, description: { en: "Which scrollbars to show. The other axis is clipped.", zh: "显示哪些滚动条。另一轴会被裁剪。" } },
        { name: "scrollbarInset", type: "number", default: "4", description: { en: "Gap in px between each track and the frame edges.", zh: "每条轨道与框架边缘之间的间隙，单位 px。" } },
        {
          name: "scrollbarMargin",
          type: "{ top?: number; bottom?: number; start?: number; end?: number }",
          description: { en: "Extra px on one side, added to the inset, such as a sticky header's height on `top`.", zh: "在 inset 基础上于某一侧额外增加的 px，例如 `top` 上粘性头部的高度。" },
        },
        { name: "fade", type: "boolean", default: "false", description: { en: "Fades content over 24px at an edge while there is more to scroll there.", zh: "当该边缘还有更多可滚动内容时，在边缘 24px 范围内淡出内容。" } },
        { name: "viewportRef", type: "Ref<HTMLDivElement>", description: { en: "The element that scrolls, for scroll listeners, virtualizers and `scrollTo`.", zh: "滚动的元素，供滚动监听、虚拟化器和 `scrollTo` 使用。" } },
        { name: "viewportClassName", type: "string", description: { en: "Classes for the element that scrolls.", zh: "滚动元素的类名。" } },
        { name: "viewportProps", type: "ComponentProps<\"div\">", description: { en: "Props for the element that scrolls, such as `role`, `aria-*`, `onScroll` or `style`.", zh: "滚动元素的属性，如 `role`、`aria-*`、`onScroll` 或 `style`。" } },
      ],
      dataAttributes: [
        { name: "data-scrolling", description: { en: "Present while the area is scrolling.", zh: "该区域滚动时存在。" } },
        { name: "data-has-overflow-x / -y", description: { en: "Present while the content overflows on that axis.", zh: "内容在该轴上溢出时存在。" } },
        { name: "data-overflow-y-start / -end", description: { en: "Present while there is more to scroll towards that edge (also `-x-`).", zh: "该边缘方向还有更多可滚动内容时存在（也包括 `-x-`）。" } },
      ],
    },
    {
      name: "ScrollBar",
      description: { en: "One overlay scrollbar, placed from the root's inset variables. `ScrollArea` renders its own; use this only when composing the primitive parts yourself.", zh: "一条叠加滚动条，位置由根节点的 inset 变量决定。`ScrollArea` 会自行渲染；仅在你自行组合原始部件时使用。" },
      extends: "ScrollArea.Scrollbar",
      extendsHref: "https://base-ui.com/react/components/scroll-area#scrollbar",
      props: [{ name: "orientation", type: `"vertical" | "horizontal"`, default: `"vertical"`, description: { en: "Axis the bar scrolls.", zh: "滚动条所在的轴。" } }],
      dataAttributes: [{ name: "data-hovering", description: { en: "Present while the pointer is over the area.", zh: "指针悬停在该区域时存在。" } }],
    },
  ],
} satisfies ComponentDoc
