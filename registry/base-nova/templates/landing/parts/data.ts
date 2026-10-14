export const logos = ["Northwind", "Helio Health", "Paperplane", "Orbital", "Kiln Robotics", "Fathom", "Marlow", "Bramble & Co", "Quill"]

export const features = [
  { id: "plan", title: "Plans before it types", body: "Every task starts as a checklist you can edit. Tessel works through it step by step and shows its progress live." },
  { id: "sandbox", title: "Runs in a sealed sandbox", body: "Each session gets a fresh container with your repo, secrets scoped per project and no network unless you allow it." },
  { id: "review", title: "Reviews its own diffs", body: "A second pass reads the change like a senior reviewer: types, edge cases, tests that should exist and don't." },
  { id: "approve", title: "Asks before it acts", body: "Pushing, deleting or calling paid APIs waits for your approval. Allow once, always, or deny with a note." },
  { id: "ci", title: "Fixes what CI flags", body: "Hook it to your pipeline and Tessel picks up failing checks, reproduces them and pushes a fix to the same branch." },
  { id: "team", title: "Shared with your team", body: "Sessions, plans and approvals live in one workspace with SSO, audit logs and per-repo permissions." },
]

export type Plan = {
  id: string
  name: string
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

export const cliSnippet = `$ npx tessel run "fix the 1¢ rounding drift on INV-2045"

◆ Plan
  ✓ Reproduce the drift with a failing test
  ✓ Round line items to cents before tax
  ✓ Run packages/billing (69 tests)
  ◌ Open a pull request against main

◆ Waiting for approval: github.create_pull_request`

export const footer = [
  { title: "Product", links: ["Features", "Pricing", "Changelog", "Security"] },
  { title: "Developers", links: ["Docs", "CLI reference", "API", "Status"] },
  { title: "Company", links: ["About", "Careers", "Blog", "Contact"] },
]
