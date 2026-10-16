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
      description: "Use for model replies; `text` renders a markdown subset as it streams.",
    },
    {
      id: "lists-and-links",
      title: "Lists and Links",
      description: "Use when replies continue numbered lists, paste URLs or keep checklists.",
    },
    {
      id: "error",
      title: "Error",
      description: "Use when a stream fails; set `onRetry` to offer a Retry button.",
    },
    {
      id: "feedback",
      title: "Controlled Feedback",
      description: "Use when you store ratings; clicking the pressed thumb again clears it to `null`.",
    },
    {
      id: "sources-open",
      title: "Sources Open, No Actions",
      description: "Use in read-only transcripts where the sources matter more than the actions.",
    },
    {
      id: "custom-children",
      title: "Custom Content",
      description: "Use when you render the markdown yourself; set `copyText` so copying still yields plain text.",
    },
    {
      id: "markdown-and-caret",
      title: "ResponseMarkdown and StreamingCaret",
      description: "Use these to build your own message surface with the same renderer and caret.",
    },
  ],
  notes: [
    {
      title: "Markdown",
      body: "The renderer covers paragraphs, `#` headings, bullet and numbered lists, fenced code, inline code, bold, italics, links and `[n]` citations. A numbered list keeps its first number (`<ol start>`), bare `http(s)` URLs become links without their trailing punctuation, and `- [ ]` / `- [x]` items show a read-only checkbox.",
    },
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
      description: "Surface for an assistant reply, with actions and sources under the text.",
      extends: "div",
      props: [
        { name: "text", type: "string", description: "Markdown subset (headings, lists, fenced and inline code, bold, italic, links, `[n]` citations), streamed in by appending." },
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
