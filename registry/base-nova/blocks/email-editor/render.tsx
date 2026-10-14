import * as React from "react"
import type { JSONContent } from "@tiptap/core"
import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components"
import { render } from "@react-email/render"

/**
 * Email JSON -> email-safe HTML with React Email (tables, inline styles, no CSS
 * classes). Colours here are hex on purpose: email clients do not know the
 * site's theme tokens.
 */

export type EmailTheme = {
  brand: string
  text: string
  muted: string
  border: string
  /** Page behind the email card. */
  canvas: string
  /** The email card. */
  background: string
  font: string
  /** Content width in px (600 is the email standard). */
  width: number
}

export const defaultEmailTheme: EmailTheme = {
  brand: "#2563eb",
  text: "#0a0a0a",
  muted: "#737373",
  border: "#e5e5e5",
  canvas: "#f5f5f5",
  background: "#ffffff",
  font: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  width: 600,
}

/** The whole email: what the editor exports as JSON. */
export type EmailDocument = {
  subject: string
  preheader: string
  content: JSONContent
}

export type RenderEmailOptions = {
  theme?: Partial<EmailTheme>
  /**
   * Values for `{{variables}}`, Show if and Repeat. Omit to export a template:
   * variables stay `{{name}}` and logic becomes `{{#if}}` / `{{#each}}` blocks
   * (Handlebars / Mustache syntax, which most email providers read).
   */
  variables?: Record<string, unknown>
}

type Ctx = { theme: EmailTheme; vars?: Record<string, unknown>; inner: number }

const PAD = 32

function mix(hex: string, amount: number) {
  // hex blended toward white (for brand-tinted sections)
  const n = parseInt(hex.replace("#", "").padEnd(6, "0").slice(0, 6), 16)
  const ch = (shift: number) => Math.round(((n >> shift) & 255) * amount + 255 * (1 - amount))
  return `#${[16, 8, 0].map((s) => ch(s).toString(16).padStart(2, "0")).join("")}`
}

function varValue(ctx: Ctx, name: string, fallback?: string | null) {
  if (!ctx.vars) return `{{${name}}}`
  const path = name.split(".")
  let v: unknown = ctx.vars
  for (const p of path) v = v != null && typeof v === "object" ? (v as Record<string, unknown>)[p] : undefined
  return v == null || v === "" ? (fallback ?? "") : String(v)
}

/** Fills `{{name}}` inside attribute strings (hrefs, image URLs, button labels). */
function fill(ctx: Ctx, value: string) {
  return ctx.vars ? value.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (_, k: string) => varValue(ctx, k)) : value
}

function inline(nodes: JSONContent[] | undefined, ctx: Ctx): React.ReactNode[] {
  return (nodes ?? []).map((n, i) => {
    if (n.type === "hardBreak") return <br key={i} />
    if (n.type === "variable") return <React.Fragment key={i}>{varValue(ctx, String(n.attrs?.id ?? ""), n.attrs?.fallback as string)}</React.Fragment>
    if (n.type !== "text") return null
    let el: React.ReactNode = n.text ?? ""
    for (const m of n.marks ?? []) {
      switch (m.type) {
        case "bold":
          el = <strong>{el}</strong>
          break
        case "italic":
          el = <em>{el}</em>
          break
        case "underline":
          el = <u>{el}</u>
          break
        case "strike":
          el = <s>{el}</s>
          break
        case "code":
          el = (
            <code style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: "0.9em", backgroundColor: "#f5f5f5", borderRadius: 4, padding: "1px 4px" }}>
              {el}
            </code>
          )
          break
        case "textStyle":
          if (m.attrs?.color) el = <span style={{ color: String(m.attrs.color) }}>{el}</span>
          break
        case "highlight":
          el = <mark style={{ backgroundColor: String(m.attrs?.color ?? "#fef08a"), color: "inherit", borderRadius: 2, padding: "0 2px" }}>{el}</mark>
          break
        case "link":
          el = (
            <Link href={String(m.attrs?.href ?? "#")} style={{ color: ctx.theme.brand, textDecoration: "underline" }}>
              {el}
            </Link>
          )
          break
      }
    }
    return <React.Fragment key={i}>{el}</React.Fragment>
  })
}

const headingSize: Record<number, [number, number]> = { 1: [28, 36], 2: [22, 30], 3: [18, 26] }

function textAlign(n: JSONContent) {
  return (n.attrs?.textAlign as "left" | "center" | "right" | undefined) ?? undefined
}

function blocks(nodes: JSONContent[] | undefined, ctx: Ctx): React.ReactNode[] {
  return (nodes ?? []).map((n, i) => block(n, ctx, i))
}

function block(n: JSONContent, ctx: Ctx, key: React.Key): React.ReactNode {
  const { theme } = ctx
  switch (n.type) {
    case "paragraph":
      return (
        <Text key={key} style={{ margin: "0 0 16px", fontSize: 15, lineHeight: "24px", color: theme.text, textAlign: textAlign(n) }}>
          {n.content?.length ? inline(n.content, ctx) : "\u00a0"}
        </Text>
      )
    case "heading": {
      const level = Math.min(3, Number(n.attrs?.level ?? 1))
      const [size, lh] = headingSize[level]
      return (
        <Heading
          key={key}
          as={`h${level}` as "h1" | "h2" | "h3"}
          style={{ margin: "24px 0 12px", fontSize: size, lineHeight: `${lh}px`, fontWeight: 600, color: theme.text, textAlign: textAlign(n) }}
        >
          {inline(n.content, ctx)}
        </Heading>
      )
    }
    case "bulletList":
    case "orderedList": {
      const Tag = n.type === "bulletList" ? "ul" : "ol"
      return (
        <Tag key={key} style={{ margin: "0 0 16px", paddingLeft: 24, color: theme.text, fontSize: 15, lineHeight: "24px" }}>
          {(n.content ?? []).map((li, j) => (
            <li key={j} style={{ margin: "0 0 4px" }}>
              {(li.content ?? []).map((c, k) =>
                c.type === "paragraph" ? <React.Fragment key={k}>{inline(c.content, ctx)}</React.Fragment> : block(c, ctx, k)
              )}
            </li>
          ))}
        </Tag>
      )
    }
    case "blockquote":
      return (
        <div key={key} style={{ margin: "0 0 16px", paddingLeft: 16, borderLeft: `3px solid ${theme.border}`, color: theme.muted }}>
          {blocks(n.content, ctx)}
        </div>
      )
    case "horizontalRule":
      return <Hr key={key} style={{ margin: "24px 0", borderColor: theme.border, borderTopWidth: 1 }} />
    case "emailButton": {
      const { text, href, variant, align, color, radius } = (n.attrs ?? {}) as Record<string, string>
      const c = color || theme.brand
      const r = radius === "pill" ? 999 : radius === "square" ? 2 : 8
      const style: React.CSSProperties =
        variant === "link"
          ? { color: c, textDecoration: "underline", fontSize: 15, fontWeight: 500 }
          : {
              display: "inline-block",
              padding: "12px 22px",
              borderRadius: r,
              fontSize: 15,
              fontWeight: 600,
              textDecoration: "none",
              backgroundColor: variant === "outline" ? "transparent" : c,
              color: variant === "outline" ? c : "#ffffff",
              border: variant === "outline" ? `2px solid ${c}` : undefined,
            }
      return (
        <Section key={key} style={{ margin: "8px 0 24px", textAlign: (align as "left") || "left" }}>
          <Button href={fill(ctx, href || "#")} style={style}>
            {fill(ctx, text || "Button")}
          </Button>
        </Section>
      )
    }
    case "emailImage": {
      const { src, alt, width, align, href } = (n.attrs ?? {}) as Record<string, string | number>
      if (!src) return null
      const px = Math.round((ctx.inner * Number(width || 100)) / 100)
      const img = (
        <Img
          src={fill(ctx, String(src))}
          alt={fill(ctx, String(alt ?? ""))}
          width={px}
          style={{ display: "block", width: px, maxWidth: "100%", height: "auto", borderRadius: 8, margin: align === "center" ? "0 auto" : align === "right" ? "0 0 0 auto" : undefined }}
        />
      )
      return (
        <Section key={key} style={{ margin: "0 0 16px" }}>
          {href ? <Link href={fill(ctx, String(href))}>{img}</Link> : img}
        </Section>
      )
    }
    case "emailLogo": {
      const { src, size, align } = (n.attrs ?? {}) as Record<string, string | number>
      if (!src) return null
      return (
        <Section key={key} style={{ margin: "0 0 24px", textAlign: (align as "left") || "left" }}>
          <Img src={String(src)} alt="Logo" height={Number(size) || 40} style={{ display: "inline-block", height: Number(size) || 40, width: "auto" }} />
        </Section>
      )
    }
    case "spacer": {
      const h = Number(n.attrs?.height ?? 32)
      return (
        <Section key={key}>
          <Row>
            <Column style={{ height: h, lineHeight: `${h}px`, fontSize: 1 }}>{"\u00a0"}</Column>
          </Row>
        </Section>
      )
    }
    case "columns": {
      const cols = n.content ?? []
      const gap = Number(n.attrs?.gap ?? 16)
      const w = (ctx.inner - gap * (cols.length - 1)) / Math.max(1, cols.length)
      return (
        <Section key={key} style={{ margin: "0 0 8px" }}>
          <Row>
            {cols.map((c, j) => (
              <Column
                key={j}
                width={Math.floor(w)}
                style={{ width: Math.floor(w), verticalAlign: (c.attrs?.verticalAlign as "top") ?? "top", paddingLeft: j === 0 ? 0 : gap / 2, paddingRight: j === cols.length - 1 ? 0 : gap / 2 }}
              >
                {blocks(c.content, { ...ctx, inner: Math.floor(w) })}
              </Column>
            ))}
          </Row>
        </Section>
      )
    }
    case "section": {
      const bg = n.attrs?.background as string
      const pad = Number(n.attrs?.padding ?? 24)
      return (
        <Section
          key={key}
          style={{
            margin: "0 0 16px",
            padding: bg === "none" ? `${pad}px` : pad,
            borderRadius: 12,
            backgroundColor: bg === "muted" ? theme.canvas : bg === "brand" ? mix(theme.brand, 0.08) : undefined,
            border: bg === "none" ? `1px solid ${theme.border}` : undefined,
            textAlign: (n.attrs?.align as "left") ?? "left",
          }}
        >
          {blocks(n.content, { ...ctx, inner: ctx.inner - pad * 2 })}
        </Section>
      )
    }
    case "footer":
      return (
        <Text key={key} style={{ margin: "24px 0 0", fontSize: 12, lineHeight: "18px", color: theme.muted, textAlign: (n.attrs?.align as "center") ?? "center" }}>
          {inline(n.content, ctx)}
        </Text>
      )
    case "showIf": {
      const when = String(n.attrs?.when ?? "")
      if (!ctx.vars) {
        return (
          <React.Fragment key={key}>
            {`{{#if ${when}}}`}
            {blocks(n.content, ctx)}
            {"{{/if}}"}
          </React.Fragment>
        )
      }
      const v = ctx.vars[when]
      const truthy = Array.isArray(v) ? v.length > 0 : !!v
      return truthy ? <React.Fragment key={key}>{blocks(n.content, ctx)}</React.Fragment> : null
    }
    case "repeat": {
      const each = String(n.attrs?.each ?? "")
      if (!ctx.vars) {
        return (
          <React.Fragment key={key}>
            {`{{#each ${each}}}`}
            {blocks(n.content, ctx)}
            {"{{/each}}"}
          </React.Fragment>
        )
      }
      const list = ctx.vars[each]
      if (!Array.isArray(list)) return null
      return (
        <React.Fragment key={key}>
          {list.map((item, j) => (
            <React.Fragment key={j}>
              {blocks(n.content, { ...ctx, vars: { ...ctx.vars, ...(typeof item === "object" ? item : {}), this: item } })}
            </React.Fragment>
          ))}
        </React.Fragment>
      )
    }
    default:
      return n.content ? <React.Fragment key={key}>{blocks(n.content, ctx)}</React.Fragment> : null
  }
}

/** The email as a React Email tree (render it yourself, or use `renderEmailHtml`). */
export function EmailTemplate({ email, theme: themeOverride, variables }: { email: EmailDocument } & RenderEmailOptions) {
  const theme = { ...defaultEmailTheme, ...themeOverride }
  const ctx: Ctx = { theme, vars: variables, inner: theme.width - PAD * 2 }
  const preheader = fill(ctx, email.preheader)
  const subject = fill(ctx, email.subject)
  return (
    <Html lang="en">
      <Head>
        <title>{subject}</title>
        <meta name="color-scheme" content="light" />
        <style>{`@media (max-width: ${theme.width}px) { .email-card { padding: 20px !important; border-radius: 0 !important; } }`}</style>
      </Head>
      {preheader && <Preview>{preheader}</Preview>}
      <Body style={{ margin: 0, padding: "32px 12px", backgroundColor: theme.canvas, fontFamily: theme.font }}>
        {/* eslint-disable-next-line shadcn/no-unknown-classes -- email HTML class, targeted by the <style> media query above */}
        <Container className="email-card" style={{ maxWidth: theme.width, width: "100%", margin: "0 auto", padding: PAD, backgroundColor: theme.background, borderRadius: 12 }}>
          {blocks(email.content.content, ctx)}
        </Container>
      </Body>
    </Html>
  )
}

/** Email JSON -> HTML string (async: React Email renders through react-dom/server). */
export async function renderEmailHtml(email: EmailDocument, options: RenderEmailOptions = {}) {
  const html = await render(<EmailTemplate email={email} {...options} />)
  // React's text separators are noise in an email
  return html.replace(/<!-- -->/g, "")
}

/** A plain-text version for the multipart `text/plain` body. */
export function renderEmailText(email: EmailDocument, options: RenderEmailOptions = {}) {
  return render(<EmailTemplate email={email} {...options} />, { plainText: true })
}
