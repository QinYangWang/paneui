"use client"

import * as React from "react"

import {
  ArrowRightIcon,
  BoltIcon,
  BotIcon,
  CheckIcon,
  ChatIcon,
  EditIcon,
  GithubIcon,
  LockIcon,
  ServerIcon,
  ShieldIcon,
  UsersIcon,
} from "@/components/icons"
import { Accordion, AccordionItem, AccordionPanel, AccordionTrigger } from "@/registry/base-nova/ui/accordion"
import { AgentCodeBlock } from "@/registry/base-nova/ui/agent-code-block"
import { Badge } from "@/registry/base-nova/ui/badge"
import { Button } from "@/registry/base-nova/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/registry/base-nova/ui/card"
import { IconChip } from "@/registry/base-nova/ui/icon-chip"
import { Marquee } from "@/registry/base-nova/ui/marquee"
import { NumberTicker } from "@/registry/base-nova/ui/number-ticker"
import { ShaderBackground } from "@/registry/base-nova/ui/shader-background"
import { Tabs, TabsList, TabsTab } from "@/registry/base-nova/ui/tabs"
import { TextReveal } from "@/registry/base-nova/ui/text-reveal"
import { TodoList, type TodoItem } from "@/registry/base-nova/ui/todo-list"
import { ToolApproval } from "@/registry/base-nova/ui/tool-approval"

import { Avatar } from "./avatar"
import { cliSnippet, faqs, features, footer, logos, plans, testimonials } from "./data"
import { Stagger, StaggerItem } from "./stagger"

export function Container({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>
}

function SectionHeading({ eyebrow, title, body, center = false }: { eyebrow: string; title: string; body?: string; center?: boolean }) {
  return (
    <div className={center ? "mx-auto flex max-w-2xl flex-col items-center gap-3 text-center" : "flex max-w-2xl flex-col gap-3"}>
      <p className="text-xs font-medium tracking-wider text-primary uppercase">{eyebrow}</p>
      <h2 className="text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-4xl">{title}</h2>
      {body && <p className="text-lg leading-relaxed text-pretty text-muted-foreground">{body}</p>}
    </div>
  )
}

/* ───────────────────────── Hero ───────────────────────── */

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <ShaderBackground variant="mesh-gradient" speed={0.25} aria-hidden className="absolute inset-0 -z-10" shaderClassName="opacity-35 dark:opacity-25" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-b from-background/40 via-background/70 to-background" />
      <Container className="flex flex-col items-center gap-14 pt-20 pb-24 text-center sm:pt-28">
        <div className="flex flex-col items-center gap-6">
          <Stagger>
            <StaggerItem>
              <Badge variant="chip" size="sm" render={<a href="#changelog" />}>
                <BoltIcon />
                Tessel 2.0 reviews its own pull requests
                <ArrowRightIcon />
              </Badge>
            </StaggerItem>
          </Stagger>
          <TextReveal
            as="h1"
            text="The coding agent that ships reviewed pull requests."
            stagger={0.08}
            delay={0.1}
            blur={4}
            className="max-w-4xl text-4xl leading-tight font-semibold tracking-tight text-balance sm:text-6xl sm:leading-none"
          />
          <Stagger delay={0.55} className="flex flex-col items-center gap-8">
            <StaggerItem>
              <p className="max-w-xl text-lg leading-relaxed text-pretty text-muted-foreground">
                Tessel plans the change, runs it in a sandbox, tests it and asks before anything leaves. You review a finished PR, not
                a wall of autocomplete.
              </p>
            </StaggerItem>
            <StaggerItem className="flex flex-wrap items-center justify-center gap-3">
              <Button size="lg">
                Start free
                <ArrowRightIcon data-icon="inline-end" />
              </Button>
              <Button size="lg" variant="secondary">
                <GithubIcon data-icon="inline-start" />
                Install the GitHub app
              </Button>
            </StaggerItem>
            <StaggerItem>
              <p className="text-sm text-muted-foreground">Free for one seat · No card needed · SOC 2 Type II</p>
            </StaggerItem>
          </Stagger>
        </div>
        <Stagger delay={0.9} className="w-full max-w-4xl">
          <StaggerItem>
            <HeroPreview />
          </StaggerItem>
        </Stagger>
      </Container>
    </section>
  )
}

/** Product shot: a padded frame around the CLI run. Concentric radii: 32px frame = 20px block + 12px padding. */
function HeroPreview() {
  return (
    <div className="rounded-4xl bg-card/70 p-3 text-left shadow-surface backdrop-blur">
      <AgentCodeBlock filename="~/acme/billing" language="bash" code={cliSnippet} copyable={false} />
    </div>
  )
}

/* ───────────────────────── Logos ───────────────────────── */

export function LogoStrip() {
  return (
    <section aria-label="Teams using Tessel" className="flex flex-col gap-6 py-12">
      <p className="text-center text-sm text-muted-foreground">Trusted by 2,400 engineering teams</p>
      <Marquee duration={40} gap="3.5rem" repeat={3}>
        {logos.map((l) => (
          <span key={l} className="flex shrink-0 items-center gap-2 text-lg font-semibold tracking-tight whitespace-nowrap text-muted-foreground">
            <ShapeMark />
            {l}
          </span>
        ))}
      </Marquee>
    </section>
  )
}

function ShapeMark() {
  return <span aria-hidden className="size-4 rounded-md bg-muted-foreground/40" />
}

/* ───────────────────────── Features ───────────────────────── */

const featureIcon: Record<string, React.ReactNode> = {
  plan: <EditIcon />,
  sandbox: <ServerIcon />,
  review: <BotIcon />,
  approve: <ShieldIcon />,
  ci: <BoltIcon />,
  team: <UsersIcon />,
}

export function Features() {
  return (
    <section id="features" className="scroll-mt-20 py-24">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          eyebrow="Why Tessel"
          title="An agent you can hand real work to."
          body="Autocomplete finishes your line. Tessel finishes the ticket, with a plan you can read and a diff you can trust."
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <Card key={f.id} className="gap-4">
              <CardHeader className="gap-4">
                <IconChip size="lg" tone="neutral">
                  {featureIcon[f.id]}
                </IconChip>
                <CardTitle className="text-base">{f.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed text-pretty text-muted-foreground">{f.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}

/* ───────────────────────── Demo ───────────────────────── */

const demoPoints = [
  { icon: <ChatIcon />, title: "Describe it in a sentence", body: "From the CLI, a GitHub comment or Slack." },
  { icon: <ServerIcon />, title: "Watch the plan run", body: "Tests and builds stream from the sandbox as they happen." },
  { icon: <LockIcon />, title: "Approve what leaves", body: "Pushes and PRs wait for you, with the exact arguments." },
]

const demoPlan: TodoItem[] = [
  { id: "1", title: "Reproduce the drift with a failing test", status: "done", meta: "0.9s" },
  { id: "2", title: "Round line items to cents before tax", status: "done", meta: "2 files" },
  { id: "3", title: "Run packages/billing", status: "done", meta: "69 passed" },
  { id: "4", title: "Open a pull request against main", status: "in-progress" },
]

export function Demo() {
  return (
    <section id="product" className="scroll-mt-20 border-y border-border bg-muted/40 py-24">
      <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-10">
          <SectionHeading eyebrow="How it works" title="From one sentence to a pull request." />
          <ul className="flex flex-col gap-6">
            {demoPoints.map((p) => (
              <li key={p.title} className="flex gap-4">
                <IconChip tone="primary">{p.icon}</IconChip>
                <div className="flex flex-col gap-1">
                  <span className="font-medium">{p.title}</span>
                  <span className="text-pretty text-muted-foreground">{p.body}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex min-w-0 flex-col gap-3">
          <TodoList items={demoPlan} title="Fix invoice rounding" />
          <ToolApproval
            tool="github.create_pull_request"
            title="Open a pull request?"
            description="Push fix/invoice-rounding and open a PR against main."
            risk="medium"
            args={{ repo: "acme/billing", head: "fix/invoice-rounding", base: "main", title: "Round line items to cents before tax" }}
          />
        </div>
      </Container>
    </section>
  )
}

/* ───────────────────────── Pricing ───────────────────────── */

export function Pricing() {
  const [cycle, setCycle] = React.useState<"monthly" | "yearly">("yearly")
  return (
    <section id="pricing" className="scroll-mt-20 py-24">
      <Container className="flex flex-col items-center gap-12">
        <SectionHeading center eyebrow="Pricing" title="Simple pricing that scales with your team." body="Every plan includes the sandbox, approvals and PR reviews." />
        <div className="flex items-center gap-3">
          <Tabs value={cycle} onValueChange={(v) => setCycle(v as "monthly" | "yearly")}>
            <TabsList aria-label="Billing cycle">
              <TabsTab value="monthly">Monthly</TabsTab>
              <TabsTab value="yearly">Yearly</TabsTab>
            </TabsList>
          </Tabs>
          <Badge size="sm" variant="success">
            Save 17%
          </Badge>
        </div>
        <div className="grid w-full grid-cols-1 items-stretch gap-4 lg:grid-cols-3">
          {plans.map((p) => {
            const price = cycle === "monthly" ? p.monthly : p.yearly
            return (
              // The featured tier gets a primary ring on a plain wrapper; Card keeps its own surface.
              <div key={p.id} className={p.featured ? "flex rounded-2xl ring-2 ring-primary/50" : "flex"}>
              <Card className="flex-1 gap-6">
                <CardHeader className="gap-2">
                  <div className="flex items-center justify-between gap-3">
                    <CardTitle className="text-base">{p.name}</CardTitle>
                    {p.featured && (
                      <Badge size="sm" variant="primary">
                        Most popular
                      </Badge>
                    )}
                  </div>
                  <CardDescription className="text-pretty">{p.blurb}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-6">
                  <div className="flex items-baseline gap-1.5">
                    <NumberTicker
                      value={price}
                      locale="en-US"
                      format={{ style: "currency", currency: "USD", maximumFractionDigits: 0 }}
                      className="text-4xl font-semibold tracking-tight tabular-nums"
                    />
                    <span className="text-sm text-muted-foreground">{price === 0 ? "forever" : "per seat / month"}</span>
                  </div>
                  <ul className="flex flex-col gap-2.5">
                    {p.perks.map((perk) => (
                      <li key={perk} className="flex items-start gap-2.5 text-sm">
                        <CheckIcon size={16} className="mt-0.5 shrink-0 text-primary" />
                        {perk}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="mt-auto">
                  <Button variant={p.featured ? "default" : "secondary"} className="w-full">
                    {p.cta}
                  </Button>
                </CardFooter>
              </Card>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

/* ───────────────────────── Testimonials ───────────────────────── */

export function Testimonials() {
  return (
    <section className="py-24">
      <Container className="flex flex-col gap-12">
        <SectionHeading eyebrow="Customers" title="Teams that stopped babysitting their agent." />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {testimonials.map((t) => (
            <Card key={t.name} className="justify-between gap-6">
              <CardContent>
                <blockquote className="text-base leading-relaxed text-pretty">“{t.quote}”</blockquote>
              </CardContent>
              <CardFooter className="gap-3">
                <Avatar name={t.name} />
                <div className="flex flex-col leading-tight">
                  <span className="text-sm font-medium">{t.name}</span>
                  <span className="text-xs text-muted-foreground">{t.role}</span>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}

/* ───────────────────────── FAQ ───────────────────────── */

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-20 py-24">
      <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
        <SectionHeading eyebrow="FAQ" title="Questions, answered." body="Can't find what you need? Write to help@tessel.dev and a human will reply within a day." />
        <Accordion defaultValue={["data"]}>
          {faqs.map((f) => (
            <AccordionItem key={f.id} value={f.id}>
              <AccordionTrigger>{f.q}</AccordionTrigger>
              <AccordionPanel>{f.a}</AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </section>
  )
}

/* ───────────────────────── CTA + footer ───────────────────────── */

export function Cta() {
  return (
    <section className="pb-24">
      <Container>
        <ShaderBackground variant="mesh-gradient" speed={0.3} className="flex flex-col items-center gap-6 rounded-3xl px-6 py-20 text-center shadow-surface" shaderClassName="opacity-40 dark:opacity-30">
          <h2 className="max-w-xl text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-4xl">Give Tessel your next ticket.</h2>
          <p className="max-w-md text-pretty text-muted-foreground">Install the GitHub app, point it at an issue and review the PR it opens. Free for one seat.</p>
          <Button size="lg">
            Start free
            <ArrowRightIcon data-icon="inline-end" />
          </Button>
        </ShaderBackground>
      </Container>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-border py-16">
      <Container className="grid grid-cols-2 gap-10 md:grid-cols-[minmax(0,2fr)_repeat(3,minmax(0,1fr))]">
        <div className="col-span-2 flex flex-col gap-4 md:col-span-1">
          <div className="flex items-center gap-2.5">
            <IconChip size="sm" tone="solid">
              <BotIcon />
            </IconChip>
            <span className="font-semibold">Tessel</span>
          </div>
          <p className="max-w-xs text-sm text-pretty text-muted-foreground">The coding agent that ships reviewed pull requests.</p>
          <p className="text-xs text-muted-foreground">© 2026 Tessel Labs, Inc.</p>
        </div>
        {footer.map((col) => (
          <nav key={col.title} aria-label={col.title} className="flex flex-col gap-3">
            <h3 className="text-xs font-medium tracking-wider text-muted-foreground uppercase">{col.title}</h3>
            <ul className="flex flex-col gap-2">
              {col.links.map((l) => (
                <li key={l}>
                  <a href="#" className="text-sm text-foreground/80 transition-colors hover:text-foreground">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </Container>
    </footer>
  )
}
