import Link from "next/link"

import { InstallCommand } from "@/components/docs/install-command"
import { getItems, REGISTRY_NAME, REGISTRY_URL } from "@/lib/docs"
import { AgentCodeBlock } from "@/registry/base-nova/ui/agent-code-block"
import { Alert, AlertContent, AlertDescription, AlertIcon, AlertTitle } from "@/registry/base-nova/ui/alert"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/registry/base-nova/ui/breadcrumb"
import { Button } from "@/registry/base-nova/ui/button"
import { ArrowRightIcon } from "@/components/icons"

export const metadata = { title: "Installation" }

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="flex items-center gap-3 text-lg font-semibold">
        <span className="grid size-7 shrink-0 place-items-center rounded-full bg-secondary text-sm tabular-nums shadow-raised">{n}</span>
        {title}
      </h2>
      <div className="flex flex-col gap-3 sm:pl-10">{children}</div>
    </section>
  )
}

export default function Installation() {
  const config = JSON.stringify({ registries: { [`@${REGISTRY_NAME}`]: REGISTRY_URL } }, null, 2)
  const count = getItems().length
  return (
    <article className="mx-auto flex max-w-3xl flex-col gap-10">
      <header className="flex flex-col gap-3">
        <Breadcrumb className="-ml-2">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink render={<Link href="/" />}>Getting started</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Installation</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-3xl font-semibold tracking-tight">Installation</h1>
        <p className="text-lg text-muted-foreground">
          {count} components are distributed through a shadcn namespaced registry. Add the namespace once, then install
          anything with the shadcn CLI.
        </p>
      </header>

      <Alert variant="info">
        <AlertIcon />
        <AlertContent>
          <AlertTitle>Before you start</AlertTitle>
          <AlertDescription>
            You need a React project with Tailwind CSS 4 and shadcn initialised on a Base UI style (base-nova).
          </AlertDescription>
        </AlertContent>
      </Alert>

      <Step n={1} title="Add the registry">
        <p className="text-muted-foreground">Add the namespace to your components.json:</p>
        <AgentCodeBlock code={config} filename="components.json" language="json" />
      </Step>

      <Step n={2} title="Install the theme">
        <p className="text-muted-foreground">The depth tokens (raised, pressed, well…) and the icon set every component relies on.</p>
        <InstallCommand args={`add @${REGISTRY_NAME}/theme @${REGISTRY_NAME}/icons`} />
        <p className="text-muted-foreground">
          The primary colour is neutral: near-black in light mode, near-white in dark. For a coloured accent, add one
          preset after the theme: blue, green, orange, rose or violet.
        </p>
        <InstallCommand args={`add @${REGISTRY_NAME}/theme-blue`} />
      </Step>

      <Step n={3} title="Add components">
        <InstallCommand args={`add @${REGISTRY_NAME}/button @${REGISTRY_NAME}/prompt-bar`} />
        <p className="text-muted-foreground">Components land in your project as source, so you can edit them freely.</p>
      </Step>

      <div className="flex justify-end border-t border-border pt-6">
        <Button variant="secondary" nativeButton={false} render={<Link href="/" />}>
          Browse the gallery
          <ArrowRightIcon data-icon="inline-end" />
        </Button>
      </div>
    </article>
  )
}
