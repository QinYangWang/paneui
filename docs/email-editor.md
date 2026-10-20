# Email Editor

> Edits and exports email templates.

Page: https://paneui.dev/docs/email-editor/

## Installation

```bash
npx shadcn@latest add @paneui/email-editor
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/email-editor.json
```

Packages: `@tiptap/core`, `@tiptap/pm`, `@tiptap/react`, `@tiptap/starter-kit`, `@tiptap/extensions`, `@tiptap/extension-text-style`, `@tiptap/extension-highlight`, `@tiptap/suggestion`, `@floating-ui/dom`, `@tiptap/extension-text-align`, `@tiptap/extension-mention`, `@react-email/components`, `@react-email/render`, `@base-ui/react`.

Registry items it builds on: `@paneui/theme`, `@paneui/icons`, `@paneui/notion-editor`, `@paneui/button`, `@paneui/input`, `@paneui/menu`, `@paneui/select`, `@paneui/switch`, `@paneui/segmented-control`, `@paneui/swatch-picker`, `@paneui/toggle-group`, `@paneui/toolbar`.

## Usage

```tsx
import { EmailEditor, renderEmailHtml } from "@/components/email-editor/email-editor"
import { defaultEmailVariables, welcomeEmail } from "@/components/email-editor/templates"
```

```tsx
<EmailEditor
  defaultValue={welcomeEmail}
  variables={defaultEmailVariables}
  onChange={(email) => save(email)}
/>

// later, on the server or in the browser
const html = await renderEmailHtml(email, { variables: { first_name: "Ada" } })
```

## Composition

```text
EmailEditor
├── mode (Edit / Preview) · device (desktop / mobile) · Export menu
├── Subject + Preheader
├── EditorContent              emailExtensions(): blocks, variables, slash menu
├── EditorBlockHandle · EditorBubbleMenu (from the notion-editor block)
└── node settings bubble       button, image, logo, spacer

renderEmailHtml(email, options) · renderEmailText · EmailTemplate (email component tree)
```

## Examples

### Blank

```tsx
"use client"

import { EmailEditor } from "@/registry/base-nova/blocks/email-editor/email-editor"
import { defaultEmailVariables } from "@/registry/base-nova/blocks/email-editor/templates"

export default function EmailEditorBlank() {
  return <EmailEditor variables={defaultEmailVariables} className="h-140 w-full max-w-3xl" />
}
```

### Mobile Preview

```tsx
"use client"

import { EmailEditor } from "@/registry/base-nova/blocks/email-editor/email-editor"
import { defaultEmailVariables, sampleEmailValues, welcomeEmail } from "@/registry/base-nova/blocks/email-editor/templates"

export default function EmailEditorMobilePreview() {
  return (
    <EmailEditor
      defaultValue={welcomeEmail}
      variables={defaultEmailVariables}
      previewValues={sampleEmailValues}
      defaultView="preview"
      defaultDevice="mobile"
      className="h-180 w-full max-w-3xl"
    />
  )
}
```

### Render HTML

```tsx
"use client"

import * as React from "react"

import { renderEmailHtml } from "@/registry/base-nova/blocks/email-editor/render"
import { sampleEmailValues, welcomeEmail } from "@/registry/base-nova/blocks/email-editor/templates"
import { Switch } from "@/registry/base-nova/ui/switch"

export default function EmailEditorRenderHtml() {
  const [filled, setFilled] = React.useState(false)
  const [html, setHtml] = React.useState("")
  React.useEffect(() => {
    void renderEmailHtml(welcomeEmail, { variables: filled ? sampleEmailValues : undefined }).then(setHtml)
  }, [filled])
  return (
    <div className="flex w-full max-w-3xl flex-col gap-3">
      <label className="flex items-center gap-2 text-sm text-muted-foreground">
        <Switch checked={filled} onCheckedChange={setFilled} />
        Fill variables with sample values
      </label>
      <pre className="h-80 overflow-auto rounded-xl bg-code p-4 font-mono text-xs leading-relaxed whitespace-pre-wrap shadow-raised">
        {html.slice(0, 6000)}
        {html.length > 6000 ? "\n…" : ""}
      </pre>
    </div>
  )
}
```

## Blocks

Show if renders a block only when a variable is set, and Repeat renders it once per item of a list variable. Selecting a button, image, logo or spacer opens its settings.

## Email-safe HTML

Export uses table layout and inline styles, adds a `Preview` preheader and a plain-text version (`renderEmailText`), and its 600px card goes edge to edge on narrower screens. Exported colours are hex (`theme` prop), since mail clients do not see the site's tokens. The preview renders this exported HTML in a sandboxed iframe, filled with `previewValues` while Sample data is on.

## Variables and logic

`variables` feeds the `{{` picker and the Show if / Repeat selects; `list: true` marks list variables. Without values the HTML keeps Handlebars syntax for your email provider; with values (`renderEmailHtml(email, { variables })`) the export is final, and `{{name}}` inside button URLs, image URLs, subject and preheader is filled too.

## API Reference

### EmailEditor

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `defaultValue` | `EmailDocument` | — | `{ subject, preheader, content }` where `content` is editor JSON (`JSONContent`). |
| `value` | `EmailDocument` | — | Controlled value. Pair with `onChange`. |
| `onChange` | `(email: EmailDocument) => void` | — | Called on every edit to the body, subject or preheader. |
| `variables` | `EmailVariable[]` | `[]` | `{ name, label?, fallback?, sample?, list? }`. |
| `previewValues` | `Record<string, unknown>` | — | Values for the preview's Sample data switch. |
| `theme` | `Partial<EmailTheme>` | — | Exported colours, font and width (hex; default brand `#2563eb`, width 600). |
| `readOnly` | `boolean` | `false` | Disable editing. |
| `uploadImage` | `(file: File) => Promise<string>` | — | Uploader for image and logo uploads (default: data URL). |
| `slashItems` | `SlashItem[]` | `emailSlashItems` | The `/` menu. |
| `defaultView` | `"edit" \| "preview"` | `"edit"` | Initial mode. |
| `defaultDevice` | `"desktop" \| "mobile"` | `"desktop"` | Initial width (600px or 375px). |
| `fileName` | `string` | `"email"` | Download name for exports. |
| `onReady` | `(editor: Editor) => void` | — | Receive the editor instance. |

### renderEmailHtml

`renderEmailHtml(email, { variables?, theme? }): Promise<string>`.

### renderEmailText

Plain-text version of the same email.

### emailExtensions

`emailExtensions({ variables, slashItems, uploadImage, placeholder })` returns every extension, for a custom layout with `useEditor`.
