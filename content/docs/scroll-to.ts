import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import { ScrollTo } from "@/components/ui/scroll-to"`,
    code: `<ScrollTo to="#pricing" offset={-64}>See pricing</ScrollTo>`,
  },
  examples: [
    {
      id: "variants",
      title: "Variants and Sizes",
      description: "It is a `Button`, so every `variant` and `size` works. It defaults to `secondary`.",
    },
    {
      id: "duration",
      title: "Duration",
      description: "`duration` sets the ease length in seconds when a `SmoothScroll` is easing; `to` also takes a px offset like `0`.",
    },
    {
      id: "window",
      title: "Outside a Provider",
      description: "Without a `SmoothScroll` around it, it uses the window's native smooth scrolling. This one scrolls the docs page.",
    },
  ],
  notes: [
    {
      title: "Accessibility",
      body: "Set `focusTarget` to move keyboard focus to a selector or element target after scrolling (it adds `tabindex=\"-1\"` if needed). Under reduced motion the scroll jumps instead of easing.",
    },
    {
      title: "Related",
      body: "Scrolls through [Smooth Scroll](/docs/smooth-scroll). See also [Scroll Progress](/docs/scroll-progress), [Parallax](/docs/parallax), [Scroll Reveal](/docs/scroll-reveal).",
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
        { name: "duration", type: "number", description: "Ease duration in seconds (Lenis path only)." },
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
