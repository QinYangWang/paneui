import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import { ToolApproval } from "@/components/ui/tool-approval"`,
    code: `<ToolApproval tool="calendar.create_event" args={{ title: "Design review", at: "Thu 15:00" }} />`,
  },
  examples: [
    {
      id: "risks",
      title: "Risk Levels",
      description: "`risk` sets the badge and tint: `low` reads Read only, `medium` Makes changes, `high` Destructive with a warning chip.",
    },
    {
      id: "controlled",
      title: "Controlled",
      description: "Own the decision with `decision` and `onDecisionChange`; `null` means pending.",
    },
    {
      id: "resolved",
      title: "Resolved",
      description: "`defaultDecision` mounts the card already decided as `once`, `always` or `deny`; `revocable={false}` hides Undo.",
    },
    {
      id: "remembered",
      title: "Remembered",
      description: "With `rememberKey`, Always allow is saved to `localStorage` and the card mounts approved next time; Revoke clears it.",
    },
    {
      id: "command",
      title: "Command Arguments",
      description: "A string `args` is shown as-is, highlighted with `argsLanguage`; objects are pretty-printed as JSON. `defaultArgsOpen={false}` starts it folded.",
    },
  ],
  notes: [
    {
      title: "Accessibility",
      body: 'The card is a `role="group"` labelled "Permission request for {tool}", and the resolved line is a `role="status"` so the decision is announced.',
    },
    {
      title: "Motion",
      body: "Under reduced motion the icon swap and action row cross-fade without scaling, rotating or sliding.",
    },
  ],
  api: [
    {
      name: "ToolApproval",
      description: "Human-in-the-loop permission card.",
      extends: "div",
      props: [
        { name: "tool", type: "string", required: true, description: "Tool identifier, e.g. `github.create_pull_request`." },
        { name: "title", type: "ReactNode", default: `"Allow this tool to run?"`, description: "Heading while pending." },
        { name: "description", type: "ReactNode", description: "Explanation shown while pending." },
        { name: "args", type: "unknown", description: "Arguments preview: objects are pretty-printed JSON, strings shown as-is." },
        { name: "argsLanguage", type: "CodeLanguage", default: `"bash"`, description: "Highlight grammar for a string `args`." },
        { name: "risk", type: `"low" | "medium" | "high"`, default: `"medium"`, description: "Badge and tint while pending." },
        { name: "decision", type: `"once" | "always" | "deny" | null`, description: "Controlled decision; `null` is pending." },
        { name: "defaultDecision", type: `"once" | "always" | "deny" | null`, default: "null", description: "Initial decision when uncontrolled." },
        { name: "onDecisionChange", type: `(decision: "once" | "always" | "deny" | null) => void`, description: "Called on Allow, Deny, Undo and when a remembered permission is found." },
        { name: "rememberKey", type: "string", description: "`localStorage` key that remembers Always allow across sessions." },
        { name: "revocable", type: "boolean", default: "true", description: "Show Undo / Revoke on the resolved card." },
        { name: "defaultArgsOpen", type: "boolean", default: "true", description: "Start with arguments shown (only while pending)." },
      ],
      dataAttributes: [{ name: "data-decision", description: "`pending`, `once`, `always` or `deny`." }],
    },
  ],
} satisfies ComponentDoc
