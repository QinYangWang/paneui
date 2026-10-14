import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import { SlideActionButton } from "@/components/ui/slide-action-button"`,
    code: `<SlideActionButton onComplete={pay}>Slide to pay</SlideActionButton>`,
  },
  examples: [
    {
      id: "async",
      title: "Async",
      description: "Return a promise from `onComplete` to show `pendingLabel` with a spinner; a rejection springs the thumb back to the start.",
    },
    {
      id: "threshold",
      title: "Threshold",
      description: "`threshold` is the fraction of the track the thumb must pass to confirm on release (default `0.9`).",
    },
    {
      id: "stay-complete",
      title: "Stay Complete",
      description: "Pass `resetDelay={null}` to keep the confirmed state; `thumbIcon` replaces the chevron.",
    },
    { id: "disabled", title: "Disabled" },
  ],
  notes: [
    {
      title: "Keyboard",
      body: "The thumb is a `role=\"slider\"`. `ArrowRight` / `ArrowUp` step a quarter of the track (confirming past the threshold), `ArrowLeft` / `ArrowDown` step back, `Home` or `Escape` return to the start, and `End`, `Enter` or `Space` confirm.",
    },
    {
      title: "Motion",
      body: "The thumb springs (420 / 34) and the idle label shimmers via [Text Shimmer](/docs/text-shimmer). With reduced motion springs become 200ms tweens and labels cross-fade.",
    },
  ],
  api: [
    {
      name: "SlideActionButton",
      description: "Drag-to-confirm track with a draggable thumb. Width defaults to 288px; set `className=\"w-full\"` to fill.",
      props: [
        { name: "children", type: "ReactNode", required: true, description: "Track label, e.g. \"Slide to pay\"." },
        { name: "completeLabel", type: "ReactNode", default: `"Confirmed"`, description: "Shown once the slide confirms." },
        {
          name: "pendingLabel",
          type: "ReactNode",
          default: `"Processing"`,
          description: "Shown while a promise returned from `onComplete` is pending.",
        },
        {
          name: "onComplete",
          type: "() => void | Promise<unknown>",
          description: "Fires when the thumb reaches the end. A rejection resets the thumb.",
        },
        { name: "threshold", type: "number", default: "0.9", description: "Fraction of the track to pass to confirm on release." },
        {
          name: "resetDelay",
          type: "number | null",
          default: "2000",
          description: "Milliseconds the completed state shows before resetting. `null` stays complete.",
        },
        {
          name: "aria-label",
          type: "string",
          default: `children if a string, else "Slide to confirm"`,
          description: "Accessible name for the thumb.",
        },
        { name: "disabled", type: "boolean", default: "false", description: "Disable dragging and keyboard input." },
        { name: "thumbIcon", type: "ReactNode", default: "<ChevronRightIcon />", description: "Icon on the idle thumb." },
        { name: "className", type: "string", description: "Classes for the track." },
      ],
      dataAttributes: [
        { name: "data-phase", description: `"idle", "pending" or "complete".` },
        { name: "data-disabled", description: "Present when disabled." },
      ],
    },
  ],
} satisfies ComponentDoc
