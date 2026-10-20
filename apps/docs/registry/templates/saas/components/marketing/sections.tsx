"use client"

import * as React from "react"

import { ArrowRightIcon, BoltIcon, BotIcon, CheckIcon, EditIcon, ServerIcon, ShieldIcon, UsersIcon } from "@paneui/ui/icons"
import { Accordion, AccordionItem, AccordionPanel, AccordionTrigger } from "@paneui/ui/components/accordion"
import { Avatar, AvatarFallback } from "@paneui/ui/components/avatar"
import { Badge } from "@paneui/ui/components/badge"
import { Button } from "@paneui/ui/components/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardPanel, CardTitle } from "@paneui/ui/components/card"
import { IconChip } from "@paneui/ui/components/icon-chip"
import { Marquee } from "@paneui/ui/components/marquee"
import { NumberTicker } from "@paneui/ui/components/number-ticker"
import { SegmentedControl, SegmentedControlItem } from "@paneui/ui/components/segmented-control"
import { ShaderBackground } from "@paneui/ui/components/shader-background"
import {
  StatCard,
  StatCardDelta,
  StatCardFooter,
  StatCardHeader,
  StatCardLabel,
  StatCardSparkline,
  StatCardValue,
} from "@paneui/ui/components/stat-card"
import { TextReveal } from "@paneui/ui/components/text-reveal"
import { TrendChart } from "@paneui/ui/components/trend-chart"

import { brand, faqs, features, kpis, logos, plans, revenue, revenueSeries, stats, testimonials, type FeatureId } from "../../lib/data"
import { AppLink, routes } from "../../lib/routes"
import { initials } from "../providers"
import { Container, SectionHeading } from "./marketing-shell"
import { Stagger, StaggerItem } from "./stagger"

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })

/* ───────────────────────── Hero ───────────────────────── */

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <ShaderBackground
        variant="mesh-gradient"
        speed={0.25}
        aria-hidden
        className="absolute inset-0 -z-10"
        shaderClassName="opacity-35 dark:opacity-25"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-b from-background/40 via-background/70 to-background" />
      <Container className="flex flex-col items-center gap-14 pt-20 pb-20 text-center sm:pt-28">
        <div className="flex flex-col items-center gap-6">
          <Stagger>
            <StaggerItem>
              <Badge variant="chip" size="sm" render={<AppLink href={routes.changelog} />}>
                <BoltIcon />
                New: reviews that cite the line
                <ArrowRightIcon className="rtl:-scale-x-100" />
              </Badge>
            </StaggerItem>
          </Stagger>
          <TextReveal
            as="h1"
            text={brand.tagline}
            stagger={0.08}
            delay={0.1}
            blur={4}
            className="max-w-4xl text-4xl leading-tight font-semibold tracking-tight text-balance sm:text-6xl sm:leading-none"
          />
          <Stagger delay={0.55} className="flex flex-col items-center gap-8">
            <StaggerItem>
              <p className="max-w-xl text-lg leading-relaxed text-pretty text-muted-foreground">{brand.description}</p>
            </StaggerItem>
            <StaggerItem className="flex flex-wrap items-center justify-center gap-3">
              <Button size="lg" nativeButton={false} render={<AppLink href={routes.signup} />}>
                Start free
                <ArrowRightIcon className="rtl:-scale-x-100" data-icon="inline-end" />
              </Button>
              <Button size="lg" variant="secondary" nativeButton={false} render={<AppLink href={routes.pricing} />}>
                See pricing
              </Button>
            </StaggerItem>
            <StaggerItem>
              <p className="text-sm text-muted-foreground">Free for one seat · No card needed · SOC 2 Type II</p>
            </StaggerItem>
          </Stagger>
        </div>
        <Stagger delay={0.9} className="w-full max-w-5xl">
          <StaggerItem>
            <ProductShot />
          </StaggerItem>
        </Stagger>
      </Container>
    </section>
  )
}

/** A slice of the real dashboard, built from the same components, as the product shot. */
function ProductShot() {
  return (
    <Card variant="inset" aria-hidden className="text-start">
      <CardPanel className="gap-4 px-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {kpis.slice(0, 3).map((k) => (
            <StatCard key={k.id}>
              <StatCardHeader>
                <StatCardLabel>{k.label}</StatCardLabel>
                <StatCardDelta value={k.delta} invert={k.invert} />
              </StatCardHeader>
              <StatCardFooter>
                <StatCardValue>{new Intl.NumberFormat("en-US", k.format).format(k.value)}</StatCardValue>
                <StatCardSparkline values={k.trend} animate={false} />
              </StatCardFooter>
            </StatCard>
          ))}
        </div>
        <TrendChart series={revenueSeries} data={revenue} variant="area" stacked height={220} showLegend={false} formatValue={(v) => usd.format(v)} label="Revenue by plan" />
      </CardPanel>
    </Card>
  )
}

/* ───────────────────────── Logos + stats ───────────────────────── */

export function LogoStrip() {
  return (
    <section id="customers" aria-label="Customers" className="flex scroll-mt-20 flex-col gap-10 py-14">
      <p className="text-center text-sm text-muted-foreground">Trusted by 2,400 engineering teams</p>
      <Marquee duration={40} gap="3.5rem" repeat={3}>
        {logos.map((l) => (
          <span key={l} className="flex shrink-0 items-center gap-2 text-lg font-semibold whitespace-nowrap text-muted-foreground">
            <span aria-hidden className="size-4 rounded-md bg-muted-foreground/40" />
            {l}
          </span>
        ))}
      </Marquee>
      <Container>
        <dl className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1 text-center">
              <dt className="text-sm text-muted-foreground">{s.label}</dt>
              <dd className="flex items-baseline text-3xl font-semibold tracking-tight tabular-nums">
                <NumberTicker value={s.value} locale="en-US" format={{ notation: s.value > 99999 ? "compact" : "standard" }} />
                {s.suffix && <span className="text-lg text-muted-foreground">{s.suffix}</span>}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  )
}

/* ───────────────────────── Features ───────────────────────── */

const featureIcon: Record<FeatureId, React.ReactNode> = {
  plan: <EditIcon />,
  sandbox: <ServerIcon />,
  review: <BotIcon />,
  approve: <ShieldIcon />,
  ci: <BoltIcon />,
  team: <UsersIcon />,
}

export function Features() {
  return (
    <section id="features" className="scroll-mt-20 border-y border-border bg-muted py-24">
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
                <p className="text-sm leading-relaxed text-pretty text-muted-foreground">{f.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}

/* ───────────────────────── Pricing ───────────────────────── */

export type Cycle = "monthly" | "yearly"

export function CycleToggle({ cycle, onCycleChange }: { cycle: Cycle; onCycleChange: (c: Cycle) => void }) {
  return (
    <div className="flex items-center gap-3">
      <SegmentedControl value={cycle} onValueChange={(v) => onCycleChange(v as Cycle)} aria-label="Billing cycle">
        <SegmentedControlItem value="monthly">Monthly</SegmentedControlItem>
        <SegmentedControlItem value="yearly">Yearly</SegmentedControlItem>
      </SegmentedControl>
      <Badge size="sm" variant="success">
        Save 17%
      </Badge>
    </div>
  )
}

/** The three plan cards; shared by the home page section and /pricing. */
export function PlanCards({ cycle }: { cycle: Cycle }) {
  return (
    <div className="grid w-full grid-cols-1 items-stretch gap-4 lg:grid-cols-3">
      {plans.map((p) => {
        const price = cycle === "monthly" ? p.monthly : p.yearly
        return (
          // The featured tier gets a primary ring on a plain wrapper; Card keeps its own surface.
          <div key={p.id} className={p.featured ? "flex rounded-xl ring-2 ring-primary/50" : "flex"}>
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
                <Button
                  variant={p.featured ? "default" : "secondary"}
                  className="w-full"
                  nativeButton={false}
                  render={<AppLink href={p.id === "enterprise" ? "/#faq" : routes.signup} />}
                >
                  {p.cta}
                </Button>
              </CardFooter>
            </Card>
          </div>
        )
      })}
    </div>
  )
}

export function PricingSection() {
  const [cycle, setCycle] = React.useState<Cycle>("yearly")
  return (
    <section id="pricing" className="scroll-mt-20 py-24">
      <Container className="flex flex-col items-center gap-10">
        <SectionHeading center eyebrow="Pricing" title="Simple pricing that scales with your team." body="Every plan includes the sandbox, approvals and PR reviews." />
        <CycleToggle cycle={cycle} onCycleChange={setCycle} />
        <PlanCards cycle={cycle} />
        <Button variant="link" nativeButton={false} render={<AppLink href={routes.pricing} />}>
          Compare every feature
          <ArrowRightIcon className="rtl:-scale-x-100" data-icon="inline-end" />
        </Button>
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
                <Avatar>
                  <AvatarFallback>{initials(t.name)}</AvatarFallback>
                </Avatar>
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

/* ───────────────────────── FAQ + CTA ───────────────────────── */

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-20 py-24">
      <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
        <SectionHeading eyebrow="FAQ" title="Questions, answered." body={`Can't find what you need? Write to ${brand.supportEmail} and a human will reply within a day.`} />
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

export function Cta() {
  return (
    <section className="pb-24">
      <Container>
        <ShaderBackground
          variant="mesh-gradient"
          speed={0.3}
          className="flex flex-col items-center gap-6 rounded-3xl px-6 py-20 text-center shadow-raised"
          shaderClassName="opacity-40 dark:opacity-30"
        >
          <h2 className="max-w-xl text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-4xl">Give Tessel your next ticket.</h2>
          <p className="max-w-md text-pretty text-muted-foreground">Install the GitHub app, point it at an issue and review the PR it opens. Free for one seat.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button size="lg" nativeButton={false} render={<AppLink href={routes.signup} />}>
              Start free
              <ArrowRightIcon className="rtl:-scale-x-100" data-icon="inline-end" />
            </Button>
            <Button size="lg" variant="secondary" nativeButton={false} render={<AppLink href={routes.login} />}>
              Sign in
            </Button>
          </div>
        </ShaderBackground>
      </Container>
    </section>
  )
}
