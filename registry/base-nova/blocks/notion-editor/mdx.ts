import type { Editor, JSONContent } from "@tiptap/core"
import type {
  Blockquote,
  BlockContent,
  Code,
  Heading,
  Image as MdastImage,
  List,
  ListItem,
  Paragraph,
  PhrasingContent,
  Root,
  RootContent,
  Table as MdastTable,
  TableCell as MdastTableCell,
  TableRow as MdastTableRow,
} from "mdast"
import type { MdxJsxAttribute, MdxJsxFlowElement, MdxJsxTextElement } from "mdast-util-mdx"
import remarkGfm from "remark-gfm"
import remarkMdx from "remark-mdx"
import remarkParse from "remark-parse"
import remarkStringify from "remark-stringify"
import { unified } from "unified"

/**
 * MDX <-> editor JSON.
 *
 *  - Markdown + GFM (tables, task lists, strikethrough, autolinks) map to editor blocks.
 *  - `<Callout type icon>` maps to the callout block, `<details><summary>` to the toggle.
 *  - Inline `<u>`, `<mark>` and `<span style={{ color }}>` map to underline, highlight and colour.
 *  - Anything else (unknown JSX, import/export, `{expressions}`, footnote definitions) is kept
 *    verbatim as an `mdxBlock` / `mdxInline` node, so `toMDX(fromMDX(source))` equals the
 *    source after remark's normal formatting (see `formatMDX`).
 */

type Mark = { type: string; attrs?: Record<string, unknown> }
type Node = JSONContent

export const mdxStringifyOptions = {
  bullet: "-" as const,
  emphasis: "_" as const,
  strong: "*" as const,
  rule: "-" as const,
  fences: true,
  listItemIndent: "one" as const,
  incrementListMarker: true,
}

const parser = unified().use(remarkParse).use(remarkMdx).use(remarkGfm)
const stringifier = unified().use(remarkStringify, mdxStringifyOptions).use(remarkMdx).use(remarkGfm)

function parseMdast(source: string) {
  return parser.parse(source) as Root
}

function stringifyMdast(tree: Root) {
  return stringifier.stringify(tree)
}

/** The source as remark would print it: the canonical form a round trip returns. */
export function formatMDX(source: string) {
  return stringifyMdast(parseMdast(source))
}

/* ───────────────────────── MDX -> editor JSON ───────────────────────── */

function slice(source: string, node: { position?: { start: { offset?: number }; end: { offset?: number } } }) {
  const start = node.position?.start.offset
  const end = node.position?.end.offset
  return start != null && end != null ? source.slice(start, end) : ""
}

function attr(el: MdxJsxFlowElement | MdxJsxTextElement, name: string) {
  const a = el.attributes.find((x): x is MdxJsxAttribute => x.type === "mdxJsxAttribute" && x.name === name)
  if (!a) return undefined
  if (a.value == null) return true
  return typeof a.value === "string" ? a.value : { expression: a.value.value }
}

function onlyAttrs(el: MdxJsxFlowElement | MdxJsxTextElement, allowed: string[]) {
  return el.attributes.every((a) => a.type === "mdxJsxAttribute" && allowed.includes(a.name))
}

/** `{ color: "#e11d48" }` -> "#e11d48" (only a single string-valued style key). */
function styleValue(el: MdxJsxTextElement, key: string) {
  const style = attr(el, "style")
  if (!style || typeof style !== "object") return undefined
  const m = style.expression.match(new RegExp(`^\\s*\\{\\s*${key}\\s*:\\s*"([^"]*)"\\s*\\}\\s*$`))
  return m?.[1]
}

function withMark(marks: Mark[], mark: Mark) {
  // a mark nested in itself (**a **b** c**) is one mark in the editor
  return [...marks.filter((m) => m.type !== mark.type), mark]
}

function inlineToJSON(nodes: PhrasingContent[], source: string, marks: Mark[] = []): Node[] {
  const out: Node[] = []
  const text = (value: string, m: Mark[]) => {
    if (!value) return
    out.push(m.length ? { type: "text", text: value, marks: m } : { type: "text", text: value })
  }
  for (const n of nodes) {
    switch (n.type) {
      case "text":
        text(n.value, marks)
        break
      case "emphasis":
        out.push(...inlineToJSON(n.children, source, withMark(marks, { type: "italic" })))
        break
      case "strong":
        out.push(...inlineToJSON(n.children, source, withMark(marks, { type: "bold" })))
        break
      case "delete":
        out.push(...inlineToJSON(n.children, source, withMark(marks, { type: "strike" })))
        break
      case "inlineCode":
        text(n.value, withMark(marks, { type: "code" }))
        break
      case "break":
        out.push({ type: "hardBreak" })
        break
      case "link":
        out.push(
          ...inlineToJSON(n.children, source, withMark(marks, { type: "link", attrs: { href: n.url, title: n.title ?? null } }))
        )
        break
      case "mdxJsxTextElement": {
        if (n.name === "u" && n.attributes.length === 0) {
          out.push(...inlineToJSON(n.children, source, withMark(marks, { type: "underline" })))
          break
        }
        if (n.name === "mark" && (n.attributes.length === 0 || (onlyAttrs(n, ["style"]) && styleValue(n, "backgroundColor")))) {
          const color = styleValue(n, "backgroundColor") ?? null
          out.push(...inlineToJSON(n.children, source, withMark(marks, { type: "highlight", attrs: { color } })))
          break
        }
        if (n.name === "span" && onlyAttrs(n, ["style"]) && styleValue(n, "color")) {
          const color = styleValue(n, "color")
          out.push(...inlineToJSON(n.children, source, withMark(marks, { type: "textStyle", attrs: { color } })))
          break
        }
        out.push({ type: "mdxInline", attrs: { source: slice(source, n) } })
        break
      }
      default:
        // inline images next to text, expressions, footnote references, html: verbatim
        out.push({ type: "mdxInline", attrs: { source: slice(source, n) } })
    }
  }
  return out
}

function paragraphJSON(children: PhrasingContent[], source: string): Node {
  const content = inlineToJSON(children, source)
  return content.length ? { type: "paragraph", content } : { type: "paragraph" }
}

function isImageParagraph(p: Paragraph): p is Paragraph & { children: [MdastImage] } {
  return p.children.length === 1 && p.children[0].type === "image"
}

function listItemJSON(item: ListItem, source: string, task: boolean): Node {
  const content = blocksToJSON(item.children as RootContent[], source)
  if (content[0]?.type !== "paragraph") content.unshift({ type: "paragraph" })
  return task ? { type: "taskItem", attrs: { checked: !!item.checked }, content } : { type: "listItem", content }
}

function tableJSON(t: MdastTable, source: string): Node {
  return {
    type: "table",
    attrs: { align: t.align && t.align.some(Boolean) ? t.align : null },
    content: t.children.map((row: MdastTableRow, r: number) => ({
      type: "tableRow",
      content: row.children.map((cell: MdastTableCell) => ({
        type: r === 0 ? "tableHeader" : "tableCell",
        content: [paragraphJSON(cell.children, source)],
      })),
    })),
  }
}

function jsxFlowJSON(el: MdxJsxFlowElement, source: string): Node {
  if (el.name === "Callout" && onlyAttrs(el, ["type", "icon"])) {
    const type = attr(el, "type")
    const icon = attr(el, "icon")
    if ((type === undefined || typeof type === "string") && (icon === undefined || typeof icon === "string")) {
      const content = blocksToJSON(el.children as RootContent[], source)
      return {
        type: "callout",
        attrs: { type: type ?? "info", icon: icon ?? null },
        content: content.length ? content : [{ type: "paragraph" }],
      }
    }
  }
  if (el.name === "details" && onlyAttrs(el, ["open"])) {
    const [first, ...rest] = el.children
    const summary =
      first?.type === "paragraph" &&
      first.children.length === 1 &&
      first.children[0].type === "mdxJsxTextElement" &&
      first.children[0].name === "summary" &&
      first.children[0].attributes.length === 0
        ? first.children[0]
        : first?.type === "mdxJsxFlowElement" && first.name === "summary" && first.attributes.length === 0
          ? first
          : null
    if (summary) {
      const summaryInline =
        summary.type === "mdxJsxTextElement"
          ? inlineToJSON(summary.children, source)
          : summary.children.length === 1 && summary.children[0].type === "paragraph"
            ? inlineToJSON(summary.children[0].children, source)
            : null
      if (summaryInline) {
        const body = blocksToJSON(rest as RootContent[], source)
        return {
          type: "details",
          attrs: { open: attr(el, "open") === true },
          content: [
            summaryInline.length ? { type: "detailsSummary", content: summaryInline } : { type: "detailsSummary" },
            { type: "detailsContent", content: body.length ? body : [{ type: "paragraph" }] },
          ],
        }
      }
    }
  }
  return { type: "mdxBlock", attrs: { source: slice(source, el) } }
}

function blocksToJSON(nodes: RootContent[], source: string): Node[] {
  const out: Node[] = []
  for (const n of nodes) {
    switch (n.type) {
      case "paragraph":
        if (isImageParagraph(n)) {
          const img = n.children[0]
          out.push({ type: "image", attrs: { src: img.url, alt: img.alt ?? null, title: img.title ?? null } })
        } else out.push(paragraphJSON(n.children, source))
        break
      case "heading":
        out.push({ type: "heading", attrs: { level: n.depth }, content: inlineToJSON(n.children, source) })
        break
      case "blockquote": {
        const content = blocksToJSON(n.children, source)
        out.push({ type: "blockquote", content: content.length ? content : [{ type: "paragraph" }] })
        break
      }
      case "list": {
        const task = n.children.some((i) => i.checked != null)
        const type = task ? "taskList" : n.ordered ? "orderedList" : "bulletList"
        const attrs: Record<string, unknown> = { spread: !!n.spread }
        if (type === "orderedList") attrs.start = n.start ?? 1
        out.push({ type, attrs, content: n.children.map((i) => listItemJSON(i, source, task)) })
        break
      }
      case "code":
        out.push({
          type: "codeBlock",
          attrs: { language: n.lang ?? null },
          ...(n.value ? { content: [{ type: "text", text: n.value }] } : {}),
        })
        break
      case "thematicBreak":
        out.push({ type: "horizontalRule" })
        break
      case "table":
        out.push(tableJSON(n, source))
        break
      case "mdxJsxFlowElement":
        out.push(jsxFlowJSON(n, source))
        break
      default:
        // mdxjsEsm, mdxFlowExpression, html, definition, footnoteDefinition, yaml…
        out.push({ type: "mdxBlock", attrs: { source: slice(source, n) } })
    }
  }
  return out
}

/** Parse MDX into editor JSON (`editor.commands.setContent(fromMDX(source))`). */
export function fromMDX(source: string): JSONContent {
  const tree = parseMdast(source)
  const content = blocksToJSON(tree.children, source)
  return { type: "doc", content: content.length ? content : [{ type: "paragraph" }] }
}

/* ───────────────────────── editor JSON -> MDX ───────────────────────── */

// Outermost first. A run of text nodes shares the longest common prefix of these.
const MARK_ORDER = ["link", "textStyle", "highlight", "bold", "italic", "strike", "underline", "code"]

function markKey(m: Mark) {
  return m.type + JSON.stringify(m.attrs ?? {})
}

function sortedMarks(marks: Mark[] | undefined) {
  return [...(marks ?? [])]
    .filter((m) => MARK_ORDER.includes(m.type) && !(m.type === "textStyle" && !m.attrs?.color))
    .sort((a, b) => MARK_ORDER.indexOf(a.type) - MARK_ORDER.indexOf(b.type))
}

function jsxText(name: string, children: PhrasingContent[], style?: string): MdxJsxTextElement {
  return {
    type: "mdxJsxTextElement",
    name,
    attributes: style ? [{ type: "mdxJsxAttribute", name: "style", value: { type: "mdxJsxAttributeValueExpression", value: style } }] : [],
    children,
  }
}

function wrap(mark: Mark, children: PhrasingContent[]): PhrasingContent {
  switch (mark.type) {
    case "bold":
      return { type: "strong", children }
    case "italic":
      return { type: "emphasis", children }
    case "strike":
      return { type: "delete", children }
    case "underline":
      return jsxText("u", children)
    case "highlight":
      return jsxText("mark", children, mark.attrs?.color ? `{ backgroundColor: ${JSON.stringify(mark.attrs.color)} }` : undefined)
    case "textStyle":
      return jsxText("span", children, `{ color: ${JSON.stringify(mark.attrs?.color)} }`)
    case "link":
      return { type: "link", url: String(mark.attrs?.href ?? ""), title: (mark.attrs?.title as string | null) ?? null, children }
    default:
      return children[0]
  }
}

function inlineToMdast(content: Node[] | undefined): PhrasingContent[] {
  type Frame = { mark: Mark | null; children: PhrasingContent[] }
  const root: Frame = { mark: null, children: [] }
  const stack: Frame[] = [root]
  const close = () => {
    const frame = stack.pop()!
    stack[stack.length - 1].children.push(wrap(frame.mark!, frame.children))
  }
  for (const n of content ?? []) {
    const marks = n.type === "text" ? sortedMarks(n.marks as Mark[]) : []
    const code = marks.find((m) => m.type === "code")
    const outer = marks.filter((m) => m.type !== "code")
    // keep the shared prefix open, close the rest
    let keep = 0
    while (keep < outer.length && keep + 1 < stack.length && markKey(stack[keep + 1].mark!) === markKey(outer[keep])) keep++
    while (stack.length > keep + 1) close()
    for (let i = keep; i < outer.length; i++) stack.push({ mark: outer[i], children: [] })
    const target = stack[stack.length - 1].children
    if (n.type === "text") {
      target.push(code ? { type: "inlineCode", value: n.text ?? "" } : { type: "text", value: n.text ?? "" })
    } else if (n.type === "hardBreak") {
      target.push({ type: "break" })
    } else if (n.type === "mdxInline") {
      target.push({ type: "html", value: String(n.attrs?.source ?? "") })
    } else if (n.type === "mention" || n.type === "variable") {
      target.push({ type: "text", value: `{{${n.attrs?.id ?? n.attrs?.label ?? ""}}}` })
    } else if (n.type === "image") {
      target.push({ type: "image", url: String(n.attrs?.src ?? ""), alt: (n.attrs?.alt as string) ?? null, title: (n.attrs?.title as string) ?? null })
    }
  }
  while (stack.length > 1) close()
  return root.children
}

function blockToMdast(n: Node): RootContent[] {
  const kids = (c: Node[] | undefined) => (c ?? []).flatMap(blockToMdast) as BlockContent[]
  switch (n.type) {
    case "paragraph": {
      const children = inlineToMdast(n.content)
      return children.length ? [{ type: "paragraph", children } as Paragraph] : []
    }
    case "heading":
      return [{ type: "heading", depth: Math.min(6, Math.max(1, Number(n.attrs?.level ?? 1))) as Heading["depth"], children: inlineToMdast(n.content) }]
    case "blockquote":
      return [{ type: "blockquote", children: kids(n.content) } as Blockquote]
    case "bulletList":
    case "orderedList":
    case "taskList": {
      const ordered = n.type === "orderedList"
      const spread = !!n.attrs?.spread
      const list: List = {
        type: "list",
        ordered,
        start: ordered ? Number(n.attrs?.start ?? 1) : null,
        spread,
        children: (n.content ?? []).map((item) => ({
          type: "listItem",
          spread,
          checked: n.type === "taskList" ? !!item.attrs?.checked : null,
          children: kids(item.content),
        })),
      }
      return [list]
    }
    case "codeBlock":
      return [
        {
          type: "code",
          lang: (n.attrs?.language as string) || null,
          meta: null,
          value: (n.content ?? []).map((t) => t.text ?? "").join(""),
        } as Code,
      ]
    case "horizontalRule":
      return [{ type: "thematicBreak" }]
    case "image":
      return [
        {
          type: "paragraph",
          children: [{ type: "image", url: String(n.attrs?.src ?? ""), alt: (n.attrs?.alt as string) ?? null, title: (n.attrs?.title as string) ?? null }],
        },
      ]
    case "table": {
      const rows = n.content ?? []
      const width = Math.max(0, ...rows.map((r) => r.content?.length ?? 0))
      const align = Array.isArray(n.attrs?.align) ? (n.attrs.align as MdastTable["align"]) : null
      return [
        {
          type: "table",
          align: align ?? Array.from({ length: width }, () => null),
          children: rows.map((r) => ({
            type: "tableRow",
            children: (r.content ?? []).map((cell) => ({
              type: "tableCell",
              // a cell is one line in GFM: join its paragraphs with breaks
              children: (cell.content ?? []).flatMap((p, i) => [
                ...(i > 0 ? [{ type: "break" } as PhrasingContent] : []),
                ...inlineToMdast(p.content),
              ]),
            })),
          })),
        },
      ]
    }
    case "callout": {
      const attributes: MdxJsxAttribute[] = [{ type: "mdxJsxAttribute", name: "type", value: String(n.attrs?.type ?? "info") }]
      if (n.attrs?.icon) attributes.push({ type: "mdxJsxAttribute", name: "icon", value: String(n.attrs.icon) })
      return [{ type: "mdxJsxFlowElement", name: "Callout", attributes, children: kids(n.content) } as MdxJsxFlowElement]
    }
    case "details": {
      const [summary, body] = n.content ?? []
      const attributes: MdxJsxAttribute[] = n.attrs?.open ? [{ type: "mdxJsxAttribute", name: "open", value: null }] : []
      return [
        {
          type: "mdxJsxFlowElement",
          name: "details",
          attributes,
          children: [
            { type: "paragraph", children: [jsxText("summary", inlineToMdast(summary?.content))] },
            ...kids(body?.content),
          ],
        } as MdxJsxFlowElement,
      ]
    }
    case "mdxBlock":
      return [{ type: "html", value: String(n.attrs?.source ?? "") }]
    default:
      // unknown container (e.g. an email block): keep its children
      return n.content ? kids(n.content) : []
  }
}

/** Editor JSON (or an editor) -> MDX string. */
export function toMDX(input: Editor | JSONContent): string {
  const json = "getJSON" in input && typeof input.getJSON === "function" ? input.getJSON() : (input as JSONContent)
  const tree: Root = { type: "root", children: (json.content ?? []).flatMap(blockToMdast) }
  if (tree.children.length === 0) return ""
  return stringifyMdast(tree)
}
