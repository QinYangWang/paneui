import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Moves through pages of results in a list or table.", "zh": "切换列表或表格的页码。"},
  usage: {
    imports: `import { Pagination, PaginationPageSize, PaginationSummary } from "@/components/ui/pagination"`,
    code: `<Pagination page={page} pageCount={12} onPageChange={setPage} />`,
  },
  examples: [
    { id: "sizes", title: { en: "Sizes", zh: "尺寸" },  },
    { id: "compact", title: { en: "Compact", zh: "紧凑" }, description: { en: "Use on phones and narrow panels.", zh: "适用于手机或窄面板。" } },
    {
      id: "rtl",
      title: { en: "RTL", zh: "从右到左" },
    },
  ],
  notes: [{ title: "Accessibility", body: { en: "A `nav` labelled Pagination; the current page button has `aria-current=\"page\"`, prev / next are disabled at the ends. `getPageRange` is exported if you build your own.", zh: "一个带 Pagination 标签的 `nav`；当前页按钮带有 `aria-current=\"page\"`，在两端时上一页 / 下一页禁用。如果自行构建，可使用导出的 `getPageRange`。" } }],
  api: [
    {
      name: "Pagination",
      extends: "nav",
      props: [
        { name: "size", type: `"sm" | "default" | "lg"`, default: `"default"`, description: { en: "Height of the page buttons, from 24 to 32px.", zh: "页码按钮的高度，从 24 到 32px。" } },
        { name: "page", type: "number", required: true, description: { en: "Current page, 1-based.", zh: "当前页，从 1 开始。" } },
        { name: "pageCount", type: "number", required: true, description: { en: "Number of pages.", zh: "页数。" } },
        { name: "onPageChange", type: "(page: number) => void", required: true, description: { en: "Called with the page to show (clamped).", zh: "传入要显示的页码（会被限制在有效范围内）。" } },
        { name: "siblings", type: "number", default: "1", description: { en: "Pages either side of the current one before an ellipsis.", zh: "在当前页两侧各显示几页后才出现省略号。" } },
        { name: "compact", type: "boolean", default: "false", description: { en: "Prev / next and a \"Page x of y\" label only.", zh: "仅显示上一页/下一页和一个“第 x 页，共 y 页”标签。" } },
      ],
    },
    { name: "PaginationSummary", extends: "p", props: [{ name: "page", type: "number", required: true, description: { en: "Current page.", zh: "当前页。" } }, { name: "pageSize", type: "number", required: true, description: { en: "Rows per page.", zh: "每页行数。" } }, { name: "total", type: "number", required: true, description: { en: "Total rows.", zh: "总行数。" } }, { name: "noun", type: "string", default: "the locale's", description: { en: "What is being counted.", zh: "统计对象。" } }] },
    { name: "PaginationPageSize", props: [
        { name: "size", type: `"sm" | "default" | "lg"`, default: `"default"`, description: { en: "Matches `Pagination`; the select is 24, 28 or 32px tall.", zh: "与 `Pagination` 一致；选择器高度为 24、28 或 32px。" } },
        { name: "value", type: "number", required: true, description: { en: "Rows per page.", zh: "每页行数。" } },
        { name: "onValueChange", type: "(size: number) => void", required: true, description: { en: "Called with the new size.", zh: "传入新的每页条数。" } },
        { name: "options", type: "number[]", default: "[10, 20, 50]", description: { en: "Choices.", zh: "可选值。" } },
      ] },
  ],
} satisfies ComponentDoc
