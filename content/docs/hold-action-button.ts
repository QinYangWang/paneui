import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import { HoldActionButton } from "@/components/ui/hold-action-button"`,
    code: `<HoldActionButton tone="destructive" onHoldComplete={deleteProject}>
  Hold to delete
</HoldActionButton>`,
  },
  examples: [
    {
      id: "tones",
      title: "Tones",
      description: "Use `destructive` for irreversible actions and `success` for confirmations.",
    },
    {
      id: "duration",
      title: "Hold Duration",
      description: "Use a longer `holdDuration` for riskier actions, paired with a specific `hint`.",
    },
    {
      id: "stay-complete",
      title: "Stay Complete",
      description: "Pass `resetDelay={null}` when the completed state should stay, and react in `onHoldComplete`.",
    },
    { id: "disabled", title: "Disabled" },
  ],
  notes: [
    {
      title: "Keyboard",
      body: "Hold `Space` or `Enter` to fill; releasing early, blurring or dragging the pointer off the button drains it. `hint` is linked with `aria-describedby` and completion is announced in a live region.",
    },
    {
      title: "Motion",
      body: "With reduced motion the wave stops moving, the press scale is removed and labels cross-fade instead of sliding.",
    },
  ],
  api: [
    {
      name: "HoldActionButton",
      description: "Button that confirms once it is pressed and held.",
      extends: "button",
      props: [
        { name: "children", type: "ReactNode", required: true, description: "Idle label." },
        {
          name: "orientation",
          type: `"vertical" | "horizontal"`,
          default: `"vertical"`,
          description: "Liquid rises bottom→top or fills left→right.",
        },
        { name: "tone", type: `"primary" | "destructive" | "success"`, default: `"primary"`, description: "Fill colour." },
        { name: "holdingLabel", type: "ReactNode", default: `"Keep holding"`, description: "Label while holding." },
        { name: "completeLabel", type: "ReactNode", default: `"Done"`, description: "Label once complete." },
        { name: "holdDuration", type: "number", default: "1500", description: "Milliseconds the hold must last." },
        {
          name: "resetDelay",
          type: "number | null",
          default: "1800",
          description: "Milliseconds the completed state shows before draining. `null` stays complete.",
        },
        { name: "onHoldComplete", type: "() => void", description: "Called when the hold completes." },
        {
          name: "hint",
          type: "string",
          default: `"Press and hold to confirm"`,
          description: "Screen-reader instruction for how to use the control.",
        },
        { name: "disabled", type: "boolean", default: "false", description: "Disable the button." },
      ],
      dataAttributes: [
        { name: "data-phase", description: `"idle", "holding" or "complete".` },
        { name: "data-orientation", description: "The `orientation` value." },
      ],
    },
  ],
} satisfies ComponentDoc
