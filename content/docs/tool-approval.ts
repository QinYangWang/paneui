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
      description: "Use `risk` to match what the tool can do to the user's data.",
    },
    {
      id: "controlled",
      title: "Controlled",
      description: "Use when the decision lives in your agent state; `null` means pending.",
    },
    {
      id: "resolved",
      title: "Resolved",
      description: "Use when replaying history, where each request was decided earlier.",
    },
    {
      id: "remembered",
      title: "Remembered",
      description: "Use `rememberKey` when Always allow should survive reloads.",
    },
    {
      id: "command",
      title: "Command Arguments",
      description: "Use for shell commands, passing the command as a string with `argsLanguage`.",
    },
  ],
  notes: [
    {
      title: "Accessibility",
      body: 'The card is a `role="group"` labelled "Permission request for {tool}", and the resolved line is a `role="status"` so the decision is announced.',
    },
    {
      title: "Forgetting a remembered approval",
      body: "Revoke clears the `rememberKey` entry, but a controlled parent that resets `decision` from `\"always\"` to `null` doesn't: the card would find the saved permission again on its next mount. Call `forgetToolApproval(rememberKey)` (or `localStorage.removeItem(rememberKey)`) alongside the reset.",
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
        { name: "args", type: "unknown", description: "Arguments preview. Objects are pretty-printed as JSON; strings are shown as-is." },
        { name: "argsLanguage", type: "CodeLanguage", default: `"bash"`, description: "Highlight grammar for a string `args`." },
        { name: "risk", type: `"low" | "medium" | "high"`, default: `"medium"`, description: "Badge while pending (`low` Read only, `medium` Makes changes, `high` Destructive with a warning chip)." },
        { name: "decision", type: `"once" | "always" | "deny" | null`, description: "Controlled decision; `null` is pending." },
        { name: "defaultDecision", type: `"once" | "always" | "deny" | null`, default: "null", description: "Initial decision when uncontrolled; `revocable={false}` then hides Undo." },
        { name: "onDecisionChange", type: `(decision: "once" | "always" | "deny" | null) => void`, description: "Called on Allow, Deny, Undo and when a remembered permission is found." },
        { name: "rememberKey", type: "string", description: "`localStorage` key that remembers Always allow across sessions (stored as `localStorage[rememberKey] = \"always\"`), so the card mounts approved next time. Only Revoke clears it; a controlled parent resetting `decision` from `\"always\"` to `null` leaves it saved, so call `forgetToolApproval(rememberKey)` too." },
        { name: "revocable", type: "boolean", default: "true", description: "Show Undo (after Allow once / Deny) or Revoke (after Always allow) on the resolved card. Only Revoke clears `rememberKey`." },
        { name: "defaultArgsOpen", type: "boolean", default: "true", description: "Show arguments while pending, on mount and whenever the decision returns to `null`." },
      ],
      dataAttributes: [{ name: "data-decision", description: "`pending`, `once`, `always` or `deny`." }],
    },
    {
      name: "forgetToolApproval",
      description: "`forgetToolApproval(rememberKey)` removes a remembered Always allow (the same as `localStorage.removeItem(rememberKey)`). Call it when you reset a controlled `decision` to `null`; it doesn't change what a mounted card shows. A no-op on the server or with an undefined key.",
      props: [{ name: "rememberKey", type: "string | undefined", required: true, description: "The `rememberKey` passed to the card." }],
    },
  ],
} satisfies ComponentDoc
