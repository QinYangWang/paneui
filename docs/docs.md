# Docs Site

> Documentation site layout with search, navigation and a page outline.

Page: https://paneui.dev/docs/docs/

## Installation

```bash
npx shadcn@latest add @paneui/docs
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/docs.json
```

Packages: `simple-icons`.

Registry items it builds on: `@paneui/theme`, `@paneui/typeset`, `@paneui/alert`, `@paneui/badge`, `@paneui/breadcrumb`, `@paneui/button`, `@paneui/card`, `@paneui/code-block`, `@paneui/command-palette`, `@paneui/drawer`, `@paneui/icon-chip`, `@paneui/icons`, `@paneui/kbd`, `@paneui/navigation-menu`, `@paneui/outline`, `@paneui/page-header`, `@paneui/popover`, `@paneui/separator`, `@paneui/sidebar-nav`, `@paneui/theme-toggle`, `@paneui/brand-icon`.

## Usage

```tsx
// One command, into a new app:
// pnpm dlx shadcn@latest init -d -n my-docs https://paneui.dev/r/docs.json
// or into an existing one (adds app/docs/page.tsx):
// pnpm dlx shadcn@latest add https://paneui.dev/r/docs.json
import { DocsTemplate } from "@/components/docs-template/docs"
```

```tsx
// app/docs/page.tsx (installed for you)
export default function DocsPage() {
  return <DocsTemplate />
}

// Another layout: "classic" | "notebook" | "flux" | "spacious" | "home"
<DocsTemplate layout="notebook" />
```

## Composition

```text
DocsTemplate                 layout, search palette, navigation drawer
├── parts/layouts.tsx        ClassicLayout · NotebookLayout · FluxLayout · SpaciousLayout · HomeLayout
├── parts/chrome.tsx         DocsHeader, SectionTabs (NavigationMenu), SearchButton, Brand
├── parts/docs-nav.tsx       SidebarNav page tree
├── parts/article-chrome.tsx PageHeader with Breadcrumb, feedback, pager Cards
├── parts/article.tsx        typeset article with Alert and CodeBlock
├── parts/site.ts            sections, pages, search items
└── Outline / OutlinePopover the page outline
```

## Examples

### Classic

Use for most product docs: the page tree stays in view and the outline sits beside the text.

```tsx
import { DocsTemplate } from "@/registry/base-nova/templates/docs/docs"

export default function DocsLayoutClassic() {
  return <DocsTemplate layout="classic" />
}
```

### Notebook

Use when the docs split into a few large sections, so the sidebar only lists the current one.

```tsx
import { DocsTemplate } from "@/registry/base-nova/templates/docs/docs"

export default function DocsLayoutNotebook() {
  return <DocsTemplate layout="notebook" />
}
```

### Flux

Use for short docs or a single guide, where the text should own the screen.

```tsx
import { DocsTemplate } from "@/registry/base-nova/templates/docs/docs"

export default function DocsLayoutFlux() {
  return <DocsTemplate layout="flux" />
}
```

### Spacious

Use for long-form reading such as tutorials and essays.

```tsx
import { DocsTemplate } from "@/registry/base-nova/templates/docs/docs"

export default function DocsLayoutSpacious() {
  return <DocsTemplate layout="spacious" />
}
```

### Home

Use as the landing page that sends readers to each section.

```tsx
import { DocsTemplate } from "@/registry/base-nova/templates/docs/docs"

export default function DocsLayoutHome() {
  return <DocsTemplate layout="home" />
}
```

## Layouts

Each layout composes the same parts and only moves the navigation and the outline. Edit `parts/site.ts` for your sections and pages, or add a layout in `parts/layouts.tsx` from the same parts.

## Responsive

Below `lg` the sidebar moves into a drawer behind the menu button, and below `xl` the outline becomes the On this page button. Flux keeps its bar at every width; Notebook's tabs scroll sideways on phones.

## API Reference

### DocsTemplate

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `layout` | `"classic" \| "notebook" \| "flux" \| "spacious" \| "home"` | `"classic"` | Where the navigation and the outline go. |
