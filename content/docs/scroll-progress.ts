import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import { ScrollProgress } from "@/components/ui/scroll-progress"`,
    code: `<ScrollProgress />`,
  },
  examples: [
    {
      id: "bottom-bar",
      title: "Bottom Bar",
      description: "Put the bar last with `side=\"bottom\"` and `position=\"sticky\"` to pin it to the bottom of a scroll container; `thickness` sets its height and `spring={false}` makes it track exactly.",
    },
    {
      id: "ring-sizes",
      title: "Ring Sizes",
      description: "`variant=\"ring\"` takes `size`, `thickness` and `showValue` for the percentage in the middle.",
    },
    {
      id: "custom-progress",
      title: "Custom Progress",
      description: "Pass any 0–1 `MotionValue` as `progress` to drive the indicator from something other than scroll, like an upload.",
    },
  ],
  notes: [
    {
      title: "Accessibility",
      body: "Both variants are a `role=\"progressbar\"` with `aria-valuenow` from 0 to 100, kept in step without re-rendering. Name it with `label`. Under reduced motion the spring follow is off.",
    },
    {
      title: "Related",
      body: "Reads [Smooth Scroll](/docs/smooth-scroll) by default. See also [Scroll To](/docs/scroll-to), [Scroll Reveal](/docs/scroll-reveal).",
    },
  ],
  api: [
    {
      name: "ScrollProgress",
      description: "A bar (default) or ring that fills with scroll progress from the nearest `SmoothScroll`, or the window outside one. Renders a `div`; no other props pass through.",
      props: [
        { name: "variant", type: `"bar" | "ring"`, default: `"bar"`, description: "Indicator shape." },
        { name: "progress", type: "MotionValue<number>", description: "Custom 0–1 source. Defaults to the nearest SmoothScroll (or the window)." },
        { name: "spring", type: "boolean", default: "true", description: "Spring-smooth the indicator. Off automatically under reduced motion." },
        { name: "label", type: "string", default: `"Reading progress"`, description: "Accessible name of the progressbar." },
        { name: "className", type: "string", description: "Merged onto the root." },
        { name: "side", type: `"top" | "bottom"`, default: `"top"`, description: "Bar only. Edge the bar sticks to." },
        {
          name: "position",
          type: `"fixed" | "sticky" | "absolute"`,
          default: `"fixed"`,
          description: "Bar only. `fixed` for the page, `sticky` inside a scroll container, `absolute` inside a relative box.",
        },
        { name: "thickness", type: "number", default: "3", description: "Bar height or ring stroke width in px." },
        { name: "size", type: "number", default: "44", description: "Ring only. Diameter in px." },
        { name: "showValue", type: "boolean", default: "false", description: "Ring only. Show the percentage in the middle." },
      ],
      dataAttributes: [{ name: "data-variant", description: "`bar` or `ring` on the root." }],
    },
  ],
} satisfies ComponentDoc
