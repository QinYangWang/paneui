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
      body: "Set `focusTarget` to move keyboard focus to a selector or element target after scrolling (it adds `tabindex=\"-1\"` if needed). Under reduced motion the scroll jumps instead of easing.",
    },
    {
      title: "Related",
      body: "Scrolls through [Smooth Scroll](/docs/smooth-scroll). See also [Scroll Progress](/docs/scroll-progress), [Scroll Reveal](/docs/scroll-reveal).",
    },
  ],
  api: [
    {
      name: "ScrollTo",
      description: "Button that eases to a target through the nearest `SmoothScroll`, or the window.",
      extends: "Button",
      extendsHref: "/docs/button",
      props: [
        { name: "to", type: "number | string | HTMLElement", required: true, description: "A px offset, a CSS selector or an element." },
        { name: "offset", type: "number", description: "Extra px from the target, e.g. `-64` to clear a sticky header." },
        { name: "duration", type: "number", description: "Ease duration in seconds, only inside a `SmoothScroll` that is easing." },
        { name: "focusTarget", type: "boolean", default: "false", description: "Move keyboard focus to a selector or element target after scrolling." },
        {
          name: "onClick",
          type: "MouseEventHandler<HTMLButtonElement>",
          description: "Runs before scrolling; call `event.preventDefault()` to cancel the scroll.",
        },
        { name: "variant", type: "Button variant", default: `"secondary"`, description: "Visual style." },
      ],
    },
  ],
} satisfies ComponentDoc
