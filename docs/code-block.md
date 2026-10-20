# Code Block

> Shows code highlighted at build time, alone or in tabs.

Page: https://paneui.dev/docs/code-block/

## Installation

```bash
npx shadcn@latest add @paneui/code-block
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/code-block.json
```

Packages: `motion`, `@base-ui/react`.

Registry items it builds on: `@paneui/theme`, `@paneui/icons`, `@paneui/scroll-area`, `@paneui/tabs`, `@paneui/file-tree`, `@paneui/locale-provider`.

## Usage

```tsx
import { CodeBlock, CodeGroup } from "@/components/ui/code-block"
```

```tsx
// html: a <pre> highlighted at build time with a light and a dark theme
<CodeBlock title="lib/greet.ts" language="ts" html={html} lineNumbers />

<CodeGroup storageKey="framework">
  <CodeBlock title="app/page.tsx" html={page} />
  <CodeBlock title="app/layout.tsx" html={layout} />
</CodeGroup>
```

## Composition

```text
CodeGroup
└── CodeBlock
```

## Examples

### Code Group

Use a group when the same step has several files or variants.

```tsx
import { CodeBlock, CodeGroup } from "@/registry/base-nova/ui/code-block"

const page = "<pre class=\"shiki shiki-themes\" style=\"--shiki-light:#1f2328;--shiki-dark:#e6edf3;--shiki-light-bg:#ffffff;--shiki-dark-bg:#0d1117\" tabindex=\"0\"><code><span class=\"line\"><span style=\"--shiki-light:#CF222E;--shiki-dark:#FF7B72\">import</span><span style=\"--shiki-light:#1F2328;--shiki-dark:#E6EDF3\"> { Button } </span><span style=\"--shiki-light:#CF222E;--shiki-dark:#FF7B72\">from</span><span style=\"--shiki-light:#0A3069;--shiki-dark:#A5D6FF\"> \"@/components/ui/button\"</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"--shiki-light:#CF222E;--shiki-dark:#FF7B72\">export</span><span style=\"--shiki-light:#CF222E;--shiki-dark:#FF7B72\"> default</span><span style=\"--shiki-light:#CF222E;--shiki-dark:#FF7B72\"> function</span><span style=\"--shiki-light:#8250DF;--shiki-dark:#D2A8FF\"> Page</span><span style=\"--shiki-light:#953800;--shiki-dark:#FFA657\">() </span><span style=\"--shiki-light:#1F2328;--shiki-dark:#E6EDF3\">{</span></span>\n<span class=\"line\"><span style=\"--shiki-light:#CF222E;--shiki-dark:#FF7B72\">  return</span><span style=\"--shiki-light:#1F2328;--shiki-dark:#E6EDF3\"> &#x3C;</span><span style=\"--shiki-light:#116329;--shiki-dark:#7EE787\">Button</span><span style=\"--shiki-light:#1F2328;--shiki-dark:#E6EDF3\">>Deploy&#x3C;/</span><span style=\"--shiki-light:#116329;--shiki-dark:#7EE787\">Button</span><span style=\"--shiki-light:#1F2328;--shiki-dark:#E6EDF3\">></span></span>\n<span class=\"line\"><span style=\"--shiki-light:#1F2328;--shiki-dark:#E6EDF3\">}</span></span></code></pre>"
const layout = "<pre class=\"shiki shiki-themes\" style=\"--shiki-light:#1f2328;--shiki-dark:#e6edf3;--shiki-light-bg:#ffffff;--shiki-dark-bg:#0d1117\" tabindex=\"0\"><code><span class=\"line\"><span style=\"--shiki-light:#CF222E;--shiki-dark:#FF7B72\">import</span><span style=\"--shiki-light:#0A3069;--shiki-dark:#A5D6FF\"> \"./globals.css\"</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"--shiki-light:#CF222E;--shiki-dark:#FF7B72\">export</span><span style=\"--shiki-light:#CF222E;--shiki-dark:#FF7B72\"> default</span><span style=\"--shiki-light:#CF222E;--shiki-dark:#FF7B72\"> function</span><span style=\"--shiki-light:#8250DF;--shiki-dark:#D2A8FF\"> RootLayout</span><span style=\"--shiki-light:#953800;--shiki-dark:#FFA657\">({ children }</span><span style=\"--shiki-light:#CF222E;--shiki-dark:#FF7B72\">:</span><span style=\"--shiki-light:#953800;--shiki-dark:#FFA657\"> { children</span><span style=\"--shiki-light:#CF222E;--shiki-dark:#FF7B72\">:</span><span style=\"--shiki-light:#953800;--shiki-dark:#FFA657\"> React.ReactNode }) </span><span style=\"--shiki-light:#1F2328;--shiki-dark:#E6EDF3\">{</span></span>\n<span class=\"line\"><span style=\"--shiki-light:#CF222E;--shiki-dark:#FF7B72\">  return</span><span style=\"--shiki-light:#1F2328;--shiki-dark:#E6EDF3\"> (</span></span>\n<span class=\"line highlighted\"><span style=\"--shiki-light:#1F2328;--shiki-dark:#E6EDF3\">    &#x3C;</span><span style=\"--shiki-light:#116329;--shiki-dark:#7EE787\">html</span><span style=\"--shiki-light:#0550AE;--shiki-dark:#79C0FF\"> lang</span><span style=\"--shiki-light:#CF222E;--shiki-dark:#FF7B72\">=</span><span style=\"--shiki-light:#0A3069;--shiki-dark:#A5D6FF\">\"en\"</span><span style=\"--shiki-light:#1F2328;--shiki-dark:#E6EDF3\">></span></span>\n<span class=\"line\"><span style=\"--shiki-light:#1F2328;--shiki-dark:#E6EDF3\">      &#x3C;</span><span style=\"--shiki-light:#116329;--shiki-dark:#7EE787\">body</span><span style=\"--shiki-light:#1F2328;--shiki-dark:#E6EDF3\">></span><span style=\"--shiki-light:#CF222E;--shiki-dark:#FF7B72\">{</span><span style=\"--shiki-light:#1F2328;--shiki-dark:#E6EDF3\">children</span><span style=\"--shiki-light:#CF222E;--shiki-dark:#FF7B72\">}</span><span style=\"--shiki-light:#1F2328;--shiki-dark:#E6EDF3\">&#x3C;/</span><span style=\"--shiki-light:#116329;--shiki-dark:#7EE787\">body</span><span style=\"--shiki-light:#1F2328;--shiki-dark:#E6EDF3\">></span></span>\n<span class=\"line\"><span style=\"--shiki-light:#1F2328;--shiki-dark:#E6EDF3\">    &#x3C;/</span><span style=\"--shiki-light:#116329;--shiki-dark:#7EE787\">html</span><span style=\"--shiki-light:#1F2328;--shiki-dark:#E6EDF3\">></span></span>\n<span class=\"line\"><span style=\"--shiki-light:#1F2328;--shiki-dark:#E6EDF3\">  )</span></span>\n<span class=\"line\"><span style=\"--shiki-light:#1F2328;--shiki-dark:#E6EDF3\">}</span></span></code></pre>"
const css = "<pre class=\"shiki shiki-themes\" style=\"--shiki-light:#1f2328;--shiki-dark:#e6edf3;--shiki-light-bg:#ffffff;--shiki-dark-bg:#0d1117\" tabindex=\"0\"><code><span class=\"line\"><span style=\"--shiki-light:#CF222E;--shiki-dark:#FF7B72\">@import</span><span style=\"--shiki-light:#0A3069;--shiki-dark:#A5D6FF\"> \"tailwindcss\"</span><span style=\"--shiki-light:#1F2328;--shiki-dark:#E6EDF3\">;</span></span>\n<span class=\"line\"><span style=\"--shiki-light:#CF222E;--shiki-dark:#FF7B72\">@import</span><span style=\"--shiki-light:#0A3069;--shiki-dark:#A5D6FF\"> \"./typeset.css\"</span><span style=\"--shiki-light:#1F2328;--shiki-dark:#E6EDF3\">;</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"--shiki-light:#0550AE;--shiki-dark:#79C0FF\">:root</span><span style=\"--shiki-light:#1F2328;--shiki-dark:#E6EDF3\"> {</span></span>\n<span class=\"line\"><span style=\"--shiki-light:#953800;--shiki-dark:#FFA657\">  --radius</span><span style=\"--shiki-light:#1F2328;--shiki-dark:#E6EDF3\">: </span><span style=\"--shiki-light:#0550AE;--shiki-dark:#79C0FF\">0.625</span><span style=\"--shiki-light:#CF222E;--shiki-dark:#FF7B72\">rem</span><span style=\"--shiki-light:#1F2328;--shiki-dark:#E6EDF3\">;</span></span>\n<span class=\"line\"><span style=\"--shiki-light:#1F2328;--shiki-dark:#E6EDF3\">}</span></span></code></pre>"

export default function CodeBlockCodeGroup() {
  return (
    <CodeGroup className="w-full max-w-lg">
      <CodeBlock title="app/page.tsx" html={page} />
      <CodeBlock title="app/layout.tsx" html={layout} lineNumbers />
      <CodeBlock title="app/globals.css" html={css} />
    </CodeGroup>
  )
}
```

### Remember the Tab

```tsx
import { CodeBlock, CodeGroup } from "@/registry/base-nova/ui/code-block"

const ts = "<pre class=\"shiki shiki-themes\" style=\"--shiki-light:#1f2328;--shiki-dark:#e6edf3;--shiki-light-bg:#ffffff;--shiki-dark-bg:#0d1117\" tabindex=\"0\"><code><span class=\"line\"><span style=\"--shiki-light:#CF222E;--shiki-dark:#FF7B72\">import</span><span style=\"--shiki-light:#1F2328;--shiki-dark:#E6EDF3\"> { Button } </span><span style=\"--shiki-light:#CF222E;--shiki-dark:#FF7B72\">from</span><span style=\"--shiki-light:#0A3069;--shiki-dark:#A5D6FF\"> \"@/components/ui/button\"</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"--shiki-light:#CF222E;--shiki-dark:#FF7B72\">export</span><span style=\"--shiki-light:#CF222E;--shiki-dark:#FF7B72\"> default</span><span style=\"--shiki-light:#CF222E;--shiki-dark:#FF7B72\"> function</span><span style=\"--shiki-light:#8250DF;--shiki-dark:#D2A8FF\"> Page</span><span style=\"--shiki-light:#953800;--shiki-dark:#FFA657\">() </span><span style=\"--shiki-light:#1F2328;--shiki-dark:#E6EDF3\">{</span></span>\n<span class=\"line\"><span style=\"--shiki-light:#CF222E;--shiki-dark:#FF7B72\">  return</span><span style=\"--shiki-light:#1F2328;--shiki-dark:#E6EDF3\"> &#x3C;</span><span style=\"--shiki-light:#116329;--shiki-dark:#7EE787\">Button</span><span style=\"--shiki-light:#1F2328;--shiki-dark:#E6EDF3\">>Deploy&#x3C;/</span><span style=\"--shiki-light:#116329;--shiki-dark:#7EE787\">Button</span><span style=\"--shiki-light:#1F2328;--shiki-dark:#E6EDF3\">></span></span>\n<span class=\"line\"><span style=\"--shiki-light:#1F2328;--shiki-dark:#E6EDF3\">}</span></span></code></pre>"
const css = "<pre class=\"shiki shiki-themes\" style=\"--shiki-light:#1f2328;--shiki-dark:#e6edf3;--shiki-light-bg:#ffffff;--shiki-dark-bg:#0d1117\" tabindex=\"0\"><code><span class=\"line\"><span style=\"--shiki-light:#CF222E;--shiki-dark:#FF7B72\">@import</span><span style=\"--shiki-light:#0A3069;--shiki-dark:#A5D6FF\"> \"tailwindcss\"</span><span style=\"--shiki-light:#1F2328;--shiki-dark:#E6EDF3\">;</span></span>\n<span class=\"line\"><span style=\"--shiki-light:#CF222E;--shiki-dark:#FF7B72\">@import</span><span style=\"--shiki-light:#0A3069;--shiki-dark:#A5D6FF\"> \"./typeset.css\"</span><span style=\"--shiki-light:#1F2328;--shiki-dark:#E6EDF3\">;</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"--shiki-light:#0550AE;--shiki-dark:#79C0FF\">:root</span><span style=\"--shiki-light:#1F2328;--shiki-dark:#E6EDF3\"> {</span></span>\n<span class=\"line\"><span style=\"--shiki-light:#953800;--shiki-dark:#FFA657\">  --radius</span><span style=\"--shiki-light:#1F2328;--shiki-dark:#E6EDF3\">: </span><span style=\"--shiki-light:#0550AE;--shiki-dark:#79C0FF\">0.625</span><span style=\"--shiki-light:#CF222E;--shiki-dark:#FF7B72\">rem</span><span style=\"--shiki-light:#1F2328;--shiki-dark:#E6EDF3\">;</span></span>\n<span class=\"line\"><span style=\"--shiki-light:#1F2328;--shiki-dark:#E6EDF3\">}</span></span></code></pre>"

export default function CodeBlockRememberTab() {
  return (
    <div className="flex w-full max-w-lg flex-col gap-3">
      <CodeGroup storageKey="example-code-group">
        <CodeBlock title="TypeScript" language="tsx" html={ts} />
        <CodeBlock title="CSS" language="css" html={css} />
      </CodeGroup>
      <CodeGroup storageKey="example-code-group">
        <CodeBlock title="TypeScript" language="tsx" html={ts} />
        <CodeBlock title="CSS" language="css" html={css} />
      </CodeGroup>
    </div>
  )
}
```

### Highlighted Lines

```tsx
import { CodeBlock } from "@/registry/base-nova/ui/code-block"

// Line 5 carries the `highlighted` class from a highlighter transformer.
const html = "<pre class=\"shiki shiki-themes\" style=\"--shiki-light:#1f2328;--shiki-dark:#e6edf3;--shiki-light-bg:#ffffff;--shiki-dark-bg:#0d1117\" tabindex=\"0\"><code><span class=\"line\"><span style=\"--shiki-light:#CF222E;--shiki-dark:#FF7B72\">import</span><span style=\"--shiki-light:#0A3069;--shiki-dark:#A5D6FF\"> \"./globals.css\"</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"--shiki-light:#CF222E;--shiki-dark:#FF7B72\">export</span><span style=\"--shiki-light:#CF222E;--shiki-dark:#FF7B72\"> default</span><span style=\"--shiki-light:#CF222E;--shiki-dark:#FF7B72\"> function</span><span style=\"--shiki-light:#8250DF;--shiki-dark:#D2A8FF\"> RootLayout</span><span style=\"--shiki-light:#953800;--shiki-dark:#FFA657\">({ children }</span><span style=\"--shiki-light:#CF222E;--shiki-dark:#FF7B72\">:</span><span style=\"--shiki-light:#953800;--shiki-dark:#FFA657\"> { children</span><span style=\"--shiki-light:#CF222E;--shiki-dark:#FF7B72\">:</span><span style=\"--shiki-light:#953800;--shiki-dark:#FFA657\"> React.ReactNode }) </span><span style=\"--shiki-light:#1F2328;--shiki-dark:#E6EDF3\">{</span></span>\n<span class=\"line\"><span style=\"--shiki-light:#CF222E;--shiki-dark:#FF7B72\">  return</span><span style=\"--shiki-light:#1F2328;--shiki-dark:#E6EDF3\"> (</span></span>\n<span class=\"line highlighted\"><span style=\"--shiki-light:#1F2328;--shiki-dark:#E6EDF3\">    &#x3C;</span><span style=\"--shiki-light:#116329;--shiki-dark:#7EE787\">html</span><span style=\"--shiki-light:#0550AE;--shiki-dark:#79C0FF\"> lang</span><span style=\"--shiki-light:#CF222E;--shiki-dark:#FF7B72\">=</span><span style=\"--shiki-light:#0A3069;--shiki-dark:#A5D6FF\">\"en\"</span><span style=\"--shiki-light:#1F2328;--shiki-dark:#E6EDF3\">></span></span>\n<span class=\"line\"><span style=\"--shiki-light:#1F2328;--shiki-dark:#E6EDF3\">      &#x3C;</span><span style=\"--shiki-light:#116329;--shiki-dark:#7EE787\">body</span><span style=\"--shiki-light:#1F2328;--shiki-dark:#E6EDF3\">></span><span style=\"--shiki-light:#CF222E;--shiki-dark:#FF7B72\">{</span><span style=\"--shiki-light:#1F2328;--shiki-dark:#E6EDF3\">children</span><span style=\"--shiki-light:#CF222E;--shiki-dark:#FF7B72\">}</span><span style=\"--shiki-light:#1F2328;--shiki-dark:#E6EDF3\">&#x3C;/</span><span style=\"--shiki-light:#116329;--shiki-dark:#7EE787\">body</span><span style=\"--shiki-light:#1F2328;--shiki-dark:#E6EDF3\">></span></span>\n<span class=\"line\"><span style=\"--shiki-light:#1F2328;--shiki-dark:#E6EDF3\">    &#x3C;/</span><span style=\"--shiki-light:#116329;--shiki-dark:#7EE787\">html</span><span style=\"--shiki-light:#1F2328;--shiki-dark:#E6EDF3\">></span></span>\n<span class=\"line\"><span style=\"--shiki-light:#1F2328;--shiki-dark:#E6EDF3\">  )</span></span>\n<span class=\"line\"><span style=\"--shiki-light:#1F2328;--shiki-dark:#E6EDF3\">}</span></span></code></pre>"

export default function CodeBlockHighlightedLines() {
  return <CodeBlock title="app/layout.tsx" html={html} lineNumbers className="w-full max-w-lg" />
}
```

### Without Title

Use a bare block for short commands; the copy button shows on hover.

```tsx
import { CodeBlock } from "@/registry/base-nova/ui/code-block"

const html = "<pre class=\"shiki shiki-themes\" style=\"--shiki-light:#1f2328;--shiki-dark:#e6edf3;--shiki-light-bg:#ffffff;--shiki-dark-bg:#0d1117\" tabindex=\"0\"><code><span class=\"line\"><span style=\"--shiki-light:#953800;--shiki-dark:#FFA657\">mkdir</span><span style=\"--shiki-light:#0A3069;--shiki-dark:#A5D6FF\"> docs</span><span style=\"--shiki-light:#1F2328;--shiki-dark:#E6EDF3\"> &#x26;&#x26; </span><span style=\"--shiki-light:#0550AE;--shiki-dark:#79C0FF\">cd</span><span style=\"--shiki-light:#0A3069;--shiki-dark:#A5D6FF\"> docs</span></span>\n<span class=\"line\"><span style=\"--shiki-light:#953800;--shiki-dark:#FFA657\">npx</span><span style=\"--shiki-light:#0A3069;--shiki-dark:#A5D6FF\"> shadcn@latest</span><span style=\"--shiki-light:#0A3069;--shiki-dark:#A5D6FF\"> init</span></span></code></pre>"

export default function CodeBlockWithoutTitle() {
  return <CodeBlock html={html} className="w-full max-w-lg" />
}
```

### Markup as Children

```tsx
import { CodeBlock } from "@/registry/base-nova/ui/code-block"

// Class names as the highlighter emits them (not Tailwind classes).
// eslint-disable-next-line shadcn/no-unknown-classes -- highlighter output classes that CodeBlock styles
const pre = "shiki shiki-themes"
// eslint-disable-next-line shadcn/no-unknown-classes -- highlighter output classes that CodeBlock styles
const line = "line"
const tone = (light: string, dark: string) => ({ "--shiki-light": light, "--shiki-dark": dark }) as React.CSSProperties

// The same markup as elements, e.g. a custom `pre` in an MDX components map.
export default function CodeBlockChildren() {
  return (
    <CodeBlock title="config.json" className="w-full max-w-lg">
      <pre className={pre} style={tone("#1f2328", "#e6edf3")}>
        <code>
          <span className={line}>{"{"}</span>
          {"\n"}
          <span className={line}>
            <span style={tone("#0550ae", "#79c0ff")}>{'  "title"'}</span>
            {": "}
            <span style={tone("#0a3069", "#a5d6ff")}>{'"Docs"'}</span>
          </span>
          {"\n"}
          <span className={line}>{"}"}</span>
        </code>
      </pre>
    </CodeBlock>
  )
}
```

## Input

The block never highlights in the browser. Give it markup highlighted at build time, as an `html` string or as children. Dual-theme output that puts `--shiki-light` and `--shiki-dark` on the `<pre>` and its spans follows the `.dark` class; output with inline light colours plus `--shiki-dark` works too. Only pass trusted build output to `html`.

## Lines

Lines are the `.line` spans of the output. `lineNumbers` numbers them with CSS counters, so copying skips the numbers. Transformer classes are styled: `.line.highlighted`, `.line.diff.add`, `.line.diff.remove`, `.has-focused .line:not(.focused)` and `.highlighted-word`.

## In a content pipeline

Map your `pre` to a CodeBlock: `pre: ({ "data-title": title, "data-language": language, ...props }) => <CodeBlock title={title} language={language}><pre {...props} /></CodeBlock>`. A CodeBlock inside a `typeset` container keeps its own styles.

## Copy

The copy button copies the text of the `<pre>`. In a group it copies the open tab.

## API Reference

### CodeBlock

Frame with an optional title bar. Inside a `CodeGroup` it renders only its code; the group owns the frame. Also accepts every prop of `div`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `html` | `string` | — | Highlighted markup, usually a whole `<pre>`. |
| `children` | `ReactNode` | — | Highlighted elements, used when `html` is not set. |
| `title` | `ReactNode` | — | Title bar text, usually a file name. Also the tab label (and, as a string, the tab value) in a group. |
| `language` | `string` | — | Label in the title bar; picks the icon when `title` is not a file name. |
| `icon` | `ReactNode \| false` | — | Title bar icon. Defaults to the file-type icon from `getFileKind`; `false` hides it. |
| `lineNumbers` | `boolean` | `false` | Number the lines. |
| `wrap` | `boolean` | `false` | Wrap long lines instead of scrolling sideways. |
| `copyable` | `boolean` | `true` | Show the copy button. |
| `maxHeight` | `number \| string` | — | Height after which the code scrolls. |

| Data attribute | Description |
| --- | --- |
| `data-line-numbers` | On `code-block-content` while `lineNumbers` is set. |

### CodeGroup

Tabs of CodeBlocks in one frame. Also accepts every prop of `div`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` | — | Controlled tab (a block's string `title`, else its `language`). |
| `defaultValue` | `string` | — | First tab shown. Defaults to the first block. |
| `onValueChange` | `(value: string) => void` | — | Called when the tab changes. |
| `storageKey` | `string` | — | Remember the tab in `localStorage` and switch every group with the same key together. |
| `copyable` | `boolean` | `true` | Show the copy button. |

### CodeCopyButton

The copy button on its own. `value` is a string or a function that returns one.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` (required) | `string \| (() => string)` | — | Text to copy. |
| `label` | `string` | `"Copy code"` | Accessible label. |
