import type { ComponentDoc } from "@/lib/doc-types"

export default {
  baseUi: {
    name: "Preview Card",
    href: "https://base-ui.com/react/components/preview-card",
  },
  usage: {
    imports: `import { Citation, CitationGroup, Citations } from "@/components/ui/citations"`,
    code: `<CitationGroup sources={sources}>
  <p>The API shipped in Chrome 111<Citation sourceId="chrome" />.</p>
  <Citations />
</CitationGroup>`,
  },
  composition: `CitationGroup
├── Citation
└── Citations
    ├── CitationStack
    └── CitationList
        └── CitationFavicon`,
  examples: [
    {
      id: "standalone",
      title: "Standalone Marker",
      description: "Outside a `CitationGroup`, pass `source` and `index` directly; clicking opens the source in a new tab.",
    },
    {
      id: "file-sources",
      title: "File Sources",
      description: "Give non-web sources an `icon` and `meta`; without a `url` the row and preview have no link.",
    },
    {
      id: "open-list",
      title: "Open by Default",
      description: "`defaultOpen` on the group starts the Sources list expanded; a custom `title` renames the summary.",
    },
    {
      id: "streaming",
      title: "Streaming Sources",
      description: "Append to `sources` as the agent reads; new rows slide into the list and the count updates.",
    },
    {
      id: "list-and-count",
      title: "List, Stack and Count",
      description: "`CitationList`, `CitationStack` and `CitationCount` work on their own for custom layouts like a sidebar.",
    },
  ],
  notes: [
    {
      title: "Behaviour",
      body: "Inside a `CitationGroup`, markers number themselves from the `sources` order. Clicking one opens the list, scrolls to the matching row and highlights it for 1.8s. The preview opens after `delay` (250ms) on hover or focus.",
    },
    {
      title: "Favicons",
      body: "`CitationFavicon` loads site icons from Google's favicon service when a source has a `url`, and falls back to the domain's first letter if that fails. Pass `icon` to skip the request.",
    },
  ],
  api: [
    {
      name: "CitationGroup",
      description: "Provider linking inline markers to the reference list.",
      props: [
        { name: "sources", type: "CitationSource[]", required: true, description: "Sources, in citation order." },
        { name: "idPrefix", type: "string", description: "Prefix for row ids (anchor targets). Generated when omitted." },
        { name: "defaultOpen", type: "boolean", default: "false", description: "Start with the reference list open." },
        { name: "open", type: "boolean", description: "Controlled open state of the list." },
        { name: "onOpenChange", type: "(open: boolean) => void", description: "Called when the list opens or closes." },
        { name: "children", type: "ReactNode", required: true, description: "The response containing markers and `Citations`." },
      ],
    },
    {
      name: "Citation",
      description: "Inline numbered marker with a hover preview.",
      extends: "Base UI PreviewCard.Trigger (a)",
      extendsHref: "https://base-ui.com/react/components/preview-card#trigger",
      props: [
        { name: "sourceId", type: "string", description: "Source id to resolve from the surrounding `CitationGroup`." },
        { name: "source", type: "CitationSource", description: "Explicit source, when not inside a group." },
        { name: "index", type: "number", description: "Explicit number; derived from the group order when omitted. Shows `•` when neither is known." },
        { name: "delay", type: "number", default: "250", description: "Hover delay in ms before the preview opens." },
      ],
      dataAttributes: [{ name: "data-popup-open", description: "Present while the preview is open (primary tint)." }],
    },
    {
      name: "Citations",
      description: "Collapsible Sources summary with favicon stack and count. Renders nothing without sources.",
      extends: "Base UI Collapsible",
      extendsHref: "https://base-ui.com/react/components/collapsible",
      props: [
        { name: "sources", type: "CitationSource[]", description: "Defaults to the group's sources." },
        { name: "title", type: "ReactNode", default: `"Sources"`, description: "Summary label." },
        { name: "open", type: "boolean", description: "Controlled open state; otherwise shared with the group." },
        { name: "defaultOpen", type: "boolean", default: "false", description: "Initial state outside a group." },
        { name: "onOpenChange", type: "(open: boolean) => void", description: "Called when it opens or closes." },
        { name: "className", type: "string", description: "Merged onto the root." },
      ],
    },
    {
      name: "CitationList",
      description: "Numbered reference rows (an `<ol>`); rows with a `url` are links.",
      props: [
        { name: "sources", type: "CitationSource[]", description: "Defaults to the group's sources." },
        { name: "className", type: "string", description: "Merged onto the list." },
      ],
      dataAttributes: [{ name: "data-highlighted", description: "On the row a marker just pointed to." }],
    },
    {
      name: "CitationFavicon",
      description: "Favicon chip; falls back to a monogram or `icon`.",
      props: [
        { name: "source", type: `Pick<CitationSource, "url" | "domain" | "icon">`, required: true, description: "Source to draw." },
        { name: "className", type: "string", description: "Merged onto the chip." },
      ],
    },
    {
      name: "CitationStack",
      description: "Overlapping favicons.",
      props: [
        { name: "sources", type: "CitationSource[]", required: true, description: "Sources to draw." },
        { name: "limit", type: "number", default: "3", description: "Max favicons shown." },
        { name: "className", type: "string", description: "Merged onto the stack." },
      ],
    },
    {
      name: "CitationCount",
      description: "Small \"N sources\" chip.",
      props: [
        { name: "count", type: "number", required: true, description: "Number of sources." },
        { name: "className", type: "string", description: "Merged onto the chip." },
      ],
    },
    {
      name: "CitationSource",
      description: "Shape of one source.",
      props: [
        { name: "id", type: "string", required: true, description: "Stable id used by `sourceId`." },
        { name: "title", type: "ReactNode", required: true, description: "Source title." },
        { name: "url", type: "string", description: "Link target; also used for the favicon and domain." },
        { name: "domain", type: "string", description: "Display domain; derived from `url` when omitted." },
        { name: "snippet", type: "ReactNode", description: "Excerpt shown in the preview." },
        { name: "meta", type: "ReactNode", description: "Extra preview line, e.g. a publish date." },
        { name: "icon", type: "ReactNode", description: "Replaces the favicon." },
      ],
    },
  ],
} satisfies ComponentDoc
