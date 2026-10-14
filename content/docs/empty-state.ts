import type { ComponentDoc } from "@/lib/doc-types"

export default {
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
  examples: [{ id: "variants", title: "Variants", description: "`default` is bare (inside a card or table), `outline` a dashed drop zone, `muted` a quiet fill. `size` is `sm`, `default` or `lg`." }],
  notes: [
    { title: "Writing", body: "Say what is missing, then what to do about it, then offer the action. For a filtered list, say no results matched and offer to clear the filters, as DataTable does." },
  ],
  api: [
    {
      name: "EmptyState",
      extends: "div",
      props: [
        { name: "variant", type: `"default" | "outline" | "muted"`, default: `"default"`, description: "Surface." },
        { name: "size", type: `"sm" | "default" | "lg"`, default: `"default"`, description: "Vertical padding." },
      ],
    },
    { name: "EmptyStateIcon", extends: "div", description: "40px raised chip with a 20px muted glyph.", props: [] },
  ],
} satisfies ComponentDoc
