import { Extension, mergeAttributes, Node, type AnyExtension } from "@tiptap/core"
import { CodeBlockLowlight } from "@tiptap/extension-code-block-lowlight"
import { Details, DetailsContent, DetailsSummary } from "@tiptap/extension-details"
import { Highlight } from "@tiptap/extension-highlight"
import { Image } from "@tiptap/extension-image"
import { TaskItem, TaskList } from "@tiptap/extension-list"
import { Table, TableCell, TableHeader, TableRow } from "@tiptap/extension-table"
import { Color, TextStyle } from "@tiptap/extension-text-style"
import { Placeholder } from "@tiptap/extensions"
import { Plugin, PluginKey } from "@tiptap/pm/state"
import { StarterKit } from "@tiptap/starter-kit"
import { common, createLowlight } from "lowlight"

/**
 * Schema-level extensions of the block editor. No React here, so the MDX helpers
 * and tests can build the same schema in Node. Node views are attached in
 * notion-editor.tsx.
 */

export const lowlight = createLowlight(common)

const CHEVRON =
  '<svg width="14" height="14" viewBox="0 0 18 18" aria-hidden="true"><path d="M7.2 5.2L11 9l-3.8 3.8" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>'

export type CalloutType = "info" | "warning" | "success" | "danger" | "note"

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    callout: {
      /** Wrap the selection in a callout, or insert an empty one. */
      setCallout: (attrs?: { type?: CalloutType; icon?: string | null }) => ReturnType
      toggleCallout: (attrs?: { type?: CalloutType; icon?: string | null }) => ReturnType
    }
    mdxBlock: {
      insertMdxBlock: (source: string) => ReturnType
    }
  }
}

/** `<Callout type="info" icon="💡">…</Callout>` in MDX. Holds any blocks. */
export const Callout = Node.create({
  name: "callout",
  group: "block",
  content: "block+",
  defining: true,
  draggable: true,
  addAttributes() {
    return {
      type: {
        default: "info",
        parseHTML: (el) => el.getAttribute("data-callout-type") ?? "info",
        renderHTML: (attrs) => ({ "data-callout-type": attrs.type }),
      },
      icon: {
        default: null,
        parseHTML: (el) => el.getAttribute("data-icon"),
        renderHTML: (attrs) => (attrs.icon ? { "data-icon": attrs.icon } : {}),
      },
    }
  },
  parseHTML() {
    return [{ tag: 'div[data-type="callout"]' }]
  },
  renderHTML({ HTMLAttributes }) {
    return ["div", mergeAttributes(HTMLAttributes, { "data-type": "callout" }), 0]
  },
  addCommands() {
    return {
      setCallout:
        (attrs) =>
        ({ commands }) =>
          commands.wrapIn(this.name, attrs),
      toggleCallout:
        (attrs) =>
        ({ commands }) =>
          commands.toggleWrap(this.name, attrs),
    }
  },
})

/**
 * Raw MDX the editor does not model (unknown JSX components, import/export,
 * `{expressions}`, footnote definitions). Kept verbatim so a round trip is lossless,
 * shown as editable source.
 */
export const MdxBlock = Node.create({
  name: "mdxBlock",
  group: "block",
  atom: true,
  selectable: true,
  draggable: true,
  addAttributes() {
    return { source: { default: "" } }
  },
  parseHTML() {
    return [{ tag: 'pre[data-type="mdx-block"]', getAttrs: (el) => ({ source: (el as HTMLElement).textContent ?? "" }) }]
  },
  renderHTML({ node, HTMLAttributes }) {
    return ["pre", mergeAttributes(HTMLAttributes, { "data-type": "mdx-block" }), node.attrs.source as string]
  },
  addCommands() {
    return {
      insertMdxBlock:
        (source) =>
        ({ commands }) =>
          commands.insertContent({ type: this.name, attrs: { source } }),
    }
  },
})

/** Inline raw MDX (`{props.name}`, an unknown inline component). */
export const MdxInline = Node.create({
  name: "mdxInline",
  group: "inline",
  inline: true,
  atom: true,
  selectable: true,
  addAttributes() {
    return { source: { default: "" } }
  },
  parseHTML() {
    return [{ tag: 'code[data-type="mdx-inline"]', getAttrs: (el) => ({ source: (el as HTMLElement).textContent ?? "" }) }]
  },
  renderHTML({ node, HTMLAttributes }) {
    return ["code", mergeAttributes(HTMLAttributes, { "data-type": "mdx-inline" }), node.attrs.source as string]
  },
  renderText({ node }) {
    return node.attrs.source as string
  },
})

/** GFM column alignment, kept on the table so MDX round trips keep `:--:` markers. */
const AlignedTable = Table.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      align: { default: null, rendered: false },
    }
  },
})

/** Lists remember whether they were loose (blank lines between items) in MDX. */
function spreadAttr() {
  return { spread: { default: false, rendered: false } }
}

export type ImageUploader = (file: File) => Promise<string>

/** Reads a File into a data: URL (the default image "upload"). */
export function fileToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })
}

/** Pasted or dropped image files go through `upload` and land as image blocks. */
export const ImageUpload = Extension.create<{ upload: ImageUploader }>({
  name: "imageUpload",
  addOptions() {
    return { upload: fileToDataUrl }
  },
  addStorage() {
    return { upload: this.options.upload }
  },
  addProseMirrorPlugins() {
    const editor = this.editor
    const upload = this.options.upload
    const insert = (files: File[], pos?: number) => {
      for (const file of files) {
        void upload(file).then((src) => {
          const chain = editor.chain().focus()
          if (pos != null) chain.insertContentAt(pos, { type: "image", attrs: { src, alt: file.name } }).run()
          else chain.setImage({ src, alt: file.name }).run()
        })
      }
    }
    return [
      new Plugin({
        key: new PluginKey("imageUpload"),
        props: {
          handlePaste: (_view, event) => {
            const files = Array.from(event.clipboardData?.files ?? []).filter((f) => f.type.startsWith("image/"))
            if (!files.length || !editor.isEditable) return false
            insert(files)
            return true
          },
          handleDrop: (view, event) => {
            const files = Array.from(event.dataTransfer?.files ?? []).filter((f) => f.type.startsWith("image/"))
            if (!files.length || !editor.isEditable) return false
            const at = view.posAtCoords({ left: event.clientX, top: event.clientY })
            insert(files, at?.pos)
            return true
          },
        },
      }),
    ]
  },
})

export type NotionExtensionOptions = {
  placeholder?: string
  /** Placeholder per block type (falls back to `placeholder`). */
  placeholders?: Partial<Record<string, string>>
  uploadImage?: ImageUploader
}

/** Every schema extension of the block editor (no node views, no menus). */
export function notionExtensions({
  placeholder = "Write, or press '/' for commands…",
  placeholders = {},
  uploadImage,
}: NotionExtensionOptions = {}): AnyExtension[] {
  const headingPlaceholder: Record<number, string> = { 1: "Heading 1", 2: "Heading 2", 3: "Heading 3" }
  return [
    StarterKit.configure({
      codeBlock: false,
      heading: { levels: [1, 2, 3, 4, 5, 6] },
      link: { openOnClick: false, autolink: true, defaultProtocol: "https" },
      dropcursor: { width: 2, color: "var(--primary)", class: "notion-dropcursor" },
      bulletList: {},
      orderedList: {},
    }).extend({
      // StarterKit's lists get the `spread` attribute through addGlobalAttributes.
      addGlobalAttributes() {
        return [{ types: ["bulletList", "orderedList", "taskList"], attributes: spreadAttr() }]
      },
    }),
    Placeholder.configure({
      includeChildren: true,
      showOnlyCurrent: true,
      placeholder: ({ node }) => {
        if (node.type.name === "heading") return placeholders.heading ?? headingPlaceholder[node.attrs.level as number] ?? "Heading"
        if (node.type.name === "detailsSummary") return placeholders.detailsSummary ?? "Toggle"
        return placeholders[node.type.name] ?? placeholder
      },
    }),
    TaskList,
    TaskItem.configure({ nested: true }),
    TextStyle,
    Color,
    Highlight.configure({ multicolor: true }),
    AlignedTable.configure({ resizable: false, HTMLAttributes: { class: "notion-table" } }),
    TableRow,
    TableHeader,
    TableCell,
    Image.configure({ inline: false, allowBase64: true }),
    CodeBlockLowlight.configure({ lowlight, defaultLanguage: null, enableTabIndentation: true }),
    Details.configure({
      persist: true,
      HTMLAttributes: { class: "notion-details" },
      renderToggleButton: ({ element, isOpen }) => {
        // ChevronRightIcon's path; the content class rotates it when open
        if (!element.firstChild) element.innerHTML = CHEVRON
        element.setAttribute("aria-label", isOpen ? "Collapse" : "Expand")
        element.setAttribute("aria-expanded", String(isOpen))
      },
    }),
    DetailsSummary,
    DetailsContent,
    Callout,
    MdxBlock,
    MdxInline,
    ImageUpload.configure(uploadImage ? { upload: uploadImage } : {}),
  ]
}
