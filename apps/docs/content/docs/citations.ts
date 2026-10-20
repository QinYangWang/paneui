import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Links an answer's claims to the sources behind them.", "zh": "将回答与参考来源关联。"},
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
      title: { en: "Standalone Marker", zh: "独立标记" },
    },
    {
      id: "file-sources",
      title: { en: "File Sources", zh: "文件来源" },
    },
    {
      id: "open-list",
      title: { en: "Open by Default", zh: "默认展开" },
    },
    {
      id: "streaming",
      title: { en: "Streaming Sources", zh: "逐步添加来源" },
    },
    {
      id: "no-remote-favicons",
      title: { en: "No Remote Favicons", zh: "禁用远程站点图标" },
    },
    {
      id: "list-and-count",
      title: { en: "List, Stack and Count", zh: "列表、堆叠与计数" },
      description: { en: "Use the parts on their own for custom layouts, like a sidebar.", zh: "适用于侧栏等自定义来源布局。" },
    },
  ],
  notes: [
    {
      title: "Behaviour",
      body: "Inside a `CitationGroup`, markers number themselves from the `sources` order. Clicking one opens the list, scrolls to the matching row and highlights it for 1.8s. The preview opens after `delay` (250ms) on hover or focus.",
    },
    {
      title: "Favicons",
      body: "By default `CitationFavicon` loads site icons from Google's favicon service when a source has a `url` (this sends the domain to Google), and falls back to the domain's first letter if that fails. The `favicon` prop works on the group and on `Citations`, `CitationList`, `CitationStack` and `Citation`. `favicon={false}` turns remote favicons off, `favicon={(domain) => url}` uses your own service, a source's `faviconSrc` sets its image directly, and `icon` replaces the image with your own node.",
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
        { name: "favicon", type: "boolean | ((domain: string) => string | undefined)", default: "true", description: "Favicon source for everything inside the group. `true` uses Google's service, `false` makes no remote request (monogram), and a function returns your own URL." },
        { name: "children", type: "ReactNode", required: true, description: "The response containing markers and `Citations`." },
      ],
    },
    {
      name: "Citation",
      description: "Inline numbered marker with a hover preview.",
      extends: "PreviewCard.Trigger (a)",
      extendsHref: "https://base-ui.com/react/components/preview-card#trigger",
      props: [
        { name: "sourceId", type: "string", description: "Source id to resolve from the surrounding `CitationGroup`." },
        { name: "source", type: "CitationSource", description: "Explicit source, when not inside a group." },
        { name: "index", type: "number", description: "Explicit number; derived from the group order when omitted. Shows `•` when neither is known." },
        { name: "delay", type: "number", default: "250", description: "Hover delay in ms before the preview opens." },
        { name: "favicon", type: "boolean | ((domain: string) => string | undefined)", description: "Favicon source in the preview; defaults to the group's, then `true`." },
      ],
      dataAttributes: [{ name: "data-popup-open", description: "Present while the preview is open (primary tint)." }],
    },
    {
      name: "Citations",
      description: "Collapsible Sources summary with favicon stack and count. Renders nothing without sources.",
      extends: "Collapsible",
      extendsHref: "https://base-ui.com/react/components/collapsible",
      props: [
        { name: "sources", type: "CitationSource[]", description: "Defaults to the group's sources." },
        { name: "title", type: "ReactNode", default: `"Sources"`, description: "Summary label." },
        { name: "open", type: "boolean", description: "Controlled open state; otherwise shared with the group." },
        { name: "defaultOpen", type: "boolean", default: "false", description: "Initial state outside a group." },
        { name: "onOpenChange", type: "(open: boolean) => void", description: "Called when it opens or closes." },
        { name: "favicon", type: "boolean | ((domain: string) => string | undefined)", description: "Favicon source for the stack and list; defaults to the group's, then `true`." },
        { name: "className", type: "string", description: "Merged onto the root." },
      ],
    },
    {
      name: "CitationList",
      description: "Numbered reference rows (an `<ol>`); rows with a `url` are links, and without one the row and preview have no link.",
      props: [
        { name: "sources", type: "CitationSource[]", description: "Defaults to the group's sources." },
        { name: "favicon", type: "boolean | ((domain: string) => string | undefined)", description: "Favicon source for the rows; defaults to the group's, then `true`." },
        { name: "className", type: "string", description: "Merged onto the list." },
      ],
      dataAttributes: [{ name: "data-highlighted", description: "On the row a marker just pointed to." }],
    },
    {
      name: "CitationFavicon",
      description: "Favicon chip; falls back to a monogram or `icon`.",
      props: [
        { name: "source", type: `Pick<CitationSource, "url" | "domain" | "icon" | "faviconSrc">`, required: true, description: "Source to draw." },
        { name: "favicon", type: "boolean | ((domain: string) => string | undefined)", default: "true", description: "`true` loads from Google's favicon service, `false` makes no remote request (monogram), a function maps the domain to your own URL. Defaults to the group's when inside one." },
        { name: "className", type: "string", description: "Merged onto the chip." },
      ],
    },
    {
      name: "CitationStack",
      description: "Overlapping favicons.",
      props: [
        { name: "sources", type: "CitationSource[]", required: true, description: "Sources to draw." },
        { name: "limit", type: "number", default: "3", description: "Max favicons shown." },
        { name: "favicon", type: "boolean | ((domain: string) => string | undefined)", description: "Favicon source; defaults to the group's, then `true`." },
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
        { name: "faviconSrc", type: "string", description: "Explicit favicon URL (e.g. self-hosted); wins over the `favicon` option." },
      ],
    },
  ],
} satisfies ComponentDoc
