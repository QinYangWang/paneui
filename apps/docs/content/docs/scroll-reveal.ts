import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Brings content into view as it scrolls onscreen.", "zh": "在内容进入视野时显示。"},
  usage: {
    imports: `import { ScrollReveal } from "@/components/ui/scroll-reveal"`,
    code: `<ScrollReveal>
  <FeatureCard />
</ScrollReveal>`,
  },
  examples: [
    {
      id: "directions",
      title: { en: "Directions", zh: "方向" },
    },
    {
      id: "stagger",
      title: { en: "Stagger", zh: "交错" },
      description: { en: "Use for lists and grids so items arrive one after another.", zh: "适用于需要依次显示的列表或网格。" },
    },
  ],
  notes: [
    {
      title: "Motion",
      body: { en: "Under reduced motion it only fades in, over 200 ms.", zh: "开启减少动态效果时，它仅在 200 ms 内淡入。" },
    },
    {
      title: "Related",
      body: { en: "Uses the container from [Smooth Scroll](/docs/smooth-scroll). See also [Scroll Progress](/docs/scroll-progress), [Scroll To](/docs/scroll-to).", zh: "使用 [Smooth Scroll](/docs/smooth-scroll) 中的容器。另见 [Scroll Progress](/docs/scroll-progress)、[Scroll To](/docs/scroll-to)。" },
    },
  ],
  api: [
    {
      name: "ScrollReveal",
      description: { en: "Fades, slides and unblurs its content in when it enters the nearest contained `SmoothScroll` or the viewport.", zh: "当内容进入最近的受控 `SmoothScroll` 或视口时，淡入、滑入并去模糊。" },
      extends: "motion.div",
      extendsHref: "https://motion.dev/docs/react-motion-component",
      props: [
        { name: "from", type: `"bottom" | "top" | "left" | "right"`, default: `"bottom"`, description: { en: "Edge the content slides in from.", zh: "内容从哪条边缘滑入。" } },
        { name: "distance", type: "number", default: "24", description: { en: "Slide distance in px.", zh: "滑入距离，单位 px。" } },
        { name: "blur", type: "number", default: "8", description: { en: "Starting blur in px.", zh: "初始模糊，单位 px。" } },
        { name: "delay", type: "number", default: "0", description: { en: "Delay in seconds, for staggering siblings.", zh: "延迟，单位秒，用于错开同级元素。" } },
        { name: "once", type: "boolean", default: "true", description: { en: "Reveal once, or every time it re-enters view.", zh: "仅显示一次，还是每次重新进入视口都显示。" } },
        { name: "amount", type: `"some" | "all" | number`, default: "0.3", description: { en: "How much must be visible to trigger.", zh: "触发所需的可见比例。" } },
        {
          name: "root",
          type: "RefObject<Element | null>",
          description: { en: "Scroll root. Defaults to the nearest contained SmoothScroll, then the viewport.", zh: "滚动根。默认为最近的受控 SmoothScroll，其次为视口。" },
        },
      ],
      dataAttributes: [{ name: "data-revealed", description: { en: "Present while the content is in view.", zh: "内容处于视图中时存在。" } }],
    },
  ],
} satisfies ComponentDoc
