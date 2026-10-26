import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Edits and exports email templates.", "zh": "编辑邮件模板并导出。"},
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
    { id: "blank", title: { en: "Blank", zh: "空白" },  },
    { id: "mobile-preview", title: { en: "Mobile Preview", zh: "手机预览" },  },
    { id: "render-html", title: { en: "Render HTML", zh: "渲染 HTML" },  },
  ],
  notes: [
    { title: "Blocks", body: { en: "Show if renders a block only when a variable is set, and Repeat renders it once per item of a list variable. Selecting a button, image, logo or spacer opens its settings.", zh: "Show if 仅在变量已设置时渲染块，Repeat 会为列表变量的每一项各渲染一次。选中按钮、图片、徽标或间隔物会打开其设置。" } },
    { title: "Email-safe HTML", body: { en: "Export uses table layout and inline styles, adds a `Preview` preheader and a plain-text version (`renderEmailText`), and its 600px card goes edge to edge on narrower screens. Exported colours are hex (`theme` prop), since mail clients do not see the site's tokens. The preview renders this exported HTML in a sandboxed iframe, filled with `previewValues` while Sample data is on.", zh: "导出使用表格布局和内联样式，添加 `Preview` 预头信息和纯文本版本（`renderEmailText`），其 600px 卡片在更窄屏幕上会铺满边缘。导出的颜色为十六进制（`theme` prop），因为邮件客户端看不到站点的变量。预览在沙盒 iframe 中渲染此导出的 HTML，当示例数据开启时用 `previewValues` 填充。" } },
    { title: "Variables and logic", body: { en: "`variables` feeds the `{{` picker and the Show if / Repeat selects; `list: true` marks list variables. Without values the HTML keeps Handlebars syntax for your email provider; with values (`renderEmailHtml(email, { variables })`) the export is final, and `{{name}}` inside button URLs, image URLs, subject and preheader is filled too.", zh: "`variables` 为 `{{` 选择器以及 Show if / Repeat 下拉框提供数据；`list: true` 标记列表变量。没有值时，HTML 会保留 Handlebars 语法供你的邮件服务商使用；有值时（`renderEmailHtml(email, { variables })`），导出即为最终版本，并且按钮 URL、图片 URL、主题和预头信息中的 `{{name}}` 也会被填充。" } },
  ],
  api: [
    { name: "EmailEditor", props: [
      { name: "defaultValue", type: "EmailDocument", description: { en: "`{ subject, preheader, content }` where `content` is editor JSON (`JSONContent`).", zh: "`{ subject, preheader, content }`，其中 `content` 是编辑器 JSON（`JSONContent`）。" } },
      { name: "value", type: "EmailDocument", description: { en: "Controlled value. Pair with `onChange`.", zh: "受控值。与 `onChange` 搭配使用。" } },
      { name: "onChange", type: "(email: EmailDocument) => void", description: { en: "Called on every edit to the body, subject or preheader.", zh: "正文、主题或预头信息每次编辑时调用。" } },
      { name: "variables", type: "EmailVariable[]", default: "[]", description: { en: "`{ name, label?, fallback?, sample?, list? }`.", zh: "`{ name, label?, fallback?, sample?, list? }`。" } },
      { name: "previewValues", type: "Record<string, unknown>", description: { en: "Values for the preview's Sample data switch.", zh: "预览的示例数据开关的值。" } },
      { name: "theme", type: "Partial<EmailTheme>", description: { en: "Exported colours, font and width (hex; default brand `#2563eb`, width 600).", zh: "导出的颜色、字体和宽度（十六进制；默认品牌色 `#2563eb`，宽度 600）。" } },
      { name: "readOnly", type: "boolean", default: "false", description: { en: "Disable editing.", zh: "禁用编辑。" } },
      { name: "uploadImage", type: "(file: File) => Promise<string>", description: { en: "Uploader for image and logo uploads (default: data URL).", zh: "用于图片和徽标上传的上传器（默认：data URL）。" } },
      { name: "slashItems", type: "SlashItem[]", default: "emailSlashItems", description: { en: "The `/` menu.", zh: "`/` 菜单。" } },
      { name: "defaultView", type: `"edit" | "preview"`, default: `"edit"`, description: { en: "Initial mode.", zh: "初始模式。" } },
      { name: "defaultDevice", type: `"desktop" | "mobile"`, default: `"desktop"`, description: { en: "Initial width (600px or 375px).", zh: "初始宽度（600px 或 375px）。" } },
      { name: "fileName", type: "string", default: `"email"`, description: { en: "Download name for exports.", zh: "导出的下载名称。" } },
      { name: "onReady", type: "(editor: Editor) => void", description: { en: "Receive the editor instance.", zh: "接收编辑器实例。" } },
    ] },
    { name: "renderEmailHtml", description: { en: "`renderEmailHtml(email, { variables?, theme? }): Promise<string>`.", zh: "`renderEmailHtml(email, { variables?, theme? }): Promise<string>`。" }, props: [] },
    { name: "renderEmailText", description: { en: "Plain-text version of the same email.", zh: "同一封邮件的纯文本版本。" }, props: [] },
    { name: "emailExtensions", description: { en: "`emailExtensions({ variables, slashItems, uploadImage, placeholder })` returns every extension, for a custom layout with `useEditor`.", zh: "`emailExtensions({ variables, slashItems, uploadImage, placeholder })` 返回所有扩展，用于配合 `useEditor` 的自定义布局。" }, props: [] },
  ],
} satisfies ComponentDoc
