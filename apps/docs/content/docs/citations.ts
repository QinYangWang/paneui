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
      body: { en: "Inside a `CitationGroup`, markers number themselves from the `sources` order. Clicking one opens the list, scrolls to the matching row and highlights it for 1.8s. The preview opens after `delay` (250ms) on hover or focus.", zh: "在 `CitationGroup` 内，标记按 `sources` 顺序自动编号。点击一个会打开列表，滚动到对应行并高亮 1.8s。悬停或聚焦后，预览在 `delay`（250ms）后打开。" },
    },
    {
      title: "Favicons",
      body: { en: "By default `CitationFavicon` loads site icons from Google's favicon service when a source has a `url` (this sends the domain to Google), and falls back to the domain's first letter if that fails. The `favicon` prop works on the group and on `Citations`, `CitationList`, `CitationStack` and `Citation`. `favicon={false}` turns remote favicons off, `favicon={(domain) => url}` uses your own service, a source's `faviconSrc` sets its image directly, and `icon` replaces the image with your own node.", zh: "默认情况下，当来源带有 `url` 时，`CitationFavicon` 从 Google 的 favicon 服务加载站点图标（这会把域名发送给 Google），如果失败则回退到域名的首字母。`favicon` prop 可用于组以及 `Citations`、`CitationList`、`CitationStack` 和 `Citation`。`favicon={false}` 关闭远程 favicon，`favicon={(domain) => url}` 使用你自己的服务，来源的 `faviconSrc` 直接设置其图片，`icon` 用你自己的节点替换图片。" },
    },
  ],
  api: [
    {
      name: "CitationGroup",
      description: { en: "Provider linking inline markers to the reference list.", zh: "将内联标记与引用列表关联的 Provider。" },
      props: [
        { name: "sources", type: "CitationSource[]", required: true, description: { en: "Sources, in citation order.", zh: "来源，按引用顺序。" } },
        { name: "idPrefix", type: "string", description: { en: "Prefix for row ids (anchor targets). Generated when omitted.", zh: "行 id（锚点目标）的前缀。省略时自动生成。" } },
        { name: "defaultOpen", type: "boolean", default: "false", description: { en: "Start with the reference list open.", zh: "初始时引用列表为打开状态。" } },
        { name: "open", type: "boolean", description: { en: "Controlled open state of the list.", zh: "列表的受控打开状态。" } },
        { name: "onOpenChange", type: "(open: boolean) => void", description: { en: "Called when the list opens or closes.", zh: "列表打开或关闭时调用。" } },
        { name: "favicon", type: "boolean | ((domain: string) => string | undefined)", default: "true", description: { en: "Favicon source for everything inside the group. `true` uses Google's service, `false` makes no remote request (monogram), and a function returns your own URL.", zh: "组内所有内容的 favicon 来源。`true` 使用 Google 的服务，`false` 不发远程请求（使用字母组合），函数返回你自己的 URL。" } },
        { name: "children", type: "ReactNode", required: true, description: { en: "The response containing markers and `Citations`.", zh: "包含标记和 `Citations` 的响应。" } },
      ],
    },
    {
      name: "Citation",
      description: { en: "Inline numbered marker with a hover preview.", zh: "带悬停预览的内联数字标记。" },
      extends: "PreviewCard.Trigger (a)",
      extendsHref: "https://base-ui.com/react/components/preview-card#trigger",
      props: [
        { name: "sourceId", type: "string", description: { en: "Source id to resolve from the surrounding `CitationGroup`.", zh: "从周围的 `CitationGroup` 解析的来源 id。" } },
        { name: "source", type: "CitationSource", description: { en: "Explicit source, when not inside a group.", zh: "显式来源，不在组内时使用。" } },
        { name: "index", type: "number", description: { en: "Explicit number; derived from the group order when omitted. Shows `•` when neither is known.", zh: "显式编号；省略时由组顺序推导。两者都未知时显示 `•`。" } },
        { name: "delay", type: "number", default: "250", description: { en: "Hover delay in ms before the preview opens.", zh: "预览打开前的悬停延迟，单位 ms。" } },
        { name: "favicon", type: "boolean | ((domain: string) => string | undefined)", description: { en: "Favicon source in the preview; defaults to the group's, then `true`.", zh: "预览中的 favicon 来源；默认取组的设置，然后为 `true`。" } },
      ],
      dataAttributes: [{ name: "data-popup-open", description: { en: "Present while the preview is open (primary tint).", zh: "预览打开时存在（主色调）。" } }],
    },
    {
      name: "Citations",
      description: { en: "Collapsible Sources summary with favicon stack and count. Renders nothing without sources.", zh: "可折叠的 Sources 摘要，带 favicon 堆叠和数量。没有来源时不渲染。" },
      extends: "Collapsible",
      extendsHref: "https://base-ui.com/react/components/collapsible",
      props: [
        { name: "sources", type: "CitationSource[]", description: { en: "Defaults to the group's sources.", zh: "默认为组的来源。" } },
        { name: "title", type: "ReactNode", default: `"Sources"`, description: { en: "Summary label.", zh: "摘要标签。" } },
        { name: "open", type: "boolean", description: { en: "Controlled open state; otherwise shared with the group.", zh: "受控打开状态；否则与组共享。" } },
        { name: "defaultOpen", type: "boolean", default: "false", description: { en: "Initial state outside a group.", zh: "不在组内时的初始状态。" } },
        { name: "onOpenChange", type: "(open: boolean) => void", description: { en: "Called when it opens or closes.", zh: "打开或关闭时调用。" } },
        { name: "favicon", type: "boolean | ((domain: string) => string | undefined)", description: { en: "Favicon source for the stack and list; defaults to the group's, then `true`.", zh: "堆叠和列表的 favicon 来源；默认取组的设置，然后为 `true`。" } },
        { name: "className", type: "string", description: { en: "Merged onto the root.", zh: "合并到根元素上。" } },
      ],
    },
    {
      name: "CitationList",
      description: { en: "Numbered reference rows (an `<ol>`); rows with a `url` are links, and without one the row and preview have no link.", zh: "带编号的引用行（`<ol>`）；带 `url` 的行是链接，不带的行和预览都没有链接。" },
      props: [
        { name: "sources", type: "CitationSource[]", description: { en: "Defaults to the group's sources.", zh: "默认为组的来源。" } },
        { name: "favicon", type: "boolean | ((domain: string) => string | undefined)", description: { en: "Favicon source for the rows; defaults to the group's, then `true`.", zh: "各行的 favicon 来源；默认取分组的，然后是 `true`。" } },
        { name: "className", type: "string", description: { en: "Merged onto the list.", zh: "合并到列表上。" } },
      ],
      dataAttributes: [{ name: "data-highlighted", description: { en: "On the row a marker just pointed to.", zh: "在标记刚刚指向的行上。" } }],
    },
    {
      name: "CitationFavicon",
      description: { en: "Favicon chip; falls back to a monogram or `icon`.", zh: "favicon 小标签；回退到字母标识或 `icon`。" },
      props: [
        { name: "source", type: `Pick<CitationSource, "url" | "domain" | "icon" | "faviconSrc">`, required: true, description: { en: "Source to draw.", zh: "要绘制的来源。" } },
        { name: "favicon", type: "boolean | ((domain: string) => string | undefined)", default: "true", description: { en: "`true` loads from Google's favicon service, `false` makes no remote request (monogram), a function maps the domain to your own URL. Defaults to the group's when inside one.", zh: "`true` 从 Google 的 favicon 服务加载，`false` 不发起远程请求（显示字母标识），函数将域名映射到你自己的 URL。在分组内时默认取分组的。" } },
        { name: "className", type: "string", description: { en: "Merged onto the chip.", zh: "合并到小标签上。" } },
      ],
    },
    {
      name: "CitationStack",
      description: { en: "Overlapping favicons.", zh: "重叠的 favicon。" },
      props: [
        { name: "sources", type: "CitationSource[]", required: true, description: { en: "Sources to draw.", zh: "要绘制的来源。" } },
        { name: "limit", type: "number", default: "3", description: { en: "Max favicons shown.", zh: "最多显示的 favicon 数量。" } },
        { name: "favicon", type: "boolean | ((domain: string) => string | undefined)", description: { en: "Favicon source; defaults to the group's, then `true`.", zh: "favicon 来源；默认取分组的，然后是 `true`。" } },
        { name: "className", type: "string", description: { en: "Merged onto the stack.", zh: "合并到堆叠上。" } },
      ],
    },
    {
      name: "CitationCount",
      description: { en: "Small \"N sources\" chip.", zh: "显示“N 个来源”的小标签。" },
      props: [
        { name: "count", type: "number", required: true, description: { en: "Number of sources.", zh: "来源数量。" } },
        { name: "className", type: "string", description: { en: "Merged onto the chip.", zh: "合并到小标签上。" } },
      ],
    },
    {
      name: "CitationSource",
      description: { en: "Shape of one source.", zh: "单个来源的形状。" },
      props: [
        { name: "id", type: "string", required: true, description: { en: "Stable id used by `sourceId`.", zh: "由 `sourceId` 使用的稳定 id。" } },
        { name: "title", type: "ReactNode", required: true, description: { en: "Source title.", zh: "来源标题。" } },
        { name: "url", type: "string", description: { en: "Link target; also used for the favicon and domain.", zh: "链接目标；也用于 favicon 和域名。" } },
        { name: "domain", type: "string", description: { en: "Display domain; derived from `url` when omitted.", zh: "显示的域名；省略时从 `url` 推导。" } },
        { name: "snippet", type: "ReactNode", description: { en: "Excerpt shown in the preview.", zh: "在预览中显示的摘要。" } },
        { name: "meta", type: "ReactNode", description: { en: "Extra preview line, e.g. a publish date.", zh: "额外的预览行，例如发布日期。" } },
        { name: "icon", type: "ReactNode", description: { en: "Replaces the favicon.", zh: "替换 favicon。" } },
        { name: "faviconSrc", type: "string", description: { en: "Explicit favicon URL (e.g. self-hosted); wins over the `favicon` option.", zh: "显式的 favicon URL（例如自托管）；优先于 `favicon` 选项。" } },
      ],
    },
  ],
} satisfies ComponentDoc
