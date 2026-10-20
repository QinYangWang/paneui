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
      body: "Each track sits inside the frame, `scrollbarInset` (4px) from its edges, so it never runs past a rounded corner. Where a corner's radius would still clip the thumb's cap, that end moves in until the cap clears the curve by 1px (7px on an 18px corner). Where both bars show, each stops 8px short of the other. The thumb always covers the whole scroll range.",
    },
    {
      title: "Visibility",
      body: "The 6px bars overlay the content and take no width. They show while the pointer is over the area or it is scrolling, and fade out 300ms after. The hit area is 4px wider on each side than the track.",
    },
    {
      title: "Height",
      body: "Give the root a fixed height (`h-72`), or leave it auto and put `max-h-*` on `viewportClassName`. A `max-h-*` on the root alone never scrolls.",
    },
    {
      title: "Accessibility",
      body: "The viewport joins the tab order only while it can scroll, so keyboard users can scroll it with the arrow keys; it shows the focus ring inset.",
    },
    {
      title: "Overlays",
      body: "The root publishes `--scroll-area-inset`, `--scroll-area-radius-top` and `--scroll-area-radius-bottom`, so content inside can follow the frame's edge. [Scroll Progress](/docs/scroll-progress) uses them for its sticky bar.",
    },
  ],
  api: [
    {
      name: "ScrollArea",
      description: "Root and viewport in one, with its own scrollbars.",
      extends: "ScrollArea.Root",
      extendsHref: "https://base-ui.com/react/components/scroll-area#root",
      props: [
        { name: "orientation", type: `"vertical" | "horizontal" | "both"`, default: `"vertical"`, description: "Which scrollbars to show. The other axis is clipped." },
        { name: "scrollbarInset", type: "number", default: "4", description: "Gap in px between each track and the frame edges." },
        {
          name: "scrollbarMargin",
          type: "{ top?: number; bottom?: number; start?: number; end?: number }",
          description: "Extra px on one side, added to the inset, such as a sticky header's height on `top`.",
        },
        { name: "fade", type: "boolean", default: "false", description: "Fades content over 24px at an edge while there is more to scroll there." },
        { name: "viewportRef", type: "Ref<HTMLDivElement>", description: "The element that scrolls, for scroll listeners, virtualizers and `scrollTo`." },
        { name: "viewportClassName", type: "string", description: "Classes for the element that scrolls." },
        { name: "viewportProps", type: "ComponentProps<\"div\">", description: "Props for the element that scrolls, such as `role`, `aria-*`, `onScroll` or `style`." },
      ],
      dataAttributes: [
        { name: "data-scrolling", description: "Present while the area is scrolling." },
        { name: "data-has-overflow-x / -y", description: "Present while the content overflows on that axis." },
        { name: "data-overflow-y-start / -end", description: "Present while there is more to scroll towards that edge (also `-x-`)." },
      ],
    },
    {
      name: "ScrollBar",
      description: "One overlay scrollbar, placed from the root's inset variables. `ScrollArea` renders its own; use this only when composing the primitive parts yourself.",
      extends: "ScrollArea.Scrollbar",
      extendsHref: "https://base-ui.com/react/components/scroll-area#scrollbar",
      props: [{ name: "orientation", type: `"vertical" | "horizontal"`, default: `"vertical"`, description: "Axis the bar scrolls." }],
      dataAttributes: [{ name: "data-hovering", description: "Present while the pointer is over the area." }],
    },
  ],
} satisfies ComponentDoc
