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
      body: { en: "The item is a `role=\"group\"` labelled \"Permission request for {tool}\". The risk is read out after the description, the arguments toggle sets `aria-expanded`, and the result line is a `role=\"status\"` so the outcome is announced.", zh: "条目是一个 `role=\"group\"`，标签为“Permission request for {tool}”。风险会在描述之后读出，参数开关会设置 `aria-expanded`，结果行是 `role=\"status\"`，因此结果会被播报。" },
    },
    {
      title: "Layout",
      body: { en: "Below a 384px container width (512px with Always allow) the buttons wrap under the text. The result line hides the tool identifier at the same width.", zh: "容器宽度低于 384px（启用 Always allow 时为 512px）时，按钮会换行到文本下方。结果行在同一宽度下会隐藏工具标识符。" },
    },
    {
      title: "Forgetting a remembered approval",
      body: { en: "Revoke clears the `rememberKey` entry, but a controlled parent that resets `decision` from `\"always\"` to `null` doesn't: the item would find the saved permission again on its next mount. Call `forgetToolApproval(rememberKey)` (or `localStorage.removeItem(rememberKey)`) alongside the reset.", zh: "Revoke 会清除 `rememberKey` 条目，但受控父组件将 `decision` 从 `\"always\"` 重置为 `null` 时不会：条目在下次挂载时会再次找到已保存的权限。请在重置的同时调用 `forgetToolApproval(rememberKey)`（或 `localStorage.removeItem(rememberKey)`）。" },
    },
    {
      title: "Motion",
      body: { en: "Answering, undoing and showing the arguments animate the height on a spring while the contents cross-fade. A permission found under `rememberKey` on mount resolves without animating. Under reduced motion the height changes at once and only the opacity fades.", zh: "回答、撤销和显示参数时，高度会以弹簧动画变化，同时内容交叉淡入淡出。挂载时在 `rememberKey` 下找到的权限会直接解析，不播放动画。在减少动态效果下，高度立即变化，只淡出透明度。" },
    },
  ],
  api: [
    {
      name: "ToolApproval",
      description: { en: "Permission request that collapses into a result line.", zh: "会折叠为结果行的权限请求。" },
      extends: "div",
      props: [
        { name: "tool", type: "string", required: true, description: { en: "Tool identifier, e.g. `github.create_pull_request`.", zh: "工具标识符，例如 `github.create_pull_request`。" } },
        { name: "title", type: "ReactNode", default: `"Allow this tool to run?"`, description: { en: "Question while pending. Inline `<code>` is styled.", zh: "待处理时的问题。内联 `<code>` 会应用样式。" } },
        { name: "description", type: "ReactNode", description: { en: "One line under the title while pending. Defaults to `tool` in mono.", zh: "待处理时标题下方的一行。默认为等宽字体的 `tool`。" } },
        { name: "resultTitle", type: "ReactNode", description: { en: "Text of the result line. Defaults to a string `title` without its question mark, or `tool` when `title` is the default.", zh: "结果行的文本。默认为去掉问号的字符串 `title`，或当 `title` 为默认值时使用 `tool`。" } },
        { name: "icon", type: "ReactNode", description: { en: "Icon in the tile. Defaults to a shield, or a warning sign for `risk=\"high\"`.", zh: "方块中的图标。默认为盾牌，`risk=\"high\"` 时为警告标志。" } },
        { name: "args", type: "unknown", description: { en: "Arguments preview behind a toggle. Objects are pretty-printed as JSON; strings are shown as-is.", zh: "开关后的参数预览。对象会格式化为 JSON；字符串按原样显示。" } },
        { name: "argsLanguage", type: "CodeLanguage", default: `"bash"`, description: { en: "Highlight grammar for a string `args`.", zh: "字符串 `args` 的高亮语法。" } },
        { name: "risk", type: `"low" | "medium" | "high"`, default: `"medium"`, description: { en: "Sets the tile tone and the risk announced to screen readers.", zh: "设置方块色调和向屏幕阅读器播报的风险。" } },
        { name: "decision", type: `"once" | "always" | "deny" | null`, description: { en: "Controlled decision; `null` is pending. Approve sets `\"once\"`.", zh: "受控决定；`null` 表示待处理。Approve 会设置为 `\"once\"`。" } },
        { name: "defaultDecision", type: `"once" | "always" | "deny" | null`, default: "null", description: { en: "Initial decision when uncontrolled; `revocable={false}` then hides Undo.", zh: "非受控时的初始决定；`revocable={false}` 会隐藏 Undo。" } },
        { name: "onDecisionChange", type: `(decision: "once" | "always" | "deny" | null) => void`, description: { en: "Called on Approve, Always allow, Deny, Undo and when a remembered permission is found.", zh: "在 Approve、Always allow、Deny、Undo 以及找到已记住的权限时调用。" } },
        { name: "status", type: `"running" | "done" | "failed"`, description: { en: "Outcome of an approved call on the result line. Without it the line reads Approved or Always allowed.", zh: "已批准调用在结果行上的结果。没有它时，该行显示 Approved 或 Always allowed。" } },
        { name: "allowAlways", type: "boolean", default: "rememberKey != null", description: { en: "Show Always allow between Deny and Approve.", zh: "在 Deny 和 Approve 之间显示 Always allow。" } },
        { name: "rememberKey", type: "string", description: { en: "`localStorage` key that remembers Always allow across sessions (stored as `localStorage[rememberKey] = \"always\"`), so the item mounts approved next time. Only Revoke clears it; a controlled parent resetting `decision` from `\"always\"` to `null` leaves it saved, so call `forgetToolApproval(rememberKey)` too.", zh: "`localStorage` key，用于跨会话记住 Always allow（存储为 `localStorage[rememberKey] = \"always\"`），以便下次挂载时条目已批准。只有 Revoke 会清除它；受控父组件将 `decision` 从 `\"always\"` 重置为 `null` 时不会清除，因此还需调用 `forgetToolApproval(rememberKey)`。" } },
        { name: "revocable", type: "boolean", default: "true", description: { en: "Show Undo (after Approve / Deny) or Revoke (after Always allow) on the result line until a `status` arrives. Only Revoke clears `rememberKey`.", zh: "在结果行上显示 Undo（Approve / Deny 之后）或 Revoke（Always allow 之后），直到收到 `status`。只有 Revoke 会清除 `rememberKey`。" } },
        { name: "defaultArgsOpen", type: "boolean", default: "false", description: { en: "Show the arguments while pending, on mount and whenever the decision returns to `null`.", zh: "待处理时显示参数，并在挂载时以及决定回到 `null` 时显示。" } },
      ],
      dataAttributes: [
        { name: "data-decision", description: { en: "`pending`, `once`, `always` or `deny`.", zh: "`pending`、`once`、`always` 或 `deny`。" } },
        { name: "data-status", description: { en: "`running`, `done` or `failed` once approved and reported.", zh: "批准并上报后为 `running`、`done` 或 `failed`。" } },
      ],
    },
    {
      name: "forgetToolApproval",
      description: { en: "`forgetToolApproval(rememberKey)` removes a remembered Always allow (the same as `localStorage.removeItem(rememberKey)`). Call it when you reset a controlled `decision` to `null`; it doesn't change what a mounted item shows. A no-op on the server or with an undefined key.", zh: "`forgetToolApproval(rememberKey)` 移除已记住的 Always allow（等同于 `localStorage.removeItem(rememberKey)`）。当你将受控 `decision` 重置为 `null` 时调用它；它不会改变已挂载条目的显示。在服务端或 key 未定义时为空操作。" },
      props: [{ name: "rememberKey", type: "string | undefined", required: true, description: { en: "The `rememberKey` passed to the item.", zh: "传给条目的 `rememberKey`。" } }],
    },
  ],
} satisfies ComponentDoc
