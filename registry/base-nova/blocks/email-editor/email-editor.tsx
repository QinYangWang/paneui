"use client"

import * as React from "react"
import { isNodeSelection, type AnyExtension, type Editor, type JSONContent } from "@tiptap/core"
import { Color, TextStyle } from "@tiptap/extension-text-style"
import { Highlight } from "@tiptap/extension-highlight"
import { TextAlign } from "@tiptap/extension-text-align"
import { Placeholder } from "@tiptap/extensions"
import { NodeSelection } from "@tiptap/pm/state"
import { EditorContent, useEditor, useEditorState } from "@tiptap/react"
import { BubbleMenu } from "@tiptap/react/menus"
import { StarterKit } from "@tiptap/starter-kit"

import {
  AlignCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BracesIcon,
  CopyIcon,
  DownloadIcon,
  EditIcon,
  EyeIcon,
  GitBranchIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  ImageIcon,
  ListIcon,
  ListOrderedIcon,
  MinusIcon,
  MonitorIcon,
  MoveVerticalIcon,
  PanelBottomIcon,
  CircleDotIcon,
  Columns2Icon,
  RectangleHorizontalIcon,
  RefreshIcon,
  Rows2Icon,
  SmartphoneIcon,
  TrashIcon,
  TypeIcon,
  UploadIcon,
  QuoteIcon,
} from "@/components/icons"
import { cn } from "@/lib/utils"
import {
  Column,
  Columns,
  EmailButton,
  EmailImage,
  EmailLogo,
  EmailSection,
  EmailVariables,
  Footer,
  Repeat,
  ShowIf,
  Spacer,
  Variable,
  type Align,
  type ButtonRadius,
  type ButtonVariant,
  type EmailVariable,
} from "@/registry/base-nova/blocks/email-editor/nodes"
import {
  defaultEmailTheme,
  renderEmailHtml,
  type EmailDocument,
  type EmailTheme,
} from "@/registry/base-nova/blocks/email-editor/render"
import { EditorBlockHandle } from "@/registry/base-nova/blocks/notion-editor/block-handle"
import { blockTypes, type BlockType } from "@/registry/base-nova/blocks/notion-editor/block-types"
import { EditorBubbleMenu } from "@/registry/base-nova/blocks/notion-editor/bubble-menu"
import { fileToDataUrl, ImageUpload, type ImageUploader } from "@/registry/base-nova/blocks/notion-editor/extensions"
import { editorContentClass, NotionShortcuts } from "@/registry/base-nova/blocks/notion-editor/notion-editor"
import { pickFile, SlashCommand, type SlashItem } from "@/registry/base-nova/blocks/notion-editor/slash-command"
import { Button } from "@/registry/base-nova/ui/button"
import { Input } from "@/registry/base-nova/ui/input"
import { Menu, MenuContent, MenuGroup, MenuItem, MenuLabel, MenuSeparator, MenuTrigger } from "@/registry/base-nova/ui/menu"
import { SegmentedControl, SegmentedControlItem } from "@/registry/base-nova/ui/segmented-control"
import { SwatchPicker, type Swatch } from "@/registry/base-nova/ui/swatch-picker"
import { Switch } from "@/registry/base-nova/ui/switch"
import { ToggleGroup, ToggleGroupItem } from "@/registry/base-nova/ui/toggle-group"
import { ToolbarSeparator, ToolbarToggle } from "@/registry/base-nova/ui/toolbar"

/* ───────────────────────── slash menu ───────────────────────── */

const icon = (I: React.ComponentType<{ className?: string }>) => <I className="size-4 text-muted-foreground" />

export const emailSlashItems: SlashItem[] = [
  { id: "text", title: "Text", description: "Plain paragraph", group: "Text", icon: icon(TypeIcon), keywords: ["paragraph"], command: ({ editor, range }) => editor.chain().focus().deleteRange(range).setParagraph().run() },
  { id: "heading-1", title: "Heading 1", description: "Email title", group: "Text", icon: icon(Heading1Icon), hint: "#", keywords: ["h1"], command: ({ editor, range }) => editor.chain().focus().deleteRange(range).setHeading({ level: 1 }).run() },
  { id: "heading-2", title: "Heading 2", description: "Section heading", group: "Text", icon: icon(Heading2Icon), hint: "##", keywords: ["h2"], command: ({ editor, range }) => editor.chain().focus().deleteRange(range).setHeading({ level: 2 }).run() },
  { id: "heading-3", title: "Heading 3", description: "Small heading", group: "Text", icon: icon(Heading3Icon), hint: "###", keywords: ["h3"], command: ({ editor, range }) => editor.chain().focus().deleteRange(range).setHeading({ level: 3 }).run() },
  { id: "bullet-list", title: "Bulleted list", group: "Text", icon: icon(ListIcon), hint: "-", keywords: ["ul"], command: ({ editor, range }) => editor.chain().focus().deleteRange(range).toggleBulletList().run() },
  { id: "numbered-list", title: "Numbered list", group: "Text", icon: icon(ListOrderedIcon), hint: "1.", keywords: ["ol"], command: ({ editor, range }) => editor.chain().focus().deleteRange(range).toggleOrderedList().run() },
  { id: "quote", title: "Quote", group: "Text", icon: icon(QuoteIcon), hint: ">", keywords: ["blockquote"], command: ({ editor, range }) => editor.chain().focus().deleteRange(range).toggleBlockquote().run() },
  { id: "variable", title: "Variable", description: "Insert {{first_name}} and friends", group: "Text", icon: icon(BracesIcon), hint: "{{", keywords: ["merge", "tag", "personalize"], command: ({ editor, range }) => editor.chain().focus().deleteRange(range).insertContent("{{").run() },
  { id: "button", title: "Button", description: "Call to action link", group: "Blocks", icon: icon(RectangleHorizontalIcon), keywords: ["cta", "link"], command: ({ editor, range }) => editor.chain().focus().deleteRange(range).insertEmailButton().run() },
  { id: "image", title: "Image", description: "Picture from a URL or upload", group: "Blocks", icon: icon(ImageIcon), keywords: ["picture", "photo"], command: ({ editor, range }) => editor.chain().focus().deleteRange(range).insertEmailImage().run() },
  { id: "logo", title: "Logo", description: "Brand mark", group: "Blocks", icon: icon(CircleDotIcon), keywords: ["brand"], command: ({ editor, range }) => editor.chain().focus().deleteRange(range).insertEmailLogo().run() },
  { id: "spacer", title: "Spacer", description: "Vertical space", group: "Blocks", icon: icon(MoveVerticalIcon), keywords: ["gap", "space"], command: ({ editor, range }) => editor.chain().focus().deleteRange(range).insertSpacer(32).run() },
  { id: "divider", title: "Divider", description: "Horizontal line", group: "Blocks", icon: icon(MinusIcon), hint: "---", keywords: ["hr", "line"], command: ({ editor, range }) => editor.chain().focus().deleteRange(range).setHorizontalRule().run() },
  { id: "footer", title: "Footer", description: "Small print, address, unsubscribe", group: "Blocks", icon: icon(PanelBottomIcon), keywords: ["unsubscribe", "address"], command: ({ editor, range }) => editor.chain().focus().deleteRange(range).insertFooter().run() },
  { id: "columns-2", title: "2 columns", description: "Side by side content", group: "Layout", icon: icon(Columns2Icon), keywords: ["grid", "columns"], command: ({ editor, range }) => editor.chain().focus().deleteRange(range).insertColumns(2).run() },
  { id: "columns-3", title: "3 columns", description: "Three across", group: "Layout", icon: icon(Columns2Icon), keywords: ["grid", "columns"], command: ({ editor, range }) => editor.chain().focus().deleteRange(range).insertColumns(3).run() },
  { id: "section", title: "Section", description: "Tinted box around blocks", group: "Layout", icon: icon(Rows2Icon), keywords: ["container", "box", "card"], command: ({ editor, range }) => editor.chain().focus().deleteRange(range).insertSection().run() },
  { id: "show-if", title: "Show if", description: "Only when a variable is set", group: "Logic", icon: icon(GitBranchIcon), keywords: ["condition", "if"], command: ({ editor, range }) => editor.chain().focus().deleteRange(range).insertShowIf().run() },
  { id: "repeat", title: "Repeat", description: "Once per item of a list", group: "Logic", icon: icon(RefreshIcon), keywords: ["loop", "each", "for"], command: ({ editor, range }) => editor.chain().focus().deleteRange(range).insertRepeat().run() },
]

const emailBlockTypes: BlockType[] = blockTypes.filter((b) => ["text", "heading-1", "heading-2", "heading-3", "bullet-list", "numbered-list", "quote"].includes(b.id))

/** Email-safe palettes (hex, since the exported HTML has no theme). */
export const emailTextColors: Swatch[] = [
  { value: "default", label: "Default" },
  { value: "#737373", label: "Gray", color: "#737373" },
  { value: "#dc2626", label: "Red", color: "#dc2626" },
  { value: "#d97706", label: "Amber", color: "#d97706" },
  { value: "#16a34a", label: "Green", color: "#16a34a" },
  { value: "#0d9488", label: "Teal", color: "#0d9488" },
  { value: "#2563eb", label: "Blue", color: "#2563eb" },
  { value: "#7c3aed", label: "Violet", color: "#7c3aed" },
  { value: "#db2777", label: "Pink", color: "#db2777" },
]

export const emailHighlightColors: Swatch[] = [
  { value: "default", label: "None" },
  { value: "#f5f5f5", label: "Gray", color: "#f5f5f5" },
  { value: "#fee2e2", label: "Red", color: "#fee2e2" },
  { value: "#fef3c7", label: "Amber", color: "#fef3c7" },
  { value: "#dcfce7", label: "Green", color: "#dcfce7" },
  { value: "#ccfbf1", label: "Teal", color: "#ccfbf1" },
  { value: "#dbeafe", label: "Blue", color: "#dbeafe" },
  { value: "#ede9fe", label: "Violet", color: "#ede9fe" },
  { value: "#fce7f3", label: "Pink", color: "#fce7f3" },
]

const brandSwatches: Swatch[] = emailTextColors.slice(1).map((s) => ({ ...s, value: s.color! }))

/* ───────────────────────── extensions ───────────────────────── */

export type EmailExtensionOptions = {
  variables?: EmailVariable[]
  slashItems?: SlashItem[]
  uploadImage?: ImageUploader
  placeholder?: string
}

/** Every extension of the email editor (schema, node views, menus). */
export function emailExtensions({
  variables = [],
  slashItems = emailSlashItems,
  uploadImage,
  placeholder = "Write, press '/' for blocks or '{{' for variables…",
}: EmailExtensionOptions = {}): AnyExtension[] {
  return [
    StarterKit.configure({
      codeBlock: false,
      heading: { levels: [1, 2, 3] },
      link: { openOnClick: false, autolink: true, defaultProtocol: "https" },
      dropcursor: { width: 2, color: "var(--primary)" },
    }),
    TextAlign.configure({ types: ["heading", "paragraph"], alignments: ["left", "center", "right"], defaultAlignment: "left" }),
    TextStyle,
    Color,
    Highlight.configure({ multicolor: true }),
    Placeholder.configure({
      includeChildren: true,
      showOnlyCurrent: true,
      placeholder: ({ node }) =>
        node.type.name === "heading" ? `Heading ${node.attrs.level}` : node.type.name === "footer" ? "Footer text, address, unsubscribe link" : placeholder,
    }),
    EmailButton,
    EmailImage,
    EmailLogo,
    Spacer,
    Columns,
    Column,
    EmailSection,
    ShowIf,
    Repeat,
    Footer,
    Variable,
    EmailVariables.configure({ variables }),
    ImageUpload.configure(uploadImage ? { upload: uploadImage } : {}),
    SlashCommand.configure({ items: slashItems }),
    NotionShortcuts,
  ]
}

/** Email-specific layout on top of the shared document typography. */
const emailContentClass = cn(
  editorContentClass,
  "text-sm leading-6",
  "[&_h1]:mt-6 [&_h1]:text-2xl [&_h2]:mt-5 [&_h2]:text-xl [&_h3]:mt-4 [&_h3]:text-base",
  "[&_[data-type=email-columns]]:my-3 [&_[data-type=email-columns]]:grid",
  "[&_[data-type=email-column]]:min-w-0 [&_[data-type=email-column]]:rounded-lg [&_[data-type=email-column]]:px-2 [&_[data-type=email-column]]:py-1 [&_[data-type=email-column]]:outline-1 [&_[data-type=email-column]]:outline-border [&_[data-type=email-column]]:outline-dashed",
  "[&_[data-type=email-column]>*:first-child]:mt-0",
  "[&_p[data-type=email-footer]]:mt-6 [&_p[data-type=email-footer]]:text-ui-sm [&_p[data-type=email-footer]]:text-muted-foreground",
  "[&_.ProseMirror-selectednode[data-type=email-columns]]:outline-2 [&_.ProseMirror-selectednode[data-type=email-columns]]:outline-ring/50"
)

/* ───────────────────────── node settings bubble ───────────────────────── */

const SETTINGS_NODES = ["emailButton", "emailImage", "emailLogo", "spacer"]

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[4.5rem_1fr] items-center gap-2">
      <span className="text-ui-sm text-muted-foreground">{label}</span>
      <div className="flex min-w-0 items-center gap-1.5">{children}</div>
    </div>
  )
}

function AlignToggle({ value, onChange }: { value: Align; onChange: (v: Align) => void }) {
  return (
    <ToggleGroup size="sm" variant="outline" value={[value]} onValueChange={(v) => v[0] && onChange(v[0] as Align)} aria-label="Alignment">
      <ToggleGroupItem value="left" aria-label="Align left">
        <AlignLeftIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Align centre">
        <AlignCenterIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Align right">
        <AlignRightIcon />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}

function Choice<T extends string | number>({
  value,
  options,
  onChange,
  label,
}: {
  value: T
  options: { value: T; label: string }[]
  onChange: (v: T) => void
  label: string
}) {
  return (
    <ToggleGroup
      size="sm"
      variant="outline"
      aria-label={label}
      value={[String(value)]}
      onValueChange={(v) => {
        const hit = options.find((o) => String(o.value) === v[0])
        if (hit) onChange(hit.value)
      }}
    >
      {options.map((o) => (
        <ToggleGroupItem key={String(o.value)} value={String(o.value)} className="px-2 text-ui-sm">
          {o.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}

/** A text input that commits on blur / Enter, so typing does not create one undo step per key. */
function CommitInput({ value, onCommit, ...props }: Omit<React.ComponentProps<typeof Input>, "value" | "onChange"> & { value: string; onCommit: (v: string) => void }) {
  const [draft, setDraft] = React.useState(value)
  React.useEffect(() => setDraft(value), [value])
  return (
    <Input
      {...props}
      value={draft}
      onChange={(e) => setDraft(e.target.value)}
      onBlur={() => draft !== value && onCommit(draft)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault()
          onCommit(draft)
        }
      }}
      className={cn("h-7", props.className)}
    />
  )
}

function NodeSettingsMenu({ editor }: { editor: Editor }) {
  const sel = useEditorState({
    editor,
    selector: ({ editor: e }) => {
      const s = e.state.selection
      return isNodeSelection(s) && SETTINGS_NODES.includes(s.node.type.name)
        ? { pos: s.from, type: s.node.type.name, attrs: s.node.attrs as Record<string, unknown> }
        : null
    },
  })

  const set = (attrs: Record<string, unknown>) => {
    if (!sel) return
    const { state, view } = editor
    const node = state.doc.nodeAt(sel.pos)
    if (!node) return
    const tr = state.tr.setNodeMarkup(sel.pos, undefined, { ...node.attrs, ...attrs })
    tr.setSelection(NodeSelection.create(tr.doc, sel.pos))
    view.dispatch(tr)
  }
  const upload = async (key: "src") => {
    const file = await pickFile("image/*")
    if (!file) return
    const storage = (editor.storage as unknown as Record<string, { upload?: ImageUploader } | undefined>).imageUpload
    set({ [key]: await (storage?.upload ?? fileToDataUrl)(file) })
  }
  const remove = () => {
    if (!sel) return
    editor.chain().focus().deleteSelection().run()
  }
  const a = sel?.attrs ?? {}

  return (
    <BubbleMenu
      editor={editor}
      pluginKey="emailNodeSettings"
      appendTo={() => document.body}
      shouldShow={({ editor: e, element }) => {
        const s = e.state.selection
        if (!e.isEditable || !isNodeSelection(s) || !SETTINGS_NODES.includes(s.node.type.name)) return false
        return e.view.hasFocus() || element.contains(document.activeElement)
      }}
      options={{ placement: "bottom", offset: 8, flip: true, shift: { padding: 8 } }}
      className="z-40"
    >
      {sel && (
        <div
          data-slot="email-node-settings"
          className="flex w-80 flex-col gap-2 rounded-xl bg-popover p-3 text-ui text-popover-foreground shadow-surface"
        >
          <div className="flex items-center justify-between">
            <span className="text-ui font-semibold">
              {{ emailButton: "Button", emailImage: "Image", emailLogo: "Logo", spacer: "Spacer" }[sel.type]}
            </span>
            <Button size="icon-xs" variant="ghost" aria-label="Delete block" onClick={remove}>
              <TrashIcon />
            </Button>
          </div>
          {sel.type === "emailButton" && (
            <>
              <Field label="Label">
                <CommitInput aria-label="Button label" value={String(a.text ?? "")} onCommit={(text) => set({ text })} />
              </Field>
              <Field label="Link">
                <CommitInput aria-label="Button link" value={String(a.href ?? "")} placeholder="https:// or {{variable}}" onCommit={(href) => set({ href })} />
              </Field>
              <Field label="Style">
                <Choice<ButtonVariant>
                  label="Button style"
                  value={a.variant as ButtonVariant}
                  onChange={(variant) => set({ variant })}
                  options={[
                    { value: "filled", label: "Filled" },
                    { value: "outline", label: "Outline" },
                    { value: "link", label: "Link" },
                  ]}
                />
              </Field>
              <Field label="Corners">
                <Choice<ButtonRadius>
                  label="Corners"
                  value={a.radius as ButtonRadius}
                  onChange={(radius) => set({ radius })}
                  options={[
                    { value: "square", label: "Square" },
                    { value: "rounded", label: "Round" },
                    { value: "pill", label: "Pill" },
                  ]}
                />
              </Field>
              <Field label="Align">
                <AlignToggle value={a.align as Align} onChange={(align) => set({ align })} />
              </Field>
              <Field label="Colour">
                <SwatchPicker swatches={brandSwatches} value={String(a.color)} onValueChange={(color) => set({ color })} aria-label="Button colour" />
              </Field>
            </>
          )}
          {(sel.type === "emailImage" || sel.type === "emailLogo") && (
            <>
              <Field label="Image">
                <CommitInput aria-label="Image URL" value={String(a.src ?? "").startsWith("data:") ? "" : String(a.src ?? "")} placeholder={String(a.src ?? "").startsWith("data:") ? "Uploaded image" : "https://"} onCommit={(src) => set({ src })} />
                <Button size="icon-sm" variant="ghost" aria-label="Upload image" onClick={() => void upload("src")}>
                  <UploadIcon />
                </Button>
              </Field>
              {sel.type === "emailImage" ? (
                <>
                  <Field label="Alt text">
                    <CommitInput aria-label="Alt text" value={String(a.alt ?? "")} placeholder="Describe the image" onCommit={(alt) => set({ alt })} />
                  </Field>
                  <Field label="Link">
                    <CommitInput aria-label="Image link" value={String(a.href ?? "")} placeholder="Optional" onCommit={(href) => set({ href })} />
                  </Field>
                  <Field label="Width">
                    <Choice<number>
                      label="Width"
                      value={Number(a.width)}
                      onChange={(width) => set({ width })}
                      options={[25, 50, 75, 100].map((w) => ({ value: w, label: `${w}%` }))}
                    />
                  </Field>
                </>
              ) : (
                <Field label="Size">
                  <Choice<number>
                    label="Logo size"
                    value={Number(a.size)}
                    onChange={(size) => set({ size })}
                    options={[
                      { value: 32, label: "S" },
                      { value: 40, label: "M" },
                      { value: 56, label: "L" },
                    ]}
                  />
                </Field>
              )}
              <Field label="Align">
                <AlignToggle value={a.align as Align} onChange={(align) => set({ align })} />
              </Field>
            </>
          )}
          {sel.type === "spacer" && (
            <Field label="Height">
              <Choice<number>
                label="Spacer height"
                value={Number(a.height)}
                onChange={(height) => set({ height })}
                options={[8, 16, 32, 64].map((h) => ({ value: h, label: `${h}` }))}
              />
            </Field>
          )}
        </div>
      )}
    </BubbleMenu>
  )
}

function AlignmentToggles({ editor }: { editor: Editor }) {
  const align = useEditorState({
    editor,
    selector: ({ editor: e }) =>
      (["center", "right"] as const).find((v) => e.isActive({ textAlign: v })) ?? "left",
  })
  const items: { value: Align; label: string; Icon: React.ComponentType }[] = [
    { value: "left", label: "Align left", Icon: AlignLeftIcon },
    { value: "center", label: "Align centre", Icon: AlignCenterIcon },
    { value: "right", label: "Align right", Icon: AlignRightIcon },
  ]
  return (
    <>
      <ToolbarSeparator />
      {items.map(({ value, label, Icon }) => (
        <ToolbarToggle key={value} aria-label={label} pressed={align === value} onPressedChange={() => editor.chain().focus().setTextAlign(value).run()}>
          <Icon />
        </ToolbarToggle>
      ))}
    </>
  )
}

/* ───────────────────────── editor ───────────────────────── */

function download(text: string, name: string, type: string) {
  const url = URL.createObjectURL(new Blob([text], { type }))
  const link = document.createElement("a")
  link.href = url
  link.download = name
  link.click()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

const emptyEmail: EmailDocument = { subject: "", preheader: "", content: { type: "doc", content: [{ type: "paragraph" }] } }

export type EmailEditorProps = {
  defaultValue?: EmailDocument
  /** Controlled value. Pair with `onChange`. */
  value?: EmailDocument
  onChange?: (email: EmailDocument) => void
  /** Variables offered by the `{{` picker and the Show if / Repeat blocks. */
  variables?: EmailVariable[]
  /** Values used by the preview (and "Copy HTML" when `exportWithValues`). */
  previewValues?: Record<string, unknown>
  theme?: Partial<EmailTheme>
  readOnly?: boolean
  uploadImage?: ImageUploader
  slashItems?: SlashItem[]
  defaultView?: "edit" | "preview"
  defaultDevice?: "desktop" | "mobile"
  /** Download name for exports (no extension). Default `email`. */
  fileName?: string
  onReady?: (editor: Editor) => void
  className?: string
}

/** A visual email editor: blocks, variables, desktop/mobile preview, HTML and JSON export. */
export function EmailEditor({
  defaultValue,
  value,
  onChange,
  variables = [],
  previewValues,
  theme,
  readOnly = false,
  uploadImage,
  slashItems,
  defaultView = "edit",
  defaultDevice = "desktop",
  fileName = "email",
  onReady,
  className,
}: EmailEditorProps) {
  const initial = value ?? defaultValue ?? emptyEmail
  const [subject, setSubject] = React.useState(initial.subject)
  const [preheader, setPreheader] = React.useState(initial.preheader)
  const [view, setView] = React.useState<"edit" | "preview">(defaultView)
  const [device, setDevice] = React.useState<"desktop" | "mobile">(defaultDevice)
  const [useSample, setUseSample] = React.useState(!!previewValues)
  const [html, setHtml] = React.useState("")
  const [copied, setCopied] = React.useState(false)
  const fields = React.useRef({ subject, preheader })
  fields.current = { subject, preheader }
  const changeRef = React.useRef(onChange)
  changeRef.current = onChange
  const lastJSON = React.useRef<string>("")

  const editor = useEditor({
    immediatelyRender: false,
    editable: !readOnly,
    content: initial.content,
    extensions: emailExtensions({ variables, slashItems, uploadImage }),
    editorProps: { attributes: { "aria-label": "Email body", role: "textbox", "aria-multiline": "true" } },
    onUpdate: ({ editor: e }) => {
      const content = e.getJSON()
      lastJSON.current = JSON.stringify(content)
      changeRef.current?.({ ...fields.current, content })
    },
  })

  React.useEffect(() => {
    if (editor) onReady?.(editor)
    // eslint-disable-next-line react-hooks/exhaustive-deps -- once per editor
  }, [editor])

  React.useEffect(() => editor?.setEditable(!readOnly), [editor, readOnly])

  // controlled value
  React.useEffect(() => {
    if (!value) return
    setSubject(value.subject)
    setPreheader(value.preheader)
    if (!editor) return
    const json = JSON.stringify(value.content)
    if (json === lastJSON.current || json === JSON.stringify(editor.getJSON())) return
    lastJSON.current = json
    editor.commands.setContent(value.content, { emitUpdate: false })
  }, [editor, value])

  const current = React.useCallback(
    (): EmailDocument => ({ subject, preheader, content: editor?.getJSON() ?? emptyEmail.content }),
    [editor, subject, preheader]
  )

  const updateField = (patch: Partial<Pick<EmailDocument, "subject" | "preheader">>) => {
    if (patch.subject !== undefined) setSubject(patch.subject)
    if (patch.preheader !== undefined) setPreheader(patch.preheader)
    onChange?.({ ...current(), ...patch })
  }

  // preview HTML
  React.useEffect(() => {
    if (view !== "preview" || !editor) return
    let live = true
    void renderEmailHtml(current(), { theme, variables: useSample ? previewValues : undefined }).then((out) => live && setHtml(out))
    return () => {
      live = false
    }
  }, [view, editor, current, theme, useSample, previewValues])

  const exportHtml = async () => renderEmailHtml(current(), { theme })
  const copyHtml = async () => {
    await navigator.clipboard?.writeText(await exportHtml())
    setCopied(true)
    setTimeout(() => setCopied(false), 1600)
  }
  const importJson = async () => {
    const file = await pickFile(".json,application/json")
    if (!file || !editor) return
    const data = JSON.parse(await file.text()) as Partial<EmailDocument> & JSONContent
    const doc = data.content && !Array.isArray(data.content) ? data : { subject, preheader, content: data as JSONContent }
    setSubject(doc.subject ?? "")
    setPreheader(doc.preheader ?? "")
    editor.commands.setContent(doc.content as JSONContent)
  }

  const width = device === "mobile" ? 375 : (theme?.width ?? defaultEmailTheme.width)

  return (
    <div
      data-slot="email-editor"
      className={cn("flex min-h-0 flex-col overflow-hidden rounded-xl bg-card text-card-foreground shadow-raised", className)}
    >
      <div className="flex h-12 shrink-0 items-center gap-2 border-b border-border px-3">
        <SegmentedControl size="sm" value={view} onValueChange={(v) => setView(v as "edit" | "preview")} aria-label="Mode">
          <SegmentedControlItem value="edit">
            <EditIcon />
            Edit
          </SegmentedControlItem>
          <SegmentedControlItem value="preview">
            <EyeIcon />
            Preview
          </SegmentedControlItem>
        </SegmentedControl>
        {view === "preview" && previewValues && (
          <label className="ml-1 flex items-center gap-2 text-ui-sm text-muted-foreground">
            <Switch checked={useSample} onCheckedChange={setUseSample} aria-label="Fill variables with sample data" />
            Sample data
          </label>
        )}
        <div className="ml-auto flex items-center gap-2">
          <SegmentedControl size="sm" value={device} onValueChange={(v) => setDevice(v as "desktop" | "mobile")} aria-label="Device">
            <SegmentedControlItem value="desktop" aria-label="Desktop">
              <MonitorIcon />
            </SegmentedControlItem>
            <SegmentedControlItem value="mobile" aria-label="Mobile">
              <SmartphoneIcon />
            </SegmentedControlItem>
          </SegmentedControl>
          <Menu>
            <MenuTrigger render={<Button size="sm" variant="secondary" />}>
              <DownloadIcon data-icon="inline-start" />
              Export
            </MenuTrigger>
            <MenuContent align="end" className="w-48">
              <MenuGroup>
                <MenuLabel>HTML</MenuLabel>
                <MenuItem onClick={() => void copyHtml()} closeOnClick={false}>
                  <CopyIcon />
                  {copied ? "Copied" : "Copy HTML"}
                </MenuItem>
                <MenuItem onClick={() => void exportHtml().then((h) => download(h, `${fileName}.html`, "text/html"))}>
                  <DownloadIcon />
                  Download .html
                </MenuItem>
              </MenuGroup>
              <MenuSeparator />
              <MenuGroup>
                <MenuLabel>JSON</MenuLabel>
                <MenuItem onClick={() => download(JSON.stringify(current(), null, 2), `${fileName}.json`, "application/json")}>
                  <DownloadIcon />
                  Export JSON
                </MenuItem>
                <MenuItem onClick={() => void importJson()} disabled={readOnly}>
                  <UploadIcon />
                  Import JSON
                </MenuItem>
              </MenuGroup>
            </MenuContent>
          </Menu>
        </div>
      </div>

      <div className="flex shrink-0 flex-col border-b border-border">
        <label className="flex h-10 items-center gap-3 border-b border-border px-4">
          <span className="w-18 shrink-0 text-ui text-muted-foreground">Subject</span>
          <input
            value={subject}
            readOnly={readOnly}
            onChange={(e) => updateField({ subject: e.target.value })}
            placeholder="What is this email about?"
            className="h-full min-w-0 flex-1 bg-transparent text-ui font-medium outline-none placeholder:text-muted-foreground/72"
          />
        </label>
        <label className="flex h-10 items-center gap-3 px-4">
          <span className="w-18 shrink-0 text-ui text-muted-foreground">Preheader</span>
          <input
            value={preheader}
            readOnly={readOnly}
            onChange={(e) => updateField({ preheader: e.target.value })}
            placeholder="Preview text shown after the subject in the inbox"
            className="h-full min-w-0 flex-1 bg-transparent text-ui outline-none placeholder:text-muted-foreground/72"
          />
        </label>
      </div>

      <div className="relative min-h-0 flex-1 overflow-y-auto bg-muted">
        <div className={cn("px-4 py-8", view !== "edit" && "hidden")}>
          <div
            className="relative mx-auto rounded-xl bg-background shadow-raised transition-[max-width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
            style={{ maxWidth: width }}
          >
            <div className="relative py-8 pr-8 pl-14">
              <EditorContent editor={editor} className={cn(emailContentClass, "min-h-60")} />
              {editor && !readOnly && <EditorBlockHandle editor={editor} blockTypes={emailBlockTypes} />}
            </div>
          </div>
        </div>
        {view === "preview" && (
          <div className="flex justify-center px-4 py-8">
            <div
              data-device={device}
              className={cn(
                "overflow-hidden bg-background shadow-raised transition-[width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                device === "mobile" ? "frame-3xl frame-p-2 bg-card" : "w-full max-w-180 rounded-xl"
              )}
              style={device === "mobile" ? { width: 375 + 16 } : undefined}
            >
              <iframe
                title="Email preview"
                srcDoc={html}
                sandbox=""
                className={cn("block h-160 w-full", device === "mobile" && "rounded-inner")}
              />
            </div>
          </div>
        )}
      </div>

      {editor && !readOnly && (
        <>
          <EditorBubbleMenu
            editor={editor}
            blockTypes={emailBlockTypes}
            textColors={emailTextColors}
            highlightColors={emailHighlightColors}
          >
            <AlignmentToggles editor={editor} />
          </EditorBubbleMenu>
          <NodeSettingsMenu editor={editor} />
        </>
      )}
    </div>
  )
}

export { renderEmailHtml }
export type { EmailDocument, EmailTheme, EmailVariable }
