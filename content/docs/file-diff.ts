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
      id: "split",
      title: "Split View",
      description: "Use `defaultDiffStyle=\"split\"` on wide layouts, and add `diffStyleToggle` to let the reader switch.",
    },
    {
      id: "two-files",
      title: "Two Files",
      description: "Pass `oldFile` and `newFile` when you have both versions instead of a patch, so unchanged stretches can fold away.",
    },
    {
      id: "accept-reject",
      title: "Accept or Reject Changes",
      description: "Use `lineAnnotations` and `renderAnnotation` for review controls under each change, and `diffAcceptRejectHunk` to apply the choice to a `fileDiff` in state.",
    },
    {
      id: "collapse-on-complete",
      title: "Collapse on Complete",
      description: "Set `collapseOnComplete` when finished diffs should fold away once the agent stops streaming.",
    },
    {
      id: "controlled",
      title: "Controlled",
      description: "Control `open` and `onOpenChange` when other UI opens the diff, e.g. an expand-all button.",
    },
    {
      id: "plain",
      title: "Without Line Numbers or Copy",
      description: "Turn off `showLineNumbers` and `copyable` for compact read-only views.",
    },
    {
      id: "pre-parsed",
      title: "Pre-parsed Lines",
      description: "Pass `lines` when you build rows yourself, and set `language` when the filename has no extension.",
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
