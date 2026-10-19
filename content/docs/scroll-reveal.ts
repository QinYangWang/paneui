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
      body: "Under reduced motion it only fades in, over 200 ms.",
    },
    {
      title: "Related",
      body: "Uses the container from [Smooth Scroll](/docs/smooth-scroll). See also [Scroll Progress](/docs/scroll-progress), [Scroll To](/docs/scroll-to).",
    },
  ],
  api: [
    {
      name: "ScrollReveal",
      description: "Fades, slides and unblurs its content in when it enters the nearest contained `SmoothScroll` or the viewport.",
      extends: "motion.div",
      extendsHref: "https://motion.dev/docs/react-motion-component",
      props: [
        { name: "from", type: `"bottom" | "top" | "left" | "right"`, default: `"bottom"`, description: "Edge the content slides in from." },
        { name: "distance", type: "number", default: "24", description: "Slide distance in px." },
        { name: "blur", type: "number", default: "8", description: "Starting blur in px." },
        { name: "delay", type: "number", default: "0", description: "Delay in seconds, for staggering siblings." },
        { name: "once", type: "boolean", default: "true", description: "Reveal once, or every time it re-enters view." },
        { name: "amount", type: `"some" | "all" | number`, default: "0.3", description: "How much must be visible to trigger." },
        {
          name: "root",
          type: "RefObject<Element | null>",
          description: "Scroll root. Defaults to the nearest contained SmoothScroll, then the viewport.",
        },
      ],
      dataAttributes: [{ name: "data-revealed", description: "Present while the content is in view." }],
    },
  ],
} satisfies ComponentDoc
