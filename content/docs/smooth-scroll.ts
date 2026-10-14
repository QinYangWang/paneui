import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import { SmoothScroll } from "@/components/ui/smooth-scroll"`,
    code: `<SmoothScroll className="h-80">
  <Article />
</SmoothScroll>`,
  },
  examples: [
    {
      id: "horizontal",
      title: "Horizontal",
      description: "`orientation=\"horizontal\"` lays the content out in a row and eases sideways wheel and trackpad scroll.",
    },
    {
      id: "easing",
      title: "Lerp vs Duration",
      description: "A lower `lerp` feels heavier; a fixed `duration` uses an exponential ease instead. `wheelMultiplier` scales each wheel step.",
    },
    {
      id: "scroll-to-section",
      title: "Scroll to Section",
      description: "Call `scrollTo` from `useSmoothScroll()` with a selector, element or px value; a negative `offset` clears a sticky header.",
    },
  ],
  notes: [
    {
      title: "Motion",
      body: "Easing is powered by Lenis. Under reduced motion no Lenis instance is created: scrolling is native and `scrollTo` jumps instead of animating. Touch scrolling stays native unless you set `touch`.",
    },
    {
      title: "Related",
      body: "Scroll-driven parts read this provider: [Scroll Progress](/docs/scroll-progress), [Parallax](/docs/parallax), [Scroll To](/docs/scroll-to), [Scroll Reveal](/docs/scroll-reveal).",
    },
  ],
  api: [
    {
      name: "SmoothScroll",
      description: "Eased scroll container (or, with `root`, a provider that eases the window).",
      extends: "div",
      props: [
        {
          name: "root",
          type: "boolean",
          default: "false",
          description: "`true` eases the whole page and renders only the provider. `false` renders its own scroll container; give it a height.",
        },
        { name: "lerp", type: "number", default: "0.1", description: "Smoothing per frame, 0–1. Lower is heavier. Ignored when `duration` is set." },
        { name: "duration", type: "number", description: "Fixed ease duration in seconds for wheel and programmatic scrolls." },
        { name: "orientation", type: `"vertical" | "horizontal"`, default: `"vertical"`, description: "Scroll axis." },
        { name: "wheelMultiplier", type: "number", default: "1", description: "Multiplies wheel deltas." },
        { name: "touch", type: "boolean", default: "false", description: "Ease touch scrolling too. Off by default so phones keep native momentum." },
        { name: "contentClassName", type: "string", description: "Class for the inner content element (contained mode only)." },
      ],
      dataAttributes: [{ name: "data-smooth", description: "Present on the container while Lenis is easing it." }],
    },
    {
      name: "useSmoothScroll",
      description: "Scroll state for the nearest `SmoothScroll`. Outside a provider it falls back to the window's native scroll.",
      props: [
        { name: "lenis", type: "Lenis | null", description: "The Lenis instance, or `null` on the native / reduced-motion path." },
        { name: "smooth", type: "boolean", description: "Whether scrolling is currently eased." },
        { name: "container", type: "RefObject<HTMLElement | null> | null", description: "The scroll container, or `null` for the window." },
        { name: "offset", type: "MotionValue<number>", description: "Current scroll offset in px." },
        { name: "progress", type: "MotionValue<number>", description: "Scroll position from 0 (start) to 1 (end)." },
        { name: "velocity", type: "MotionValue<number>", description: "Signed scroll velocity in px per frame." },
        {
          name: "scrollTo",
          type: "(target: number | string | HTMLElement, options?: { offset?: number; duration?: number; immediate?: boolean }) => void",
          description: "Scroll to a px offset, selector or element. Jumps under reduced motion.",
        },
      ],
    },
    {
      name: "useSmoothScrollContainer",
      description: "The nearest `SmoothScroll`'s container ref, or `null` for the window or no provider. Pass it to motion's `useScroll({ container })`.",
      props: [],
    },
  ],
} satisfies ComponentDoc
