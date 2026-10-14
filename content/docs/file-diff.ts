import type { ComponentDoc } from "@/lib/doc-types"

export default {
  baseUi: {
    name: "Collapsible",
    href: "https://base-ui.com/react/components/collapsible",
  },
  usage: {
    imports: `import { FileDiff } from "@/components/ui/file-diff"`,
    code: `<FileDiff filename="lib/slots.ts" diff={diff} />`,
  },
  examples: [
    {
      id: "collapse-on-complete",
      title: "Collapse on Complete",
      description: "With `collapseOnComplete`, the diff folds away when `status` flips from `streaming` to `complete`; it reopens when streaming starts again.",
    },
    {
      id: "controlled",
      title: "Controlled",
      description: "Drive the disclosure with `open` and `onOpenChange`, e.g. to expand every file at once.",
    },
    {
      id: "plain",
      title: "Without Line Numbers or Copy",
      description: "`showLineNumbers={false}` and `copyable={false}` give a compact read-only view; `maxHeight` caps the rows area.",
    },
    {
      id: "pre-parsed",
      title: "Pre-parsed Lines",
      description: "Pass `lines` instead of `diff` to render rows you build yourself, and set `language` when the filename has no extension.",
    },
  ],
  notes: [
    {
      title: "Motion",
      body: "Rows added after first paint slide in with a primary flash; under reduced motion they appear without movement and the chevron stops rotating.",
    },
    {
      title: "Accessibility",
      body: 'The header is a Base UI Collapsible trigger. The rows are a `role="table"` labelled "Changes to {filename}", added and removed signs are labelled, and the header reads out "N additions, N deletions".',
    },
  ],
  api: [
    {
      name: "FileDiff",
      description: "Disclosure for one file change with live +/− counts and highlighted unified diff rows.",
      extends: "Base UI Collapsible.Root",
      extendsHref: "https://base-ui.com/react/components/collapsible#root",
      props: [
        { name: "filename", type: "string", required: true, description: "File path in the header; the directory part is dimmed. Also infers the language." },
        { name: "diff", type: "string", default: `""`, description: "Unified diff text for one file. Ignored when `lines` is given." },
        { name: "lines", type: "FileDiffLine[]", description: "Pre-parsed rows, e.g. appended one by one while an agent streams." },
        { name: "language", type: "string", description: "Shiki language id, inferred from `filename` when omitted." },
        { name: "status", type: `"streaming" | "complete"`, default: `"complete"`, description: "`streaming` shows a spinner, animates new rows in and follows the end." },
        { name: "open", type: "boolean", description: "Controlled open state." },
        { name: "defaultOpen", type: "boolean", default: "true", description: "Initial open state when uncontrolled." },
        { name: "onOpenChange", type: "(open: boolean) => void", description: "Called when the disclosure opens or closes." },
        { name: "collapseOnComplete", type: "boolean", default: "false", description: "Fold the diff away when `status` goes from `streaming` to `complete`." },
        { name: "maxHeight", type: "number", default: "320", description: "Max height of the rows area in px." },
        { name: "showLineNumbers", type: "boolean", default: "true", description: "Show old and new line-number gutters." },
        { name: "copyable", type: "boolean", default: "true", description: "Show a button that copies the new file contents (context + added lines)." },
      ],
      dataAttributes: [
        { name: "data-status", description: "`streaming` or `complete`." },
        { name: "data-type", description: "On each row: `added`, `removed`, `context` or `hunk`." },
      ],
    },
    {
      name: "parseUnifiedDiff",
      description: "`(diff: string) => FileDiffLine[]`. Parses one file's `git diff` output; file headers are dropped.",
      props: [],
    },
    {
      name: "FileDiffLine",
      description: "One row of a diff.",
      props: [
        { name: "type", type: `"added" | "removed" | "context" | "hunk"`, required: true, description: "Row kind." },
        { name: "content", type: "string", required: true, description: "Line text without the leading sign; the full `@@` header for hunks." },
        { name: "oldLine", type: "number", description: "Line number in the old file." },
        { name: "newLine", type: "number", description: "Line number in the new file." },
      ],
    },
  ],
} satisfies ComponentDoc
