import type { JSONContent } from "@tiptap/core"

import type { EmailVariable } from "@/registry/base-nova/blocks/email-editor/nodes"
import type { EmailDocument } from "@/registry/base-nova/blocks/email-editor/render"

/** A starter set of variables for product emails. */
export const defaultEmailVariables: EmailVariable[] = [
  { name: "first_name", label: "First name", fallback: "there", sample: "Ada" },
  { name: "company", label: "Company", sample: "Acme Inc." },
  { name: "plan", label: "Plan", sample: "Pro" },
  { name: "trial_days", label: "Trial days left", sample: "14" },
  { name: "invite_url", label: "Invite link", sample: "https://example.com/invite" },
  { name: "is_team", label: "Has a team (true/false)", sample: "true" },
  { name: "steps", label: "Onboarding steps", list: true },
]

/** Sample values for the preview. */
export const sampleEmailValues: Record<string, unknown> = {
  first_name: "Ada",
  company: "Acme Inc.",
  plan: "Pro",
  trial_days: "14",
  invite_url: "https://example.com/invite",
  is_team: true,
  steps: [
    { title: "Connect your workspace", detail: "Import projects from GitHub or start fresh." },
    { title: "Invite your team", detail: "Everyone gets their own seat on the Pro trial." },
    { title: "Ship your first page", detail: "Templates get you from blank to live in minutes." },
  ],
}

const svg = (body: string, w: number, h: number) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${body}</svg>`)}`

/** Flat sample artwork as data URLs, so the template works offline. Replace with hosted images before sending. */
export const sampleLogo = svg('<rect width="40" height="40" rx="10" fill="#2563eb"/><circle cx="20" cy="20" r="8" fill="#fff"/>', 40, 40)
export const sampleHero = svg(
  '<rect width="1200" height="520" rx="24" fill="#eff6ff"/><rect x="120" y="120" width="420" height="280" rx="20" fill="#fff"/><rect x="160" y="170" width="220" height="22" rx="11" fill="#bfdbfe"/><rect x="160" y="214" width="320" height="16" rx="8" fill="#dbeafe"/><rect x="160" y="246" width="280" height="16" rx="8" fill="#dbeafe"/><rect x="160" y="320" width="140" height="44" rx="12" fill="#2563eb"/><circle cx="820" cy="260" r="150" fill="#bfdbfe"/><circle cx="820" cy="260" r="86" fill="#2563eb"/>',
  1200,
  520
)

const t = (text: string, marks?: JSONContent["marks"]): JSONContent => (marks ? { type: "text", text, marks } : { type: "text", text })
const v = (id: string, fallback?: string): JSONContent => ({ type: "variable", attrs: { id, fallback: fallback ?? null } })

export const welcomeEmail: EmailDocument = {
  subject: "Welcome to Acme, {{first_name}} 👋",
  preheader: "Your {{plan}} trial is live. Here is how to get set up in five minutes.",
  content: {
    type: "doc",
    content: [
      { type: "emailLogo", attrs: { src: sampleLogo, size: 40, align: "left" } },
      { type: "heading", attrs: { level: 1, textAlign: "left" }, content: [t("Welcome aboard, "), v("first_name", "there"), t("!")] },
      {
        type: "paragraph",
        attrs: { textAlign: "left" },
        content: [
          t("Thanks for starting a "),
          v("plan"),
          t(" trial at "),
          v("company"),
          t(". You have "),
          v("trial_days"),
          t(" days to explore everything, "),
          t("no card needed", [{ type: "bold" }]),
          t("."),
        ],
      },
      { type: "emailImage", attrs: { src: sampleHero, alt: "Dashboard preview", width: 100, align: "center", href: "" } },
      { type: "heading", attrs: { level: 2, textAlign: "left" }, content: [t("Get set up in three steps")] },
      {
        type: "repeat",
        attrs: { each: "steps" },
        content: [
          {
            type: "paragraph",
            attrs: { textAlign: "left" },
            content: [v("title"), t(" — "), v("detail")],
          },
        ],
      },
      { type: "emailButton", attrs: { text: "Open your dashboard", href: "https://example.com/dashboard", variant: "filled", align: "left", color: "#2563eb", radius: "rounded" } },
      {
        type: "showIf",
        attrs: { when: "is_team" },
        content: [
          {
            type: "section",
            attrs: { background: "brand", align: "left", padding: 24 },
            content: [
              { type: "heading", attrs: { level: 3, textAlign: "left" }, content: [t("Bring your team")] },
              { type: "paragraph", attrs: { textAlign: "left" }, content: [t("Invite teammates now and they join your trial at no cost.")] },
              { type: "emailButton", attrs: { text: "Invite teammates", href: "{{invite_url}}", variant: "outline", align: "left", color: "#2563eb", radius: "rounded" } },
            ],
          },
        ],
      },
      {
        type: "columns",
        attrs: { gap: 16 },
        content: [
          {
            type: "column",
            attrs: { verticalAlign: "top" },
            content: [
              { type: "heading", attrs: { level: 3, textAlign: "left" }, content: [t("Docs")] },
              { type: "paragraph", attrs: { textAlign: "left" }, content: [t("Guides for every feature. "), t("Read the docs", [{ type: "link", attrs: { href: "https://example.com/docs" } }])] },
            ],
          },
          {
            type: "column",
            attrs: { verticalAlign: "top" },
            content: [
              { type: "heading", attrs: { level: 3, textAlign: "left" }, content: [t("Support")] },
              { type: "paragraph", attrs: { textAlign: "left" }, content: [t("Reply to this email and a human answers within a day.")] },
            ],
          },
        ],
      },
      { type: "spacer", attrs: { height: 16 } },
      { type: "horizontalRule" },
      {
        type: "footer",
        attrs: { align: "center" },
        content: [t("Acme Inc. · 1 Market St, San Francisco · "), t("Unsubscribe", [{ type: "link", attrs: { href: "https://example.com/unsubscribe" } }])],
      },
    ],
  },
}
