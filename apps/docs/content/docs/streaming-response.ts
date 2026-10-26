import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Shows a reply as it arrives.", "zh": "逐步显示助手回复。"},
  usage: {
    imports: `import { StreamingResponse } from "@/components/ui/streaming-response"`,
    code: `<StreamingResponse text={text} status={done ? "complete" : "streaming"} />`,
  },
  examples: [
    {
      id: "markdown",
      title: { en: "Markdown", zh: "Markdown" },
    },
    {
      id: "lists-and-links",
      title: { en: "Lists and Links", zh: "列表与链接" },
      description: { en: "Use when replies continue numbered lists, paste URLs or keep checklists.", zh: "适用于包含列表或链接的回复。" },
    },
    {
      id: "error",
      title: { en: "Error", zh: "错误" },
    },
    {
      id: "feedback",
      title: { en: "Controlled Feedback", zh: "受控反馈" },
    },
    {
      id: "sources-open",
      title: { en: "Sources Open, No Actions", zh: "展开来源，无操作" },
      description: { en: "Use in read-only transcripts where the sources matter more than the actions.", zh: "适用于更关注参考来源的只读记录。" },
    },
    {
      id: "custom-children",
      title: { en: "Custom Content", zh: "自定义内容" },
    },
    {
      id: "markdown-and-caret",
      title: { en: "ResponseMarkdown and StreamingCaret", zh: "ResponseMarkdown 与 StreamingCaret" },
      description: { en: "Use these to build your own message surface with the same renderer and caret.", zh: "适用于自定义消息容器。" },
    },
  ],
  notes: [
    {
      title: "Markdown",
      body: { en: "The renderer covers paragraphs, `#` headings, bullet and numbered lists, fenced code, inline code, bold, italics, links and `[n]` citations. A numbered list keeps its first number (`<ol start>`), bare `http(s)` URLs become links without their trailing punctuation, and `- [ ]` / `- [x]` items show a read-only checkbox.", zh: "渲染器支持段落、`#` 标题、无序和有序列表、围栏代码、行内代码、粗体、斜体、链接和 `[n]` 引用。有序列表保留其起始编号（`<ol start>`），裸 `http(s)` URL 会去掉尾随标点后变成链接，`- [ ]` / `- [x]` 条目会显示只读复选框。" },
    },
    {
      title: "Layout",
      body: { en: "The actions row keeps its height while streaming (hidden and `inert`), so the reply doesn't jump when it completes. Sources appear only after streaming ends.", zh: "流式输出期间操作栏保持占位（隐藏且 `inert`），因此回复完成时不会跳动。来源仅在流式输出结束后出现。" },
    },
    {
      title: "Motion",
      body: { en: "Under reduced motion the caret stops blinking and the actions and sources fade in without sliding.", zh: "在减少动态效果下，光标停止闪烁，操作栏和来源淡入而不滑动。" },
    },
  ],
  api: [
    {
      name: "StreamingResponse",
      description: { en: "Surface for an assistant reply, with actions and sources under the text.", zh: "助手回复的容器，文本下方带操作栏和来源。" },
      extends: "div",
      props: [
        { name: "text", type: "string", description: { en: "Markdown subset (headings, lists, fenced and inline code, bold, italic, links, `[n]` citations), streamed in by appending.", zh: "Markdown 子集（标题、列表、围栏和行内代码、粗体、斜体、链接、`[n]` 引用），通过追加流式输出。" } },
        { name: "children", type: "ReactNode", description: { en: "Custom content instead of `text`.", zh: "用自定义内容替代 `text`。" } },
        { name: "status", type: `"streaming" | "complete" | "error"`, default: `"streaming"`, description: { en: "Reply state; `streaming` shows the caret and hides actions.", zh: "回复状态；`streaming` 显示光标并隐藏操作栏。" } },
        { name: "sources", type: "CitationSource[]", description: { en: "Sources for `[n]` markers and the footer list. See [Citations](/docs/citations).", zh: "`[n]` 标记和底部列表的来源。见 [Citations](/docs/citations)。" } },
        { name: "defaultSourcesOpen", type: "boolean", default: "false", description: { en: "Start with the sources list open.", zh: "初始时展开来源列表。" } },
        { name: "copyText", type: "string", description: { en: "Plain text for the copy action. Defaults to `text`.", zh: "用于复制操作的纯文本。默认为 `text`。" } },
        { name: "onRetry", type: "() => void", description: { en: "Adds a Regenerate action, and Retry on errors.", zh: "添加 Regenerate 操作，出错时添加 Retry。" } },
        { name: "feedback", type: `"up" | "down" | null`, description: { en: "Controlled thumbs state.", zh: "受控的滑块状态。" } },
        { name: "defaultFeedback", type: `"up" | "down" | null`, default: "null", description: { en: "Initial thumbs state when uncontrolled.", zh: "非受控时的初始滑块状态。" } },
        { name: "onFeedbackChange", type: `(feedback: "up" | "down" | null) => void`, description: { en: "Called when a thumb is toggled.", zh: "切换滑块时调用。" } },
        { name: "errorMessage", type: "ReactNode", default: `"The response was interrupted."`, description: { en: "Message shown when `status=\"error\"`.", zh: "`status=\"error\"` 时显示的消息。" } },
        { name: "showActions", type: "boolean", default: "true", description: { en: "Show the copy / regenerate / feedback row.", zh: "显示复制 / 重新生成 / 反馈栏。" } },
        { name: "contentClassName", type: "string", description: { en: "Classes for the wrapper around the body.", zh: "正文外层容器的类名。" } },
      ],
      dataAttributes: [{ name: "data-status", description: { en: "The current `status`.", zh: "当前的 `status`。" } }],
    },
    {
      name: "ResponseMarkdown",
      description: { en: "The markdown-ish renderer behind `text`.", zh: "`text` 背后的类 Markdown 渲染器。" },
      props: [
        { name: "text", type: "string", required: true, description: { en: "Source text.", zh: "源文本。" } },
        { name: "sources", type: "CitationSource[]", description: { en: "Resolves `[n]` markers; needs a surrounding `CitationGroup` for numbering and jump-to-list.", zh: "解析 `[n]` 标记；需要外层 `CitationGroup` 来编号和跳转到列表。" } },
        { name: "caret", type: "boolean", default: "false", description: { en: "Append a `StreamingCaret` to the last block.", zh: "在最后一个块末尾追加 `StreamingCaret`。" } },
        { name: "className", type: "string", description: { en: "Merged onto the wrapper.", zh: "合并到包装器上。" } },
      ],
    },
    {
      name: "StreamingCaret",
      description: { en: "Blinking block caret for the tail of streamed text.", zh: "用于流式文本末尾的闪烁方块光标。" },
      props: [{ name: "className", type: "string", description: { en: "Merged onto the caret.", zh: "合并到光标上。" } }],
    },
  ],
} satisfies ComponentDoc
