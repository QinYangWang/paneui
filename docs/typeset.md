# Typeset

> Styles long-form text in docs, articles and chat messages.

Page: https://paneui.dev/docs/typeset/

## Installation

```bash
npx shadcn@latest add @paneui/typeset
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/typeset.json
```

## Usage

```tsx
/* app/globals.css, after Tailwind */
@import "./typeset.css";
```

```tsx
<article className="typeset typeset-docs">{content}</article>
```

## Examples

### Prose in Tabs

```tsx
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/registry/base-nova/ui/tabs"

export default function TypesetContentSlots() {
  return (
    <article className="typeset typeset-docs w-full max-w-md">
      <p>
        Install the package, then pick the setup that matches your app.
      </p>
      <Tabs defaultValue="static">
        <TabsList>
          <TabsTab value="static">Static site</TabsTab>
          <TabsTab value="server">Server</TabsTab>
        </TabsList>
        <TabsPanel value="static" typeset>
          <p>
            Run <code>build</code> and upload the <code>out/</code> folder.
          </p>
          <ul>
            <li>Every page is plain HTML.</li>
            <li>Search runs in the browser.</li>
          </ul>
        </TabsPanel>
        <TabsPanel value="server" typeset>
          <p>
            Run <code>start</code> behind your proxy.
          </p>
        </TabsPanel>
      </Tabs>
    </article>
  )
}
```

### Nested Panels

```tsx
import { Accordion, AccordionItem, AccordionPanel, AccordionTrigger } from "@/registry/base-nova/ui/accordion"
import { Badge } from "@/registry/base-nova/ui/badge"
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/registry/base-nova/ui/tabs"

export default function TypesetNested() {
  return (
    <article className="typeset typeset-docs w-full max-w-md">
      <Tabs defaultValue="faq">
        <TabsList>
          <TabsTab value="faq">FAQ</TabsTab>
          <TabsTab value="notes">Notes</TabsTab>
        </TabsList>
        <TabsPanel value="faq" typeset>
          <p>
            Common questions about <code>data-typeset</code>.
          </p>
          <Accordion defaultValue={["styles"]}>
            <AccordionItem value="styles">
              <AccordionTrigger>Do nested panels get prose styles?</AccordionTrigger>
              <AccordionPanel typeset>
                <p>
                  Yes. Content in this panel is set as prose, and the <Badge>badge</Badge> keeps its own styles.
                </p>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </TabsPanel>
        <TabsPanel value="notes" typeset>
          <p>Nothing here yet.</p>
        </TabsPanel>
      </Tabs>
    </article>
  )
}
```

## Presets

Use `typeset-docs` for notes and guides (14px), `typeset-reading` for articles (16px, set in the serif face) and `typeset-chat` for messages and streamed answers (14px, tighter flow). Each preset sets `--typeset-size`, `--typeset-leading` and `--typeset-flow` (reading also sets `--typeset-font-body`), so a one-off works too: `className="typeset [--typeset-flow:1.5em]"`.

## Components inside prose

Every library component carries `data-slot` and is skipped automatically. Wrap anything else in `not-typeset`. Utilities on an element override the typeset styles without `!important`.

## Prose inside components

A component slot with `.typeset` or `data-typeset` styles its own content as prose again, inheriting the surrounding preset; components inside it stay skipped. `TabsPanel`, `AccordionPanel`, `CollapsiblePanel` and `CardContent` take a `typeset` prop that sets the attribute (and lets the accordion content keep the prose size and colour). `data-typeset="docs"`, `"reading"` or `"chat"` picks a preset where there is no container. Re-enabling works three levels deep.

## Streaming

Spacing only flows downward (`margin-block-start`), so a new block never restyles the ones above it.

## Width

Typeset sets no max width; add `max-w-reading` (68ch) on the container.
