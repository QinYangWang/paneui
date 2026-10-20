import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Shows one file's changes as a diff, even while streaming.", "zh": "显示文件修改差异。"},
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
      id: "split",
      title: { en: "Split View", zh: "分栏视图" },
    },
    {
      id: "two-files",
      title: { en: "Two Files", zh: "两个文件" },
    },
    {
      id: "accept-reject",
      title: { en: "Accept or Reject Changes", zh: "接受或拒绝修改" },
    },
    {
      id: "collapse-on-complete",
      title: { en: "Collapse on Complete", zh: "完成后收起" },
    },
    {
      id: "controlled",
      title: { en: "Controlled", zh: "受控" },
    },
    {
      id: "plain",
      title: { en: "Without Line Numbers or Copy", zh: "无行号或复制" },
    },
    {
      id: "pre-parsed",
      title: { en: "Pre-parsed Lines", zh: "预解析行" },
    },
  ],
  notes: [
    {
      title: "Renderer",
      body: "The bundled diff renderer draws the rows inside a shadow root, themed with this library's tokens (`--code` surface, 12px `font-mono`, `success` / `destructive` for changes); light and dark syntax colours follow the `html.dark` class. It loads on demand in the browser (about 200 KB gzipped, with grammars per language). During static export and until it arrives, plain unhighlighted rows show.",
    },
    {
      title: "Motion",
      body: "While `status` is `streaming`, the newest row slides in with a primary flash and the view follows the end. Under reduced motion rows appear without movement and the chevron stops rotating.",
    },
    {
      title: "Accessibility",
      body: 'The header is a collapsible trigger and reads out "N additions, N deletions". The rows sit in a region labelled "Changes to {filename}"; the Unified / Split switch is a radio group.',
    },
  ],
  api: [
    {
      name: "FileDiff",
      description: "Disclosure for one file change with live +/− counts, rendering a unified or split diff.",
      extends: "Collapsible.Root",
      extendsHref: "https://base-ui.com/react/components/collapsible#root",
      props: [
        { name: "filename", type: "string", required: true, description: "File path in the header; the directory part is dimmed. Also infers the language." },
        { name: "diff", type: "string", default: `""`, description: "Unified diff text for one file. Ignored when `lines`, `oldFile`/`newFile` or `fileDiff` are given." },
        { name: "lines", type: "FileDiffLine[]", description: "Pre-parsed rows, e.g. appended one by one while an agent streams." },
        { name: "oldFile", type: "string | null", description: "Old contents for a two-file diff (`null` when the file is new). Unchanged regions become expandable." },
        { name: "newFile", type: "string | null", description: "New contents for a two-file diff (`null` when the file was deleted)." },
        { name: "fileDiff", type: "FileDiffMetadata", description: "An already parsed diff (from `parseDiffFromFile`, `parsePatchFiles` or `diffAcceptRejectHunk`). Wins over every other source." },
        { name: "language", type: "string", description: "Syntax language id, inferred from `filename` when omitted." },
        { name: "status", type: `"streaming" | "complete"`, default: `"complete"`, description: "`streaming` shows a spinner, flashes new rows in and follows the end." },
        { name: "open", type: "boolean", description: "Controlled open state." },
        { name: "defaultOpen", type: "boolean", default: "true", description: "Initial open state when uncontrolled." },
        { name: "onOpenChange", type: "(open: boolean) => void", description: "Called when the disclosure opens or closes." },
        { name: "collapseOnComplete", type: "boolean", default: "false", description: "Fold the diff away when `status` goes from `streaming` to `complete`; it reopens when streaming starts again." },
        { name: "diffStyle", type: `"unified" | "split"`, description: "Controlled layout." },
        { name: "defaultDiffStyle", type: `"unified" | "split"`, default: `"unified"`, description: "Initial layout when uncontrolled." },
        { name: "onDiffStyleChange", type: `(style: "unified" | "split") => void`, description: "Called when the header switch changes the layout." },
        { name: "diffStyleToggle", type: "boolean", default: "false", description: "Show the Unified / Split switch in the header." },
        { name: "inlineChanges", type: `boolean | "word-alt" | "word" | "word-line" | "char"`, default: "true", description: "Highlight the changed part of each modified line. `true` is `\"word-alt\"`; `false` turns it off." },
        { name: "indicators", type: `"bars" | "classic" | "none"`, default: `"bars"`, description: "Mark changed lines with a coloured bar, with `+`/`-` signs, or by background only." },
        { name: "wrap", type: "boolean", default: "false", description: "Wrap long lines instead of scrolling sideways." },
        { name: "maxHeight", type: "number", default: "320", description: "Max height of the rows area in px." },
        { name: "showLineNumbers", type: "boolean", default: "true", description: "Show line numbers." },
        { name: "copyable", type: "boolean", default: "true", description: "Show a button that copies the new file contents." },
        { name: "lineAnnotations", type: "DiffLineAnnotation<A>[]", description: "Rows of your own UI pinned under diff lines, each `{ side: \"additions\" | \"deletions\", lineNumber, metadata }`." },
        { name: "renderAnnotation", type: "(annotation: DiffLineAnnotation<A>) => ReactNode", description: "Renders each annotation (comments, accept/reject buttons…)." },
        { name: "options", type: "FileDiffOptions", description: "Extra renderer options merged over the defaults, e.g. `hunkSeparators`, `expandUnchanged`, `enableLineSelection`." },
        { name: "variant", type: `"card" | "row"`, default: `"card"`, description: "`row` drops the card surface and moves the chevron to the end, for lists of files such as `EditedFilesCard`." },
        { name: "actions", type: "ReactNode", description: "Extra header controls before the copy button (reveal in folder, open in editor)." },
      ],
      dataAttributes: [
        { name: "data-status", description: "`streaming` or `complete`." },
        { name: "data-diff-style", description: "`unified` or `split`." },
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
