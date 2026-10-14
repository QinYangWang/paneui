import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import { StreamingResponse } from "@/components/ui/streaming-response"`,
    code: `<StreamingResponse text={text} status={done ? "complete" : "streaming"} />`,
  },
  examples: [
    {
      id: "markdown",
      title: "Markdown",
      description: "`text` supports headings, bulleted and numbered lists, fenced code, `code`, **bold**, *em*, links and `[n]` citation markers.",
    },
    {
      id: "error",
      title: "Error",
      description: "`status=\"error\"` shows an alert with `errorMessage` and, when `onRetry` is set, a Retry button.",
    },
    {
      id: "feedback",
      title: "Controlled Feedback",
      description: "Own the thumbs state with `feedback` and `onFeedbackChange`; clicking the pressed thumb again clears it to `null`.",
    },
    {
      id: "sources-open",
      title: "Sources Open, No Actions",
      description: "`defaultSourcesOpen` expands the sources list once complete; `showActions={false}` hides the copy and feedback row.",
    },
    {
      id: "custom-children",
      title: "Custom Content",
      description: "Pass `children` instead of `text` to render your own markdown; set `copyText` so the copy action has plain text.",
    },
    {
      id: "markdown-and-caret",
      title: "ResponseMarkdown and StreamingCaret",
      description: "Both are exported for your own message surfaces: the markdown renderer with an optional `caret`, and the caret alone.",
    },
  ],
  notes: [
    {
      title: "Layout",
      body: "The actions row keeps its height while streaming (hidden and `inert`), so the reply doesn't jump when it completes. Sources appear only after streaming ends.",
    },
    {
      title: "Motion",
      body: "Under reduced motion the caret stops blinking and the actions and sources fade in without sliding.",
    },
  ],
  api: [
    {
      name: "StreamingResponse",
      description: "Surface for an assistant reply: streamed text, then actions and sources.",
      extends: "div",
      props: [
        { name: "text", type: "string", description: "Markdown-ish text, streamed in by appending." },
        { name: "children", type: "ReactNode", description: "Custom content instead of `text`." },
        { name: "status", type: `"streaming" | "complete" | "error"`, default: `"streaming"`, description: "Reply state; `streaming` shows the caret and hides actions." },
        { name: "sources", type: "CitationSource[]", description: "Sources for `[n]` markers and the footer list. See [Citations](/docs/citations)." },
        { name: "defaultSourcesOpen", type: "boolean", default: "false", description: "Start with the sources list open." },
        { name: "copyText", type: "string", description: "Plain text for the copy action. Defaults to `text`." },
        { name: "onRetry", type: "() => void", description: "Adds a Regenerate action, and Retry on errors." },
        { name: "feedback", type: `"up" | "down" | null`, description: "Controlled thumbs state." },
        { name: "defaultFeedback", type: `"up" | "down" | null`, default: "null", description: "Initial thumbs state when uncontrolled." },
        { name: "onFeedbackChange", type: `(feedback: "up" | "down" | null) => void`, description: "Called when a thumb is toggled." },
        { name: "errorMessage", type: "ReactNode", default: `"The response was interrupted."`, description: "Message shown when `status=\"error\"`." },
        { name: "showActions", type: "boolean", default: "true", description: "Show the copy / regenerate / feedback row." },
        { name: "contentClassName", type: "string", description: "Classes for the wrapper around the body." },
      ],
      dataAttributes: [{ name: "data-status", description: "The current `status`." }],
    },
    {
      name: "ResponseMarkdown",
      description: "The markdown-ish renderer behind `text`.",
      props: [
        { name: "text", type: "string", required: true, description: "Source text." },
        { name: "sources", type: "CitationSource[]", description: "Resolves `[n]` markers; needs a surrounding `CitationGroup` for numbering and jump-to-list." },
        { name: "caret", type: "boolean", default: "false", description: "Append a `StreamingCaret` to the last block." },
        { name: "className", type: "string", description: "Merged onto the wrapper." },
      ],
    },
    {
      name: "StreamingCaret",
      description: "Blinking block caret for the tail of streamed text.",
      props: [{ name: "className", type: "string", description: "Merged onto the caret." }],
    },
  ],
} satisfies ComponentDoc
