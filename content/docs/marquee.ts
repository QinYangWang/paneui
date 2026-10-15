import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import { Marquee } from "@/components/ui/marquee"`,
    code: `<Marquee>
  <span>Dinner booked for Friday</span>
  <span>Flight to Tokyo held</span>
</Marquee>`,
  },
  examples: [
    {
      id: "vertical",
      title: "Vertical",
      description: "Use `direction=\"up\"` or `\"down\"` for a column, and give the parent a fixed height.",
    },
    {
      id: "no-fade",
      title: "Without Fade",
      description: "Turn off `fade` and `pauseOnHover` for decorative strips with nothing to read or click.",
    },
    {
      id: "repeat",
      title: "Repeat",
      description: "Raise `repeat` when the items are narrower than the container so the track never shows a gap.",
    },
  ],
  notes: [
    {
      title: "Accessibility",
      body: "Only the first copy of the content is exposed; the repeats are `aria-hidden` and `inert`. By default the loop pauses on hover and while anything inside has keyboard focus.",
    },
    {
      title: "Motion",
      body: "Under `prefers-reduced-motion: reduce` the track is paused in place.",
    },
  ],
  api: [
    {
      name: "Marquee",
      description: "Loops its children endlessly along one axis with a CSS animation.",
      extends: "div",
      props: [
        {
          name: "direction",
          type: `"left" | "right" | "up" | "down"`,
          default: `"left"`,
          description: "Scroll direction.",
        },
        { name: "duration", type: "number", default: "30", description: "Seconds for one full loop of the content." },
        { name: "gap", type: "string", default: `"1rem"`, description: "Space between items (any CSS length)." },
        {
          name: "pauseOnHover",
          type: "boolean",
          default: "true",
          description: "Pause while hovered or while something inside has focus.",
        },
        { name: "fade", type: "boolean", default: "true", description: "Fade the leading and trailing edges with a mask." },
        {
          name: "repeat",
          type: "number",
          default: "2",
          description: "Copies of the content in the track (minimum 2).",
        },
      ],
      dataAttributes: [
        { name: "data-orientation", description: `"horizontal" or "vertical", from \`direction\`.` },
        { name: "data-slot", description: `"marquee" on the root (unclipped, so a border or ring on it stays visible), "marquee-viewport" on the inner element that clips and fades, "marquee-track" on each copy.` },
      ],
    },
  ],
} satisfies ComponentDoc
