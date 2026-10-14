/* Seed data for the SaaS dashboard template. Replace with your API. */

export type InvoiceStatus = "Paid" | "Pending" | "Overdue" | "Refunded"

export type Invoice = {
  id: string
  workspace: string
  owner: string
  plan: "Starter" | "Team" | "Business" | "Enterprise"
  seats: number
  status: InvoiceStatus
  amount: number
  issued: string
}

export const invoices: Invoice[] = [
  { id: "INV-2048", workspace: "Northwind Labs", owner: "dana@northwind.io", plan: "Business", seats: 48, status: "Paid", amount: 4320, issued: "Oct 14" },
  { id: "INV-2047", workspace: "Helio Health", owner: "ops@helio.health", plan: "Enterprise", seats: 210, status: "Pending", amount: 18900, issued: "Oct 14" },
  { id: "INV-2046", workspace: "Paperplane", owner: "kenji@paperplane.dev", plan: "Team", seats: 12, status: "Paid", amount: 588, issued: "Oct 13" },
  { id: "INV-2045", workspace: "Bramble & Co", owner: "finance@bramble.co", plan: "Team", seats: 9, status: "Overdue", amount: 441, issued: "Oct 11" },
  { id: "INV-2044", workspace: "Orbital Freight", owner: "priya@orbital.ai", plan: "Business", seats: 36, status: "Paid", amount: 3240, issued: "Oct 11" },
  { id: "INV-2043", workspace: "Quill Studio", owner: "hello@quill.studio", plan: "Starter", seats: 3, status: "Refunded", amount: 57, issued: "Oct 10" },
  { id: "INV-2042", workspace: "Fathom Maps", owner: "mateo@fathom.app", plan: "Team", seats: 18, status: "Paid", amount: 882, issued: "Oct 09" },
  { id: "INV-2041", workspace: "Kiln Robotics", owner: "billing@kiln.dev", plan: "Enterprise", seats: 140, status: "Pending", amount: 12600, issued: "Oct 08" },
  { id: "INV-2040", workspace: "Marlow Legal", owner: "it@marlow.law", plan: "Business", seats: 24, status: "Paid", amount: 2160, issued: "Oct 07" },
  { id: "INV-2039", workspace: "Sundial Coffee", owner: "yuki@sundial.coffee", plan: "Starter", seats: 4, status: "Paid", amount: 76, issued: "Oct 06" },
]

export type Kpi = {
  id: string
  label: string
  value: number
  format: Intl.NumberFormatOptions
  delta: number
  /** Lower is better (churn, latency). */
  invert?: boolean
  hint: string
  trend: number[]
}

export const kpis: Kpi[] = [
  {
    id: "mrr",
    label: "Recurring revenue",
    value: 84210,
    format: { style: "currency", currency: "USD", maximumFractionDigits: 0 },
    delta: 8.4,
    hint: "vs. September",
    trend: [61, 63, 62, 66, 68, 67, 71, 73, 72, 76, 79, 84],
  },
  {
    id: "seats",
    label: "Active seats",
    value: 3482,
    format: { maximumFractionDigits: 0 },
    delta: 5.1,
    hint: "+412 this month",
    trend: [28, 29, 29, 30, 31, 31, 32, 32, 33, 33, 34, 35],
  },
  {
    id: "runs",
    label: "Agent runs",
    value: 1.28e6,
    format: { notation: "compact", maximumFractionDigits: 2 },
    delta: 21.7,
    hint: "p95 run 48s",
    trend: [52, 58, 55, 64, 70, 68, 77, 84, 90, 96, 110, 128],
  },
  {
    id: "churn",
    label: "Logo churn",
    value: 0.019,
    format: { style: "percent", minimumFractionDigits: 1, maximumFractionDigits: 1 },
    delta: -0.4,
    invert: true,
    hint: "3 of 158 accounts",
    trend: [3.1, 2.9, 3.0, 2.7, 2.6, 2.6, 2.4, 2.3, 2.4, 2.2, 2.1, 1.9],
  },
]

export const revenueSeries = [
  { id: "enterprise", label: "Enterprise" },
  { id: "business", label: "Business" },
  { id: "team", label: "Team" },
  { id: "starter", label: "Starter" },
]

const months = ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"]
export const revenue = months.map((label, i) => ({
  label,
  values: {
    enterprise: 21000 + i * 1650 + (i % 3) * 400,
    business: 16800 + i * 720 + (i % 2) * 380,
    team: 9400 + i * 310 - (i % 4) * 160,
    starter: 3100 + (i % 3) * 140 - i * 40,
  },
}))

export type Activity = {
  id: string
  kind: "upgrade" | "invoice" | "member" | "alert" | "deploy"
  title: string
  detail: string
  time: string
}

export const activity: Activity[] = [
  { id: "a1", kind: "upgrade", title: "Northwind Labs upgraded to Business", detail: "48 seats · +$1,920 MRR", time: "4m" },
  { id: "a2", kind: "alert", title: "Card declined for Bramble & Co", detail: "Retry scheduled for Oct 16", time: "26m" },
  { id: "a3", kind: "member", title: "Priya Raman joined Orbital Freight", detail: "Invited by Leo Park as admin", time: "1h" },
  { id: "a4", kind: "deploy", title: "Runner pool scaled to 64 workers", detail: "ap-northeast-1 · auto", time: "2h" },
  { id: "a5", kind: "invoice", title: "INV-2041 sent to Kiln Robotics", detail: "Net 30 · $12,600", time: "5h" },
  { id: "a6", kind: "upgrade", title: "Fathom Maps added 6 seats", detail: "Team plan · +$294 MRR", time: "Yesterday" },
]
