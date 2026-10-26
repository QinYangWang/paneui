import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Shows how far the reader has scrolled.", "zh": "显示阅读进度。"},
  usage: {
    imports: `import { ScrollProgress } from "@/components/ui/scroll-progress"`,
    code: `<ScrollProgress />`,
  },
  examples: [
    {
      id: "bottom-bar",
      title: { en: "Bottom Bar", zh: "底部进度条" },
      description: { en: "Use inside a scroll container, pinned to its bottom edge.", zh: "适用于容器内部的底部进度条。" },
    },
    {
      id: "ring-sizes",
      title: { en: "Ring Sizes", zh: "环形尺寸" },
      description: { en: "Use the ring where an edge bar has no room, such as a floating button.", zh: "适用于无法放置边缘进度条的场景。" },
    },
    {
      id: "custom-progress",
      title: { en: "Custom Progress", zh: "自定义进度" },
      description: { en: "Use to show progress that isn't scroll, like an upload.", zh: "也可用于上传等任务进度。" },
    },
  ],
  notes: [
    {
      title: "Accessibility",
      body: { en: "Both variants are a `role=\"progressbar\"` with `aria-valuenow` from 0 to 100, kept in step without re-rendering. Name it with `label`. Under reduced motion the spring follow is off.", zh: "两种变体都是 `role=\"progressbar\"`，`aria-valuenow` 从 0 到 100，无需重新渲染即可同步更新。用 `label` 为其命名。开启减少动态效果时关闭弹簧跟随。" },
    },
    {
      title: "Inside a frame",
      body: { en: "A `sticky` bar takes no room in the flow: it overlays the content's edge, inset from the frame like the scrollbars, and its ends follow the frame's corners (radius less the inset), so it never runs past a rounded edge.", zh: "`sticky` 条不占文档流空间：它覆盖在内容边缘上，像滚动条一样从框架内缩进，两端跟随框架的圆角（半径减去 inset），因此不会越过圆角边缘。" },
    },
    {
      title: "Related",
      body: { en: "Reads [Smooth Scroll](/docs/smooth-scroll) by default. See also [Scroll To](/docs/scroll-to), [Scroll Reveal](/docs/scroll-reveal).", zh: "默认读取 [Smooth Scroll](/docs/smooth-scroll)。另见 [Scroll To](/docs/scroll-to)、[Scroll Reveal](/docs/scroll-reveal)。" },
    },
  ],
  api: [
    {
      name: "ScrollProgress",
      description: { en: "A bar (default) or ring that fills with scroll progress from the nearest `SmoothScroll`, or the window outside one. Renders a `div`; no other props pass through.", zh: "一个条形（默认）或环形指示器，按最近的 `SmoothScroll`（若无则在窗口上）的滚动进度填充。渲染一个 `div`；其他属性不会透传。" },
      props: [
        { name: "variant", type: `"bar" | "ring"`, default: `"bar"`, description: { en: "Indicator shape.", zh: "指示器形状。" } },
        { name: "progress", type: "MotionValue<number>", description: { en: "Custom 0–1 source. Defaults to the nearest SmoothScroll (or the window).", zh: "自定义 0–1 的进度源。默认为最近的 SmoothScroll（或窗口）。" } },
        { name: "spring", type: "boolean", default: "true", description: { en: "Spring-smooth the indicator. Off automatically under reduced motion.", zh: "用弹簧平滑指示器。开启减少动态效果时自动关闭。" } },
        { name: "label", type: "string", default: `"Reading progress"`, description: { en: "Accessible name of the progressbar.", zh: "进度条的辅助名称。" } },
        { name: "className", type: "string", description: { en: "Merged onto the root.", zh: "合并到根元素上。" } },
        { name: "side", type: `"top" | "bottom"`, default: `"top"`, description: { en: "Bar only. Edge the bar sticks to.", zh: "仅条形。条所贴靠的边缘。" } },
        {
          name: "position",
          type: `"fixed" | "sticky" | "absolute"`,
          default: `"fixed"`,
          description: { en: "Bar only. `fixed` for the page, `sticky` inside a scroll container, `absolute` inside a relative box.", zh: "仅条形。`fixed` 用于页面，`sticky` 用于滚动容器内，`absolute` 用于相对定位的盒子内。" },
        },
        { name: "thickness", type: "number", default: "3", description: { en: "Bar height or ring stroke width in px.", zh: "条形高度或环形描边宽度，单位 px。" } },
        {
          name: "inset",
          type: "number",
          description: { en: "Bar only. Gap in px from the container's edges. A `sticky` bar defaults to its scroll area's scrollbar inset (4px) and bends with the frame's rounded corners; other positions default to 0.", zh: "仅条形。距容器边缘的间隙，单位 px。`sticky` 条默认为其滚动区域的滚动条 inset（4px）并随框架圆角弯曲；其他位置默认为 0。" },
        },
        { name: "size", type: "number", default: "44", description: { en: "Ring only. Diameter in px.", zh: "仅环形。直径，单位 px。" } },
        { name: "showValue", type: "boolean", default: "false", description: { en: "Ring only. Show the percentage in the middle.", zh: "仅环形。在中心显示百分比。" } },
      ],
      dataAttributes: [{ name: "data-variant", description: { en: "`bar` or `ring` on the root.", zh: "根节点上的 `bar` 或 `ring`。" } }],
    },
  ],
} satisfies ComponentDoc
