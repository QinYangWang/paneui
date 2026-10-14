import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import { Parallax } from "@/components/ui/parallax"`,
    code: `<Parallax speed={0.3}>
  <img src="/hero.jpg" alt="" />
</Parallax>`,
  },
  examples: [
    {
      id: "speeds",
      title: "Speeds",
      description: "Positive `speed` lags behind the scroll (farther away), negative runs ahead (closer), `0` stays put. Each card sits in its normal spot when centred.",
    },
    {
      id: "horizontal-axis",
      title: "Horizontal Axis",
      description: "`axis=\"x\"` turns vertical scroll into sideways drift.",
    },
    {
      id: "no-spring",
      title: "Without Spring",
      description: "`spring={false}` locks the drift to the scroll instead of easing after it.",
    },
  ],
  notes: [
    {
      title: "Motion",
      body: "Under reduced motion no transform is applied and the content stays in place.",
    },
    {
      title: "Related",
      body: "Reads the container from [Smooth Scroll](/docs/smooth-scroll). See also [Scroll Progress](/docs/scroll-progress), [Scroll To](/docs/scroll-to), [Scroll Reveal](/docs/scroll-reveal).",
    },
  ],
  api: [
    {
      name: "Parallax",
      description: "Drifts its content as it crosses the viewport of the nearest contained `SmoothScroll`, or the window.",
      extends: "motion.div",
      extendsHref: "https://motion.dev/docs/react-motion-component",
      props: [
        {
          name: "speed",
          type: "number",
          default: "0.2",
          description: "Drift per px scrolled. Positive lags (farther), negative leads (closer). 0.1–0.4 reads best.",
        },
        { name: "axis", type: `"x" | "y"`, default: `"y"`, description: "Direction of the drift." },
        {
          name: "container",
          type: "RefObject<HTMLElement | null>",
          description: "Scroll container. Defaults to the nearest contained SmoothScroll, then the window.",
        },
        { name: "spring", type: "boolean", default: "true", description: "Spring-smooth the drift." },
        { name: "style", type: "CSSProperties", description: "Plain styles; the drift transform is merged in." },
      ],
    },
  ],
} satisfies ComponentDoc
