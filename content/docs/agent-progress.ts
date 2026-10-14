import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import { AgentProgress } from "@/components/ui/agent-progress"`,
    code: `<AgentProgress label="Searching" />`,
  },
  examples: [
    {
      id: "with-meta",
      title: "With Meta",
      description: "`meta` adds a trailing detail after a dot separator, such as a token or file count.",
    },
    {
      id: "controlled",
      title: "Controlled Elapsed",
      description: "Pass `elapsed` in seconds to drive the timer from your own clock; the internal clock is ignored.",
    },
    {
      id: "stopped",
      title: "Stopped",
      description: "With `running={false}` the glyph rests in grey and the timer freezes at its last value.",
    },
    {
      id: "formats",
      title: "Timer Formats",
      description: "The timer shows tenths under a minute, `m ss` under an hour and `h mm` beyond; `initialElapsed` sets where it starts.",
    },
  ],
  notes: [
    {
      title: "Motion",
      body: "Under reduced motion the 3×3 glyph stops scaling and only fades its opacity while running.",
    },
    {
      title: "Accessibility",
      body: 'The readout is `role="status"` with an `aria-label` of the `label` plus ", in progress" while running; the ticking timer is hidden from screen readers.',
    },
  ],
  api: [
    {
      name: "AgentProgress",
      description: "A pulsing 3×3 glyph, an action verb and a live tabular timer.",
      extends: "span",
      props: [
        { name: "label", type: "string", default: `"Working"`, description: "Verb for what the agent is doing." },
        { name: "elapsed", type: "number", description: "Controlled elapsed time in seconds. When set, the internal clock is ignored." },
        { name: "initialElapsed", type: "number", default: "0", description: "Where the internal clock starts, in seconds." },
        { name: "running", type: "boolean", default: "true", description: "Whether the internal clock runs. When `false` the glyph rests and the timer freezes." },
        { name: "meta", type: "ReactNode", description: "Optional trailing detail, e.g. a token count." },
      ],
      dataAttributes: [{ name: "data-running", description: "Present while `running` is `true`." }],
    },
    {
      name: "formatElapsed",
      description: "The formatter behind the timer: `(seconds: number) => string`, e.g. `8.4s`, `1m 23s`, `1h 05m`.",
      props: [{ name: "total", type: "number", required: true, description: "Elapsed seconds; negatives clamp to 0." }],
    },
  ],
} satisfies ComponentDoc
