import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Explains an empty view and what to do next.", "zh": "说明空白状态及下一步操作。"},
  usage: {
    imports: `import {
  EmptyState,
  EmptyStateActions,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateTitle,
} from "@/components/ui/empty-state"`,
    code: `<EmptyState variant="outline">
  <EmptyStateIcon><InboxIcon /></EmptyStateIcon>
  <EmptyStateTitle>No invoices yet</EmptyStateTitle>
  <EmptyStateDescription>Invoices appear here after the first charge.</EmptyStateDescription>
  <EmptyStateActions><Button size="sm">Create invoice</Button></EmptyStateActions>
</EmptyState>`,
  },
  composition: `EmptyState
├── EmptyStateIcon
├── EmptyStateTitle
├── EmptyStateDescription
└── EmptyStateActions`,
  examples: [{ id: "variants", title: { en: "Variants", zh: "样式" },  }],
  notes: [
    { title: "Writing", body: { en: "Say what is missing, then what to do about it, then offer the action. For a filtered list, say no results matched and offer to clear the filters, as DataTable does.", zh: "先说明缺少什么，再说明如何处理，最后提供操作。对于筛选后的列表，说明没有匹配结果并提供清除筛选的操作，如 DataTable 所做的那样。" } },
  ],
  api: [
    {
      name: "EmptyState",
      extends: "div",
      props: [
        { name: "variant", type: `"default" | "outline" | "muted"`, default: `"default"`, description: { en: "Surface.", zh: "表面。" } },
        { name: "size", type: `"sm" | "default" | "lg"`, default: `"default"`, description: { en: "Vertical padding.", zh: "垂直内边距。" } },
      ],
    },
    { name: "EmptyStateIcon", extends: "div", description: { en: "40px raised chip with a 20px muted glyph.", zh: "40px 高的凸起 chip，带 20px 的柔和字形。" }, props: [] },
  ],
} satisfies ComponentDoc
