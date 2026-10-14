import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import { ScrollReveal } from "@/components/ui/scroll-reveal"`,
    code: `<ScrollReveal>
  <FeatureCard />
</ScrollReveal>`,
  },
  examples: [
    {
      id: "directions",
      title: "Directions",
      description: "`from` picks the edge it slides in from and `distance` how far. With `once={false}` it replays on every entry.",
    },
    {
      id: "stagger",
      title: "Stagger",
      description: "Give siblings an increasing `delay` (100 ms apart). Here `amount=\"all\"` waits until the whole card is visible and `blur` is softened to 4px.",
    },
  ],
  notes: [
    {
      title: "Motion",
      body: "Slides on a spring while opacity and blur ease out. Under reduced motion it only fades in over 200 ms.",
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
