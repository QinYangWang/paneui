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
      description: "Use `meta` for a trailing detail such as a token or file count.",
    },
    {
      id: "controlled",
      title: "Controlled Elapsed",
      description: "Pass `elapsed` in seconds when the timer must match your own clock.",
    },
    {
      id: "stopped",
      title: "Stopped",
      description: "Set `running={false}` when the run pauses or ends; the timer freezes at its last value.",
    },
    {
      id: "formats",
      title: "Timer Formats",
      description: "Use `initialElapsed` when resuming a run that already started.",
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
      description: "Working readout with an activity glyph, an action verb and a live timer.",
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
      description: "The formatter behind the timer, `(seconds: number) => string`. It shows tenths under a minute, minutes and seconds under an hour, then hours and minutes, e.g. `8.4s`, `1m 23s`, `1h 05m`.",
      props: [{ name: "total", type: "number", required: true, description: "Elapsed seconds; negatives clamp to 0." }],
    },
  ],
} satisfies ComponentDoc
