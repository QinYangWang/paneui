/*
 * Every piece of copy and mock data the SaaS template shows, in one file.
 * Swap these for your product's copy and real API calls; the pages only read
 * the exported names and types below.
 *
 * Numbers come from a seeded generator so server and client render the same.
 */

/* ───────────────────────── Brand ───────────────────────── */

export const brand = {
  name: "Tessel",
  tagline: "The coding agent that ships reviewed pull requests.",
  description:
    "Tessel plans the change, runs it in a sandbox, tests it and asks before anything leaves. You review a finished PR, not a wall of autocomplete.",
  supportEmail: "help@tessel.dev",
  company: "Tessel Labs, Inc.",
}

/* ───────────────────────── Marketing ───────────────────────── */

export const marketingNav = [
  { label: "Features", href: "/#features" },
  { label: "Pricing", href: "/pricing" },
  { label: "Customers", href: "/#customers" },
  { label: "Changelog", href: "/changelog" },
]

export const logos = ["Northwind", "Helio Health", "Paperplane", "Orbital", "Kiln Robotics", "Fathom", "Marlow", "Bramble & Co", "Quill"]

export const stats = [
  { label: "Pull requests merged", value: 1_284_000, suffix: "" },
  { label: "Teams shipping with Tessel", value: 2400, suffix: "" },
  { label: "Median review time", value: 9, suffix: " min" },
]

export type FeatureId = "plan" | "sandbox" | "review" | "approve" | "ci" | "team"
export const features: { id: FeatureId; title: string; body: string }[] = [
  { id: "plan", title: "Plans before it types", body: "Every task starts as a checklist you can edit. Tessel works through it step by step and shows its progress live." },
  { id: "sandbox", title: "Runs in a sealed sandbox", body: "Each session gets a fresh container with your repo, secrets scoped per project and no network unless you allow it." },
  { id: "review", title: "Reviews its own diffs", body: "A second pass reads the change like a senior reviewer: types, edge cases, tests that should exist and don't." },
  { id: "approve", title: "Asks before it acts", body: "Pushing, deleting or calling paid APIs waits for your approval. Allow once, always, or deny with a note." },
  { id: "ci", title: "Fixes what CI flags", body: "Hook it to your pipeline and Tessel picks up failing checks, reproduces them and pushes a fix to the same branch." },
  { id: "team", title: "Shared with your team", body: "Sessions, plans and approvals live in one workspace with SSO, audit logs and per-repo permissions." },
]

export type PlanId = "solo" | "team" | "enterprise"
export type Plan = {
  id: PlanId
  name: string
  /** Price per seat per month, billed monthly / billed yearly. */
  monthly: number
  yearly: number
  blurb: string
  cta: string
  featured?: boolean
  perks: string[]
}

export const plans: Plan[] = [
  {
    id: "solo",
    name: "Solo",
    monthly: 0,
    yearly: 0,
    blurb: "For side projects and trying Tessel on a real repo.",
    cta: "Start free",
    perks: ["1 seat", "50 agent runs a month", "Public and private repos", "Community support"],
  },
  {
    id: "team",
    name: "Team",
    monthly: 29,
    yearly: 24,
    blurb: "For product teams shipping every day.",
    cta: "Start a 14-day trial",
    featured: true,
    perks: ["Per seat, up to 50 seats", "Unlimited agent runs", "CI auto-fix and PR reviews", "Approval policies per repo", "Priority support"],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    monthly: 79,
    yearly: 66,
    blurb: "For regulated teams and self-hosted runners.",
    cta: "Talk to sales",
    perks: ["SSO, SCIM and audit logs", "Self-hosted sandboxes", "Bring your own model keys", "99.9% uptime SLA"],
  },
]

/** Feature comparison on the pricing page: one value per plan (true / false / text). */
export const comparison: { group: string; rows: { label: string; values: Record<PlanId, boolean | string> }[] }[] = [
  {
    group: "Agent",
    rows: [
      { label: "Agent runs", values: { solo: "50 / month", team: "Unlimited", enterprise: "Unlimited" } },
      { label: "Parallel sessions", values: { solo: "1", team: "5 per seat", enterprise: "Custom" } },
      { label: "PR self-review", values: { solo: true, team: true, enterprise: true } },
      { label: "CI auto-fix", values: { solo: false, team: true, enterprise: true } },
    ],
  },
  {
    group: "Security",
    rows: [
      { label: "Approval policies", values: { solo: "Default", team: "Per repo", enterprise: "Per repo + org" } },
      { label: "SSO and SCIM", values: { solo: false, team: false, enterprise: true } },
      { label: "Audit log", values: { solo: false, team: "30 days", enterprise: "Unlimited" } },
      { label: "Self-hosted sandboxes", values: { solo: false, team: false, enterprise: true } },
    ],
  },
  {
    group: "Support",
    rows: [
      { label: "Support", values: { solo: "Community", team: "Priority email", enterprise: "Dedicated engineer" } },
      { label: "Uptime SLA", values: { solo: false, team: false, enterprise: "99.9%" } },
    ],
  },
]

export const testimonials = [
  {
    quote: "We point Tessel at every flaky test on Monday morning. By standup there are PRs waiting, each with a plan we can read in ten seconds.",
    name: "Dana Chen",
    role: "Staff Engineer, Northwind",
  },
  {
    quote: "The approval step is what got security to say yes. Nothing leaves the sandbox without a human clicking Allow.",
    name: "Kenji Sato",
    role: "Head of Platform, Paperplane",
  },
  {
    quote: "It reads our codebase like someone who has been here a year. Reviews catch the edge case before I do, which is humbling.",
    name: "Priya Raman",
    role: "CTO, Orbital",
  },
]

export const faqs = [
  { id: "data", q: "Does Tessel train on my code?", a: "No. Your code is used only to run your sessions, is encrypted at rest and is deleted from sandboxes when a session ends." },
  { id: "models", q: "Which models does it use?", a: "Tessel routes between frontier models per step. On Enterprise you can bring your own keys or pin a single provider." },
  { id: "ci", q: "Does it work with my CI?", a: "GitHub Actions, GitLab CI, Buildkite and CircleCI are supported out of the box. Anything else can call the webhook API." },
  { id: "seats", q: "How are seats counted?", a: "A seat is anyone who starts sessions or approves actions. Reviewers who only read PRs are free." },
  { id: "cancel", q: "Can I cancel any time?", a: "Yes. Monthly plans stop at the end of the period; yearly plans are refunded pro rata for unused months." },
]

export const footerColumns = [
  { title: "Product", links: [{ label: "Features", href: "/#features" }, { label: "Pricing", href: "/pricing" }, { label: "Changelog", href: "/changelog" }] },
  { title: "Account", links: [{ label: "Sign in", href: "/login" }, { label: "Create account", href: "/signup" }, { label: "Dashboard", href: "/dashboard" }] },
  { title: "Company", links: [{ label: "About", href: "/#customers" }, { label: "Security", href: "/#faq" }, { label: "Contact", href: "/#faq" }] },
]

export const changelog = [
  {
    version: "2.4",
    date: "Oct 9, 2026",
    title: "Reviews that cite the line",
    body: "Self-review comments now link the exact line and the test that covers it. Reviewers can accept a suggestion straight from the PR.",
    tags: ["Reviews"],
  },
  {
    version: "2.3",
    date: "Sep 22, 2026",
    title: "Approval policies per repository",
    body: "Pick which tools need a human per repo: allow reads everywhere, ask before pushes on main, block deletes outright.",
    tags: ["Security", "Teams"],
  },
  {
    version: "2.2",
    date: "Sep 3, 2026",
    title: "CI auto-fix for Buildkite",
    body: "Buildkite joins GitHub Actions, GitLab and CircleCI. Failing steps are reproduced in a sandbox and fixed on the same branch.",
    tags: ["CI"],
  },
]

/* ───────────────────────── Seeded numbers ───────────────────────── */

function seeded(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** A noisy upward walk of `n` points. */
function walk(seed: number, n: number, start: number, drift: number, noise: number) {
  const r = seeded(seed)
  const out: number[] = []
  let v = start
  for (let i = 0; i < n; i++) {
    v = Math.max(0, v + drift + (r() - 0.5) * noise)
    out.push(Math.round(v))
  }
  return out
}

/** "Today" for the mock data, fixed so screenshots and SSR stay stable. */
export const TODAY = new Date(2026, 9, 14)

const dayLabel = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" })
const monthLabel = new Intl.DateTimeFormat("en-US", { month: "short" })

/* ───────────────────────── App: account ───────────────────────── */

export const demoUser = {
  name: "Dana Chen",
  email: "dana@northwind.dev",
  role: "Owner",
  title: "Staff Engineer",
  timezone: "America/Los_Angeles",
  bio: "Platform lead. I point agents at flaky tests.",
}

export const workspaces = [
  { id: "northwind", name: "Northwind", plan: "Team · 24 seats" },
  { id: "northwind-labs", name: "Northwind Labs", plan: "Solo" },
  { id: "acme", name: "Acme Robotics", plan: "Enterprise" },
]

/* ───────────────────────── App: overview ───────────────────────── */

export type Kpi = {
  id: string
  label: string
  value: number
  format: Intl.NumberFormatOptions
  delta: number
  /** A rise is bad (churn). */
  invert?: boolean
  hint: string
  trend: number[]
}

export const kpis: Kpi[] = [
  {
    id: "mrr",
    label: "Recurring revenue",
    value: 48210,
    format: { style: "currency", currency: "USD", maximumFractionDigits: 0 },
    delta: 12.4,
    hint: "vs. last month",
    trend: walk(11, 24, 30, 1.2, 6),
  },
  {
    id: "workspaces",
    label: "Active workspaces",
    value: 1584,
    format: { maximumFractionDigits: 0 },
    delta: 6.1,
    hint: "128 new",
    trend: walk(12, 24, 40, 0.8, 5),
  },
  {
    id: "runs",
    label: "Agent runs",
    value: 92318,
    format: { notation: "compact", maximumFractionDigits: 1 },
    delta: 18.9,
    hint: "3.1k a day",
    trend: walk(13, 24, 20, 1.6, 9),
  },
  {
    id: "churn",
    label: "Churn rate",
    value: 0.021,
    format: { style: "percent", maximumFractionDigits: 1 },
    delta: -0.4,
    invert: true,
    hint: "Trailing 90 days",
    trend: walk(14, 24, 60, -0.9, 7),
  },
]

export const revenueSeries = [
  { id: "solo", label: "Solo add-ons" },
  { id: "team", label: "Team" },
  { id: "enterprise", label: "Enterprise" },
]

export const revenue = (() => {
  const r = seeded(21)
  return Array.from({ length: 12 }, (_, i) => {
    const d = new Date(TODAY.getFullYear(), TODAY.getMonth() - 11 + i, 1)
    return {
      label: monthLabel.format(d),
      values: {
        solo: Math.round(1800 + i * 120 + r() * 400),
        team: Math.round(14000 + i * 1450 + r() * 1800),
        enterprise: Math.round(9000 + i * 1100 + r() * 2600),
      },
    }
  })
})()

export type Activity = { id: string; kind: "upgrade" | "invoice" | "member" | "alert" | "deploy"; title: string; detail: string; time: string }

export const activity: Activity[] = [
  { id: "a1", kind: "upgrade", title: "Paperplane upgraded to Enterprise", detail: "42 seats · annual", time: "4m" },
  { id: "a2", kind: "member", title: "Kenji Sato joined Northwind", detail: "Invited by Dana Chen", time: "18m" },
  { id: "a3", kind: "alert", title: "Usage at 86% for Fathom", detail: "Agent runs, resets Nov 1", time: "1h" },
  { id: "a4", kind: "invoice", title: "INV-2051 paid", detail: "Orbital · $3,480", time: "3h" },
  { id: "a5", kind: "deploy", title: "Sandbox image 24.10 rolled out", detail: "All regions", time: "6h" },
]

/* ───────────────────────── App: analytics ───────────────────────── */

export const usageSeries = [
  { id: "fix", label: "Fixes" },
  { id: "review", label: "Reviews" },
  { id: "ci", label: "CI repairs" },
]

/** 180 days of agent runs by kind, newest last. Each point carries its date for range filtering. */
export const usageDaily = (() => {
  const r = seeded(31)
  return Array.from({ length: 180 }, (_, i) => {
    const date = new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate() - 179 + i)
    const weekday = date.getDay() % 6 === 0 ? 0.55 : 1
    const growth = 1 + i / 160
    return {
      date,
      label: dayLabel.format(date),
      values: {
        fix: Math.round((900 + r() * 260) * weekday * growth),
        review: Math.round((620 + r() * 200) * weekday * growth),
        ci: Math.round((240 + r() * 140) * weekday * growth),
      },
    }
  })
})()

export const signupsDaily = (() => {
  const r = seeded(32)
  return usageDaily.map((d, i) => ({
    date: d.date,
    label: d.label,
    values: { signups: Math.round((30 + r() * 18) * (d.date.getDay() % 6 === 0 ? 0.6 : 1) * (1 + i / 220)) },
  }))
})()

export const topPages = [
  { name: "/pricing", value: 18420 },
  { name: "/", value: 15210 },
  { name: "/docs/quickstart", value: 9840 },
  { name: "/changelog", value: 6120 },
  { name: "/blog/approval-policies", value: 4380 },
  { name: "/security", value: 2210 },
]

export const referrers = [
  { name: "github.com", value: 12840 },
  { name: "google.com", value: 10210 },
  { name: "news.ycombinator.com", value: 6420 },
  { name: "x.com", value: 3180 },
  { name: "linkedin.com", value: 1720 },
]

export const planMix = [
  { id: "team", label: "Team", value: 1128 },
  { id: "solo", label: "Solo", value: 392 },
  { id: "enterprise", label: "Enterprise", value: 64 },
]

export const regions = ["North America", "Europe", "Asia Pacific", "Latin America"] as const

/* ───────────────────────── App: customers ───────────────────────── */

export type CustomerStatus = "active" | "trialing" | "past_due" | "canceled"

export type Customer = {
  id: string
  name: string
  email: string
  company: string
  plan: "Solo" | "Team" | "Enterprise"
  status: CustomerStatus
  seats: number
  mrr: number
  region: (typeof regions)[number]
  joined: string
  /** ISO date, for sorting. */
  joinedAt: string
  lastActive: string
}

const firstNames = ["Ada", "Ben", "Chloe", "Diego", "Elif", "Farah", "Gus", "Hana", "Ivan", "Jules", "Kai", "Lena", "Mateo", "Nora", "Omar", "Priya", "Quinn", "Rosa", "Sam", "Tara", "Uma", "Vik", "Wren", "Yara"]
const lastNames = ["Okafor", "Lindqvist", "Moreau", "Santos", "Yilmaz", "Haddad", "Becker", "Sato", "Petrov", "Laurent", "Nakamura", "Fischer", "Ruiz", "Kowalski", "Aziz", "Raman", "Byrne", "Costa", "Weller", "Iyer", "Park", "Mehta", "Ellis", "Novak"]
const companies = ["Northwind", "Helio Health", "Paperplane", "Orbital", "Kiln Robotics", "Fathom", "Marlow", "Bramble & Co", "Quill", "Lumen", "Tidewater", "Cobalt", "Juniper", "Fernway", "Basalt", "Halcyon"]
const statuses: CustomerStatus[] = ["active", "active", "active", "active", "trialing", "past_due", "canceled"]
const shortDate = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" })

export const customers: Customer[] = (() => {
  const r = seeded(41)
  return Array.from({ length: 64 }, (_, i) => {
    const first = firstNames[Math.floor(r() * firstNames.length)]
    const last = lastNames[Math.floor(r() * lastNames.length)]
    const company = companies[Math.floor(r() * companies.length)]
    const planRoll = r()
    const plan: Customer["plan"] = planRoll > 0.86 ? "Enterprise" : planRoll > 0.3 ? "Team" : "Solo"
    const status = statuses[Math.floor(r() * statuses.length)]
    const seats = plan === "Solo" ? 1 : plan === "Team" ? 3 + Math.floor(r() * 38) : 40 + Math.floor(r() * 160)
    const price = plan === "Solo" ? 0 : plan === "Team" ? 29 : 79
    const joined = new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate() - Math.floor(r() * 540) - 1)
    return {
      id: `cus_${(4100 + i * 37).toString(36)}`,
      name: `${first} ${last}`,
      email: `${first.toLowerCase()}.${last.toLowerCase()}@${company.toLowerCase().replace(/[^a-z]/g, "")}.com`,
      company,
      plan,
      status,
      seats,
      mrr: status === "canceled" ? 0 : seats * price,
      region: regions[Math.floor(r() * regions.length)],
      joined: shortDate.format(joined),
      joinedAt: joined.toISOString().slice(0, 10),
      lastActive: `${1 + Math.floor(r() * 23)}h ago`,
    }
  })
})()

export type Invoice = { id: string; date: string; amount: number; status: "Paid" | "Open" | "Void"; description: string }

/** Recent invoices of one customer (mocked from its id). */
export function invoicesFor(customer: Customer): Invoice[] {
  const r = seeded(customer.id.charCodeAt(4) * 97 + customer.seats)
  return Array.from({ length: 4 }, (_, i) => {
    const d = new Date(TODAY.getFullYear(), TODAY.getMonth() - i, 1)
    return {
      id: `INV-${2051 - i * 7 - Math.floor(r() * 5)}`,
      date: shortDate.format(d),
      amount: Math.max(0, customer.mrr - Math.round(r() * 20) * (i ? 1 : 0)),
      status: i === 0 && customer.status === "past_due" ? "Open" : customer.mrr === 0 ? "Void" : "Paid",
      description: `${customer.plan} · ${customer.seats} seat${customer.seats === 1 ? "" : "s"}`,
    }
  })
}

/* ───────────────────────── App: settings ───────────────────────── */

export const billing = {
  plan: "Team",
  cycle: "Yearly",
  seats: 24,
  seatPrice: 24,
  renews: "Mar 1, 2027",
  card: { brand: "Visa", last4: "4242", expires: "08/28" },
  usage: [
    { id: "runs", label: "Agent runs", value: 8420, max: 10000, unit: "runs", description: "Resets on Nov 1" },
    { id: "seats", label: "Seats", value: 24, max: 25, unit: "seats", description: "1 seat left on this plan" },
    { id: "storage", label: "Sandbox storage", value: 38, max: 100, unit: "GB", description: "Snapshots kept for 30 days" },
  ],
}

export const billingInvoices: Invoice[] = Array.from({ length: 6 }, (_, i) => {
  const d = new Date(TODAY.getFullYear(), TODAY.getMonth() - i, 1)
  return {
    id: `INV-${2108 - i * 13}`,
    date: shortDate.format(d),
    amount: 576 - (i > 3 ? 48 : 0),
    status: "Paid" as const,
    description: `Team · ${i > 3 ? 22 : 24} seats`,
  }
})

export type Role = "Owner" | "Admin" | "Member" | "Viewer"
export const roles: { value: Role; description: string }[] = [
  { value: "Owner", description: "Full access, including billing and deleting the workspace." },
  { value: "Admin", description: "Manage members, repos and approval policies." },
  { value: "Member", description: "Start sessions and approve their own actions." },
  { value: "Viewer", description: "Read sessions and PRs. Free, no seat." },
]

export type Member = { id: string; name: string; email: string; role: Role; status: "Active" | "Invited"; lastActive: string }

export const members: Member[] = [
  { id: "m1", name: "Dana Chen", email: "dana@northwind.dev", role: "Owner", status: "Active", lastActive: "Now" },
  { id: "m2", name: "Kenji Sato", email: "kenji@northwind.dev", role: "Admin", status: "Active", lastActive: "12m ago" },
  { id: "m3", name: "Priya Raman", email: "priya@northwind.dev", role: "Member", status: "Active", lastActive: "1h ago" },
  { id: "m4", name: "Mateo Ruiz", email: "mateo@northwind.dev", role: "Member", status: "Active", lastActive: "Yesterday" },
  { id: "m5", name: "Lena Fischer", email: "lena@northwind.dev", role: "Viewer", status: "Active", lastActive: "3d ago" },
  { id: "m6", name: "omar@northwind.dev", email: "omar@northwind.dev", role: "Member", status: "Invited", lastActive: "—" },
]

export const notificationGroups = [
  {
    id: "activity",
    title: "Activity",
    description: "What happens in your sessions.",
    items: [
      { id: "approvals", label: "Approval requests", description: "When an agent waits for you to allow an action.", email: true, push: true },
      { id: "prs", label: "Pull requests opened", description: "A finished PR is ready for review.", email: true, push: false },
      { id: "ci", label: "CI fixes", description: "Tessel pushed a fix for a failing check.", email: false, push: false },
    ],
  },
  {
    id: "account",
    title: "Account",
    description: "Billing and workspace changes.",
    items: [
      { id: "billing", label: "Billing and invoices", description: "Receipts, failed payments and plan changes.", email: true, push: false },
      { id: "usage", label: "Usage alerts", description: "When a quota passes 75% and 90%.", email: true, push: true },
      { id: "digest", label: "Weekly digest", description: "A Monday summary of runs, reviews and spend.", email: false, push: false },
    ],
  },
]
