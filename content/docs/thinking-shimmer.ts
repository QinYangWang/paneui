import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import { ThinkingShimmer } from "@/components/ui/thinking-shimmer"`,
    code: `<ThinkingShimmer dot>Searching the web…</ThinkingShimmer>`,
  },
  examples: [
    {
      id: "settled",
      title: "Active and Settled",
      description: "Flip `active` to `false` when the step finishes; the shimmer stops and the line stays as plain muted text.",
    },
    {
      id: "with-dot",
      title: "With Dot",
      description: "`dot` adds a pulsing primary dot that greys out once the line settles.",
    },
    {
      id: "duration",
      title: "Duration",
      description: "`duration` sets the seconds per shimmer sweep; slower sweeps read calmer for long tasks.",
    },
  ],
  notes: [
    {
      title: "Accessibility",
      body: 'The line is a `role="status"` live region with `aria-live="polite"`, and sets `aria-busy` while `active`, so screen readers announce each new status without interrupting.',
    },
    {
      title: "Motion",
      body: "The dot's ping is disabled under reduced motion (`motion-reduce:animate-none`); the dot itself stays.",
    },
  ],
  api: [
    {
      name: "ThinkingShimmer",
      description: "A one-line agent status that shimmers while work runs.",
      extends: "span",
      props: [
        { name: "active", type: "boolean", default: "true", description: "Shimmer while `true`; `false` settles into plain muted text." },
        { name: "duration", type: "number", default: "2", description: "Seconds per shimmer sweep." },
        { name: "dot", type: "boolean", default: "false", description: "Show a leading pulse dot." },
        { name: "children", type: "ReactNode", default: `"Thinking…"`, description: "The status copy." },
      ],
      dataAttributes: [{ name: "data-active", description: "Present while `active` is `true`." }],
    },
  ],
} satisfies ComponentDoc
