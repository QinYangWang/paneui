# Outline

> Follows your reading position in the page outline.

Page: https://paneui.dev/docs/outline/

## Installation

```bash
npx shadcn@latest add @paneui/outline
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/outline.json
```

Packages: `@base-ui/react`, `motion`.

Registry items it builds on: `@paneui/theme`, `@paneui/icons`, `@paneui/button`, `@paneui/overflow-hint`, `@paneui/popover`, `@paneui/scroll-area`, `@paneui/locale-provider`.

## Usage

```tsx
import { Outline, OutlinePopover, type OutlineItem } from "@/components/ui/outline"
```

```tsx
const items: OutlineItem[] = [
  { id: "installation", title: "Installation", depth: 2 },
  { id: "usage", title: "Usage", depth: 2 },
  { id: "props", title: "Props", depth: 3 },
]

<aside className="sticky top-20 w-48 max-xl:hidden">
  <Outline items={items} />
</aside>
<OutlinePopover items={items} className="xl:hidden" />
```

## Composition

```text
Outline              nav: title, scrolling list with the track, Back to top
OutlinePopover       nav: a button with the current section, the same list in a popover
useActiveHeading     the id of the section being read
```

## Examples

### Popover

Use below the breakpoint where the rail no longer fits, or on full-width pages.

```tsx
import { OutlinePopover, type OutlineItem } from "@/registry/base-nova/ui/outline"

const items: OutlineItem[] = [
  { id: "outline-popover-install", title: "Installation", depth: 2 },
  { id: "outline-popover-usage", title: "Usage", depth: 2 },
  { id: "outline-popover-props", title: "Props", depth: 3 },
  { id: "outline-popover-a11y", title: "Accessibility", depth: 2 },
]

export default function OutlinePopoverExample() {
  return <OutlinePopover items={items} className="w-full max-w-sm" />
}
```

### Router Links

```tsx
import { Outline, type OutlineItem } from "@/registry/base-nova/ui/outline"

const items: OutlineItem[] = [
  { id: "outline-links-overview", title: "Overview", depth: 2 },
  { id: "outline-links-setup", title: "Setup", depth: 2 },
  { id: "outline-links-env", title: "Environment variables", depth: 3 },
]

export default function OutlineRouterLinks() {
  return (
    <Outline
      items={items}
      title="Contents"
      backToTop={false}
      maxHeight="16rem"
      className="w-56"
      // Swap the anchor for your router's link (or a button that scrolls a panel); spread the props onto it.
      renderLink={(props, item) => <a {...props} title={String(item.title)} />}
    />
  )
}
```

### RTL

```tsx
import { DirectionProvider } from "@base-ui/react/direction-provider"

import { Outline, type OutlineItem } from "@/registry/base-nova/ui/outline"

const items: OutlineItem[] = [
  { id: "outline-rtl-install", title: "التثبيت", depth: 2 },
  { id: "outline-rtl-usage", title: "الاستخدام", depth: 2 },
  { id: "outline-rtl-props", title: "الخصائص", depth: 3 },
  { id: "outline-rtl-a11y", title: "إمكانية الوصول", depth: 2 },
]

export default function OutlineRtl() {
  return (
    <DirectionProvider direction="rtl">
      <div dir="rtl">
        <Outline items={items} title="في هذه الصفحة" backToTop={false} maxHeight="16rem" className="w-56" />
      </div>
    </DirectionProvider>
  )
}
```

## Headings

Items point at headings by `id`, so ids from rehype-slug or your own anchors both work. The list renders on the server; the track and the current section are measured after hydration.

## Current section

A heading is current once its top passes `activeLine` (px from the top of the viewport) by 8px, and stays current until it moves back 8px, so a heading resting on the line never flickers. Over the last screen of scroll the line slides to the bottom edge, so short sections at the end each light up in turn. A clicked entry holds while the page scrolls to it. Set `activeLine` below your sticky header.

## Motion

The lit stretch of the track slides between entries over 300ms; under reduced motion it moves without a transition. When the list scrolls, it moves only as far as the current entry needs and without animation, so it never fights the page scroll.

## API Reference

### Outline

Also accepts every prop of `nav`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `items` (required) | `readonly OutlineItem[]` | — | `{ id, title, depth }`, with `depth` 2 for an h2 and 3 for an h3. |
| `title` | `React.ReactNode` | `labels.onThisPage` | Heading above the list; `null` hides it. The default comes from the locale. |
| `activeLine` | `number` | `112` | Px from the top of the viewport a heading must pass to become current. |
| `backToTop` | `boolean` | `true` | Shows the locale's `backToTop` link under the list after 320px of scrolling. The row and its divider fade in together; before that the row keeps its space but shows nothing. |
| `maxHeight` | `string` | `"calc(100svh - 6.5rem)"` | Cap for the outline; the list scrolls inside it. |
| `renderLink` | `(props, item) => React.ReactElement` | — | Swap each `<a>` for your own element; spread `props` onto it. |

### OutlinePopover

The trigger fills the nav, so size it with `className`. Also accepts every prop of `nav`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `items` (required) | `readonly OutlineItem[]` | — | Same as `Outline`. |
| `title` | `React.ReactNode` | `labels.onThisPage` | Button label before the current section. The default comes from the locale. |
| `activeLine` | `number` | `112` | Same as `Outline`. |
| `backToTop` | `boolean` | `true` | Back to top in the popover once the page has scrolled. |
| `renderLink` | `(props, item) => React.ReactElement` | — | Same as `Outline`. |

### useActiveHeading

`useActiveHeading(ids, { line })` returns the id of the section being read.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `ids` (required) | `readonly string[]` | — | Heading ids in page order. |
| `line` | `number` | `112` | Px from the top of the viewport. |
