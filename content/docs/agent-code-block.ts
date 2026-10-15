import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import { AgentCodeBlock } from "@/components/ui/agent-code-block"`,
    code: `<AgentCodeBlock filename="lib/greet.ts" code={code} />`,
  },
  examples: [
    {
      id: "without-header",
      title: "Without Header",
      description: "Leave out `filename` for a bare block; pass `language` explicitly and the copy button floats in on hover.",
    },
    {
      id: "excerpt",
      title: "Excerpt",
      description: "`startLine` numbers an excerpt from its real position, and `highlightLines` takes numbers or `[start, end]` ranges as displayed.",
    },
    {
      id: "no-line-numbers",
      title: "Without Line Numbers",
      description: "`showLineNumbers={false}` suits shell commands and short snippets.",
    },
    {
      id: "wrap",
      title: "Wrap",
      description: "`wrap` breaks long lines instead of scrolling horizontally; `maxHeight` caps the scrolling area in px.",
    },
    {
      id: "not-copyable",
      title: "Not Copyable",
      description: "`copyable={false}` drops the copy button, e.g. for read-only output that shouldn't be pasted back.",
    },
    {
      id: "copy-button",
      title: "Copy Button",
      description: "`CodeCopyButton` is exported for your own surfaces; `value` can be a string or a function read at click time.",
    },
  ],
  notes: [
    {
      title: "Streaming",
      body: "While `streaming`, the block shows a Writing badge and caret, follows the newest line unless the reader scrolls away, and keeps already-coloured tokens so lines never flash back to plain text.",
    },
    {
      title: "Motion",
      body: "The copy-to-check swap cross-fades without scaling under reduced motion, and the streaming follow jumps instead of smooth-scrolling.",
    },
  ],
  api: [
    {
      name: "AgentCodeBlock",
      description: "Syntax-highlighted code surface (light and dark themes) for agent output.",
      extends: "div",
      props: [
        { name: "code", type: "string", required: true, description: "Source text." },
        { name: "language", type: "string", description: "Syntax language id. Inferred from `filename` when omitted; unknown ids render as plain text." },
        { name: "filename", type: "ReactNode", description: "Shown in a header with the language chip and copy button. Without it the copy button floats." },
        { name: "showLineNumbers", type: "boolean", default: "true", description: "Show the sticky line-number gutter." },
        { name: "startLine", type: "number", default: "1", description: "First line number, for excerpts." },
        { name: "highlightLines", type: "(number | [start: number, end: number])[]", description: "Line numbers (as displayed) to emphasise." },
        { name: "streaming", type: "boolean", default: "false", description: "Show a live caret and Writing badge and follow the newest line." },
        { name: "maxHeight", type: "number", default: "360", description: "Max height of the scrolling code area in px." },
        { name: "copyable", type: "boolean", default: "true", description: "Show the copy button." },
        { name: "wrap", type: "boolean", default: "false", description: "Wrap long lines instead of scrolling horizontally." },
      ],
      dataAttributes: [
        { name: "data-streaming", description: "On the root while `streaming`." },
        { name: "data-line", description: "On each line: its displayed number." },
        { name: "data-highlighted", description: "On lines listed in `highlightLines`." },
      ],
    },
    {
      name: "CodeCopyButton",
      description: "Round icon button that copies and swaps to a check.",
      extends: "button",
      props: [
        { name: "value", type: "string | (() => string)", required: true, description: "Text to copy, or a function returning it at click time." },
        { name: "label", type: "string", default: `"Copy code"`, description: "Accessible label before copying." },
        { name: "className", type: "string", description: "Merged onto the button." },
      ],
      dataAttributes: [{ name: "data-copied", description: "Present for 1.6s after a successful copy." }],
    },
    {
      name: "useCodeTokens",
      description: "`(code: string, language: string) => CodeToken[][] | null`. Tokenises with light and dark colours; `null` until the first pass.",
      props: [],
    },
    {
      name: "CodeLine",
      description: "Renders one line from (possibly stale) tokens.",
      props: [
        { name: "text", type: "string", required: true, description: "The line's text." },
        { name: "tokens", type: "CodeToken[]", description: "Tokens for that line from `useCodeTokens`." },
      ],
    },
    {
      name: "useCopy",
      description: "`(timeout = 1600) => { copied: boolean; copy: (text: string) => Promise<void> }`.",
      props: [],
    },
    {
      name: "languageFromFilename",
      description: "`(filename?: string, fallback = \"text\") => string`. Maps an extension like `.tsx` to a language id.",
      props: [],
    },
  ],
} satisfies ComponentDoc
