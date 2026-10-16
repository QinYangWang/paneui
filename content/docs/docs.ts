import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `// One command, into a new app:
// pnpm dlx shadcn@latest init -d -n my-docs https://qinyangwang.github.io/ui/r/docs.json
// or into an existing one (adds app/docs/page.tsx):
// pnpm dlx shadcn@latest add https://qinyangwang.github.io/ui/r/docs.json
import { DocsTemplate } from "@/components/docs-template/docs"`,
    code: `// app/docs/page.tsx (installed for you)
export default function DocsPage() {
  return <DocsTemplate />
}

// Another layout: "classic" | "notebook" | "flux" | "spacious" | "home"
<DocsTemplate layout="notebook" />`,
  },
  composition: `DocsTemplate                 layout, search palette, navigation drawer
├── parts/layouts.tsx        ClassicLayout · NotebookLayout · FluxLayout · SpaciousLayout · HomeLayout
├── parts/chrome.tsx         DocsHeader, SectionTabs (NavigationMenu), SearchButton, Brand
├── parts/docs-nav.tsx       SidebarNav page tree
├── parts/article-chrome.tsx PageHeader with Breadcrumb, feedback, pager Cards
├── parts/article.tsx        typeset article with Alert and CodeBlock
├── parts/site.ts            sections, pages, search items
└── Outline / OutlinePopover the page outline`,
  examples: [
    { id: "classic", title: "Classic", description: "Use for most product docs: the page tree stays in view and the outline sits beside the text." },
    { id: "notebook", title: "Notebook", description: "Use when the docs split into a few large sections, so the sidebar only lists the current one." },
    { id: "flux", title: "Flux", description: "Use for short docs or a single guide, where the text should own the screen." },
    { id: "spacious", title: "Spacious", description: "Use for long-form reading such as tutorials and essays." },
    { id: "home", title: "Home", description: "Use as the landing page that sends readers to each section." },
  ],
  notes: [
    {
      title: "Layouts",
      body: "Each layout composes the same parts and only moves the navigation and the outline. Edit `parts/site.ts` for your sections and pages, or add a layout in `parts/layouts.tsx` from the same parts.",
    },
    {
      title: "Responsive",
      body: "Below `lg` the sidebar moves into a drawer behind the menu button, and below `xl` the outline becomes the On this page button. Flux keeps its bar at every width; Notebook's tabs scroll sideways on phones.",
    },
  ],
  api: [
    {
      name: "DocsTemplate",
      props: [
        {
          name: "layout",
          type: `"classic" | "notebook" | "flux" | "spacious" | "home"`,
          default: `"classic"`,
          description: "Where the navigation and the outline go.",
        },
      ],
    },
  ],
} satisfies ComponentDoc
