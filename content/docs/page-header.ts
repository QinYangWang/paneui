import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import {
  PageHeader,
  PageHeaderActions,
  PageHeaderContent,
  PageHeaderDescription,
  PageHeaderTitle,
} from "@/components/ui/page-header"`,
    code: `<PageHeader>
  <PageHeaderContent>
    <PageHeaderTitle>Customers</PageHeaderTitle>
    <PageHeaderDescription>Everyone with an active workspace.</PageHeaderDescription>
  </PageHeaderContent>
  <PageHeaderActions>
    <Button size="sm">Add customer</Button>
  </PageHeaderActions>
</PageHeader>`,
  },
  composition: `PageHeader
├── PageHeaderContent
│   ├── PageHeaderEyebrow
│   ├── PageHeaderTitle
│   └── PageHeaderDescription
└── PageHeaderActions`,
  examples: [],
  notes: [{ title: "Layout", body: "Actions wrap under the title on narrow screens. The title is the page's `h1`." }],
  api: [
    { name: "PageHeader", extends: "header", props: [] },
    { name: "PageHeaderTitle", extends: "h1", description: "`text-2xl` semibold, balanced wrapping.", props: [] },
    { name: "PageHeaderEyebrow", extends: "div", description: "Small line above the title, such as a breadcrumb or status.", props: [] },
  ],
} satisfies ComponentDoc
