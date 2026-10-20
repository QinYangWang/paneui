# Page Header

> Title, context and actions at the top of an app page.

Page: https://paneui.dev/docs/page-header/

## Installation

```bash
npx shadcn@latest add @paneui/page-header
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/page-header.json
```

Registry items it builds on: `@paneui/theme`.

## Usage

```tsx
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderContent,
  PageHeaderDescription,
  PageHeaderTitle,
} from "@/components/ui/page-header"
```

```tsx
<PageHeader>
  <PageHeaderContent>
    <PageHeaderTitle>Customers</PageHeaderTitle>
    <PageHeaderDescription>Everyone with an active workspace.</PageHeaderDescription>
  </PageHeaderContent>
  <PageHeaderActions>
    <Button size="sm">Add customer</Button>
  </PageHeaderActions>
</PageHeader>
```

## Composition

```text
PageHeader
├── PageHeaderContent
│   ├── PageHeaderEyebrow
│   ├── PageHeaderTitle
│   └── PageHeaderDescription
└── PageHeaderActions
```

## Examples

### Basic

```tsx
import { Button } from "@/registry/base-nova/ui/button"
import { PageHeader, PageHeaderActions, PageHeaderContent, PageHeaderDescription, PageHeaderTitle } from "@/registry/base-nova/ui/page-header"

export default function PageHeaderBasic() {
  return (
    <PageHeader className="w-full max-w-2xl">
      <PageHeaderContent>
        <PageHeaderTitle>Customers</PageHeaderTitle>
        <PageHeaderDescription>Everyone with an active workspace.</PageHeaderDescription>
      </PageHeaderContent>
      <PageHeaderActions>
        <Button size="sm">Add customer</Button>
      </PageHeaderActions>
    </PageHeader>
  )
}
```

### Reading Page

```tsx
import { CopyIcon } from "@/components/icons"
import { Button } from "@/registry/base-nova/ui/button"
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderContent,
  PageHeaderDescription,
  PageHeaderEyebrow,
  PageHeaderTitle,
} from "@/registry/base-nova/ui/page-header"

export default function PageHeaderReading() {
  return (
    <PageHeader size="lg" className="w-full max-w-2xl">
      <PageHeaderEyebrow>Getting started</PageHeaderEyebrow>
      <PageHeaderContent>
        <PageHeaderTitle>Installation</PageHeaderTitle>
      </PageHeaderContent>
      <PageHeaderActions>
        <Button variant="secondary" size="sm">
          <CopyIcon data-icon="inline-start" />
          Copy page
        </Button>
      </PageHeaderActions>
      <PageHeaderDescription>Add the registry to your project, then install the theme and a first component.</PageHeaderDescription>
    </PageHeader>
  )
}
```

## Layout

Actions wrap under the title on narrow screens. The title is the page's `h1`.

## API Reference

### PageHeader

Also accepts every prop of `header`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | `"default" \| "lg"` | `"default"` | `lg` sets a `text-3xl` title and `text-lg` lede, aligns actions with the title, and gives a direct eyebrow or description its own row. |

### PageHeaderTitle

`text-2xl` semibold, balanced wrapping. Also accepts every prop of `h1`.

### PageHeaderEyebrow

Small line above the title, such as a breadcrumb or status. Also accepts every prop of `div`.
