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
├── EditorBlockHandle · EditorBubbleMenu (from the notion-editor block)
└── node settings bubble       button, image, logo, spacer

renderEmailHtml(email, options) · renderEmailText · EmailTemplate (email component tree)`,
  examples: [
    { id: "blank", title: "Blank", description: "Leave out `defaultValue` to start from an empty email, then press `/` for blocks and `{{` for variables." },
    { id: "mobile-preview", title: "Mobile Preview", description: "Set `defaultView=\"preview\"` and `defaultDevice=\"mobile\"` when the editor opens for review on a phone layout." },
    { id: "render-html", title: "Render HTML", description: "Call `renderEmailHtml` without values to hand a template to your email provider, or with `variables` for final HTML." },
  ],
  notes: [
    { title: "Blocks", body: "Show if renders a block only when a variable is set, and Repeat renders it once per item of a list variable. Selecting a button, image, logo or spacer opens its settings." },
    { title: "Email-safe HTML", body: "Export uses table layout and inline styles, adds a `Preview` preheader and a plain-text version (`renderEmailText`), and its 600px card goes edge to edge on narrower screens. Exported colours are hex (`theme` prop), since mail clients do not see the site's tokens. The preview renders this exported HTML in a sandboxed iframe, filled with `previewValues` while Sample data is on." },
    { title: "Variables and logic", body: "`variables` feeds the `{{` picker and the Show if / Repeat selects; `list: true` marks list variables. Without values the HTML keeps Handlebars syntax for your email provider; with values (`renderEmailHtml(email, { variables })`) the export is final, and `{{name}}` inside button URLs, image URLs, subject and preheader is filled too." },
  ],
  api: [
    { name: "EmailEditor", props: [
      { name: "defaultValue", type: "EmailDocument", description: "`{ subject, preheader, content }` where `content` is editor JSON (`JSONContent`)." },
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
    { name: "emailExtensions", description: "`emailExtensions({ variables, slashItems, uploadImage, placeholder })` returns every extension, for a custom layout with `useEditor`.", props: [] },
  ],
} satisfies ComponentDoc
