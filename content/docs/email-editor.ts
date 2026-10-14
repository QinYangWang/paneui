import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import { EmailEditor, renderEmailHtml } from "@/components/email-editor/email-editor"
import { defaultEmailVariables, welcomeEmail } from "@/components/email-editor/templates"`,
    code: `<EmailEditor
  defaultValue={welcomeEmail}
  variables={defaultEmailVariables}
  onChange={(email) => save(email)}
/>

// later, on the server or in the browser
const html = await renderEmailHtml(email, { variables: { first_name: "Ada" } })`,
  },
  composition: `EmailEditor
├── mode (Edit / Preview) · device (desktop / mobile) · Export menu
├── Subject + Preheader
├── EditorContent              emailExtensions(): blocks, variables, slash menu
├── EditorBlockHandle · EditorBubbleMenu (from notion-editor)
└── node settings bubble       button, image, logo, spacer

renderEmailHtml(email, options) · renderEmailText · EmailTemplate (React Email tree)`,
  examples: [
    { id: "blank", title: "Blank", description: "No `defaultValue`: start typing, press `/` for blocks and `{{` for variables." },
    { id: "mobile-preview", title: "Mobile Preview", description: "`defaultView=\"preview\"` and `defaultDevice=\"mobile\"`. The preview renders the real exported HTML in a sandboxed iframe, filled with `previewValues` while Sample data is on." },
    { id: "render-html", title: "Render HTML", description: "`renderEmailHtml` without values exports a template (`{{first_name}}`, `{{#if}}`, `{{#each}}`); with `variables` it fills them in." },
  ],
  notes: [
    { title: "Blocks", body: "Heading, text, lists, quote, button (filled / outline / link, corners, colour, alignment, URL), image (URL or upload, alt, link, width, alignment), logo, spacer, divider, footer, 2 and 3 columns, section (plain / gray / brand tint), Show if (renders when a variable is set) and Repeat (once per item of a list variable). Text bubble adds alignment; selecting a button, image, logo or spacer opens its settings." },
    { title: "Email-safe HTML", body: "Export uses `@react-email/components` and `@react-email/render`: table layout, inline styles, a `Preview` preheader, a 600px card that goes edge to edge below 600px, and a plain-text version (`renderEmailText`). Colours in the exported email are hex (`theme` prop), since mail clients do not see the site's tokens." },
    { title: "Variables and logic", body: "`variables` feeds the `{{` picker and the Show if / Repeat selects; `list: true` marks list variables. Without values the HTML keeps Handlebars syntax for your email provider; with values (`renderEmailHtml(email, { variables })`) the export is final, and `{{name}}` inside button URLs, image URLs, subject and preheader is filled too." },
    { title: "Credit", body: "The feature set follows maily.to (MIT, Arik Chakma); no maily code is used. Built on the notion editor's Tiptap base." },
  ],
  api: [
    { name: "EmailEditor", props: [
      { name: "defaultValue", type: "EmailDocument", description: "`{ subject, preheader, content }` where `content` is Tiptap JSON." },
      { name: "value", type: "EmailDocument", description: "Controlled value. Pair with `onChange`." },
      { name: "onChange", type: "(email: EmailDocument) => void", description: "Called on every edit to the body, subject or preheader." },
      { name: "variables", type: "EmailVariable[]", default: "[]", description: "`{ name, label?, fallback?, sample?, list? }`." },
      { name: "previewValues", type: "Record<string, unknown>", description: "Values for the preview's Sample data switch." },
      { name: "theme", type: "Partial<EmailTheme>", description: "Exported colours, font and width (hex; default brand `#2563eb`, width 600)." },
      { name: "readOnly", type: "boolean", default: "false", description: "Disable editing." },
      { name: "uploadImage", type: "(file: File) => Promise<string>", description: "Uploader for image and logo uploads (default: data URL)." },
      { name: "slashItems", type: "SlashItem[]", default: "emailSlashItems", description: "The `/` menu." },
      { name: "defaultView", type: `"edit" | "preview"`, default: `"edit"`, description: "Initial mode." },
      { name: "defaultDevice", type: `"desktop" | "mobile"`, default: `"desktop"`, description: "Initial width (600px or 375px)." },
      { name: "fileName", type: "string", default: `"email"`, description: "Download name for exports." },
      { name: "onReady", type: "(editor: Editor) => void", description: "Receive the editor instance." },
    ] },
    { name: "renderEmailHtml", description: "`renderEmailHtml(email, { variables?, theme? }): Promise<string>`.", props: [] },
    { name: "renderEmailText", description: "Plain-text version of the same email.", props: [] },
    { name: "emailExtensions", description: "`emailExtensions({ variables, slashItems, uploadImage, placeholder })`: every extension, for a custom layout with `useEditor`.", props: [] },
  ],
} satisfies ComponentDoc
