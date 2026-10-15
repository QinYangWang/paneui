import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import { Pagination, PaginationPageSize, PaginationSummary } from "@/components/ui/pagination"`,
    code: `<Pagination page={page} pageCount={12} onPageChange={setPage} />`,
  },
  examples: [{ id: "compact", title: "Compact", description: "Use on phones and narrow panels." }],
  notes: [{ title: "Accessibility", body: "A `nav` labelled Pagination; the current page button has `aria-current=\"page\"`, prev / next are disabled at the ends. `getPageRange` is exported if you build your own." }],
  api: [
    {
      name: "Pagination",
      extends: "nav",
      props: [
        { name: "page", type: "number", required: true, description: "Current page, 1-based." },
        { name: "pageCount", type: "number", required: true, description: "Number of pages." },
        { name: "onPageChange", type: "(page: number) => void", required: true, description: "Called with the page to show (clamped)." },
        { name: "siblings", type: "number", default: "1", description: "Pages either side of the current one before an ellipsis." },
        { name: "compact", type: "boolean", default: "false", description: "Prev / next and a \"Page x of y\" label only." },
      ],
    },
    { name: "PaginationSummary", extends: "p", props: [{ name: "page", type: "number", required: true, description: "Current page." }, { name: "pageSize", type: "number", required: true, description: "Rows per page." }, { name: "total", type: "number", required: true, description: "Total rows." }, { name: "noun", type: "string", default: `"results"`, description: "What is being counted." }] },
    { name: "PaginationPageSize", props: [{ name: "value", type: "number", required: true, description: "Rows per page." }, { name: "onValueChange", type: "(size: number) => void", required: true, description: "Called with the new size." }, { name: "options", type: "number[]", default: "[10, 20, 50]", description: "Choices." }] },
  ],
} satisfies ComponentDoc
