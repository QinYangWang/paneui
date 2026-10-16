import { DocHeading } from "@/components/docs/doc-heading"
import { Code, GuidePage, TextLink } from "@/components/docs/guide-page"
import { InstallCommand } from "@/components/docs/install-command"
import { REGISTRY_NAME, REGISTRY_URL } from "@/lib/docs"
import { DocsCode } from "@/components/docs/docs-code"
import { Alert, AlertContent, AlertDescription, AlertIcon, AlertTitle } from "@/registry/base-nova/ui/alert"

export const metadata = { title: "Installation" }

function Step({ n, id, title, children }: { n: number; id: string; title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <DocHeading id={id} className="flex items-center gap-3 text-lg tracking-normal">
        <span data-md-skip className="grid size-7 shrink-0 place-items-center rounded-full bg-card text-ui tabular-nums shadow-raised">{n}</span>
        {title}
      </DocHeading>
      <div className="flex flex-col gap-3 sm:pl-10">{children}</div>
    </section>
  )
}

const USAGE = `import { Button } from "@/components/ui/button"

export function Save() {
  return <Button>Save changes</Button>
}`

export default function Installation() {
  const config = JSON.stringify({ registries: { [`@${REGISTRY_NAME}`]: REGISTRY_URL } }, null, 2)
  const toc = [
    { id: "requirements", title: "Requirements" },
    { id: "add-the-registry", title: "Add the registry" },
    { id: "install-the-theme", title: "Install the theme" },
    { id: "add-components", title: "Add components" },
    { id: "use-them", title: "Use them" },
  ]
  return (
    <GuidePage
      href="/docs/installation"
      toc={toc}
      lede="Add the registry namespace once, then install any item with the shadcn CLI."
    >
      <Alert variant="info" id="requirements" className="scroll-mt-20">
        <AlertIcon />
        <AlertContent>
          <AlertTitle>Requirements</AlertTitle>
          <AlertDescription>
            A React project with Tailwind CSS 4 and shadcn initialised with the base-nova style. Run <Code>shadcn init</Code>{" "}
            first if you have no components.json yet. To start a new app from a template, see{" "}
            <TextLink href="/docs/cli#templates">Templates in one command</TextLink>.
          </AlertDescription>
        </AlertContent>
      </Alert>

      <Step n={1} id="add-the-registry" title="Add the registry">
        <p className="text-muted-foreground">Add the namespace to your components.json.</p>
        <DocsCode code={config} filename="components.json" language="json" />
      </Step>

      <Step n={2} id="install-the-theme" title="Install the theme">
        <p className="text-muted-foreground">
          Every component reads the theme&apos;s tokens, so install it first, together with the icon set.
        </p>
        <InstallCommand args={`add @${REGISTRY_NAME}/theme @${REGISTRY_NAME}/icons`} />
        <p className="text-muted-foreground">
          The accent is blue by default. To change it, add one accent preset after the theme.{" "}
          <TextLink href="/docs/theming#accent-presets">Theming</TextLink> lists the presets and what each token does.
        </p>
        <InstallCommand args={`add @${REGISTRY_NAME}/theme-violet`} />
      </Step>

      <Step n={3} id="add-components" title="Add components">
        <InstallCommand args={`add @${REGISTRY_NAME}/button @${REGISTRY_NAME}/prompt-bar`} />
        <p className="text-muted-foreground">
          The CLI also installs the components and npm packages each item depends on. Everything lands in your project as
          source, so edit it as you need.
        </p>
      </Step>

      <Step n={4} id="use-them" title="Use them">
        <p className="text-muted-foreground">
          Import from the path your components.json aliases point to. Every component page lists its parts and props under
          API Reference.
        </p>
        <DocsCode code={USAGE} filename="save.tsx" language="tsx" />
        <p className="text-muted-foreground">
          For other commands, see <TextLink href="/docs/cli">CLI &amp; registry</TextLink>.
        </p>
      </Step>
    </GuidePage>
  )
}
