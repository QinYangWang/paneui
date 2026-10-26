import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Button that scrolls to a section or position.", "zh": "滚动到指定位置。"},
  usage: {
    imports: `import { ScrollTo } from "@/components/ui/scroll-to"`,
    code: `<ScrollTo to="#pricing" offset={-64}>See pricing</ScrollTo>`,
  },
  examples: [
    {
      id: "variants",
      title: { en: "Variants and Sizes", zh: "样式与尺寸" },
    },
    {
      id: "duration",
      title: { en: "Duration", zh: "时长" },
    },
    {
      id: "window",
      title: { en: "Outside a Provider", zh: "独立使用" },
    },
  ],
  notes: [
    {
      title: "Accessibility",
      body: { en: "Set `focusTarget` to move keyboard focus to a selector or element target after scrolling (it adds `tabindex=\"-1\"` if needed). Under reduced motion the scroll jumps instead of easing.", zh: "设置 `focusTarget` 可在滚动后将键盘焦点移动到选择器或元素目标（如有需要会添加 `tabindex=\"-1\"`）。在减少动态效果下，滚动会直接跳转而不是缓动。" },
    },
    {
      title: "Related",
      body: { en: "Scrolls through [Smooth Scroll](/docs/smooth-scroll). See also [Scroll Progress](/docs/scroll-progress), [Scroll Reveal](/docs/scroll-reveal).", zh: "通过 [Smooth Scroll](/docs/smooth-scroll) 滚动。另见 [Scroll Progress](/docs/scroll-progress)、[Scroll Reveal](/docs/scroll-reveal)。" },
    },
  ],
  api: [
    {
      name: "ScrollTo",
      description: { en: "Button that eases to a target through the nearest `SmoothScroll`, or the window.", zh: "按钮，通过最近的 `SmoothScroll` 或 window 缓动到目标。" },
      extends: "Button",
      extendsHref: "/docs/button",
      props: [
        { name: "to", type: "number | string | HTMLElement", required: true, description: { en: "A px offset, a CSS selector or an element.", zh: "以 px 为单位的偏移量、CSS 选择器或元素。" } },
        { name: "offset", type: "number", description: { en: "Extra px from the target, e.g. `-64` to clear a sticky header.", zh: "距目标的额外 px，例如 `-64` 用于避开吸顶头部。" } },
        { name: "duration", type: "number", description: { en: "Ease duration in seconds, only inside a `SmoothScroll` that is easing.", zh: "缓动时长（秒），仅在正在缓动的 `SmoothScroll` 内有效。" } },
        { name: "focusTarget", type: "boolean", default: "false", description: { en: "Move keyboard focus to a selector or element target after scrolling.", zh: "滚动后将键盘焦点移动到选择器或元素目标。" } },
        {
          name: "onClick",
          type: "MouseEventHandler<HTMLButtonElement>",
          description: { en: "Runs before scrolling; call `event.preventDefault()` to cancel the scroll.", zh: "在滚动前运行；调用 `event.preventDefault()` 可取消滚动。" },
        },
        { name: "variant", type: "Button variant", default: `"secondary"`, description: { en: "Visual style.", zh: "视觉样式。" } },
      ],
    },
  ],
} satisfies ComponentDoc
