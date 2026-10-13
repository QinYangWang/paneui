import * as React from "react"

import * as Icons from "@/components/icons"
import { ApprovalCard, ChatDemo, ControlsDemo, TaskDemo } from "./demos"
import { RecommendationCard } from "@/registry/base-nova/blocks/recommendation-card/recommendation-card"
import { Badge, BadgeAvatar } from "@/registry/base-nova/ui/badge"
import { Button } from "@/registry/base-nova/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/registry/base-nova/ui/card"
import { Input } from "@/registry/base-nova/ui/input"
import { Label } from "@/registry/base-nova/ui/label"
import { Textarea } from "@/registry/base-nova/ui/textarea"

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-sm font-medium text-muted-foreground">{title}</h2>
      {children}
    </section>
  )
}

export default function Home() {
  const icons = Object.entries(Icons).filter(([name]) => name.endsWith("Icon")) as [
    string,
    (p: { size?: number }) => React.ReactElement,
  ][]

  return (
    <div className="mx-auto flex min-h-svh max-w-4xl flex-col gap-12 px-6 py-12">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight">qinyang/ui</h1>
        <p className="text-muted-foreground">Soft, tactile components on Base UI, distributed via shadcn.</p>
      </header>

      <Section title="Recommendation Card">
        <RecommendationCard />
      </Section>

      <Section title="Chat + Prompt Bar">
        <ChatDemo />
      </Section>

      <Section title="Approval Card">
        <ApprovalCard />
      </Section>

      <Section title="Task Rows (click to cycle status)">
        <TaskDemo />
      </Section>

      <Section title="Tabs, Switch, Dialog">
        <ControlsDemo />
      </Section>

      <Section title="Buttons">
        <div className="flex flex-wrap items-center gap-3">
          <Button>Accept</Button>
          <Button variant="secondary">Alternatives</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Delete</Button>
          <Button variant="secondary">
            <Icons.SparklesIcon data-icon="inline-start" />
            Generate
          </Button>
          <Button size="icon" variant="secondary" aria-label="Settings">
            <Icons.SettingsIcon />
          </Button>
          <Button size="icon" aria-label="Send">
            <Icons.ArrowUpIcon />
          </Button>
        </div>
      </Section>

      <Section title="Badges">
        <div className="flex flex-wrap items-center gap-2">
          <Badge>
            <BadgeAvatar>C</BadgeAvatar>
            Cone King
          </Badge>
          <Badge variant="success">7 days</Badge>
          <Badge variant="primary">
            <Icons.BoltIcon />
            Fast
          </Badge>
          <Badge variant="warning">Needs review</Badge>
          <Badge variant="destructive">No signal</Badge>
          <Badge variant="outline">Draft</Badge>
        </div>
      </Section>

      <Section title="Form">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Contact</CardTitle>
            <CardDescription>Inputs sit in soft inset wells.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Your name" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="msg">Message</Label>
              <Textarea id="msg" placeholder="What can we help with?" />
            </div>
            <Button className="self-end">Send</Button>
          </CardContent>
        </Card>
      </Section>

      <Section title={`Icons (${icons.length})`}>
        <div className="grid grid-cols-6 gap-2 sm:grid-cols-10">
          {icons.map(([name, Icon]) => (
            <div
              key={name}
              title={name}
              className="flex aspect-square items-center justify-center rounded-xl bg-card text-foreground shadow-chip"
            >
              <Icon />
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}
