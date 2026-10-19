import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Asks the user to allow or deny an agent tool call.", "zh": "请求用户批准工具调用。"},
  usage: {
    imports: `import { ToolApproval } from "@/components/ui/tool-approval"`,
    code: `<ToolApproval
  tool="shell.exec"
  icon={<TerminalSquareIcon />}
  title={<>Run <code>rm -rf dist</code>?</>}
  description="The command runs in this project."
  decision={decision}
  onDecisionChange={setDecision}
  status={status}
/>`,
  },
  examples: [
    {
      id: "risks",
      title: { en: "Risk Levels", zh: "风险等级" },
    },
    {
      id: "controlled",
      title: { en: "Controlled", zh: "受控" },
    },
    {
      id: "resolved",
      title: { en: "Outcomes", zh: "结果" },
    },
    {
      id: "remembered",
      title: { en: "Remembered", zh: "记住选择" },
    },
    {
      id: "command",
      title: { en: "Arguments", zh: "参数" },
    },
  ],
  notes: [
    {
      title: "Accessibility",
      body: 'The item is a `role="group"` labelled "Permission request for {tool}". The risk is read out after the description, the arguments toggle sets `aria-expanded`, and the result line is a `role="status"` so the outcome is announced.',
    },
    {
      title: "Layout",
      body: "Below a 384px container width (512px with Always allow) the buttons wrap under the text. The result line hides the tool identifier at the same width.",
    },
    {
      title: "Forgetting a remembered approval",
      body: "Revoke clears the `rememberKey` entry, but a controlled parent that resets `decision` from `\"always\"` to `null` doesn't: the item would find the saved permission again on its next mount. Call `forgetToolApproval(rememberKey)` (or `localStorage.removeItem(rememberKey)`) alongside the reset.",
    },
    {
      title: "Motion",
      body: "Answering, undoing and showing the arguments animate the height on a spring while the contents cross-fade. A permission found under `rememberKey` on mount resolves without animating. Under reduced motion the height changes at once and only the opacity fades.",
    },
  ],
  api: [
    {
      name: "ToolApproval",
      description: "Permission request that collapses into a result line.",
      extends: "div",
      props: [
        { name: "tool", type: "string", required: true, description: "Tool identifier, e.g. `github.create_pull_request`." },
        { name: "title", type: "ReactNode", default: `"Allow this tool to run?"`, description: "Question while pending. Inline `<code>` is styled." },
        { name: "description", type: "ReactNode", description: "One line under the title while pending. Defaults to `tool` in mono." },
        { name: "resultTitle", type: "ReactNode", description: "Text of the result line. Defaults to a string `title` without its question mark, or `tool` when `title` is the default." },
        { name: "icon", type: "ReactNode", description: "Icon in the tile. Defaults to a shield, or a warning sign for `risk=\"high\"`." },
        { name: "args", type: "unknown", description: "Arguments preview behind a toggle. Objects are pretty-printed as JSON; strings are shown as-is." },
        { name: "argsLanguage", type: "CodeLanguage", default: `"bash"`, description: "Highlight grammar for a string `args`." },
        { name: "risk", type: `"low" | "medium" | "high"`, default: `"medium"`, description: "Sets the tile tone and the risk announced to screen readers." },
        { name: "decision", type: `"once" | "always" | "deny" | null`, description: "Controlled decision; `null` is pending. Approve sets `\"once\"`." },
        { name: "defaultDecision", type: `"once" | "always" | "deny" | null`, default: "null", description: "Initial decision when uncontrolled; `revocable={false}` then hides Undo." },
        { name: "onDecisionChange", type: `(decision: "once" | "always" | "deny" | null) => void`, description: "Called on Approve, Always allow, Deny, Undo and when a remembered permission is found." },
        { name: "status", type: `"running" | "done" | "failed"`, description: "Outcome of an approved call on the result line. Without it the line reads Approved or Always allowed." },
        { name: "allowAlways", type: "boolean", default: "rememberKey != null", description: "Show Always allow between Deny and Approve." },
        { name: "rememberKey", type: "string", description: "`localStorage` key that remembers Always allow across sessions (stored as `localStorage[rememberKey] = \"always\"`), so the item mounts approved next time. Only Revoke clears it; a controlled parent resetting `decision` from `\"always\"` to `null` leaves it saved, so call `forgetToolApproval(rememberKey)` too." },
        { name: "revocable", type: "boolean", default: "true", description: "Show Undo (after Approve / Deny) or Revoke (after Always allow) on the result line until a `status` arrives. Only Revoke clears `rememberKey`." },
        { name: "defaultArgsOpen", type: "boolean", default: "false", description: "Show the arguments while pending, on mount and whenever the decision returns to `null`." },
      ],
      dataAttributes: [
        { name: "data-decision", description: "`pending`, `once`, `always` or `deny`." },
        { name: "data-status", description: "`running`, `done` or `failed` once approved and reported." },
      ],
    },
    {
      name: "forgetToolApproval",
      description: "`forgetToolApproval(rememberKey)` removes a remembered Always allow (the same as `localStorage.removeItem(rememberKey)`). Call it when you reset a controlled `decision` to `null`; it doesn't change what a mounted item shows. A no-op on the server or with an undefined key.",
      props: [{ name: "rememberKey", type: "string | undefined", required: true, description: "The `rememberKey` passed to the item." }],
    },
  ],
} satisfies ComponentDoc
